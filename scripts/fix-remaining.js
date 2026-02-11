
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

let count = 0;
deals.forEach(deal => {
    if (deal.title.includes('WorldFirst')) {
        deal.logoUrl = 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.worldfirst.com&size=128';
        console.log('Fixed WorldFirst');
        count++;
    }
});

fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
console.log(`Updated ${count} deals.`);
