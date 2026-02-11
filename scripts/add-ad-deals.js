const fs = require('fs');
const path = require('path');

const dealsPath = path.join(__dirname, '../public/data/all-deals.json');
const processedPath = path.join(__dirname, '../data/processed-deals/all-deals.json');

const adDeals = [
    {
        title: "Google Ads",
        provider: "Google",
        value: "$500 Credits",
        savings: "$500",
        description: "Start your advertising journey with $500 in free ad credits when you spend $500. Reach potential customers across Search, YouTube, and Display networks.",
        shortDescription: "Get $500 in free ad credits when you spend $500 on Google Ads.",
        applicationUrl: "https://ads.google.com/home/tools/coupon-code-offers/",
        slug: "google-ads",
        category: "ad-credits",
        subcategory: "search-ads",
        status: "active",
        featured: true,
        recommended: true,
        eligibility: ["New Google Ads accounts only", "Must be applied within 14 days of account creation"],
        tags: ["Search", "PPC", "Marketing", "Google"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.google.com&size=128",
        steps: [
            { title: "Create Account", description: "Sign up for a new Google Ads account." },
            { title: "Apply Code", description: "Enter the promotional code within 14 days of account creation." },
            { title: "Spend Budget", description: "Spend $500 on ads within 60 days to trigger the credit." }
        ]
    },
    {
        title: "Microsoft Advertising",
        provider: "Microsoft",
        value: "$500 Credits",
        savings: "$500",
        description: "Reach customers on Bing, Yahoo, and AOL. Get $500 in ad credits when you spend $250. Ideal for B2B targeting and diverse audiences.",
        shortDescription: "Get $500 in search ad credits when you spend $250.",
        applicationUrl: "https://about.ads.microsoft.com/en-us/get-started/sign-up",
        slug: "microsoft-ads",
        category: "ad-credits",
        subcategory: "search-ads",
        status: "active",
        featured: true,
        recommended: false,
        eligibility: ["New Microsoft Advertising customers", "Valid for new accounts only"],
        tags: ["Search", "Bing", "B2B", "Marketing"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.microsoft.com&size=128",
        steps: [
            { title: "Sign Up", description: "Create a new Microsoft Advertising account." },
            { title: "Add Payment", description: "Add a valid payment method." },
            { title: "Spend Requirement", description: "Spend $250 in ad spend to unlock the $500 credit." }
        ]
    },
    {
        title: "LinkedIn Ads",
        provider: "LinkedIn",
        value: "$500 Credits",
        savings: "$500+",
        description: "Reach decision-makers and professionals. LinkedIn offers various ad credit programs for startups and B2B businesses, often starting at $100-$500.",
        shortDescription: "Target professionals with up to $500 in free ad credits.",
        applicationUrl: "https://business.linkedin.com/marketing-solutions/ads",
        slug: "linkedin-ads",
        category: "ad-credits",
        subcategory: "social-ads",
        status: "active",
        featured: true,
        recommended: true,
        eligibility: ["New ad accounts", "B2B Focus"],
        tags: ["Social", "B2B", "Professional", "Marketing"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://business.linkedin.com&size=128",
        steps: [
            { title: "Create Page", description: "Ensure you have a LinkedIn Company Page." },
            { title: "Open Ad Account", description: "Open a new Campaign Manager account." },
            { title: "Claim Offer", description: "Look for specific promotional links or email offers to claim credits." }
        ]
    },
    {
        title: "TikTok Ads Manager",
        provider: "TikTok",
        value: "$1,500 Credits",
        savings: "$1,500",
        description: "Connect with a massive, engaged audience. TikTok frequently offers 'Spend X, Get Y' ad credit programs for new advertisers, up to $1,500 matching.",
        shortDescription: "Get up to $1,500 in ad credit matches for new accounts.",
        applicationUrl: "https://ads.tiktok.com/",
        slug: "tiktok-ads",
        category: "ad-credits",
        subcategory: "social-ads",
        status: "active",
        featured: true,
        recommended: false,
        eligibility: ["New TikTok for Business accounts", "Region dependent"],
        tags: ["Social", "Video", "Viral", "Mobile"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.tiktok.com&size=128",
        steps: [
            { title: "Register", description: "Create a TikTok for Business account." },
            { title: "Opt-in", description: "Opt-in to the promotion within the dashboard." },
            { title: "Spend", description: "Spend the required amount within 30 days to receive the credit match." }
        ]
    },
    {
        title: "Snapchat Ads",
        provider: "Snapchat",
        value: "$375 Credits",
        savings: "$375",
        description: "Reach Gen Z and Millennials with immersive ads. Get $375 in free ad credits when you spend $350 on Snapchat Ads.",
        shortDescription: "Get $375 free credits when you spend $350.",
        applicationUrl: "https://forbusiness.snapchat.com/",
        slug: "snapchat-ads",
        category: "ad-credits",
        subcategory: "social-ads",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["New advertisers only", "Spend requirement applies"],
        tags: ["Social", "Mobile", "Gen Z", "AR"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://forbusiness.snapchat.com&size=128",
        steps: [
            { title: "Create Business Account", description: "Sign up for Snapchat for Business." },
            { title: "Launch Ads", description: "Create and obtain approval for your first ad." },
            { title: "Spend Requirement", description: "Spend $350 to automatically receive the credit." }
        ]
    },
    {
        title: "Yelp Ads",
        provider: "Yelp",
        value: "$300 Credits",
        savings: "$300",
        description: "Connect with local customers ready to buy. Yelp offers $300 in free ad credits for new businesses to boost their local visibility.",
        shortDescription: "$300 free ad credits for local business promotion.",
        applicationUrl: "https://biz.yelp.com/",
        slug: "yelp-ads",
        category: "ad-credits",
        subcategory: "search-ads",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["New Yelp for Business accounts", "Local businesses"],
        tags: ["Local", "Search", "Review", "Small Business"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://biz.yelp.com&size=128",
        steps: [
            { title: "Claim Business", description: "Claim your business page on Yelp." },
            { title: "Start Advertising", description: "Begin setting up your ad campaign." },
            { title: "Redeem", description: "Credits are typically applied at checkout or via promo code." }
        ]
    },
    {
        title: "Apple Search Ads",
        provider: "Apple",
        value: "$100 Credits",
        savings: "$100",
        description: "Drive app installs directly from the App Store. Apple offers a $100 credit for new Apple Search Ads accounts to help you get discovered.",
        shortDescription: "$100 free credit to promote your iOS app.",
        applicationUrl: "https://searchads.apple.com/",
        slug: "apple-search-ads",
        category: "ad-credits",
        subcategory: "search-ads",
        status: "active",
        featured: false,
        recommended: true,
        eligibility: ["Developers with an App Store Connect account", "New Search Ads accounts"],
        tags: ["Mobile", "iOS", "App Store", "ASO"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://searchads.apple.com&size=128",
        steps: [
            { title: "Log In", description: "Sign in with your Apple ID linked to App Store Connect." },
            { title: "Set Up Account", description: "Configure your Search Ads Basic or Advanced account." },
            { title: "Receive Credit", description: "The $100 credit is often automatically applied to new accounts." }
        ]
    },
    {
        title: "Pinterest Ads",
        provider: "Pinterest",
        value: "Credit Match",
        savings: "$1,000+",
        description: "Inspire shoppers on Pinterest. They often run 'Spend X, Get Y' promotions, such as spending $100 to get $100, or larger matches for agencies.",
        shortDescription: "Ad credit matches for visual discovery campaigns.",
        applicationUrl: "https://ads.pinterest.com/",
        slug: "pinterest-ads",
        category: "ad-credits",
        subcategory: "social-ads",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["New Pinterest Business accounts", "First-time advertisers"],
        tags: ["Visual", "E-commerce", "Social", "Inspiration"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.pinterest.com&size=128",
        steps: [
            { title: "Create Business Account", description: "Sign up for a Pinterest Business account." },
            { title: "Launch Campaign", description: "Set up and launch your first ad campaign." },
            { title: "Match Offer", description: "Meet the spend criteria to receive your matching credit." }
        ]
    },
    {
        title: "Reddit Ads",
        provider: "Reddit",
        value: "$100-$500 Credits",
        savings: "$500",
        description: "Engage with passionate communities. Reddit offers ad credit tiered matches for new advertisers to reach niche subreddits.",
        shortDescription: "Reach communities with up to $500 in ad credits.",
        applicationUrl: "https://ads.reddit.com/",
        slug: "reddit-ads",
        category: "ad-credits",
        subcategory: "social-ads",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["New Reddit Ads accounts"],
        tags: ["Community", "Social", "Niche", "Discussion"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.reddit.com&size=128",
        steps: [
            { title: "Sign Up", description: "Create a Reddit Ads account." },
            { title: "Add Payment", description: "Add a valid payment method." },
            { title: "Spend & Get", description: "Spend $100 to get $100 (offers vary)." }
        ]
    },
    {
        title: "Spotify Ad Studio",
        provider: "Spotify",
        value: "$500 Credits",
        savings: "$500",
        description: "Reach listeners while they stream. Spotify Ad Studio often provides ad credit matches for new self-serve advertisers.",
        shortDescription: "Audio ad credits to reach streaming listeners.",
        applicationUrl: "https://ads.spotify.com/en-US/",
        slug: "spotify-ads",
        category: "ad-credits",
        subcategory: "display-ads",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["New Ad Studio accounts"],
        tags: ["Audio", "Streaming", "Music", "Podcast"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.spotify.com&size=128",
        steps: [
            { title: "Create Account", description: "Register for Spotify Ad Studio." },
            { title: "Create Campaign", description: "Create your first audio or video ad campaign." },
            { title: "Credit Match", description: "Look for promotional emails to claim your credit match." }
        ]
    },
    {
        title: "Quora Ads",
        provider: "Quora",
        value: "$100 Credits",
        savings: "$100",
        description: "Reach people searching for answers. Quora sends targeted ad credit offers to businesses and high-intent users.",
        shortDescription: "Target high-intent users with $100 free credits.",
        applicationUrl: "https://business.quora.com/",
        slug: "quora-ads",
        category: "ad-credits",
        subcategory: "display-ads",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["New Quora Ads accounts", "Often invitation-based"],
        tags: ["Q&A", "Intent", "Search", "Knowledge"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://business.quora.com&size=128",
        steps: [
            { title: "Start Account", description: "Create a Quora for Business account." },
            { title: "Check Email", description: "Check if you received a promo code via email." },
            { title: "Apply Code", description: "Enter the code in the billing settings." }
        ]
    }
];

function updateDeals() {
    let deals = [];
    if (fs.existsSync(dealsPath)) {
        deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
    }

    let addedCount = 0;
    let updatedCount = 0;

    adDeals.forEach(newDeal => {
        const existingIndex = deals.findIndex(d => d.slug === newDeal.slug || d.title === newDeal.title);

        // Generate a consistent ID if not present
        const dealWithId = {
            ...newDeal,
            id: newDeal.slug,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (existingIndex !== -1) {
            // Update existing
            deals[existingIndex] = { ...deals[existingIndex], ...newDeal, updatedAt: new Date().toISOString() };
            updatedCount++;
        } else {
            // Add new
            deals.push(dealWithId);
            addedCount++;
        }
    });

    fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));

    // Also update processed path
    const processedDir = path.dirname(processedPath);
    if (!fs.existsSync(processedDir)) {
        fs.mkdirSync(processedDir, { recursive: true });
    }
    fs.writeFileSync(processedPath, JSON.stringify(deals, null, 2));

    console.log(`Successfully processed ad deals.`);
    console.log(`Added: ${addedCount}`);
    console.log(`Updated: ${updatedCount}`);
}

updateDeals();
