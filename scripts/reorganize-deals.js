
const fs = require('fs');
const path = require('path');

const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));

let counts = {
    'cloud-credits': 0,
    'ad-credits': 0,
    'saas-discounts': 0,
    'grants': 0,
    'startup-programs': 0,
    'other': 0
};

deals.forEach(deal => {
    const title = deal.title.toLowerCase();
    const provider = deal.provider.toLowerCase();
    const tags = (deal.tags || []).map(t => t.toLowerCase());
    const desc = (deal.description + ' ' + deal.shortDescription).toLowerCase();

    // Reset category
    deal.category = 'saas-discounts'; // Default
    deal.subcategory = 'productivity';

    // 1. Cloud Credits
    if (
        tags.includes('cloud') ||
        tags.includes('hosting') ||
        provider.includes('aws') ||
        provider.includes('google cloud') ||
        provider.includes('azure') ||
        provider.includes('digitalocean') ||
        provider.includes('vultr') ||
        provider.includes('hetzner') ||
        provider.includes('linode') ||
        provider.includes('oracle') ||
        provider.includes('ovh') ||
        provider.includes('scaleway') ||
        title.includes('cloud credits') ||
        desc.includes('cloud credits')
    ) {
        deal.category = 'cloud-credits';
        deal.subcategory = 'cloud-computing';
        counts['cloud-credits']++;
    }
    // 2. Ad Credits
    else if (
        title.includes('ad credit') ||
        title.includes('ads credit') ||
        provider.includes('ads') ||
        tags.includes('advertising') ||
        provider.includes('tiktok') ||
        provider.includes('linkedin') ||
        (provider.includes('google') && title.includes('ad'))
    ) {
        deal.category = 'ad-credits';
        // Guess subcategory
        if (provider.includes('social') || provider.includes('tiktok') || provider.includes('linkedin') || provider.includes('facebook') || provider.includes('meta')) {
            deal.subcategory = 'social-ads';
        } else if (provider.includes('google') || provider.includes('bing')) {
            deal.subcategory = 'search-ads';
        } else {
            deal.subcategory = 'display-ads';
        }
        counts['ad-credits']++;
    }
    // 3. Grants
    else if (
        tags.includes('grant') ||
        title.includes('grant') ||
        desc.includes('cash grant') ||
        desc.includes('equity-free')
    ) {
        deal.category = 'grants';
        deal.subcategory = undefined;
        counts['grants']++;
    }
    // 4. Startup Programs (Accelerators/Incubators)
    else if (
        tags.includes('accelerator') ||
        tags.includes('incubator') ||
        title.includes('accelerator') ||
        title.includes('incubator') ||
        provider.includes('y combinator') ||
        provider.includes('techstars')
    ) {
        deal.category = 'startup-programs';
        deal.subcategory = title.includes('incubator') ? 'incubators' : 'accelerators';
        counts['startup-programs']++;
    }
    // 5. SaaS Discounts (Everything else basically)
    else {
        deal.category = 'saas-discounts';

        // Refine subcategory
        if (tags.includes('ai') || title.includes('ai ')) {
            deal.subcategory = 'ai-tools';
        } else if (tags.includes('crm') || tags.includes('sales')) {
            deal.subcategory = 'sales-crm';
        } else if (tags.includes('marketing') || tags.includes('seo') || tags.includes('email')) {
            deal.subcategory = 'marketing-tools';
        } else if (tags.includes('dev') || tags.includes('developer') || tags.includes('api')) {
            deal.subcategory = 'dev-tools';
        } else if (tags.includes('design')) {
            deal.subcategory = 'design-tools';
        } else if (tags.includes('finance') || tags.includes('accounting') || tags.includes('legal')) {
            deal.subcategory = 'finance-legal';
        } else if (tags.includes('hr') || tags.includes('recruiting')) {
            deal.subcategory = 'hr-ops';
        } else {
            deal.subcategory = 'productivity';
        }
        counts['saas-discounts']++;
    }
});

console.log('Categorization Results:', counts);

fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
console.log('Updated all-deals.json');
