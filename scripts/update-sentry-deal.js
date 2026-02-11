const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Sentry for Startups deal data
const sentryDeal = {
  id: 'sentry-for-startups',
  slug: 'sentry-for-startups',
  title: 'Sentry for Startups — Up to $5,000 in Credits + Priority Support',
  provider: 'Sentry',
  category: 'development',
  subcategory: 'devops',
  value: 'Up to $5,000 in credits',
  enhancedValue: '$5,000',
  shortDescription: 'Up to $5,000 in credits for enterprise-grade error monitoring, performance tracking, session replay, and AI-powered debugging. Plus priority support.',
  description: `Sentry for Startups provides up to $5,000 in credits for early-stage companies to access enterprise-grade error monitoring, performance tracking, and debugging tools. Sentry helps developers catch bugs before users do, with real-time error tracking, distributed tracing, session replay, and AI-powered debugging across web, mobile, and backend applications.`,
  detailedDescription: `Sentry for Startups provides up to $5,000 in credits for early-stage companies to access enterprise-grade error monitoring, performance tracking, and debugging tools. Sentry helps developers catch bugs before users do, with real-time error tracking, distributed tracing, session replay, and AI-powered debugging across web, mobile, and backend applications.

What You Get:
• Up to $5,000 in Sentry credits to cover platform subscription costs
• Priority support for faster issue resolution and technical guidance

Full Platform Access:
• Error monitoring (real-time exception tracking)
• Tracing (distributed tracing across services)
• Session Replay (watch user sessions leading to errors)
• Seer (AI-powered root cause analysis and debugging)
• Logs (centralized logging)
• Uptime monitoring (endpoint health checks)
• Profiling (code-level performance analysis)
• Cron monitoring (scheduled job tracking)
• 100+ integrations (Slack, Jira, GitHub, GitLab, PagerDuty, etc.)

What Credits Cover:
• Sentry subscription fees across all pricing tiers
• Error events, transactions, replays, and data retention
• Advanced features like distributed tracing, profiling, and session replay
• Integration usage and API access
• Priority support during the credit period

What Credits DON'T Cover:
• Usage beyond the $5,000 credit allocation (standard billing applies)
• Third-party services or integrations outside Sentry's platform
• Custom enterprise features requiring separate contracts
• Team training or professional services`,
  benefits: [
    'Up to $5,000 in Sentry credits',
    'Priority support for faster issue resolution',
    'Error monitoring with real-time exception tracking',
    'Distributed tracing across services',
    'Session Replay to watch user sessions leading to errors',
    'Seer AI-powered root cause analysis and debugging',
    'Centralized logging',
    'Uptime monitoring for endpoint health checks',
    'Profiling for code-level performance analysis',
    'Cron monitoring for scheduled job tracking',
    '100+ integrations (Slack, Jira, GitHub, GitLab, PagerDuty)',
    'Release tracking to identify which deployments introduced bugs'
  ],
  eligibility: [
    'Founded in the last 2 years (startup must be 2 years old or younger)',
    'Raised less than $5M in venture capital',
    'New to paying for Sentry (cannot be a current paying customer)',
    'YC/a16z deals don\'t stack — check dedicated portals for separate offers'
  ],
  applicationProcess: [
    'Create a free Sentry account at sentry.io/signup/',
    'Set up your organization and note your Sentry organization slug (from your URL)',
    'Go to the Sentry for Startups application page at sentry.io/for/startups/apply/',
    'Complete the form: startup name, website, Sentry org slug, founder name(s), contact email',
    'Provide founding date and funding details (total amount and investor names)',
    'Agree to Sentry\'s privacy policy and submit',
    'Await approval (typically 2–3 business days)',
    'Once approved, $5,000 credit is applied to your Sentry account',
    'Start integrating Sentry SDKs and begin monitoring errors, performance, and sessions'
  ],
  faqs: [
    {
      question: 'How much credit do I get?',
      answer: 'Up to $5,000 in Sentry credits to cover platform subscription costs, plus priority support during the credit period.'
    },
    {
      question: 'Who is eligible for Sentry for Startups?',
      answer: 'Startups founded in the last 2 years, with less than $5M in venture capital raised, who are new to paying for Sentry.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 2–3 business days after submitting the application.'
    },
    {
      question: 'What features are included?',
      answer: 'Full platform access including error monitoring, distributed tracing, session replay, AI-powered debugging (Seer), logs, uptime monitoring, profiling, cron monitoring, and 100+ integrations.'
    },
    {
      question: 'What\'s NOT covered?',
      answer: 'Usage beyond the $5,000 credit allocation, third-party services outside Sentry, custom enterprise features requiring separate contracts, and team training or professional services.'
    },
    {
      question: 'Can I combine this with YC or a16z deals?',
      answer: 'No, YC and a16z have separate dedicated portals with their own offers. This startup program cannot be combined with those deals.'
    },
    {
      question: 'What happens after credits run out?',
      answer: 'Standard billing applies. Developer plan starts at $29/month, Team plan at $80/month, Business plan has custom pricing.'
    }
  ],
  tags: ['error-monitoring', 'debugging', 'devops', 'sentry', 'performance', 'session-replay', 'ai-debugging', 'startups'],
  status: 'active',
  applicationUrl: 'https://sentry.io/for/startups/apply/',
  logoUrl: 'https://sentry.io/_assets2/static/sentry-logo-dark-d4c2c0e5e1e6e0e0e0e0e0e0e0e0e0e0.svg',
  brandIcon: 'https://sentry.io/_assets2/static/sentry-logo-dark-d4c2c0e5e1e6e0e0e0e0e0e0e0e0e0e0.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $5,000',
  savingsAmount: 5000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🐛'
};

// Find existing Sentry deal(s) and remove them
const sentryPatterns = ['sentry'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isSentry = sentryPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isSentry) {
    console.log(`Removing existing Sentry deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isSentry;
});

// Add the new comprehensive Sentry deal
filteredDeals.push(sentryDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Sentry for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${sentryDeal.title}`);
console.log(`- Value: ${sentryDeal.value}`);
console.log(`- Application URL: ${sentryDeal.applicationUrl}`);
console.log(`- Benefits: ${sentryDeal.benefits.length} items`);
console.log(`- Eligibility: ${sentryDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${sentryDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${sentryDeal.faqs.length} questions`);
