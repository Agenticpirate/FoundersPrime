#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

// Find Notion deal
const notionIndex = deals.findIndex(d => 
  d.slug === 'notion' || 
  d.title?.toLowerCase().includes('notion') ||
  d.provider?.toLowerCase() === 'notion'
);

if (notionIndex === -1) {
  console.log('Notion deal not found');
  process.exit(1);
}

// Update with comprehensive details
deals[notionIndex] = {
  ...deals[notionIndex],
  title: 'Notion for Startups',
  provider: 'Notion',
  category: 'project-management',
  subcategory: 'productivity',
  tags: ['project-management', 'ai', 'productivity', 'workspace', 'collaboration', 'docs', 'wiki'],
  value: 'Up to $12,000',
  savings: '$12,000',
  savingsAmount: 12000,
  shortDescription: 'Organize teamwork and increase productivity with the AI workspace from idea to exit',
  description: `Organize teamwork and increase productivity with the AI workspace from idea to exit.

Eligibility Tiers:

• 6 months free with Notion AI included
  - For non-paying Notion customers with under 100 employees
  - Must be affiliated with one of Notion's select startup partners

• 3 months free with Notion AI included
  - For non-paying Notion customers with under 100 employees
  - Requires valid business website and company domain email address

• 1 month free with Notion AI included
  - For non-paying Notion customers with under 10 employees (SMBs)
  - Or startups who provided incomplete business information

Additional Benefits:
• Notion Perks: Exclusive software discounts for founders' journey
• Champions Community: Connect with other Startup Champions
• Notion Certified Consultants: One complimentary workspace setup session

Stats & Social Proof:
• 94% of Forbes AI 50 companies use Notion
• 50% of YC companies use Notion
• 70% of users replaced 2+ tools
• Used by: OpenAI, Figma, Deel, Perplexity, Ramp, Cursor`,
  eligibility: [
    'Non-paying Notion customers',
    'Under 100 employees for 6-month or 3-month tier',
    'Under 10 employees for 1-month tier',
    'Valid business website and company domain email'
  ],
  applicationProcess: [
    'Click "Get Started Free" and create an account with professional email address',
    '6-month free trial starts once credit card is entered at signup',
    'No charges for 6 months, can decide at end of trial whether to continue'
  ],
  benefits: [
    '6 months free on Business plan with Unlimited AI',
    'Notion Perks: Exclusive software discounts',
    'Champions Community access',
    'One complimentary workspace setup session with Notion Certified Consultants'
  ],
  applicationUrl: 'https://www.notion.com/startups',
  providerWebsite: 'https://www.notion.com/startups',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  updatedAt: new Date().toISOString()
};

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log('✅ Notion deal updated with full details!');
