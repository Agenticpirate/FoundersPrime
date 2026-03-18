const fs = require('fs');
const glob = require('glob');

const files = glob.sync('{components,app}/**/*.tsx');
files.forEach(file => {
    let originalContent = fs.readFileSync(file, 'utf-8');
    let content = originalContent;

    // Replace padding classes
    content = content.replace(/py-24/g, 'py-12 md:py-16');
    content = content.replace(/py-20/g, 'py-10 md:py-14');
    content = content.replace(/py-16/g, 'py-8 md:py-12');
    content = content.replace(/py-12/g, 'py-6 md:py-8');
    content = content.replace(/py-10/g, 'py-5 md:py-6');
    
    // Replace responsive lg: padding classes
    content = content.replace(/lg:py-24/g, 'lg:py-16');
    content = content.replace(/lg:py-20/g, 'lg:py-14');
    content = content.replace(/lg:py-16/g, 'lg:py-12');
    content = content.replace(/lg:py-12/g, 'lg:py-8');
    
    // Replace margin classes
    content = content.replace(/mb-24/g, 'mb-12 md:mb-16');
    content = content.replace(/mb-20/g, 'mb-10 md:mb-14');
    content = content.replace(/mb-16/g, 'mb-8 md:mb-12');
    content = content.replace(/mb-12/g, 'mb-6 md:mb-8');
    
    // Replace responsive lg: margin classes
    content = content.replace(/lg:mb-24/g, 'lg:mb-16');
    content = content.replace(/lg:mb-20/g, 'lg:mb-14');
    content = content.replace(/lg:mb-16/g, 'lg:mb-12');

    // Make hero section sizes more compact for mobile too
    content = content.replace(/mb-8/g, 'mb-4 md:mb-6');
    content = content.replace(/mt-8/g, 'mt-4 md:mt-6');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Compacted layout dynamically in ${file}`);
    }
});
