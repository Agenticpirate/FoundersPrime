import json

# Load merged data
with open('data/yc_companies_2024_2026.json', 'r') as f:
    companies = json.load(f)

# Separate YC and TrustMRR
yc_companies = [c for c in companies if c.get('source') != 'trustmrr']
trustmrr_companies = [c for c in companies if c.get('source') == 'trustmrr']

print(f"Total companies: {len(companies)}")
print(f"YC companies: {len(yc_companies)}")
print(f"TrustMRR companies: {len(trustmrr_companies)}")

# Analyze TrustMRR data quality
issues = {
    'startup_not_found': [],
    'missing_logo': [],
    'revenue_in_description': [],
    'missing_website': [],
    'missing_description': [],
    'missing_founders': []
}

for company in trustmrr_companies:
    name = company.get('name', '')
    
    # Check for "Startup not found"
    if 'not found' in name.lower():
        issues['startup_not_found'].append(company)
    
    # Check for missing logo
    if not company.get('small_logo_thumb_url'):
        issues['missing_logo'].append(name)
    
    # Check for revenue in description
    desc = company.get('description', '')
    if 'last 30 days' in desc or '$' in desc[:50]:
        issues['revenue_in_description'].append(name)
    
    # Check for missing website
    if not company.get('website'):
        issues['missing_website'].append(name)
    
    # Check for missing description
    if not company.get('description') and not company.get('one_liner'):
        issues['missing_description'].append(name)
    
    # Check for missing founders
    if not company.get('founders_enriched') or len(company.get('founders_enriched', [])) == 0:
        issues['missing_founders'].append(name)

print("\n" + "="*60)
print("TRUSTMRR DATA QUALITY ISSUES")
print("="*60)

print(f"\n❌ Startup not found entries: {len(issues['startup_not_found'])}")
if issues['startup_not_found']:
    for c in issues['startup_not_found'][:5]:
        print(f"  - {c.get('name')} (slug: {c.get('slug')})")

print(f"\n❌ Missing logos: {len(issues['missing_logo'])}")
if issues['missing_logo']:
    print(f"  Examples: {', '.join(issues['missing_logo'][:5])}")

print(f"\n❌ Revenue in description: {len(issues['revenue_in_description'])}")
if issues['revenue_in_description']:
    print(f"  Examples: {', '.join(issues['revenue_in_description'][:5])}")

print(f"\n❌ Missing website: {len(issues['missing_website'])}")
print(f"\n❌ Missing description: {len(issues['missing_description'])}")
print(f"\n❌ Missing founders: {len(issues['missing_founders'])}")

# Recommendation
print("\n" + "="*60)
print("RECOMMENDATION")
print("="*60)
print(f"\nRemove {len(issues['startup_not_found'])} invalid entries")
print(f"Keep only {len(trustmrr_companies) - len(issues['startup_not_found'])} valid TrustMRR startups")
print(f"Final total would be: {len(yc_companies) + len(trustmrr_companies) - len(issues['startup_not_found'])} companies")
