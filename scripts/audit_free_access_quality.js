const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let currentBlock = {};
let isFreeAccess = false;
let items = [];

lines.forEach((line, index) => {
    line = line.trim();
    if (line === '{') {
        currentBlock = { lineStart: index + 1 };
    } else if (line === '},' || line === '}') {
        if (currentBlock.appCategory === '"Free Access"') {
            const company = currentBlock.company ? currentBlock.company.replace(/"/g, '') : 'Unknown';
            const url = currentBlock.url ? currentBlock.url.replace(/"/g, '') : '';
            const logo = currentBlock.logo ? currentBlock.logo.replace(/"/g, '') : '';

            // Extract domain from logo to see if it's generic
            // logo format: ...domain=example.com...
            const logoMatch = logo.match(/domain=([^&]+)/);
            const logoDomain = logoMatch ? logoMatch[1] : 'unknown';

            items.push({
                company,
                url,
                logoDomain,
                line: currentBlock.lineStart
            });
        }
    } else {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].replace(/"/g, '').trim();
            const value = parts.slice(1).join(':').trim().replace(/,$/, '');
            currentBlock[key] = value;
        }
    }
});

console.log('--- Free Access Audit ---');
console.log('Items pointing to generic domains (github.com, etc.):');

let githubCount = 0;
let total = items.length;

items.forEach(item => {
    const isGithub = item.url.includes('github.com') || item.logoDomain.includes('github.com');
    if (isGithub) {
        githubCount++;
        console.log(`[GitHub Ref] ${item.company}: ${item.url} (Logo: ${item.logoDomain})`);
    } else {
        // Also log suspicious ones that might be wrong
        // console.log(`[OK?] ${item.company}: ${item.url}`);
    }
});

console.log('-------------------------');
console.log(`Total Free Access Items: ${total}`);
console.log(`Items using GitHub URL/Logo: ${githubCount}`);
