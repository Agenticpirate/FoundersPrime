const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// ActiveCampaign Startup Program deal data
const activecampaignDeal = {
  id: 'activecampaign-startup-program',
  slug: 'activecampaign-startup-program',
  title: 'ActiveCampaign Startup Program — 90% Off Any Annual Plan for 1 Year',
  provider: 'ActiveCampaign',
  category: 'marketing',
  subcategory: 'email-marketing',
  value: 'Up to $1,610 in savings',
  enhancedValue: '$1,610',
  shortDescription: '90% off any annual plan for the first year. Email marketing, marketing automation, CRM tools, and SMS marketing for early-stage startups.',
  description: `ActiveCampaign Startup Program provides qualified early-stage startups with 90% off any annual plan for the first year. ActiveCampaign is a leading Customer Experience Automation platform offering email marketing, marketing automation, CRM tools, and SMS marketing to help startups find their best customers and convert leads to revenue.`,
  detailedDescription: `ActiveCampaign Startup Program provides qualified early-stage startups with 90% off any annual plan for the first year. ActiveCampaign is a leading Customer Experience Automation platform offering email marketing, marketing automation, CRM tools, and SMS marketing to help startups find their best customers and convert leads to revenue.

What You Get:
• 90% off any ActiveCampaign annual plan for the first year

Plan Options (with 90% discount):
• Starter ($15/month → $1.50/month): Email marketing, automation, subscription forms, reporting
• Plus ($49/month → $4.90/month): Built-in CRM, lead scoring, SMS, automation consultation
• Pro ($79/month → $7.90/month): Predictive sending, split automation, attribution tracking
• Enterprise ($145/month → $14.50/month): Custom domain, unlimited training, advanced reporting

What's Covered:
• 90% discount on annual subscription for chosen plan
• All features included in selected tier
• Personal support, tutorials, and webinars
• Free migration assistance

What's NOT Covered:
• Additional contacts beyond plan limits (charged at standard rates)
• Add-ons or premium integrations
• Renewal after first year (standard pricing applies)

Savings Breakdown:
• Starter: Save $162/year
• Plus: Save $529/year
• Pro: Save $853/year
• Enterprise: Save $1,565/year
(Prices based on 1,000 contacts; increases with contact count)`,
  benefits: [
    '90% off any annual plan for 1 year',
    'Email marketing with visual campaign builder',
    'Marketing automation with workflow builder',
    'Built-in CRM (Plus plan and above)',
    'Lead scoring and segmentation',
    'SMS marketing for multi-channel campaigns',
    'Predictive sending (Pro plan and above)',
    'Attribution tracking and reporting',
    'Free migration assistance from other platforms',
    'Personal support, tutorials, and webinars',
    'Subscription forms and landing pages',
    'Advanced reporting and analytics'
  ],
  eligibility: [
    'Less than 2 years old (company founded within last 2 years)',
    'Raised less than $1M in funding',
    'Has a live website',
    'New ActiveCampaign customer (offer valid for new users only)'
  ],
  applicationProcess: [
    'Visit the ActiveCampaign Startup Program page at activecampaign.com/start-up',
    'Fill out the application form with company name, website, founding date',
    'Enter total funding raised (must be < $1M) and business description',
    'In the "Program/Incubator" section, mention your referral source',
    'Select your desired plan (Starter, Plus, Pro, or Enterprise)',
    'Submit the application for review',
    'Await approval (3–5 business days)',
    'Once approved, 90% discount is applied to your annual subscription',
    'Complete payment for the discounted annual plan and start using ActiveCampaign'
  ],
  faqs: [
    {
      question: 'How much can I save with ActiveCampaign Startup Program?',
      answer: 'Up to $1,610 depending on plan and contact count. Starter saves $162/year, Plus saves $529/year, Pro saves $853/year, Enterprise saves $1,565/year (based on 1,000 contacts).'
    },
    {
      question: 'Who is eligible for this program?',
      answer: 'Startups less than 2 years old, with less than $1M in funding, a live website, and who are new ActiveCampaign customers.'
    },
    {
      question: 'Which plan should I choose?',
      answer: 'Choose Pro or Enterprise to maximize savings. Plus is great if you need CRM and SMS. Starter works for basic email marketing needs.'
    },
    {
      question: 'How long does approval take?',
      answer: 'ActiveCampaign team reviews applications within 3–5 business days.'
    },
    {
      question: 'What happens after the first year?',
      answer: 'Standard pricing applies after year 1. Consider annual billing for continued savings vs. monthly.'
    },
    {
      question: 'Can I migrate from another platform?',
      answer: 'Yes! ActiveCampaign offers free migration assistance from Mailchimp, HubSpot, and other platforms.'
    }
  ],
  tags: ['email-marketing', 'marketing-automation', 'crm', 'activecampaign', 'sms-marketing', 'lead-scoring', 'startups'],
  status: 'active',
  applicationUrl: 'https://www.activecampaign.com/start-up',
  logoUrl: 'https://www.activecampaign.com/favicon.ico',
  brandIcon: 'https://www.activecampaign.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $1,610',
  savingsAmount: 1610,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📧'
};

// Find existing ActiveCampaign deal(s) and remove them
const activecampaignPatterns = ['activecampaign'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isActiveCampaign = activecampaignPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isActiveCampaign) {
    console.log(`Removing existing ActiveCampaign deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isActiveCampaign;
});

// Add the new comprehensive ActiveCampaign deal
filteredDeals.push(activecampaignDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ ActiveCampaign Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${activecampaignDeal.title}`);
console.log(`- Value: ${activecampaignDeal.value}`);
console.log(`- Application URL: ${activecampaignDeal.applicationUrl}`);
console.log(`- Benefits: ${activecampaignDeal.benefits.length} items`);
console.log(`- Eligibility: ${activecampaignDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${activecampaignDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${activecampaignDeal.faqs.length} questions`);
