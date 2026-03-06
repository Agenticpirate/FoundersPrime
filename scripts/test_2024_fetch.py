import requests
import json

ALGOLIA_APP_ID = "45BWZJ1SGC"
ALGOLIA_API_KEY = "ZjA3NWMwMmNhMzEwZmMxOThkZDlkMjFmNDAwNTNjNjdkZjdhNWJkOWRjMThiODQwMjUyZTVkYjA4YjFlMmU2YnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJZQ0NvbXBhbnlfcHJvZHVjdGlvbiUyMiUyQyUyMllDQ29tcGFueV9CeV9MYXVuY2hfRGF0ZV9wcm9kdWN0aW9uJTIyJTVEJnRhZ0ZpbHRlcnM9JTVCJTIyeWNkY19wdWJsaWMlMjIlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ5Y2RjJTIyJTVE"
ALGOLIA_INDEX = "YCCompany_production"

url = f"https://{ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/{ALGOLIA_INDEX}/query"
headers = {
    "X-Algolia-Application-Id": ALGOLIA_APP_ID,
    "X-Algolia-API-Key": ALGOLIA_API_KEY,
    "Content-Type": "application/x-www-form-urlencoded"
}

params = {
    "query": "",
    "filters": 'batch:"Winter 2024"',
    "hitsPerPage": 100
}

response = requests.post(url, headers=headers, json={"params": "&".join([f"{k}={v}" for k,v in params.items()])})
data = response.json()
print(f"Hits for Winter 2024: {data.get('nbHits')}")
if data.get("hits"):
    print(f"Sample: {data['hits'][0]['name']}")
