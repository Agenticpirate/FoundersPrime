const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace double commas patterns
// Pattern 1: }, ,
// Pattern 2: , ,
// Pattern 3: ,\n,

let fixedContent = content.replace(/}, ,/g, '},');
fixedContent = fixedContent.replace(/, ,/g, ',');
fixedContent = fixedContent.replace(/,\s*,/g, ','); // Safety catch-all for commas separated by whitespace

// Also check for trailing comma at end of array before ]; which might be valid but let's be clean
// But TS allows trailing comma.

fs.writeFileSync(filePath, fixedContent, 'utf8');
console.log('Fixed double commas.');
