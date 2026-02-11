#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('Total deals before cleanup:', deals.length);

// Find duplicates by normalized title (lowercase, trimmed)
const titleMap = new Map();
const duplicates = [];

deals.forEach((deal, index) => {
  // Normalize title for comparison
  const normalizedTitle = deal.title?.toLowerCase().trim()
    .replace(/promo code$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (!normalizedTitle) return;
  
  if (titleMap.has(normalizedTitle)) {
    const existing = titleMap.get(normalizedTitle);
    // Keep the one with more data (longer description, has faqs, etc.)
    const existingScore = scoreQuality(existing.deal);
    const currentScore = scoreQuality(deal);
    
    if (currentScore > existingScore) {
      // Current is better, mark existing as duplicate
      duplicates.push(existing.index);
      titleMap.set(normalizedTitle, { deal, index });
    } else {
      // Existing is better, mark current as duplicate
      duplicates.push(index);
    }
  } else {
    titleMap.set(normalizedTitle, { deal, index });
  }
});

// Also find duplicates by slug pattern (e.g., slack-73, slack-74)
const slugBaseMap = new Map();
deals.forEach((deal, index) => {
  if (duplicates.includes(index)) return;
  
  // Extract base slug (remove trailing numbers)
  const baseSlug = deal.slug?.replace(/-\d+$/, '');
  if (!baseSlug) return;
  
  if (slugBaseMap.has(baseSlug)) {
    const existing = slugBaseMap.get(baseSlug);
    // If slugs are different but base is same, it's a duplicate
    if (existing.deal.slug !== deal.slug) {
      const existingScore = scoreQuality(existing.deal);
      const currentScore = scoreQuality(deal);
      
      if (currentScore > existingScore) {
        if (!duplicates.includes(existing.index)) {
          duplicates.push(existing.index);
        }
        slugBaseMap.set(baseSlug, { deal, index });
      } else {
        if (!duplicates.includes(index)) {
          duplicates.push(index);
        }
      }
    }
  } else {
    slugBaseMap.set(baseSlug, { deal, index });
  }
});

function scoreQuality(deal) {
  let score = 0;
  if (deal.description?.length > 200) score += 3;
  if (deal.description?.length > 500) score += 2;
  if (deal.faqs?.length > 0) score += 5;
  if (deal.benefits?.length > 0) score += 3;
  if (deal.applicationProcess?.length > 2) score += 2;
  if (deal.eligibility?.length > 2) score += 2;
  if (deal.verified) score += 1;
  if (deal.featured) score += 1;
  if (deal.recommended) score += 1;
  if (deal.savingsAmount > 0) score += 1;
  if (deal.applicationUrl && !deal.applicationUrl.includes('google.com/search')) score += 2;
  return score;
}

// Remove duplicates
const cleanedDeals = deals.filter((_, index) => !duplicates.includes(index));

console.log('Duplicates found:', duplicates.length);
console.log('Total deals after cleanup:', cleanedDeals.length);

// Show some examples of removed duplicates
console.log('\nSample removed duplicates:');
duplicates.slice(0, 20).forEach(idx => {
  console.log(`  - ${deals[idx].title} (${deals[idx].slug})`);
});

fs.writeFileSync(path, JSON.stringify(cleanedDeals, null, 2));
console.log('\n✅ Cleanup complete!');
