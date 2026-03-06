import json

# Load merged data
with open('data/yc_companies_2024_2026.json', 'r') as f:
    companies = json.load(f)

# Keep only YC companies (remove all TrustMRR)
yc_only = [c for c in companies if c.get('source') != 'trustmrr']

print(f"Original total: {len(companies)}")
print(f"TrustMRR entries removed: {len(companies) - len(yc_only)}")
print(f"Clean YC dataset: {len(yc_only)}")

# Save clean dataset
with open('data/yc_companies_2024_2026.json', 'w') as f:
    json.dump(yc_only, f, indent=2)

print(f"\n✓ Saved {len(yc_only)} verified YC companies to data/yc_companies_2024_2026.json")

# Backup TrustMRR data for reference
trustmrr_only = [c for c in companies if c.get('source') == 'trustmrr']
with open('data/trustmrr_backup.json', 'w') as f:
    json.dump(trustmrr_only, f, indent=2)

print(f"✓ Backed up {len(trustmrr_only)} TrustMRR entries to data/trustmrr_backup.json")
