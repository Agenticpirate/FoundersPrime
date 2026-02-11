#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const digitaloceanDeal = {
  id: 'digitalocean-free-credits',
  slug: 'digitalocean-free-credits',
  title: 'DigitalOcean — $200 Free Cloud Credits',
  provider: 'DigitalOcean',
  category: 'data',
  subcategory: 'cloud-computing',
  tags: ['cloud-credits', 'digitalocean', 'infrastructure', 'droplets', 'kubernetes', 'developer-cloud'],
  value: '$200 in credits',
  savings: '$200',
  savingsAmount: 200,
  shortDescription: 'Developer-first cloud platform with $200 free credits for 60 days. Build, test, and launch with simple, predictable pricing.',
  description: `DigitalOcean is offering a flagship $200 free cloud credits trial so developers and startups can build, test, and launch in the "developer cloud" with simple, predictable pricing. Credits are valid for 60 days and can be used across core infrastructure.

DigitalOcean positions itself as a developer-first platform: fast setup, clean UI, straightforward billing, and opinionated defaults that make it easy to go from idea to deployed app. The platform powers hundreds of thousands of customers worldwide, offers a 99.99% uptime SLA on key services, and emphasizes a lower total cost of ownership versus larger hyperscalers.

What Credits Cover:
• Droplets (virtual machines) for apps, APIs, and web servers
• Managed Kubernetes, managed databases, and containers
• Spaces Object Storage, Volumes Block Storage
• Load Balancers, networking, and bandwidth

What Credits Don't Cover:
• Past invoices or existing balances (only future usage during trial)
• Charges after 60 days or beyond the $200 limit
• Certain marketplace or third-party tools with their own pricing

Credit Validity:
• Credits: $200 total value
• Duration: 60 days from the moment you start the trial

Platform Features:
• 99.99% uptime SLA on Droplets and volumes
• Global data centers for low latency
• Cloud firewalls, DNS management, monitoring & alerting
• Enterprise SSD storage and scalable networking
• 1-click apps and curated marketplace (CMS, dev tools, databases)

Best for: Early-stage builders, indie hackers, and startups that want a straightforward cloud to host SaaS apps, APIs, websites, and databases without complex enterprise pricing.`,
  eligibility: [
    'New DigitalOcean customer (no prior paid account)',
    'No previous free-trial credit redeemed',
    'Must sign up via the designated promotional landing page',
    'Must add a valid payment method for identity verification',
    'Must agree to DigitalOcean Terms of Service and Privacy Policy'
  ],
  applicationProcess: [
    'Open the promo link and click "Start free trial" or "Sign up"',
    'Create a DigitalOcean account using email, Google, or GitHub login',
    'Add a valid payment method for identity verification',
    'Complete account details and accept Terms of Service',
    'Once active, $200 / 60-day credits are auto-applied to billing',
    'Spin up Droplets, databases, Kubernetes clusters, and storage',
    'Track remaining credits in the Billing section'
  ],
  benefits: [
    '$200 in cloud credits (60 days)',
    '99.99% uptime SLA',
    'Global data centers',
    'Managed Kubernetes & databases',
    'Cloud firewalls & DNS management',
    '1-click apps marketplace',
    'Simple, predictable pricing'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'New DigitalOcean customers who have never had a paid account or redeemed free-trial credits before.'
    },
    {
      question: 'How long are credits valid?',
      answer: '60 days from the moment you start the trial, or until you use all $200, whichever comes first.'
    },
    {
      question: 'Do I need a credit card?',
      answer: 'Yes, you must add a valid payment method (credit/debit card, PayPal, or supported wallet) for identity verification. A small authorization hold may be applied and then released.'
    },
    {
      question: 'What happens after 60 days?',
      answer: 'Any usage beyond the trial period or $200 limit is billed at normal DigitalOcean rates. You can decide which services to keep before the window ends.'
    },
    {
      question: 'What can I build with the credits?',
      answer: 'Droplets (VMs), managed Kubernetes, managed databases, object storage, block storage, load balancers, and networking resources.'
    }
  ],
  applicationUrl: 'https://try.digitalocean.com/freetrialoffer/',
  providerWebsite: 'https://www.digitalocean.com',
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '5 minutes',
  approvalTime: 'Instant',
  difficulty: 'easy',
  successRate: '95%+',
  lastVerified: '2025-01-27',
  appliedCount: 5000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add DigitalOcean deal
const existingIndex = deals.findIndex(d => 
  d.slug?.includes('digitalocean') ||
  d.title?.toLowerCase().includes('digitalocean')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...digitaloceanDeal };
  console.log('✅ Updated existing DigitalOcean deal');
} else {
  deals.push(digitaloceanDeal);
  console.log('✅ Added new DigitalOcean deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
