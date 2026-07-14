Fintellect Screener & Stock Predictor
An intelligent financial analytics platform that combines machine learning time-series forecasting with robust technical indicators to evaluate, screen, and predict stock market movements.

Fintellect Screener transitions stock filtering from a static, historical lookup into a forward-looking predictive engine. By training complex regression algorithms and Deep Learning networks on historical OHLC (Open, High, Low, Close) and Volume data fetched directly via Yahoo Finance, the platform identifies high-probability trade setups and projects future stock trajectories.

How It Works (Core Workflows)
1. Market Intelligence (Public)
Without even logging in, anyone can view the Live Dashboard. The FastAPI backend actively fetches real-time data from the NSE (National Stock Exchange) using jugaad-data. This populates the dashboard with:

Live Nifty 50 & Sensex indices
Top 5 Gainers and Losers
The latest Bulk & Block deals executed by large institutions
Quarterly corporate earnings reports and YoY growth metrics
Live market news headlines
2. Market Screener
Users can navigate to the Screener tab to filter through thousands of stocks. The backend queries the SQLite database to filter stocks dynamically based on custom parameters like Market Cap, P/E Ratio, Dividend Yield, and specific Sectors.

3. Virtual Portfolio (Paper Trading)
Once a user registers an account and logs in:

They receive a securely hashed JWT token for authentication.
They can navigate to the Portfolio tab to execute "Virtual Trades".
Users can "buy" a stock at the current market price, set a Stop-Loss and Target price, and the system tracks their holdings.
A background worker monitors live prices and can trigger notifications/alerts if a user's Stop-Loss or Target is hit.
4. Admin Control Center
The first user registered on the platform is automatically granted the ADMIN role. Admins get access to a secure Control Center that tracks system-wide metrics such as total registered users, total virtual trades executed, and overall platform health.

5. Learning Center
A dedicated educational hub designed to teach beginners the fundamentals of the stock market, covering topics like Swing Trading strategies, Futures & Options (F&O), and Systematic Investment Plans (SIPs).

💻 Technologies Used
Frontend (Client-Side)
The frontend is built for extreme performance and stunning, dynamic visuals utilizing modern web standards.

Next.js 15 (React 19): The core framework for building the UI and handling client-side routing.
Tailwind CSS: Used extensively for styling. The UI utilizes advanced Tailwind features like backdrop-blurs (glassmorphism), custom gradients, and micro-animations to create a premium, "wow" aesthetic.
Lucide React: For beautiful, crisp SVG icons.
Axios: For making HTTP requests to the backend API.
React Context API: Used to globally manage user authentication state (AuthContext).
Backend (Server-Side)
The backend is a high-performance, asynchronous API designed to handle live market data scraping and database operations.

FastAPI (Python): The core web framework, chosen for its incredible speed and auto-generated Swagger documentation.
SQLAlchemy (ORM): Handles all database operations, modeling Users, Stocks, Transactions, and Alerts.
PostgreSQL: The robust, production-ready relational database used to store all persistent platform data.
Jugaad-Data: A specialized Python library used to securely fetch live market data directly from the NSE.
Passlib & Python-JOSE: Used for hashing user passwords securely (Bcrypt) and generating/verifying JWT (JSON Web Tokens) for API authorization.

📈 Future Enhancements Roadmap
[ ] Multi-Timeframe Upgrades: Expand current 1-day interval predictive pipelines to support intraday trading scales (1m, 5m, 15m, 1h, 4h).

[ ] Sentiment Ingestion: Introduce Natural Language Processing (NLP) to pull and cross-reference financial news sentiment alongside numerical indicators.

[ ] Live Interactive Web App: Decouple from notebook environments to deploy an interactive dashboard interface using Streamlit or Next.js.
