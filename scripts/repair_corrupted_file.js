const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split('\n');

let newLines = [];
let buffer = [];
let braceBalance = 0;
let inObject = false;

// 1. Preserve Interface (Head)
let headerLines = [];
let i = 0;
for (; i < lines.length; i++) {
    headerLines.push(lines[i]);
    if (lines[i].trim() === '}') { // End of interface
        i++;
        break;
    }
}

// 2. Add Export Line
headerLines.push('');
headerLines.push('export const studentBenefits2026: StudentBenefit[] = [');

// 3. Scan for objects
let validObjectsCount = 0;

for (; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Heuristic for start of object in this array: "  {"
    // But corrupted items might look different.
    // Let's rely on finding "{" at start of line (indented).

    if (!inObject) {
        if (line.includes('{')) {
            inObject = true;
            buffer.push(line);
            // Count braces in this line
            braceBalance += (line.match(/{/g) || []).length;
            braceBalance -= (line.match(/}/g) || []).length;
        }
    } else {
        buffer.push(line);
        braceBalance += (line.match(/{/g) || []).length;
        braceBalance -= (line.match(/}/g) || []).length;

        if (braceBalance === 0) {
            // End of object
            inObject = false;

            // Check if valid
            const objectBody = buffer.join('\n');
            if (objectBody.includes('"title":')) {
                // Formatting: Ensure it ends with comma if not last? 
                // We'll add comma to all, and remove from last later.
                if (!objectBody.trim().endsWith(',')) {
                    // Add comma to last line if missing?
                    // Actually, usually the closing brace line is `  },`
                    // My brace counting handles `},`.
                }
                newLines.push(...buffer);
                validObjectsCount++;
            }
            buffer = [];
        }
    }
}

// Combine
let finalContent = headerLines.join('\n') + '\n' + newLines.join('\n');

// Ensure end of file
if (!finalContent.trim().endsWith('];')) {
    // If it ends with comma, replace with nothing?
    // Actually, TS allows trailing comma.
    finalContent += '\n];';
}

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log(`Repaired file. Recovered ${validObjectsCount} valid items.`);
