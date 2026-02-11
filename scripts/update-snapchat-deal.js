const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Snapchat Ads deal data
const snapchatDeal = {
  id: 'snapchat-ads-matched-credit',
  slug: 'snapchat-ads-matched-credit',
  title: 'Snapchat Ads — Spend $350, Get $375 Free Ad Credit',
  provider: 'Snapchat',
  category: 'marketing',
  subcategory: 'advertising',
  value: 'Up to $375 in ad credits',
  enhancedValue: '$375',
  shortDescription: 'Matched-credit promotion: spend $350 and get $375 in ad credit, or spend $50 and get $75. Reach 400M+ daily active users including audiences not on TikTok.',
  description: `Snapchat Ads offers new advertisers a matched-credit promotion with two tiers: spend $350 and get $375 in ad credit, or spend $50 and get $75 in ad credit. This helps new businesses test Snapchat's advertising platform and reach 400M+ daily active users, including an audience that's 40% not on TikTok daily.`,
  detailedDescription: `Snapchat Ads offers new advertisers a matched-credit promotion with two tiers: spend $350 and get $375 in ad credit, or spend $50 and get $75 in ad credit. This helps new businesses test Snapchat's advertising platform and reach 400M+ daily active users, including an audience that's 40% not on TikTok daily.

What You Get:
• Tier 1: Spend $350 → Get $375 credit (107% match)
• Tier 2: Spend $50 → Get $75 credit
• Full access to Snapchat Ads Manager
• All ad formats: Snap Ads, Story Ads, Collection Ads, AR Lenses
• Advanced targeting by demographics, interests, behaviors, locations
• Conversion tracking and analytics
• 30-day window to complete initial spend
• Credit applied within 1 business day after threshold reached

What Credits Cover:
• Future Snapchat ad spend (CPM, CPC, CPV bidding)
• All advertising objectives: awareness, consideration, conversions
• Retargeting and custom audiences
• AR and video ad campaigns

What's NOT Covered:
• Your initial $350 or $50 out-of-pocket spend
• Creative production or third-party tools
• Spend beyond the matched credit amount

Audience Insights:
• 400M+ daily active users globally
• 40% of Snapchatters not on TikTok daily (unique audience)
• Nearly 1 in 4 Snapchatters over 35 years old (purchasing power)
• 88% "love to shop," 82% likely to spend money online`,
  benefits: [
    'Tier 1: Spend $350 → Get $375 credit (107% match)',
    'Tier 2: Spend $50 → Get $75 credit',
    'Access to 400M+ daily active users',
    '40% of Snapchatters not on TikTok daily (unique audience)',
    'Full Snapchat Ads Manager access',
    'All ad formats: Snap Ads, Story Ads, Collection Ads, AR Lenses',
    'Advanced targeting by demographics, interests, behaviors',
    'Conversion tracking and analytics',
    'Retargeting and custom audiences',
    'Credit applied within 1 business day after threshold',
    'Lower CPC than Facebook/Instagram for Gen Z audiences'
  ],
  eligibility: [
    'New Snapchat advertiser (must not have previously run paid ads)',
    'Valid payment method (credit card or PayPal required)',
    '30-day spend window (must spend $350 or $50 within 30 days of account creation)',
    'One offer per account (cannot stack with other promotions)'
  ],
  applicationProcess: [
    'Sign up via the partner link',
    'Create your Snapchat Ads account using your business email',
    'Set up your payment method (credit card or PayPal)',
    'Create and launch your first ad campaign',
    'Spend $350 (or $50 for lower tier) within 30 days of signup',
    'Matched credit ($375 or $75) applied within 1 business day after reaching threshold',
    'Use the credit to continue running campaigns'
  ],
  faqs: [
    {
      question: 'How does the matched credit work?',
      answer: 'Two tiers: Spend $350 and get $375 in ad credit (107% match), or spend $50 and get $75 in ad credit. Credit is applied within 1 business day after reaching the spend threshold.'
    },
    {
      question: 'Who is eligible for this offer?',
      answer: 'New Snapchat advertisers who have never run paid ads on Snapchat before. One offer per account, cannot stack with other promotions.'
    },
    {
      question: 'How long do I have to spend the initial amount?',
      answer: 'You have 30 days from account creation to spend $350 (or $50 for the lower tier) to unlock the matched credit.'
    },
    {
      question: 'What audience can I reach on Snapchat?',
      answer: '400M+ daily active users globally. 40% of Snapchatters are not on TikTok daily, giving you access to a unique audience. 88% love to shop and 82% are likely to spend money online.'
    },
    {
      question: 'What ad formats are available?',
      answer: 'Snap Ads, Story Ads, Collection Ads, and AR Lenses. All formats support advanced targeting by demographics, interests, behaviors, and locations.'
    },
    {
      question: 'What\'s the typical cost on Snapchat?',
      answer: 'Snapchat CPM typically ranges $2.95–$5 depending on targeting. With $375 credit, expect 75,000–125,000 impressions. Generally lower CPC than Facebook/Instagram for Gen Z audiences.'
    }
  ],
  tags: ['advertising', 'ad-credits', 'snapchat', 'social-media', 'marketing', 'paid-ads', 'gen-z', 'startups'],
  status: 'active',
  applicationUrl: 'https://try.snap-partner.com/m6d6ldq77m4i',
  logoUrl: 'https://www.snap.com/favicon.ico',
  brandIcon: 'https://www.snap.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $375',
  savingsAmount: 375,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '👻'
};

// Find existing Snapchat deal(s) and remove them
const snapchatPatterns = ['snapchat', 'snap '];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isSnapchat = snapchatPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isSnapchat) {
    console.log(`Removing existing Snapchat deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isSnapchat;
});

// Add the new comprehensive Snapchat deal
filteredDeals.push(snapchatDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Snapchat Ads deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${snapchatDeal.title}`);
console.log(`- Value: ${snapchatDeal.value}`);
console.log(`- Application URL: ${snapchatDeal.applicationUrl}`);
console.log(`- Benefits: ${snapchatDeal.benefits.length} items`);
console.log(`- Eligibility: ${snapchatDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${snapchatDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${snapchatDeal.faqs.length} questions`);
