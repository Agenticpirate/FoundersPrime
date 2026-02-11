const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Customer.io Startup Program deal data
const customerioDeal = {
  id: 'customerio-startup-program',
  slug: 'customerio-startup-program',
  title: 'Customer.io Startup Program — 1 Year Free Essentials (30K Profiles)',
  provider: 'Customer.io',
  category: 'marketing',
  subcategory: 'email-marketing',
  value: 'Up to ~$3,900 in savings',
  enhancedValue: '$3,900',
  shortDescription: '12 months free on the Essentials plan with up to 30,000 customer profiles. Full messaging stack including email, SMS, push, workflows, and segmentation.',
  description: `Customer.io's Startup Program gives eligible startups a full year free on the Essentials plan with support for up to 30,000 customer profiles. This plan includes multi-channel messaging (email, SMS, push), behavioral tracking, and advanced segmentation so you can run lifecycle campaigns without paying subscription fees for the first 12 months.`,
  detailedDescription: `Customer.io's Startup Program gives eligible startups a full year free on the Essentials plan with support for up to 30,000 customer profiles. This plan includes multi-channel messaging (email, SMS, push), behavioral tracking, and advanced segmentation so you can run lifecycle campaigns without paying subscription fees for the first 12 months.

What You Get:
• 12 months free on the Essentials/Startup tier
• Support for up to 30,000 profiles (vs. standard Essentials starting at 5,000)
• Visual workflow builder for automation
• Behavioral triggers and advanced segmentation
• Multi-channel campaigns: email, SMS, push notifications
• API and integrations with your product stack
• Community or standard support, documentation

What Credits Cover:
• Full subscription fee for the qualifying Essentials/Startup plan for 12 months
• Use of up to 30k profiles and included messaging volumes under that plan's limits

What's NOT Included:
• Overages beyond included profile or messaging limits (billed per standard pricing)
• Premium support, enterprise features, or higher-tier plans
• Past or existing invoices if you've already been a paying Customer.io customer

Best For:
• Early-stage SaaS, marketplaces, and e-commerce startups
• Teams automating onboarding, lifecycle, and retention campaigns
• Startups with product traffic but limited budget for marketing automation

Not Ideal For:
• Companies already paying for Customer.io (existing or former paid customers excluded)
• Startups with purchased or non-organic contact lists`,
  benefits: [
    '12 months free on Essentials/Startup plan',
    'Up to 30,000 customer profiles included',
    'Visual workflow builder for automation',
    'Behavioral triggers and event tracking',
    'Advanced segmentation capabilities',
    'Multi-channel messaging: email, SMS, push',
    'API access and integrations',
    'Analytics and reporting',
    'Community support and documentation',
    'Save up to ~$3,900 vs. standard pricing'
  ],
  eligibility: [
    'Raised less than $10M in total funding at time of application',
    'New to Customer.io paid services (not a current or past paying customer)',
    'Have a live website and real product (not just idea stage)',
    'Contact lists are organically acquired (no purchased lists)'
  ],
  applicationProcess: [
    'Go to the Customer.io Startup Program application page',
    'Complete the form with company details, website, and funding raised (must be < $10M)',
    'Describe your expected messaging use case',
    'Select your referral source in the "Where did you hear about us?" dropdown',
    'Submit the application',
    'Wait for Customer.io to review eligibility and email you next steps',
    'Once approved, your account is placed on the free Essentials/Startup plan for 12 months'
  ],
  faqs: [
    {
      question: 'What\'s included in the 12 months free?',
      answer: 'Full access to the Essentials/Startup plan with up to 30,000 profiles, visual workflow builder, behavioral triggers, segmentation, and multi-channel messaging (email, SMS, push).'
    },
    {
      question: 'Who is eligible for the Startup Program?',
      answer: 'Startups that have raised less than $10M in total funding, are new to Customer.io paid services, have a live website/product, and have organically acquired contact lists.'
    },
    {
      question: 'How much can I save?',
      answer: 'Up to approximately $3,900 compared to standard pricing for 1 year on the Essentials plan with 30k profiles.'
    },
    {
      question: 'What happens after 12 months?',
      answer: 'You can continue on a paid plan at standard pricing. Your data and workflows remain intact.'
    },
    {
      question: 'What\'s NOT covered?',
      answer: 'Overages beyond included profile or messaging limits, premium support, enterprise features, and higher-tier plans unless separately arranged.'
    },
    {
      question: 'Can existing Customer.io customers apply?',
      answer: 'No, this program is only for new customers. Current or past paying customers are not eligible.'
    }
  ],
  tags: ['email-marketing', 'automation', 'messaging', 'sms', 'push-notifications', 'customer-engagement', 'startups'],
  status: 'active',
  applicationUrl: 'https://customer.io/startup-program-application',
  logoUrl: 'https://customer.io/wp-content/uploads/2020/06/customer-io-logo.svg',
  brandIcon: 'https://customer.io/wp-content/uploads/2020/06/customer-io-logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $3,900',
  savingsAmount: 3900,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📧'
};

// Find existing Customer.io deal(s) and remove them
const customerioPatterns = ['customer.io', 'customerio'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isCustomerio = customerioPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isCustomerio) {
    console.log(`Removing existing Customer.io deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isCustomerio;
});

// Add the new comprehensive Customer.io deal
filteredDeals.push(customerioDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Customer.io Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${customerioDeal.title}`);
console.log(`- Value: ${customerioDeal.value}`);
console.log(`- Application URL: ${customerioDeal.applicationUrl}`);
console.log(`- Benefits: ${customerioDeal.benefits.length} items`);
console.log(`- Eligibility: ${customerioDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${customerioDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${customerioDeal.faqs.length} questions`);
