const fs = require('fs');
const deals = JSON.parse(fs.readFileSync('public/data/all-deals.json', 'utf8'));

// Remove placeholder 'Deals marketplace' entries
const filtered = deals.filter(d => !d.title.includes('Deals marketplace'));

// Add remaining URLs
const moreUrls = {
  'Sparklane': 'https://www.sparklane-group.com/',
  '11x': 'https://www.11x.ai/',
  'Toplyne': 'https://www.toplyne.io/pricing',
  'Confluent': 'https://www.confluent.io/startup-program/',
  'Datapills': 'https://datapills.com/',
  'Similarweb': 'https://www.similarweb.com/corp/pricing/',
  'Bright': 'https://brightdata.com/',
  'RocketDevs': 'https://www.rocketdevs.com/',
  'Anything': 'https://anythingllm.com/',
  'Pippit': 'https://www.pippit.com/',
  'Search': 'https://searchads.apple.com/',
  'Blue': 'https://bluestrawberry.app/',
  'Content': 'https://contentbeta.com/',
  'LiveChatAI': 'https://livechatai.com/pricing',
  'More': 'https://www.more.com/',
};

let updated = 0;
filtered.forEach(deal => {
  if (deal.applicationUrl && deal.applicationUrl.includes('google.com/search')) {
    if (moreUrls[deal.provider]) {
      deal.applicationUrl = moreUrls[deal.provider];
      deal.providerWebsite = moreUrls[deal.provider];
      deal.updatedAt = new Date().toISOString();
      updated++;
    }
  }
});

fs.writeFileSync('public/data/all-deals.json', JSON.stringify(filtered, null, 2));
console.log('Removed placeholder entries and updated', updated, 'more URLs');
console.log('Total deals:', filtered.length);

// Count remaining placeholder URLs
const remaining = filtered.filter(d => d.applicationUrl && d.applicationUrl.includes('google.com/search'));
console.log('Deals still with placeholder URLs:', remaining.length);
if (remaining.length > 0) {
  console.log('Providers:', [...new Set(remaining.map(d => d.provider))].join(', '));
}
