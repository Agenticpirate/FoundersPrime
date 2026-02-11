const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Mux for Startups deal data
const muxDeal = {
  id: 'mux-for-startups',
  slug: 'mux-for-startups',
  title: 'Mux for Startups — $500+ in Video Credits',
  provider: 'Mux',
  category: 'saas-discounts',
  subcategory: 'video-api',
  value: '$500+ in credits',
  enhancedValue: '$500+',
  shortDescription: 'Minimum $500 in Mux Video credits (more with investor affiliation). Full Video API access, free analytics, open-source players, and no credit card required to start.',
  description: `Mux provides video infrastructure that enables developers to build on-demand and live video into any site or app in minutes, handling encoding, storage, delivery, and scaling automatically. Get $500+ in credits.`,
  detailedDescription: `Mux provides video infrastructure that enables developers to build on-demand and live video into any site or app in minutes, handling encoding, storage, delivery, and scaling automatically. Get $500+ in credits.

What's Covered:
• Minimum $500 in Mux Video credits (higher amounts with partner affiliation)
• Full access to Mux Video API for on-demand and live streaming
• Battle-tested infrastructure serving billions of streams
• Open-source native players for iOS/Android, web player, and iframe options
• Free Mux Data analytics included at no cost
• Expert support for setup and technical guidance
• Potential product consultation with Mux co-founders (if qualified)
• AI workflows: translation, chapter generation, captions
• Credits valid 1 year from activation
• No credit card required to start

What's NOT Covered:
• Existing Mux customers
• Those who've previously received Mux credits
• Companies not building software/video products

Key Insights:
• Value Breakdown: $500 = 300,000 streamed minutes = 10,000 people watching 30-minute videos = 204 days of continuous streaming
• Partner Boost: YC, a16z, Accel, Lightspeed, Techstars affiliates get significantly higher credit amounts
• Free Analytics: Mux Data (analytics) included FREE—tracks performance, engagement, quality of experience
• API-First: Single API call handles encoding, storage, delivery, and scaling
• No Credit Card Required: Start building immediately without payment method
• AI-Native: Built for AI companies generating video programmatically
• Developer Experience: Used by Vercel, GitHub, Notion`,
  benefits: [
    'Minimum $500 in Mux Video credits (more with partner affiliation)',
    'Full access to Mux Video API for on-demand and live streaming',
    'Battle-tested infrastructure serving billions of streams',
    'Open-source native players for iOS/Android and web',
    'Free Mux Data analytics included at no cost',
    'Expert support for setup and technical guidance',
    'AI workflows: translation, chapter generation, captions',
    'Credits valid 1 year from activation',
    'No credit card required to start'
  ],
  eligibility: [
    'Startup only (offer valid for startups)',
    'New to Mux (must not be existing customer)',
    'First-time recipient (no previous Mux credits received)',
    'Active development (ready to integrate video into product)',
    'Credits must be used within 1 year of activation'
  ],
  applicationProcess: [
    'Visit https://www.mux.com/startups',
    'Complete application form with name, company, email, company URL',
    'Select your country/region',
    'Choose partner affiliation (YC, a16z, Accel, Lightspeed, Techstars, Mercury, Secret, Station F, etc.)',
    'Indicate interest in trialing new Mux products/features',
    'Click "Apply for Credits" button',
    'Await review (3-5 business days)',
    'Once approved, credits automatically applied to your Mux account',
    'Create Mux account (no credit card required) and start building'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Minimum $500 in credits, which equals 300,000 streamed minutes (10,000 people watching 30-minute videos). Partner-affiliated startups (YC, a16z, Accel, etc.) get significantly higher amounts.'
    },
    {
      question: 'Who is eligible for Mux for Startups?',
      answer: 'Startups new to Mux who haven\'t previously received credits and are ready to integrate video into their product. No credit card required to start.'
    },
    {
      question: 'Is Mux Data (analytics) included?',
      answer: 'Yes! Mux Data is included FREE for all Mux Video users. It tracks performance, engagement, quality of experience, and viewer behavior—typically costs extra with competitors.'
    },
    {
      question: 'How fast can I integrate Mux?',
      answer: 'Most developers integrate Mux in a single sprint or less. The API-first approach lets you ship video "in hours, not days" without building complex video infrastructure.'
    },
    {
      question: 'What can I build with Mux?',
      answer: 'Live streaming, on-demand video, video conferencing features, UGC platforms, fitness streaming, educational content, video generation AI outputs, and more.'
    },
    {
      question: 'Do I need a credit card to start?',
      answer: 'No. Start building immediately with Mux\'s free tier. No payment method needed upfront—test integration before credits are even applied.'
    }
  ],
  tags: ['video', 'streaming', 'api', 'live-video', 'on-demand', 'developer-tools', 'ai', 'startups', 'mux'],
  status: 'active',
  applicationUrl: 'https://www.mux.com/startups',
  logoUrl: 'https://www.mux.com/favicon.ico',
  brandIcon: 'https://www.mux.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $500+',
  savingsAmount: 500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🎬'
};

// Find existing Mux deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMux = 
    slugLower.includes('mux-') ||
    slugLower === 'mux' ||
    (titleLower.includes('mux') && (titleLower.includes('video') || titleLower.includes('startup'))) ||
    providerLower === 'mux';
  
  if (isMux) {
    console.log(`Removing existing Mux deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMux;
});

// Add the new comprehensive Mux deal
filteredDeals.push(muxDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Mux for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${muxDeal.title}`);
console.log(`- Value: ${muxDeal.value}`);
console.log(`- Application URL: ${muxDeal.applicationUrl}`);
console.log(`- Benefits: ${muxDeal.benefits.length} items`);
console.log(`- Eligibility: ${muxDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${muxDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${muxDeal.faqs.length} questions`);
