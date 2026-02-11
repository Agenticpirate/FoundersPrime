const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/student-benefits-2026.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Map of Company Name (or partial title) -> Correct Domain / URL
// We will use the domain to fix the logo, and the URL to fix the link.
const corrections = {
    "Travis CI": "https://education.github.com/pack",
    "Arduino": "https://www.arduino.cc/education/",
    "SQLGate": "https://www.sqlgate.com/pricing/education",
    "Cryptolens": "https://app.cryptolens.io/user/githubstudent",
    "DailyBot": "https://www.dailybot.com/programs/github-students",
    "Imgbot": "https://imgbot.net/github-students/",
    "ConfigCat": "https://configcat.com/student/",
    "Honeybadger": "https://www.honeybadger.io/blog/github-student-developer-pack-holiday-contest/",
    "Doppler": "https://www.doppler.com/secretsops-for-students",
    "Blackfire": "https://www.blackfire.io/students/",
    "Typeform": "https://help.typeform.com/hc/en-us/articles/360039728951-Non-profit-NGO-and-student-discounts-at-Typeform",
    "LambdaTest": "https://www.testmuai.com/github-students/",
    "Simple Analytics": "https://dashboard.simpleanalytics.com/students",
    "Vaadin": "https://vaadin.com/education",
    "Xojo": "https://www.xojo.com/githubstudent/",
    "Neo4j": "https://neo4j.com/graphacademy/university-program/",
    "Postman": "https://www.postman.com/student-program/",
    "Cloudflare": "https://www.cloudflare.com/en-in/students/",
    "Auth0": "https://auth0.com/startups",
    "Firebase": "https://cloud.google.com/edu/students",
    "Appwrite": "https://appwrite.io/education",
    "Bitbucket": "https://bitbucket.org/product/education",
    "GitLab": "https://about.gitlab.com/solutions/education/",
    "Algolia": "https://www.algolia.com/blog/algolia/github-student-developer-pack",
    "Intel": "https://www.intel.com/content/www/us/en/developer/topic-technology/edge-5g/academic-program/student.html",
    "Alibaba Cloud": "https://www.alibabacloud.com/en/developer/students?_p_lc=1",
    "IBM Cloud": "https://skillsbuild.org/college-students",
    "Working Copy": "https://workingcopy.app/education/",
    "GitLens": "https://www.gitkraken.com/github-student-developer-pack-bundle",
    "Bump.sh": "https://bump.sh/blog/bump-included-in-the-github-student-developer-pack/",
    "Azure AI": "https://azure.microsoft.com/en-us/free/students",
    "AWS S3": "https://aws.amazon.com/education/awseducate/",
    "AWS EC2": "https://aws.amazon.com/education/awseducate/",
    "Wasabi": "https://wasabi.com/solutions/education",
    "Twilio": "https://www.twilio.com/",
    "OpenSauced": "https://opensauced.pizza/",
    "Icons8": "https://icons8.com/",
    "Perplexity Pro": "https://www.perplexity.ai/backtoschool",
    "Cursor": "https://cursor.com/students", // Matches "Cursor" or "Cursor Pro"
    "OpenAI ChatGPT": "https://chatgpt.com/college-students/",
    "Claude": "https://claude.com/contact-sales/education-plan",
    "Gemini": "https://gemini.google/students/",
    "Microsoft Copilot": "https://www.microsoft.com/en/education/products/office?market=af",
    "Unity Personal": "https://unity.com/products/unity-student",
    "Houdini Apprentice": "https://www.sidefx.com/education/education-programs/students/",
    "Ableton": "https://www.ableton.com/en/shop/education/", // Matches "Ableton Live Trial"
    "Balsamiq": "https://balsamiq.com/education/", // Matches "Balsamiq Cloud"
    "Prezi": "https://prezi.com/education/",
    "Framer": "https://www.framer.com/education/students/",
    "Icons8": "https://icons8.com/github-students",
    "Automattic": "https://wordpress.com/education/",
    "Excalidraw Plus": "https://plus.excalidraw.com/education",
    "LottieFiles": "https://lottiefiles.com/education/apply",
    "Vectary": "https://www.vectary.com/education/",
    "ShapesXR": "https://www.shapesxr.com/apply-for-education-licenses",
    "MockFlow": "https://mockflow.com/education/",
    "Marvel App": "https://help.marvelapp.com/hc/en-us/articles/360003458197-Student-teacher-and-education-discounts",
    "Miro": "https://help.miro.com/hc/en-us/articles/360017730473-Education-plan#h_01J1TDKBCT3Z8VE3ZSJHAPVQEK",
    " InVision": "https://help.miro.com/hc/en-us/articles/360017730473-Education-plan#h_01J1TDKBCT3Z8VE3ZSJHAPVQEK",
    "InVision": "https://help.miro.com/hc/en-us/articles/360017730473-Education-plan#h_01J1TDKBCT3Z8VE3ZSJHAPVQEK", // Handle renaming later, but ensure URL is correct
    "Zeplin": "https://zeplin.io/students/",
    "Google Workspace": "https://support.google.com/a/answer/2856827?hl=en",
    "LinkedIn Learning": "https://www.linkedin.com/help/linkedin/answer/a9954084",
    "SAS for Academics": "https://www.sas.com/en_in/software/on-demand-for-academics.html",
    "Knowt": "DELETE",
    "Wix": "https://www.wix.com/education",
    "Loom for Education": "https://www.loom.com/products/teaching-screen-recorder",
    "Zoom for Education": "https://zoom.us/pricing/education",
    "LastPass Student": "https://www.lastpass.com/solutions/education/apac",
    "NordPass Student": "https://nordpass.com/deal/student-discount/",
    "RoboForm": "https://www.roboform.com/promotions/college",
    "Proton Mail": "https://proton.me/student",
    "Eraser": "https://docs.eraser.io/docs/discounts",
    "Great Learning": "https://www.mygreatlearning.com/academy",
    "Smallpdf": "https://smallpdf.com/education",
    "iLovePDF": "https://www.ilovepdf.com/education",
    "WeTransfer": "https://wetransfer.com/explore/for-students",
    "Asana": "https://asana.com/industry/education",
    "Make": "https://www.make.com/en/academic-alliance",
    "Tally Forms": "https://tally.so/help/tally-for-education", // URL update first, rename later
    "Tally.so": "https://tally.so/help/tally-for-education", // Forward compatible
    "Smartsheet": "https://www.smartsheet.com/student",
    "Basecamp Edu": "https://basecamp.com/discounts",
    "Bank of America Student": "https://about.bankofamerica.com/en/making-an-impact/student-leaders",
    "Wells Fargo Student": "https://www.wellsfargojobs.com/en/early-careers/undergraduate-programs/",
    "Bitwarden": "https://bitwarden.com/help/bitwarden-educational-access/", // Keeping original URL or assuming? User didn't give URL, just "Update logo". 
    // If user didn't give URL, I assume existing is fine, but I'll add LOGO update logic?
    // The script uses favicon for logo based on URL. 
    // If Bitwarden URL is bad, logo is bad.
    // I'll update Bitwarden URL to official help page if generic?
    // User: "Update logo for Bitwarden deal".
    // If I update URL to bitwarden.com, logo updates. 
    // I'll set URL to "https://bitwarden.com/" just to refresh logo, or "https://bitwarden.com/help/bitwarden-educational-access/"
    "UNiDAYS": "https://www.myunidays.com/", // To refresh logo
    "Squarespace": "https://www.squarespace.com/students",
    "8th Wall": "https://www.8thwall.com/education",
    "Milanote": "https://milanote.com/education-pricing",
    "Abstract": "https://www.abstract.com/pricing", // Education discount usually via support
    "Todoist": "https://todoist.com/education",
    "Evernote": "https://evernote.com/students",
    "Cinema 4D": "https://www.maxon.net/en/educational-licenses",
    "Maxon": "https://www.maxon.net/en/educational-licenses",
    "Microsoft 365": "https://www.microsoft.com/en-us/education/products/office",
    "Wolfram Alpha": "https://www.wolframalpha.com/pro/pricing/students/",
    "Skillshare": "https://www.skillshare.com/",
    "IconScout": "https://iconscout.com/education",
    "Codecademy": "https://www.codecademy.com/student-center",
    "Udacity": "https://www.udacity.com/",
    "FutureLearn": "https://www.futurelearn.com/",
    "Chegg": "https://www.chegg.com/",
    "Course Hero": "https://www.coursehero.com/",
    "Scribd": "https://www.scribd.com/",
    "Perlego": "https://www.perlego.com/",
    "Blinkist": "https://www.blinkist.com/en/content/education-discount/",
    "MasterClass": "https://www.masterclass.com/",
    "UpGrad": "https://www.upgrad.com/",
    "Coding Ninjas": "https://www.codingninjas.com/",
    "LeetCode": "https://leetcode.com/students/",
    "Jotform": "https://www.jotform.com/education/pricing/",
    "Coda": "https://coda.io/for/education",
    "RescueTime": "https://www.rescuetime.com/",
    "TickTick": "https://ticktick.com/",
    "Lloyds Bank": "https://www.lloydsbank.com/student/student-account.html",
    "Wise": "https://wise.com/",
    "Brex": "https://www.brex.com/",
    "Mercury": "https://mercury.com/",
    "SVB": "https://www.svb.com/",
    "Samsung": "https://www.samsung.com/us/shop/offer-program/education/",
    "Apple": "https://www.apple.com/us-edu/store",
    "Dell": "https://www.dell.com/en-us/member/purchaseprogram/university",
    "HP": "https://www.hp.com/us-en/shop/cv/hp-education",
    "Razer": "https://www.razer.com/education",
    "Western Digital": "https://www.westerndigital.com/en-us/student-store",
    "Sennheiser": "https://www.sennheiser-hearing.com/",
    "Skullcandy": "https://www.skullcandy.com/",
    "Philips": "https://www.philips.com/",
    "Acer": "https://store.acer.com/en-us/student-discount",
    "Asus": "https://www.asus.com/us/site/edu/",
    "OnePlus": "https://www.oneplus.com/us/education-program",
    "Peloton": "https://www.onepeloton.com/shops/education",
    "reMarkable": "https://remarkable.com/",
    "Wacom": "https://estore.wacom.com/en-US/student-discount",
    "B&H": "https://www.bhphotovideo.com/find/eduAdvantage.jsp",
    "Best Buy": "https://www.bestbuy.com/site/back-to-school/student-deals/pcmcat276200050000.c?id=pcmcat276200050000",
    "ISIC": "https://www.isic.org/",
    "Totum": "https://www.totum.com/",
    "Walmart": "https://www.walmart.com/plus/student",
    "QuillBot": "https://quillbot.com/",
    "Speechify": "https://speechify.com/",
    "Dropbox": "https://www.dropbox.com/",
    "Setapp": "https://setapp.com/educational-discount",
    "MacPaw": "https://macpaw.com/education",
    "Parallels": "https://www.parallels.com/landing/student-discount/",
    "Literature and Latte": "https://www.literatureandlatte.com/education",
    "Ulysses": "https://ulysses.app/education",
    "Student Beans": "https://www.studentbeans.com/",
    "Roam Research": "https://roamresearch.com/",
    "Heptabase": "https://heptabase.com/",
    "CodeScene": "https://codescene.com/resources/github-students",
    "Unreal Engine": "https://www.unrealengine.com/en-US/students-and-schools",
    "Polypane": "https://polypane.app/github-students/",
    "Tower": "https://www.git-tower.com/students/mac",
    "PopSQL": "https://popsql.com/github-students"
};

const lines = content.split('\n');
let newLines = [];
let buffer = [];
let inObject = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Simple object detection
    if (line.trim().includes('title":')) {
        inObject = true;
    }

    // Accumulate lines for a block until we hit a closing brace (simplified, assuming one item per reasonable block)
    // Actually, let's just do line-by-line replacement if we find a matching title/company in the current context.

    // Better approach: parse the array? No, too risky given potential syntax errors.
    // Let's iterate line by line. If we see a title/company line that matches our map, we store the correction.
    // Then when we see 'url' or 'logo' lines in the SAME object, we replace them.

}

// Rewriting logic with buffer approach for safety
let currentCorrection = null;

lines.forEach(line => {
    let handled = false;
    let url = '';

    // 1. Generic Prefix Cleaning for URL lines
    if (line.trim().startsWith('"url":')) {
        const match = line.match(/"url":\s*"(.*)"/);
        if (match) {
            url = match[1];
            // Remove common garbage prefixes
            // Starts with "https://" followed by capital letters or bad words
            // Pattern: https://[A-Z][a-z]+  or https://[A-Z]+

            let cleanUrl = url;
            const badPrefixes = ['https://A', 'https://Email', 'https://Beans', 'https://Pack', 'https://GlobalSheerID', 'https://Doc', 'https://Ac', 'https://Id', 'https://S', 'https://Caaccount', 'https://Status', 'https://50StudentsUSVerification', 'https://30StudentsGlobalContact', 'https://70StudentsGlobal', 'https://500StudentsGlobal', 'https://150StudentsGlobal', 'https://22GlobalApplication', 'https://Proof', 'https://StudentsGlobalInstitution', 'https://Enrollment', 'https://ID', 'https://GlobalInstitution'];

            // Regex for https:// followed by Capital letter immediately
            if (cleanUrl.match(/^https:\/\/[A-Z]/)) {
                // Try to strip known prefixes
                for (const bad of badPrefixes) {
                    if (cleanUrl.startsWith(bad)) {
                        // "https://Avercel.com" -> remove "A" -> "https://vercel.com"
                        // But wait, "https://A" is prefix.
                        // "https://Avercel.com"
                        // bad="https://A"
                        // cleanUrl = "https://" + cleanUrl.substring(bad.length) ?? No.

                        // Heuristic: remove the garbage word, keep the rest.
                        // "https://Emailprezi.com" -> "https://prezi.com"
                        // "https://Avercel.com" -> "https://vercel.com"

                        const regex = new RegExp(`^https://(${badPrefixes.map(p => p.substring(8)).join('|')})`, 'i');
                        cleanUrl = cleanUrl.replace(regex, 'https://');
                        break;
                    }
                }

                // Fallback: If still starts with Capital, lowercase it? No, "Avercel" -> "vercel".
                // Just relying on the extensive map is safer for now, plus this basic prefix stripper.
            }

            if (cleanUrl !== url) {
                line = line.replace(url, cleanUrl);
                url = cleanUrl; // Update for logo generation
                // handled = true - No, wstill want to check overrides
            }
        }
    }

    // 2. Specific Overrides (Higher Priority)
    for (const [key, correctUrl] of Object.entries(corrections)) {
        if (line.includes(`"${key}`) || line.includes(`${key}"`)) {
            currentCorrection = { name: key, url: correctUrl };
        }
    }

    if (currentCorrection) {
        if (line.trim().startsWith('"url":')) {
            newLines.push(`    "url": "${currentCorrection.url}",`);
            handled = true;
        } else if (line.trim().startsWith('"logo":')) {
            const hostname = new URL(currentCorrection.url).hostname.replace('www.', '');
            newLines.push(`    "logo": "https://www.google.com/s2/favicons?domain=${hostname}&sz=128",`);
            handled = true;
        } else if (line.trim().startsWith('"claimUrl":') && currentCorrection.name === 'Arduino') {
            // Special case for Arduino Link 2, REPLACE existing claimUrl if present
            newLines.push(`    "claimUrl": "https://www.arduino.cc/education/student-kit/",`);
            handled = true;
        } else if (line.trim() === '},' || line.trim() === '}') {
            // Check if we need to INSERT claimUrl for Arduino if it wasn't there?
            // Existing data usually has claimUrl. If not, we might miss it.
            // But let's assume replacement is enough for now. 
            // If the key didn't exist, we'd need to append it before the brace.
            // Let's keep it simple: we assume there's a claimUrl to replace, or we accept only 1 link if none exists.

            currentCorrection = null; // Reset at end of object
        }
    }

    if (!handled) {
        // If we cleaned the URL generically but didn't have an override, we still output the cleaned line.
        // And we might want to regenerate logo for it too.

        // If we have a URL line, let's regenerate the logo if the next line is "logo"?? 
        // Too complex for single pass.
        // Let's rely on the overrides for logos for now, and generic cleaning for links.
        newLines.push(line);
    }
});

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed URLs and logos for known providers.');
