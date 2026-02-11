
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const allDeals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

const newCloudDeals = [
    {
        title: "DigitalOcean Hatch",
        provider: "DigitalOcean",
        value: "$100,000 Credits",
        savings: "$100,000",
        description: "DigitalOcean Hatch is a global startup program that helps you grow your business. Get up to $100,000 in infrastructure credits, priority support, and access to the Hatch community.",
        shortDescription: "Get up to $100,000 in cloud credits for 12 months. Ideal for startups scaling their infrastructure.",
        applicationUrl: "https://www.digitalocean.com/hatch",
        slug: "digitalocean-hatch",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: true,
        recommended: true,
        eligibility: ["Series A or earlier", "New DigitalOcean customer", "Less than $10M revenue"],
        tags: ["cloud", "hosting", "infrastructure", "credits", "startups"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.digitalocean.com&size=128"
    },
    {
        title: "Vultr for Startups",
        provider: "Vultr",
        value: "$100,000 Credits",
        savings: "$100,000",
        description: "Vultr for Startups provides eligible startups with up to $100,000 in cloud credits and 35% off long-term. Access high-performance cloud compute and bare metal worldwide.",
        shortDescription: "Up to $100,000 in free cloud credits and significant discounts for funded startups.",
        applicationUrl: "https://www.vultr.com/startups/",
        slug: "vultr-for-startups",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: true,
        recommended: false,
        eligibility: ["Bootstrapped or funded", "New Vultr customer", "Technology-focused"],
        tags: ["cloud", "vps", "infrastructure", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.vultr.com&size=128"
    },
    {
        title: "Oracle for Startups",
        provider: "Oracle Cloud",
        value: "70% Off + Credits",
        savings: "$100,000+",
        description: "Oracle for Startups offers free cloud credits and a 70% discount on Oracle Cloud Infrastructure (OCI) from day one. Scale with enterprise-grade cloud services.",
        shortDescription: "Free cloud credits and 70% discount on OCI for two years.",
        applicationUrl: "https://www.oracle.com/startups/",
        slug: "oracle-for-startups",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: true,
        eligibility: ["Tech-based startup", "Founded within last 5 years", "New Oracle Cloud customer"],
        tags: ["cloud", "enterprise", "database", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.oracle.com&size=128"
    },
    {
        title: "IBM for Startups",
        provider: "IBM Cloud",
        value: "$120,000 Credits",
        savings: "$120,000",
        description: "Startup with IBM offers up to $120,000 in IBM Cloud credits to help you build and scale your solution. Access Watson AI, Blockchain, and more.",
        shortDescription: "Up to $12,000 to $120,000 in IBM Cloud credits for eligible startups.",
        applicationUrl: "https://developer.ibm.com/startups/",
        slug: "ibm-for-startups",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["Less than $1M revenue", "Under 5 years old", "No prior IBM credits"],
        tags: ["cloud", "ai", "blockchain", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.ibm.com&size=128"
    },
    {
        title: "AWS Activate",
        provider: "AWS",
        value: "$100,000 Credits",
        savings: "$100,000",
        description: "AWS Activate provides startups with the resources they need to get started on AWS, including up to $100,000 in credits, training, and support.",
        shortDescription: "Up to $100,000 in AWS credits for bootstrapped and funded startups.",
        applicationUrl: "https://aws.amazon.com/activate/",
        slug: "aws-activate",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: true,
        recommended: true,
        eligibility: ["Self-funded or funded", "Unassociated or Portfolio", "New to Activate"],
        tags: ["cloud", "serverless", "infrastructure", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://aws.amazon.com&size=128"
    },
    {
        title: "Google for Startups Cloud Program",
        provider: "Google Cloud",
        value: "$350,000 Credits",
        savings: "$350,000",
        description: "The Google for Startups Cloud Program covers your cloud costs up to $350,000 for your first 2 years (for AI startups) or up to $200,000 for other startups. Access Google Cloud and Firebase.",
        shortDescription: "Up to $350,000 in Google Cloud and Firebase credits for eligible startups.",
        applicationUrl: "https://cloud.google.com/startup",
        slug: "google-for-startups-cloud",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: true,
        recommended: true,
        eligibility: ["Founded within 10 years", "Equity funded", "B2B or B2C"],
        tags: ["cloud", "ai", "firebase", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cloud.google.com&size=128"
    },
    {
        title: "Microsoft for Startups Founders Hub",
        provider: "Microsoft Azure",
        value: "$150,000 Credits",
        savings: "$150,000",
        description: "Build your startup with the Microsoft Cloud. Get up to $150,000 in Azure credits, free access to GitHub Enterprise, LinkedIn Premium, and OpenAI APIs.",
        shortDescription: "Up to $150,000 in Azure credits + OpenAI access.",
        applicationUrl: "https://foundershub.startups.microsoft.com/",
        slug: "microsoft-founders-hub",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: true,
        recommended: true,
        eligibility: ["Software-based product", "Private", "Less than 7 years old"],
        tags: ["cloud", "azure", "openai", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://azure.microsoft.com&size=128"
    },
    {
        title: "Scaleway Startup Program",
        provider: "Scaleway",
        value: "€36,000 Credits",
        savings: "€36,000",
        description: "Scaleway's startup program offers up to €36,000 in cloud credits, technical reviews, and visibility. Build on a complete cloud ecosystem.",
        shortDescription: "Up to €36,000 in cloud credits for European startups.",
        applicationUrl: "https://www.scaleway.com/en/startup-program/",
        slug: "scaleway-startup-program",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["Monthly usage < €200 prior", "External validation/funding"],
        tags: ["cloud", "eu", "infrastructure", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.scaleway.com&size=128"
    },
    {
        title: "Linode Rise",
        provider: "Linode (Akamai)",
        value: "$120,000 Credits",
        savings: "$120,000",
        description: "The Linode Rise program (now part of Akamai) helps startups bootstrap their infrastructure with up to $120,000 in infrastructure credits.",
        shortDescription: "Up to $120,000 in infrastructure credits for qualified startups.",
        applicationUrl: "https://www.linode.com/content/rise-startup-program/",
        slug: "linode-rise",
        category: "cloud-credits",
        subcategory: "cloud-computing",
        status: "active",
        featured: false,
        recommended: false,
        eligibility: ["Less than 5 years old", "Less than $5M funding"],
        tags: ["cloud", "linux", "infrastructure", "credits"],
        logoUrl: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.linode.com&size=128"
    }
];

let addedCount = 0;
let updatedCount = 0;

newCloudDeals.forEach(newDeal => {
    // Check if exists by slug or provider fuzzy match
    const existingIndex = allDeals.findIndex(d =>
        d.slug === newDeal.slug ||
        (d.provider && d.provider.toLowerCase().includes(newDeal.provider.toLowerCase()))
    );

    if (existingIndex >= 0) {
        // Update existing
        allDeals[existingIndex] = { ...allDeals[existingIndex], ...newDeal, updatedAt: new Date().toISOString() };
        updatedCount++;
    } else {
        // Add new
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
console.log(`Added ${addedCount} new cloud deals.`);
console.log(`Updated ${updatedCount} existing cloud deals.`);
