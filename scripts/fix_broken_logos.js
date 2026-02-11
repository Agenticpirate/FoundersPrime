
const fs = require('fs');
const path = require('path');

const tsFile = path.join(__dirname, '../data/student-benefits-2026.ts');

try {
    let content = fs.readFileSync(tsFile, 'utf8');

    // Regex replacements for known bad prefixes in the domain part of the logo URL
    // "https://logo.clearbit.com/[BAD_PREFIX][DOMAIN]"

    const badPrefixes = [
        'pack',
        'global',
        'email',
        'doc',
        'studentsglobal',
        'globalsheerid',
        'application',
        'invite',
        'enrollment',
        'sales',
        'status',
        'support',
        'beans',
        'id',
        'my',
        'a', // dangerous, handle last and carefully
    ];

    let newContent = content;

    // Specific fixes for observed patterns
    // We match: "https://logo.clearbit.com/PREFIX(domain)"

    badPrefixes.forEach(prefix => {
        // Create a regex that looks for the prefix immediately after .com/ and before a valid looking domain start
        // e.g. .com/packdeepnote.com
        // We need to be careful not to delete part of a real domain like "packer.com" -> "er.com" if prefix is "pack"
        // But looking at the errors, they seem to be concatenated words.

        // Let's assume the junk is always strictly a prefix to the actual domain.

        const regex = new RegExp(`(https://logo\\.clearbit\\.com/)${prefix}([a-z0-9-]+\\.[a-z]+)`, 'g');
        newContent = newContent.replace(regex, '$1$2');
    });

    // Run the 'a' prefix fixer separately as it's a single letter and common
    // "https://logo.clearbit.com/aapple.com" -> "apple.com"
    newContent = newContent.replace(/(https:\/\/logo\.clearbit\.com\/)a([a-z0-9-]+\.[a-z]+)/g, '$1$2');

    // Fix specific known bad ones found via inspection
    newContent = newContent.replace(/globalsheeridunity\.com/, 'unity.com');
    newContent = newContent.replace(/studentsglobalunidaysknowt\.com/, 'knowt.com');
    newContent = newContent.replace(/5studentsglobalunidaysknowt\.com/, 'knowt.com');

    fs.writeFileSync(tsFile, newContent, 'utf8');
    console.log('Fixed broken logos.');

} catch (err) {
    console.error(err);
}
