const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Cloudflare for Startups deal data
const cloudflareDeal = {
  id: 'cloudflare-for-startups',
  slug: 'cloudflare-for-startups',
  title: 'Cloudflare for Startups — Up to $250,000 in Credits',
  provider: 'Cloudflare',
  category: 'cloud-credits',
  subcategory: 'cdn-security',
  value: '$5,000 - $250,000 in credits',
  enhancedValue: '$250,000',
  shortDescription: 'Tier-based credits ($5K/$25K/$100K/$250K) for 12 months. Enterprise domains, DDoS protection, WAF, Workers compute, R2 storage, Workers AI, and Zero Trust security.',
  description: `Cloudflare operates one of the world's largest networks powering 30+ million internet properties, offering startups enterprise-grade performance, security, and developer tools. Get up to $250,000 in credits.`,
  detailedDescription: `Cloudflare operates one of the world's largest networks powering 30+ million internet properties, offering startups enterprise-grade performance, security, and developer tools. Get up to $250,000 in credits.

What's Covered:
• Flex Usage Credits: $5K / $25K / $100K / $250K credits valid for 1 year
• Enterprise Domains: Up to 3 domains with enterprise-level services
• DDoS Protection: Unmetered mitigation with network prioritization
• Global CDN: Content delivery across Cloudflare's massive network
• Web Application Firewall: Advanced WAF with 50 custom rulesets
• Zero Trust Security: Complete Zero Trust network access tools
• Workers & Compute: Serverless compute, Workers, Durable Objects, Workflows
• Databases & Storage: R2 storage ($10K cap), Workers KV, D1, Queues
• AI Services: Workers AI ($50K cap for open-source models), Vectorize, AI Gateway
• Performance Tools: Argo smart routing, Load Balancing, Cache Reserve ($10K cap)
• Media Services: Image transformations, Stream, Cloudflare Calls
• 100% Uptime: Reliability guarantee with 24/7/365 email support
• Workers Launchpad Access: Funding connections and VC network opportunities

Tier Requirements:
• $5K - Bootstrapped/Stealth: No funding requirement
• $25K - Up-and-Coming: Funded up to $1M, active LinkedIn profile
• $100K - Seed-Funded: Funded $1M-$5M, affiliated with 250+ approved partners
• $250K - High Growth: Tier 1 VC/accelerator, high-growth AI companies, or Workers Launchpad

Key Insights:
• Zero egress fees: Unlike AWS/GCP, no bandwidth costs when serving from R2 storage
• Workers AI: $50K cap for 50+ open-source models (Llama, Mistral) with sub-50ms latency in 310+ cities
• Enterprise Features: Up to 3 enterprise-level domains with advanced WAF, DDoS, 100% uptime SLA
• Workers Launchpad: Apply for funding connections with VC partners
• Setup Speed: Most startups live within an afternoon`,
  benefits: [
    'Flex Usage Credits: $5K / $25K / $100K / $250K valid for 1 year',
    'Up to 3 enterprise domains with enterprise-level services',
    'Unmetered DDoS protection with network prioritization',
    'Global CDN across Cloudflare\'s massive network',
    'Advanced WAF with 50 custom rulesets',
    'Zero Trust Security: Complete network access tools',
    'Workers & Compute: Serverless, Durable Objects, Workflows',
    'R2 storage ($10K cap) with zero egress fees',
    'Workers AI ($50K cap): 50+ open-source models',
    'Performance: Argo smart routing, Load Balancing, Cache Reserve',
    'Media: Image transformations, Stream, Cloudflare Calls',
    '100% uptime guarantee with 24/7/365 email support',
    'Workers Launchpad: Funding connections and VC network'
  ],
  eligibility: [
    'Building software product/service with active website',
    'Founded within last 5 years (2021-2026)',
    'Valid website and email (matching company domain)',
    'Funded up to Series B (tier-dependent)',
    'New to program (no prior Cloudflare for Startups participation)',
    '$5K tier: Bootstrapped/stealth, no funding required',
    '$25K tier: Funded up to $1M with active LinkedIn profile',
    '$100K tier: Funded $1M-$5M, affiliated with 250+ approved partners',
    '$250K tier: Tier 1 VC/accelerator, high-growth AI, or Workers Launchpad'
  ],
  applicationProcess: [
    'Create Cloudflare account at https://dash.cloudflare.com/sign-up',
    'Add a valid credit card to your account (required)',
    'Visit https://www.cloudflare.com/forstartups/',
    'Complete application form with company details, funding stage',
    'Select your accelerator/VC partner from the dropdown',
    'Enter your batch year or cohort information',
    'Submit application and receive confirmation email',
    'Await application review (3-7 business days)',
    'Check inbox for confirmation that credits have been activated',
    'Credits available immediately for all qualifying services',
    'Valid for 1 year or until fully consumed'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: '$5K (bootstrapped), $25K (up to $1M funded), $100K ($1M-$5M funded with partner), or $250K (Tier 1 VC, high-growth AI, or Workers Launchpad). Credits valid for 12 months.'
    },
    {
      question: 'What makes Cloudflare different for AI startups?',
      answer: 'Zero egress fees on R2 storage (unlike AWS/GCP), $50K Workers AI cap for 50+ open-source models with sub-50ms latency in 310+ cities. AI companies get special consideration for $250K tier.'
    },
    {
      question: 'What enterprise features are included?',
      answer: 'Up to 3 enterprise-level domains with advanced WAF, DDoS protection, 100% uptime SLA, and role-based access—features typically reserved for Fortune 500 companies.'
    },
    {
      question: 'What is Workers Launchpad?',
      answer: 'A program for startups building on Workers that provides funding connections with VC partners—added value beyond credits.'
    },
    {
      question: 'How fast is setup?',
      answer: '"Hours instead of days"—most startups are live within an afternoon, with DNS propagation being the only bottleneck (typically <1 hour).'
    },
    {
      question: 'What happens when credits expire?',
      answer: 'After credits expire or are consumed, you\'ll be billed on the payment method you added. Monitor usage in dashboard to optimize spend and transition smoothly.'
    }
  ],
  tags: ['cdn', 'security', 'ddos', 'waf', 'serverless', 'workers', 'ai', 'edge-computing', 'cloud-credits', 'startups', 'cloudflare'],
  status: 'active',
  applicationUrl: 'https://www.cloudflare.com/forstartups/',
  logoUrl: 'https://www.cloudflare.com/favicon.ico',
  brandIcon: 'https://www.cloudflare.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $250,000',
  savingsAmount: 250000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '☁️'
};

// Find existing Cloudflare deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isCloudflare = 
    slugLower.includes('cloudflare') ||
    titleLower.includes('cloudflare') ||
    providerLower === 'cloudflare';
  
  if (isCloudflare) {
    console.log(`Removing existing Cloudflare deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isCloudflare;
});

// Add the new comprehensive Cloudflare deal
filteredDeals.push(cloudflareDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Cloudflare for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${cloudflareDeal.title}`);
console.log(`- Value: ${cloudflareDeal.value}`);
console.log(`- Application URL: ${cloudflareDeal.applicationUrl}`);
console.log(`- Benefits: ${cloudflareDeal.benefits.length} items`);
console.log(`- Eligibility: ${cloudflareDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${cloudflareDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${cloudflareDeal.faqs.length} questions`);
