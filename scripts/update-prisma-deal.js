const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Prisma deal data
const prismaDeal = {
  id: 'prisma-300-credits',
  slug: 'prisma-300-credits',
  title: 'Prisma — $300 in Credits',
  provider: 'Prisma',
  category: 'saas-discounts',
  subcategory: 'developer-tools',
  value: '$300 in credits',
  enhancedValue: '$300',
  shortDescription: '$300 in credits across all Prisma commercial products when you upgrade to Pro tier. Next-gen TypeScript ORM with managed PostgreSQL, global caching, and query optimization.',
  description: `Prisma offers $300 in credits across all commercial products when you upgrade to the Pro tier. Fill out the application form and the Prisma team will contact you within 5 business days to activate the offer.`,
  detailedDescription: `Prisma offers $300 in credits across all commercial products when you upgrade to the Pro tier. Fill out the application form and the Prisma team will contact you within 5 business days to activate the offer.

What is Prisma?
Prisma is a next-generation ORM (Object-Relational Mapping) for Node.js and TypeScript that simplifies database workflows with type-safe queries, automated migrations, and developer-friendly tools.

Prisma Products Covered:
• Prisma Postgres: Managed serverless PostgreSQL database with pay-as-you-go pricing
• Prisma Accelerate: Global database cache with scalable connection pooling
• Prisma Optimize: Query analysis and AI-powered recommendations
• Prisma Studio: Visual data management interface

Pro Tier Pricing (Regular):
• Base Price: $49/month
• Operations Included: 10,000,000/month
• Storage Included: 50 GB
• Databases: 100
• Pooled Connections: 500
• AI Recommendations: Unlimited
• Daily Backups: 7 days retention

$300 Credits Coverage:
• ~6 months of Pro tier base subscription
• OR significant operations/storage credits
• Applied across all Prisma commercial products

Prisma ORM (Free & Open Source):
• Type-safe database queries
• Auto-generated client
• Automated migrations
• Schema modeling
• Supports: PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, CockroachDB

Best For: Developers building Node.js/TypeScript applications who need a modern ORM with managed database services, global caching, and query optimization.

Not Ideal For: Teams not using JavaScript/TypeScript or those needing databases beyond PostgreSQL/MySQL/SQLite/MongoDB.

Also Available - Prisma Startup Program:
For funded startups (Pre-seed to Series A), Prisma offers up to $10,000 in credits, 1:1 guidance, and direct Slack support. Apply at prisma.io/startups`,
  benefits: [
    '$300 in credits across all Prisma commercial products',
    'Covers ~6 months of Pro tier ($49/mo)',
    'Prisma Postgres: Managed serverless PostgreSQL',
    'Prisma Accelerate: Global edge caching & connection pooling',
    'Prisma Optimize: AI-powered query recommendations',
    'Prisma Studio: Visual data browser',
    '10M operations/month included',
    '50 GB storage included',
    '100 databases, 500 pooled connections',
    '7-day backup retention',
    'GDPR & HIPAA compliance'
  ],
  eligibility: [
    'New Prisma users who haven\'t signed up yet',
    'OR existing users on the free version',
    'Must upgrade to Pro tier to use credits',
    'Fill out the application form'
  ],
  applicationProcess: [
    'Fill out the application form at tally.so/r/w79ro9',
    'Provide company and project details',
    'Wait for Prisma team to contact you (~5 business days)',
    'Create/upgrade your Prisma account to Pro tier',
    'Credits are applied to your account',
    'Start using Prisma Postgres, Accelerate, and Optimize'
  ],
  faqs: [
    {
      question: 'What can I use the $300 credits for?',
      answer: 'Credits apply across all Prisma commercial products: Prisma Postgres database operations, storage, Prisma Accelerate caching, and Prisma Optimize query analysis.'
    },
    {
      question: 'Do I need to upgrade to Pro tier?',
      answer: 'Yes. The credits are applied when you upgrade to the Pro tier ($49/month base).'
    },
    {
      question: 'How long do the credits last?',
      answer: 'Credits typically cover approximately 6 months of Pro tier usage, depending on your actual operations and storage consumption.'
    },
    {
      question: 'Is the Prisma ORM free?',
      answer: 'Yes. The core Prisma ORM is open-source and free forever. The credits apply to commercial products like Prisma Postgres, Accelerate, and Optimize.'
    },
    {
      question: 'What databases does Prisma support?',
      answer: 'Prisma ORM supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB. Prisma Postgres is specifically for PostgreSQL.'
    },
    {
      question: 'Is there a bigger startup program?',
      answer: 'Yes. Prisma offers a separate Startup Program with up to $10,000 in credits for funded startups (Pre-seed to Series A, raised in last 12 months, founded in last 5 years). Apply at prisma.io/startups'
    }
  ],
  tags: ['orm', 'database', 'postgresql', 'typescript', 'nodejs', 'serverless', 'caching', 'developer-tools', 'prisma'],
  status: 'active',
  applicationUrl: 'https://tally.so/r/w79ro9',
  logoUrl: 'https://www.prisma.io/logo-white.svg',
  brandIcon: 'https://www.prisma.io/favicon.ico',
  featured: false,
  verified: true,
  recommended: true,
  savings: 'Save $300',
  savingsAmount: 300,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🔷'
};

// Find existing Prisma deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isPrisma = 
    slugLower.includes('prisma') ||
    titleLower.includes('prisma') ||
    providerLower === 'prisma';
  
  if (isPrisma) {
    console.log(`Removing existing Prisma deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isPrisma;
});

// Add the new comprehensive Prisma deal
filteredDeals.push(prismaDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Prisma deal added successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${prismaDeal.title}`);
console.log(`- Value: ${prismaDeal.value}`);
console.log(`- Application URL: ${prismaDeal.applicationUrl}`);
console.log(`- Benefits: ${prismaDeal.benefits.length} items`);
console.log(`- Eligibility: ${prismaDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${prismaDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${prismaDeal.faqs.length} questions`);
