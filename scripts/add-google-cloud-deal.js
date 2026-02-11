#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const googleCloudDeal = {
  id: `deal-google-cloud-startups-${Date.now()}`,
  slug: 'google-for-startups-cloud-program',
  title: 'Google for Startups Cloud Program – Google Cloud Credits',
  provider: 'Google Cloud',
  category: 'data',
  subcategory: 'cloud-computing',
  tags: ['cloud-credits', 'google-cloud', 'gcp', 'ai', 'ml', 'infrastructure', 'saas', 'web3'],
  value: '$200,000+ in cloud credits',
  savings: '$200,000+',
  savingsAmount: 200000,
  shortDescription: 'Cloud credits, technical training, and business support to help startups build and scale on Google Cloud. Up to $350,000 for AI startups.',
  description: `Google for Startups Cloud Program provides cloud credits, technical training, and business support to help startups build and scale on Google Cloud. The program offers tiered benefits based on your startup's funding stage, with eligible startups receiving substantial cloud credits over 2 years.

Program Tiers:

Start Tier - For unfunded startups:
• Up to $2,000 USD in Google Cloud credits (valid for 1 year)
• $200 in Google Cloud Skills Boost credits for training
• Access to global Google Cloud Startup Community

Scale Tier - For funded startups (Pre-seed to Series A):
• Year 1: 100% coverage up to $100,000 USD in Google Cloud credits
• Year 2: 20% coverage up to additional $100,000 USD in credits
• $500 in Google Cloud Skills Boost credits
• $12,000 USD in Enhanced Support credits for 1 year
• Access to Startup Success Manager and Customer Engineers
• Co-marketing opportunities for select startups

AI Startups Bonus:
• Up to $350,000 total in Google Cloud credits (for AI-focused companies)
• Dedicated AI training, resources, and expert access

What's Included:
• Google Cloud and Firebase usage credits
• Technical training through hands-on labs and courses
• Technical support via Enhanced Support credits
• Access to dedicated Startup Customer Engineers
• Startup Success Manager for guidance
• Global Google Cloud Startup Community access
• 12 months free Google Workspace Business Plus (for new signups)
• $600 monthly Google Maps Platform credits for 12 months
• Up to 10K Google Maps API calls per SKU per month at no cost
• Co-marketing opportunities (select startups)
• Google-wide discounts and perks

Best for:
• Technology startups building on cloud infrastructure
• SaaS and AI/ML companies
• Web3 and blockchain projects
• Early-stage startups needing to extend runway
• International founders wanting US cloud infrastructure

Not ideal for:
• Companies that have IPO'd or been acquired
• Educational institutions, government entities, nonprofits
• Dev shops, consultancies, or agencies
• Cryptocurrency mining companies
• Personal blogs or content sites`,
  eligibility: [
    'Start Tier: Technology startup not yet funded by an institutional investor',
    'Start Tier: Founded within the last 5 years',
    'Start Tier: Not yet received Google Cloud credits (beyond free trial)',
    'Scale Tier: Received startup equity funding from pre-seed to Series A by institutional investor',
    'Scale Tier: If Series A, raised within the last 12 months',
    'Scale Tier: Founded within the last 10 years',
    'Scale Tier: Not yet received more than $5,000 in Google Cloud credits',
    'AI Startups: Use AI as core technology for primary products/solutions',
    'Web3 Startups: Use blockchain technology for primary products/solutions'
  ],
  applicationProcess: [
    'Fill out the online application with your contact information, startup details, and Google Cloud Billing Account ID',
    'Provide information about your startup\'s funding stage and founding date. Applications are reviewed for appropriate program tier',
    'Applications typically reviewed within 3-5 business days. New billing accounts may take 7-10 additional days to process',
    'Once approved, credits are automatically deposited into your Google Cloud Billing Account ID. Start building immediately'
  ],
  benefits: [
    'Up to $200,000 in Google Cloud credits ($350,000 for AI startups)',
    'Google Cloud and Firebase usage credits',
    'Technical training through hands-on labs',
    '$12,000 in Enhanced Support credits',
    'Startup Success Manager access',
    '12 months free Google Workspace Business Plus',
    '$600 monthly Google Maps Platform credits',
    'Co-marketing opportunities'
  ],
  faqs: [
    {
      question: 'Who is eligible for this program?',
      answer: 'Technology startups founded within the last 5-10 years (depending on tier) that haven\'t received significant prior Google Cloud credits. Scale tier requires verified equity funding from institutional investors.'
    },
    {
      question: 'When will I hear back about my application?',
      answer: 'You can expect a response within 3-5 business days for most applications. New Google Cloud Platform Billing Accounts may require 7-10 additional days to process.'
    },
    {
      question: 'What can I use the credits for?',
      answer: 'Credits can be applied toward Google Cloud Platform Services and Select Google Cloud offerings. They cannot be used for Google Workspace, Google Ads, or Google Maps Platform beyond the specific perks included.'
    },
    {
      question: 'Do I need a Google Cloud Billing Account before applying?',
      answer: 'Yes, you must create a Google Cloud Billing Account and provide the Billing Account ID when applying. The email associated with this account should match your startup\'s domain.'
    },
    {
      question: 'Can I apply if I\'m outside the United States?',
      answer: 'Yes! The program is available to startups in 140+ countries. Your company\'s billing entity must be based in a Google Cloud supported territory.'
    }
  ],
  applicationUrl: 'https://cloud.google.com/startup/apply',
  providerWebsite: 'https://cloud.google.com/startup',
  logoUrl: 'https://cdn.simpleicons.org/googlecloud/4285F4',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '30 minutes',
  approvalTime: '3-10 business days',
  difficulty: 'medium',
  successRate: '80%+',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastVerified: '2026-01-27',
  appliedCount: 1000,
  dataSource: 'manual',
  sourceVerified: true
};

// Check if Google Cloud deal already exists
const existingIndex = deals.findIndex(d => 
  d.slug === 'google-for-startups-cloud-program' || 
  d.slug === 'google-cloud-for-startups' ||
  (d.title?.toLowerCase().includes('google') && d.title?.toLowerCase().includes('startups') && d.title?.toLowerCase().includes('cloud'))
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...googleCloudDeal };
  console.log('✅ Updated existing Google Cloud deal');
} else {
  deals.push(googleCloudDeal);
  console.log('✅ Added new Google Cloud deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
