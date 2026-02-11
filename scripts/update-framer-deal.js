#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const framerDeal = {
  id: 'framer-startups',
  slug: 'framer-startups',
  title: 'Framer Startups — Up to $900 in Credits',
  provider: 'Framer',
  category: 'development',
  subcategory: 'website-builder',
  tags: ['no-code', 'website-builder', 'design', 'landing-page', 'cms', 'startup-program'],
  value: 'Up to $900 in credits',
  savings: '$900',
  savingsAmount: 900,
  shortDescription: 'No-code web platform for founders. Up to $900/year in credits for Launch plan with 15K pages, 200GB bandwidth, CMS, and AI design features.',
  description: `Framer Startups is a flagship program by Framer, the no-code web platform built specifically for founders and early-stage teams. The program provides up to $900 in annual credits to accelerate startup website launches without requiring developers or technical setup. Over 500 startups globally benefit from this program.

What You Get:

Launch (Startup) Plan — Up to $900/year
• Up to 15,000 pages
• 200 GB monthly bandwidth
• 20 CMS collections
• 6 editor seats
• SSL hosting, global CDN
• Cookie banner functionality
• 5,000 form submissions/month
• 90-day version history

Pro Plan — Up to $360/year (alternative)
• Up to 5,000 pages
• 100 GB monthly bandwidth
• 10 CMS collections

What Credits Cover:
• Full Framer Launch Plan subscription
• CMS functionality for dynamic content
• Global content delivery and performance optimization
• Form submissions (5,000/month on Launch)
• 90-day version history for easy rollbacks
• AI-powered design features (Wireframer & Workshop)
• Custom domain connectivity
• Advanced analytics add-ons (trial available)

What Credits DON'T Cover:
• Premium add-ons beyond core plan features
• Design templates (Framer Marketplace offers free/premium options)
• Third-party integrations with external services
• Training or consulting services
• Paid marketplace assets or premium extensions

Best For: Early-stage SaaS teams, pre-seed/seed founders, product-focused startups that need a fast, modern website without hiring developers. Ideal for landing pages, product marketing sites, content hubs, and rapid iteration.

Not Ideal For: Large enterprises with existing dev teams, companies requiring custom backend infrastructure, agencies (consider Pro Expert program instead).

Notable Users: Loops, Cal.com, Perplexity AI, Visual Electric, and 500+ other early-stage startups.`,
  eligibility: [
    'Founded in last 10 years',
    'Pre-Series B or early (Series B OK)',
    'Functioning business website',
    'New to Framer Startups Credits',
    'Not building a competing website builder or design tool'
  ],
  applicationProcess: [
    'Go to framer.com/startups and click "Apply Today"',
    'Create a Framer account (use your business email)',
    'Navigate to Billing → Startup Program',
    'Select plan: Launch ($900/year) or Pro ($360/year)',
    'Provide startup details: company name, stage, website, founding date',
    'Upload proof of startup status (pitch deck, incorporation docs)',
    'Await verification email (1-3 business days)',
    'Once approved, credits automatically apply to your account',
    'Start building and publish—no payment required for 12 months'
  ],
  benefits: [
    'Up to $900 in annual credits',
    '15,000 pages included',
    '200 GB monthly bandwidth',
    '20 CMS collections',
    '6 editor seats',
    'AI-powered design features',
    'Global CDN & SSL hosting',
    '90-day version history'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Early-stage startups founded in the last 10 years, pre-Series B, with a functioning business website. Must be new to Framer Startups credits.'
    },
    {
      question: 'How long does approval take?',
      answer: '1-3 business days for verification. Account setup takes about 1 hour.'
    },
    {
      question: 'What proof do I need to provide?',
      answer: 'Pitch deck, incorporation documents, or business registration to verify startup status.'
    },
    {
      question: 'Can I use this for multiple sites?',
      answer: 'The credits apply to one workspace. You can build multiple pages within that workspace.'
    },
    {
      question: 'What happens after 12 months?',
      answer: 'You can renew, upgrade to a paid plan, or downgrade. Set a reminder for month 11 to plan your strategy.'
    },
    {
      question: 'Do I need coding skills?',
      answer: 'No! Framer is a no-code platform with drag-and-drop interface. AI features help generate layouts from text prompts.'
    }
  ],
  applicationUrl: 'https://www.framer.com/startups/',
  providerWebsite: 'https://www.framer.com',
  logoUrl: 'https://framerusercontent.com/images/48ha9ZR9oZQGQ6gZ8YUfElP3T0A.png',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '1-2 hours',
  approvalTime: '1-3 days',
  difficulty: 'easy',
  successRate: '80%+',
  lastVerified: '2026-01-27',
  appliedCount: 500,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add Framer deal
const existingIndex = deals.findIndex(d => 
  d.slug?.includes('framer') ||
  d.title?.toLowerCase().includes('framer')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...framerDeal };
  console.log('✅ Updated existing Framer deal');
} else {
  deals.push(framerDeal);
  console.log('✅ Added new Framer deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
