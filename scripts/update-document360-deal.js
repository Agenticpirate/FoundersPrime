const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Document360 Startup Program deal data
const document360Deal = {
  id: 'document360-startup-program',
  slug: 'document360-startup-program',
  title: 'Document360 Startup Program — $3,600+ Free',
  provider: 'Document360',
  category: 'saas-discounts',
  subcategory: 'documentation',
  value: '$3,600+ (6 months free + 50% off)',
  enhancedValue: '$3,600+',
  shortDescription: '6 months free on Business or Enterprise plan plus 50% off for the next 6 months. AI-powered knowledge base with Eddy AI assistant, white glove onboarding, and personalized setup.',
  description: `Document360 offers startups a comprehensive AI-powered knowledge base solution to build self-service portals, reduce support tickets, and scale customer success efficiently. Get 6 months free plus 50% off for the next 6 months.`,
  detailedDescription: `Document360 offers startups a comprehensive AI-powered knowledge base solution to build self-service portals, reduce support tickets, and scale customer success efficiently. Get 6 months free plus 50% off for the next 6 months.

What's Covered:
• 6 months free on Business or Enterprise plan
• 50% off for next 6 months (total 12 months coverage)
• Wow Site personalized knowledge base setup & implementation
• White Glove Onboarding with dedicated setup and product guidance
• AI Premium Suite: Eddy AI assistant, AI writer, SEO generator, article summarizer
• Startup-focused mentorship, events, and community access
• Priority support and enhanced support channels
• Unlimited articles, custom workflows, analytics, integrations

What's NOT Covered:
• Professional plan (Business/Enterprise only)
• Companies with 50+ employees
• Startups that raised over $5M in funding
• Existing Document360 customers

Key Insights:
• Value Breakdown: With Business plans starting at $399/month, you save ~$2,400 in the first 6 months (free) + ~$1,200 in the next 6 months (50% off) = $3,600+ total value
• Strategic Use: Document360's AI features can drastically reduce support workload. Startups report up to 30% faster content creation and significant ticket deflection
• Pro Tip: The "Wow site" personalized setup is a major value-add—leverage their expertise to build your knowledge base architecture right from day one
• Plan Selection: Choose Business plan for integrations & API access. Enterprise adds SSO, unlimited articles, and sandbox environment
• Integration Power: Integrates with Slack, Intercom, Zendesk, Microsoft Teams, and more
• Bootstrapped Startups: Even bootstrapped companies can qualify if they provide relevant validation documents`,
  benefits: [
    '6 months free on Business or Enterprise plan',
    '50% off for next 6 months (total 12 months coverage)',
    'Wow Site personalized knowledge base setup & implementation',
    'White Glove Onboarding with dedicated setup and product guidance',
    'AI Premium Suite: Eddy AI assistant, AI writer, SEO generator, article summarizer',
    'Startup-focused mentorship, events, and community access',
    'Priority support and enhanced support channels',
    'Unlimited articles, custom workflows, analytics, integrations'
  ],
  eligibility: [
    'New customers only (not for existing users)',
    'Less than 50 employees',
    'Raised under $5 million in funding',
    'Associated with startup accelerator, incubator, VC, or startup community',
    'Active startup operations (valid business documentation)',
    'Not available for Professional plan (Business/Enterprise only)'
  ],
  applicationProcess: [
    'Check eligibility: <50 employees, <$5M funding, accelerator/VC association',
    'Prepare documentation: startup profile/pitch deck, proof of accelerator/incubator/VC association',
    'Visit https://document360.com/partners/startup-program/',
    'Click "Sign up now!" and fill application form',
    'Alternatively, email partners@document360.com with subject "Startup Program Application - [Your Company Name]"',
    'Await approval (5-7 business days)',
    'Once approved, receive white glove onboarding and Wow site setup',
    'Select your plan: Business or Enterprise based on your needs'
  ],
  faqs: [
    {
      question: 'How much is the deal worth?',
      answer: '$3,600+ total value. With Business plans starting at $399/month, you save ~$2,400 in the first 6 months (free) + ~$1,200 in the next 6 months (50% off). Enterprise plans offer even higher savings.'
    },
    {
      question: 'Who is eligible for Document360 Startup Program?',
      answer: 'New customers with less than 50 employees, under $5M in funding, and associated with a startup accelerator, incubator, VC, or startup community. Existing customers and companies on Professional plan are not eligible.'
    },
    {
      question: 'What is the Wow Site setup?',
      answer: 'A personalized knowledge base setup and implementation service where Document360 experts help you build your knowledge base architecture right from day one.'
    },
    {
      question: 'What AI features are included?',
      answer: 'AI Premium Suite includes Eddy AI assistant, AI writer, SEO generator, and article summarizer. Startups report up to 30% faster content creation.'
    },
    {
      question: 'Can bootstrapped startups apply?',
      answer: 'Yes. Even bootstrapped companies can qualify if they provide relevant validation documents proving eligibility criteria.'
    },
    {
      question: 'What integrations are available?',
      answer: 'Document360 integrates with Slack, Intercom, Zendesk, Microsoft Teams, and more—connect it to your support stack for seamless ticket deflection.'
    }
  ],
  tags: ['knowledge-base', 'documentation', 'ai', 'customer-support', 'self-service', 'saas', 'startups', 'document360'],
  status: 'active',
  applicationUrl: 'https://document360.com/partners/startup-program/',
  logoUrl: 'https://document360.com/favicon.ico',
  brandIcon: 'https://document360.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $3,600+',
  savingsAmount: 3600,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📚'
};

// Find existing Document360 deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isDocument360 = 
    slugLower.includes('document360') ||
    titleLower.includes('document360') ||
    providerLower === 'document360';
  
  if (isDocument360) {
    console.log(`Removing existing Document360 deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isDocument360;
});

// Add the new comprehensive Document360 deal
filteredDeals.push(document360Deal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Document360 Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${document360Deal.title}`);
console.log(`- Value: ${document360Deal.value}`);
console.log(`- Application URL: ${document360Deal.applicationUrl}`);
console.log(`- Benefits: ${document360Deal.benefits.length} items`);
console.log(`- Eligibility: ${document360Deal.eligibility.length} requirements`);
console.log(`- Application steps: ${document360Deal.applicationProcess.length} steps`);
console.log(`- FAQs: ${document360Deal.faqs.length} questions`);
