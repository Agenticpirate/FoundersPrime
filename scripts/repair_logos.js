
const fs = require('fs');
const path = require('path');

const tsFile = path.join(__dirname, '../data/student-benefits-2026.ts');

try {
    let content = fs.readFileSync(tsFile, 'utf8');

    const repairs = {
        'pple.com': 'apple.com',
        'mazon.com': 'amazon.com',
        'mazon.science': 'amazon.science',
        'lgolia.com': 'algolia.com',
        'sana.com': 'asana.com',
        'irbnb.com': 'airbnb.com',
        'irtable.com': 'airtable.com',
        'lchemistaccelerator.com': 'alchemistaccelerator.com',
        'libabacloud.com': 'alibabacloud.com',
        'lteryx.com': 'alteryx.com',
        'mity.edu': 'amity.edu',
        'mtrak.com': 'amtrak.com',
        'ntler.co': 'antler.co',
        'speninstitute.org': 'aspeninstitute.org',
        'tlassian.com': 'atlassian.com',
        'uth0.com': 'auth0.com',
        'utodesk.com': 'autodesk.com',
        'xure.com': 'axure.com',
        'ppwrite.io': 'appwrite.io',
        'mostudentsglobalcodeframer.com': 'framer.com',
        'studentsglobalinstitutionshapesxr.com': 'shapesxr.com',
        'sheeridunity.com': 'unity.com',
        'ucegypt.edu': 'aucegypt.edu' // from grep output in my head, likely auc
    };

    for (const [bad, good] of Object.entries(repairs)) {
        const regex = new RegExp(`https://logo\\.clearbit\\.com/${bad}`, 'g');
        content = content.replace(regex, `https://logo.clearbit.com/${good}`);
    }

    // General cleanup for A-prefixed URLs in the URL field if we feel bold?
    // User only asked for logos. Let's stick to logos.

    fs.writeFileSync(tsFile, content, 'utf8');
    console.log('Repaired logos.');

} catch (err) {
    console.error(err);
}
