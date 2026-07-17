import json
import random

# Load YC data
with open('data/yc_companies_2024_2026.json', 'r') as f:
    yc_companies = json.load(f)

# Load TrustMRR data
with open('data/trustmrr_startups.json', 'r') as f:
    trustmrr_companies = json.load(f)

print(f"YC companies: {len(yc_companies)}")
print(f"TrustMRR companies: {len(trustmrr_companies)}")

# Merge the datasets
combined = yc_companies + trustmrr_companies

# Randomize the entire list
random.shuffle(combined)

print(f"Combined total: {len(combined)}")

# Save merged data
with open('data/yc_companies_2024_2026.json', 'w') as f:
    json.dump(combined, f, indent=2)

print(f"✓ Saved {len(combined)} companies to data/yc_companies_2024_2026.json")

# Print breakdown
yc_count = sum(1 for c in combined if c.get('source') != 'trustmrr')
trustmrr_count = sum(1 for c in combined if c.get('source') == 'trustmrr')

print(f"\nBreakdown:")
print(f"  YC companies: {yc_count}")
print(f"  TrustMRR companies: {trustmrr_count}")
print(f"  Total: {len(combined)}")
