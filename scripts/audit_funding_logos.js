const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let isFunding = false;
let currentBlock = {};
let fundingCount = 0;
let withLogoCount = 0;
let missingLogoCount = 0;
let missingExamples = [];

lines.forEach(line => {
    line = line.trim();
    if (line === '{' || line.endsWith(':[') || line.endsWith('{')) {
        currentBlock = {};
        isFunding = false;
    } else if (line.startsWith('}')) {
        if (currentBlock.appCategory === '"Funding & Opportunities"') {
            fundingCount++;
            if (currentBlock.logo && currentBlock.logo !== '""') {
                withLogoCount++;
            } else {
                missingLogoCount++;
                if (missingExamples.length < 10) {
                    missingExamples.push(currentBlock.title || currentBlock.company);
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

console.log(`Total Funding Items: ${fundingCount}`);
console.log(`With Logo: ${withLogoCount}`);
console.log(`Missing Logo: ${missingLogoCount}`);
console.log('Missing Examples:');
missingExamples.forEach(e => console.log(`- ${e}`));
