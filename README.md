 📈 Fintellect Screener & Stock Predictor

An intelligent financial analytics platform that combines machine learning time-series forecasting with robust technical indicators to evaluate, screen, and predict stock market movements.

Fintellect Screener transitions stock filtering from a static, historical lookup into a forward-looking predictive engine. By training complex regression algorithms and Deep Learning networks on historical OHLC (Open, High, Low, Close) and Volume data fetched directly via Yahoo Finance, the platform identifies high-probability trade setups and projects future stock trajectories.


 ⚙️ Core Workflows & Features

 1. Market Intelligence (Public)
Without even logging in, anyone can view the Live Dashboard. The FastAPI backend actively fetches real-time data from the NSE (National Stock Exchange) using `jugaad-data`. This populates the dashboard with:
*   **Live Indices:** Real-time updates for Nifty 50 & Sensex.
*   **Market Movers:** Top 5 Gainers and Losers of the trading day.
*   **Institutional Activity:** The latest Bulk & Block deals executed by large institutions.
*   **Corporate Health:** Quarterly corporate earnings reports and YoY growth metrics.
*   **News Feed:** Live market news headlines to stay updated.

2. Market Screener
Users can navigate to the Screener tab to filter through thousands of stocks. The backend queries the database dynamically based on custom parameters such as:
*   Market Capitalization
*   Price-to-Earnings (P/E) Ratio
*   Dividend Yield
*   Specific Sectors

3. Virtual Portfolio (Paper Trading)
Once a user registers an account and logs in securely:
*   **Authentication:** Receives a securely hashed JWT token for session management.
*   **Virtual Trades:** Execute "Paper Trades" by "buying" a stock at the current market price.
*   **Risk Management:** Set custom Stop-Loss and Target prices to manage risk.
*   **Alert System:** A background worker monitors live prices and triggers notifications/alerts if a user's Stop-Loss or Target is hit.

 4. Admin Control Center
The first user registered on the platform is automatically granted the `ADMIN` role. Admins get access to a secure Control Center that tracks system-wide metrics:
*   Total registered users and active sessions.
*   Total virtual trades executed across the platform.
*   Overall server performance and platform health metrics.

 5. Learning Center
A dedicated educational hub designed to teach beginners the fundamentals of the stock market. It bridges the gap between raw data and execution, covering:
*   **Swing Trading** strategies and technical entry/exit setups.
*   **Futures & Options (F&O)** basics and risk mechanisms.
*   **Systematic Investment Plans (SIPs)** and the power of compounding.

---

 💻 Tech Stack

 Frontend (Client-Side)
Built for high performance, micro-animations, and a premium "wow" aesthetic using modern web standards:
*   **Next.js 15 (React 19):** Core framework for lightning-fast UI rendering and client-side routing.
*   **Tailwind CSS:** Utilized extensively for glassmorphic layouts (`backdrop-blur`), custom gradients, and responsive design.
*   **Lucide React:** For crisp, beautiful, and consistent SVG iconography.
*   **Axios:** For handling asynchronous HTTP requests to the backend API.
*   **React Context API:** Used for global state management, specifically handling user authentication (`AuthContext`).

Backend (Server-Side)
A high-performance, asynchronous API designed to handle live market data scraping and smooth database operations:
*   **FastAPI (Python):** The core asynchronous web framework, chosen for its speed and auto-generated Swagger documentation.
*   **SQLAlchemy (ORM):** Manages all database operations, modeling Users, Stocks, Transactions, and Alerts cleanly.
*   **PostgreSQL / SQLite:** Robust data layers used to store persistent platform data and quick-lookup metrics.
*   **Jugaad-Data:** A specialized Python library used to securely fetch live market data directly from the NSE.
*   **Passlib & Python-JOSE:** Handles secure password hashing (Bcrypt) and generates/verifies JWTs for robust API authorization.

---

 📈 Future Enhancements Roadmap

- [ ] **Multi-Timeframe Upgrades:** Expand current 1-day interval predictive pipelines to support intraday trading scales (1m, 5m, 15m, 1h, 4h).
- [ ] **Sentiment Ingestion:** Introduce Natural Language Processing (NLP) to pull and cross-reference financial news sentiment alongside numerical indicators.
- [ ] **Live Interactive Web App:** Decouple from notebook environments to deploy an interactive dashboard interface using Streamlit or Next.js.
