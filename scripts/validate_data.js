const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let currentBlock = {};
let missingFields = [];

lines.forEach((line, index) => {
    line = line.trim();
    if (line === '{' || line.endsWith(':[') || line.endsWith('{')) {
        currentBlock = { lineStart: index + 1 };
    } else if (line.startsWith('}')) {
        // Check required fields
        if (currentBlock.lineStart) { // If we are in a block
            if (!currentBlock.title) missingFields.push(`Line ${currentBlock.lineStart}: Missing title`);
            if (!currentBlock.value) missingFields.push(`Line ${currentBlock.lineStart}: Missing value`);
            if (!currentBlock.url) missingFields.push(`Line ${currentBlock.lineStart}: Missing url`);
        }
        currentBlock = {};
    } else {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].replace(/"/g, '').trim();
            // Simple value extraction, robust enough for single line props
            const value = parts.slice(1).join(':').trim();
            currentBlock[key] = value;
        }
    }
});

if (missingFields.length > 0) {
    console.log('Found items with missing required fields:');
    missingFields.forEach(m => console.log(m));
} else {
    console.log('All items have title, value, and url.');
}
