const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// DevRev for Startups deal data
const devrevDeal = {
  id: 'devrev-for-startups',
  slug: 'devrev-for-startups',
  title: 'DevRev for Startups — $10,000 in Platform Credits',
  provider: 'DevRev',
  category: 'saas-discounts',
  subcategory: 'customer-support',
  value: '$10,000 in credits (12 months)',
  enhancedValue: '$10,000',
  shortDescription: 'Up to $10,000 in free credits for 12 months on DevRev\'s AI-powered conversational platform that unifies customer support and product development.',
  description: `DevRev offers early-stage startups up to $10,000 in free credits for 12 months on their AI-powered conversational platform that unifies customer support and product development. The platform uses AI to automatically resolve 85% of support tickets while connecting customer feedback directly to your development workflow.`,
  detailedDescription: `DevRev offers early-stage startups up to $10,000 in free credits for 12 months on their AI-powered conversational platform that unifies customer support and product development. The platform uses AI to automatically resolve 85% of support tickets while connecting customer feedback directly to your development workflow.

What's Covered:
• Pro-level platform access for 12 months
• $6K credits at sign-up + $4K via onboarding milestones
• AI-powered chatbots and support automation
• Knowledge Graph for unified data management
• Integration with Slack, GitHub, Jira, Zendesk, Salesforce
• Technical experts, training modules, and learning guides

What's NOT Covered:
• Usage beyond $10K credit limit
• Enterprise-level custom features
• Dedicated account management (Pro tier only)

Best For:
• SaaS startups building customer support workflows
• API-first companies needing unified support-product tools
• Teams wanting to reduce manual ticket management
• Early-stage startups scaling customer operations

Not Ideal For:
• Established companies with existing contracts
• Non-funded bootstrapped startups (separate evaluation)
• Companies not backed by VC ecosystem partners

Key Insights:
• AI-first platform resolves 85% of support tickets automatically, making agents 4x more productive
• Milestone-based credits: Get $6K upfront + $4K by completing onboarding tasks
• 50% discount applies on follow-up annual commitment if activated within 6 months
• 100+ startups including Shipsy, 100ms, Goodmeetings, and Jar already using DevRev
• Unified workflow: Single platform for support, product development, and customer insights
• Bootstrapped startups can apply separately—contact startups@devrev.ai for evaluation
• Access curated startup perks marketplace with additional $200K+ in partner credits`,
  benefits: [
    'Up to $10,000 in platform credits (12 months free)',
    '$6K credits at sign-up + $4K via onboarding milestones',
    'Turing AI chatbot with automatic ticket resolution (85% deflection)',
    'Integrations: Slack, GitHub, Jira, Zendesk, Salesforce, and more',
    'Multi-level support (L1-L4), semantic search, RAG pipeline',
    'Real-time analytics, AI-driven clustering, sentiment detection',
    'Technical expert access and DevRevU training',
    '50% off on one-year commitment after credits expire'
  ],
  eligibility: [
    'Early-stage startup (Incubator/Accelerator backed OR Seed/Series A funded)',
    'VC ecosystem portfolio (Associated with DevRev\'s partner network)',
    'New customer to DevRev (No existing account or subscription)',
    'Founded within last 5-10 years (depending on funding stage)',
    'Active product development (Building customer-facing solutions)',
    'NOT: Existing DevRev customers',
    'NOT: Companies beyond Series A (unless raised within last 12 months)',
    'NOT: Startups without VC/accelerator backing (separate application)'
  ],
  applicationProcess: [
    'Visit https://devrev.ai/startups/apply and click "Get started for free"',
    'Complete the startup application form with company details, funding stage, and VC partner info',
    'Verify your eligibility (Seed/Series A funding or accelerator backing)',
    'Submit application for review by the DevRev team (3-5 days processing)',
    'Receive approval notification with credit activation instructions',
    'Claim $6K initial credits upon account setup',
    'Complete onboarding milestones to unlock additional $4K credits',
    'Activate follow-up discount (50% off) within 6 months of credit expiration'
  ],
  faqs: [
    {
      question: 'How much credit do I get?',
      answer: 'Up to $10,000 in platform credits over 12 months. You receive $6K at sign-up and can unlock an additional $4K by completing onboarding milestones.'
    },
    {
      question: 'Who is eligible for DevRev for Startups?',
      answer: 'Early-stage startups that are Incubator/Accelerator backed OR have Seed/Series A funding. You must be a new DevRev customer and part of the VC ecosystem partner network.'
    },
    {
      question: 'What happens after credits expire?',
      answer: 'You can activate a 50% discount on a one-year commitment if done within 6 months of credit expiration.'
    },
    {
      question: 'Can bootstrapped startups apply?',
      answer: 'Yes, but through a separate evaluation process. Contact startups@devrev.ai for evaluation.'
    },
    {
      question: 'What integrations are supported?',
      answer: 'DevRev integrates with Slack, GitHub, Jira, Zendesk, Salesforce, and many more tools.'
    },
    {
      question: 'How does the AI resolve tickets?',
      answer: 'DevRev\'s Turing AI chatbot automatically resolves 85% of support tickets, making agents 4x more productive through semantic search and RAG pipeline technology.'
    }
  ],
  tags: ['customer-support', 'ai', 'saas', 'product-development', 'startups', 'devrev', 'chatbot'],
  status: 'active',
  applicationUrl: 'https://devrev.ai/startups/apply',
  logoUrl: 'https://devrev.ai/favicon.ico',
  brandIcon: 'https://devrev.ai/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $10,000',
  savingsAmount: 10000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🤖'
};

// Find existing DevRev deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isDevRev = 
    slugLower.includes('devrev') ||
    titleLower.includes('devrev') ||
    providerLower === 'devrev';
  
  if (isDevRev) {
    console.log(`Removing existing DevRev deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isDevRev;
});

// Add the new comprehensive DevRev deal
filteredDeals.push(devrevDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ DevRev for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${devrevDeal.title}`);
console.log(`- Value: ${devrevDeal.value}`);
console.log(`- Application URL: ${devrevDeal.applicationUrl}`);
console.log(`- Benefits: ${devrevDeal.benefits.length} items`);
console.log(`- Eligibility: ${devrevDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${devrevDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${devrevDeal.faqs.length} questions`);
