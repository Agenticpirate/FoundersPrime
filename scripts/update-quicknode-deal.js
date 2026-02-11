const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// QuickNode Startup Program deal data
const quicknodeDeal = {
  id: 'quicknode-startup-program',
  slug: 'quicknode-startup-program',
  title: 'QuickNode Startup Program — $5,000+ in API Credits',
  provider: 'QuickNode',
  category: 'cloud-credits',
  subcategory: 'blockchain',
  value: '$5,000+ in API credits',
  enhancedValue: '$5,000+',
  shortDescription: 'Up to $5,000 in platform credits plus exclusive discounts, personalized support, and investor introductions for early-stage Web3 startups. Access 78+ blockchains including Ethereum, Solana, Polygon.',
  description: `QuickNode Startup Program provides up to $5,000 in platform credits plus exclusive discounts, personalized support, and access to blockchain infrastructure resources for early-stage Web3 startups. QuickNode is a YC-backed platform offering RPC access to 78+ blockchains including Ethereum, Solana, Polygon, and more.`,
  detailedDescription: `QuickNode Startup Program provides up to $5,000 in platform credits plus exclusive discounts, personalized support, and access to blockchain infrastructure resources for early-stage Web3 startups. QuickNode is a YC-backed platform offering RPC access to 78+ blockchains including Ethereum, Solana, Polygon, and more.

What's Covered:
• Up to $5,000 in API credits (6-month validity)
• Product discounts on Core RPC API, Streams, and Webhooks
• Personalized technical support and office hours
• Investor introductions (Sequoia, a16z, ChainLink, Alliance, YC)
• Co-promotion and marketing to 35K+ X audience
• 3rd party partner offers (AWS credits, etc.)
• Exclusive invite-only workshops and events
• Feature Friday showcases
• Access to QuickNode Ventures for funding opportunities

What's NOT Covered:
• Credits beyond initial allocation
• Enterprise-level dedicated support
• Custom blockchain infrastructure
• Guaranteed funding from VCs

Key Insights:
• YC-backed platform: QuickNode itself went through Y Combinator—they understand startup needs
• 150+ VC partnerships: Built relationships with top-tier VCs for potential investor introductions
• 78+ blockchain networks: Single API for multi-chain access (Ethereum, Solana, Base, Polygon, Arbitrum, etc.)
• $5K credits: Covers ~100M+ API calls depending on plan tier
• 6-month validity: Credits valid for half a year—plan usage accordingly
• One-time offer: Cannot redeem if already used QuickNode credit offers
• Partner ecosystem: Access to AWS credits and other 3rd party startup benefits
• Technical expertise: Direct access to blockchain engineering support via office hours`,
  benefits: [
    'Up to $5,000 in platform credits (6 months validity)',
    '78+ blockchain networks (Ethereum, Solana, Polygon, Base, Arbitrum, etc.)',
    'Core RPC API access for blockchain data',
    'Streams: Backfill and stream blockchain data',
    'Webhooks: Instant blockchain alerts',
    'IPFS: Decentralized storage gateways',
    'Dedicated office hours with technical experts',
    'Investor introductions to top-tier VCs (Sequoia, a16z, ChainLink, Alliance, YC)',
    'Co-promotion to 150K+ developers',
    'AWS credits and 3rd party partner discounts',
    'Exclusive Web3 skill-building workshops'
  ],
  eligibility: [
    'Early-stage startup (pre-Series A funding)',
    'Building on blockchain (Web3, dApps, smart contracts)',
    'Active development (not just ideation phase)',
    'New or existing QuickNode customer (eligible)',
    'No previous credit redemption from QuickNode offers'
  ],
  applicationProcess: [
    'Visit the QuickNode Startup Program application portal',
    'Complete the application form with company information and founding details',
    'Provide funding stage and investors (if any)',
    'Describe your product and blockchain use case',
    'Specify expected usage and technical requirements',
    'Include team background and GitHub/product links',
    'Submit application for review',
    'Await evaluation (7-14 days processing time)',
    'Receive approval decision via email',
    'Onboard with QuickNode team for technical setup',
    'Claim credits and activate API endpoints',
    'Access additional benefits (workshops, investor intros, co-marketing)'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to $5,000 in platform credits with 6-month validity. This covers approximately 100M+ API calls depending on your plan tier.'
    },
    {
      question: 'Who is eligible for QuickNode Startup Program?',
      answer: 'Early-stage Web3 startups (pre-Series A) building on blockchain with active development. Post-Series A companies, non-Web3 businesses, and those who previously redeemed QuickNode credits are not eligible.'
    },
    {
      question: 'What blockchains are supported?',
      answer: '78+ blockchain networks including Ethereum, Solana, Polygon, Base, Arbitrum, and many more through a single API.'
    },
    {
      question: 'What investor introductions are available?',
      answer: 'QuickNode has partnerships with 150+ VCs including Sequoia, a16z, ChainLink, Alliance, and Y Combinator for potential introductions.'
    },
    {
      question: 'How long does approval take?',
      answer: '7-14 days for application evaluation. Include team background and GitHub/product links to strengthen your application.'
    },
    {
      question: 'Are there additional partner benefits?',
      answer: 'Yes. Access to AWS credits and other 3rd party startup benefits through QuickNode\'s partner ecosystem.'
    }
  ],
  tags: ['blockchain', 'web3', 'rpc', 'api', 'ethereum', 'solana', 'defi', 'nft', 'startups', 'quicknode'],
  status: 'active',
  applicationUrl: 'https://quiknode.typeform.com/to/duehmrLX',
  logoUrl: 'https://www.quicknode.com/favicon.ico',
  brandIcon: 'https://www.quicknode.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $5,000+',
  savingsAmount: 5000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '⛓️'
};

// Find existing QuickNode deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isQuickNode = 
    slugLower.includes('quicknode') ||
    slugLower.includes('quiknode') ||
    titleLower.includes('quicknode') ||
    titleLower.includes('quiknode') ||
    providerLower === 'quicknode' ||
    providerLower === 'quiknode';
  
  if (isQuickNode) {
    console.log(`Removing existing QuickNode deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isQuickNode;
});

// Add the new comprehensive QuickNode deal
filteredDeals.push(quicknodeDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ QuickNode Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${quicknodeDeal.title}`);
console.log(`- Value: ${quicknodeDeal.value}`);
console.log(`- Application URL: ${quicknodeDeal.applicationUrl}`);
console.log(`- Benefits: ${quicknodeDeal.benefits.length} items`);
console.log(`- Eligibility: ${quicknodeDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${quicknodeDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${quicknodeDeal.faqs.length} questions`);
