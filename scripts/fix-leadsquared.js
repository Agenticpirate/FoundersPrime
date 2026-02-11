const fs = require('fs');
const path = require('path');

const dealsPath = path.join(__dirname, '../public/data/all-deals.json');
const processedPath = path.join(__dirname, '../data/processed-deals/all-deals.json');

const targetSlug = 'leadsquared-750';
const correctUrl = 'https://www.leadsquared.com/startup-crm-plan/';

function fixDeal(filePath) {
    if (fs.existsSync(filePath)) {
        let deals = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let updated = false;

        deals = deals.map(d => {
            if (d.slug === targetSlug || d.id === targetSlug || d.title.toLowerCase().includes('leadsquared')) {
                console.log(`Found Leadsquared deal. Old URL: ${d.applicationUrl}`);
                d.applicationUrl = correctUrl;
                updated = true;
            }
            return d;
        });

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(deals, null, 2));
            console.log(`Updated Leadsquared deal URL in ${filePath}`);
        } else {
            console.log(`Leadsquared deal not found in ${filePath}`);
        }
    }
}

fixDeal(dealsPath);
if (fs.existsSync(processedPath)) {
    fixDeal(processedPath);
}
