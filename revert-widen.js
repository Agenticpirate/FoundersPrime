const fs = require('fs');
const glob = require('glob');

const files = glob.sync('{components,app}/**/*.tsx');
let filesChanged = 0;

files.forEach(file => {
    let originalContent = fs.readFileSync(file, 'utf-8');
    let content = originalContent;

    // Provide a beautiful standardized container wrap: 7xl (1280px)
    content = content.replace(/\bmax-w-\[1600px\]\b/g, 'max-w-7xl');

    // Return the extreme paddings to regular
    content = content.replace(/\bpx-4 sm:px-6 lg:px-12 xl:px-16\b/g, 'px-4 sm:px-6 lg:px-8');
    content = content.replace(/\bpx-4 sm:px-8 lg:px-12 xl:px-16\b/g, 'px-4 sm:px-8');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Reverted layout in ${file}`);
        filesChanged++;
    }
});

console.log(`${filesChanged} files modified to revert to standard container.`);
