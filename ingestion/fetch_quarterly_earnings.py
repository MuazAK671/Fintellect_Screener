import os
import psycopg2
from psycopg2.extras import execute_batch
from datetime import datetime
import yfinance as yf
import pandas as pd

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
    "HINDUNILVR.NS", "ICICIBANK.NS", "ITC.NS", "SBIN.NS",
    "BHARTIARTL.NS", "KOTAKBANK.NS"
]

def fetch_earnings():
    print("Fetching live quarterly earnings from Yahoo Finance...")
    records = []
    
    for symbol in TICKERS:
        try:
            print(f"Processing {symbol}...")
            ticker = yf.Ticker(symbol)
            qf = ticker.quarterly_financials
            
            if qf is None or qf.empty:
                print(f"  No financial data for {symbol}")
                continue
                
            # Get latest quarter
            latest_date = qf.columns[0]
            # Get same quarter last year (assuming 4 columns exist)
            if len(qf.columns) >= 5:
                prev_year_date = qf.columns[4]
            elif len(qf.columns) >= 4:
                prev_year_date = qf.columns[3] # Fallback if exactly 4
            else:
                print(f"  Not enough history for YoY calculation for {symbol}")
                continue
                
            quarter_str = f"Q{((latest_date.month-1)//3)+1}-{latest_date.year}"
            
            # Use 'Total Revenue' or 'Operating Revenue'
            revenue = qf.loc['Total Revenue', latest_date] if 'Total Revenue' in qf.index else 0
            if pd.isna(revenue):
                revenue = 0
                
            net_profit = qf.loc['Net Income', latest_date] if 'Net Income' in qf.index else 0
            prev_net_profit = qf.loc['Net Income', prev_year_date] if 'Net Income' in qf.index else 0
            
            if pd.isna(net_profit) or pd.isna(prev_net_profit):
                continue
                
            # Calculate metrics
            margin_percent = round((net_profit / revenue) * 100, 2) if revenue > 0 else 0
            
            if prev_net_profit > 0:
                growth_yoy = round(((net_profit - prev_net_profit) / prev_net_profit) * 100, 2)
            else:
                growth_yoy = 0
                
            # Values are typically in absolute for Indian stocks depending on source.
            # Convert to Crores (divide by 1,000,0000)
            revenue_cr = round(revenue / 10000000.0, 2)
            net_profit_cr = round(net_profit / 10000000.0, 2)
            
            clean_symbol = symbol.replace('.NS', '')
            
            # Format: (symbol, quarter, revenue, net_profit, growth_yoy, margin_percent, source_pdf_url)
            records.append((
                clean_symbol, 
                quarter_str, 
                float(revenue_cr), 
                float(net_profit_cr), 
                float(growth_yoy), 
                float(margin_percent), 
                f"https://finance.yahoo.com/quote/{symbol}/financials"
            ))
            print(f"  Successfully extracted {clean_symbol} {quarter_str} data.")
            
        except Exception as e:
            print(f"  Error processing {symbol}: {e}")
            
    return records

def insert_to_db(records):
    if not records:
        print("No records to insert.")
        return
        
    print(f"Inserting {len(records)} earnings records into database...")
    conn = None
    try:
        conn = psycopg2.connect(
            user=DB_USER, password=DB_PASSWORD, host=DB_HOST, 
            port=DB_PORT, database=DB_NAME
        )
        cur = conn.cursor()
        
        insert_query = """
            INSERT INTO financial_results 
            (symbol, quarter, revenue, net_profit, growth_yoy, margin_percent, source_pdf_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (symbol, quarter) DO UPDATE SET
                revenue = EXCLUDED.revenue,
                net_profit = EXCLUDED.net_profit,
                growth_yoy = EXCLUDED.growth_yoy,
                margin_percent = EXCLUDED.margin_percent,
                source_pdf_url = EXCLUDED.source_pdf_url
        """
        execute_batch(cur, insert_query, records, page_size=100)
        conn.commit()
        print("Successfully inserted/updated earnings records.")
    except Exception as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == "__main__":
    print(f"Starting Quarterly Earnings Ingestion Job at {datetime.now()}")
    records = fetch_earnings()
    insert_to_db(records)
    print("Quarterly Earnings Ingestion completed.")
