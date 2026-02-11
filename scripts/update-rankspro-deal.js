const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// RanksPro.io deal data
const ranksproDeal = {
  id: 'rankspro-50-off',
  slug: 'rankspro-50-off',
  title: 'RanksPro.io — 50% Off for 6 Months',
  provider: 'RanksPro.io',
  category: 'saas-discounts',
  subcategory: 'seo',
  value: '50% off for 6 months',
  enhancedValue: '$297',
  shortDescription: '50% off all paid plans for 6 months using promo code SECRET50AP. All-in-one SEO toolkit for rank tracking, keyword research, competitor analysis, site audits, and backlink analysis.',
  description: `RanksPro.io offers 50% off all paid plans for 6 months using promo code SECRET50AP. All-in-one SEO toolkit for rank tracking, keyword research, competitor analysis, site audits, and backlink analysis.`,
  detailedDescription: `RanksPro.io offers 50% off all paid plans for 6 months using promo code SECRET50AP. All-in-one SEO toolkit for rank tracking, keyword research, competitor analysis, site audits, and backlink analysis.

Deal Value Calculation:
• Solo: $10/mo → $5/mo (Save $30 over 6 months)
• Pro: $29/mo → $14.50/mo (Save $87 over 6 months)
• Elite: $59/mo → $29.50/mo (Save $177 over 6 months)
• Ultimate: $119/mo → $59.50/mo (Save $357 over 6 months)

What's Included:

Rank Tracking:
• Daily rank updates (Pro+)
• Track rankings across 150+ countries
• Mobile & desktop tracking
• Ranking history
• Daily email notifications

AI Overview Tracker (NEW):
• Track AI Overview appearances
• 50-200 keywords (by plan)
• Monitor Google AI features

Keyword Research:
• 40-600 keyword searches/month
• Search volume & competition data
• Search intent analysis

Competitor Analysis:
• Track 2-15 competitors per domain
• Competitor ranking insights
• Competitive strategy research

Site Audit:
• 1,000-15,000 pages crawl/month
• Technical SEO issues detection
• On-page SEO recommendations

Backlink Analysis:
• 5K-150K backlink rows
• Backlink profile analysis
• Link-building opportunities

AI Content Writer:
• 0-30 AI blog write-ups/month
• SEO-optimized content generation

White Label (Elite+):
• White label reports
• White label platform
• Custom branding

Best For: SEO professionals, agencies, bloggers, freelancers, and businesses tracking keyword rankings and optimizing search performance.

Not Ideal For: Teams needing enterprise-level features or those primarily focused on content marketing without SEO.

Trusted by: Nike, Shopify, WeWork, Casio, Snov.io, Kommo, and 10K+ professionals`,
  benefits: [
    '50% off all paid plans for 6 months',
    'Promo code: SECRET50AP',
    '7-day free trial included',
    'Daily rank tracking across 150+ countries',
    'AI Overview Tracker for Google AI features',
    '40-600 keyword searches/month',
    'Track 2-15 competitors per domain',
    'Site audit: 1,000-15,000 pages crawl/month',
    'Backlink analysis: 5K-150K rows',
    'AI blog write-ups (Pro+)',
    'White label reports & platform (Elite+)'
  ],
  eligibility: [
    'New users who haven\'t signed up for RanksPro.io',
    'OR existing users on the free version',
    'Must use promo code SECRET50AP at checkout'
  ],
  applicationProcess: [
    'Go to rankspro.io and click "Sign Up for Free"',
    'Create your account',
    'Start 7-day free trial',
    'Choose your plan (Solo, Pro, Elite, or Ultimate)',
    'At checkout, enter promo code: SECRET50AP',
    '50% discount applies for 6 months'
  ],
  faqs: [
    {
      question: 'How do I use the promo code?',
      answer: 'Sign up at rankspro.io, start your 7-day free trial, then enter SECRET50AP at checkout when upgrading to a paid plan.'
    },
    {
      question: 'Can existing paid users use this deal?',
      answer: 'No. This deal is for new users or those currently on the free version only.'
    },
    {
      question: 'How long does the 50% discount last?',
      answer: 'The discount applies for 6 months. After that, regular pricing applies.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes. RanksPro.io offers a 7-day free trial before you commit to any paid plan.'
    },
    {
      question: 'What\'s the difference between Pro and Elite?',
      answer: 'Elite adds: Google Map tracking, AI Overview tracker (100 KW), white label reports/platform, 5 users (vs 2), and significantly more keywords, pages, and backlink analysis.'
    },
    {
      question: 'Is there a free plan?',
      answer: 'Yes. RanksPro.io has a permanent free plan with limited features to get started.'
    }
  ],
  promoCode: 'SECRET50AP',
  tags: ['seo', 'rank-tracking', 'keyword-research', 'competitor-analysis', 'site-audit', 'backlink-analysis', 'ai-seo', 'white-label'],
  status: 'active',
  applicationUrl: 'https://app.rankspro.io/register',
  logoUrl: 'https://framerusercontent.com/images/enTLjKkTFsBthd5rReD6Z1iuVfE.png',
  brandIcon: 'https://www.rankspro.io/favicon.ico',
  featured: false,
  verified: true,
  recommended: true,
  savings: 'Save up to $297',
  savingsAmount: 297,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📈'
};

// Find existing RanksPro deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isRanksPro = 
    slugLower.includes('rankspro') ||
    titleLower.includes('rankspro') ||
    providerLower === 'rankspro.io' ||
    providerLower === 'rankspro';
  
  if (isRanksPro) {
    console.log(`Removing existing RanksPro deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isRanksPro;
});

// Add the new comprehensive RanksPro deal
filteredDeals.push(ranksproDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ RanksPro.io deal added successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${ranksproDeal.title}`);
console.log(`- Value: ${ranksproDeal.value}`);
console.log(`- Promo Code: ${ranksproDeal.promoCode}`);
console.log(`- Application URL: ${ranksproDeal.applicationUrl}`);
console.log(`- Benefits: ${ranksproDeal.benefits.length} items`);
console.log(`- Eligibility: ${ranksproDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${ranksproDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${ranksproDeal.faqs.length} questions`);
