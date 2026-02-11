const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let currentBlock = {};
let isFreeAccess = false;
let issues = [];
let totalFree = 0;

lines.forEach((line, index) => {
    line = line.trim(); // Trim first to handle any indentation
    if (line === '{') { // Start of object
        currentBlock = { lineStart: index + 1 };
        isFreeAccess = false;
    } else if (line === '},' || line === '}') { // End of object
        if (currentBlock.appCategory === '"Free Access"') {
            totalFree++;

            // 1. Check URL Validity
            const url = currentBlock.url ? currentBlock.url.replace(/"/g, '') : '';
            if (!url || url === '""') {
                issues.push(`Line ${currentBlock.lineStart}: Missing URL`);
            } else {
                // Check for garbage patterns
                if (url.match(/https:\/\/[A-Z]/)) { // http://CapitalLetter
                    // Exclude known good ones if any? No, generally domains are lowercase
                    // But some might be legit e.g. path.
                    // Let's flag for review.
                    issues.push(`Line ${currentBlock.lineStart}: Suspicious URL (Capitalized): ${url} (${currentBlock.company})`);
                }
                if (url.includes('Email') || url.includes('Beans') || url.includes('Pack')) {
                    issues.push(`Line ${currentBlock.lineStart}: Suspicious formatted URL: ${url} (${currentBlock.company})`);
                }
                // Check for generic google favicon without correct domain?
                // No, we want to check the link itself.
            }

            // 2. Check Logo
            const logo = currentBlock.logo ? currentBlock.logo.replace(/"/g, '') : '';
            if (!logo || logo === '""') {
                issues.push(`Line ${currentBlock.lineStart}: Missing Logo`);
            } else if (logo.includes('domain=Email') || logo.includes('domain=A') || logo.includes('domain=Pack')) {
                issues.push(`Line ${currentBlock.lineStart}: Bad Logo Domain: ${logo}`);
            }

            // 3. Check Required Info
            if (!currentBlock.offerSummary || currentBlock.offerSummary === '""') {
                issues.push(`Line ${currentBlock.lineStart}: Missing Offer Summary`);
            }
        }
        currentBlock = {};
    } else {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].replace(/"/g, '').trim();
            const value = parts.slice(1).join(':').trim().replace(/,$/, '');
            currentBlock[key] = value;
        }
    }
});

console.log(`Scanned ${totalFree} Free Access items.`);
if (issues.length > 0) {
    console.log(`${issues.length} Issues Found:`);
    issues.forEach(i => console.log(i));
} else {
    console.log('No issues found. All URLs look clean and required fields are present.');
}
