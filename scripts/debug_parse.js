const fs = require('fs');
const path = require('path');

const rawDataPath = path.join(__dirname, '../data/student_benefits_raw.txt');
const rawData = fs.readFileSync(rawDataPath, 'utf-8');

console.log('Total characters:', rawData.length);
console.log('Total newlines:', rawData.split('\n').length);
console.log('Total "https" occurrences:', rawData.match(/https/g)?.length || 0);
console.log('Total "http" occurrences:', rawData.match(/http/g)?.length || 0);

// Try splitting by URL
// Regex for URL: space? (domain.tld/path) space?
// Or simply "http..." until space?
const urlRegex = /(?:https?:\/\/|www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/g;
const urls = rawData.match(urlRegex);
console.log('Found URLs regex match count:', urls?.length || 0);
if (urls && urls.length > 0) {
    console.log('First 5 URLs:', urls.slice(0, 5));
}

// Check what's between URLs
const splitByUrl = rawData.split(urlRegex);
console.log('Split chunks count:', splitByUrl.length);
console.log('First chunk (Head):', splitByUrl[0].substring(0, 200));
console.log('Second chunk (Item 1 tail?):', splitByUrl[1]?.substring(0, 200));
