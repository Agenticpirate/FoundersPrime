const fs = require('fs');
const glob = require('glob');
const path = require('path');

// 1. Reduce padding in page files
const pageFiles = glob.sync('app/deals/**/page.tsx');
pageFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/py-4 lg:py-6/g, 'py-2 lg:py-4');
    fs.writeFileSync(file, content);
    console.log(`Updated padding in ${file}`);
});

// 2. Reduce margin in Header files
const headerFiles = glob.sync('components/deals/*Header.tsx');
headerFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/className="flex mb-8"/g, 'className="flex mb-3 md:mb-5"');
    fs.writeFileSync(file, content);
    console.log(`Updated margin in ${file}`);
});

// 3. Reduce margin in Hero files
const heroFiles = glob.sync('components/deals/*Hero.tsx');
heroFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    // For DealsHero specifically
    content = content.replace(/className="mb-4 md:mb-8"/g, 'className="mb-3 md:mb-5"');
    content = content.replace(/className="mb-3 md:mb-6 relative"/g, 'className="mb-2 md:mb-4 relative"');
    content = content.replace(/mb-2 md:mb-4 leading-none/g, 'mb-1 md:mb-2 leading-none');

    // For other Hero files
    content = content.replace(/className="mb-8"/g, 'className="mb-4 md:mb-6"');
    content = content.replace(/className="mb-4"/g, 'className="mb-2 md:mb-3"');
    // Header tags margins
    content = content.replace(/mb-2 leading-tight/g, 'mb-1 leading-tight');
    fs.writeFileSync(file, content);
    console.log(`Updated margin in ${file}`);
});

// 4. Reduce margin in Strategy/Grid files where there's "mb-8" or similar huge gaps
const otherFiles = glob.sync('components/deals/*.tsx');
otherFiles.forEach(file => {
    // Only process if it's not a Hero or Header file to avoid double-replacing with wrong logic ? 
    // Wait, let's just target specific massive gaps if we know them
    // Actually, DealsContent.tsx has gaps too: "className="flex flex-col gap-8""
    if (file.includes('DealsContent.tsx')) {
        let content = fs.readFileSync(file, 'utf-8');
        content = content.replace(/gap-8/g, 'gap-4 md:gap-6');
        fs.writeFileSync(file, content);
        console.log(`Updated gap in ${file}`);
    }
});
