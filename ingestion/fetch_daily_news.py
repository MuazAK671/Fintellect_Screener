import feedparser
import psycopg2
import os
from dotenv import load_dotenv
from datetime import datetime
from email.utils import parsedate_to_datetime

# Load environment variables
load_dotenv()

DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "fintellect_db")

# Google News RSS feed for Indian Stock Market News
RSS_FEED_URL = "https://news.google.com/rss/search?q=indian+stock+market+when:1d&hl=en-IN&gl=IN&ceid=IN:en"

# Fallback mock data in case the RSS feed fails or is blocked
MOCK_NEWS = [
    {
        "symbol": "RELIANCE",
        "headline": "Reliance Industries surges 3% after strong Q3 earnings report",
        "summary": "The conglomerate reported a 15% year-on-year growth in net profit, driven by strong performance in its retail and telecom arms.",
        "source_url": "https://example.com/news/reliance-q3",
        "sentiment": "POSITIVE",
        "published_at": datetime.now()
    },
    {
        "symbol": "HDFCBANK",
        "headline": "HDFC Bank shares fall 2% amid concerns over shrinking net interest margins",
        "summary": "Investors dumped the stock after management hinted at near-term margin pressures despite decent credit growth.",
        "source_url": "https://example.com/news/hdfc-margins",
        "sentiment": "NEGATIVE",
        "published_at": datetime.now()
    },
    {
        "symbol": "TCS",
        "headline": "TCS bags $1.5 billion cloud transformation deal from UK retailer",
        "summary": "The IT major announced a multi-year partnership to revamp the legacy infrastructure of a prominent European client.",
        "source_url": "https://example.com/news/tcs-deal",
        "sentiment": "POSITIVE",
        "published_at": datetime.now()
    },
    {
        "symbol": "INFY",
        "headline": "Infosys declares interim dividend, keeps revenue guidance steady",
        "summary": "The IT services firm met street expectations and announced an interim dividend of Rs 18 per share.",
        "source_url": "https://example.com/news/infy-dividend",
        "sentiment": "NEUTRAL",
        "published_at": datetime.now()
    },
    {
        "symbol": "ADANIENT",
        "headline": "Adani Enterprises plans to raise $500 million via bond issue",
        "summary": "The flagship company of the Adani Group is looking to tap the international bond markets for debt refinancing.",
        "source_url": "https://example.com/news/adani-bonds",
        "sentiment": "NEUTRAL",
        "published_at": datetime.now()
    }
]

def analyze_sentiment(headline):
    """A very simple rule-based sentiment tagger for the prototype."""
    headline_lower = headline.lower()
    
    positive_words = ['surge', 'jump', 'gain', 'rise', 'up', 'soar', 'profit', 'bag', 'win', 'record', 'high', 'buy']
    negative_words = ['fall', 'drop', 'plunge', 'crash', 'loss', 'down', 'sink', 'sell', 'weak', 'slump', 'concern']
    
    pos_count = sum(1 for word in positive_words if word in headline_lower)
    neg_count = sum(1 for word in negative_words if word in headline_lower)
    
    if pos_count > neg_count:
        return 'POSITIVE'
    elif neg_count > pos_count:
        return 'NEGATIVE'
    else:
        return 'NEUTRAL'

def extract_symbol(headline):
    """A simple mock function to extract tickers from headlines."""
    # Common Indian stock tickers
    tickers = ["RELIANCE", "HDFCBANK", "TCS", "INFY", "ADANIENT", "ICICIBANK", "SBI", "ITC", "L&T", "WIPRO", "BAJFINANCE"]
    
    for ticker in tickers:
        # Simplistic match
        if ticker.lower() in headline.lower() or ticker[:4].lower() in headline.lower():
            return ticker
            
    return None # General market news

def fetch_rss_news():
    """Fetches and parses the RSS feed."""
    print(f"Fetching RSS feed from {RSS_FEED_URL}...")
    feed = feedparser.parse(RSS_FEED_URL)
    
    news_items = []
    
    if not feed.entries:
        print("Warning: Failed to fetch RSS feed or feed is empty. Using mock fallback data.")
        return MOCK_NEWS
        
    print(f"Successfully fetched {len(feed.entries)} articles.")
    
    # Process top 10 articles
    for entry in feed.entries[:10]:
        try:
            pub_date = parsedate_to_datetime(entry.published)
        except Exception:
            pub_date = datetime.now()
            
        headline = entry.title
        summary = getattr(entry, 'summary', '')
        
        # Strip HTML tags from summary if needed (very basic)
        if summary.startswith('<'):
            import re
            summary = re.sub(r'<[^>]+>', '', summary)
            
        news_items.append({
            "symbol": extract_symbol(headline),
            "headline": headline,
            "summary": summary[:500], # truncate long summaries
            "source_url": entry.link,
            "sentiment": analyze_sentiment(headline),
            "published_at": pub_date
        })
        
    return news_items

def save_to_db(news_items):
    """Saves the news items to PostgreSQL."""
    try:
        conn = psycopg2.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME
        )
        cur = conn.cursor()

        # Insert statements
        insert_query = """
            INSERT INTO stock_news (symbol, headline, summary, source_url, sentiment, published_at)
            VALUES (%s, %s, %s, %s, %s, %s)
        """

        count = 0
        for item in news_items:
            cur.execute(insert_query, (
                item['symbol'],
                item['headline'],
                item['summary'],
                item['source_url'],
                item['sentiment'],
                item['published_at']
            ))
            count += 1

        conn.commit()
        cur.close()
        conn.close()
        print(f"Successfully inserted {count} news articles into PostgreSQL.")

    except Exception as e:
        print(f"Error saving to database: {e}")

if __name__ == "__main__":
    print("Starting Daily News Ingestion...")
    data = fetch_rss_news()
    save_to_db(data)
    print("Ingestion complete.")
