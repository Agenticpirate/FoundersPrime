#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

console.log('\n🗑️  Deleting Misaligned Deals...\n');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`📊 Total deals before: ${deals.length}`);

// List of deals to delete (based on your screenshot)
const dealsToDelete = [
  'customgpt',
  'wp-engine',
  'wpengine',
  'snov.io',
  'snov-io',
  'snovio'
];

// Filter out the deals
const filteredDeals = deals.filter(deal => {
  const slug = deal.slug?.toLowerCase() || '';
  const title = deal.title?.toLowerCase() || '';
  const provider = deal.provider?.toLowerCase() || '';
  
  const shouldDelete = dealsToDelete.some(pattern => 
    slug.includes(pattern) || 
    title.includes(pattern) || 
    provider.includes(pattern)
  );
  
  if (shouldDelete) {
    console.log(`❌ Deleting: ${deal.title} (${deal.slug})`);
    return false;
  }
  
  return true;
});

const deletedCount = deals.length - filteredDeals.length;

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log(`\n✅ Deleted ${deletedCount} deals`);
console.log(`📊 Total deals after: ${filteredDeals.length}`);
console.log('\n🔄 Next steps:');
console.log('   1. Restart dev server');
console.log('   2. Refresh browser\n');
