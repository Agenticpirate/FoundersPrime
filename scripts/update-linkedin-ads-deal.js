const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// LinkedIn Ads B2B Marketing Credits deal data
const linkedinDeal = {
  id: 'linkedin-ads-b2b-credits',
  slug: 'linkedin-ads-b2b-credits',
  title: 'LinkedIn Ads — $400-$600 in Bonus Ad Credits',
  provider: 'LinkedIn',
  category: 'ad-credits',
  subcategory: 'advertising',
  value: '$400-$600 in bonus credits',
  enhancedValue: '$600',
  shortDescription: 'Bonus ad credits when you spend on LinkedIn Ads. 1:1 matching credits available in Canada (CAD $600), Australia (AUD $400), and New Zealand (NZD $650). Access 1 billion+ professionals.',
  description: `LinkedIn Ads offers bonus ad credits when you spend on the platform - helping businesses launch B2B marketing campaigns on LinkedIn's trusted professional network with 1 billion+ members worldwide. The offer varies by region with matching credit bonuses available in Canada, Australia, and New Zealand.`,
  detailedDescription: `LinkedIn Ads offers bonus ad credits when you spend on the platform - helping businesses launch B2B marketing campaigns on LinkedIn's trusted professional network with 1 billion+ members worldwide. The offer varies by region with matching credit bonuses available in Canada, Australia, and New Zealand.

What's Covered:
• Bonus ad credits after meeting spend requirement (1:1 match)
• Access to LinkedIn's Campaign Manager
• Targeted B2B advertising to professionals
• Multiple ad formats (Sponsored Content, Message Ads, Text Ads, Video)
• Advanced targeting by job title, industry, company, skills
• Campaign analytics and performance tracking

What's NOT Covered:
• Initial spend requirement (not free credits)
• Agency management fees
• Creative design services
• Advanced analytics tools beyond standard reporting

Key Insights:
• 1:1 matching credit: Spend $400-$650 (depending on region), get same amount in bonus credits
• 30-day timeframe: Complete spend requirement within one month of activation
• Regional variations: Canada $600, Australia $400, New Zealand $650 - choose based on your location
• Multiple application pages: If one link doesn't work, try the alternative regional link
• B2B platform advantage: LinkedIn has 1 billion+ professionals—ideal for B2B targeting
• Professional targeting: Precise targeting by job title, seniority, company, industry, skills
• Multiple ad formats: Sponsored Content, InMail, Text Ads, Video, Carousel, Lead Gen Forms
• Campaign Manager: Full-featured advertising platform with real-time analytics
• Spend-to-earn model: This is a matching credit offer, not free advertising—budget accordingly`,
  benefits: [
    'Canada: CAD $600 spend → CAD $600 bonus (CAD $1,200 total)',
    'Australia: AUD $400 spend → AUD $400 bonus (AUD $800 total)',
    'New Zealand: NZD $650 spend → NZD $650 bonus (NZD $1,300 total)',
    'LinkedIn Campaign Manager access',
    'Sponsored Content, Message Ads, Text Ads, Video Ads, Carousel Ads',
    'Lead Gen Forms for direct conversions',
    'Targeting by job title, industry, company size, skills, location, seniority',
    'Campaign performance tracking and reporting',
    'Access to 1 billion+ LinkedIn professional members'
  ],
  eligibility: [
    'New LinkedIn Ads customer (typically for first-time advertisers)',
    'Located in Canada, Australia, or New Zealand',
    'Valid business email address',
    'Ability to meet spend requirement within 30-day period',
    'Accept terms and conditions of the promotion'
  ],
  applicationProcess: [
    'Select your regional link based on your location (CA/AU/NZ)',
    'Enter your business email address in the claim form',
    'Accept terms and conditions of the offer',
    'Click "Claim credit" to submit',
    'Create LinkedIn Campaign Manager account (if new)',
    'Set up your first campaign with targeting and budget',
    'Meet spend requirement within 30 days to qualify for bonus',
    'Receive matching bonus credits automatically applied to account',
    'Continue running campaigns with combined budget'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: '1:1 matching credits based on region: Canada CAD $600, Australia AUD $400, New Zealand NZD $650. Spend the required amount within 30 days to receive matching bonus credits.'
    },
    {
      question: 'Who is eligible for LinkedIn Ads credits?',
      answer: 'New LinkedIn Ads customers in Canada, Australia, or New Zealand with a valid business email address. Existing customers with large spend history may not qualify.'
    },
    {
      question: 'Is this free advertising?',
      answer: 'No. This is a spend-to-earn matching credit offer. You must spend the required amount within 30 days to receive the bonus credits.'
    },
    {
      question: 'What ad formats are available?',
      answer: 'Sponsored Content, Message Ads (InMail), Text Ads, Video Ads, Carousel Ads, and Lead Gen Forms for direct conversions.'
    },
    {
      question: 'What targeting options are available?',
      answer: 'Target by job title, seniority, company, company size, industry, skills, location, and more. LinkedIn has 1 billion+ professional members.'
    },
    {
      question: 'What if one application link doesn\'t work?',
      answer: 'Try the alternative regional links provided. LinkedIn has multiple promotion pages that may have different availability.'
    }
  ],
  tags: ['advertising', 'ad-credits', 'b2b', 'linkedin', 'marketing', 'professional-network', 'lead-generation'],
  status: 'active',
  applicationUrl: 'https://business.linkedin.com/marketing-solutions/cx/25/08/ca-sxgy',
  logoUrl: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
  brandIcon: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $400-$600',
  savingsAmount: 600,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '💼'
};

// Find existing LinkedIn Ads deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isLinkedInAds = 
    slugLower.includes('linkedin-ads') ||
    slugLower.includes('linkedin-ad') ||
    (titleLower.includes('linkedin') && titleLower.includes('ad')) ||
    (providerLower === 'linkedin' && titleLower.includes('ad'));
  
  if (isLinkedInAds) {
    console.log(`Removing existing LinkedIn Ads deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isLinkedInAds;
});

// Add the new comprehensive LinkedIn Ads deal
filteredDeals.push(linkedinDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ LinkedIn Ads B2B Marketing Credits deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${linkedinDeal.title}`);
console.log(`- Value: ${linkedinDeal.value}`);
console.log(`- Application URL: ${linkedinDeal.applicationUrl}`);
console.log(`- Benefits: ${linkedinDeal.benefits.length} items`);
console.log(`- Eligibility: ${linkedinDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${linkedinDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${linkedinDeal.faqs.length} questions`);
