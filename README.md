Fintellect Screener & Stock Predictor
An intelligent financial analytics platform that combines machine learning time-series forecasting with robust technical indicators to evaluate, screen, and predict stock market movements.

Fintellect Screener transitions stock filtering from a static, historical lookup into a forward-looking predictive engine. By training complex regression algorithms and Deep Learning networks on historical OHLC (Open, High, Low, Close) and Volume data fetched directly via Yahoo Finance, the platform identifies high-probability trade setups and projects future stock trajectories.

🚀 Key Features
Advanced Financial Screening: Filters equities through dynamic technical screens, fundamental metrics, and automated chart pattern recognition.

Predictive Time-Series Modelling: Implements advanced ML/DL models to forecast the future closing prices of tracked assets.

Technical Indicator Pipelines: Ingests live data to compute technical indicator maps using libraries like FinTA and TA-Lib (RSI, MACD, Moving Averages).

Comparative Model Analysis: Evaluates multiple algorithmic frameworks side-by-side to determine market-specific accuracy.

🤖 Implemented Models & Architecture
The analytical core evaluates and benchmarks four distinct analytical frameworks:

Long Short-Term Memory (LSTM): A Recurrent Neural Network (RNN) framework designed to capture sequential dependencies in financial historical data, utilizing Input, Forget, and Output gates to filter long-term market momentum.

Linear Regression: Establishes baseline statistical trends mapping relationships between independent timeframe variables and asset price targets.

K-Nearest Neighbors (kNN): Groups historical market conditions to discover structural similarities between past price patterns and live market behaviors.

Moving Average Baselines: Computes rolling historical averages to define dynamic support, resistance, and macro-trend alignments.

🛠️ Tech Stack & Dependencies
Core Language: Python

Machine Learning / Deep Learning: TensorFlow, Keras, Scikit-learn

Data Engineering & Analysis: Pandas, NumPy

Financial Data Pipelines: yfinance API, FinTA, TA-Lib

Data Visualization: Plotly, Matplotlib

📈 Future Enhancements Roadmap
[ ] Multi-Timeframe Upgrades: Expand current 1-day interval predictive pipelines to support intraday trading scales (1m, 5m, 15m, 1h, 4h).

[ ] Sentiment Ingestion: Introduce Natural Language Processing (NLP) to pull and cross-reference financial news sentiment alongside numerical indicators.

[ ] Live Interactive Web App: Decouple from notebook environments to deploy an interactive dashboard interface using Streamlit or Next.js.
