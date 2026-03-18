const fs = require('fs');
const glob = require('glob');

const files = glob.sync('{components,app}/**/*.tsx');
let filesChanged = 0;

files.forEach(file => {
    let originalContent = fs.readFileSync(file, 'utf-8');
    let content = originalContent;

    // Replace max-width container classes to spread out more
    content = content.replace(/\bmax-w-5xl\b/g, 'max-w-[1600px]');
    content = content.replace(/\bmax-w-6xl\b/g, 'max-w-[1600px]');
    content = content.replace(/\bmax-w-7xl\b/g, 'max-w-[1600px]');
    content = content.replace(/\bmax-w-screen-xl\b/g, 'max-w-[1600px]');
    content = content.replace(/\bmax-w-\[1400px\]\b/g, 'max-w-[1600px]');
    
    // Increase px padding on some of these elements so it doesn't hug the absolute edge on ultrawide
    content = content.replace(/\bpx-4 sm:px-6 lg:px-8\b/g, 'px-4 sm:px-6 lg:px-12 xl:px-16');
    content = content.replace(/\bpx-4 sm:px-8\b/g, 'px-4 sm:px-8 lg:px-12 xl:px-16');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Widened layout in ${file}`);
        filesChanged++;
    }
});

console.log(`${filesChanged} files modified to utilise full space.`);
