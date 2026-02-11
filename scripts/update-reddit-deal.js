const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Reddit Ads deal data
const redditDeal = {
  id: 'reddit-ads-500-credit',
  slug: 'reddit-ads-500-credit',
  title: 'Reddit Ads — Spend $500, Get $500 in Ad Credit',
  provider: 'Reddit Ads',
  category: 'marketing',
  subcategory: 'advertising',
  value: '$500 in bonus ad credit',
  enhancedValue: '$500',
  shortDescription: 'Matched-credit promotion: spend $500 on Reddit Ads and receive an additional $500 in ad credit, effectively doubling your first campaign budget.',
  description: `Reddit is offering new advertisers a matched-credit promotion: spend $500 on Reddit Ads and receive an additional $500 in ad credit, effectively doubling your first campaign budget. The offer is designed to help you test campaigns across 100k+ interest-based communities and see performance before committing larger budgets.`,
  detailedDescription: `Reddit is offering new advertisers a matched-credit promotion: spend $500 on Reddit Ads and receive an additional $500 in ad credit, effectively doubling your first campaign budget. The offer is designed to help you test campaigns across 100k+ interest-based communities and see performance before committing larger budgets.

What You Get:
• $500 in ad credit after you spend $500 on Reddit Ads within the required time frame
• Access to all standard Reddit ad formats via Reddit Ads Manager (promoted posts in feeds and conversations)
• Targeting options including interests, communities (subreddits), locations, devices, and retargeting
• Full reporting in the Ads dashboard to measure impressions, clicks, conversions, and ROAS

What Credits Cover:
• Media spend for future campaigns after the credit is unlocked
• Standard auction-based costs (CPM, CPC) across eligible Reddit inventory

What's NOT Included:
• Your initial $500 out-of-pocket spend (you must pay this to unlock the credit)
• Creative production, third-party tools, or agency fees
• Non-ad products or any spend outside Reddit Ads
• Existing advertiser accounts with prior spend history (one credit per account/business)

Best For:
• New brands and startups testing Reddit as a performance or awareness channel
• E-commerce, fintech, SaaS, gaming, education, and community-led products
• Products targeting niche or passion-based audiences

Not Ideal For:
• Businesses that have already spent on Reddit Ads (ineligible as "new advertisers")
• Brands without ready-to-run creative or landing pages (timelines are tight)
• Teams unable to commit at least $500 in initial budget within the promo period`,
  benefits: [
    '$500 bonus ad credit after $500 spend (one-time)',
    'Effectively doubles your first campaign budget',
    'Access to Reddit Ads Manager with all standard ad formats',
    'Promoted posts in feeds and conversations',
    'Interest-based targeting across 100k+ communities',
    'Subreddit (community) targeting',
    'Location and device targeting',
    'Retargeting capabilities',
    'Full reporting dashboard (impressions, clicks, conversions, ROAS)',
    'Reach niche, passion-based audiences'
  ],
  eligibility: [
    'New Reddit Ads advertiser (no previous ad spend on the account)',
    'One promo per business/ad account',
    'Must create and verify a Reddit Ads account with valid payment method',
    'Must claim promo credit within 30 days of creating the ad account',
    'Must spend $500 within 30 days of claiming the credit',
    'Once issued, $500 credit must be used within 30 days or it expires',
    'Subject to Reddit Ads policies and geographic availability'
  ],
  applicationProcess: [
    'Create a new Reddit Ads account at business.reddit.com',
    'Complete account setup (business info, time zone, billing)',
    'Add a valid payment method',
    'Within 30 days of account creation, claim your promo via Billing → Promotions or dashboard banner',
    'Launch one or more campaigns',
    'Spend at least $500 in billable ad spend within 30 days of claiming the offer',
    'After hitting the $500 threshold, $500 ad credit is automatically applied (typically within 24 hours)',
    'Use the unlocked $500 credit on additional campaigns within 30 days'
  ],
  faqs: [
    {
      question: 'How does the matched credit work?',
      answer: 'Spend $500 on Reddit Ads within 30 days of claiming the offer, and you\'ll receive an additional $500 in ad credit automatically applied to your account (typically within 24 hours of hitting the threshold).'
    },
    {
      question: 'Who is eligible for this offer?',
      answer: 'New Reddit Ads advertisers only — accounts with no previous ad spend. One promo per business/ad account.'
    },
    {
      question: 'What are the time limits?',
      answer: 'You must claim the promo within 30 days of creating your ad account, spend $500 within 30 days of claiming, and use the unlocked $500 credit within 30 days or it expires.'
    },
    {
      question: 'What can I use the credits for?',
      answer: 'The $500 credit covers media spend for future campaigns — standard auction-based costs (CPM, CPC) across eligible Reddit inventory.'
    },
    {
      question: 'What\'s NOT covered?',
      answer: 'Your initial $500 out-of-pocket spend (required to unlock the credit), creative production, third-party tools, agency fees, and non-ad products.'
    },
    {
      question: 'What targeting options are available?',
      answer: 'Reddit offers interest-based targeting, community (subreddit) targeting, location targeting, device targeting, and retargeting capabilities across 100k+ communities.'
    }
  ],
  tags: ['advertising', 'ad-credits', 'reddit', 'social-media', 'marketing', 'paid-ads', 'startups'],
  status: 'active',
  applicationUrl: 'https://business.reddit.com',
  logoUrl: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
  brandIcon: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $500',
  savingsAmount: 500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📢'
};

// Find existing Reddit deal(s) and remove them
const redditPatterns = ['reddit'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isReddit = redditPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isReddit) {
    console.log(`Removing existing Reddit deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isReddit;
});

// Add the new comprehensive Reddit deal
filteredDeals.push(redditDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Reddit Ads deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${redditDeal.title}`);
console.log(`- Value: ${redditDeal.value}`);
console.log(`- Application URL: ${redditDeal.applicationUrl}`);
console.log(`- Benefits: ${redditDeal.benefits.length} items`);
console.log(`- Eligibility: ${redditDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${redditDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${redditDeal.faqs.length} questions`);
