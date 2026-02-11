const fs = require('fs');
const path = require('path');

const dealsPath = path.join(__dirname, '../public/data/all-deals.json');
const processedPath = path.join(__dirname, '../data/processed-deals/all-deals.json');

const targetSlug = 'snapchat-ads';

function removeDeal(filePath) {
    if (fs.existsSync(filePath)) {
        let deals = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const initialLength = deals.length;
        deals = deals.filter(d => d.slug !== targetSlug && d.id !== targetSlug);

        if (deals.length < initialLength) {
            fs.writeFileSync(filePath, JSON.stringify(deals, null, 2));
            console.log(`Removed deal '${targetSlug}' from ${filePath}`);
        } else {
            console.log(`Deal '${targetSlug}' not found in ${filePath}`);
        }
    }
}

removeDeal(dealsPath);
if (fs.existsSync(processedPath)) {
    removeDeal(processedPath);
}
