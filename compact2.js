const fs = require('fs');
const glob = require('glob');

// 1. Process Strategy files to reduce margins and gaps
const strategyFiles = glob.sync('components/deals/*Strategy.tsx');
strategyFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/mb-20/g, 'mb-8 md:mb-10');
    content = content.replace(/gap-8 mb-12/g, 'gap-4 md:gap-6 mb-8 md:mb-10');
    content = content.replace(/gap-8 mb-20/g, 'gap-4 md:gap-6 mb-8 md:mb-10');
    content = content.replace(/gap-8/g, 'gap-4 md:gap-6');
    content = content.replace(/mb-8 flex items-center/g, 'mb-4 flex items-center');
    content = content.replace(/p-6 md:p-8/g, 'p-4 md:p-6');
    content = content.replace(/mb-8"/g, 'mb-4 md:mb-6"');
    fs.writeFileSync(file, content);
    console.log(`Updated layout spacing in ${file}`);
});

// 2. Process Grid files to reduce top margins and gaps
const gridFiles = glob.sync('components/deals/*Grid.tsx');
gridFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/mb-8/g, 'mb-4 md:mb-5');
    content = content.replace(/pb-4/g, 'pb-2');
    content = content.replace(/gap-6/g, 'gap-4');
    content = content.replace(/py-12/g, 'py-6');
    fs.writeFileSync(file, content);
    console.log(`Updated grid layout in ${file}`);
});

// 3. Ensure gap is reduced in DealsContent.tsx
const contentFiles = glob.sync('components/deals/DealsContent.tsx');
contentFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/gap-8/g, 'gap-4 md:gap-6');
    content = content.replace(/mb-8/g, 'mb-4');
    fs.writeFileSync(file, content);
    console.log(`Updated DealsContent gap in ${file}`);
});
