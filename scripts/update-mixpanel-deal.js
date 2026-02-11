const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Mixpanel for Startups deal data
const mixpanelDeal = {
  id: 'mixpanel-for-startups',
  slug: 'mixpanel-for-startups',
  title: 'Mixpanel for Startups — 1 Year Free Startup Plan (Up to 1B Events)',
  provider: 'Mixpanel',
  category: 'data',
  subcategory: 'analytics',
  value: '$150,000+ value',
  enhancedValue: '$150,000+',
  shortDescription: '1 year free on Mixpanel Startup Plan with up to 1 billion events, full Product Analytics, Session Replay, Signal AI, Experiments, and premium add-ons included.',
  description: `Mixpanel for Startups is an exclusive program providing early-stage companies with a full year of free access to Mixpanel's complete analytics platform. This is the most generous startup program in the product analytics space, offering unlimited feature access including advanced reports, Session Replay, premium add-ons, and support for up to 1 billion events per year.`,
  detailedDescription: `Mixpanel for Startups is an exclusive program providing early-stage companies with a full year of free access to Mixpanel's complete analytics platform. This is the most generous startup program in the product analytics space, offering unlimited feature access including advanced reports, Session Replay, premium add-ons, and support for up to 1 billion events per year.

What You Get:
• 1 year free on Mixpanel Startup Plan (exclusive offering, not available for purchase)
• Up to 1 billion events per year (~83 million events/month)
• Full analytics capabilities with zero feature restrictions:
  - Product Analytics (funnels, flows, retention, cohorts)
  - Web Analytics (page views, sessions, bounce rates)
  - Session Replay (watch user sessions and debug issues)
  - Signal (AI-powered insights and anomaly detection)
  - Experiments (A/B testing and feature flags)
  - Advanced segmentation and custom events
  - Data modeling and unlimited cohorts

Premium Add-ons Included:
• Data Pipelines (export data to warehouses)
• Group Analytics (B2B account-level tracking)
• Warehouse Connectors (import data from external sources)

Support and Community:
• Email support with fast response times
• Access to community of 11,000+ startup peers
• Pre-built templates and dashboards
• Fast setup via Autocapture (no manual event tagging required)

What's NOT Included:
• Usage beyond 1 billion annual events (overages billed separately)
• Enterprise features like SSO, dedicated account manager, custom SLAs
• Second year subscription (upgrade to Growth or Enterprise after year 1)
• Retroactive credits if previously a paying customer

Critical 90-Day Implementation Requirement:
You MUST start sending data to Mixpanel within 90 days of acceptance or be removed from the program permanently.`,
  benefits: [
    '1 year free on Mixpanel Startup Plan (valued at $150,000+)',
    'Up to 1 billion events per year (~83M events/month)',
    'Full Product Analytics: funnels, flows, retention, cohorts',
    'Web Analytics: page views, sessions, bounce rates',
    'Session Replay: watch user sessions and debug issues',
    'Signal: AI-powered insights and anomaly detection',
    'Experiments: A/B testing and feature flags',
    'Data Pipelines: export data to warehouses',
    'Group Analytics: B2B account-level tracking',
    'Warehouse Connectors: import from external sources',
    'Email support and 11,000+ startup community',
    'Pre-built templates and Autocapture for fast setup'
  ],
  eligibility: [
    'Founded less than 5 years ago (incorporated within last 5 years)',
    'Raised up to $8M USD in total funding',
    'New to paid Mixpanel plans (never been a paid customer)',
    'No prior Mixpanel offer redemption (first-time participant)',
    'Must implement within 90 days of acceptance (strict requirement)'
  ],
  applicationProcess: [
    'Visit the Mixpanel for Startups application page at mixpanel.com/startups-apply/',
    'Create a Mixpanel account or log in if you have a free account',
    'Complete the application form with company name, website, founding date',
    'Enter total funding raised (must be ≤ $8M USD)',
    'Describe your product and use case',
    '(Optional) Select referral partner from dropdown if referred by VC/accelerator',
    'Confirm eligibility by agreeing to program terms',
    'Submit — account is instantly provisioned with Startup Plan',
    'Within 90 days: Install Mixpanel SDK or use Autocapture to start sending data',
    'Build dashboards, set up funnels, enable Session Replay for the next 12 months'
  ],
  faqs: [
    {
      question: 'How much is the Mixpanel Startup Plan worth?',
      answer: 'The Startup Plan is valued at $150,000+ and includes features that would cost thousands extra on Growth plans, including Data Pipelines, Group Analytics, Warehouse Connectors, Session Replay, and Signal AI.'
    },
    {
      question: 'Who is eligible for Mixpanel for Startups?',
      answer: 'Startups founded within the last 5 years, with up to $8M in total funding, who are new to paid Mixpanel plans and have not redeemed other Mixpanel offers.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Instant! Your Startup Plan activates immediately upon form submission. No waiting period.'
    },
    {
      question: 'What is the 90-day implementation requirement?',
      answer: 'You MUST start sending data to Mixpanel within 90 days of acceptance. Failure to implement results in permanent removal from the program and disqualification from rejoining.'
    },
    {
      question: 'How many events are included?',
      answer: 'Up to 1 billion events per year (~83 million events/month). This covers most early-stage startups\' full user base for the entire year.'
    },
    {
      question: 'What happens after year 1?',
      answer: 'You\'ll need to upgrade to Growth or Enterprise plan. Growth Plan starts at ~$20/month for low volumes. Evaluate your event volumes by Month 11 to plan accordingly.'
    },
    {
      question: 'What\'s NOT included?',
      answer: 'Enterprise features like SSO, dedicated account manager, custom SLAs. Also, usage beyond 1B events/year is billed separately, and the program is one year only.'
    },
    {
      question: 'Should I apply if I\'m not ready to implement?',
      answer: 'No! Only apply when you have engineering bandwidth to implement within the first month. The 90-day deadline is strictly enforced.'
    }
  ],
  tags: ['analytics', 'product-analytics', 'user-insights', 'mixpanel', 'session-replay', 'ab-testing', 'startups'],
  status: 'active',
  applicationUrl: 'https://mixpanel.com/startups-apply/',
  logoUrl: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg',
  brandIcon: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $150,000+',
  savingsAmount: 150000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing Mixpanel deal(s) and remove them
const mixpanelPatterns = ['mixpanel'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMixpanel = mixpanelPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isMixpanel) {
    console.log(`Removing existing Mixpanel deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMixpanel;
});

// Add the new comprehensive Mixpanel deal
filteredDeals.push(mixpanelDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Mixpanel for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${mixpanelDeal.title}`);
console.log(`- Value: ${mixpanelDeal.value}`);
console.log(`- Application URL: ${mixpanelDeal.applicationUrl}`);
console.log(`- Benefits: ${mixpanelDeal.benefits.length} items`);
console.log(`- Eligibility: ${mixpanelDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${mixpanelDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${mixpanelDeal.faqs.length} questions`);
