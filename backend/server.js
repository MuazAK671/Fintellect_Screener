require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Initialization
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'fintellect_db',
});

// Test DB Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Successfully connected to PostgreSQL database');
  release();
});

// Routes

/**
 * GET /api/deals
 * Accepts query params date (YYYY-MM-DD) and minVal (in Crores). 
 * Returns matching deals ordered by transaction size descending.
 */
app.get('/api/deals', async (req, res) => {
  try {
    const { date, minVal } = req.query;
    
    let queryText = 'SELECT * FROM stock_deals WHERE 1=1';
    const queryParams = [];
    
    if (date) {
      queryParams.push(date);
      queryText += ` AND deal_date = $${queryParams.length}`;
    }
    
    if (minVal) {
      queryParams.push(minVal);
      queryText += ` AND total_value_crores >= $${queryParams.length}`;
    }
    
    queryText += ' ORDER BY total_value_crores DESC';
    
    const { rows } = await pool.query(queryText, queryParams);
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ success: false, error: 'Server error fetching deals' });
  }
});

/**
 * GET /api/results
 * Accepts query param quarter (e.g., Q4-2026). 
 * Returns earnings entries sorted by highest profit growth YoY.
 */
app.get('/api/results', async (req, res) => {
  try {
    const { quarter } = req.query;
    
    let queryText = 'SELECT * FROM financial_results WHERE 1=1';
    const queryParams = [];
    
    if (quarter) {
      queryParams.push(quarter);
      queryText += ` AND quarter = $${queryParams.length}`;
    }
    
    queryText += ' ORDER BY growth_yoy DESC';
    
    const { rows } = await pool.query(queryText, queryParams);
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching financial results:', error);
    res.status(500).json({ success: false, error: 'Server error fetching results' });
  }
});

/**
 * GET /api/news
 * Returns the latest 10 news articles ordered by published date descending.
 */
app.get('/api/news', async (req, res) => {
  try {
    const queryText = 'SELECT * FROM stock_news ORDER BY published_at DESC LIMIT 10';
    const { rows } = await pool.query(queryText);
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ success: false, error: 'Server error fetching news' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
