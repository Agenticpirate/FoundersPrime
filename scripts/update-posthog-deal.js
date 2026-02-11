const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// PostHog for Startups deal data
const posthogDeal = {
  id: 'posthog-for-startups',
  slug: 'posthog-for-startups',
  title: 'PostHog for Startups — $50,000 in Credits + Free Merch',
  provider: 'PostHog',
  category: 'data',
  subcategory: 'analytics',
  value: '$50,000 in credits',
  enhancedValue: '$50,000',
  shortDescription: '$50,000 in credits (valid 1 year) for full Product OS suite: analytics, session replay, feature flags, A/B experiments, surveys. Plus free founder merch and partner benefits.',
  description: `PostHog for Startups provides $50,000 in credits for early-stage companies to access the full Product OS suite including product analytics, session replay, feature flags, A/B experiments, surveys, and data warehouse. The program also includes exclusive founder merch and partner benefits.`,
  detailedDescription: `PostHog for Startups provides $50,000 in credits for early-stage companies to access the full Product OS suite including product analytics, session replay, feature flags, A/B experiments, surveys, and data warehouse. The program also includes exclusive founder merch and partner benefits from Incident.io ($1,500 off), Speakeasy (50% off for 6 months), and Chroma ($5,000 credit).

What You Get:
• $50,000 in PostHog credits (valid for 1 year across all products)
• Exclusive founder swag (laptop stickers, hats, t-shirts)

Partner Benefits:
• $1,500 off Incident.io teams plan
• 50% off Speakeasy for 6 months
• $5,000 Chroma credit

Full Platform Access:
• Product analytics (events, funnels, retention, cohorts)
• Session replay (watch user sessions)
• Feature flags (gradual rollouts)
• A/B testing & experiments
• User surveys
• Data warehouse integration
• Open-source product

What's Covered:
• All PostHog product usage (analytics, replays, feature flags, experiments, surveys)
• Up to $50,000 in credits over 12 months
• Free merch and partner discounts

What's NOT Covered:
• Usage beyond $50,000 (standard billing applies)
• Priority support (not included on startups plan)
• Business Associate Agreement (BAA) under Boost plan
• Combining with other discounts or offers`,
  benefits: [
    '$50,000 in credits valid for 1 year',
    'Exclusive founder merch (stickers, hats, t-shirts)',
    '$1,500 off Incident.io teams plan',
    '50% off Speakeasy for 6 months',
    '$5,000 Chroma credit',
    'Product analytics (events, funnels, retention, cohorts)',
    'Session replay to watch user sessions',
    'Feature flags for gradual rollouts',
    'A/B testing and experiments',
    'User surveys',
    'Data warehouse integration',
    'Open-source product with full transparency'
  ],
  eligibility: [
    'Startup under 2 years old (founded within last 2 years)',
    'Raised less than $5M in funding',
    'New or existing PostHog user (can apply even if signed up before)',
    'Credit card required (must add valid payment method)'
  ],
  applicationProcess: [
    'Create a PostHog account at app.posthog.com/signup',
    'Add a credit card to your account (required for eligibility)',
    'Complete the onboarding flow',
    'Submit the startup program application form at app.posthog.com/startups',
    'Provide company name, website, founding date, total funding, and product description',
    'Await approval (3–7 business days via email)',
    'Once approved, $50,000 in credits are applied (valid for 12 months)',
    'Start using PostHog\'s full Product OS suite and claim your free merch'
  ],
  faqs: [
    {
      question: 'How much credit do I get?',
      answer: '$50,000 in PostHog credits valid for 1 year across all products (analytics, session replay, feature flags, experiments, surveys).'
    },
    {
      question: 'Who is eligible for PostHog for Startups?',
      answer: 'Startups under 2 years old with less than $5M in funding. You can apply even if you signed up for PostHog before this deal existed.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3–7 business days. You\'ll be notified by email.'
    },
    {
      question: 'What partner benefits are included?',
      answer: '$1,500 off Incident.io teams plan, 50% off Speakeasy for 6 months, and $5,000 Chroma credit.'
    },
    {
      question: 'Do I need a credit card?',
      answer: 'Yes, you must add a valid payment method to your PostHog account to be eligible for the startup program.'
    },
    {
      question: 'What happens after 12 months?',
      answer: 'Standard billing applies for usage beyond $50,000 or after the 12-month period. PostHog has competitive pricing and a free plan with limited features.'
    }
  ],
  tags: ['analytics', 'product-analytics', 'session-replay', 'posthog', 'feature-flags', 'ab-testing', 'open-source', 'startups'],
  status: 'active',
  applicationUrl: 'https://app.posthog.com/startups',
  logoUrl: 'https://posthog.com/brand/posthog-logo.svg',
  brandIcon: 'https://posthog.com/brand/posthog-logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $50,000',
  savingsAmount: 50000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing PostHog deal(s) and remove them
const posthogPatterns = ['posthog'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isPostHog = posthogPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isPostHog) {
    console.log(`Removing existing PostHog deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isPostHog;
});

// Add the new comprehensive PostHog deal
filteredDeals.push(posthogDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ PostHog for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${posthogDeal.title}`);
console.log(`- Value: ${posthogDeal.value}`);
console.log(`- Application URL: ${posthogDeal.applicationUrl}`);
console.log(`- Benefits: ${posthogDeal.benefits.length} items`);
console.log(`- Eligibility: ${posthogDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${posthogDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${posthogDeal.faqs.length} questions`);
