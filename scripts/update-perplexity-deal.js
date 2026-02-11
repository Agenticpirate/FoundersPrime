#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const perplexityDeal = {
  id: 'perplexity-for-startups',
  slug: 'perplexity-for-startups',
  title: 'Perplexity for Startups — $5,000 in AI Credits + Enterprise Pro',
  provider: 'Perplexity AI',
  category: 'ai',
  subcategory: 'ai-development',
  tags: ['ai', 'llm', 'api-credits', 'research', 'search', 'enterprise', 'startup-program'],
  value: '$5,000+ in credits',
  savings: '$10,500+',
  savingsAmount: 10500,
  shortDescription: '$5,000 API credits + 6 months Enterprise Pro (up to 50 seats). Real-time web search with citations, multi-model access.',
  description: `Perplexity for Startups is an accelerator program by Perplexity AI, the conversational answer engine that delivers research with real-time web access and cited sources. Launched in April 2025 by CEO Aravind Srinivas, this program empowers early-stage founders to prototype, research, and build AI products without worrying about soaring LLM infrastructure costs.

What You Get:

$5,000 in Perplexity API Credits
Deploy Perplexity's Sonar LLM models into your own applications. Perfect for building vertical search engines, AI agents, lead generation bots, customer support systems, or any AI product requiring reliable, cited research.

6 Months of Perplexity Enterprise Pro (Up to 50 Seats)
• Real-time web search with citations across 10 sources per query
• Integration with Google Drive, Dropbox, SharePoint, Crunchbase, FactSet
• In-depth multi-step research and smart follow-up questions
• Unlimited Pro searches and collaboration tools
• Access to premium AI models (GPT-4, Claude, Sonar Large, Gemini)
• Collections and saved research folders
• Team analytics and usage insights

What Credits Cover:
• Perplexity API usage for production applications (Sonar models)
• Enterprise Pro subscriptions for unlimited team seats during 6-month period
• Real-time web search integration within your apps
• Advanced LLM inference and context windows
• All supported AI model access (Claude, Grok, Gemini, etc.)

What Credits DON'T Cover:
• Usage beyond the $5,000 API credit allocation
• Enterprise Pro subscription renewals after 6-month period
• Custom integration support (standard support included)
• White-label or reseller arrangements
• Training, consulting, or implementation services

Best For: AI product builders integrating search capabilities, early-stage SaaS founders needing research infrastructure, startup teams conducting deep market research, companies building AI agents or chatbots, vertical search platforms, lead generation tools.

Not Ideal For: Consumer apps with minimal AI research needs, existing Enterprise Pro customers, bootstrapped solo founders without team needs, companies already committed to alternative LLM providers.

Notable Partners: Y Combinator, 500 Global, Plug and Play, TechStars, Khosla Impact, and 100+ VCs, accelerators, and incubators.

Cost Context:
• Enterprise Pro alone: $200-300/seat/month (50 seats = $10K-15K/month value)
• API credits at standard rates: ~$0.005 per query ($5K = ~1M queries)
• Total value: ~$10,500-15,500 over 6 months`,
  eligibility: [
    'Founded less than 5 years ago',
    'Raised $20M or less in equity (Pre-Series B or early Series B)',
    'Associated with approved Startup Partner (YC, 500 Global, TechStars, etc.)',
    'Not current Enterprise Pro subscriber',
    'First-time claimant (no previous Perplexity Startups credits)',
    'Not building a competing search engine or LLM provider'
  ],
  applicationProcess: [
    'Go to perplexity.ai/startups and review approved Startup Partners list',
    'Verify your startup meets all eligibility criteria',
    'Click "Apply Now" and create a Perplexity account (business email)',
    'Complete application: company name, founding date, funding raised, sector, VC partner, product description',
    'Verify partner affiliation — Perplexity confirms your association',
    'Await approval email (typically 3-7 business days)',
    'Once approved, credits appear in your account dashboard',
    'Access Enterprise Pro for your team (up to 50 seats)',
    'Begin building with Sonar API and Enterprise Pro'
  ],
  benefits: [
    '$5,000 in Perplexity API credits',
    '6 months Enterprise Pro (up to 50 seats)',
    'Real-time web search with citations',
    'Multi-model access (GPT-4, Claude, Sonar, Gemini)',
    'Unlimited Pro searches',
    'Google Drive, Dropbox, SharePoint integrations',
    'Team analytics and usage insights'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Startups founded less than 5 years ago, raised $20M or less, and associated with an approved Startup Partner (YC, 500 Global, TechStars, etc.).'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3-7 business days. Perplexity verifies your partner affiliation during this time.'
    },
    {
      question: 'What if my VC/accelerator is not on the approved list?',
      answer: 'Ask your accelerator, VC firm, or incubator to apply for Startup Partner status with Perplexity.'
    },
    {
      question: 'What happens after 6 months?',
      answer: 'Enterprise Pro subscription ends. You can renew at discounted startup rates or continue with API credits if remaining.'
    },
    {
      question: 'Can I use the API for production apps?',
      answer: 'Yes! The $5,000 API credits are specifically for deploying Sonar models in production applications.'
    },
    {
      question: 'How many team members can use Enterprise Pro?',
      answer: 'Up to 50 seats are included with unlimited queries during the 6-month period.'
    }
  ],
  applicationUrl: 'https://www.perplexity.ai/hub/blog/perplexity-for-startups',
  providerWebsite: 'https://www.perplexity.ai',
  logoUrl: 'https://www.perplexity.ai/favicon.ico',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '2-5 days',
  approvalTime: '3-7 days',
  difficulty: 'medium',
  successRate: '75%+',
  lastVerified: '2026-01-27',
  appliedCount: 500,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add Perplexity deal
const existingIndex = deals.findIndex(d => 
  d.slug?.includes('perplexity') ||
  d.title?.toLowerCase().includes('perplexity')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...perplexityDeal };
  console.log('✅ Updated existing Perplexity deal');
} else {
  deals.push(perplexityDeal);
  console.log('✅ Added new Perplexity deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
