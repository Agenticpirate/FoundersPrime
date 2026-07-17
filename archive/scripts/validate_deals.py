#!/usr/bin/env python3
"""
Validates student-benefits-2026.ts for:
1. Duplicate slugs
2. Duplicate companies (different slugs for same company)
3. Broken/dead links (HTTP status checks)
4. Missing required fields
5. Placeholder/empty values
6. Invalid URLs
7. Duplicate titles
"""

import json
import re
import sys
import subprocess
import concurrent.futures
import urllib.request
import urllib.error
import http.client
from pathlib import Path

DATA_FILE = Path('/Users/raviteja/KIRO/FoundersPrime/data/student-benefits-2026.ts')
REPORT_FILE = Path('/tmp/validation_report.json')

# Required fields
REQUIRED_FIELDS = ['title', 'company', 'slug', 'category', 'appCategory', 
                   'offerSummary', 'description', 'benefitType', 'value',
                   'eligibility', 'region', 'verification', 'url', 'claimUrl']

VALID_BENEFIT_TYPES = {'Free', 'Discount', 'Credits', 'Grant', 'Scholarship', 'Program', 'Other'}
VALID_APP_CATEGORIES = {'Software & Tools', 'Credits & Savings', 'Funding & Opportunities', 
                        'Programs', 'Lifestyle'}
VALID_REGIONS = {'Global', 'US', 'India', 'UK', 'EU', 'Limited Countries', 'US & Canada',
                 'US, Canada', 'North America', 'Asia', 'Europe'}

def parse_ts_file(filepath):
    """Parse the TypeScript array of objects from the .ts file"""
    content = filepath.read_text(encoding='utf-8')
    
    # Extract the JSON array content between the first [ and last ]
    # The file has: export const studentBenefits2026: StudentBenefit[] = [...]
    match = re.search(r'=\s*(\[[\s\S]*\]);?\s*$', content)
    if not match:
        print("ERROR: Could not find array in file", file=sys.stderr)
        sys.exit(1)
    
    array_str = match.group(1)
    
    # Fix TypeScript-specific syntax for JSON parsing
    # Remove trailing commas before } and ]
    array_str = re.sub(r',(\s*[\]}])', r'\1', array_str)
    # Remove TypeScript comments
    array_str = re.sub(r'//[^\n]*', '', array_str)
    array_str = re.sub(r'/\*[\s\S]*?\*/', '', array_str)
    
    try:
        return json.loads(array_str)
    except json.JSONDecodeError as e:
        print(f"ERROR parsing JSON: {e}", file=sys.stderr)
        # Try to find the problematic line
        lines = array_str.split('\n')
        err_line = e.lineno
        print(f"Context around line {err_line}:", file=sys.stderr)
        for i in range(max(0, err_line-3), min(len(lines), err_line+3)):
            print(f"  {i+1}: {lines[i]}", file=sys.stderr)
        sys.exit(1)

def check_url(entry):
    """Check if a URL is reachable. Returns (slug, url, status, is_redirect, final_url)"""
    slug = entry.get('slug', 'unknown')
    url = entry.get('claimUrl') or entry.get('url', '')
    
    if not url or url.strip() == '':
        return slug, url, 'EMPTY', False, ''
    
    if not url.startswith('http'):
        return slug, url, 'INVALID_SCHEME', False, ''
    
    try:
        req = urllib.request.Request(url, method='HEAD', headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,*/*',
        })
        with urllib.request.urlopen(req, timeout=8) as resp:
            status = resp.status
            final_url = resp.url
            is_redirect = final_url != url
            return slug, url, str(status), is_redirect, final_url
    except urllib.error.HTTPError as e:
        return slug, url, f'HTTP_{e.code}', False, ''
    except urllib.error.URLError as e:
        reason = str(e.reason) if hasattr(e, 'reason') else str(e)
        return slug, url, f'ERROR: {reason[:60]}', False, ''
    except Exception as e:
        return slug, url, f'ERROR: {str(e)[:60]}', False, ''

def main():
    print("=" * 70)
    print("STUDENT BENEFITS DATA VALIDATION")
    print("=" * 70)
    
    print(f"\n📂 Loading data from {DATA_FILE.name}...")
    benefits = parse_ts_file(DATA_FILE)
    print(f"   ✓ Loaded {len(benefits)} entries\n")
    
    issues = {
        'duplicate_slugs': [],
        'duplicate_companies': [],
        'duplicate_titles': [],
        'missing_fields': [],
        'empty_values': [],
        'invalid_urls': [],
        'broken_links': [],
        'working_links': [],
        'redirects': [],
        'invalid_categories': [],
        'invalid_benefit_types': [],
        'suspicious_descriptions': [],
    }
    
    # ── 1. Check for duplicate slugs ─────────────────────────────────────
    print("🔍 Checking for duplicate slugs...")
    slug_map = {}
    for i, b in enumerate(benefits):
        slug = b.get('slug', '')
        if slug in slug_map:
            issues['duplicate_slugs'].append({
                'slug': slug,
                'first_idx': slug_map[slug],
                'second_idx': i,
                'companies': [benefits[slug_map[slug]].get('company'), b.get('company')]
            })
        else:
            slug_map[slug] = i
    print(f"   {'⚠️  ' + str(len(issues['duplicate_slugs'])) + ' duplicates found' if issues['duplicate_slugs'] else '✓ No duplicate slugs'}")
    
    # ── 2. Check for duplicate companies ─────────────────────────────────
    print("🔍 Checking for duplicate companies...")
    company_map = {}
    for i, b in enumerate(benefits):
        co = b.get('company', '').strip().lower()
        if co in company_map:
            # Only flag if title/offer differs (not just a second plan)
            existing = company_map[co]
            if b.get('value') != benefits[existing].get('value'):
                issues['duplicate_companies'].append({
                    'company': b.get('company'),
                    'idx1': existing,
                    'slug1': benefits[existing].get('slug'),
                    'value1': benefits[existing].get('value'),
                    'idx2': i,
                    'slug2': b.get('slug'),
                    'value2': b.get('value'),
                })
        else:
            company_map[co] = i
    print(f"   {'⚠️  ' + str(len(issues['duplicate_companies'])) + ' potential duplicate companies' if issues['duplicate_companies'] else '✓ No duplicate companies'}")
    
    # ── 3. Check for duplicate titles ────────────────────────────────────
    print("🔍 Checking for duplicate titles...")
    title_map = {}
    for i, b in enumerate(benefits):
        title = b.get('title', '').strip().lower()
        if title and title in title_map:
            issues['duplicate_titles'].append({
                'title': b.get('title'),
                'slugs': [benefits[title_map[title]].get('slug'), b.get('slug')]
            })
        else:
            title_map[title] = i
    print(f"   {'⚠️  ' + str(len(issues['duplicate_titles'])) + ' duplicate titles' if issues['duplicate_titles'] else '✓ No duplicate titles'}")
    
    # ── 4. Check missing required fields ─────────────────────────────────
    print("🔍 Checking for missing required fields...")
    for b in benefits:
        missing = [f for f in REQUIRED_FIELDS if not (b.get(f) or "").strip()]
        if missing:
            issues['missing_fields'].append({
                'slug': b.get('slug', 'UNKNOWN'),
                'company': b.get('company', 'UNKNOWN'),
                'missing': missing
            })
    print(f"   {'⚠️  ' + str(len(issues['missing_fields'])) + ' entries with missing fields' if issues['missing_fields'] else '✓ All required fields present'}")
    
    # ── 5. Check for suspicious/empty values ─────────────────────────────
    print("🔍 Checking for suspicious values...")
    placeholders = ['n/a', 'tbd', 'todo', 'placeholder', 'unknown', 'test', '???', 'example', 'lorem']
    for b in benefits:
        for field in ['offerSummary', 'description', 'value']:
            val = (b.get(field) or '').lower().strip()
            if any(p == val for p in placeholders):
                issues['empty_values'].append({
                    'slug': b.get('slug'),
                    'company': b.get('company'),
                    'field': field,
                    'value': b.get(field)
                })
    print(f"   {'⚠️  ' + str(len(issues['empty_values'])) + ' suspicious values' if issues['empty_values'] else '✓ No suspicious/placeholder values'}")
    
    # ── 6. Validate URL format ────────────────────────────────────────────
    print("🔍 Validating URL formats...")
    url_pattern = re.compile(r'^https?://[^\s/$.?#].[^\s]*$')
    for b in benefits:
        for field in ['url', 'claimUrl']:
            url = b.get(field, '')
            if url and not url_pattern.match(url):
                issues['invalid_urls'].append({
                    'slug': b.get('slug'),
                    'company': b.get('company'),
                    'field': field,
                    'url': url
                })
    print(f"   {'⚠️  ' + str(len(issues['invalid_urls'])) + ' malformed URLs' if issues['invalid_urls'] else '✓ All URLs have valid format'}")
    
    # ── 7. Check invalid categories/benefit types ─────────────────────────
    print("🔍 Checking field values...")
    for b in benefits:
        bt = b.get('benefitType', '')
        if bt and bt not in VALID_BENEFIT_TYPES:
            issues['invalid_benefit_types'].append({
                'slug': b.get('slug'),
                'company': b.get('company'),
                'benefitType': bt
            })
        ac = b.get('appCategory', '')
        if ac and ac not in VALID_APP_CATEGORIES:
            issues['invalid_categories'].append({
                'slug': b.get('slug'),
                'company': b.get('company'),
                'appCategory': ac
            })
    
    total_category_issues = len(issues['invalid_categories']) + len(issues['invalid_benefit_types'])
    print(f"   {'⚠️  ' + str(total_category_issues) + ' invalid category/type values' if total_category_issues else '✓ All categories and benefit types are valid'}")
    
    # ── 8. Link checking (sample 200 unique URLs) ─────────────────────────
    print("\n🔗 Checking links (sampling up to 200 unique claimUrls)...")
    seen_urls = set()
    entries_to_check = []
    for b in benefits:
        url = b.get('claimUrl') or b.get('url', '')
        if url and url not in seen_urls:
            seen_urls.add(url)
            entries_to_check.append(b)
            if len(entries_to_check) >= 200:
                break
    
    print(f"   Checking {len(entries_to_check)} unique URLs (parallel, 30 threads)...")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=30) as executor:
        futures = {executor.submit(check_url, e): e for e in entries_to_check}
        done_count = 0
        for future in concurrent.futures.as_completed(futures):
            slug, url, status, is_redirect, final_url = future.result()
            done_count += 1
            if done_count % 50 == 0:
                print(f"   ... {done_count}/{len(entries_to_check)} checked")
            
            if status.startswith('2') or status.startswith('3'):
                issues['working_links'].append({'slug': slug, 'url': url, 'status': status})
                if is_redirect and status.startswith('3'):
                    issues['redirects'].append({'slug': slug, 'from': url, 'to': final_url, 'status': status})
            elif status == 'EMPTY':
                issues['broken_links'].append({'slug': slug, 'url': url, 'status': 'EMPTY_URL', 'severity': 'HIGH'})
            elif 'HTTP_404' in status or 'HTTP_410' in status:
                issues['broken_links'].append({'slug': slug, 'url': url, 'status': status, 'severity': 'HIGH'})
            elif 'HTTP_5' in status:
                issues['broken_links'].append({'slug': slug, 'url': url, 'status': status, 'severity': 'MEDIUM'})
            elif 'ERROR' in status or 'INVALID' in status:
                issues['broken_links'].append({'slug': slug, 'url': url, 'status': status, 'severity': 'HIGH'})
            # HTTP 401, 403, 405 etc. may just block bots — mark as WARNING not broken
            elif 'HTTP_40' in status:
                issues['redirects'].append({'slug': slug, 'url': url, 'status': status + ' (bot-blocked, likely fine)'})
    
    print(f"\n   ✅ Working: {len(issues['working_links'])} links")
    print(f"   ⚠️  Redirects: {len(issues['redirects'])}")
    print(f"   ❌ Broken: {len(issues['broken_links'])}")
    
    # ── 9. Write report ───────────────────────────────────────────────────
    report = {
        'summary': {
            'total_entries': len(benefits),
            'duplicate_slugs': len(issues['duplicate_slugs']),
            'duplicate_companies': len(issues['duplicate_companies']),
            'duplicate_titles': len(issues['duplicate_titles']),
            'missing_fields': len(issues['missing_fields']),
            'empty_values': len(issues['empty_values']),
            'invalid_urls': len(issues['invalid_urls']),
            'invalid_categories': len(issues['invalid_categories']),
            'invalid_benefit_types': len(issues['invalid_benefit_types']),
            'broken_links': len(issues['broken_links']),
            'working_links': len(issues['working_links']),
            'redirects': len(issues['redirects']),
            'urls_checked': len(entries_to_check),
        },
        'issues': issues
    }
    
    REPORT_FILE.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"\n📄 Full report saved to {REPORT_FILE}")
    
    # ── Print summary ─────────────────────────────────────────────────────
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    s = report['summary']
    print(f"Total entries:         {s['total_entries']}")
    print(f"Duplicate slugs:       {s['duplicate_slugs']} {'❌' if s['duplicate_slugs'] else '✅'}")
    print(f"Duplicate companies:   {s['duplicate_companies']} {'⚠️' if s['duplicate_companies'] else '✅'}")
    print(f"Duplicate titles:      {s['duplicate_titles']} {'⚠️' if s['duplicate_titles'] else '✅'}")
    print(f"Missing fields:        {s['missing_fields']} {'❌' if s['missing_fields'] else '✅'}")
    print(f"Suspicious values:     {s['empty_values']} {'⚠️' if s['empty_values'] else '✅'}")
    print(f"Malformed URLs:        {s['invalid_urls']} {'❌' if s['invalid_urls'] else '✅'}")
    print(f"Invalid categories:    {s['invalid_categories']} {'⚠️' if s['invalid_categories'] else '✅'}")
    print(f"Invalid benefit types: {s['invalid_benefit_types']} {'⚠️' if s['invalid_benefit_types'] else '✅'}")
    print(f"\nLink Check ({s['urls_checked']} URLs sampled):")
    print(f"  Working:   {s['working_links']} ✅")
    print(f"  Redirects: {s['redirects']} ⚠️")
    print(f"  Broken:    {s['broken_links']} {'❌' if s['broken_links'] else '✅'}")
    
    # Print broken links details
    if issues['broken_links']:
        print("\n❌ BROKEN LINKS:")
        for bl in issues['broken_links']:
            print(f"  [{bl['severity']}] {bl['slug']}: {bl['status']}")
            print(f"         {bl['url']}")
    
    # Print duplicate slugs
    if issues['duplicate_slugs']:
        print("\n❌ DUPLICATE SLUGS:")
        for d in issues['duplicate_slugs']:
            print(f"  Slug '{d['slug']}': entries {d['first_idx']} ({d['companies'][0]}) and {d['second_idx']} ({d['companies'][1]})")
    
    # Print duplicate companies (top 10)
    if issues['duplicate_companies']:
        print(f"\n⚠️  DUPLICATE COMPANIES (showing first 10 of {len(issues['duplicate_companies'])}):")
        for d in issues['duplicate_companies'][:10]:
            print(f"  {d['company']}: '{d['value1']}' (slug: {d['slug1']}) vs '{d['value2']}' (slug: {d['slug2']})")
    
    return report

if __name__ == '__main__':
    main()
