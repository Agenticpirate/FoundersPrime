import requests
import json
from collections import Counter

ALGOLIA_APP_ID = "45BWZJ1SGC"
ALGOLIA_API_KEY = "ZjA3NWMwMmNhMzEwZmMxOThkZDlkMjFmNDAwNTNjNjdkZjdhNWJkOWRjMThiODQwMjUyZTVkYjA4YjFlMmU2YnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJZQ0NvbXBhbnlfcHJvZHVjdGlvbiUyMiUyQyUyMllDQ29tcGFueV9CeV9MYXVuY2hfRGF0ZV9wcm9kdWN0aW9uJTIyJTVEJnRhZ0ZpbHRlcnM9JTVCJTIyeWNkY19wdWJsaWMlMjIlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ5Y2RjJTIyJTVE"
ALGOLIA_INDEX = "YCCompany_production"

url = f"https://{ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/{ALGOLIA_INDEX}/query"
headers = {
    "X-Algolia-Application-Id": ALGOLIA_APP_ID,
    "X-Algolia-API-Key": ALGOLIA_API_KEY,
    "Content-Type": "application/x-www-form-urlencoded"
}

all_batches = []
page = 0
while True:
    params = {
        "query": "",
        "hitsPerPage": 1000,
        "page": page
    }
    response = requests.post(url, headers=headers, json={"params": "&".join([f"{k}={v}" for k,v in params.items()])})
    data = response.json()
    hits = data.get("hits", [])
    if not hits:
        break
    
    for hit in hits:
        if "batch" in hit:
            all_batches.append(hit["batch"])
            
    if page >= data.get("nbPages", 0) - 1:
        break
    page += 1

print(json.dumps(Counter(all_batches), indent=2))
