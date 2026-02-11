#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const stripeStartupsDeal = {
  id: `deal-stripe-startups-${Date.now()}`,
  slug: 'stripe-startups',
  title: 'Stripe Startups – Payments & Fee Benefits for Venture-Backed Founders',
  provider: 'Stripe',
  category: 'finance',
  subcategory: 'payments',
  tags: ['payments', 'financial-infrastructure', 'stripe', 'fee-credits', 'venture-backed', 'startups'],
  value: 'Up to $20K in fee benefits',
  savings: '$20,000+',
  savingsAmount: 20000,
  shortDescription: 'Fee credits or waived payment processing fees for early-stage, venture-backed startups. Access Stripe Payments, Billing, Connect, Tax, and more with reduced costs in year 1.',
  description: `Stripe Startups helps early-stage, venture-backed founders get started with Stripe's payments and financial tools while reducing upfront costs. Eligible startups can access fee credits or waived payment processing fees (depending on their country), a focused founder community, and expert guidance from Stripe's team on how to use products like Payments, Billing, and Tax to grow faster.

Once approved, your benefits run for up to 12 months or until you reach your fee or volume limit.

What's Included:
• Fee credits that offset Stripe fees across products such as Payments, Billing, Connect, Tax, and Sigma (in supported countries)
• Or waived Stripe payment processing fees up to an approved volume amount in countries where fee credits are not yet available
• Access to a curated founder community and Stripe sessions
• Resources and guidance to implement Stripe in your product stack

Note: Offer details, eligibility, and amounts are determined by Stripe and may vary by country and referral source. Benefits apply once per startup and per Stripe account.`,
  eligibility: [
    'Early-stage, venture-backed startup (institutional funding required)',
    'Active, fully verified Stripe account on standard pricing in a supported country',
    'No prior Stripe Startups offer redeemed for this company',
    'Building a product or business that will process payments with Stripe'
  ],
  applicationProcess: [
    'Create or log in to your Stripe account and confirm your business details',
    'Go to stripe.com/startups and complete the Stripe Startups application form',
    'Wait for Stripe to review your application (usually 2-3 business days). You\'ll get an email once approved',
    'Activate your offer from the Stripe Dashboard within 12 months, then start processing payments with your benefits applied automatically'
  ],
  benefits: [
    'Fee credits across Payments, Billing, Connect, Tax, and Sigma',
    'Waived payment processing fees up to approved volume',
    'Curated founder community access',
    'Expert guidance on Stripe integration',
    'Reduced Stripe fees in year 1'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Venture-backed, early-stage startups with proof of institutional funding and a verified Stripe account on standard pricing in a supported country.'
    },
    {
      question: 'Do I need to already use Stripe?',
      answer: 'No, you can apply whether you are new to Stripe or already using it, as long as you meet the eligibility criteria and have not previously redeemed a Stripe Startups offer.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Stripe typically reviews applications in 2-3 business days and notifies you by email.'
    },
    {
      question: 'What happens after my credits or waived fees are used up?',
      answer: 'Your account returns to standard Stripe pricing. If you process over $100,000 per month for 3 consecutive months, you may request a custom pricing review from Stripe.'
    }
  ],
  applicationUrl: 'https://stripe.com/startups',
  providerWebsite: 'https://stripe.com/startups',
  logoUrl: 'https://cdn.simpleicons.org/stripe/635BFF',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '5-10 minutes',
  approvalTime: '2-3 business days',
  difficulty: 'easy',
  successRate: 'High for eligible, funded startups',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Check if Stripe Startups already exists
const existingIndex = deals.findIndex(d => 
  d.slug === 'stripe-startups' || 
  (d.title?.toLowerCase().includes('stripe startups'))
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...stripeStartupsDeal };
  console.log('✅ Updated existing Stripe Startups deal');
} else {
  deals.push(stripeStartupsDeal);
  console.log('✅ Added new Stripe Startups deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
