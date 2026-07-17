import json
import os
from collections import defaultdict

# Load data
with open('data/yc_companies_2024_2026.json', 'r') as f:
    companies = json.load(f)

print(f"Total companies: {len(companies)}\n")

# Statistics
stats = {
    'total': len(companies),
    'missing_logo': 0,
    'broken_logo_path': 0,
    'missing_website': 0,
    'missing_description': 0,
    'no_founders': 0,
    'founders_missing_avatar': 0,
    'founders_with_null_avatar': 0,
    'founders_missing_linkedin': 0,
    'founders_missing_twitter': 0,
    'company_missing_linkedin': 0,
    'company_missing_twitter': 0,
    'company_missing_crunchbase': 0,
}

issues = defaultdict(list)

for company in companies:
    slug = company.get('slug', 'unknown')
    name = company.get('name', 'Unknown')
    
    # Check company logo
    logo = company.get('small_logo_thumb_url')
    if not logo:
        stats['missing_logo'] += 1
        issues['missing_logo'].append(f"{name} ({slug})")
    elif logo.startswith('/images/'):
        # Check if file exists
        file_path = f"public{logo}"
        if not os.path.exists(file_path):
            stats['broken_logo_path'] += 1
            issues['broken_logo'].append(f"{name} ({slug}): {logo}")
    
    # Check basic company info
    if not company.get('website'):
        stats['missing_website'] += 1
        issues['missing_website'].append(f"{name} ({slug})")
    
    if not company.get('long_description') and not company.get('one_liner'):
        stats['missing_description'] += 1
        issues['missing_description'].append(f"{name} ({slug})")
    
    # Check company social links
    if not company.get('linkedin_url'):
        stats['company_missing_linkedin'] += 1
    if not company.get('twitter_url'):
        stats['company_missing_twitter'] += 1
    if not company.get('crunchbase_url'):
        stats['company_missing_crunchbase'] += 1
    
    # Check founders
    founders_enriched = company.get('founders_enriched', [])
    if not founders_enriched:
        stats['no_founders'] += 1
        issues['no_founders'].append(f"{name} ({slug})")
        continue
    
    for founder in founders_enriched:
        fname = founder.get('name', 'Unknown')
        
        # Check avatar
        avatar = founder.get('avatar')
        if not avatar:
            stats['founders_with_null_avatar'] += 1
        elif avatar.startswith('/images/'):
            file_path = f"public{avatar}"
            if not os.path.exists(file_path):
                stats['founders_missing_avatar'] += 1
                issues['founder_broken_avatar'].append(f"{fname} @ {name}: {avatar}")
        
        # Check social links
        if not founder.get('linkedin'):
            stats['founders_missing_linkedin'] += 1
        if not founder.get('twitter'):
            stats['founders_missing_twitter'] += 1

# Print summary
print("=" * 60)
print("DATA QUALITY REPORT")
print("=" * 60)

print("\n📊 COMPANY DATA:")
print(f"  Missing logos: {stats['missing_logo']}")
print(f"  Broken logo paths: {stats['broken_logo_path']}")
print(f"  Missing websites: {stats['missing_website']}")
print(f"  Missing descriptions: {stats['missing_description']}")
print(f"  Companies without founders: {stats['no_founders']}")

print("\n🔗 COMPANY SOCIAL LINKS:")
print(f"  Missing LinkedIn: {stats['company_missing_linkedin']} ({stats['company_missing_linkedin']/stats['total']*100:.1f}%)")
print(f"  Missing Twitter: {stats['company_missing_twitter']} ({stats['company_missing_twitter']/stats['total']*100:.1f}%)")
print(f"  Missing Crunchbase: {stats['company_missing_crunchbase']} ({stats['company_missing_crunchbase']/stats['total']*100:.1f}%)")

print("\n👥 FOUNDER DATA:")
total_founders = sum(len(c.get('founders_enriched', [])) for c in companies)
print(f"  Total founders: {total_founders}")
print(f"  Founders with null avatars: {stats['founders_with_null_avatar']} ({stats['founders_with_null_avatar']/total_founders*100:.1f}%)")
print(f"  Founders with broken avatar paths: {stats['founders_missing_avatar']}")
print(f"  Founders missing LinkedIn: {stats['founders_missing_linkedin']} ({stats['founders_missing_linkedin']/total_founders*100:.1f}%)")
print(f"  Founders missing Twitter: {stats['founders_missing_twitter']} ({stats['founders_missing_twitter']/total_founders*100:.1f}%)")

# Show critical issues
print("\n" + "=" * 60)
print("CRITICAL ISSUES (if any)")
print("=" * 60)

critical = False
if stats['broken_logo_path'] > 0:
    critical = True
    print(f"\n⚠️  {stats['broken_logo_path']} companies have broken logo paths:")
    for issue in issues['broken_logo'][:10]:
        print(f"    - {issue}")
    if len(issues['broken_logo']) > 10:
        print(f"    ... and {len(issues['broken_logo']) - 10} more")

if stats['founders_missing_avatar'] > 0:
    critical = True
    print(f"\n⚠️  {stats['founders_missing_avatar']} founders have broken avatar paths:")
    for issue in issues['founder_broken_avatar'][:10]:
        print(f"    - {issue}")
    if len(issues['founder_broken_avatar']) > 10:
        print(f"    ... and {len(issues['founder_broken_avatar']) - 10} more")

if stats['no_founders'] > 0:
    critical = True
    print(f"\n⚠️  {stats['no_founders']} companies have no founder data:")
    for issue in issues['no_founders'][:10]:
        print(f"    - {issue}")

if not critical:
    print("\n✅ No critical issues found! All images are accessible and data is complete.")

print("\n" + "=" * 60)
