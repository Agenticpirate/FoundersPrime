#!/usr/bin/env python3
"""
Quick script to add slugs to all student benefits that don't have them.
This reads the TypeScript file, adds slugs where missing, and writes it back.
"""

import re
import sys

def generate_slug(title: str, company: str) -> str:
    """Generate a URL-friendly slug from title"""
    # Use title, fallback to company
    base = title.lower()
    
    # Remove special characters
    base = re.sub(r'[^a-z0-9\s-]', '', base)
    # Replace spaces with hyphens
    base = re.sub(r'\s+', '-', base)
    # Replace multiple hyphens with single
    base = re.sub(r'-+', '-', base)
    # Remove leading/trailing hyphens
    base = base.strip('-')
    
    return base if base else company.lower().replace(' ', '-')

def add_slugs_to_file(filepath: str):
    """Add slugs to benefits that don't have them"""
    
    print(f"📖 Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all benefit objects
    # Pattern: find objects that have "title" and "company" but no "slug"
    pattern = r'(\{\s*"title":\s*"([^"]+)",\s*"company":\s*"([^"]+)",)(?!\s*"slug":)'
    
    slugs_added = 0
    duplicates = {}
    
    def add_slug(match):
        nonlocal slugs_added
        obj_start = match.group(1)
        title = match.group(2)
        company = match.group(3)
        
        slug = generate_slug(title, company)
        
        # Track duplicates
        if slug in duplicates:
            duplicates[slug] += 1
        else:
            duplicates[slug] = 1
        
        slugs_added += 1
        
        # Insert slug after company
        return f'{obj_start}\n    "slug": "{slug}",'
    
    new_content = re.sub(pattern, add_slug, content)
    
    # Report
    print(f"\n✅ Added {slugs_added} slugs")
    
    # Check for duplicates
    dups = {k: v for k, v in duplicates.items() if v > 1}
    if dups:
        print(f"\n⚠️  Found {len(dups)} duplicate slugs:")
        for slug, count in sorted(dups.items(), key=lambda x: -x[1])[:10]:
            print(f"  - {slug} ({count} times)")
        print("\n  (These may need manual review)")
    
    # Write back
    print(f"\n💾 Writing updated file...")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Done! File updated successfully.")
    return slugs_added

if __name__ == "__main__":
    filepath = "data/student-benefits-2026.ts"
    try:
        count = add_slugs_to_file(filepath)
        print(f"\n🎉 Successfully added {count} slugs to student benefits!")
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)
