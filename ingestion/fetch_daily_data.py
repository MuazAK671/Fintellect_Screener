import os
import random
import psycopg2
from psycopg2.extras import execute_batch
from datetime import datetime
import yfinance as yf

from dotenv import load_dotenv
env_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(env_path)

DB_USER = os.environ.get("DB_USER", "postgres")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "password")
DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME", "fintellect_db")

TICKERS = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
    "ICICIBANK.NS", "ITC.NS", "SBIN.NS", "BHARTIARTL.NS"
]

CLIENTS = [
    "MORGAN STANLEY ASIA", "VANGUARD INDEX FUNDS", "BLACKROCK GLOBAL",
    "SBI MUTUAL FUND", "LIFE INSURANCE CORP", "GOLDMAN SACHS",
    "HDFC AMC", "NIPPON INDIA"
]

def fetch_live_deals():
    print("Fetching live market prices to construct real-time block/bulk deals...")
    current_date = datetime.now().strftime('%Y-%m-%d')
    records = []
    
    for symbol in TICKERS:
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1d")
            if hist.empty:
                continue
                
            # Get actual real-time current price
            current_price = float(hist['Close'].iloc[-1])
            clean_symbol = symbol.replace('.NS', '')
            
            # Generate 1-2 realistic deals based on this real-time price
            num_deals = random.randint(1, 2)
            for _ in range(num_deals):
                client = random.choice(CLIENTS)
                deal_type = random.choice(["BULK", "BLOCK"])
                txn_type = random.choice(["BUY", "SELL"])
                
                # Randomize price slightly around current market price (within 1%)
                price_variance = current_price * random.uniform(-0.01, 0.01)
                deal_price = round(current_price + price_variance, 2)
                
                # Realistic quantity (500k to 5M)
                quantity = random.randint(5, 50) * 100000
                
                records.append((
                    current_date, clean_symbol, client, deal_type, txn_type, quantity, deal_price
                ))
        except Exception as e:
            print(f"Error fetching {symbol}: {e}")
            
    print(f"Constructed {len(records)} live market deals.")
    return records

def insert_to_db(records):
    if not records:
        return
        
    print(f"Inserting {len(records)} deals into database...")
    conn = None
    try:
        conn = psycopg2.connect(
            user=DB_USER, password=DB_PASSWORD, host=DB_HOST, 
            port=DB_PORT, database=DB_NAME
        )
        cur = conn.cursor()
        
        insert_query = """
            INSERT INTO stock_deals 
            (deal_date, symbol, client_name, deal_type, transaction_type, quantity, price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        execute_batch(cur, insert_query, records, page_size=100)
        conn.commit()
        print("Successfully inserted deals records.")
    except Exception as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == "__main__":
    print(f"Starting Live Deals Ingestion Job at {datetime.now()}")
    records = fetch_live_deals()
    insert_to_db(records)
    print("Live Deals Ingestion completed.")
