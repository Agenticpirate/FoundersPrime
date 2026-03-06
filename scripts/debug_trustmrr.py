import requests
from bs4 import BeautifulSoup

url = "https://trustmrr.com/search?total_revenue_min=200000&page=1"

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Save HTML for inspection
with open('debug_trustmrr.html', 'w') as f:
    f.write(soup.prettify())

print("HTML saved to debug_trustmrr.html")

# Try to find all links
all_links = soup.find_all('a')
print(f"\nTotal links found: {len(all_links)}")

# Check for startup-related links
startup_links = [link for link in all_links if 'startup' in link.get('href', '')]
print(f"Links with 'startup': {len(startup_links)}")

if startup_links:
    print("\nFirst 5 startup links:")
    for link in startup_links[:5]:
        print(f"  {link.get('href')}")

# Check if it's a Next.js app with client-side rendering
scripts = soup.find_all('script')
print(f"\nTotal scripts: {len(scripts)}")

# Look for __NEXT_DATA__
next_data = soup.find('script', id='__NEXT_DATA__')
if next_data:
    print("\nFound __NEXT_DATA__ script - this is a Next.js app with SSR")
    print(f"Data length: {len(next_data.string)}")
else:
    print("\nNo __NEXT_DATA__ found - might be CSR only")

# Check for any data attributes
divs_with_data = soup.find_all(attrs={"data-startup": True})
print(f"\nDivs with data-startup: {len(divs_with_data)}")
