
const fs = require('fs');
const path = require('path');

const tsFile = path.join(__dirname, '../data/student-benefits-2026.ts');

try {
    let content = fs.readFileSync(tsFile, 'utf8');
    // Remove the export prefix to make it valid JSON-like for parsing if possible, or just eval it
    // But evaling TS is hard. Let's use a regex approach for safety and simplicity as we did before, 
    // or better, let's just use regex to match objects having "appCategory": "Free Access"

    // Since the file is large and structured, let's look for blocks.
    // We can try to regex match individual objects.

    const items = [];
    let currentItem = {};
    let lines = content.split('\n');
    let insideItem = false;

    lines.forEach(line => {
        line = line.trim();
        if (line === '{') {
            insideItem = true;
            currentItem = {};
        } else if (line === '},' || line === '}') {
            if (insideItem && currentItem.appCategory === '"Free Access"') { // Check for quoted string
                items.push(currentItem);
            }
            insideItem = false;
        } else if (insideItem) {
            // Simple key-value extraction: "key": "value",
            const match = line.match(/"(\w+)":\s*"(.*?[^\\])"/); // Basic string match
            if (match) {
                currentItem[match[1]] = `"${match[2]}"`;
            }
        }
    });

    // The above manual parsing is brittle. Let's try a different approach.
    // The file is a TS file exporting an array.
    // Let's rely on the previous knowledge that the file is roughly JSON-compatible inside the array.

    // Let's just grep the file for Free Access lines and look around them. 
    // Actually, let's do this: 
    // 1. Read file. 
    // 2. Extract content between `export const studentBenefits2026: StudentBenefit[] = [` and `];`
    // 3. Eval that string (it might work if it's pure JSON, but it doubtless has some trailing commas or comments).
    // 4. Fallback: Use string search.

} catch (err) {
    console.error(err);
}

// Let's rewrite the script to be simpler and just search for missing logos in general
// by iterating line by line and keeping state.

const lines = fs.readFileSync(tsFile, 'utf8').split('\n');
let missingLogos = [];
let buffer = [];
let isFreeAccess = false;
let hasLogo = false;
let currentTitle = '';

lines.forEach(line => {
    if (line.trim().startsWith('{')) {
        buffer = [];
        isFreeAccess = false;
        hasLogo = false;
        currentTitle = '';
    } else if (line.trim().startsWith('}')) {
        if (isFreeAccess && !hasLogo) {
            missingLogos.push(currentTitle);
        }
    } else {
        if (line.includes('"appCategory": "Free Access"')) {
            isFreeAccess = true;
        }
        if (line.includes('"logo":')) {
            hasLogo = true;
        }
        if (line.includes('"title":')) {
            const m = line.match(/"title":\s*"(.*)"/);
            if (m) currentTitle = m[1];
        }
    }
});

console.log(`Found ${missingLogos.length} Free Access items without logos.`);
missingLogos.forEach(t => console.log(`- ${t}`));

