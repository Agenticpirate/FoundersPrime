const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Wise Referral deal data
const wiseDeal = {
  id: 'wise-referral-free-transfer',
  slug: 'wise-referral-free-transfer',
  title: 'Wise Referral — Fee-Free Transfer Up to £500 (or Equivalent)',
  provider: 'Wise',
  category: 'finance',
  subcategory: 'payments',
  value: 'Fee-free transfer up to £500',
  enhancedValue: '£500',
  shortDescription: 'Fee-free first international transfer up to £500 (or equivalent). Real mid-market exchange rate with no markup. Trusted by 16+ million users worldwide.',
  description: `Wise referral program offers new users a completely fee-free international money transfer for their first transaction, covering transfers up to £500 (or equivalent in other currencies like USD, EUR, INR, etc.). This one-time offer eliminates all Wise transfer fees, helping you send money abroad at the real exchange rate without paying platform charges.`,
  detailedDescription: `Wise referral program offers new users a completely fee-free international money transfer for their first transaction, covering transfers up to £500 (or equivalent in other currencies like USD, EUR, INR, etc.). This one-time offer eliminates all Wise transfer fees, helping you send money abroad at the real exchange rate without paying platform charges. Wise is trusted by 16+ million users worldwide for international transfers with transparent pricing and low fees.

What You Get:
• Fee-free first transfer up to £500 (or equivalent in your currency)
• Covers all Wise platform fees for your first international transfer
• Access to real mid-market exchange rate (no markup on exchange rates)
• Fast transfer times (often within 24 hours)
• Multi-currency account with local bank details in 40+ currencies
• Option to get a free Wise debit card (depending on region)

What's Covered:
• All Wise platform transfer fees for the first transfer (up to £500 equivalent)
• International money transfers between different currencies
• Conversion fees normally charged by Wise

What's NOT Covered:
• External costs like tax payments or recipient bank charges
• Transfers exceeding £500 (you'll pay standard fees on the excess amount)
• Subsequent transfers after the first one (standard Wise fees apply)
• Transfers within the same currency (domestic transfers)

Cost Comparison:
• Traditional bank wire: Typically £20–40 + poor exchange rate markup (3–5%)
• PayPal international: 3–4% fee + exchange rate markup
• Wise standard fee (after first transfer): 0.4–2% depending on currency route
• With referral offer: £0 in Wise fees for first transfer up to £500`,
  benefits: [
    'Fee-free first transfer up to £500 or equivalent',
    'Real mid-market exchange rate with no markup',
    'Fast transfers (50% arrive instantly, 90% within 24 hours)',
    'Multi-currency account with local bank details in 40+ currencies',
    'Free Wise debit card (depending on region)',
    'Transparent fee structure (see fees upfront)',
    'Trusted by 16+ million users worldwide',
    'Refer friends and earn £50–75 for every 3 qualified referrals',
    'Business account available for paying international contractors',
    'Volume discounts for transfers over $25,000/month'
  ],
  eligibility: [
    'New Wise user (must not have completed a paid transfer before)',
    'Sign up via referral link',
    'Complete transfer within 30 days of account creation',
    'International transfer required (must be between different currencies)'
  ],
  applicationProcess: [
    'Click the Wise referral link to sign up',
    'Create your Wise account with email, password, and personal details',
    'Complete identity verification by uploading government-issued ID',
    'Once verified, click the green "Claim your fee-free transfer" button',
    'Set up your first international transfer (up to £500 equivalent)',
    'Select currencies and provide recipient details',
    'Fund the transfer via bank transfer, debit/credit card, or local payment method',
    'Complete the transfer — all Wise platform fees are waived',
    '(Optional) Order a free Wise debit card to spend abroad at real exchange rate'
  ],
  faqs: [
    {
      question: 'How much can I transfer fee-free?',
      answer: 'Up to £500 or equivalent in your currency. All Wise platform fees are waived for your first international transfer up to this amount.'
    },
    {
      question: 'Who is eligible for this offer?',
      answer: 'New Wise users who sign up via a referral link and complete their first international transfer within 30 days of account creation.'
    },
    {
      question: 'What exchange rate do I get?',
      answer: 'The real mid-market exchange rate with no markup — the same rate you see on Google. This is typically 3–5% better than traditional banks.'
    },
    {
      question: 'How fast are transfers?',
      answer: '50% of transfers arrive instantly, and 90% arrive within 24 hours. Speed depends on the currency route and payment method.'
    },
    {
      question: 'What\'s NOT covered?',
      answer: 'External costs like recipient bank charges, transfers exceeding £500 (standard fees apply to excess), subsequent transfers, and domestic transfers within the same currency.'
    },
    {
      question: 'Can I earn more rewards after my first transfer?',
      answer: 'Yes! Refer friends and earn £50–75 for every 3 qualified referrals who complete their first transfer.'
    }
  ],
  tags: ['money-transfer', 'international-payments', 'wise', 'fintech', 'exchange-rate', 'multi-currency', 'startups'],
  status: 'active',
  applicationUrl: 'https://wise.com/invite/dic/pulligellar',
  logoUrl: 'https://wise.com/public-resources/assets/logos/wise/brand_logo.svg',
  brandIcon: 'https://wise.com/public-resources/assets/logos/wise/brand_logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save £5–15+ in transfer fees',
  savingsAmount: 15,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '💸'
};

// Find existing Wise deal(s) and remove them
const wisePatterns = ['wise', 'transferwise'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isWise = wisePatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isWise) {
    console.log(`Removing existing Wise deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isWise;
});

// Add the new comprehensive Wise deal
filteredDeals.push(wiseDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Wise Referral deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${wiseDeal.title}`);
console.log(`- Value: ${wiseDeal.value}`);
console.log(`- Application URL: ${wiseDeal.applicationUrl}`);
console.log(`- Benefits: ${wiseDeal.benefits.length} items`);
console.log(`- Eligibility: ${wiseDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${wiseDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${wiseDeal.faqs.length} questions`);
