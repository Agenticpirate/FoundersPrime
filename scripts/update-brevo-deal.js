const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Brevo Startup Program deal data
const brevoDeal = {
  id: 'brevo-startup-program',
  slug: 'brevo-startup-program',
  title: 'Brevo for Startups — Up to 75% Off for 2 Years',
  provider: 'Brevo',
  category: 'saas-discounts',
  subcategory: 'email-marketing',
  value: '75% off (2 years) or $500 credits',
  enhancedValue: '$500+',
  shortDescription: 'Up to 75% off Brevo\'s all-in-one marketing and CRM platform for 2 years. Email campaigns, SMS marketing, automation, and sales pipeline management at startup-friendly prices.',
  description: `Brevo offers startups exclusive discounts on their all-in-one marketing and CRM platform, enabling email campaigns, SMS marketing, automation, and sales pipeline management at startup-friendly prices.`,
  detailedDescription: `Brevo offers startups exclusive discounts on their all-in-one marketing and CRM platform, enabling email campaigns, SMS marketing, automation, and sales pipeline management at startup-friendly prices.

What's Included:
• First-Round Funding Tier: 75% off Annual Business Plan for 2 years
• Alternative Credits Tier: Up to $500 credits for 12 months
• Unlimited automation and A/B testing
• Advanced marketing workflows & segmentation
• Built-in landing page builder
• Transactional email (SMTP relay & API access)
• SMS and WhatsApp marketing campaigns
• CRM & sales pipeline management
• 150+ integrations (Shopify, WordPress, Zapier, Stripe)
• Priority phone support on Business plan
• Dedicated onboarding support

Best For:
• Early-stage startups building email marketing
• Teams needing email, SMS, and CRM in one platform
• VC-backed or incubator-backed companies
• Startups wanting unlimited contacts (not pay-per-contact)
• Businesses needing transactional emails (SMTP/API)

Not Ideal For:
• Existing Brevo paying customers
• Enterprises with custom compliance requirements
• Businesses needing advanced visual template builders

Key Insights:
• Pay per email sent, not per contact – Store 100,000 contacts but only pay for emails actually sent, saving 30-50% vs Mailchimp/Klaviyo
• Time activation strategically – Start the 12-month discount clock right before a product launch or scale-up phase
• 75% off makes Business cheaper than Starter – The discount often makes the premium Business plan cheaper than regular Starter pricing
• Free plan available first – Start on Free plan (300 emails/day, unlimited contacts) to validate, then upgrade with discount
• Multi-channel testing with credits – Use $500 credit option to test SMS/WhatsApp campaigns
• Saves $30k annually vs HubSpot – Significant cost savings compared to alternatives`,
  benefits: [
    'First-Round Funded: 75% off Annual Business Plan for 2 years',
    'Alternative: Up to $500 credits for 12 months',
    'Unlimited email automation and A/B testing',
    'Advanced marketing workflows & segmentation',
    'Built-in landing page builder',
    'Transactional email (SMTP relay & API access)',
    'SMS and WhatsApp marketing campaigns',
    'CRM & sales pipeline management',
    '150+ integrations (Shopify, WordPress, Zapier, Stripe)',
    'Priority phone support on Business plan',
    'Dedicated onboarding support'
  ],
  eligibility: [
    'Active startup or small business',
    'Partnered with VC, accelerator, or incubator (for 75% tier)',
    'New Brevo customer (not existing paying customer)',
    'Valid business website and company details',
    'Legitimate startup verified during manual review',
    'FUNDING STAGE:',
    'First-round funded: 75% off for 2 years',
    'Pre-seed/Bootstrapped: Up to $500 credits option'
  ],
  applicationProcess: [
    'Visit Partner Program Page: Go to https://www.brevo.com/partners/startups/',
    'Complete Application Form: Fill in First Name, Last Name, Company Name, Company Website, Work Email',
    'Select Your Investor/Partner: Indicate your VC, accelerator, or incubator affiliation',
    'Manual Review: Brevo team verifies your startup status and partner eligibility',
    'Receive Discount Code: Approved applicants receive discount code or credits via email within 24-48 hours',
    'Activate Account: Sign up for Brevo and apply discount code during checkout'
  ],
  faqs: [
    {
      question: 'How much discount do I get?',
      answer: 'First-round funded startups get 75% off the Annual Business Plan for 2 years. Pre-seed/bootstrapped startups can get up to $500 in credits.'
    },
    {
      question: 'Do I pay per contact or per email?',
      answer: 'Brevo charges per email sent, not per contact. You can store 100,000 contacts but only pay for emails actually sent, saving 30-50% vs Mailchimp/Klaviyo.'
    },
    {
      question: 'Is there a free plan to try first?',
      answer: 'Yes! Start on the Free plan (300 emails/day, unlimited contacts) to validate, then upgrade with your discount when ready to scale.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Approved applicants receive their discount code or credits via email within 24-48 hours after manual review.'
    },
    {
      question: 'What integrations are supported?',
      answer: 'Brevo offers 150+ integrations including Shopify, WordPress, Zapier, Stripe, and more.'
    },
    {
      question: 'Can I use credits for SMS campaigns?',
      answer: 'Yes! If you take the $500 credit option, you can use it to test SMS and WhatsApp campaigns while credits absorb costs.'
    }
  ],
  tags: ['email-marketing', 'crm', 'sms', 'automation', 'marketing', 'startups', 'brevo', 'sendinblue'],
  status: 'active',
  applicationUrl: 'https://www.brevo.com/partners/startups/',
  logoUrl: 'https://www.brevo.com/favicon.ico',
  brandIcon: 'https://www.brevo.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to 75%',
  savingsAmount: 500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📧'
};

// Find existing Brevo/Sendinblue deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isBrevo = 
    slugLower.includes('brevo') ||
    slugLower.includes('sendinblue') ||
    titleLower.includes('brevo') ||
    titleLower.includes('sendinblue') ||
    providerLower === 'brevo' ||
    providerLower === 'sendinblue';
  
  if (isBrevo) {
    console.log(`Removing existing Brevo deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isBrevo;
});

// Add the new comprehensive Brevo deal
filteredDeals.push(brevoDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Brevo for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${brevoDeal.title}`);
console.log(`- Value: ${brevoDeal.value}`);
console.log(`- Application URL: ${brevoDeal.applicationUrl}`);
console.log(`- Benefits: ${brevoDeal.benefits.length} items`);
console.log(`- Eligibility: ${brevoDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${brevoDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${brevoDeal.faqs.length} questions`);
