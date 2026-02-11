const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// TikTok for Business TTAM Partners deal data
const tiktokDeal = {
  id: 'tiktok-for-business-ttam',
  slug: 'tiktok-for-business-ttam',
  title: 'TikTok for Business TTAM Partners — Up to $6,000 in Ad Credits',
  provider: 'TikTok for Business',
  category: 'marketing',
  subcategory: 'advertising',
  value: 'Up to $6,000 in ad credits',
  enhancedValue: '$6,000',
  shortDescription: '1:1 spend-match program offering up to $6,000 in ad credits. Spend $200 to get $200, up to spend $6,000 to get $6,000 — valid within 30 days of registration.',
  description: `TikTok for Business (TTAM Partners) is a limited-time incentive program offering new advertisers up to $6,000 in ad credits through a 1:1 spend-match model. The program leverages TikTok's five-tier coupon structure—spend $200 to get $200, up to spend $6,000 to get $6,000—effective within 30 days of registration.

This is one of TikTok's most generous offers for startups and businesses testing paid video advertising. The platform has over 1.5 billion active users globally, with particularly strong reach to Gen Z and younger Millennials.`,
  detailedDescription: `TikTok for Business (TTAM Partners) is a limited-time incentive program offering new advertisers up to $6,000 in ad credits through a 1:1 spend-match model. The program leverages TikTok's five-tier coupon structure—spend $200 to get $200, up to spend $6,000 to get $6,000—effective within 30 days of registration.

This is one of TikTok's most generous offers for startups and businesses testing paid video advertising. The platform has over 1.5 billion active users globally, with particularly strong reach to Gen Z and younger Millennials.

Five-Tier Spend & Earn Structure:
• Spend $200 → Get $200 in ad credits
• Spend $500 → Get $500 in ad credits
• Spend $1,000 → Get $1,000 in ad credits
• Spend $4,000 → Get $4,000 in ad credits
• Spend $6,000 → Get $6,000 in ad credits (bonus: credited immediately upon hitting threshold)

Full Access to TikTok Ads Manager:
• Create and manage unlimited campaigns
• Access to all ad formats: In-Feed Ads, Spark Ads, Branded Hashtag Challenges, TopView, Lead Generation
• Real-time analytics and performance tracking
• Audience targeting by age, interests, behavior, device, location
• Conversion tracking and pixel integration
• A/B testing capabilities
• Smart+ optimization (AI-powered bidding)

What Credits Cover:
• 100% of TikTok Ads spend (CPM, CPC, oCPM, CPV bidding models)
• All advertising objectives: Sales, App Installs, Traffic, Lead Generation, Brand Awareness
• Video content campaigns across all TikTok surfaces
• Retargeting and lookalike audiences
• Lead generation forms and data capture
• E-commerce product ads (catalog integration)
• Pixel tracking and conversion attribution

What Credits DON'T Cover:
• Third-party creative production (shooting/editing services)
• TikTok Creator Marketplace partnerships (influencer fees are separate)
• Shopify integration fees (if applicable)
• Tax or payment processing fees
• Agency markups (for business centers)
• Renewal or extension beyond the 30-day promotional period`,
  benefits: [
    'Up to $6,000 in 1:1 matched ad credits',
    'Five-tier structure: $200, $500, $1,000, $4,000, $6,000',
    '$6,000 tier credited immediately upon hitting threshold',
    'Unlimited campaigns across all ad formats',
    'In-Feed Ads, Spark Ads, Branded Hashtag Challenges, TopView, Lead Generation',
    'Real-time analytics and performance tracking',
    'Audience targeting by age, interests, behavior, device, location',
    'Conversion tracking and pixel integration',
    'A/B testing capabilities',
    'Smart+ optimization (AI-powered bidding)',
    'Access to 1.5B+ active users globally',
    'Strong reach to Gen Z and younger Millennials',
    '30-day promotional window from registration'
  ],
  eligibility: [
    'New Advertiser Only — Must not have advertised on TikTok Ads before',
    'Business/SMB Account — Must register a fresh TikTok Ads Manager account (not agency or business center)',
    'Valid Payment Method — Credit card or PayPal required',
    'Location Requirements — US-based offer widely available; some offers region-specific',
    'Non-Shopify Accounts — Accounts linked to Shopify may not qualify',
    'Meet Spend Threshold — Must spend required amount ($200–$6,000) within 30 days',
    'Policy Compliance — Ads must comply with TikTok Community Guidelines and Advertising Terms'
  ],
  applicationProcess: [
    'Visit getstarted.tiktok.com/ttam-partners (or the exclusive partner link for your region)',
    'Create a new TikTok For Business account (must be a fresh Ads Manager account)',
    'Provide business information: company name, business category, country, website URL',
    'Add payment method: credit card or PayPal (required for offer eligibility)',
    'Verify email and confirm account activation (instant)',
    'Navigate to TikTok Ads Manager and create your first campaign',
    'Select your advertising objective (Sales, App Installs, Lead Generation, etc.)',
    'Design or upload your video content (or use TikTok\'s templates/royalty-free library)',
    'Set audience targeting, budget tier ($200–$6,000), and launch campaign',
    'Track spend in real-time; once you hit your tier threshold within 30 days, credits automatically apply',
    'Use remaining ad credits to continue scaling campaigns'
  ],
  faqs: [
    {
      question: 'How does the spend-match work?',
      answer: 'TikTok matches your ad spend 1:1 across five tiers. Spend $200 to get $200, $500 to get $500, $1,000 to get $1,000, $4,000 to get $4,000, or $6,000 to get $6,000. The $6,000 tier credits immediately upon hitting the threshold.'
    },
    {
      question: 'Who is eligible for this offer?',
      answer: 'New advertisers only who have never advertised on TikTok Ads before. You must register a fresh TikTok Ads Manager account (not agency or business center) with a valid payment method.'
    },
    {
      question: 'How long do I have to spend the money?',
      answer: 'You have 30 days from registration to meet your spend threshold. The clock starts immediately at registration, so plan your campaigns accordingly.'
    },
    {
      question: 'When do I receive the matched credits?',
      answer: 'Credits are applied on Day 31 after you meet your tier threshold. Exception: the $6,000 tier credits immediately upon hitting the threshold.'
    },
    {
      question: 'What can I use the credits for?',
      answer: 'Credits cover 100% of TikTok Ads spend including all bidding models (CPM, CPC, oCPM, CPV), all advertising objectives, video campaigns, retargeting, lead generation forms, and e-commerce product ads.'
    },
    {
      question: 'What\'s NOT covered by the credits?',
      answer: 'Third-party creative production, TikTok Creator Marketplace partnerships (influencer fees), Shopify integration fees, tax/payment processing fees, agency markups, and any renewal beyond the 30-day promotional period.'
    },
    {
      question: 'What\'s the best strategy to maximize value?',
      answer: 'Use Days 1–15 to test audiences and creative formats with smaller spend. Use Days 16–30 to scale winning campaigns. Create 3–5 video variations for A/B testing. Target narrow interest-based audiences first for lower CPM.'
    },
    {
      question: 'What kind of ROI can I expect?',
      answer: 'TikTok CPM ranges $2.50–$10+ (often 50% lower than Facebook/Instagram). Average CPC is $0.30–$1.00+. Your $6,000 credit at $5 CPM = 1.2M+ impressions possible. At 3% CTR = 36K+ clicks.'
    }
  ],
  tags: ['advertising', 'ad-credits', 'tiktok', 'video-ads', 'social-media', 'marketing', 'paid-ads', 'startups'],
  status: 'active',
  applicationUrl: 'https://getstarted.tiktok.com/ttam-partners',
  logoUrl: 'https://logo.clearbit.com/tiktok.com',
  brandIcon: 'https://logo.clearbit.com/tiktok.com',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $6,000',
  savingsAmount: 6000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🎵'
};

// Find existing TikTok deal(s) and remove them
const tiktokPatterns = ['tiktok'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isTikTok = tiktokPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isTikTok) {
    console.log(`Removing existing TikTok deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isTikTok;
});

// Add the new comprehensive TikTok deal
filteredDeals.push(tiktokDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ TikTok for Business TTAM Partners deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${tiktokDeal.title}`);
console.log(`- Value: ${tiktokDeal.value}`);
console.log(`- Application URL: ${tiktokDeal.applicationUrl}`);
console.log(`- Benefits: ${tiktokDeal.benefits.length} items`);
console.log(`- Eligibility: ${tiktokDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${tiktokDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${tiktokDeal.faqs.length} questions`);
