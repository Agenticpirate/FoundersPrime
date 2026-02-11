#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

console.log('\n🔧 Updating Customer.io Logo...\n');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`📊 Total deals loaded: ${deals.length}`);

// Find Customer.io deal
const customerioIndex = deals.findIndex(deal => 
  deal.provider?.toLowerCase().includes('customer.io') ||
  deal.provider?.toLowerCase().includes('customerio') ||
  deal.title?.toLowerCase().includes('customer.io') ||
  deal.slug?.includes('customerio')
);

if (customerioIndex === -1) {
  console.error('❌ Customer.io deal not found!');
  console.log('\n💡 Searching for similar deals...');
  const similar = deals.filter(d => 
    d.provider?.toLowerCase().includes('customer') ||
    d.title?.toLowerCase().includes('customer')
  ).slice(0, 5);
  similar.forEach(d => console.log(`   • ${d.slug} - ${d.title}`));
  process.exit(1);
}

const oldLogo = deals[customerioIndex].logoUrl;
const newLogo = 'https://logo.clearbit.com/customer.io';

console.log(`\n📋 Found deal: ${deals[customerioIndex].title}`);
console.log(`   Provider: ${deals[customerioIndex].provider}`);
console.log(`   Slug: ${deals[customerioIndex].slug}`);
console.log(`   Old logo: ${oldLogo || 'None'}`);
console.log(`   New logo: ${newLogo}`);

// Update the logo
deals[customerioIndex].logoUrl = newLogo;
deals[customerioIndex].brandIcon = newLogo;
deals[customerioIndex].updatedAt = new Date().toISOString();

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(deals, null, 2));

console.log('\n✅ Customer.io logo updated successfully!');
console.log(`   Total deals: ${deals.length}`);
console.log('\n🔄 Next steps:');
console.log('   1. Restart dev server');
console.log('   2. Open in NEW incognito window');
console.log('   3. Go to http://localhost:3000/deals\n');
