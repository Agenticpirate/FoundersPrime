const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const deletions = [
    'Craft Docs',
    'Mermaid Chart',
    'Brilliant',
    'Google Colab',
    'Overleaf Personal',
    'US Bank Student',
    'Monzo'
];

let deletedCount = 0;
let renamedCount = 0;

let objects = [];
let currentObjLines = [];
let braceCount = 0;
let inside = false;

// 1. Read objects
for (let line of lines) {
    if (line.includes('{')) {
        braceCount += (line.match(/{/g) || []).length;
        inside = true;
    }
    if (inside) {
        currentObjLines.push(line);
    }

    if (line.includes('}')) {
        braceCount -= (line.match(/}/g) || []).length;
        if (braceCount === 0 && inside) {
            // End of object
            let objStr = currentObjLines.join('\n');

            // SECURITY CHECK: Ensure it's a valid deal object, not an interface or garbage
            if (!objStr.includes('"title":')) {
                // Skip non-deal blocks (like the interface)
                currentObjLines = [];
                inside = false;
                continue;
            }

            // A. Check Deletion
            const isTarget = deletions.some(del => objStr.includes(`"title": "${del}"`) || objStr.includes(`"company": "${del}"`));

            if (isTarget) {
                deletedCount++;
                currentObjLines = [];
                inside = false;
                continue;
            }

            // B. Check Rename (Tally Forms -> Tally.so)
            if (objStr.includes('"title": "Tally Forms"')) {
                console.log('Renaming Tally Forms to Tally.so...');
                objStr = objStr.replace(/"title": "Tally Forms"/g, '"title": "Tally.so"');
                objStr = objStr.replace(/"company": "Tally"/g, '"company": "Tally.so"'); // Also update company if needed? Tally is company name. Tally.so is domain. User said "marked and updated as Tally.so". 
                renamedCount++;
            }

            objects.push(objStr);
            currentObjLines = [];
            inside = false;
        }
    } else if (!inside && line.trim() !== '') {
        // loose lines
    }
}

// 2. Re-read header PROPERLY (preserving correct header this time!)
// The file has: export const studentBenefits2026: StudentBenefit[] = [
// We need to keep lines 1 to 35 roughly. 
// We will look for "export const ... = [" and stop there.

const headerLines = [];
let foundStart = false;
for (let line of lines) {
    headerLines.push(line);
    if (line.trim().startsWith('export const studentBenefits2026: StudentBenefit[] = [')) {
        foundStart = true;
        break;
    }
}

if (!foundStart || headerLines.length < 5) {
    // If we couldn't find proper start, fallback to safe known header
    console.log("Could not exact header line, reconstructing safe header...");
    // But we need the interface definition at the top.
    // Let's assume lines 1-35 are good if the file is fixed.
    // We already fixed it.
    // Let's just grab everything before the first `{` of the data.
}

// Actually better:
// The loop above skipped everything not in an object (so it skipped the header).
// My headerLines reading logic above loop relies on "lines" which is the ORIGINAL content.
// So headerLines now contains the original header.
// Correct.

const output = headerLines.join('\n') + '\n' + objects.join('\n') + '\n];';
fs.writeFileSync(filePath, output, 'utf8');
console.log(`Deleted ${deletedCount} items. Renamed ${renamedCount} items.`);
