
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

const validGoogleProviders = ['Google', 'Google Cloud', 'Google Maps Platform', 'YouTube'];

let cleanedCount = 0;

deals.forEach(deal => {
    // Check if logoUrl is pointing to a google search or google domain favicon AND provider is not Google
    if (deal.logoUrl && deal.logoUrl.includes('google.com')) {
        const isGoogleProvider = validGoogleProviders.some(p =>
            deal.provider.toLowerCase().includes(p.toLowerCase()) ||
            deal.title.toLowerCase().includes('google')
        );

        if (!isGoogleProvider) {
            // Check if the underlying URL in the favicon service is google.com
            // url=https%3A%2F%2Fgoogle.com is encoded google.com
            if (deal.logoUrl.includes('google.com') || deal.logoUrl.includes('url=https%3A%2F%2Fgoogle.com')) {
                console.log(`Cleaning logo for ${deal.title} (${deal.provider}) - Was: ${deal.logoUrl}`);
                deal.logoUrl = ''; // Clear it to trigger fallback
                cleanedCount++;
            }
        }
    }
});

console.log(`\nCleaned ${cleanedCount} logos.`);
fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
console.log('Updated all-deals.json');
