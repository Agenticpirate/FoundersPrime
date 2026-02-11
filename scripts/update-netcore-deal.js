const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Netcore Cloud B2C Startup Program deal data
const netcoreDeal = {
  id: 'netcore-cloud-startup-program',
  slug: 'netcore-cloud-startup-program',
  title: 'Netcore Cloud B2C Startup Program — $30,000 in Credits',
  provider: 'Netcore Cloud',
  category: 'saas-discounts',
  subcategory: 'marketing-automation',
  value: '$30,000 in platform credits',
  enhancedValue: '$30,000',
  shortDescription: 'Up to $30,000 in platform credits for B2C startups. AI-powered omnichannel marketing: Email, SMS, WhatsApp, RCS, Push notifications. Includes ProfiGrowth Academy mentorship.',
  description: `Netcore Cloud empowers B2C startups with enterprise-grade marketing automation to drive retention, engagement, and revenue growth at scale. Get up to $30,000 in platform credits plus exclusive mentorship.`,
  detailedDescription: `Netcore Cloud empowers B2C startups with enterprise-grade marketing automation to drive retention, engagement, and revenue growth at scale. Get up to $30,000 in platform credits plus exclusive mentorship.

What's Covered:
• Up to $30,000 in Netcore Cloud credits
• Omnichannel Marketing: Email, SMS, WhatsApp, RCS, Web & App Push, In-app messaging
• AI-Powered Features: Co-Marketer AI, personalization, predictive analytics
• Marketing Automation: Campaign automation, behavior-based segmentation, journey orchestration
• ProfiGrowth Academy: Exclusive mentorship from industry veterans who scaled startups
• Expert Guidance: 1:1 mentorship sessions, office hours, masterclasses
• Ecosystem Access: 50+ partners including Razorpay Rize, Headstart, GrowthX
• Investor Network: Networking opportunities with VCs and accelerators

What's NOT Covered:
• Existing Netcore customers
• Startups raised over $15M in funding
• Companies older than 3 years
• Pure B2B businesses without consumer focus

Key Insights:
• Value Breakdown: $30,000 in credits covers comprehensive usage across email, SMS, WhatsApp, RCS, push notifications, personalization, and AI features—potentially covering 12+ months of marketing execution
• Credit Usage: Credits apply to all platform features including advanced capabilities like predictive analytics, AI-powered content generation, omnichannel automation
• Pro Tip: The ProfiGrowth Academy mentorship track is the hidden gem—gain access to handpicked experts who've scaled startups from 1 to 100
• Geographic Advantage: While preference for India, Africa, and Asia, the program accepts global applications
• Channel Priority: Netcore excels in WhatsApp Business API and RCS—leverage these for higher engagement rates. Their infrastructure handles 500B+ messages annually
• Partnership Leverage: Access 50+ ecosystem partners including Razorpay Rize, Headstart Network, GrowthX`,
  benefits: [
    'Up to $30,000 in Netcore Cloud platform credits',
    'Omnichannel Marketing: Email, SMS, WhatsApp, RCS, Web & App Push, In-app messaging',
    'AI-Powered Features: Co-Marketer AI, personalization, predictive analytics',
    'Marketing Automation: Campaign automation, behavior-based segmentation, journey orchestration',
    'ProfiGrowth Academy: Exclusive mentorship from industry veterans',
    'Expert Guidance: 1:1 mentorship sessions, office hours, masterclasses',
    'Ecosystem Access: 50+ partners including Razorpay Rize, Headstart, GrowthX',
    'Investor Network: Networking opportunities with VCs and accelerators',
    'Workshops, webinars, and community access'
  ],
  eligibility: [
    'New to Netcore (not existing customers)',
    'Less than 3 years old from founding date',
    'Raised under $15 million in total funding',
    'B2C retention focus (primary focus beyond acquisition)',
    'Healthy traction (experiencing high demand and ready to scale)',
    'Geographic focus: India, Africa, Asia preferred but global applications accepted'
  ],
  applicationProcess: [
    'Visit https://netcorecloud.com/startup-program/ and click "Apply Now"',
    'Complete application form via Tally with startup details',
    'Provide startup name, website, founding date, team size',
    'Include product/service description and current traction metrics',
    'Specify funding raised to date and retention strategy',
    'Highlight your retention focus—showcase retention metrics and engagement strategies',
    'Undergo review process (7-10 business days)',
    'If shortlisted, discuss retention strategy with program team',
    'Get approved and receive $30,000 in credits + mentorship track assignment',
    'Start building campaigns across all channels'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to $30,000 in Netcore Cloud platform credits covering email, SMS, WhatsApp, RCS, push notifications, personalization, and AI features—potentially covering 12+ months of marketing execution.'
    },
    {
      question: 'Who is eligible for Netcore Cloud Startup Program?',
      answer: 'B2C startups less than 3 years old, raised under $15M, with healthy traction and retention focus. Existing Netcore customers and pure B2B businesses are not eligible.'
    },
    {
      question: 'What is ProfiGrowth Academy?',
      answer: 'Exclusive mentorship from industry veterans who scaled startups. Includes 1:1 sessions for retention strategy, growth hacking, and fundraising guidance.'
    },
    {
      question: 'What channels are supported?',
      answer: 'Email, SMS, WhatsApp Business API, RCS, Web & App Push notifications, and In-app messaging. Netcore handles 500B+ messages annually.'
    },
    {
      question: 'Is this available globally?',
      answer: 'Yes. While there is preference for India, Africa, and Asia, the program accepts global applications—don\'t self-reject based on location.'
    },
    {
      question: 'What ecosystem partners are included?',
      answer: '50+ partners including Razorpay Rize, Headstart Network, GrowthX—use these connections for fundraising, growth hacking, and operational support.'
    }
  ],
  tags: ['marketing-automation', 'email', 'sms', 'whatsapp', 'push-notifications', 'b2c', 'retention', 'ai', 'startups', 'netcore'],
  status: 'active',
  applicationUrl: 'https://netcorecloud.com/startup-program/',
  logoUrl: 'https://netcorecloud.com/favicon.ico',
  brandIcon: 'https://netcorecloud.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $30,000',
  savingsAmount: 30000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📧'
};

// Find existing Netcore deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isNetcore = 
    slugLower.includes('netcore') ||
    titleLower.includes('netcore') ||
    providerLower.includes('netcore');
  
  if (isNetcore) {
    console.log(`Removing existing Netcore deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isNetcore;
});

// Add the new comprehensive Netcore deal
filteredDeals.push(netcoreDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Netcore Cloud B2C Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${netcoreDeal.title}`);
console.log(`- Value: ${netcoreDeal.value}`);
console.log(`- Application URL: ${netcoreDeal.applicationUrl}`);
console.log(`- Benefits: ${netcoreDeal.benefits.length} items`);
console.log(`- Eligibility: ${netcoreDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${netcoreDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${netcoreDeal.faqs.length} questions`);
