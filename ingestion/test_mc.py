import requests
from bs4 import BeautifulSoup

def fetch_mc_deals():
    url = "https://www.moneycontrol.com/stocks/marketinfo/blockdeals/index.php"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    }
    try:
        res = requests.get(url, headers=headers)
        if res.status_code == 200:
            soup = BeautifulSoup(res.text, 'html.parser')
            table = soup.find('table', {'class': 'mctable1'})
            if table:
                rows = table.find_all('tr')
                for row in rows[:5]:
                    cols = row.find_all('td')
                    if cols:
                        print([c.text.strip() for c in cols])
            else:
                print("Table not found on Moneycontrol.")
        else:
            print("Failed to fetch Moneycontrol:", res.status_code)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    fetch_mc_deals()
