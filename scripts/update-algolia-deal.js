const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Algolia Startup Program deal data
const algoliaDeal = {
  id: 'algolia-startup-program',
  slug: 'algolia-startup-program',
  title: 'Algolia Startup Program — $10,000 in Credits',
  provider: 'Algolia',
  category: 'saas-discounts',
  subcategory: 'search-api',
  value: '$10,000 in platform credits',
  enhancedValue: '$10,000',
  shortDescription: '$10,000 in platform credits valid for 12 months. AI-powered search & discovery with semantic search, typo tolerance, personalization, and sub-millisecond response times.',
  description: `Algolia provides enterprise-grade search and discovery capabilities trusted by 11,000+ companies to power over 1.5 trillion searches annually. Get $10,000 in platform credits for 12 months.`,
  detailedDescription: `Algolia provides enterprise-grade search and discovery capabilities trusted by 11,000+ companies to power over 1.5 trillion searches annually. Get $10,000 in platform credits for 12 months.

What's Covered:
• $10,000 in Algolia credits valid for 12 months
• AI Search: Semantic + keyword search with query categorization & dynamic re-ranking
• Search API: Lightning-fast search API with typo tolerance & personalization
• AI Recommendations: Product recommendations and personalized results
• Analytics: Deep insights into user behavior and search patterns
• All Core Features: Usable on Build, Grow, and Business plans
• Developer Tools: Robust APIs, UI libraries, code exchange, and integrations
• Support: World-class customer support and documentation
• Community Access: Founder community and partner perks
• Infrastructure: 1.5 trillion searches/year capacity, global CDN, 99.99% uptime

What's NOT Covered:
• Existing Algolia customers (must be new accounts)
• Companies raised over $5M in funding
• Startups older than 3 years
• Businesses without a live website or product

Key Insights:
• Value Breakdown: $10,000 in credits covers millions of search operations. Grow plan starts at $0.50 per 1,000 searches—potentially 20 million searches with these credits
• Credit Flexibility: Credits apply to Build, Grow, and Business plans (NOT just starter tier)
• Y Combinator Connection: Nicolas Dessaigne, YC group partner and Algolia co-founder, champions this program
• Performance Advantage: Sub-millisecond search response times with typo tolerance, synonym handling, and faceted filtering
• Implementation Speed: Most startups implement basic search in hours, not weeks
• Free Resources: Access Algolia Academy, Code Exchange, DocSearch, and Developer Experience Podcast`,
  benefits: [
    '$10,000 in Algolia credits valid for 12 months',
    'AI Search: Semantic + keyword search with query categorization & dynamic re-ranking',
    'Lightning-fast search API with typo tolerance & personalization',
    'AI Recommendations: Product recommendations and personalized results',
    'Deep analytics into user behavior and search patterns',
    'Usable on Build, Grow, and Business plans',
    'Robust APIs, UI libraries, code exchange, and integrations',
    'World-class customer support and documentation',
    'Founder community and partner perks',
    '1.5 trillion searches/year capacity, global CDN, 99.99% uptime'
  ],
  eligibility: [
    'New Algolia customer (no active paid plan or previous program participation)',
    'Less than 3 years old from company founding date',
    'Raised under $5 million in total funding (pre-seed to early Series A)',
    'Live website or product (must have active platform to implement search)',
    'Legitimate startup (valid business registration and operations)'
  ],
  applicationProcess: [
    'Visit https://www.algolia.com/industries-and-solutions/startups/',
    'Create Algolia account if you haven\'t already (Do NOT activate any paid plan before applying)',
    'Complete the startup program application with company details',
    'Provide company name, website, founding date, and product description',
    'Specify current funding stage and amount raised',
    'Describe how you plan to use Algolia (use case)',
    'Alternatively: Submit support ticket at https://support.algolia.com/hc/en-us/requests/new',
    'Await verification (5-7 business days)',
    'Once approved, $10,000 in credits will be applied to your account',
    'Implement search using documentation, APIs, and support'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: '$10,000 in platform credits valid for 12 months. This covers millions of search operations—at $0.50 per 1,000 searches, you could potentially handle 20 million searches.'
    },
    {
      question: 'Who is eligible for Algolia Startup Program?',
      answer: 'New Algolia customers less than 3 years old, raised under $5M, with a live website or product. Existing customers and companies without active platforms are not eligible.'
    },
    {
      question: 'What plans can I use the credits on?',
      answer: 'Credits apply to Build, Grow, and Business plans—not just the starter tier. Choose the plan that matches your scale.'
    },
    {
      question: 'How fast is Algolia search?',
      answer: 'Sub-millisecond search response times with typo tolerance, synonym handling, and faceted filtering out-of-the-box. Consistent performance regardless of traffic spikes.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most startups implement basic search in hours, not weeks. Algolia\'s dashboard guides non-technical users, while developers can use direct API for advanced customization.'
    },
    {
      question: 'What free resources are available?',
      answer: 'Access Algolia Academy for training, Code Exchange for pre-built components, DocSearch for documentation sites, and Developer Experience Podcast for best practices.'
    }
  ],
  tags: ['search', 'api', 'ai', 'discovery', 'e-commerce', 'saas', 'developer-tools', 'startups', 'algolia'],
  status: 'active',
  applicationUrl: 'https://www.algolia.com/industries-and-solutions/startups/',
  logoUrl: 'https://www.algolia.com/favicon.ico',
  brandIcon: 'https://www.algolia.com/favicon.ico',
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
  icon: '🔍'
};

// Find existing Algolia deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isAlgolia = 
    slugLower.includes('algolia') ||
    titleLower.includes('algolia') ||
    providerLower === 'algolia';
  
  if (isAlgolia) {
    console.log(`Removing existing Algolia deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isAlgolia;
});

// Add the new comprehensive Algolia deal
filteredDeals.push(algoliaDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Algolia Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${algoliaDeal.title}`);
console.log(`- Value: ${algoliaDeal.value}`);
console.log(`- Application URL: ${algoliaDeal.applicationUrl}`);
console.log(`- Benefits: ${algoliaDeal.benefits.length} items`);
console.log(`- Eligibility: ${algoliaDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${algoliaDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${algoliaDeal.faqs.length} questions`);
