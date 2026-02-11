const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Primitive parsing because it's a TS file, not JSON
const lines = content.split('\n');
let isFreeAccess = false;
let currentBlock = {};
let freeAccessCount = 0;
let withLogoCount = 0;
let missingLogoCount = 0;
let examples = [];

lines.forEach(line => {
    line = line.trim();
    if (line === '{' || line.endsWith(':[') || line.endsWith('{')) {
        currentBlock = {};
        isFreeAccess = false;
    } else if (line.startsWith('}')) {
        if (currentBlock.appCategory === '"Free Access"') {
            freeAccessCount++;
            if (currentBlock.logo) {
                withLogoCount++;
                if (examples.length < 10) {
                    examples.push({ name: currentBlock.company, logo: currentBlock.logo });
                }
            } else {
                missingLogoCount++;
                if (examples.length < 20) {
                    examples.push({ name: currentBlock.company, logo: "MISSING" });
                }
            }
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

console.log(`Total Free Access Items: ${freeAccessCount}`);
console.log(`With Logo: ${withLogoCount}`);
console.log(`Missing Logo: ${missingLogoCount}`);
console.log('Examples:');
examples.forEach(e => console.log(`${e.name}: ${e.logo}`));
