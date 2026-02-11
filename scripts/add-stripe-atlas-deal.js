#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const stripeAtlasDeal = {
  id: `deal-stripe-atlas-${Date.now()}`,
  slug: 'stripe-atlas',
  title: 'Stripe Atlas – Delaware C-Corp Incorporation',
  provider: 'Stripe',
  category: 'business',
  subcategory: 'company-formation',
  tags: ['company-formation', 'startup-infrastructure', 'delaware', 'c-corp', 'incorporation', 'legal', 'stripe'],
  value: '$52,500+ in perks',
  savings: '$52,500+',
  savingsAmount: 52500,
  shortDescription: 'Stripe Atlas is a done-for-you Delaware C-Corp incorporation package for global founders. One-time $500 setup gets you incorporation, EIN, founder equity, 83(b) filing, and access to $2,500 in Stripe credits plus $50,000+ in partner perks.',
  description: `Stripe Atlas helps founders incorporate a standard Delaware company in a few clicks, using legal document templates developed with leading startup law firm Cooley LLP. You fill out your company and founder details online, and Atlas takes care of Delaware incorporation, getting your EIN, issuing founder equity, and filing your 83(b) elections—usually within about two business days.

Once incorporated, you can open a US bank account through partners, start accepting payments with Stripe, and redeem $2,500 in Stripe product credits plus over $50,000 in discounts on tools like Mercury, Xero, and AWS.

What's Included:
• Delaware company incorporation with next-day expedited processing and all state filing fees
• Company tax ID (EIN) application and issuance
• Founder equity issuance and share purchase documents using investor-friendly templates
• 83(b) election preparation and filing for founders
• Standard legal and operational templates to help you sell, hire, and run the company
• $2,500 in Stripe product credits usable in the first year after incorporation
• Access to over $50,000 in partner discounts (Mercury, Xero, AWS, and more)
• Guided post-incorporation checklist

Pricing:
• One-time fee: $500 (includes first year registered agent and government fees)
• Recurring fee: $100/year from year 2 for registered agent services

Best for: First-time or international founders who want a clean, venture-ready Delaware C-Corp.
Not ideal for: Local-only, lifestyle, or non-US businesses that do not need a US entity.

Legal Disclaimer: Stripe Atlas provides legal information and self-service tools for company formation but is not a law firm and does not provide legal, tax, or accounting advice. Founders should consult qualified professionals for advice specific to their situation.`,
  eligibility: [
    'Available to founders in 140+ countries',
    'Ideal for SaaS and venture-backed startups',
    'First-time or international founders',
    'Founders who want a venture-ready Delaware C-Corp'
  ],
  applicationProcess: [
    'Fill out company and founder details online',
    'Atlas handles Delaware incorporation, EIN, founder equity, and 83(b) filing',
    'Usually completed within about two business days',
    'Open US bank account through partners and start accepting payments'
  ],
  benefits: [
    'Delaware company incorporation with next-day expedited processing',
    'Company tax ID (EIN) application and issuance',
    'Founder equity issuance with investor-friendly templates',
    '83(b) election preparation and filing',
    '$2,500 in Stripe product credits',
    '$50,000+ in partner discounts (Mercury, Xero, AWS)',
    'Guided post-incorporation checklist'
  ],
  applicationUrl: 'https://stripe.com/atlas',
  providerWebsite: 'https://stripe.com/atlas',
  logoUrl: 'https://cdn.simpleicons.org/stripe/635BFF',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Check if Stripe Atlas already exists
const existingIndex = deals.findIndex(d => 
  d.slug === 'stripe-atlas' || 
  (d.title?.toLowerCase().includes('stripe atlas'))
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...stripeAtlasDeal };
  console.log('✅ Updated existing Stripe Atlas deal');
} else {
  deals.push(stripeAtlasDeal);
  console.log('✅ Added new Stripe Atlas deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
