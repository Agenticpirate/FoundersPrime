const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Zendesk for Startups deal data
const zendeskDeal = {
  id: 'zendesk-for-startups',
  slug: 'zendesk-for-startups',
  title: 'Zendesk for Startups — 6 Months Free + 15% Off',
  provider: 'Zendesk',
  category: 'customer',
  subcategory: 'crm',
  value: 'Up to ~$50,000 in credits',
  enhancedValue: '$50,000',
  shortDescription: '6 months of Zendesk Suite and Sales CRM free for up to 50 agents, plus 15% off your first paid year. Full customer support stack at zero initial cost.',
  description: `Zendesk for Startups gives qualified companies free access to Zendesk Suite and Zendesk Sales CRM for 6 months, covering up to 50 support and sales agents. This includes a monthly credit usable across core products like Support, Sell, Talk, Chat, Guide, and Explore, letting you stand up a full customer service stack without initial software cost.`,
  detailedDescription: `Zendesk for Startups gives qualified companies free access to Zendesk Suite and Zendesk Sales CRM for 6 months, covering up to 50 support and sales agents. This includes a monthly credit usable across core products like Support, Sell, Talk, Chat, Guide, and Explore, letting you stand up a full customer service stack without initial software cost.

What You Get:
• 6 months of Zendesk Suite (Support, Chat, Guide, Talk, Explore) free, for up to 50 agents
• 6 months of Zendesk Sales CRM (Sell) free, included in the same credit
• 15% discount on your first annual subscription after the free period
• Onboarding support and office hours with the startup success team
• Access to startup community events, office hours, and curated CX resources

What Credits Cover:
• Subscription fees for Zendesk Suite and Sales CRM for up to 50 agents during the 6-month program
• Core features: ticketing, omnichannel inbox (email, chat, social, voice), knowledge base, reporting, automations, and sales pipeline tools

What's NOT Included:
• Consulting services and custom implementation work
• Paid add-ons, third-party integrations, and "pay as you go" usage such as Talk minutes
• Any usage beyond the included agent count or outside the 6-month window

Best For:
• Early-stage SaaS, marketplaces, and product companies that need proper support and sales tooling from day one
• Startups expecting fast growth in tickets or leads who want scalable processes without up-front license costs

Not Ideal For:
• Teams already using Zendesk (previous or current paid customers are ineligible)
• Large companies above the employee/funding thresholds, or those needing heavy custom consulting`,
  benefits: [
    '6 months of Zendesk Suite free (Support, Chat, Guide, Talk, Explore)',
    '6 months of Zendesk Sales CRM (Sell) free',
    'Up to 50 support and sales agents covered',
    '15% discount on first annual subscription after free period',
    'Onboarding support and office hours with startup success team',
    'Access to startup community events and CX resources',
    'Full ticketing and omnichannel inbox (email, chat, social, voice)',
    'Knowledge base and self-service portal',
    'Reporting and analytics with Explore',
    'Automations and workflow tools',
    'Sales pipeline and CRM tools with Sell'
  ],
  eligibility: [
    'New Zendesk customer (no previous or active paid subscription)',
    'Fewer than 50 employees at time of application',
    'Venture funding up to Series A (some partner routes allow up to Series B)',
    'Must apply via startup/partner link with business email',
    'Early-stage startup building a product or service'
  ],
  applicationProcess: [
    'Go to the Zendesk for Startups partner-exclusive page',
    'Click the apply/join button to open the startup application form',
    'Enter company details: name, website, country, employee count, funding stage, industry',
    'Provide a short description of your product and CX needs',
    'Confirm you are a new Zendesk customer and meet the employee/funding criteria',
    'Submit the form; Zendesk reviews and emails decision within 3-7 business days',
    'Once approved, activate your Zendesk account using the promo',
    'Set billing to monthly (required for the promo code)',
    'Add up to 50 agents under the covered products'
  ],
  faqs: [
    {
      question: 'What\'s included in the 6 months free?',
      answer: 'You get full access to Zendesk Suite (Support, Chat, Guide, Talk, Explore) and Zendesk Sales CRM (Sell) for up to 50 agents. This covers ticketing, omnichannel inbox, knowledge base, reporting, automations, and sales pipeline tools.'
    },
    {
      question: 'Who is eligible for Zendesk for Startups?',
      answer: 'New Zendesk customers with fewer than 50 employees and venture funding up to Series A (some partner routes allow up to Series B). You must apply via a startup/partner link with a business email.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Zendesk typically reviews applications and sends decisions within 3-7 business days.'
    },
    {
      question: 'What happens after the 6 months?',
      answer: 'You get 15% off your first annual subscription when you convert to a paid plan. You can choose which Zendesk products to continue with based on your needs.'
    },
    {
      question: 'What\'s NOT covered by the credits?',
      answer: 'Consulting services, custom implementation work, paid add-ons, third-party integrations, "pay as you go" usage like Talk minutes, and any usage beyond 50 agents or outside the 6-month window.'
    },
    {
      question: 'Can existing Zendesk customers apply?',
      answer: 'No, this program is only for new Zendesk customers. Previous or current paid subscribers are not eligible.'
    }
  ],
  tags: ['customer-support', 'crm', 'helpdesk', 'sales', 'zendesk', 'startups', 'saas'],
  status: 'active',
  applicationUrl: 'https://www.zendesk.com/campaign/startups-partner-exclusive/',
  logoUrl: 'https://d1eipm3vz40hy0.cloudfront.net/images/logos/zendesk-logo.svg',
  brandIcon: 'https://d1eipm3vz40hy0.cloudfront.net/images/logos/zendesk-logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $50,000',
  savingsAmount: 50000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '💬'
};

// Find existing Zendesk deal(s) and remove them
const zendeskPatterns = ['zendesk'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isZendesk = zendeskPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isZendesk) {
    console.log(`Removing existing Zendesk deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isZendesk;
});

// Add the new comprehensive Zendesk deal
filteredDeals.push(zendeskDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Zendesk for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${zendeskDeal.title}`);
console.log(`- Value: ${zendeskDeal.value}`);
console.log(`- Application URL: ${zendeskDeal.applicationUrl}`);
console.log(`- Benefits: ${zendeskDeal.benefits.length} items`);
console.log(`- Eligibility: ${zendeskDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${zendeskDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${zendeskDeal.faqs.length} questions`);
