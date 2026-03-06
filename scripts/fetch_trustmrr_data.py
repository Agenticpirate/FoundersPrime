import requests
from bs4 import BeautifulSoup
import json
import time
import random
import logging
import re
from concurrent.futures import ThreadPoolExecutor, as_completed

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

BASE_URL = "https://trustmrr.com"
OUTPUT_FILE = "data/trustmrr_startups.json"
TARGET_COUNT = 200
MIN_REVENUE = 200000

def get_startup_slugs(min_revenue=MIN_REVENUE, max_pages=20):
    """Fetch startup slugs from search results"""
    slugs = []
    
    for page in range(1, max_pages + 1):
        url = f"{BASE_URL}/search?total_revenue_min={min_revenue}&page={page}"
        logger.info(f"Fetching page {page}: {url}")
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                logger.warning(f"Failed to fetch page {page}: {response.status_code}")
                break
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all startup links
            startup_links = soup.find_all('a', href=re.compile(r'/startup/[^/]+$'))
            
            page_slugs = []
            for link in startup_links:
                slug = link['href'].replace('/startup/', '')
                if slug and slug not in slugs:
                    page_slugs.append(slug)
            
            logger.info(f"  Found {len(page_slugs)} startups on page {page}")
            slugs.extend(page_slugs)
            
            if len(slugs) >= TARGET_COUNT:
                logger.info(f"Reached target of {TARGET_COUNT} startups")
                break
            
            # Be respectful with rate limiting
            time.sleep(1)
            
        except Exception as e:
            logger.error(f"Error fetching page {page}: {e}")
            break
    
    return slugs[:TARGET_COUNT]

def extract_startup_details(slug):
    """Extract detailed information for a single startup"""
    url = f"{BASE_URL}/startup/{slug}"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            logger.warning(f"Failed to fetch {slug}: {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract basic info
        name = soup.find('h1')
        name = name.text.strip() if name else slug
        
        # Extract description/tagline
        description = ""
        value_prop = soup.find(string=re.compile(r'Value proposition|What does'))
        if value_prop:
            desc_elem = value_prop.find_parent().find_next_sibling()
            if desc_elem:
                description = desc_elem.text.strip()
        
        # Fallback to meta description
        if not description:
            meta_desc = soup.find('meta', {'name': 'description'})
            if meta_desc:
                description = meta_desc.get('content', '')
        
        # Extract website URL
        website = None
        visit_button = soup.find('a', string=re.compile(r'Visit|Website', re.I))
        if visit_button:
            website = visit_button.get('href')
        
        # Extract revenue data
        mrr = None
        total_revenue = None
        
        # Look for revenue metrics
        revenue_text = soup.find(string=re.compile(r'Monthly Recurring Revenue|MRR'))
        if revenue_text:
            mrr_elem = revenue_text.find_parent().find_next_sibling()
            if mrr_elem:
                mrr_match = re.search(r'\$([0-9,]+)', mrr_elem.text)
                if mrr_match:
                    mrr = int(mrr_match.group(1).replace(',', ''))
        
        total_rev_text = soup.find(string=re.compile(r'Total.*Revenue'))
        if total_rev_text:
            rev_elem = total_rev_text.find_parent().find_next_sibling()
            if rev_elem:
                rev_match = re.search(r'\$([0-9,]+)', rev_elem.text)
                if rev_match:
                    total_revenue = int(rev_match.group(1).replace(',', ''))
        
        # Extract categories/tags
        tags = []
        category_section = soup.find(string=re.compile(r'Categories|Industry'))
        if category_section:
            cat_parent = category_section.find_parent()
            if cat_parent:
                tag_links = cat_parent.find_all('a')
                tags = [tag.text.strip() for tag in tag_links if tag.text.strip()]
        
        # Extract founder info
        founder_link = soup.find('a', href=re.compile(r'/founder/'))
        founder_name = None
        founder_slug = None
        founder_twitter = None
        
        if founder_link:
            founder_name = founder_link.text.strip()
            founder_slug = founder_link['href'].replace('/founder/', '')
            
            # Fetch founder's social links
            founder_twitter = extract_founder_social(founder_slug)
        
        # Extract company social links (if available)
        company_twitter = None
        company_linkedin = None
        
        social_links = soup.find_all('a', href=re.compile(r'twitter\.com|x\.com|linkedin\.com'))
        for link in social_links:
            href = link.get('href', '')
            if 'twitter.com' in href or 'x.com' in href:
                company_twitter = href
            elif 'linkedin.com' in href:
                company_linkedin = href
        
        # Extract location/country
        location = None
        loc_text = soup.find(string=re.compile(r'Headquarters|Country'))
        if loc_text:
            loc_elem = loc_text.find_parent().find_next_sibling()
            if loc_elem:
                location = loc_elem.text.strip()
        
        # Extract founded date
        founded = None
        founded_text = soup.find(string=re.compile(r'Founded'))
        if founded_text:
            founded_elem = founded_text.find_parent().find_next_sibling()
            if founded_elem:
                founded = founded_elem.text.strip()
        
        startup_data = {
            "name": name,
            "slug": slug,
            "website": website,
            "description": description,
            "mrr": mrr,
            "total_revenue": total_revenue,
            "tags": tags,
            "location": location,
            "founded": founded,
            "source": "trustmrr",
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
        
        logger.info(f"✓ Extracted: {name} (${total_revenue:,} revenue)" if total_revenue else f"✓ Extracted: {name}")
        return startup_data
        
    except Exception as e:
        logger.error(f"Error extracting {slug}: {e}")
        return None

def extract_founder_social(founder_slug):
    """Extract founder's Twitter/X profile"""
    url = f"{BASE_URL}/founder/{founder_slug}"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for X/Twitter link
        twitter_link = soup.find('a', href=re.compile(r'twitter\.com|x\.com'))
        if twitter_link:
            return twitter_link.get('href')
        
    except Exception as e:
        logger.error(f"Error fetching founder {founder_slug}: {e}")
    
    return None

def main():
    logger.info("Starting TrustMRR scraper...")
    
    # Step 1: Get startup slugs
    logger.info(f"Fetching top {TARGET_COUNT} startups with revenue > ${MIN_REVENUE:,}")
    slugs = get_startup_slugs()
    logger.info(f"Found {len(slugs)} startup slugs")
    
    if not slugs:
        logger.error("No startups found!")
        return
    
    # Step 2: Extract details for each startup
    startups = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        future_to_slug = {executor.submit(extract_startup_details, slug): slug for slug in slugs}
        
        for i, future in enumerate(as_completed(future_to_slug)):
            try:
                data = future.result()
                if data:
                    startups.append(data)
                
                if (i + 1) % 10 == 0:
                    logger.info(f"Progress: {i + 1}/{len(slugs)} startups processed")
                    
            except Exception as e:
                logger.error(f"Worker failed: {e}")
            
            # Rate limiting
            time.sleep(0.5)
    
    # Step 3: Randomize the list
    random.shuffle(startups)
    logger.info(f"Randomized {len(startups)} startups")
    
    # Step 4: Save to file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(startups, f, indent=2)
    
    logger.info(f"✓ Saved {len(startups)} startups to {OUTPUT_FILE}")
    
    # Print summary
    with_revenue = sum(1 for s in startups if s.get('total_revenue'))
    with_website = sum(1 for s in startups if s.get('website'))
    with_founders = sum(1 for s in startups if s.get('founders_enriched'))
    
    logger.info(f"\nSummary:")
    logger.info(f"  Total startups: {len(startups)}")
    logger.info(f"  With revenue data: {with_revenue}")
    logger.info(f"  With website: {with_website}")
    logger.info(f"  With founder info: {with_founders}")

if __name__ == "__main__":
    main()
