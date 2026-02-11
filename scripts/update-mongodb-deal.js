const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// MongoDB for Startups deal data
const mongodbDeal = {
  id: 'mongodb-for-startups',
  slug: 'mongodb-for-startups',
  title: 'MongoDB for Startups — $500-$5,000+ in Atlas Credits',
  provider: 'MongoDB',
  category: 'cloud-credits',
  subcategory: 'database',
  value: '$500-$5,000+ in Atlas credits',
  enhancedValue: '$5,000+',
  shortDescription: 'Tier-based Atlas credits ($500-$5,000+) plus Voyage AI tokens for embeddings. 4 program tiers: Inspire, Grow, Innovate, Scale. Built-in vector search and AI capabilities.',
  description: `MongoDB provides the world's leading modern, AI-ready data platform trusted by startups building the next generation of applications. The expanded program now includes Voyage AI integration for advanced retrieval and AI capabilities.`,
  detailedDescription: `MongoDB provides the world's leading modern, AI-ready data platform trusted by startups building the next generation of applications. The expanded program now includes Voyage AI integration for advanced retrieval and AI capabilities.

What's Covered:
• $500 - $5,000+ in MongoDB Atlas credits (50% more than previous program)
• Voyage AI Tokens: Access to state-of-the-art embedding and reranking models
• Technical Expertise: One-on-one technical advice and architecture support
• 4 Program Tiers: Inspire, Grow, Innovate, Scale - matched to your funding stage
• Partner Credits: Matching credits from Fireworks AI and Temporal (eligible startups)
• Co-Marketing: Go-to-market opportunities and marketing resources
• Partner Network: Access to MongoDB's startup ecosystem and investor connections
• MongoDB Ventures: Potential investment opportunities for high-growth startups
• Priority Support: Dedicated support channels (higher tiers)
• Vector Search: Built-in vector search and AI capabilities

What's NOT Covered:
• Previously accepted MongoDB for Startups participants
• Development shops and agencies (not eligible)
• Companies older than 7 years
• Startups beyond Series A (base tier)

Key Insights:
• 50% More Credits: Expanded program provides 50% more Atlas credits than previous version
• Voyage AI Integration: State-of-the-art embedding and reranking models for high-performance retrieval
• Partner Stack Bonus: Matching credits from Fireworks AI and Temporal
• Future-Proof: Scales from prototype to IPO without migration (Vanta example: $4.15B valuation)
• AI-Native: Built-in vector search, automatic embeddings, real-time streaming
• No Lock-In: MongoDB Community Edition is open source`,
  benefits: [
    '$500 - $5,000+ in MongoDB Atlas credits (50% more than previous program)',
    'Voyage AI tokens for state-of-the-art embedding and reranking models',
    'One-on-one technical advice and architecture support',
    '4 program tiers: Inspire, Grow, Innovate, Scale',
    'Matching credits from Fireworks AI and Temporal (eligible startups)',
    'Go-to-market opportunities and marketing resources',
    'Access to MongoDB startup ecosystem and investor connections',
    'MongoDB Ventures potential investment opportunities',
    'Built-in vector search and AI capabilities',
    'Priority support channels (higher tiers)'
  ],
  eligibility: [
    'Early-stage: Less than 7 years old and Series A or earlier',
    'Scalable product: Focused on single software-based product/service',
    'New participant: Not previously accepted into program',
    'Established online: Active company website and LinkedIn profile',
    'Inspire tier: Bootstrapped startups validating ideas',
    'Grow tier: Early funding stages with traction',
    'Innovate tier: Rising VC-backed startups',
    'Scale tier: Rapidly scaling companies with significant funding'
  ],
  applicationProcess: [
    'Visit https://www.mongodb.com/solutions/startups',
    'Click "Apply Now" and complete the application form',
    'Provide email, name, job title, company name, company URL',
    'Include company LinkedIn profile (to confirm affiliation)',
    'Write short product/service description (dev shops not eligible)',
    'Specify country, postal code, funding stage, industry',
    'Indicate AI use case if applicable',
    'Agree to program terms and conditions',
    'Submit application (5-7 business days review)',
    'Receive approval with promo code and tier assignment',
    'Apply promo code in MongoDB Atlas dashboard'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: '$500 (Inspire tier) to $5,000+ (Scale tier) in MongoDB Atlas credits, plus Voyage AI tokens. AI companies may receive additional credits. The expanded program provides 50% more credits than before.'
    },
    {
      question: 'Who is eligible for MongoDB for Startups?',
      answer: 'Early-stage startups (less than 7 years old, Series A or earlier) focused on a single software-based product. Development shops and agencies are not eligible. Must not have previously participated.'
    },
    {
      question: 'What is Voyage AI integration?',
      answer: 'Voyage AI (acquired by MongoDB) provides state-of-the-art embedding and reranking models for high-performance retrieval. This enables building trustworthy AI applications with better accuracy.'
    },
    {
      question: 'Are there partner credits available?',
      answer: 'Yes. Eligible startups receive matching credits from Fireworks AI (gen AI platform) and Temporal (durable execution platform)—complementary technologies for building complete AI agent stacks.'
    },
    {
      question: 'What AI capabilities are built-in?',
      answer: 'Built-in vector search, automatic vector embeddings, real-time data streaming, and integrated AI workflows. Perfect for RAG applications, semantic search, and AI agent development.'
    },
    {
      question: 'How long are credits valid?',
      answer: 'Typically valid for 12 months from activation. Monitor usage in Atlas dashboard and set up billing alerts to maximize value before expiration.'
    }
  ],
  tags: ['database', 'nosql', 'mongodb', 'atlas', 'vector-search', 'ai', 'cloud-credits', 'startups'],
  status: 'active',
  applicationUrl: 'https://www.mongodb.com/solutions/startups',
  logoUrl: 'https://www.mongodb.com/favicon.ico',
  brandIcon: 'https://www.mongodb.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $500-$5,000+',
  savingsAmount: 5000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🍃'
};

// Find existing MongoDB deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMongoDB = 
    slugLower.includes('mongodb') ||
    titleLower.includes('mongodb') ||
    providerLower === 'mongodb';
  
  if (isMongoDB) {
    console.log(`Removing existing MongoDB deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMongoDB;
});

// Add the new comprehensive MongoDB deal
filteredDeals.push(mongodbDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ MongoDB for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${mongodbDeal.title}`);
console.log(`- Value: ${mongodbDeal.value}`);
console.log(`- Application URL: ${mongodbDeal.applicationUrl}`);
console.log(`- Benefits: ${mongodbDeal.benefits.length} items`);
console.log(`- Eligibility: ${mongodbDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${mongodbDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${mongodbDeal.faqs.length} questions`);
