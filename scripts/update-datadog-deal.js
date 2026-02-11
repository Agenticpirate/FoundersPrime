const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Datadog for Startups deal data
const datadogDeal = {
  id: 'datadog-for-startups',
  slug: 'datadog-for-startups',
  title: 'Datadog for Startups — $100,000 in Credits',
  provider: 'Datadog',
  category: 'saas-discounts',
  subcategory: 'monitoring',
  value: '$30,000-$100,000 in credits',
  enhancedValue: '$100,000',
  shortDescription: 'Up to $100,000 in Datadog Pro credits for 12 months. Full platform access for Infrastructure, APM, Log Management, and Security. Includes dedicated Program Manager and CSM.',
  description: `Datadog provides unified monitoring, observability, and security for cloud applications, processing 1+ trillion data points daily for 27,000+ customers. Get up to $100,000 in Datadog Pro credits.`,
  detailedDescription: `Datadog provides unified monitoring, observability, and security for cloud applications, processing 1+ trillion data points daily for 27,000+ customers. Get up to $100,000 in Datadog Pro credits.

What's Covered:
• $30,000-$100,000 in Datadog Pro credits (valid for 1 year)
• Full Platform Access: Infrastructure, APM, Log Management, Security (no watered-down tiers)
• Dedicated Program Manager: Personal PM for guidance and support
• Customer Success Manager: CSM for monitoring best practices and usage optimization
• Onboarding Support: Orientation for new users and kickoff call with support team
• Quarterly Check-ins: Progress reviews every 3 months
• Learning Center Access: Training resources and Datadog certification materials
• Extended Product Trials: Access to additional Datadog products beyond core offering
• Startup Community: Access to events, networking, and founder community

What's NOT Covered:
• Existing or past Datadog customers
• Companies beyond Series A funding stage
• Startups without partner referral/affiliation
• Non-technical businesses without cloud infrastructure

Key Insights:
• Value Breakdown: Datadog Pro costs $15-31 per host/month (infrastructure) + $31-40 per host for APM. Credits up to $100,000 can cover 5+ years of standard usage
• No Limitations: Full Pro tier access—no watered-down features, no hidden limits
• Integration Power: 600+ technologies including AI-native tools: Anthropic, Cursor, OpenAI, Pinecone, AWS, Azure, GCP
• LLM Observability: Dedicated monitoring for AI model performance, costs, and output quality
• Setup Speed: "Set up in an afternoon, not weeks"
• Partner Path: 100+ VCs, accelerators, cloud providers (YC, Techstars, AWS Activate, Google for Startups, a16z, Sequoia)
• Complete Stack: Infrastructure Monitoring, APM, Log Management, Error Tracking, Security, Session Replay, Synthetic Monitoring`,
  benefits: [
    '$30,000-$100,000 in Datadog Pro credits (valid for 1 year)',
    'Full Platform Access: Infrastructure, APM, Log Management, Security',
    'Dedicated Program Manager for guidance and support',
    'Customer Success Manager for monitoring best practices',
    'Onboarding support with orientation and kickoff call',
    'Quarterly check-ins every 3 months',
    'Learning Center access and Datadog certification materials',
    'Extended product trials beyond core offering',
    'Startup community access: events, networking, founder community',
    '600+ integrations including AI-native tools'
  ],
  eligibility: [
    'Series A or earlier (Pre-seed, Seed, or Series A stage)',
    'Partner referral required (affiliated with VC, accelerator, or partner program)',
    'New to Datadog (cannot be current or past customer)',
    'No previous DDFS credits (first-time program participants only)',
    'Active cloud infrastructure (real need for monitoring/observability)',
    'Valid company website (fully functioning business presence)'
  ],
  applicationProcess: [
    'Check partner eligibility (YC, AWS Activate, a16z, Sequoia, Google for Startups, Techstars, 500 Global, 100+ more)',
    'Visit https://www.datadoghq.com/partner/datadog-for-startups/',
    'Complete application form with company details',
    'Provide funding round (Bootstrapped/Pre-Seed/Seed/Series A) and total funding',
    'Select referring partner(s) from dropdown',
    'Confirm your company is new to Datadog',
    'Optionally start free Datadog trial while application is reviewed',
    'Await application review (2-5 business days)',
    'Once approved, credits applied to account',
    'Get assigned Program Manager and Customer Success Manager',
    'Schedule kickoff call within 2 weeks'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: '$30,000-$100,000 in Datadog Pro credits valid for 12 months. For a startup with 20 hosts running full stack monitoring, credits can cover 5+ years of standard usage.'
    },
    {
      question: 'Who is eligible for Datadog for Startups?',
      answer: 'Series A or earlier startups with partner referral (YC, Techstars, AWS Activate, Google for Startups, a16z, Sequoia, 100+ more). Must be new to Datadog with no previous credits.'
    },
    {
      question: 'Is this a watered-down version?',
      answer: 'No. Unlike many startup programs, Datadog provides full Pro tier access—no watered-down features, no hidden limits. Access the complete platform from day one.'
    },
    {
      question: 'What support is included?',
      answer: 'Dedicated Program Manager, Customer Success Manager, onboarding support, quarterly check-ins, and access to Learning Center and certification materials.'
    },
    {
      question: 'What integrations are available?',
      answer: '600+ technologies including AI-native tools: Anthropic, Cursor, OpenAI, Pinecone, Qdrant, Vercel, Weaviate, AWS, Azure, GCP, and more.'
    },
    {
      question: 'How fast is setup?',
      answer: '"Set up in an afternoon, not weeks"—no lengthy sales calls, complicated onboarding, or weeks of configuration. Start your free trial while application is under review.'
    }
  ],
  tags: ['monitoring', 'observability', 'apm', 'logging', 'security', 'devops', 'infrastructure', 'ai', 'startups', 'datadog'],
  status: 'active',
  applicationUrl: 'https://www.datadoghq.com/partner/datadog-for-startups/',
  logoUrl: 'https://www.datadoghq.com/favicon.ico',
  brandIcon: 'https://www.datadoghq.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $100,000',
  savingsAmount: 100000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing Datadog deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isDatadog = 
    slugLower.includes('datadog') ||
    titleLower.includes('datadog') ||
    providerLower === 'datadog';
  
  if (isDatadog) {
    console.log(`Removing existing Datadog deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isDatadog;
});

// Add the new comprehensive Datadog deal
filteredDeals.push(datadogDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Datadog for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${datadogDeal.title}`);
console.log(`- Value: ${datadogDeal.value}`);
console.log(`- Application URL: ${datadogDeal.applicationUrl}`);
console.log(`- Benefits: ${datadogDeal.benefits.length} items`);
console.log(`- Eligibility: ${datadogDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${datadogDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${datadogDeal.faqs.length} questions`);
