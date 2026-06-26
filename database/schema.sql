-- BSE/NSE Daily Deals & Quarterly Earnings Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. stock_deals: Tracks daily BULK and BLOCK trades
CREATE TABLE IF NOT EXISTS stock_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_date DATE NOT NULL,
    symbol VARCHAR(50) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    deal_type VARCHAR(20) NOT NULL CHECK (deal_type IN ('BULK', 'BLOCK')),
    transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('BUY', 'SELL')),
    quantity NUMERIC NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    
    -- Generated column calculating total value in crores
    -- Formula: (quantity * price) / 10000000
    total_value_crores NUMERIC(15, 4) GENERATED ALWAYS AS ((quantity * price) / 10000000.0) STORED,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast retrieval based on date and value filtering
CREATE INDEX IF NOT EXISTS idx_stock_deals_date_value ON stock_deals (deal_date DESC, total_value_crores DESC);
CREATE INDEX IF NOT EXISTS idx_stock_deals_symbol ON stock_deals (symbol);


-- 2. financial_results: Tracks quarterly earnings filings
CREATE TABLE IF NOT EXISTS financial_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(50) NOT NULL,
    quarter VARCHAR(20) NOT NULL, -- e.g., 'Q4-2026'
    revenue NUMERIC(15, 2) NOT NULL,
    net_profit NUMERIC(15, 2) NOT NULL,
    growth_yoy NUMERIC(5, 2) NOT NULL, -- Percentage growth YoY
    margin_percent NUMERIC(5, 2) NOT NULL, -- Profit Margin Percentage
    source_pdf_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure one record per symbol per quarter
    CONSTRAINT unique_symbol_quarter UNIQUE (symbol, quarter)
);

-- Indexing for fast retrieval based on quarter and highest growth
CREATE INDEX IF NOT EXISTS idx_financial_results_quarter_growth ON financial_results (quarter, growth_yoy DESC);
CREATE INDEX IF NOT EXISTS idx_financial_results_symbol ON financial_results (symbol);

-- 3. stock_news: Tracks latest market news and sentiment
CREATE TABLE IF NOT EXISTS stock_news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(50),
    headline TEXT NOT NULL,
    summary TEXT,
    source_url TEXT,
    sentiment VARCHAR(20) CHECK (sentiment IN ('POSITIVE', 'NEGATIVE', 'NEUTRAL')),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stock_news_published_at ON stock_news (published_at DESC);
