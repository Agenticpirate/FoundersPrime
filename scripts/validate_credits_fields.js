const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let currentBlock = {};
let isCredits = false;
let blockStartLine = 0;

// Heuristic: Top level objects start with "  {" (2 spaces) and end with "  }," or "  }"
// Nested objects usually have more indentation.

lines.forEach((line, index) => {
    // Check for top-level object start
    if (line.match(/^  {/)) {
        currentBlock = {};
        isCredits = false;
        blockStartLine = index + 1;
    }
    // Check for top-level object end
    else if (line.match(/^  },?$/)) {
        if (currentBlock.appCategory === '"Credits & Savings"') {
            if (!currentBlock.value) {
                console.log(`Line ${blockStartLine}: Missing value (${currentBlock.title || 'Unknown Title'})`);
            }
            if (!currentBlock.url) {
                console.log(`Line ${blockStartLine}: Missing url (${currentBlock.title || 'Unknown Title'})`);
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
