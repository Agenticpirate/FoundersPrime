
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

const missingLogos = deals.filter(deal => !deal.logoUrl || deal.logoUrl.trim() === '');
const totalDeals = deals.length;

console.log(`Total Deals: ${totalDeals}`);
console.log(`Deals with missing logos: ${missingLogos.length}`);

missingLogos.forEach(deal => {
    console.log(`- ${deal.title} (${deal.provider}) [Slug: ${deal.slug}]`);
});

const probablyBadLogos = deals.filter(deal => deal.logoUrl && !deal.logoUrl.startsWith('http'));
console.log(`\nDeals with invalid logo format: ${probablyBadLogos.length}`);
probablyBadLogos.forEach(deal => {
    console.log(`- ${deal.title} [Logo: ${deal.logoUrl}]`);
});
