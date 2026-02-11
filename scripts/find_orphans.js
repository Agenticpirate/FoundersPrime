const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('Scanning for orphaned objects (starting with "question")...');

let possibleOrphans = [];

for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    // Check for object start
    if (line.trim() === '{') {
        // Check if next line is "question": ...
        // and NOT inside an existing faq array (which we can guess by indentation or context, but simple check first)
        // Actually, valid FAQ objects ALSO start with { and have "question".
        // The difference is that valid FAQ objects are inside "faq": [ ... ]
        // Invalid orphaned Benefit objects (missing headers) are at the top level array, but look exactly like FAQ objects.

        // HOWEVER, we can check if the PREVIOUS line was a closing brace '},' or just '},' from a previous benefit?
        // If we are at top level, likely previous line was '  },'.

        if (nextLine.trim().startsWith('"question":')) {
            // It's an object starting with question.
            // Is it an orphan?
            // If it's inside `faq: [ ... ]`, it's valid.
            // If it's at the top level, it's an orphan.

            // Heuristic: Check indentation?
            // "question" usually has 4 spaces in orphans? No, wait.
            // In the file, standard indentation for properties is 4 spaces.
            // If it's inside faq array, indentation of { might be 6 spaces?

            // Let's print them and their line numbers to manually inspect.
            console.log(`Potential orphan at line ${i + 1}:`);
            console.log(`${i}: ${lines[i - 1]}`);
            console.log(`${i + 1}: ${lines[i]}`);
            console.log(`${i + 2}: ${lines[i + 1]}`);
            console.log('---');
        }
    }
}
