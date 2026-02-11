const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace } followed by newline and { with },
// Regex: /}\s*\n\s*{/g
// But maintain indentation.
// Typically: \n  },?\n  {
// The issue is likely:
//   }
//   {
// We want:
//   },
//   {

// Using a robust replacement:
// Look for } at end of line (ignoring whitespace), followed by { on next line (ignoring whitespace)
const fixedContent = content.replace(/}(\s*[\r\n]+\s*){/g, '},$1{');

// Also, ensure the last item doesn't have a trailing comma if strict JSON, but TS allows it.
// My batch script added v0 at end. It looked like:
// ...
// },
// { ... v0 ... }
// ];
// If previous item didn't have comma, v0 insertion wouldn't be valid.
// The regex above should handle it.

fs.writeFileSync(filePath, fixedContent, 'utf8');
console.log('Fixed missing commas between objects.');
