const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// ClearCRM deal data
const clearcrmDeal = {
  id: 'clearcrm-3-months-free',
  slug: 'clearcrm-3-months-free',
  title: 'ClearCRM — 3 Months Free + 75% Off',
  provider: 'ClearCRM',
  category: 'saas-discounts',
  subcategory: 'crm',
  value: '3 months free + 75% off',
  enhancedValue: '$500+',
  shortDescription: '3 months completely free plus 75% off on all paid plans (billed yearly). All-in-one CRM for sales, marketing, projects, and customer support.',
  description: `ClearCRM offers 3 months completely free plus an additional 75% off on all paid plans (billed yearly). All-in-one CRM for sales, marketing, projects, and customer support.`,
  detailedDescription: `ClearCRM offers 3 months completely free plus an additional 75% off on all paid plans (billed yearly). All-in-one CRM for sales, marketing, projects, and customer support.

Deal Structure:
• Starter: $49/user/mo → $2.25/user/mo with deal (~$27/user/year)
• Growth: $99/user/mo → $4.75/user/mo with deal (~$57/user/year)
• Scale: $199/user/mo → $9.75/user/mo with deal (~$117/user/year)

Total Savings Example (Growth Plan, 1 user):
• Regular: $99 × 12 = $1,188/year
• With deal: $0 × 3 + $4.75 × 9 = $42.75/year
• Save over $1,100/year per user

What's Included:

CRM & Sales:
• Unlimited deals, contacts, and leads
• Unlimited sales pipelines
• Visual deal progression (Kanban)
• Lead capture forms
• Quotes, invoicing, and estimates
• Time tracking for billable hours

Marketing (Growth+ plans):
• Marketing automation
• Email sequences
• Landing page and funnel builder
• Email templates with open/click tracking
• Multi-page surveys

Projects:
• Unlimited projects
• Task management with subtasks
• Kanban, List, Calendar, Gantt views
• Team collaboration and chat
• Project templates

Support:
• Customer ticketing system
• Knowledge base
• Customer chat widget
• Team chat

AI Features:
• AI email drafting
• AI image generator
• AI audio transcription
• AI document generation

Best For: Freelancers, startups, agencies, and small businesses needing an affordable all-in-one CRM with sales, marketing, projects, and support.

Not Ideal For: Enterprise teams needing complex integrations or advanced reporting from day one.`,
  benefits: [
    '3 months completely free',
    '75% off all paid plans (billed yearly)',
    'Unlimited deals, contacts, and leads',
    'Unlimited sales pipelines with Kanban view',
    'Quotes, invoicing, and estimates',
    'Marketing automation & email sequences (Growth+)',
    'Landing page and funnel builder (Growth+)',
    'Unlimited projects with task management',
    'Customer ticketing system & knowledge base',
    'AI email drafting, image generator, document generation',
    'No credit card required to start'
  ],
  eligibility: [
    'New ClearCRM users',
    'No credit card required to start',
    'Annual billing required after free period',
    'Open to all businesses and individuals',
    'No startup restrictions — available to everyone'
  ],
  applicationProcess: [
    'Go to clearcrm.com/crm-deals/get-3-months-free',
    'Select your plan (Starter, Growth, or Scale)',
    'Click "Get 3 Months FREE"',
    'Create your account (no credit card required)',
    'Start using ClearCRM immediately',
    'After 3 months, 75% discount applies on annual billing'
  ],
  faqs: [
    {
      question: 'Is this deal available to everyone?',
      answer: 'Yes. Unlike most startup deals, this is open to all businesses, freelancers, and individuals — no funding stage or employee count restrictions.'
    },
    {
      question: 'Do I need a credit card to start?',
      answer: 'No. You can start the 3-month free trial without entering payment information.'
    },
    {
      question: 'What happens after the 3 free months?',
      answer: 'You\'ll be billed annually at 75% off the regular price. For Growth plan, that\'s ~$57/year instead of $1,188/year.'
    },
    {
      question: 'Can I cancel during the free period?',
      answer: 'Yes, you can cancel anytime during the 3-month free period with no charge.'
    },
    {
      question: 'Is there a free plan available?',
      answer: 'Yes. ClearCRM has a permanent free plan with limited features (2 users, 50 records, 2GB storage).'
    },
    {
      question: 'What\'s the difference between Starter and Growth?',
      answer: 'Growth adds marketing automation, email sequences, landing page builder, and funnel templates. Starter focuses on CRM and sales basics.'
    }
  ],
  tags: ['crm', 'sales', 'marketing-automation', 'project-management', 'invoicing', 'lead-management', 'email-marketing', 'customer-support'],
  status: 'active',
  applicationUrl: 'https://clearcrm.com/crm-deals/get-3-months-free/',
  logoUrl: 'https://clearcrm.com/wp-content/uploads/2025/09/ClearCRM-Logo-Color-1.svg',
  brandIcon: 'https://clearcrm.com/favicon.ico',
  featured: false,
  verified: true,
  recommended: true,
  savings: 'Save $500+',
  savingsAmount: 500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing ClearCRM deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isClearCRM = 
    slugLower.includes('clearcrm') ||
    titleLower.includes('clearcrm') ||
    providerLower === 'clearcrm';
  
  if (isClearCRM) {
    console.log(`Removing existing ClearCRM deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isClearCRM;
});

// Add the new comprehensive ClearCRM deal
filteredDeals.push(clearcrmDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ ClearCRM deal added successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${clearcrmDeal.title}`);
console.log(`- Value: ${clearcrmDeal.value}`);
console.log(`- Application URL: ${clearcrmDeal.applicationUrl}`);
console.log(`- Benefits: ${clearcrmDeal.benefits.length} items`);
console.log(`- Eligibility: ${clearcrmDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${clearcrmDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${clearcrmDeal.faqs.length} questions`);
