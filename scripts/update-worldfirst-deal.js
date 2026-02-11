const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// WorldFirst deal data
const worldfirstDeal = {
  id: 'worldfirst-signup-bonus',
  slug: 'worldfirst-signup-bonus',
  title: 'WorldFirst — Up to $100 Sign-Up Bonus',
  provider: 'WorldFirst',
  category: 'business',
  subcategory: 'banking',
  value: 'Up to $100 bonus',
  enhancedValue: '$100',
  shortDescription: '$100 bonus when you open and use a multi-currency business account. Free account with 20+ currencies, local collection accounts, and competitive FX rates.',
  description: `WorldFirst is a multi-currency business account that lets you receive, hold, and pay out in 20+ currencies with no monthly account fees. New customers who sign up via the exclusive link can earn up to $100 in bonus funds once their account is approved and promo conditions are met.`,
  detailedDescription: `WorldFirst is a multi-currency business account that lets you receive, hold, and pay out in 20+ currencies with no monthly account fees. New customers who sign up via the exclusive link can earn up to $100 in bonus funds once their multi-currency account is approved and the promo conditions are met.

The account is designed for ecommerce sellers, freelancers, and SMEs that sell or buy internationally and need local collection accounts, fast payouts, and competitive FX rates.

What Credits / Perks Cover:
• Up to $100 sign-up bonus (or local currency equivalent) credited to your WorldFirst account after you open a new account via the promo link and complete the required qualifying activity
• Free multi-currency account with no monthly maintenance fees
• Local account details in multiple currencies (USD, EUR, GBP, AUD, SGD and more)
• Receive payments from 20+ currencies for free from global marketplaces (Amazon, eBay, Shopify, PayPal)
• Fast international payments to suppliers in 100+ currencies and 200+ regions, often same-day
• FX tools like real-time rates and forward contracts to lock in rates and reduce currency risk

What This Deal Does NOT Cover:
• Personal use only accounts (promotion is for business/sole-trader activity)
• Fees for outbound international transfers and FX markups (~0.75% on currency conversion)
• Businesses or countries restricted under WorldFirst's compliance or sanctions policy

Best For: Founders who process or plan to process regular cross-border payments (marketplaces, suppliers, overseas clients) and want a low-friction way to boost their first transactions.

Not Ideal For: Personal accounts, businesses in restricted industries, or those not planning international transactions.`,
  benefits: [
    'Up to $100 sign-up bonus for new accounts',
    'Free multi-currency account with no monthly fees',
    'Local account details in 20+ currencies (USD, EUR, GBP, AUD, SGD)',
    'Receive payments free from Amazon, eBay, Shopify, PayPal',
    'Fast international payments to 100+ currencies, 200+ regions',
    'Same-day or within hours transfers',
    'Real-time FX rates and forward contracts',
    'Lock in rates to reduce currency risk'
  ],
  eligibility: [
    'New WorldFirst customer (no existing account)',
    'Business or sole trader only (ecommerce, freelancing, B2B trade)',
    'Must pass standard KYC/AML checks',
    'Supported country and industry (certain high-risk sectors excluded)',
    'Must complete qualifying transaction within promo time window',
    'Must apply via tracked promo link with EXCLUSIVEOFFER code'
  ],
  applicationProcess: [
    'Open the promo link: https://worldfirstasialimited.sjv.io/c/3655744/2993671/32391',
    'Choose multi-currency business account and begin application',
    'Confirm invitation code EXCLUSIVEOFFER is pre-filled',
    'Complete KYC: Enter business details, upload ID and company documents',
    'Submit application (approval typically 1-3 business days)',
    'Activate account and set up local currency accounts (USD, EUR, GBP)',
    'Connect marketplaces or payment platforms',
    'Complete qualifying transaction (send/receive minimum amount)',
    'Receive $100 bonus credited to your account'
  ],
  faqs: [
    {
      question: 'How do I get the $100 bonus?',
      answer: 'Open a new WorldFirst multi-currency account via the promo link with code EXCLUSIVEOFFER, complete KYC, and make a qualifying transaction within the promo period.'
    },
    {
      question: 'Is there a monthly fee?',
      answer: 'No. WorldFirst multi-currency accounts have no monthly maintenance fees.'
    },
    {
      question: 'What currencies can I hold?',
      answer: 'You can receive, hold, and pay out in 20+ currencies including USD, EUR, GBP, AUD, SGD, and more.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 1-3 business days once all KYC documents are submitted.'
    },
    {
      question: 'What are the FX fees?',
      answer: 'WorldFirst charges approximately 0.75% on currency conversion, plus any applicable payment fees for outbound transfers.'
    },
    {
      question: 'Can I use this for personal accounts?',
      answer: 'No. This promotion is for business or sole-trader accounts only.'
    }
  ],
  invitationCode: 'EXCLUSIVEOFFER',
  tags: ['banking', 'multi-currency', 'payments', 'ecommerce', 'international', 'fx', 'worldfirst'],
  status: 'active',
  applicationUrl: 'https://worldfirstasialimited.sjv.io/c/3655744/2993671/32391',
  logoUrl: 'https://www.worldfirst.com/wp-content/themes/worldfirst/assets/favicon-96x96.png',
  brandIcon: 'https://www.worldfirst.com/wp-content/themes/worldfirst/assets/favicon-96x96.png',
  featured: false,
  verified: true,
  recommended: true,
  savings: 'Save $100',
  savingsAmount: 100,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🏦'
};

// Find existing WorldFirst deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isWorldFirst = 
    slugLower.includes('worldfirst') ||
    titleLower.includes('worldfirst') ||
    providerLower === 'worldfirst';
  
  if (isWorldFirst) {
    console.log(`Removing existing WorldFirst deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isWorldFirst;
});

// Add the new comprehensive WorldFirst deal
filteredDeals.push(worldfirstDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ WorldFirst deal added successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${worldfirstDeal.title}`);
console.log(`- Value: ${worldfirstDeal.value}`);
console.log(`- Invitation Code: ${worldfirstDeal.invitationCode}`);
console.log(`- Application URL: ${worldfirstDeal.applicationUrl}`);
console.log(`- Benefits: ${worldfirstDeal.benefits.length} items`);
console.log(`- Eligibility: ${worldfirstDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${worldfirstDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${worldfirstDeal.faqs.length} questions`);
