#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const intercomDeal = {
  id: 'intercom-early-stage',
  slug: 'intercom-early-stage',
  title: 'Intercom Early Stage — 90% Off + Fin AI Free',
  provider: 'Intercom',
  category: 'customer',
  subcategory: 'customer-experience',
  tags: ['customer-support', 'live-chat', 'ai-agent', 'helpdesk', 'startup-program', 'saas'],
  value: '$15,000+ in perks',
  savings: '$15,000+',
  savingsAmount: 15000,
  shortDescription: 'AI-first customer service platform with live chat, helpdesk, and AI agent. 90% off + 1 year Fin AI free (300 resolutions/month).',
  description: `Intercom's Early Stage Program gives startups 90% off their complete Customer Service Suite, including Fin—the #1 AI agent in customer service—free for a full year with 300 monthly resolutions. That's equivalent to having a full-time human support agent at no cost.

The discount decreases over 3 years:
• Year 1: 90% discount + 300 free Fin resolutions/month
• Year 2: 50% discount + 150 free Fin resolutions/month
• Year 3: 25% discount + 75 free Fin resolutions/month

What's Included in Year 1:
• 6 Advanced Seats (full feature access)
• 6 Copilot Seats (AI-powered agent assistance)
• 20 Lite Seats (basic access)
• Proactive Support Plus: 500 messages/month (product tours, checklists, surveys)
• 300 Fin AI resolutions/month (worth ~$297/month)
• AI-enhanced inbox for speed and efficiency
• Integrated ticketing system
• Outbound messaging for onboarding and notifications
• Help center for self-service support

Pricing:
• Starts from $65/month (after 90% discount in Year 1)
• Regular price would be $650+/month
• Fin resolutions beyond 300/month charged at $0.99 each
• Phone, SMS, and WhatsApp charged at list price

Best for: Early-stage startups building customer-facing products who need professional customer support tools. Ideal for SaaS, marketplaces, and consumer apps.

Not ideal for: Companies with more than 15 employees or over $10M in funding. Also not suitable if you're already an Intercom customer.

Notable users: Anthropic, Lovable, Clay, Perplexity, Consensus, Gamma, Synthesia

Legal Note: The 90% discount applies to base pricing and usage costs for Email and Messages over 500/month. Discount does NOT apply to Fin resolutions over 300/month, Phone, SMS, or WhatsApp.`,
  eligibility: [
    'Raised up to $10M in funding (no more)',
    'Fewer than 15 employees',
    'Not currently an Intercom customer',
    'Must be a new Intercom signup'
  ],
  applicationProcess: [
    'Click "Apply Now" to go to Intercom\'s Early Stage signup page',
    'Create an Intercom account with your company email',
    'Provide company details: name, website, employee count, funding raised',
    'Verify your eligibility (under $10M funding, under 15 employees)',
    'Get approved and start using Intercom with 90% discount immediately'
  ],
  benefits: [
    '90% off Year 1, 50% Year 2, 25% Year 3',
    '6 Advanced Seats + 6 Copilot Seats + 20 Lite Seats',
    '300 free Fin AI resolutions/month (Year 1)',
    'Proactive Support Plus: 500 messages/month',
    'AI-enhanced inbox',
    'Integrated ticketing system',
    'Help center for self-service support'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Startups that have raised up to $10M in funding, have fewer than 15 employees, and are not currently Intercom customers. You must be a new signup to qualify.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Most applications are approved within 1-3 business days. Some may be approved instantly if eligibility is clearly met.'
    },
    {
      question: 'What do I need to apply?',
      answer: 'Company email, basic company information (name, website, employee count), and funding details. No pitch deck or financial documents required.'
    },
    {
      question: 'What happens after Year 1?',
      answer: 'Your discount decreases: 50% off in Year 2 (with 150 free Fin resolutions/month), then 25% off in Year 3 (with 75 free Fin resolutions/month). After Year 3, you can stay on discounted pricing or switch to their Essential plan starting at $39/seat/month.'
    },
    {
      question: 'What if we grow beyond 15 employees?',
      answer: 'You can continue using Intercom with your existing discount for the remainder of your term. The eligibility requirements only apply at the time of application.'
    },
    {
      question: 'Can I use Fin AI Agent for free?',
      answer: 'Yes! You get 300 Fin resolutions per month free in Year 1. Each resolution beyond 300 costs $0.99. This is equivalent to having a full-time support agent.'
    },
    {
      question: "What's NOT included in the discount?",
      answer: 'Phone calls, SMS, and WhatsApp are charged at list price. Fin resolutions beyond 300/month are also charged separately at $0.99 each.'
    },
    {
      question: "What if my company isn't eligible?",
      answer: "You can start a regular trial on Intercom's pricing page or contact their Sales team for alternative options."
    }
  ],
  applicationUrl: 'https://app.intercom.com/admins/sign_up?solution_id=26',
  providerWebsite: 'https://www.intercom.com/early-stage',
  logoUrl: 'https://images.prismic.io/intercom-hp/5b7c0c0a-0c7a-4d4c-9d4e-b5b3c0c1d9af_intercom-logo.svg',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '10 minutes',
  approvalTime: '1-3 days',
  difficulty: 'easy',
  successRate: '85%+',
  lastVerified: '2025-01-27',
  appliedCount: 1200,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add Intercom deal
const existingIndex = deals.findIndex(d => 
  d.slug === 'intercom-early-stage' ||
  d.slug?.includes('intercom') ||
  d.title?.toLowerCase().includes('intercom')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...intercomDeal };
  console.log('✅ Updated existing Intercom deal');
} else {
  deals.push(intercomDeal);
  console.log('✅ Added new Intercom deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
