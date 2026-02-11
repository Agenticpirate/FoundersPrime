const fs = require('fs');
const path = require('path');
const url = require('url');

const tsFile = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(tsFile, 'utf8');

const lines = content.split('\n');
let newLines = [];
let buffer = [];
let isCredits = false;
let currentUrl = '';
let hasLogo = false;

lines.forEach(line => {
    const trimmed = line.trim();

    // Start of a new object
    if (trimmed === '{') {
        buffer = [line];
        isCredits = false;
        hasLogo = false;
        currentUrl = '';
    }
    // End of an object
    else if (trimmed.startsWith('},') || trimmed === '}') {
        buffer.push(line);

        if (isCredits && !hasLogo && currentUrl) {
            try {
                let hostname = new url.URL(currentUrl).hostname;
                hostname = hostname.replace('www.', '');

                // Construct Google Favicon URL
                const logoLine = `    "logo": "https://www.google.com/s2/favicons?domain=${hostname}&sz=128",`;

                // Insert after slug if possible, or before category
                let insertIndex = -1;
                for (let j = 0; j < buffer.length; j++) {
                    if (buffer[j].includes('"slug":')) {
                        insertIndex = j + 1;
                        break;
                    }
                }

                if (insertIndex === -1) {
                    for (let j = 0; j < buffer.length; j++) {
                        if (buffer[j].includes('"category":')) {
                            insertIndex = j;
                            break;
                        }
                    }
                }

                if (insertIndex !== -1) {
                    buffer.splice(insertIndex, 0, logoLine);
                    console.log(`Added logo for ${hostname}`);
                }
            } catch (e) {
                console.log(`Skipping invalid URL: ${currentUrl}`);
            }
        }

        newLines.push(...buffer);
        buffer = [];
    }
    // Property lines
    else {
        buffer.push(line);
        if (line.includes('"appCategory": "Credits & Savings"')) {
            isCredits = true;
        }
        if (line.includes('"logo":')) {
            hasLogo = true;
        }
        if (line.includes('"url":')) {
            const m = line.match(/"url":\s*"(.*)"/);
            if (m) currentUrl = m[1];
        }
    }
});

// Handle any trailing lines
if (buffer.length > 0) newLines.push(...buffer);

fs.writeFileSync(tsFile, newLines.join('\n'), 'utf8');
console.log('Finished updating Credits & Savings logos.');
