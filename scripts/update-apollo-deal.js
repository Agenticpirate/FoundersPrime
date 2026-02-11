const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Apollo for Startups deal data
const apolloDeal = {
  id: 'apollo-for-startups',
  slug: 'apollo-for-startups',
  title: 'Apollo for Startups — 50% Off for 1 Year',
  provider: 'Apollo.io',
  category: 'saas-discounts',
  subcategory: 'sales-intelligence',
  value: '50% off for 1 year (up to 5 seats)',
  enhancedValue: '$1,500+',
  shortDescription: '50% off Basic or Professional plan for 1 year (up to 5 seats). Access Apollo\'s 275M+ B2B contact database to find leads, run outreach, and close deals.',
  description: `Apollo for Startups provides 50% off Basic or Professional plan for 1 year (up to 5 seats). Access Apollo's 275M+ B2B contact database to find leads, run outreach, and close deals.`,
  detailedDescription: `Apollo for Startups provides 50% off Basic or Professional plan for 1 year (up to 5 seats). Access Apollo's 275M+ B2B contact database to find leads, run outreach, and close deals.

What's Included:

Database Access:
• 275M+ verified B2B contacts
• 210M+ contact emails
• 60M+ direct phone numbers
• Company & buyer intent data
• Advanced search filters

Sales & Outreach Tools:
• Email sequences (unlimited on paid plans)
• AI-powered email writing
• Chrome extension for LinkedIn prospecting
• Built-in dialer (Professional plan)
• Call recordings

AI & Automation:
• AI lead scoring & prioritization
• Workflow automation
• Signal-based triggers
• A/B testing for outreach

Additional Startup Benefits:
• 1:1 onboarding support
• Startup-focused webinars
• Exclusive founder events & dinners
• Discounts on other tools via marketplace

Plan Pricing (Before Discount):
• Basic: $49/user/year → ~$25/user with 50% off
• Professional: $79/user/year → ~$40/user with 50% off
• 5 seats × $49/user × 12 months = $2,940/year
• With 50% off = $1,470/year (Save ~$1,500)

Best For: B2B startups doing outbound sales, lead generation, fundraising outreach, or marketing campaigns.

Not Ideal For: B2C companies, existing Apollo subscribers, or teams larger than 20 employees.`,
  benefits: [
    '50% off Basic or Professional plan for 1 year',
    'Up to 5 seats included',
    '275M+ verified B2B contacts database',
    '210M+ contact emails, 60M+ direct phone numbers',
    'Email sequences (unlimited on paid plans)',
    'AI-powered email writing',
    'Chrome extension for LinkedIn prospecting',
    'Built-in dialer & call recordings (Professional)',
    'AI lead scoring & prioritization',
    'Workflow automation & signal-based triggers',
    '1:1 onboarding support',
    'Startup-focused webinars & founder events'
  ],
  eligibility: [
    'Fewer than 20 employees',
    'No existing Apollo subscription',
    'Valid company domain (no Gmail/Yahoo)',
    'Affiliated with a startup ecosystem partner (VC, accelerator, community) — preferred',
    'Note: If not affiliated with a partner, you can still apply — Apollo will follow up with next steps'
  ],
  applicationProcess: [
    'Go to apollo.io/startups',
    'Click "Apply Now"',
    'Fill out application with company details',
    'Provide your VC/accelerator affiliation (if applicable)',
    'Submit and wait for approval (3-7 days)',
    'Once approved, 50% discount applied to your account'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Early-stage startups with <20 employees, no existing Apollo subscription, valid company domain, and ideally affiliated with a startup ecosystem partner (VC, accelerator).'
    },
    {
      question: 'What plans are included?',
      answer: '50% off applies to Basic or Professional plans for up to 5 seats for 1 year.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3-7 business days. Apollo reviews applications individually.'
    },
    {
      question: 'What if I\'m not affiliated with a partner?',
      answer: 'You can still apply! Apollo will contact you with next steps. You can also ask your VC/accelerator to join Apollo\'s partner program.'
    },
    {
      question: 'What\'s the difference between Basic and Professional?',
      answer: 'Professional includes: built-in dialer, call recordings, advanced reports, AI email writing (300K words/month), and higher credit limits.'
    },
    {
      question: 'Is there a free plan?',
      answer: 'Yes, Apollo has a free plan with limited features (100 credits total, basic sequences). The startup discount applies to paid plans.'
    },
    {
      question: 'What happens after 1 year?',
      answer: 'Standard pricing applies. You can continue on paid plans or downgrade to free.'
    }
  ],
  tags: ['lead-generation', 'b2b-database', 'sales-intelligence', 'email-outreach', 'prospecting', 'crm', 'sales-engagement', 'apollo'],
  status: 'active',
  applicationUrl: 'https://www.apollo.io/startups',
  logoUrl: 'https://www.apollo.io/_next/static/media/logo.adddd611.svg',
  brandIcon: 'https://www.apollo.io/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $1,500+',
  savingsAmount: 1500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🎯'
};

// Find existing Apollo deal(s) and remove them (be specific to avoid removing unrelated deals)
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  // Only match Apollo.io deals, not other companies with "apollo" in name
  const isApollo = 
    slugLower === 'apollo-for-startups' ||
    slugLower.startsWith('apollo-') && providerLower.includes('apollo') ||
    providerLower === 'apollo.io' ||
    providerLower === 'apollo' ||
    (titleLower.includes('apollo') && (titleLower.includes('startup') || titleLower.includes('sales') || titleLower.includes('lead')));
  
  if (isApollo) {
    console.log(`Removing existing Apollo deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isApollo;
});

// Add the new comprehensive Apollo deal
filteredDeals.push(apolloDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Apollo for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${apolloDeal.title}`);
console.log(`- Value: ${apolloDeal.value}`);
console.log(`- Application URL: ${apolloDeal.applicationUrl}`);
console.log(`- Benefits: ${apolloDeal.benefits.length} items`);
console.log(`- Eligibility: ${apolloDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${apolloDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${apolloDeal.faqs.length} questions`);
