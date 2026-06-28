#!/usr/bin/env python3
"""
Fetches all missing deals from studentoffers.co API and generates
TypeScript entries for student-benefits-2026.ts
"""
import json
import urllib.request
import sys

MISSING_SLUGS = {
    'adidas','altium-designer','appy-pie','asos','b-ai','bohrium','calm','chess-com',
    'crocs','cst-studio-suite-le','dashlane','deepnote','divisare','everyplate',
    'evomap-api-grant','exploratory-io','figma','flixbus','focusee','fujifilm',
    'ideapulley','j-crew','jotform','kickbacks-ai','levi-s','medium','mistral-ai',
    'mnml-ai','nararouter','nike','proton','puma','razer','ryanair-erasmus',
    'sentry','sketch','skillshare','soundcloud','squarespace','strava','stripe',
    'termius','the-north-face','tidal','tower','webflow','wix','writer','zipcar',
    'notion','github','loom','slack','monday-com','datadog','appwrite',
    'basecamp','coda','evernote','headspace','hulu','pandora','quillbot',
    'otter-ai','name-com','popsql','gitkraken','fred-again-india-2026',
    'autodesk','arduino','babbel','beautiful-ai','b-h-photo-video','chatgpt-go-2',
    'dell','doordash','emirates','geico','h-m','logitech','notepad-exe',
    'progressive','samsung','state-farm','amtrak','axure','ideapulley',
}

# Deals that are free for ANYONE (no student verification needed)
FREE_FOR_ALL = {
    'github','stripe','appwrite','arduino',
    'mistral-ai','deepnote','exploratory-io',
    'evomap-api-grant','b-ai','nararouter','bohrium',
    'sentry','datadog','popsql',
}

def map_category(main_cat):
    mapping = {
        'AI & Machine Learning': 'AI & Machine Learning',
        'Development Tools': 'Developer Tools',
        'Cloud & Hosting': 'Cloud & Hosting',
        'Design & Creative': 'Design & Creative',
        'Productivity': 'Productivity',
        'Learning & Education': 'Learning & Education',
        'Media & Entertainment': 'Entertainment',
        'Shopping & Lifestyle': 'Shopping & Lifestyle',
        'Travel & Finance': 'Travel',
        'Health & Wellness': 'Health & Wellness',
        'Security & Privacy': 'Security & Privacy',
        'Food & Dining': 'Food & Dining',
        'Marketing & Growth': 'Marketing',
    }
    return mapping.get(main_cat, main_cat)

def map_app_category(main_cat):
    mapping = {
        'AI & Machine Learning': 'Software & Tools',
        'Development Tools': 'Software & Tools',
        'Cloud & Hosting': 'Software & Tools',
        'Design & Creative': 'Software & Tools',
        'Productivity': 'Software & Tools',
        'Learning & Education': 'Software & Tools',
        'Media & Entertainment': 'Lifestyle',
        'Shopping & Lifestyle': 'Lifestyle',
        'Travel & Finance': 'Lifestyle',
        'Health & Wellness': 'Lifestyle',
        'Security & Privacy': 'Software & Tools',
        'Food & Dining': 'Lifestyle',
        'Marketing & Growth': 'Software & Tools',
    }
    return mapping.get(main_cat, 'Software & Tools')

def detect_benefit_type(offer_text):
    offer_lower = offer_text.lower()
    if 'free' in offer_lower:
        return 'Free'
    elif 'off' in offer_lower or 'discount' in offer_lower or '%' in offer_lower:
        return 'Discount'
    elif 'credit' in offer_lower:
        return 'Credits'
    return 'Discount'

def detect_verification(o):
    desc = (o.get('description') or '') + (o.get('long_description') or '')
    desc_lower = desc.lower()
    if o.get('github_offer'):
        return 'GitHub Student Pack'
    if '.edu' in desc_lower or 'student email' in desc_lower:
        return 'Student Email'
    if 'unidays' in desc_lower:
        return 'UNiDAYS'
    if 'student beans' in desc_lower or 'studentbeans' in desc_lower:
        return 'Student Beans'
    if 'student id' in desc_lower or 'enrollment' in desc_lower:
        return 'Student ID'
    if 'sheerid' in desc_lower:
        return 'SheerID'
    return 'Student Email'

def build_tags(o):
    tags = []
    t1 = (o.get('tag1') or '').strip()
    t2 = (o.get('tag2') or '').strip()
    t3 = (o.get('tag3') or '').strip()
    for t in [t1, t2, t3]:
        if t and t not in tags:
            tags.append(t)
    if not tags:
        tags = ['Discount', 'Web']
    return tags

def escape_ts(s):
    if not s:
        return ''
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '').replace('\t', ' ')

def get_claim_url(o):
    slug = o.get('slug', '')
    claim = o.get('claim_url', '') or ''
    if claim and claim.strip():
        return claim
    return f"https://www.studentoffers.co/offer/{slug}"

def offer_to_ts(o):
    slug = o.get('slug', '')
    name = o.get('name', '')
    offer = o.get('offer', '')
    logo = o.get('logo', '') or f"https://img.logo.dev/{slug}.com?token=pk_WQ-XL0MlQ3-ODa_K0zgqEg"
    location = o.get('location') or 'Global'
    main_cat = o.get('category_main', 'Productivity')
    category = map_category(main_cat)
    app_cat = map_app_category(main_cat)
    desc = o.get('description') or offer
    long_desc = o.get('long_description')
    full_desc = long_desc if long_desc else desc
    
    benefit_type = detect_benefit_type(offer)
    region = location
    is_free_for_all = slug in FREE_FOR_ALL
    verification = 'None' if is_free_for_all else detect_verification(o)
    claim_url = get_claim_url(o)
    tags = build_tags(o)
    
    # Truncate description for offerSummary
    summary = desc[:150].strip()
    if len(desc) > 150:
        summary += '...'
    
    tags_str = ', '.join(f'"{t}"' for t in tags)
    
    return f'''  {{
    "title": "{escape_ts(name)} - {escape_ts(offer)}",
    "company": "{escape_ts(name)}",
    "slug": "{slug}",
    "logo": "{logo}",
    "category": "{category}",
    "appCategory": "{app_cat}",
    "offerSummary": "{escape_ts(summary)}",
    "description": "{escape_ts(full_desc)}",
    "benefitType": "{benefit_type}",
    "value": "{escape_ts(offer)}",
    "eligibility": "{'Anyone' if is_free_for_all else 'Students'}",
    "region": "{region}",
    "verification": "{verification}",
    "url": "https://www.studentoffers.co/offer/{slug}",
    "claimUrl": "{claim_url}",
    "tags": [{tags_str}]
  }}'''

# Fetch the data
url = "https://www.studentoffers.co/api/offers?page=1"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36'
})

with urllib.request.urlopen(req) as resp:
    raw = resp.read().decode('utf-8')

data = json.loads(raw)

results = []
found_slugs = []
for o in data:
    if o.get('slug') in MISSING_SLUGS:
        ts_entry = offer_to_ts(o)
        results.append(ts_entry)
        found_slugs.append(o.get('slug'))

print(f"// Found {len(results)} missing offers to add", file=sys.stderr)
for s in sorted(found_slugs):
    print(f"//  - {s}", file=sys.stderr)

# Output just the TS entries with leading comma (to append before closing ] of array)
output = ',\n'.join(results)
print(output)
