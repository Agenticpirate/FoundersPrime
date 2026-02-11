const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Mercury deal data
const mercuryDeal = {
  id: 'mercury-startup-banking-bonus',
  slug: 'mercury-startup-banking-bonus',
  title: 'Mercury — Startup Banking Bonus Offer',
  provider: 'Mercury',
  category: 'business',
  subcategory: 'banking',
  value: 'Partner-exclusive cash bonus',
  enhancedValue: 'Cash Bonus',
  shortDescription: 'Partner-exclusive cash bonus when you open and fund a new Mercury account. Digital-first startup banking with FDIC-insured checking, savings, and modern treasury tools.',
  description: `Mercury is a digital-first business banking platform built for startups, tech companies, and online businesses. With this partner-only deal, new customers who apply through the referral link can unlock a special cash bonus after opening an account and meeting the qualifying funding or spending criteria.`,
  detailedDescription: `Mercury is a digital-first business banking platform built for startups, tech companies, and online businesses. With this partner-only deal, new customers who apply through the unique referral link can unlock a special cash bonus after opening an account and meeting the qualifying funding or spending criteria specified on the landing page.

Mercury bundles FDIC-insured checking and savings (through partner banks), virtual and physical debit cards, and modern treasury tools into one streamlined dashboard.

What the Bonus and Perks Cover:
• Partner-exclusive signup bonus (cash reward when you deposit or spend a qualifying amount within a set number of days after approval)
• Free business checking and savings accounts with no monthly account fees
• Fee-free ACH transfers
• Virtual and physical debit cards with spend controls, merchant limits, and real-time transaction tracking
• Built-in tools for payments, bill pay, and international wires
• Optional treasury and venture-debt products for funded startups

What This Deal Does NOT Cover:
• Existing Mercury customers (bonus is only for new accounts via partner link)
• Accounts that are not fully approved or fail to maintain good standing
• Some industries, entities, or geographies may be declined based on Mercury's risk policies

Best For: Founders who want a fully online, no-branch experience with low fees, strong integrations, and startup-friendly features like expense controls and venture-debt access.

Not Ideal For: Existing Mercury customers, businesses in restricted industries, or non-US entities.`,
  benefits: [
    'Partner-exclusive cash signup bonus',
    'Free business checking and savings accounts',
    'No monthly account fees',
    'Fee-free ACH transfers',
    'Virtual and physical debit cards',
    'Spend controls and merchant limits',
    'Real-time transaction tracking',
    'Built-in payments, bill pay, and international wires',
    'Treasury and venture-debt products for funded startups',
    'FDIC-insured through partner banks'
  ],
  eligibility: [
    'New Mercury customer only (no existing account)',
    'Business use: Startup, LLC, C-corp, or legitimate business entity',
    'Must pass KYC/AML checks',
    'Supported geographies and risk profile (primarily US startups)',
    'Must complete qualifying action (deposit/spend minimum within time frame)'
  ],
  applicationProcess: [
    'Open the referral link: https://mercury.com/partner/secret',
    'Review the bonus details in the promotion box on the landing page',
    'Click the call-to-action button and choose your business type',
    'Enter company and founder information',
    'Upload KYC/AML documents (incorporation docs, EIN, founder IDs)',
    'Submit application for review (typically a few business days)',
    'Once approved, fund your new Mercury account',
    'Complete deposit or card-spend requirements within promo window',
    'Cash bonus credited to your Mercury account'
  ],
  faqs: [
    {
      question: 'How do I get the cash bonus?',
      answer: 'Open a new Mercury account via the partner referral link, complete KYC, and meet the deposit or spending threshold within the promo period specified on the landing page.'
    },
    {
      question: 'Are there monthly fees?',
      answer: 'No. Mercury business checking and savings accounts have no monthly account fees.'
    },
    {
      question: 'Is Mercury FDIC insured?',
      answer: 'Yes. Banking services are provided through partner banks that are Members FDIC.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically a few business days once all KYC documents are submitted.'
    },
    {
      question: 'Can existing Mercury customers use this deal?',
      answer: 'No. The bonus is only for new accounts opened via the partner landing page.'
    },
    {
      question: 'What types of businesses are eligible?',
      answer: 'Startups, LLCs, C-corps, and other legitimate business entities that pass KYC/AML checks and fit Mercury\'s supported geographies and risk profile.'
    }
  ],
  tags: ['banking', 'startup-banking', 'checking', 'savings', 'fintech', 'treasury', 'mercury'],
  status: 'active',
  applicationUrl: 'https://mercury.com/partner/secret?irgwc=1&ir_partnerid=3655744&ir_adid=3184921&ir_campaignid=19270',
  logoUrl: 'https://mercury.com/favicon.ico',
  brandIcon: 'https://mercury.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Cash bonus + fee savings',
  savingsAmount: 500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🏦'
};

// Find existing Mercury deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMercury = 
    slugLower.includes('mercury') ||
    titleLower.includes('mercury') ||
    providerLower === 'mercury';
  
  if (isMercury) {
    console.log(`Removing existing Mercury deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMercury;
});

// Add the new comprehensive Mercury deal
filteredDeals.push(mercuryDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Mercury deal added successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${mercuryDeal.title}`);
console.log(`- Value: ${mercuryDeal.value}`);
console.log(`- Application URL: ${mercuryDeal.applicationUrl}`);
console.log(`- Benefits: ${mercuryDeal.benefits.length} items`);
console.log(`- Eligibility: ${mercuryDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${mercuryDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${mercuryDeal.faqs.length} questions`);
