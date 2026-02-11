#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const airtableDeal = {
  id: 'airtable-for-startups',
  slug: 'airtable-for-startups',
  title: 'Airtable for Startups — $1,000 in Credits',
  provider: 'Airtable',
  category: 'project-management',
  subcategory: 'productivity',
  tags: ['no-code', 'database', 'project-management', 'crm', 'workflow-automation', 'spreadsheet'],
  value: '$1,000 in credits',
  savings: '$1,000',
  savingsAmount: 1000,
  shortDescription: 'No-code database platform for building CRMs, project trackers, and custom workflows. $1,000 in credits (1 year validity).',
  description: `Airtable for Startups provides $1,000 in credits to build custom workflows, databases, and no-code apps. Credits apply to Team and Business plans.

What's Included:
• $1,000 in Airtable credits (1 year validity)
• Access to Team or Business plan features
• Exclusive startup content & resources
• Office hours and educational materials
• 50+ pre-built templates
• 1,000+ integrations (Slack, Google Drive, Salesforce, Zapier)

What You Can Build:
• CRM and sales pipelines
• Content calendars and marketing trackers
• Product roadmaps and project management
• Inventory and order tracking
• Fundraising outreach and investor CRM
• HR workflows and applicant tracking

Key Features:
• Relational database + spreadsheet simplicity
• Custom interfaces and views
• Automations (no code)
• AI-powered data categorization
• Real-time collaboration
• API access for developers

Pricing After Credits:
• Team: $20/user/month (billed annually)
• Business: $45/user/month (billed annually)
• Free plan available (limited features)

Best for: Startups needing flexible project management, CRM, content operations, or custom workflow tools without coding.

Not ideal for: Companies that previously received Airtable credits or need enterprise-grade security features.`,
  eligibility: [
    'Early-stage startup',
    'Fewer than 50 employees',
    'Raised up to Series B funding',
    'Must use company email',
    'Not previously received Airtable credits',
    'One redemption per company'
  ],
  applicationProcess: [
    'Create a free Airtable account at airtable.com/signup',
    'Use your company email (not personal)',
    'Go to Airtable for Startups application form',
    'Provide company details and workspace ID',
    'Wait for approval (3-5 days)',
    'Credits applied to your specified workspace'
  ],
  benefits: [
    '$1,000 in Airtable credits (1 year validity)',
    'Access to Team or Business plan features',
    'Exclusive startup content & resources',
    'Office hours and educational materials',
    '50+ pre-built templates',
    '1,000+ integrations'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Early-stage startups with <50 employees, raised up to Series B. Must not have previously received Airtable credits.'
    },
    {
      question: 'Can existing Airtable customers apply?',
      answer: 'Yes! Existing paying customers can also receive credits. Use the same email associated with your Airtable account.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3-5 business days. Airtable reviews applications on a rolling basis.'
    },
    {
      question: 'What happens when credits run out?',
      answer: 'You can continue on a paid plan (Team $20/user/mo, Business $45/user/mo) or downgrade to the free plan.'
    },
    {
      question: 'Can I stack this with other Airtable deals?',
      answer: 'No. This deal cannot be combined with another deal of the same value.'
    },
    {
      question: "What's the difference between Team and Business plans?",
      answer: 'Team: Basic collaboration features, automations, and integrations. Business: Advanced permissions, admin controls, and SAML SSO.'
    },
    {
      question: 'Is there a free plan?',
      answer: "Yes. Airtable's free plan includes unlimited bases with limited records (1,000 per base) and basic features."
    }
  ],
  applicationUrl: 'https://airtable.com/appGGpHNlmMUkfLol/shrghfGlQLt411Tyr',
  providerWebsite: 'https://www.airtable.com/startups',
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '10 minutes',
  approvalTime: '3-5 days',
  difficulty: 'easy',
  successRate: '85%+',
  lastVerified: '2025-01-27',
  appliedCount: 2000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add Airtable deal
const existingIndex = deals.findIndex(d => 
  d.slug === 'airtable-for-startups' ||
  d.slug === 'airtable' ||
  d.title?.toLowerCase().includes('airtable')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...airtableDeal };
  console.log('✅ Updated existing Airtable deal');
} else {
  deals.push(airtableDeal);
  console.log('✅ Added new Airtable deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
