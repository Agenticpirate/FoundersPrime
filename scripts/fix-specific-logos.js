
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

const updates = [
    {
        matcher: (d) => d.slug.includes('norton-antivirus'),
        logoUrl: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://us.norton.com&size=128',
        name: 'Norton AntiVirus'
    },
    {
        matcher: (d) => d.slug.includes('avg-technologies'),
        logoUrl: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.avg.com&size=128',
        name: 'AVG Technologies'
    },
    {
        matcher: (d) => d.slug.includes('amazon-music'),
        logoUrl: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://music.amazon.com&size=128',
        name: 'Amazon Music'
    }
];

let updatedCount = 0;

deals.forEach(deal => {
    const update = updates.find(u => u.matcher(deal));
    if (update) {
        console.log(`Updating logo for ${deal.title} (${deal.id})...`);
        deal.logoUrl = update.logoUrl;
        updatedCount++;
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
    console.log(`Successfully updated ${updatedCount} deals.`);
} else {
    console.log('No matching deals found to update.');
}
