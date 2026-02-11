
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const reportPath = path.join(process.cwd(), 'logo-report.json');

const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Combine missing and broken
const targets = [...report.missing, ...report.broken];

async function checkUrl(url) {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => { req.destroy(); resolve(false); });
        req.end();
    });
}

async function fixLogos() {
    let fixedCount = 0;

    // Create a map for faster lookup
    const dealMap = new Map();
    deals.forEach((d, i) => dealMap.set(d.id, i));

    for (const target of targets) {
        const index = dealMap.get(target.id);
        if (index === undefined) continue;

        const deal = deals[index];
        const website = deal.providerWebsite || deal.applicationUrl;

        if (!website) {
            console.log(`Skipping ${deal.title} - No website URL`);
            continue;
        }

        // Use Google Favicon Service
        // We use t1.gstatic.com directly to avoid redirect handling issues in node (though browser would handle it)
        // But better to use the direct link if possible. actually, let's use the google.com/s2 redirector as the *saved* URL
        // because it's cleaner, but checks might fail if we don't follow redirects.
        // For checking, we can try to follow, or just trust it.
        // Let's just trust it for now, or check t1.gstatic.com construction.

        const googleUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(website)}&size=128`;

        process.stdout.write(`Checking ${deal.provider}... `);

        const isValid = await checkUrl(googleUrl);

        if (isValid) {
            console.log(`FOUND`);
            deal.logoUrl = googleUrl; // Save the long t1.gstatic URL as it's the direct image
            fixedCount++;
        } else {
            console.log(`FAILED`);
        }
    }

    console.log(`\nFixed ${fixedCount} logos.`);

    // Write back to file
    fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
    console.log('Updated all-deals.json');
}

fixLogos();
