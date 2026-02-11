const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// 1. Define Fixes
const deletions = ['SBI Student Loan', 'Wise', 'Philips']; // 'Wise' (keep Wise Business), 'Philips' (keep Philips Student)

const urlFixes = {
    "Freedom": "https://freedom.to/",
    "Microsoft Surface Edu": "https://www.microsoft.com/en-us/store/b/education",
    "Remarkable": "https://remarkable.com/store/education-discount",
    "JotForm Education": "https://www.jotform.com/education/",
    "ASUS": "https://www.asus.com/us/site/edu/",
    "Sennheiser": "https://www.sennheiser.com/en-us", // or UNiDAYS if specific link NA
    "Freedom": "https://freedom.to/",
};

const logoDomains = {
    "Sennheiser": "sennheiser.com",
    "Skullcandy": "skullcandy.com",
    "Philips Student": "philips.com",
    "Acer": "acer.com",
    "ASUS": "asus.com",
    "OnePlus": "oneplus.com",
    "Peloton": "onepeloton.com",
    "Peloton App Student": "onepeloton.com",
    "Peloton Hardware": "onepeloton.com",
    "Remarkable": "remarkable.com",
    "Wacom": "wacom.com",
    "B&H Photo": "bhphotovideo.com",
    "Best Buy Student": "bestbuy.com",
    "Walmart+ Student": "walmart.com",
    "TD Student Chequing": "td.com",
    "RBC Student Banking": "rbc.com",
    "Scotiabank Student": "scotiabank.com",
    "BMO Student": "bmo.com",
    "CIBC Student": "cibc.com",
    "HSBC Student Account": "hsbc.co.uk",
    "Santander Student": "santander.co.uk",
    "NatWest Student": "natwest.com",
    "Barclays Student": "barclays.co.uk",
    "Discover Student Chrome": "discover.com",
    "Capital One Savor Student": "capitalone.com",
    "Deserve EDU": "deserve.com",
    "Wise Business": "wise.com",
    "Amtrak Student": "amtrak.com",
    "FlixBus Student": "flixbus.com",
    "United Airlines": "united.com",
    "Lufthansa Student": "lufthansa.com",
    "Turkish Airlines": "turkishairlines.com",
    "Emirates Student": "emirates.com",
    "Qatar Airways": "qatarairways.com",
    "Singapore Airlines": "singaporeair.com",
    "Air France Student": "airfrance.us",
    "Cathay Pacific": "cathaypacific.com",
    "Etihad Student": "etihad.com",
    "SAS Youth": "flysas.com",
    "Eurail Pass": "eurail.com",
    "Interrail Pass": "interrail.eu",
    "Greyhound": "greyhound.com",
    "Megabus": "megabus.com",
    "TfL 18+ Oyster": "tfl.gov.uk",
    "16-25 Railcard": "16-25railcard.co.uk",
    "YouTube Premium Student": "youtube.com",
    "Apple Music Student": "apple.com",
    "Amazon Music Unlimited": "amazon.com",
    "Hulu Student": "hulu.com",
    "Peacock Student": "peacocktv.com",
    "Paramount+ Student": "paramountplus.com",
    "HBO Max Student": "hbomax.com",
    "Tidal Student": "tidal.com",
    "Deezer Student": "deezer.com",
    "SoundCloud Go+": "soundcloud.com",
    "Pandora Student": "pandora.com",
    "Headspace Student": "headspace.com",
    "Calm Student": "calm.com",
    "Strava Student": "strava.com",
    "Bulk Powders": "bulk.com",
    "MyProtein Student": "myprotein.com",
    "MEC Student": "mec.ca",
    "HelloFresh Student": "hellofresh.com",
    "Uber Eats Student": "ubereats.com",
    "DoorDash Student": "doordash.com",
    "Grubhub Student": "grubhub.com",
    "The Washington Post": "washingtonpost.com",
    "The New York Times": "nytimes.com",
    "The Wall Street Journal": "wsj.com",
    "The Economist": "economist.com",
    "Financial Times": "ft.com",
    "Bloomberg": "bloomberg.com",
    "Nike Student": "nike.com",
    "Adidas Student": "adidas.com",
    "ASOS Student": "asos.com",
    "H&M Student": "hm.com",
    "Levi's Student": "levi.com",
    "Uniqlo Student": "uniqlo.com",
    "Gymshark Student": "gymshark.com",
    "New Balance Student": "newbalance.com",
    "Reebok Student": "reebok.com",
    "Puma Student": "puma.com",
    "Converse Student": "converse.com",
    "Dr. Martens": "drmartens.com",
    "UGG Student": "ugg.com",
    "Crocs Student": "crocs.com",
    "Ray-Ban Student": "ray-ban.com",
    "Oakley Student": "oakley.com",
    "Lenovo Education": "lenovo.com",
    "Logitech Education": "logitech.com",
    "Bose Education": "bose.com",
    "Sony Education": "sony.com",
    "Canon Education": "canon.com",
    "GoPro Student": "gopro.com",
    "JBL Student": "jbl.com",
    "Sonos Student": "sonos.com",
    "Adorama Student": "adorama.com",
    "Target Student": "target.com"
};


// 2. Parse and Modify
let finalLines = [];
let currentObjLines = [];
let braceCount = 0;
let inside = false;
let deletedCount = 0;
let modifiedCount = 0;

// Preserve header
const headerLines = [];
let foundStart = false;
for (let line of lines) {
    if (line.trim().startsWith('export const studentBenefits2026: StudentBenefit[] = [')) {
        foundStart = true;
    }
    if (!foundStart || (foundStart && !line.includes('{'))) {
        // headerLines.push(line); 
        // Actually, let's just use the loop to find objects and reconstruct.
    }
}
// We will manually reconstruct header.
finalLines.push(`export const studentBenefits2026: StudentBenefit[] = [`);

for (let line of lines) {
    if (line.includes('{')) {
        braceCount += (line.match(/{/g) || []).length;
        inside = true;
    }
    if (inside) {
        currentObjLines.push(line);
    }

    if (line.includes('}')) {
        braceCount -= (line.match(/}/g) || []).length;
        if (braceCount === 0 && inside) {
            // End of object
            let objStr = currentObjLines.join('\n');

            // Validate Title
            const titleMatch = objStr.match(/"title":\s*"(.*)"/);
            if (!titleMatch) {
                // Skip non-deal blocks
                currentObjLines = [];
                inside = false;
                continue;
            }
            const title = titleMatch[1];

            // A. Deletions
            if (deletions.includes(title)) {
                deletedCount++;
                currentObjLines = [];
                inside = false;
                continue;
            }

            // B. URL Fixes
            if (urlFixes[title]) {
                const newUrl = urlFixes[title];
                objStr = objStr.replace(/"url":\s*".*"/, `"url": "${newUrl}"`);
                modifiedCount++;
            }

            // C. Logo Fixes
            if (logoDomains[title]) {
                const domain = logoDomains[title];
                const newLogo = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                // Replace existing logo or add if missing
                if (objStr.includes('"logo":')) {
                    objStr = objStr.replace(/"logo":\s*".*"/, `"logo": "${newLogo}"`);
                } else {
                    // Inject logo after slug or company
                    objStr = objStr.replace(/"company":\s*"(.*)",/, `"company": "$1",\n    "logo": "${newLogo}",`);
                }
                modifiedCount++;
            }

            // Ensure distinct items have commas (handled by join later)
            // But we push to array.
            finalLines.push(objStr);
            currentObjLines = [];
            inside = false;
        }
    }
}

// Reconstruct file
// We need to support the interface at the top? 
// No, we removed it in previous step.
// We need to ensure we don't duplicate interface if it's there.
// But we wrote specific header `export const ... = [`

// IMPT: The file *should* have the interface? 
// "export interface StudentBenefit ..."
// My previous fix removed the *duplicated* interface inside the array.
// But we need the interface definition at the top of file (lines 1-33).
// In this script `lines` contains original file.
// I should preserve lines 1 to 33.

const interfaceLines = lines.slice(0, 34).filter(l => !l.startsWith('export const studentBenefits2026'));
// Filter safely.

let outputContent = interfaceLines.join('\n') + '\n\n';
outputContent += `export const studentBenefits2026: StudentBenefit[] = [\n`;
outputContent += finalLines.join(',\n'); // Join objects with comma!
outputContent += '\n];';

fs.writeFileSync(filePath, outputContent, 'utf8');
console.log(`Updated Credits & Savings. Deleted: ${deletedCount}, Modified: ${modifiedCount}`);
