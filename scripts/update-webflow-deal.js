const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Webflow for Startups deal data
const webflowDeal = {
  id: 'webflow-for-startups',
  slug: 'webflow-for-startups',
  title: 'Webflow for Startups — 100% Off CMS Plan for 12 Months',
  provider: 'Webflow',
  category: 'development',
  subcategory: 'web-development',
  value: 'Up to $348 in credits',
  enhancedValue: '$348',
  shortDescription: '100% off CMS Site Plan for 12 months — includes unlimited pages, CMS, CDN hosting, SSL, 250 forms/mo, 5 editor seats, and analytics.',
  description: `Webflow for Startups is a no-code website builder program designed for early-stage technical founders and product teams. The program provides a fully free CMS Site Plan for 12 months, eliminating hosting, SSL, CDN, and content management costs during your critical launch phase.

Over 500+ startups leverage Webflow to ship professional marketing sites, landing pages, and customer-facing products without requiring frontend engineers. The platform combines design freedom with developer-grade flexibility—perfect for founders balancing speed with customization.`,
  detailedDescription: `Webflow for Startups is a no-code website builder program designed for early-stage technical founders and product teams. The program provides a fully free CMS Site Plan for 12 months, eliminating hosting, SSL, CDN, and content management costs during your critical launch phase.

Over 500+ startups leverage Webflow to ship professional marketing sites, landing pages, and customer-facing products without requiring frontend engineers. The platform combines design freedom with developer-grade flexibility—perfect for founders balancing speed with customization.

What You Get — CMS Site Plan (100% Free for 12 Months):
• Normally $29/month ($348/year value)
• Unlimited static pages (host up to 5,000 published pages)
• CMS functionality with up to 50 dynamic content items
• SSL hosting on Webflow's global CDN with automatic scaling
• Up to 250 form submissions/month
• 90-day version history for easy rollbacks
• Advanced design tools (interactions, animations, responsive breakpoints)
• SEO controls and sitemap/robots.txt management
• CMS API access for headless/custom integration
• Up to 5 editor seats for team collaboration
• Custom domain connectivity (or use webflow.io subdomain)
• Basic analytics and performance monitoring

Additional Y Combinator Bonus (YC founders only):
• $100 credit toward premium Webflow template purchases

What Credits DON'T Cover:
• Premium templates (can use discount if YC-backed)
• Add-ons beyond CMS plan tier (Business/eCommerce upgrades, advanced analytics)
• Form submission overages (beyond 250/month)
• Premium third-party integrations (Zapier, Memberstack)
• Advanced hosting features (custom server configs, white-label)
• Design consultation or implementation services
• Domain registration or transfer fees`,
  benefits: [
    '100% off CMS Site Plan for 12 months ($348 value)',
    'Unlimited static pages (up to 5,000 published pages)',
    'CMS functionality with up to 50 dynamic content items',
    'SSL hosting on Webflow\'s global CDN with automatic scaling',
    'Up to 250 form submissions/month',
    '90-day version history for easy rollbacks',
    'Advanced design tools (interactions, animations, responsive breakpoints)',
    'SEO controls and sitemap/robots.txt management',
    'CMS API access for headless/custom integration',
    'Up to 5 editor seats for team collaboration',
    'Custom domain connectivity',
    'Basic analytics and performance monitoring',
    'YC founders: Additional $100 credit for premium templates'
  ],
  eligibility: [
    'Software-driven technical startup (not agency, consultancy, or portfolio)',
    'Raised less than $15M in total equity funding (Series A or earlier)',
    'Fewer than 50 employees',
    'New Webflow customer (no existing paid subscriptions)',
    'Associated with approved Startup Partner (YC, 500 Global, TechStars, etc.)',
    'Business email required (company domain, no Gmail/Hotmail)',
    'Proof of legitimacy (incorporation docs, business registration, or media coverage)'
  ],
  applicationProcess: [
    'Go to webflow.com/solutions/startups/startups-application or your startup partner portal',
    'Create a Webflow account using your company email address (or log in if you have a free account)',
    'Click "Apply for Startup Discount" and fill out the application form',
    'Provide company details: name, founding date, total equity raised, employee count, business description, your role',
    'Select your approved startup partner (Y Combinator, 500 Global, TechStars, or other)',
    'Upload proof of legitimacy: incorporation docs, business registration certificate, or link to media coverage',
    'Await approval email (typically 3–5 business days)',
    'Once approved, receive promo code or direct account link via email',
    'Apply promo code during billing setup — your CMS plan will show $0 for 12 months'
  ],
  faqs: [
    {
      question: 'Who is eligible for Webflow for Startups?',
      answer: 'Software-driven technical startups that have raised less than $15M in total equity funding, have fewer than 50 employees, are new Webflow customers, and are associated with an approved startup partner (YC, 500 Global, TechStars, etc.).'
    },
    {
      question: 'What\'s included in the CMS Site Plan?',
      answer: 'Unlimited static pages (up to 5,000), CMS with 50 dynamic items, SSL hosting on global CDN, 250 form submissions/month, 90-day version history, advanced design tools, SEO controls, CMS API access, 5 editor seats, custom domain connectivity, and basic analytics.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3-5 business days after submitting your application with all required documentation.'
    },
    {
      question: 'What happens after the 12 months?',
      answer: 'You can continue on the CMS plan at $23/month (annual billing, 22% discount) or $29/month. By month 11, decide whether to continue or migrate based on your traction.'
    },
    {
      question: 'When should I activate the credit?',
      answer: 'Activate when ready to go live, not during prototype phase. The 12-month clock starts at redemption. Build on the free Starter plan first, then redeem credit for CMS when your site is ready to publish.'
    },
    {
      question: 'What\'s NOT covered by the credits?',
      answer: 'Premium templates, Business/eCommerce upgrades, form submission overages beyond 250/month, premium third-party integrations, advanced hosting features, design consultation services, and domain registration fees.'
    },
    {
      question: 'Is this good for eCommerce?',
      answer: 'The CMS plan doesn\'t include eCommerce features. If you need a storefront with complex eCommerce needs, you\'ll need to upgrade (not covered by the credit).'
    }
  ],
  tags: ['web-design', 'hosting', 'no-code', 'website-builder', 'cms', 'startups', 'webflow'],
  status: 'active',
  applicationUrl: 'https://webflow.com/solutions/startups/startups-application',
  logoUrl: 'https://assets-global.website-files.com/5d3e265ac89f6a3e64292efc/5d5595354de4fbdd8c554dba_webflow-logo.svg',
  brandIcon: 'https://assets-global.website-files.com/5d3e265ac89f6a3e64292efc/5d5595354de4fbdd8c554dba_webflow-logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $348/year',
  savingsAmount: 348,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🎨'
};

// Find existing Webflow deal(s) and remove them
const webflowPatterns = ['webflow'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isWebflow = webflowPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isWebflow) {
    console.log(`Removing existing Webflow deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isWebflow;
});

// Add the new comprehensive Webflow deal
filteredDeals.push(webflowDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Webflow for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${webflowDeal.title}`);
console.log(`- Value: ${webflowDeal.value}`);
console.log(`- Application URL: ${webflowDeal.applicationUrl}`);
console.log(`- Benefits: ${webflowDeal.benefits.length} items`);
console.log(`- Eligibility: ${webflowDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${webflowDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${webflowDeal.faqs.length} questions`);
