const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const tsFile = path.join(dataDir, 'student-benefits-2026.ts');
const p4File = path.join(dataDir, 'raw_student_benefits_part4.txt');
const p5File = path.join(dataDir, 'raw_student_benefits_part5.txt');

const tsContent = fs.readFileSync(tsFile, 'utf8');
const p4Content = fs.readFileSync(p4File, 'utf8');
const p5Content = fs.readFileSync(p5File, 'utf8');

const rawLines = [
    ...p4Content.split('\n'),
    ...p5Content.split('\n')
].filter(l => l.trim().length > 0);

const missing = [];

rawLines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length > 0) {
        const title = parts[0].trim();
        // Check if title exists in tsContent (simple string check)
        // We look for "title": "Title"
        if (!tsContent.includes(`"${title}"`)) {
            missing.push(title);
        }
    }
});

console.log("Missing items count:", missing.length);
console.log("Missing items:");
missing.forEach(m => console.log(m));
