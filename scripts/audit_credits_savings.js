const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Parse the file manually to generic objects
let items = [];
let currentBlock = {};
const lines = content.split('\n');

lines.forEach((line, index) => {
    line = line.trim();
    if (line === '{' || line.endsWith(':[') || line.endsWith('{') || line === '  {') {
        currentBlock = { lineStart: index + 1 };
    } else if (line.startsWith('}')) {
        if (currentBlock.lineStart && currentBlock.title) {
            items.push(currentBlock);
        }
        currentBlock = {};
    } else {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].replace(/"/g, '').trim();
            const value = parts.slice(1).join(':').trim().replace(/,$/, '').replace(/"/g, '');
            currentBlock[key] = value;
        }
    }
});

// Filter for Credits & Savings
const creditsItems = items.filter(i => i.appCategory === 'Credits & Savings');

console.log(`Total Credits & Savings Items: ${creditsItems.length}`);

// 1. Check Duplicates
const seen = new Set();
const duplicates = [];
creditsItems.forEach(item => {
    const key = item.title.toLowerCase(); // + item.company.toLowerCase();
    if (seen.has(key)) {
        duplicates.push(item);
    } else {
        seen.add(key);
    }
});

console.log('\n--- Duplicates ---');
if (duplicates.length > 0) {
    duplicates.forEach(d => console.log(`Duplicate: ${d.title}`));
} else {
    console.log('No duplicates found based on title.');
}

// 2. Check Missing Logos or Generic Logos
console.log('\n--- Logo Issues ---');
creditsItems.forEach(item => {
    if (!item.logo || item.logo === '""') {
        console.log(`Missing Logo: ${item.title}`);
    } else if (item.logo.includes('github.com')) { // Generic github logo often means lazy copy-paste
        console.log(`Generic/GitHub Logo: ${item.title} (${item.logo})`);
    } else if (item.logo.includes('ui-avatars')) {
        console.log(`Placeholder Logo: ${item.title}`);
    }
});

// 3. Check Suspicious URLs
console.log('\n--- Suspicious URLs ---');
creditsItems.forEach(item => {
    if (!item.url || item.url === '""') {
        console.log(`Missing URL: ${item.title}`);
    } else if (item.url.includes('github.com') && !item.url.includes('copilot') && !item.url.includes('codespaces')) {
        // Many items point to GitHub Student Pack page generic wrapper?
        console.log(`GitHub URL (Generic?): ${item.title} -> ${item.url}`);
    } else if (item.url.match(/https:\/\/.[A-Z]/)) {
        console.log(`Bad Pattern URL: ${item.title} -> ${item.url}`);
    } else if (item.url.length < 15) {
        console.log(`Short/Suspicious URL: ${item.title} -> ${item.url}`);
    }
});

// 4. List all for manual review (brief)
console.log('\n--- All Items (Title - Company - URL) ---');
creditsItems.forEach(item => {
    console.log(`${item.title} | ${item.company} | ${item.url}`);
});
