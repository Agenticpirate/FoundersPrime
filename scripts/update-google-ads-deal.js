const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Google Ads Startup Credits deal data
const googleAdsDeal = {
  id: 'google-ads-startup-credits',
  slug: 'google-ads-startup-credits',
  title: 'Google Ads Startup Credits — Up to $500 in Free Ad Credits',
  provider: 'Google Ads',
  category: 'ad-credits',
  subcategory: 'advertising',
  value: '$500-$1,000 in ad credits',
  enhancedValue: '$500',
  shortDescription: 'Up to $500 in free advertising credits for new advertisers. AI-powered Performance Max campaigns across Search, Display, YouTube, Shopping, and more.',
  description: `Google Ads offers new advertisers up to $500 in free advertising credits to launch their first paid campaigns. The platform provides AI-powered Performance Max campaigns that reach customers across Search, Display, YouTube, Shopping, and more—all from a single dashboard.`,
  detailedDescription: `Google Ads offers new advertisers up to $500 in free advertising credits to launch their first paid campaigns. The platform provides AI-powered Performance Max campaigns that reach customers across Search, Display, YouTube, Shopping, and more—all from a single dashboard.

What's Covered:
• Free ad credits after meeting minimum spend threshold
• Access to Performance Max AI automation
• Campaign optimization and tracking tools
• Expert support and consultation calls
• Full budget control and ROI tracking

What's NOT Covered:
• Existing Google Ads accounts (new accounts only)
• Previous coupon users or agencies
• Credits don't cover initial minimum spend requirement

Key Insights:
• Activate within 14 days of account creation to ensure offer validity
• Credits valid for 60 days once applied to your account
• One-time offer per advertiser—cannot be combined with other promotions
• Spending before activation doesn't count toward minimum threshold
• Use Performance Max campaigns for AI-powered optimization across all Google properties
• Schedule a free consultation call with Google Ads experts to maximize ROI`,
  benefits: [
    'Up to $500 in free advertising credits',
    'Access to Performance Max AI automation',
    'Campaign types: Search, Display, YouTube, Shopping',
    'Google\'s AI-powered budget optimization and targeting',
    'Full conversion tracking and audience insights',
    'Free consultation with Google Ads experts',
    'Complete Google Ads ecosystem access',
    'Full budget control and ROI tracking',
    'Campaign optimization tools',
    'Reach customers across all Google properties'
  ],
  eligibility: [
    'Brand new Google Ads account (no previous billing history)',
    'Verified billing information attached during signup',
    'Compliance with Google Ads policies',
    'Operating in eligible countries (US, EMEA, India, AUNZ, etc.)',
    'Meet minimum spend requirement within first 60 days',
    'Not an existing advertiser or account with previous promotions',
    'Not an agency managing client portfolios under single billing'
  ],
  applicationProcess: [
    'Open incognito window and visit the Google Ads offer page',
    'Click "Claim Now" and select your preferred offer (based on monthly budget)',
    'Create new Google account (never used for Google Ads before)',
    'Complete billing setup by attaching payment method',
    'Launch your first campaign (can pause immediately to avoid charges)',
    'Meet minimum spend threshold within 60 days to unlock credits',
    'Credits appear in 30-35 days after threshold is met in Billing → Promotions'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to $500 in free advertising credits, depending on the offer available in your region and your selected monthly budget tier.'
    },
    {
      question: 'Who is eligible for Google Ads credits?',
      answer: 'Brand new Google Ads accounts with no previous billing history, verified billing information, and compliance with Google Ads policies. Existing advertisers, previous coupon users, and agencies are not eligible.'
    },
    {
      question: 'How do I unlock the credits?',
      answer: 'Meet the minimum spend threshold within 60 days of account creation. Credits appear in 30-35 days after the threshold is met in Billing → Promotions.'
    },
    {
      question: 'How long are the credits valid?',
      answer: 'Credits are valid for 60 days once applied to your account. Activate within 14 days of account creation to ensure offer validity.'
    },
    {
      question: 'What campaign types are available?',
      answer: 'Search, Display, YouTube, Shopping, and Performance Max campaigns. Performance Max uses AI-powered optimization across all Google properties.'
    },
    {
      question: 'Can I get expert help?',
      answer: 'Yes! Schedule a free consultation call with Google Ads experts to maximize your ROI and campaign performance.'
    }
  ],
  tags: ['advertising', 'ad-credits', 'google-ads', 'ppc', 'search-ads', 'display-ads', 'youtube-ads', 'startups'],
  status: 'active',
  applicationUrl: 'https://ads.google.com/signup',
  logoUrl: 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png',
  brandIcon: 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $500',
  savingsAmount: 500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📢'
};

// Find existing Google Ads deal(s) and remove them (but keep Google Cloud deals)
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  // Only remove Google Ads deals, not Google Cloud deals
  const isGoogleAds = 
    slugLower.includes('google-ads') ||
    (titleLower.includes('google ads') && !titleLower.includes('cloud')) ||
    (providerLower === 'google ads');
  
  if (isGoogleAds) {
    console.log(`Removing existing Google Ads deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isGoogleAds;
});

// Add the new comprehensive Google Ads deal
filteredDeals.push(googleAdsDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Google Ads Startup Credits deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${googleAdsDeal.title}`);
console.log(`- Value: ${googleAdsDeal.value}`);
console.log(`- Application URL: ${googleAdsDeal.applicationUrl}`);
console.log(`- Benefits: ${googleAdsDeal.benefits.length} items`);
console.log(`- Eligibility: ${googleAdsDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${googleAdsDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${googleAdsDeal.faqs.length} questions`);
