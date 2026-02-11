const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Flippa Premium deal data
const flippaDeal = {
  id: 'flippa-premium',
  slug: 'flippa-premium',
  title: 'Flippa Premium — $294 Free (6 Months)',
  provider: 'Flippa',
  category: 'saas-discounts',
  subcategory: 'marketplace',
  value: '$294 (6 months free)',
  enhancedValue: '$294',
  shortDescription: '6 months free Flippa Premium subscription ($294 value). Get 21-day early access to exclusive listings, $0 transaction fees, unlimited SEMrush reports, and Premium Buyer badge.',
  description: `Flippa Premium offers 6 months free subscription (worth $294) providing exclusive early access to online business listings, in-depth data insights, and premium buyer services. Flippa is the world's leading marketplace for buying and selling websites, apps, SaaS businesses, and domains.`,
  detailedDescription: `Flippa Premium offers 6 months free subscription (worth $294) providing exclusive early access to online business listings, in-depth data insights, and premium buyer services. Flippa is the world's leading marketplace for buying and selling websites, apps, SaaS businesses, and domains.

What's Covered:
• 21-day early access to exclusive listings (valued $10K+)
• $0 FlippaPay transaction fees (save thousands)
• Unlimited SEMrush traffic & SEO reports
• Integrated data from Stripe, Shopify, Amazon, QuickBooks, Xero
• Instant confidential listing access (skip NDA queue)
• Premium Buyer badge for preferential treatment
• Pricing comparisons & sales benchmarking data
• Comprehensive performance analytics

What's NOT Covered:
• Escrow fees (discounted for premium members)
• Actual business purchase costs
• Third-party due diligence services
• Legal consultation fees

Key Insights:
• 21-day advantage: Access to deals before 150+ average buyers see them—massive competitive edge
• Zero transaction fees: Save thousands on FlippaPay transactions (normally 2.5-5% fees)
• $294 total savings: 6 months × $49/month completely free with this offer
• Unlimited SEMrush: Normally expensive traffic analysis tools included at no cost
• Verified data access: Real-time performance metrics from Stripe, Shopify, Amazon reduce due diligence risk
• Premium Buyer badge: Sellers prioritize premium buyers in negotiations
• Cancel anytime: No risk—cancel before 6 months to avoid any charges
• Thousands of deals: Average 150 buyers per asset means early access is critical advantage`,
  benefits: [
    '6 months free subscription ($294 total value, normally $49/month)',
    '21-day early access to new listings over $10,000',
    '$0 FlippaPay fees on eligible transactions',
    'Unlimited SEMrush traffic analysis & keyword reports',
    'Performance data from Stripe, Shopify, Amazon, QuickBooks, Xero',
    'Pricing comps, AOV, refund rates, LTV, churn metrics benchmarking',
    'Instant confidential listing access (NDA fast-track)',
    'Premium Buyer badge status',
    'Cancel anytime, no long-term commitment'
  ],
  eligibility: [
    'Active buyer looking to purchase online businesses',
    'Open to all (new and existing Flippa users)',
    'No minimum purchase requirement',
    'Available globally where Flippa operates'
  ],
  applicationProcess: [
    'Click the claim button on the Flippa Premium offer page',
    'Create or log in to your Flippa account',
    'Subscribe to Premium (no payment required for first 6 months)',
    'Start browsing exclusive listings with 21-day early access',
    'Access premium data via integrated platforms (Stripe, Shopify, SEMrush)',
    'Get notified via email and text when new deals launch',
    'Enjoy $0 transaction fees on FlippaPay purchases',
    'Cancel anytime before 6 months ends to avoid charges'
  ],
  faqs: [
    {
      question: 'How much is the deal worth?',
      answer: '$294 total value (6 months × $49/month) completely free. Plus save thousands on FlippaPay transaction fees (normally 2.5-5%).'
    },
    {
      question: 'Who is eligible for Flippa Premium?',
      answer: 'Open to all buyers—new and existing Flippa users. No minimum purchase requirement. Available globally where Flippa operates.'
    },
    {
      question: 'What is the 21-day early access?',
      answer: 'Premium members get access to new listings valued at $10K+ a full 21 days before the average 150+ buyers see them—a massive competitive advantage.'
    },
    {
      question: 'What data integrations are included?',
      answer: 'Real-time performance metrics from Stripe, Shopify, Amazon, QuickBooks, and Xero, plus unlimited SEMrush traffic and SEO reports.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes. Cancel anytime before 6 months ends to avoid any charges. No long-term commitment required.'
    },
    {
      question: 'What is the Premium Buyer badge?',
      answer: 'A status indicator that helps you stand out. Sellers prioritize premium buyers in negotiations and communications.'
    }
  ],
  tags: ['marketplace', 'business-acquisition', 'saas', 'ecommerce', 'domains', 'investing', 'flippa'],
  status: 'active',
  applicationUrl: 'https://flippa.com/premium?direct=Secret3',
  logoUrl: 'https://flippa.com/favicon.ico',
  brandIcon: 'https://flippa.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $294',
  savingsAmount: 294,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🛒'
};

// Find existing Flippa deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isFlippa = 
    slugLower.includes('flippa') ||
    titleLower.includes('flippa') ||
    providerLower === 'flippa';
  
  if (isFlippa) {
    console.log(`Removing existing Flippa deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isFlippa;
});

// Add the new comprehensive Flippa deal
filteredDeals.push(flippaDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Flippa Premium deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${flippaDeal.title}`);
console.log(`- Value: ${flippaDeal.value}`);
console.log(`- Application URL: ${flippaDeal.applicationUrl}`);
console.log(`- Benefits: ${flippaDeal.benefits.length} items`);
console.log(`- Eligibility: ${flippaDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${flippaDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${flippaDeal.faqs.length} questions`);
