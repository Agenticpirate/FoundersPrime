import requests
from bs4 import BeautifulSoup
import json
import time
import random
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

BASE_URL = "https://trustmrr.com"
SLUGS_FILE = "data/trustmrr_slugs.json"
OUTPUT_FILE = "data/trustmrr_startups.json"

# Load the first 100 slugs (we have 210+ but let's start with top 100)
with open(SLUGS_FILE, 'r') as f:
    ALL_SLUGS = json.load(f)

TARGET_SLUGS = ALL_SLUGS[:200]  # Top 200 startups

def extract_startup_details(slug):
    """Extract detailed information for a single startup"""
    url = f"{BASE_URL}/startup/{slug}"
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, timeout=15, headers=headers)
        
        if response.status_code != 200:
            logger.warning(f"Failed to fetch {slug}: {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract name from title or h1
        name = None
        title_tag = soup.find('title')
        if title_tag:
            name = title_tag.text.split('|')[0].strip()
        if not name:
            h1 = soup.find('h1')
            name = h1.text.strip() if h1 else slug.replace('-', ' ').title()
        
        # Extract description from meta or page content
        description = ""
        meta_desc = soup.find('meta', {'name': 'description'})
        if meta_desc:
            description = meta_desc.get('content', '')
        
        # Extract website URL - look for "Visit" button or external links
        website = None
        for link in soup.find_all('a'):
            text = link.text.lower()
            href = link.get('href', '')
            if 'visit' in text or 'website' in text:
                website = href
                break
        
        # Extract all social links
        company_twitter = None
        company_linkedin = None
        founder_twitter = None
        
        for link in soup.find_all('a'):
            href = link.get('href', '')
            if 'twitter.com' in href or 'x.com' in href:
                if '/founder/' not in href:
                    company_twitter = href
                else:
                    founder_twitter = href
            elif 'linkedin.com' in href:
                company_linkedin = href
        
        # Extract founder name
        founder_name = None
        founder_link = soup.find('a', href=lambda x: x and '/founder/' in x)
        if founder_link:
            founder_name = founder_link.text.strip()
        
        # Build startup data
        startup_data = {
            "name": name,
            "slug": slug,
            "website": website,
            "description": description,
            "source": "trustmrr",
            "batch": "TrustMRR 2024",  # Custom batch identifier
            "founders_enriched": []
        }
        
        # Add founder if found
        if founder_name:
            startup_data["founders_enriched"].append({
                "name": founder_name,
                "title": "Founder",
                "twitter": founder_twitter,
                "linkedin": None,
                "avatar": None
            })
        
        # Add company socials
        if company_twitter:
            startup_data["twitter_url"] = company_twitter
        if company_linkedin:
            startup_data["linkedin_url"] = company_linkedin
        
        logger.info(f"✓ {name}")
        return startup_data
        
    except Exception as e:
        logger.error(f"Error extracting {slug}: {e}")
        return None

def main():
    logger.info(f"Starting TrustMRR detail scraper for {len(TARGET_SLUGS)} startups...")
    
    startups = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_slug = {executor.submit(extract_startup_details, slug): slug for slug in TARGET_SLUGS}
        
        for i, future in enumerate(as_completed(future_to_slug)):
            try:
                data = future.result()
                if data:
                    startups.append(data)
                
                if (i + 1) % 20 == 0:
                    logger.info(f"Progress: {i + 1}/{len(TARGET_SLUGS)} ({len(startups)} successful)")
                    
            except Exception as e:
                logger.error(f"Worker failed: {e}")
            
            # Rate limiting
            time.sleep(0.3)
    
    # Randomize the list as requested
    random.shuffle(startups)
    logger.info(f"Randomized {len(startups)} startups")
    
    # Save to file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(startups, f, indent=2)
    
    logger.info(f"✓ Saved {len(startups)} startups to {OUTPUT_FILE}")
    
    # Print summary
    with_website = sum(1 for s in startups if s.get('website'))
    with_description = sum(1 for s in startups if s.get('description'))
    with_founders = sum(1 for s in startups if s.get('founders_enriched'))
    with_twitter = sum(1 for s in startups if s.get('twitter_url'))
    
    logger.info(f"\nSummary:")
    logger.info(f"  Total startups: {len(startups)}")
    logger.info(f"  With website: {with_website}")
    logger.info(f"  With description: {with_description}")
    logger.info(f"  With founder info: {with_founders}")
    logger.info(f"  With Twitter: {with_twitter}")

if __name__ == "__main__":
    main()
