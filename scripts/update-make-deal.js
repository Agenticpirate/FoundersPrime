const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Make.com Startup Program deal data
const makeDeal = {
  id: 'make-startup-program',
  slug: 'make-startup-program',
  title: 'Make.com Startup Program — Up to $1,100 in Credits',
  provider: 'Make',
  category: 'saas-discounts',
  subcategory: 'automation',
  value: '$1,100 (VC-backed) / $600 (Bootstrapped)',
  enhancedValue: '$1,100',
  shortDescription: '1 year of free access to Make.com\'s AI no-code automation platform. VC-backed startups get $1,100+ (480K ops), bootstrapped get $600+ (240K ops).',
  description: `Make.com offers early-stage startups 1 year of free access to their AI no-code automation platform, enabling teams to build workflows and automate tasks without coding.`,
  detailedDescription: `Make.com offers early-stage startups 1 year of free access to their AI no-code automation platform, enabling teams to build workflows and automate tasks without coding.

What's Included:
• VC-Backed Tier: $1,100+ credits with 480,000 operations/year
• Bootstrapped Tier: $600+ credits with 240,000 operations/year
• Teams Plan access for 1 year
• 3000+ app integrations (Google Workspace, Slack, HubSpot, Notion, Airtable, Stripe, etc.)
• Unlimited active scenarios
• 1-minute minimum execution interval
• Role-based team collaboration
• High-priority scenario execution
• Best practice library and scenario templates
• Exclusive startup community space access
• Priority email support

Best For:
• Startups automating repetitive tasks
• Teams without technical developers
• Bootstrapped founders managing operations
• Companies integrating multiple tools
• Accelerator/incubator cohort participants

Not Ideal For:
• Agencies providing AI automation services
• Companies with over $5M funding
• Existing Make paying customers
• Startups over 5 years old or 100+ employees

Key Insights:
• Do NOT apply twice – duplicate applications are automatically rejected
• Operations explained: Each module action (e.g., adding a Google Sheets row, fetching Gmail data) counts as 1 operation
• Regular pricing: Make Teams plan costs $29/month (billed annually) with 10k operations/month
• Scale after program: After 1 year, continue on pay-as-you-go with $29/month per user or downgrade to free plan (1,000 ops/month)
• 3000+ integrations: Connect Google Workspace, Slack, HubSpot, Notion, Airtable, Stripe, and virtually any tool your startup uses`,
  benefits: [
    'VC-Backed: $1,100+ credits with 480,000 operations/year',
    'Bootstrapped: $600+ credits with 240,000 operations/year',
    'Teams Plan access for 1 full year',
    '3000+ app integrations (Google, Slack, HubSpot, Notion, Airtable, Stripe)',
    'Unlimited active scenarios',
    '1-minute minimum execution interval',
    'Role-based team collaboration',
    'High-priority scenario execution',
    'Best practice library and scenario templates',
    'Exclusive startup community space access',
    'Priority email support'
  ],
  eligibility: [
    'Not a paying customer of Make',
    'Raised less than $5M in total funding',
    'Company less than 5 years old',
    'Less than 100 employees',
    'Not providing AI automation services',
    'First-time applicant (no duplicate applications)',
    'TIER SELECTION:',
    'VC-Backed: Working with approved partner (accelerator, incubator, VC) = 480K ops',
    'Bootstrapped: No partner affiliation = 240K ops'
  ],
  applicationProcess: [
    'Check Partner Network: Review Make\'s Startup Partners list to see if your investor qualifies',
    'Access Application Form: Visit https://f.make.com/startups',
    'Complete Eligibility Questions: Answer verification questions (funding status, company age, employee count)',
    'Select Investor/Partner: Choose your investor from the dropdown (or select "bootstrapped")',
    'Wait for Approval: Make reviews your application within 3-7 days',
    'Receive Access: Credits are automatically applied to your new Make account'
  ],
  faqs: [
    {
      question: 'How much credit do I get?',
      answer: 'VC-backed startups get $1,100+ with 480,000 operations/year. Bootstrapped startups get $600+ with 240,000 operations/year.'
    },
    {
      question: 'What counts as an operation?',
      answer: 'Each module action counts as 1 operation. For example, adding a Google Sheets row, fetching Gmail data, or sending a Slack message each count as 1 operation.'
    },
    {
      question: 'Can I apply if I\'m bootstrapped?',
      answer: 'Yes! Bootstrapped startups without partner affiliation qualify for the $600+ tier with 240,000 operations/year.'
    },
    {
      question: 'What happens after the 1-year program ends?',
      answer: 'You can continue on pay-as-you-go with $29/month per user, or downgrade to the free plan with 1,000 operations/month.'
    },
    {
      question: 'Can I apply twice?',
      answer: 'No. Duplicate applications are automatically rejected. Only apply once.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Make reviews applications within 3-7 days. Credits are automatically applied upon approval.'
    }
  ],
  tags: ['automation', 'no-code', 'workflow', 'integrations', 'startups', 'make', 'zapier-alternative'],
  status: 'active',
  applicationUrl: 'https://f.make.com/startups',
  logoUrl: 'https://www.make.com/favicon.ico',
  brandIcon: 'https://www.make.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $1,100',
  savingsAmount: 1100,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '⚡'
};

// Find existing Make deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMake = 
    slugLower.includes('make-') ||
    slugLower === 'make' ||
    titleLower.includes('make.com') ||
    titleLower.includes('make startup') ||
    providerLower === 'make' ||
    providerLower === 'make.com';
  
  if (isMake) {
    console.log(`Removing existing Make deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMake;
});

// Add the new comprehensive Make deal
filteredDeals.push(makeDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Make.com Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${makeDeal.title}`);
console.log(`- Value: ${makeDeal.value}`);
console.log(`- Application URL: ${makeDeal.applicationUrl}`);
console.log(`- Benefits: ${makeDeal.benefits.length} items`);
console.log(`- Eligibility: ${makeDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${makeDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${makeDeal.faqs.length} questions`);
