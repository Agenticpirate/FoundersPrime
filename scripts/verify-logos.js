
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

const brokenLogos = [];
const missingLogos = [];
const validLogos = [];

async function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url || !url.startsWith('http')) {
            resolve(false);
            return;
        }

        const client = url.startsWith('https') ? https : http;
        const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
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

async function processDeals() {
    console.log(`Checking ${deals.length} deals...`);

    // Process in chunks to avoid overwhelming network
    const chunkSize = 20;
    for (let i = 0; i < deals.length; i += chunkSize) {
        const chunk = deals.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (deal) => {
            if (!deal.logoUrl) {
                missingLogos.push(deal);
                process.stdout.write('M');
            } else {
                const isValid = await checkUrl(deal.logoUrl);
                if (isValid) {
                    validLogos.push(deal);
                    process.stdout.write('.');
                } else {
                    brokenLogos.push(deal);
                    process.stdout.write('X');
                }
            }
        }));
    }

    console.log('\n\n--- Results ---');
    console.log(`Valid Logos: ${validLogos.length}`);
    console.log(`Missing Logos: ${missingLogos.length}`);
    console.log(`Broken Logos: ${brokenLogos.length}`);

    if (missingLogos.length > 0) {
        console.log('\nMissing Logos:');
        missingLogos.forEach(d => console.log(`- ${d.title} (${d.provider})`));
    }

    if (brokenLogos.length > 0) {
        console.log('\nBroken Logos:');
        brokenLogos.forEach(d => console.log(`- ${d.title} (${d.provider}) [${d.logoUrl}]`));
    }

    // Save report
    const report = {
        missing: missingLogos.map(d => ({ id: d.id, title: d.title, provider: d.provider, website: d.providerWebsite })),
        broken: brokenLogos.map(d => ({ id: d.id, title: d.title, provider: d.provider, website: d.providerWebsite, logoUrl: d.logoUrl }))
    };

    fs.writeFileSync('logo-report.json', JSON.stringify(report, null, 2));
    console.log('\nReport saved to logo-report.json');
}

processDeals();
