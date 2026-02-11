const fs = require('fs');
const path = require('path');

const rawFile = path.join(__dirname, '../data/student_benefits_raw.txt');
const rawData = fs.readFileSync(rawFile, 'utf-8');

const CATEGORIES_LIST = [
    'Developer Tools',
    'Cloud & Credits',
    'Design & Creative',
    'AI Tools',
    'Productivity',
    'Learning',
    'Data Science',
    'Finance',
    'Hardware/Dev',
    'Hardware',
    'Travel',
    'Entertainment',
    'Health',
    'Miscellaneous',
    'Scholarships',
    'Startup Programs',
    'Competitions',
    'Grants',
    'Fashion'
];

const BENEFIT_TYPES = [
    'Subscription',
    'License',
    'Credits',
    'Hybrid',
    'Free',
    'Discount',
    'Trial',
    'Product',
    'Service',
    'Prize',
    'Scholarship',
    'Grant',
    'Loan',
    'Course',
    'Investment',
    'Program',
    'Stipend',
    'Salary',
    'Award',
    'Intrapreneurship',
    'Bundle'
];

const tldPattern = "com|org|net|io|ai|dev|app|edu|gov|mil|co|uk|ca|de|fr|jp|me|tech|site|xyz|cloud|studio|design|art|agency|info|biz|live|online|store|shop";
const urlRegex = new RegExp(`([a-zA-Z0-9-]+\\.(?:${tldPattern})(?:\\/[^\\s]*)?)`, 'gi');

const parts = rawData.split(urlRegex);
const parsedItems = [];
let currentPart = 'UNKNOWN';

// Words that commonly end a Product Title before the Company Name starts
const TITLE_SUFFIXES = [
    'Pack', 'Edition', 'Suite', 'Plan', 'License', 'Access', 'Free',
    'Student', 'Students', 'Enterprise', 'Pro', 'Plus', 'Cloud',
    'Tool', 'Tools', 'App', 'Apps', 'Library', 'Engine', 'Studio',
    'Server', 'Client', 'SDK', 'API', 'Account', 'Membership',
    'Desktop', 'Mobile', 'Web', 'Services', 'Platform', 'Portal',
    'Hub', 'Lab', 'Labs', 'Network', 'community', 'Community',
    'intro', 'Intro', 'Standard', 'Premium', 'Ultimate', 'Team',
    'Personal', 'Education', 'Service', 'Software', 'Editor',
    'Maker', 'Creative', 'Design', 'Data', 'Center', 'Management',
    'Monitoring', 'Security', 'Build', 'Hosting', 'Search', 'Maps',
    'DB', 'Cache', 'Project', 'Workspace', 'Trial'
];

for (let i = 0; i < parts.length - 1; i += 2) {
    let body = parts[i];
    let url = parts[i + 1];

    if (body.includes('Part I:')) currentPart = 'DEV';
    if (body.includes('Part VI:')) currentPart = 'FUNDING';

    if (i === 0) {
        const startIdx = body.indexOf('GitHub Student Developer Pack');
        if (startIdx !== -1) {
            body = body.substring(startIdx);
        }
    }

    let category = null;
    let catIndex = -1;
    const sortedCats = [...CATEGORIES_LIST].sort((a, b) => b.length - a.length);
    for (const cat of sortedCats) {
        const idx = body.indexOf(cat);
        if (idx !== -1 && idx < 100) {
            category = cat;
            catIndex = idx;
            break;
        }
    }

    if (!category) continue;

    const titleCompany = body.substring(0, catIndex).trim();
    const rest = body.substring(catIndex + category.length);

    let title = titleCompany;
    let company = '';

    // Improved Split Logic
    // 1. Check for Suffixes
    let suffixSplitIndex = -1;
    for (const suffix of TITLE_SUFFIXES) {
        // Look for Suffix followed immediately by a Capital letter
        // Regex: suffix + [A-Z]
        // Note: Suffix logic should be case sensitive or insensitive?
        // titles usually proper case.
        const regex = new RegExp(`(${suffix})([A-Z])`);
        const match = titleCompany.match(regex);
        if (match) {
            // Check if this split is "better" (later in string -> longer title?)
            const idx = match.index + match[1].length;
            if (idx > suffixSplitIndex) {
                suffixSplitIndex = idx;
            }
        }
    }

    if (suffixSplitIndex !== -1) {
        title = titleCompany.substring(0, suffixSplitIndex).trim();
        company = titleCompany.substring(suffixSplitIndex).trim();
    } else {
        // Fallback to CamelCase last transition
        const camelMatch = [...titleCompany.matchAll(/([a-z0-9])([A-Z])/g)];
        if (camelMatch.length > 0) {
            // Use the last one usually, UNLESS it breaks a known company like JetBrains?
            // If we have multiple matches. 
            // titleCompany = "SomeThingCoolMyCompany" -> "lM", "yC".
            // Last match "yC" -> Title "SomeThingCoolMy", Company "Company".
            // titleCompany = "PackJetBrains" -> "kJ", "tB".
            // Last match "tB" -> Title "PackJet", Company "Brains". (BAD)

            // If the last match is very close to end (e.g. < 6 chars remaining)?
            // "Brains" len 6.
            // If we have multiple matches, we might check length of candidate Company.

            const lastMatch = camelMatch[camelMatch.length - 1];
            // If multiple matches, check if the "Right side" of the *second to last* match 
            // looks like a valid company start?

            // For now, let's just stick to the last match if no suffix found.
            const splitIndex = lastMatch.index + 1;
            title = titleCompany.substring(0, splitIndex).trim();
            company = titleCompany.substring(splitIndex).trim();
        } else {
            company = titleCompany;
        }
    }

    // Parse Rest
    let benefitType = 'Unknown';
    let benefitIndex = -1;
    let firstBtIndex = 9999;
    let foundBt = '';

    for (const bt of BENEFIT_TYPES) {
        const regex = new RegExp(`${bt}`, 'g');
        let match;
        while ((match = regex.exec(rest)) !== null) {
            if (match.index > 5) {
                const charAfter = rest[match.index + bt.length];
                if (charAfter && /[A-Z$0-9~]/.test(charAfter)) {
                    if (match.index < firstBtIndex) {
                        firstBtIndex = match.index;
                        foundBt = bt;
                    }
                }
            }
        }
    }

    if (foundBt) {
        benefitType = foundBt;
        let offerSummary = rest.substring(0, firstBtIndex).trim().replace(/\.$/, '');
        const after = rest.substring(firstBtIndex + foundBt.length);

        const regionKeywords = ['Global', 'US', 'UK', 'Canada', 'Europe', 'India', 'Australia', 'Asia'];
        let region = 'Global';
        let regionIndex = -1;
        for (const reg of regionKeywords) {
            const idx = after.lastIndexOf(reg);
            if (idx !== -1 && idx > regionIndex) {
                region = reg;
                regionIndex = idx;
            }
        }

        let verification = 'N/A';
        let value = 'N/A';
        let eligibility = 'Student';

        if (regionIndex !== -1) {
            verification = after.substring(regionIndex + region.length).trim();
            const valElig = after.substring(0, regionIndex);

            const eligKeywords = ['Students', 'Founders', 'Everyone', 'Age', 'K-12', 'High School', 'College', 'Institute', 'Startups', 'Educators'];
            let eligIndex = -1;
            for (const kw of eligKeywords) {
                const idx = valElig.indexOf(kw);
                if (idx !== -1 && (eligIndex === -1 || idx < eligIndex)) {
                    eligIndex = idx;
                }
            }

            if (eligIndex !== -1) {
                value = valElig.substring(0, eligIndex).trim();
                eligibility = valElig.substring(eligIndex).trim();
            } else {
                value = valElig.trim();
            }
        } else {
            value = after;
        }

        if (!url.startsWith('http')) url = 'https://' + url;

        let appCategory = 'Credits & Savings';
        if (currentPart === 'FUNDING') appCategory = 'Funding & Opportunities';
        else {
            const lType = benefitType.toLowerCase();
            const lOffer = offerSummary.toLowerCase();
            const lVal = value.toLowerCase();
            if (lType === 'free' || lType === 'license' || lType === 'trial' || lOffer.includes('free ') || lVal === 'free' || lVal === 'n/a') {
                appCategory = 'Free Access';
            }
        }

        parsedItems.push({
            title,
            company,
            category: category,
            appCategory,
            offerSummary,
            benefitType,
            value,
            eligibility,
            region,
            verification,
            url
        });
    }
}

console.log(JSON.stringify(parsedItems, null, 2));
