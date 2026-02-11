#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const auth0Deal = {
  id: 'auth0-for-startups',
  slug: 'auth0-for-startups',
  title: 'Auth0 for Startups — 12 Months Free',
  provider: 'Auth0 (Okta)',
  category: 'development',
  subcategory: 'authentication',
  tags: ['authentication', 'sso', 'identity-management', 'mfa', 'authorization', 'security'],
  value: '$20,000+ in perks',
  savings: '$20,000+',
  savingsAmount: 20000,
  shortDescription: 'Enterprise authentication & authorization platform with SSO, MFA, and identity management. 12 months free on B2B Professional plan.',
  description: `Auth0 for Startups provides 12 months free access to the B2B Professional plan — the same enterprise-grade authentication used by companies like Pfizer, AMD, and Gymshark.

What's Included:
• 100,000 Monthly Active Users (MAUs)
• Unlimited Organizations (multi-tenant support)
• Enterprise MFA (Multi-Factor Authentication)
• 5 Enterprise SSO connections (SAML/OIDC)
• Breached password detection
• 50+ integrations & 60+ SDKs
• Universal login & passwordless authentication
• Role-based access control (RBAC)
• Priority email support

After 12 Months:
• Downgrade to Free plan (25,000 MAUs, limited features)
• Or continue on paid plans starting ~$35/month

Best for: SaaS startups, B2B platforms, apps requiring secure user authentication, SSO, or multi-tenant architecture.

Not ideal for: Existing Auth0/Okta paid customers or companies previously in this program.`,
  eligibility: [
    'Less than $5M USD in funding',
    'Less than $1M USD in Annual Recurring Revenue',
    'Company less than 2 years old',
    'Not an existing paid Auth0/Okta customer',
    'Not previously enrolled in this program'
  ],
  applicationProcess: [
    'Visit Auth0 for Startups page',
    'Click "Apply Now" and create an Auth0 account',
    'Provide company details: funding amount, ARR, incorporation date',
    'Submit verification documents if requested',
    'Receive approval and access B2B Professional plan'
  ],
  benefits: [
    '100,000 Monthly Active Users (MAUs)',
    'Unlimited Organizations (multi-tenant support)',
    'Enterprise MFA (Multi-Factor Authentication)',
    '5 Enterprise SSO connections (SAML/OIDC)',
    'Breached password detection',
    '50+ integrations & 60+ SDKs',
    'Universal login & passwordless authentication',
    'Role-based access control (RBAC)',
    'Priority email support'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Startups with less than $5M funding, under $1M ARR, and less than 2 years old from incorporation date. Must be new to Auth0.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3-7 business days. Some applications may require additional documentation.'
    },
    {
      question: 'What happens after 12 months?',
      answer: 'Your account downgrades to the Free plan (25,000 MAUs) or you can continue on paid plans.'
    },
    {
      question: 'Can I use this for B2C apps?',
      answer: 'Yes, the B2B Professional plan works for both B2B and B2C applications.'
    },
    {
      question: "What's the difference vs. the free plan?",
      answer: 'Startup program: 100K MAUs, enterprise MFA, 5 SSO connections, unlimited organizations. Free plan: 25K MAUs, basic features, no enterprise SSO.'
    },
    {
      question: 'Is Auth0 hard to implement?',
      answer: 'No. Auth0 provides 60+ SDKs and can be integrated in hours. Documentation is extensive.'
    }
  ],
  applicationUrl: 'https://auth0.com/startups',
  providerWebsite: 'https://auth0.com',
  logoUrl: 'https://cdn.simpleicons.org/auth0/EB5424',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '15 minutes',
  approvalTime: '3-7 days',
  difficulty: 'easy',
  successRate: '80%+',
  lastVerified: '2025-01-27',
  appliedCount: 1200,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add Auth0 deal
const existingIndex = deals.findIndex(d => 
  d.slug === 'auth0-for-startups' ||
  d.slug?.includes('auth0') ||
  d.title?.toLowerCase().includes('auth0')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...auth0Deal };
  console.log('✅ Updated existing Auth0 deal');
} else {
  deals.push(auth0Deal);
  console.log('✅ Added new Auth0 deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
