const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace Clearbit URLs with Google Favicons
content = content.replace(/https:\/\/logo\.clearbit\.com\/([^"]+)/g, (match, domain) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
});

// 2. Fix known broken hardcoded URLs
const repairs = {
    'https://assets.termius.com/termius-logo.svg': 'https://www.google.com/s2/favicons?domain=termius.com&sz=128',
    'https://www.gitkraken.com/downloads/brand-assets/gitkraken-logo-dark-sq.png': 'https://www.google.com/s2/favicons?domain=gitkraken.com&sz=128',
    'https://bootstrapstudio.io/assets/img/logo.png': 'https://www.google.com/s2/favicons?domain=bootstrapstudio.io&sz=128',
    'https://www.browserstack.com/images/static/header-logo.jpg': 'https://www.google.com/s2/favicons?domain=browserstack.com&sz=128'
};

for (const [bad, good] of Object.entries(repairs)) {
    content = content.split(bad).join(good);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Migrated logos to Google Favicons and fixed broken URLs.');
