import requests
import json
import time
import logging
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
import re
import os
import hashlib

# Configuration
ALGOLIA_APP_ID = "45BWZJ1SGC"
ALGOLIA_API_KEY = "ZjA3NWMwMmNhMzEwZmMxOThkZDlkMjFmNDAwNTNjNjdkZjdhNWJkOWRjMThiODQwMjUyZTVkYjA4YjFlMmU2YnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJZQ0NvbXBhbnlfcHJvZHVjdGlvbiUyMiUyQyUyMllDQ29tcGFueV9CeV9MYXVuY2hfRGF0ZV9wcm9kdWN0aW9uJTIyJTVEJnRhZ0ZpbHRlcnM9JTVCJTIyeWNkY19wdWJsaWMlMjIlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ5Y2RjJTIyJTVE"
ALGOLIA_INDEX = "YCCompany_production"
OUTPUT_FILE = "data/yc_companies_2024_2026.json"
IMAGES_DIR = "public/images"
TARGET_BATCHES = ["Winter 2024", "Summer 2024", "Winter 2025", "Summer 2025", "Winter 2026", "Summer 2026", "Spring 2024", "Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026", "Fall 2026"] # Include potential variants

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def download_image(url, folder, filename):
    if not url or "s3" not in url: # Basic check, though some might not be s3
        return url
        
    try:
        # Create directory
        save_dir = os.path.join(IMAGES_DIR, folder)
        os.makedirs(save_dir, exist_ok=True)
        
        file_path = os.path.join(save_dir, filename)
        public_path = f"/images/{folder}/{filename}"
        
        # If already exists, skip (cache)
        if os.path.exists(file_path):
            return public_path
            
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(file_path, "wb") as f:
                f.write(response.content)
            return public_path
        else:
             logger.warning(f"Failed to download image {url}: {response.status_code}")
             return None
    except Exception as e:
        logger.error(f"Error downloading image {url}: {e}")
        return None

def fetch_companies_from_algolia():
    url = f"https://{ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/{ALGOLIA_INDEX}/query"
    headers = {
        "X-Algolia-Application-Id": ALGOLIA_APP_ID,
        "X-Algolia-API-Key": ALGOLIA_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    all_hits = []
    seen_slugs = set()
    
    for batch in TARGET_BATCHES:
        logger.info(f"Fetching companies for batch: {batch}")
        page = 0
        while True:
            params = {
                "query": "",
                "filters": f'batch:"{batch}"',
                "hitsPerPage": 1000,
                "page": page
            }
            # Sending params as JSON string in body
            response = requests.post(url, headers=headers, json={"params": "&".join([f"{k}={v}" for k,v in params.items()])})
            
            if response.status_code != 200:
                logger.error(f"Failed to fetch Algolia data for {batch}: {response.text}")
                break
                
            data = response.json()
            hits = data.get("hits", [])
            if not hits:
                break
            
            new_hits = 0
            for hit in hits:
                slug = hit.get("slug")
                if slug and slug not in seen_slugs:
                    all_hits.append(hit)
                    seen_slugs.add(slug)
                    new_hits += 1
            
            logger.info(f"  Batch {batch} page {page}: Found {len(hits)} hits, {new_hits} new")
            
            if page >= data.get("nbPages", 0) - 1:
                break
                
            page += 1
            
    logger.info(f"Total unique companies fetched: {len(all_hits)}")
    return all_hits

def filter_needed_companies(hits):
    # Already filtered by batch in fetch step
    return hits

def fetch_company_details(slug):
    url = f"https://www.ycombinator.com/companies/{slug}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            logger.warning(f"Failed to fetch details for {slug}: {response.status_code}")
            return None
            
        # Extract data-page JSON
        match = re.search(r'data-page="([^"]+)"', response.text)
        if match:
            json_str = match.group(1).replace('&quot;', '"').replace('&amp;', '&')
            data = json.loads(json_str)
            company = data.get("props", {}).get("company", {})
            return company
        else:
             logger.warning(f"No data-page attribute found for {slug}")
             return None
             
    except Exception as e:
        logger.error(f"Error fetching {slug}: {str(e)}")
        return None

def process_company(hit):
    slug = hit.get("slug")
    if not slug:
        return hit
        
    # Download company logo
    if hit.get("small_logo_thumb_url"):
        local_logo = download_image(hit["small_logo_thumb_url"], "companies", f"{slug}.jpg")
        if local_logo:
            hit["small_logo_thumb_url"] = local_logo

    details = fetch_company_details(slug)
    if details:
        # Merge details into hit, preferring details
        # Standardize fields to match our schema needs
        merged = {**hit, **details}
        
        # Ensure regex/merged logo path is preserved if details overwrote it with remote one
        if hit.get("small_logo_thumb_url") and hit["small_logo_thumb_url"].startswith("/images"):
            merged["small_logo_thumb_url"] = hit["small_logo_thumb_url"]
        
        # Clean up founders list
        founders = details.get("founders", [])
        enriched_founders = []
        
        for i, f in enumerate(founders):
            # Download founder avatars
            avatar_url = f.get("avatar_thumb_url") or f.get("avatar_url")
            
            # Filter out placeholder images from YC
            if avatar_url and ("missing.png" in avatar_url or avatar_url.startswith("/avatars/")):
                avatar_url = None

            local_avatar = None
            if avatar_url:
                clean_name = re.sub(r'[^a-zA-Z0-9]', '_', f.get("full_name", f"founder_{i}")).lower()
                local_avatar = download_image(avatar_url, "founders", f"{slug}_{clean_name}.jpg")
            
            enriched_founders.append({
                "name": f.get("full_name"),
                "title": f.get("title", "Founder"),
                "bio": f.get("founder_bio", ""),
                "linkedin": f.get("linkedin_url"),
                "twitter": f.get("twitter_url"),
                "avatar": local_avatar or avatar_url # Fallback to remote if download failed
            })

        merged["founders_enriched"] = enriched_founders
        
        # Capture company socials
        merged["linkedin_url"] = details.get("linkedin_url") or hit.get("linkedin_url")
        merged["twitter_url"] = details.get("twitter_url") or hit.get("twitter_url")
        merged["crunchbase_url"] = details.get("crunchbase_url") or hit.get("crunchbase_url")
        
        return merged
    return hit

def main():
    logger.info("Starting YC Scraper...")
    
    # 1. Fetch from Algolia
    hits = fetch_companies_from_algolia()
    
    # 2. Filter
    targets = filter_needed_companies(hits)
    
    # 3. Enrich details
    enriched_data = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_slug = {executor.submit(process_company, hit): hit.get("slug") for hit in targets}
        
        for i, future in enumerate(as_completed(future_to_slug)):
            try:
                data = future.result()
                enriched_data.append(data)
                if i % 10 == 0:
                    logger.info(f"Processed {i}/{len(targets)} companies")
            except Exception as e:
                logger.error(f"Worker failed: {e}")
                
    # 4. Save
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w") as f:
        json.dump(enriched_data, f, indent=2)
        
    logger.info(f"Saved {len(enriched_data)} companies to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
