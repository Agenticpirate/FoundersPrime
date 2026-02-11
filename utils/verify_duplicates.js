
const fs = require('fs');
const path = require('path');

const tsFile = path.join(__dirname, '../data/student-benefits-2026.ts');

try {
    const content = fs.readFileSync(tsFile, 'utf8');

    // Extract the array content. This is a rough extraction assuming the structure is consistent.
    // We'll look for object blocks.
    const regex = /{\s*\"title\":\s*\"(.*?)\",[\s\S]*?\"slug\":\s*\"(.*?)\"/g;

    const titles = new Set();
    const slugs = new Set();
    const duplicates = [];

    let match;
    while ((match = regex.exec(content)) !== null) {
        const title = match[1];
        const slug = match[2];

        if (titles.has(title)) {
            duplicates.push({ type: 'Title', value: title });
        }
        if (slugs.has(slug)) {
            duplicates.push({ type: 'Slug', value: slug });
        }

        titles.add(title);
        slugs.add(slug);
    }

    console.log(`Scanned ${titles.size} items.`);

    if (duplicates.length > 0) {
        console.log('Found duplicates:');
        duplicates.forEach(d => console.log(`- [${d.type}] ${d.value}`));
        process.exit(1);
    } else {
        console.log('No duplicates found.');
        process.exit(0);
    }

} catch (err) {
    console.error('Error reading file:', err);
}
