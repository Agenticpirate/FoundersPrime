const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let isFunding = false;
let currentBlock = {};
let examples = [];

lines.forEach(line => {
    line = line.trim();
    if (line === '{' || line.endsWith(':[') || line.endsWith('{')) {
        currentBlock = {};
        isFunding = false;
    } else if (line.startsWith('}')) {
        if (currentBlock.appCategory === '"Funding & Opportunities"') {
            if (currentBlock.logo && currentBlock.logo !== '""') {
                if (examples.length < 20) {
                    examples.push(`${currentBlock.company}: ${currentBlock.logo}`);
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

console.log('Sample Funding Logos:');
examples.forEach(e => console.log(e));
