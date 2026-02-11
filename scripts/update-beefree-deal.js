const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Beefree SDK Startup Program deal data
const beefreeDeal = {
  id: 'beefree-sdk-startup-program',
  slug: 'beefree-sdk-startup-program',
  title: 'Beefree SDK Startup Program — 90% Off for 1 Year',
  provider: 'Beefree SDK',
  category: 'development',
  subcategory: 'api-tools',
  value: 'Up to $27,000 in savings',
  enhancedValue: '$27,000',
  shortDescription: '90% off Core or Superpowers plans for 12 months. Embed a drag-and-drop, AI-ready content builder for email, landing pages, and popups into your SaaS.',
  description: `Beefree SDK Startup Program provides 90% off for 12 months on Core or Superpowers plans for SaaS startups embedding a no-code content builder. Beefree SDK is a drag-and-drop, AI-ready content builder for email, landing pages, and popups used by 1,000+ SaaS applications.`,
  detailedDescription: `Beefree SDK Startup Program provides 90% off for 12 months on Core or Superpowers plans for SaaS startups embedding a no-code content builder. Beefree SDK is a drag-and-drop, AI-ready content builder for email, landing pages, and popups used by 1,000+ SaaS applications. The program includes priority support, optional Template Catalog API access, and co-marketing opportunities.

What You Get:
• 90% off for 12 months on Core or Superpowers plans
• Core plan: $100/month with discount (normally $1,000/month) = save $10,800/year
• Superpowers plan: $250/month with discount (normally $2,500/month) = save $27,000/year
• Priority support for faster integration and launch
• Optional Template Catalog API access (2,000+ responsive templates)
• Co-marketing opportunities to boost visibility

Full SDK Features:
• Drag-and-drop no-code builder for email, landing pages, popups, notifications
• Fully customizable and white-labeled
• AI-ready content builder
• 99.5% guaranteed uptime
• Easy-to-embed SDK
• File Manager, Content Services API

What's Covered:
• 90% discount on Core or Superpowers subscription for 12 months
• All plan features included
• Priority support and integration guidance

What's NOT Covered:
• Enterprise plan (discount applies to Core and Superpowers only)
• Template Catalog API subscription (not eligible for discount if purchased separately)
• Usage-based overage fees beyond plan limits

Success Stories:
• Tenon: Integrated in 5 weeks, saved $100K+ in dev costs
• Alvas.ai: Rapid deployment with enhanced customization`,
  benefits: [
    '90% off for 12 months on Core or Superpowers plans',
    'Core plan: Save $10,800/year ($1,000/month → $100/month)',
    'Superpowers plan: Save $27,000/year ($2,500/month → $250/month)',
    'Priority support for faster integration',
    'Optional Template Catalog API (2,000+ responsive templates)',
    'Co-marketing opportunities for visibility',
    'Drag-and-drop no-code builder for email, landing pages, popups',
    'Fully customizable and white-labeled',
    'AI-ready content builder',
    '99.5% guaranteed uptime',
    'Easy-to-embed SDK',
    'File Manager and Content Services API'
  ],
  eligibility: [
    'Founded less than 3 years ago',
    'Raised less than $5M in total funding',
    'SaaS platform embedding the SDK (not designing content for yourself)',
    'Not sure if you fit? Apply anyway — Beefree reviews each application and often makes exceptions'
  ],
  applicationProcess: [
    'Visit the Beefree SDK Startup Program application form',
    'Complete the form with company name, website, founding date',
    'Enter total funding raised (must be < $5M)',
    'Describe your product and how you plan to use Beefree SDK',
    'Select your desired plan (Core or Superpowers)',
    'Submit the application for review',
    'Await approval (2–3 business days)',
    'Once approved, 90% discount is applied immediately with onboarding guidance',
    'Start integrating Beefree SDK into your SaaS application'
  ],
  faqs: [
    {
      question: 'How much can I save with Beefree SDK Startup Program?',
      answer: 'Core plan: Save $10,800/year ($1,000/month → $100/month). Superpowers plan: Save $27,000/year ($2,500/month → $250/month).'
    },
    {
      question: 'Who is eligible for this program?',
      answer: 'SaaS startups less than 3 years old with less than $5M in funding who are embedding the SDK into their application. Not sure if you fit? Apply anyway — Beefree often makes exceptions.'
    },
    {
      question: 'What\'s the difference between Core and Superpowers plans?',
      answer: 'Superpowers includes advanced features beyond Core. Choose Superpowers to maximize savings ($27,000 vs. $10,800).'
    },
    {
      question: 'How long does approval take?',
      answer: 'Beefree team reviews applications within 2–3 business days.'
    },
    {
      question: 'How long does SDK integration take?',
      answer: 'Typically 1–5 weeks depending on complexity. Tenon integrated in 5 weeks and saved $100K+ in dev costs.'
    },
    {
      question: 'What happens after the first year?',
      answer: 'Standard pricing resumes (Core: $1,000/month, Superpowers: $2,500/month). Consider ROI: embedding SDK vs. building your own builder.'
    }
  ],
  tags: ['sdk', 'no-code', 'content-builder', 'beefree', 'email-builder', 'saas', 'api', 'startups'],
  status: 'active',
  applicationUrl: 'https://airtable.com/applnvMKZ9GWQV2df/shr0I0voOAui958v8',
  logoUrl: 'https://developers.beefree.io/favicon.ico',
  brandIcon: 'https://developers.beefree.io/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $27,000',
  savingsAmount: 27000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🐝'
};

// Find existing Beefree deal(s) and remove them
const beefreePatterns = ['beefree'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isBeefree = beefreePatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isBeefree) {
    console.log(`Removing existing Beefree deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isBeefree;
});

// Add the new comprehensive Beefree deal
filteredDeals.push(beefreeDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Beefree SDK Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${beefreeDeal.title}`);
console.log(`- Value: ${beefreeDeal.value}`);
console.log(`- Application URL: ${beefreeDeal.applicationUrl}`);
console.log(`- Benefits: ${beefreeDeal.benefits.length} items`);
console.log(`- Eligibility: ${beefreeDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${beefreeDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${beefreeDeal.faqs.length} questions`);
