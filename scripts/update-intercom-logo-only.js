#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

console.log('\n🔧 Updating Intercom Logo...\n');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`📊 Total deals loaded: ${deals.length}`);

// Find Intercom deal
const intercomIndex = deals.findIndex(deal => 
  deal.slug === 'intercom-early-stage' || 
  (deal.provider === 'Intercom' && deal.title.includes('Early Stage'))
);

if (intercomIndex === -1) {
  console.error('❌ Intercom deal not found!');
  process.exit(1);
}

const oldLogo = deals[intercomIndex].logoUrl;
const newLogo = 'https://cdn.worldvectorlogo.com/logos/intercom-1.svg';

console.log(`\n📋 Found deal: ${deals[intercomIndex].title}`);
console.log(`   Old logo: ${oldLogo}`);
console.log(`   New logo: ${newLogo}`);

// Update the logo
deals[intercomIndex].logoUrl = newLogo;
deals[intercomIndex].brandIcon = newLogo;
deals[intercomIndex].updatedAt = new Date().toISOString();

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(deals, null, 2));

console.log('\n✅ Intercom logo updated successfully!');
console.log(`   Total deals: ${deals.length}`);
console.log('\n🔄 Next steps:');
console.log('   1. Restart dev server: npm run dev');
console.log('   2. Clear browser cache');
console.log('   3. Refresh page\n');
