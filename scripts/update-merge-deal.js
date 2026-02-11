const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Merge for Startups deal data
const mergeDeal = {
  id: 'merge-for-startups',
  slug: 'merge-for-startups',
  title: 'Merge for Startups — Custom Startup Pricing',
  provider: 'Merge',
  category: 'saas-discounts',
  subcategory: 'api-integration',
  value: 'Custom startup pricing (save $5,000-$10,000+)',
  enhancedValue: '$5,000+',
  shortDescription: 'Unified API platform for 200+ integrations across HRIS, ATS, CRM, Accounting, and more. Custom startup pricing significantly discounted from $650+/month standard rates.',
  description: `Merge provides a unified API platform that lets B2B SaaS companies offer, manage, and maintain dozens of product integrations without building them individually. Get custom startup pricing significantly discounted from standard rates.`,
  detailedDescription: `Merge provides a unified API platform that lets B2B SaaS companies offer, manage, and maintain dozens of product integrations without building them individually. Get custom startup pricing significantly discounted from standard rates.

What's Covered:
• Startup-tailored pricing (significantly reduced from $650+/month standard)
• Unified API Access: Single integration point for hundreds of third-party platforms
• Integration Categories: HRIS (50+), ATS (40+), CRM, Accounting, Ticketing, File Storage
• Free Tier Usage: 10,000 API requests/month included
• Integration Management: Automatic issue detection and resolution tools
• Merge Link: Pre-built UI for end users to connect their apps
• Developer Tools: SDKs in multiple languages, comprehensive documentation
• Real-time Analytics: Monitoring, alerting, and integration health dashboard
• AWS Credits Eligibility: Free AWS credits when completing proof of concept
• Go-to-Market Support: GTM guides, implementation support, and materials
• Sandbox Environment: Testing environment for integration development

What's NOT Covered:
• Consumer-facing apps without B2B integration needs
• Companies not requiring third-party API integrations
• Very low integration volume (<10,000 requests/month can use free tier)

Key Insights:
• Value Breakdown: Standard Launch plan costs $650/month. Startup pricing offers significant discounts—potentially saving $5,000-$10,000+ annually
• Integration Advantage: Merge covers 200+ integrations across 7 software categories. Build once instead of building individual integrations
• Pro Tip: Causal added 22 integrations across accounting, HR, and CRM in just 6 weeks using Merge
• Category Leadership: Merge leads in HRIS (50+ apps) and ATS (40+ apps) integrations
• Free Tier First: Start with free tier (10,000 API requests/month) to test before committing
• AWS Credits Bonus: Complete a proof of concept and become eligible for free AWS credits
• Sales Impact: 20% of software buyers list available integrations as a top purchasing criterion`,
  benefits: [
    'Startup-tailored pricing (significantly reduced from $650+/month standard)',
    'Unified API Access: Single integration point for 200+ platforms',
    'Integration Categories: HRIS (50+), ATS (40+), CRM, Accounting, Ticketing, File Storage',
    'Free Tier: 10,000 API requests/month included',
    'Automatic issue detection and resolution tools',
    'Merge Link: Pre-built UI for end users to connect their apps',
    'SDKs in multiple languages with comprehensive documentation',
    'Real-time monitoring, alerting, and integration health dashboard',
    'AWS Credits eligibility when completing proof of concept',
    'Go-to-market guides, implementation support, and materials',
    'Sandbox environment for integration development'
  ],
  eligibility: [
    'Early-stage startup (exact criteria determined during consultation)',
    'B2B SaaS focus (building product that needs customer-facing integrations)',
    'Active product development (live or near-launch product)',
    'Integration use case (clear need for third-party API integrations)',
    'New Merge customer (preferred but not always required)'
  ],
  applicationProcess: [
    'Visit https://www.merge.dev/merge-for-startups',
    'Create free Merge account at https://app.merge.dev/signup',
    'Explore the platform and documentation',
    'Click "Learn about our startup plans" or "Get a demo"',
    'Complete the form with company name, website, stage, funding status',
    'Specify integration needs (categories, use cases, expected API volume)',
    'Schedule consultation call with Merge team',
    'Discuss integration requirements and review startup pricing options',
    'Receive custom pricing proposal tailored to your needs',
    'Onboard and implement with sandbox environment and documentation'
  ],
  faqs: [
    {
      question: 'How much can I save with startup pricing?',
      answer: 'Standard Launch plan costs $650/month for 10 linked accounts. Startup pricing offers significant discounts—potentially saving $5,000-$10,000+ annually depending on your needs.'
    },
    {
      question: 'What integrations are available?',
      answer: '200+ integrations across 7 software categories: HRIS (50+), ATS (40+), CRM, Accounting, Ticketing, File Storage, and more. Build once to Merge\'s unified API.'
    },
    {
      question: 'Is there a free tier?',
      answer: 'Yes. Start with Merge\'s free tier (10,000 API requests/month, $0.01 per additional request) to test integrations before committing to startup pricing.'
    },
    {
      question: 'How fast can I add integrations?',
      answer: 'Causal added 22 integrations across accounting, HR, and CRM in just 6 weeks using Merge. Compare this to months or years building individually.'
    },
    {
      question: 'Are there additional benefits?',
      answer: 'Yes. Complete a proof of concept and become eligible for free AWS credits. Merge also provides GTM guides, implementation support, and materials.'
    },
    {
      question: 'Who maintains the integrations?',
      answer: 'Merge maintains all integrations, automatically detects issues, and provides resolution instructions. Your team focuses on product, not integration troubleshooting.'
    }
  ],
  tags: ['api', 'integration', 'unified-api', 'hris', 'ats', 'crm', 'accounting', 'developer-tools', 'b2b', 'startups', 'merge'],
  status: 'active',
  applicationUrl: 'https://www.merge.dev/merge-for-startups',
  logoUrl: 'https://www.merge.dev/favicon.ico',
  brandIcon: 'https://www.merge.dev/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $5,000-$10,000+',
  savingsAmount: 5000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🔗'
};

// Find existing Merge deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  // Be careful to only match "Merge" the API company
  const isMerge = 
    slugLower === 'merge-for-startups' ||
    slugLower.includes('merge-api') ||
    (providerLower === 'merge' && (titleLower.includes('api') || titleLower.includes('integration') || titleLower.includes('startup')));
  
  if (isMerge) {
    console.log(`Removing existing Merge deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMerge;
});

// Add the new comprehensive Merge deal
filteredDeals.push(mergeDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Merge for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${mergeDeal.title}`);
console.log(`- Value: ${mergeDeal.value}`);
console.log(`- Application URL: ${mergeDeal.applicationUrl}`);
console.log(`- Benefits: ${mergeDeal.benefits.length} items`);
console.log(`- Eligibility: ${mergeDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${mergeDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${mergeDeal.faqs.length} questions`);
