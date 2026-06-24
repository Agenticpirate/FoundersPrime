import pandas as pd
from urllib.parse import urlparse
import re
import json
import os

excel_path = "/Users/raviteja/Downloads/Global_Tech_Programs_2026.xlsx"

# Standard mapping for common domains to clean program names
DOMAIN_MAPPING = {
    '500.co': '500 Global',
    'ycombinator.com': 'Y Combinator',
    'techstars.com': 'Techstars',
    'surgeahead.com': 'Surge (Peak XV)',
    'masschallenge.org': 'MassChallenge',
    'plugandplaytechcenter.com': 'Plug and Play',
    'alchemistaccelerator.com': 'Alchemist Accelerator',
    'fi.co': 'Founder Institute',
    'antler.co': 'Antler',
    'sosv.com': 'SOSV',
    'startx.com': 'StartX',
    'dreamit.com': 'Dreamit Ventures',
    'stationf.co': 'Station F',
    'labs.barclays': 'Barclays Labs',
    'zjpark.com': 'Zhangjiang Hi-Tech Park',
    't-hub.co': 'T-Hub',
    'eic.ec.europa.eu': 'EIC Accelerator',
    'vinnova.se': 'Vinnova',
    'mitarabcompetition.com': 'MIT Enterprise Forum Arab Startup Competition',
    'itida.gov.eg': 'ITIDA Egypt',
    'startupbootcamp.org': 'Startupbootcamp',
    'angellist.com': 'AngelList',
    'sequoiacap.com': 'Sequoia Capital',
    'f6s.com': 'F6S',
    'gust.com': 'Gust',
    'startup-harbour.com': 'Bosch Startup Harbour',
    'bmwstartupgarage.com': 'BMW Startup Garage',
    'greentownlabs.com': 'Greentown Labs',
    'startup-bootcamp.org': 'Startupbootcamp',
    'activate.org': 'Activate Fellowship',
}

def clean_name_from_url(url, category):
    if not isinstance(url, str) or not url.startswith('http'):
        return f"Unknown {category.capitalize()}"
    parsed = urlparse(url)
    domain = parsed.netloc.replace('www.', '').lower()
    
    # Check if domain is in our mapping
    for mapped_domain, name in DOMAIN_MAPPING.items():
        if mapped_domain in domain:
            return name
            
    # Derive name from domain path/token
    parts = domain.split('.')
    if len(parts) > 1:
        token = parts[0]
        if token == 'co' or token == 'com' or token == 'org' or token == 'net':
            token = parts[1]
    else:
        token = domain
        
    # Format token nicely
    token = token.replace('-', ' ').replace('_', ' ')
    words = token.split(' ')
    words = [w.capitalize() for w in words]
    name = ' '.join(words)
    
    # Append suffix based on sheet type
    if category == 'accelerators' and 'accelerator' not in name.lower():
        name += ' Accelerator'
    elif category == 'incubators' and 'incubator' not in name.lower():
        name += ' Incubator'
    elif category == 'grants' and 'grant' not in name.lower() and 'program' not in name.lower():
        name += ' Program'
        
    return name

def make_slug(name):
    s = name.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s)
    return s.strip('-')

sheets_to_process = {
    '🚀 Accelerators': 'accelerators',
    '🏢 Incubators': 'incubators',
    '💰 Grants & Gov Programs': 'grants'
}

all_parsed_programs = []
duplicates_found = []
seen_slugs = {}

for sheet_name, category in sheets_to_process.items():
    print(f"\nProcessing sheet: {sheet_name}...")
    df = pd.read_excel(excel_path, sheet_name=sheet_name)
    
    # Iterate through row values
    for idx, row in df.iterrows():
        # Clean URL and instructions
        url = row['Status / Deadline']
        how_to_apply = row['Website URL']
        
        if not isinstance(url, str) or not url.startswith('http'):
            continue
            
        # Extract program details by correcting the shifted columns
        funding_val = str(row['Region']) if pd.notna(row['Region']) else 'Varies'
        equity_val = str(row['Funding / Value']) if pd.notna(row['Funding / Value']) else '0%'
        deadline_val = str(row['Equity']) if pd.notna(row['Equity']) else 'Rolling'
        
        derived_name = clean_name_from_url(url, category)
        slug = make_slug(derived_name)
        
        program = {
            'id': slug,
            'name': derived_name,
            'slug': slug,
            'logo': f"https://www.google.com/s2/favicons?domain={urlparse(url).netloc}&sz=128",
            'location': str(row['Sector / Focus']) if pd.notna(row['Sector / Focus']) else 'Global',
            'region': str(row['Sector / Focus']) if pd.notna(row['Sector / Focus']) else 'Global',
            'investment': funding_val,
            'equity': equity_val,
            'focusArea': str(row['Type']) if pd.notna(row['Type']) else 'All Tech',
            'founderStage': 'Early Stage',
            'programDuration': 'Varies',
            'applicationDeadline': deadline_val,
            'applicationStatus': 'Active' if 'rolling' in deadline_val.lower() or 'continuous' in deadline_val.lower() else 'Rolling',
            'website': urlparse(url).scheme + "://" + urlparse(url).netloc,
            'applicationLink': url,
            'description': str(how_to_apply) if pd.notna(how_to_apply) else f"{derived_name} startup support program.",
            'features': [category.capitalize(), str(row['Type'])] if pd.notna(row['Type']) else [category.capitalize()],
            'category': category
        }
        
        # Check for duplicates within Excel
        if slug in seen_slugs:
            duplicates_found.append({
                'slug': slug,
                'category': category,
                'first_instance': seen_slugs[slug],
                'duplicate_instance': program
            })
            # Keep the richer one
            if len(program['description']) > len(seen_slugs[slug]['description']):
                seen_slugs[slug] = program
        else:
            seen_slugs[slug] = program

# Prepare output
clean_programs = list(seen_slugs.values())
print(f"\nTotal rows processed across sheets: {len(clean_programs) + len(duplicates_found)}")
print(f"Total duplicates found and resolved: {len(duplicates_found)}")
print(f"Total clean programs remaining: {len(clean_programs)}")

# Log duplicates
if len(duplicates_found) > 0:
    print("\n--- Duplicate Examples ---")
    for d in duplicates_found[:5]:
        print(f"Duplicate slug '{d['slug']}':")
        print(f"  First: {d['first_instance']['name']} | URL: {d['first_instance']['applicationLink']}")
        print(f"  Duplicate: {d['duplicate_instance']['name']} | URL: {d['duplicate_instance']['applicationLink']}")

# Dump clean data to scratch JSON file
scratch_json = "/Users/raviteja/.gemini/antigravity-ide/brain/faeb3fb4-dc57-4fad-a75d-c66bbeacc50d/scratch/clean_excel_programs.json"
os.makedirs(os.path.dirname(scratch_json), exist_ok=True)
with open(scratch_json, 'w') as f:
    json.dump(clean_programs, f, indent=2)
print(f"\nSuccessfully wrote {len(clean_programs)} clean programs to {scratch_json}")
