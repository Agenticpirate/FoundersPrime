#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

console.log('\n🗑️  Removing Worst Quality Deals...\n');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`📊 Total deals before: ${deals.length}\n`);

// Filter out the worst deals
const cleanDeals = deals.filter(deal => {
  const reasons = [];
  
  // Remove if title is too short (likely incomplete)
  if (!deal.title || deal.title.length < 10) {
    reasons.push('Title too short');
  }
  
  // Remove if no description at all
  if (!deal.description || deal.description.length < 20) {
    reasons.push('No description');
  }
  
  // Remove if no application URL
  if (!deal.applicationUrl || deal.applicationUrl === '' || deal.applicationUrl === 'undefined') {
    reasons.push('No application URL');
  }
  
  // Remove promo code deals (usually low quality)
  if (deal.title?.toLowerCase().includes('promo code')) {
    reasons.push('Promo code deal');
  }
  
  // Remove if slug is undefined or invalid
  if (!deal.slug || deal.slug === 'undefined' || deal.slug.length < 3) {
    reasons.push('Invalid slug');
  }
  
  // Remove if provider is missing
  if (!deal.provider || deal.provider === 'undefined') {
    reasons.push('No provider');
  }
  
  if (reasons.length > 0) {
    console.log(`❌ Removing: ${deal.title || 'Untitled'} (${deal.slug || 'no-slug'})`);
    console.log(`   Reasons: ${reasons.join(', ')}`);
    return false;
  }
  
  return true;
});

const deletedCount = deals.length - cleanDeals.length;

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(cleanDeals, null, 2));

console.log(`\n✅ Removed ${deletedCount} low-quality deals`);
console.log(`📊 Remaining deals: ${cleanDeals.length}`);
console.log('\n🔄 Next steps:');
console.log('   1. Restart dev server');
console.log('   2. Refresh browser\n');
