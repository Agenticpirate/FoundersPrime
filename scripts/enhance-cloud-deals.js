
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const allDeals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

// 1. New Deals to Add
const newDeals = [
    {
        title: "Alibaba Cloud Startup Program",
        provider: "Alibaba Cloud",
        value: "$100,000 Credits",
        savings: "$100,000",
        description: "Alibaba Cloud Startup Program provides up to $100,000 in cloud credits, 1-on-1 technical support, and China market entry assistance.",
        shortDescription: "Up to $100,000 in cloud credits and support for global startups.",
        applicationUrl: "https://www.alibabacloud.com/startup",
        slug: "alibaba-cloud-startup",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["Less than 10 years old", "Series A or earlier", "New customer"],
        tags: ["cloud", "asia", "infrastructure", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.alibabacloud.com&size=128"
    },
    {
        title: "Tencent Cloud Startup Program",
        provider: "Tencent Cloud",
        value: "$100,000 Credits",
        savings: "$100,000",
        description: "Tencent Cloud offers up to $100,000 in cloud vouchers, exclusive discounts, and technical support for startups.",
        shortDescription: "Up to $100,000 in cloud vouchers and resources for startups.",
        applicationUrl: "https://www.tencentcloud.com/startups",
        slug: "tencent-cloud-startup",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["Less than 5 years old", "Global startup"],
        tags: ["cloud", "gaming", "video", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.tencentcloud.com&size=128"
    },
    {
        title: "Heroku for Startups",
        provider: "Heroku",
        value: "$6,000 Credits",
        savings: "$6,000/yr",
        description: "Heroku for Startups offers platform credits (typically up to $500/month or more) to help you build and scale your app.",
        shortDescription: "Free platform credits for eligible startups to build on Heroku.",
        applicationUrl: "https://www.heroku.com/startups",
        slug: "heroku-for-startups",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["Series A or earlier", "Managed by approved partners"],
        tags: ["cloud", "paas", "developer", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.heroku.com&size=128"
    }
];

// 2. Fix Google Cloud URL (and others if needed)
let updatedCount = 0;
let addedCount = 0;

allDeals.forEach(deal => {
    if (deal.slug === 'google-for-startups-cloud') {
        deal.applicationUrl = "https://cloud.google.com/startup"; // Ensure this is clean
        console.log('Fixed Google Cloud URL');
        updatedCount++;
    }
});

// 3. Add New Deals
newDeals.forEach(newDeal => {
    const existingIndex = allDeals.findIndex(d => d.slug === newDeal.slug);
    if (existingIndex === -1) {
        allDeals.push({
            id: `deal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            ...newDeal,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            verified: true
        });
        addedCount++;
    }
});

fs.writeFileSync(dealsPath, JSON.stringify(allDeals, null, 2));
console.log(`Added ${addedCount} new deals.`);
console.log(`Updated ${updatedCount} deals.`);
