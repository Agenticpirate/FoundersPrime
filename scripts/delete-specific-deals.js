#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

console.log('\n🗑️  Removing Specific Deals...\n');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`📊 Total deals before: ${deals.length}\n`);

// Slugs to delete
const slugsToDelete = [
  'new-deal-on-emergent',
  'google-gemini'
];

// Filter out the deals
const filteredDeals = deals.filter(deal => {
  const shouldDelete = slugsToDelete.includes(deal.slug);
  
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
console.log('\n🔄 Restart server and refresh browser\n');
