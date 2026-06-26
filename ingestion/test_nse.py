import requests

def fetch_nse():
    url = "https://www.nseindia.com/api/historical/bulk-deals"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
    }
    
    # First get cookies from main site
    session = requests.Session()
    try:
        print("Getting cookies from NSE main page...")
        session.get("https://www.nseindia.com", headers=headers, timeout=10)
        
        print("Fetching bulk deals API...")
        response = session.get(url, headers=headers, timeout=10)
        print("Status Code:", response.status_code)
        if response.status_code == 200:
            print("Data preview:", response.text[:200])
        else:
            print("Failed.")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    fetch_nse()
