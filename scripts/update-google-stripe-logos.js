const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
let deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log('\n🎨 Updating Google Cloud and Stripe logos...\n');

// Better logo URLs - using high-quality, larger versions
const logoUpdates = {
  // Google Cloud - using the official colored logo
  'google-cloud-free-trial': {
    logoUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
    brandIcon: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg'
  },
  // Stripe - using the official Stripe logo
  'stripe-atlas': {
    logoUrl: 'https://asset.brandfetch.io/idS-LIMMyd/idgWiKYeIE.svg',
    brandIcon: 'https://asset.brandfetch.io/idS-LIMMyd/idgWiKYeIE.svg'
  },
  'stripe-startups': {
    logoUrl: 'https://asset.brandfetch.io/idS-LIMMyd/idgWiKYeIE.svg',
    brandIcon: 'https://asset.brandfetch.io/idS-LIMMyd/idgWiKYeIE.svg'
  }
};

let updatedCount = 0;

deals = deals.map(deal => {
  if (logoUpdates[deal.slug]) {
    console.log(`✅ Updating ${deal.title}`);
    console.log(`   Old: ${deal.logoUrl.substring(0, 60)}...`);
    console.log(`   New: ${logoUpdates[deal.slug].logoUrl.substring(0, 60)}...`);
    
    deal.logoUrl = logoUpdates[deal.slug].logoUrl;
    deal.brandIcon = logoUpdates[deal.slug].brandIcon;
    updatedCount++;
  }
  return deal;
});

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(deals, null, 2));

console.log(`\n✅ Logo update complete!`);
console.log(`Updated ${updatedCount} deals`);
