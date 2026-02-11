const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let isCredits = false;
let currentBlock = {};
let creditsCount = 0;
let withLogoCount = 0;
let missingLogoCount = 0;
let missingExamples = [];

lines.forEach(line => {
    line = line.trim();
    if (line === '{' || line.endsWith(':[') || line.endsWith('{')) {
        currentBlock = {};
        isCredits = false;
    } else if (line.startsWith('}')) {
        if (currentBlock.appCategory === '"Credits & Savings"') {
            creditsCount++;
            if (currentBlock.logo && currentBlock.logo.length > 2) {
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

console.log(`Total Credits Items: ${creditsCount}`);
console.log(`With Logo: ${withLogoCount}`);
console.log(`Missing Logo: ${missingLogoCount}`);
console.log('Missing Examples:');
missingExamples.forEach(e => console.log(`- ${e}`));
