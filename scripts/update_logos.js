
const fs = require('fs');
const path = require('path');
const url = require('url');

const tsFile = path.join(__dirname, '../data/student-benefits-2026.ts');

try {
    let content = fs.readFileSync(tsFile, 'utf8');

    // We will process the file line-by-line to safely inject the logo field
    // into the correct location (e.g., after "slug" or before "category")
    // for items that match our criteria.

    const lines = content.split('\n');
    const newLines = [];

    let isFreeAccess = false; // We only care if we are in a Free Access block
    let hasLogo = false;
    let currentSlug = '';
    let currentUrl = '';
    let buffer = []; // Stores lines of the current object

    // Detection logic:
    // We need to buffer an entire object to know if it's "Free Access" and missing a logo.
    // If so, we modify the buffer before pushing to newLines.

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim().startsWith('{')) {
            // Start of object
            buffer = [line];
            isFreeAccess = false;
            hasLogo = false;
            currentSlug = '';
            currentUrl = '';
        } else if (line.trim().startsWith('}') || line.trim().startsWith('},')) {
            // End of object
            buffer.push(line);

            // Process buffer
            if (isFreeAccess && !hasLogo && currentUrl) {
                // Needs a logo!
                try {
                    let hostname = new url.URL(currentUrl).hostname;
                    hostname = hostname.replace('www.', '');
                    // Handle special cases
                    if (hostname.includes('github.com')) hostname = 'github.com';
                    if (hostname.includes('azure.microsoft.com')) hostname = 'microsoft.com';
                    if (hostname.includes('aws.amazon.com')) hostname = 'aws.amazon.com';

                    const logoLine = `    "logo": "https://logo.clearbit.com/${hostname}",`;

                    // Insert after slug if possible, or looking for a good place
                    let insertIndex = -1;
                    for (let j = 0; j < buffer.length; j++) {
                        if (buffer[j].includes('"slug":')) {
                            insertIndex = j + 1;
                            break;
                        }
                    }

                    if (insertIndex !== -1) {
                        buffer.splice(insertIndex, 0, logoLine);
                        console.log(`Added logo for ${hostname}`);
                    } else {
                        // Fallback: insert before category
                        for (let j = 0; j < buffer.length; j++) {
                            if (buffer[j].includes('"category":')) {
                                insertIndex = j;
                                break;
                            }
                        }
                        if (insertIndex !== -1) {
                            buffer.splice(insertIndex, 0, logoLine);
                            console.log(`Added logo for ${hostname}(fallback)`);
                        }
                    }
                } catch (e) {
                    console.warn(`Could not parse URL: ${currentUrl}`);
                }
            }

            // Push buffer to newLines
            newLines.push(...buffer);
            buffer = [];
        } else {
            // Inside object (or outside array)
            if (buffer.length > 0) {
                buffer.push(line);
                if (line.includes('"appCategory": "Free Access"')) isFreeAccess = true;
                if (line.includes('"logo":')) hasLogo = true;
                if (line.includes('"url":')) {
                    const match = line.match(/"url":\s*"(.*)"/);
                    if (match) currentUrl = match[1];
                }
            } else {
                // Outside object (header/footer of file)
                newLines.push(line);
            }
        }
    }

    fs.writeFileSync(tsFile, newLines.join('\n'), 'utf8');
    console.log('Finished updating logos.');

} catch (err) {
    console.error(err);
}
