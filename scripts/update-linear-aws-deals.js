#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

// Linear for Startups
const linearDeal = {
  id: 'linear-for-startups',
  slug: 'linear-for-startups',
  title: 'Linear for Startups — Free for 1 Year',
  provider: 'Linear',
  category: 'project-management',
  subcategory: 'task-management',
  tags: ['project-management', 'issue-tracking', 'agile', 'product-development', 'engineering'],
  value: 'Free for 1 year',
  savings: '$1,200+',
  savingsAmount: 1200,
  shortDescription: 'Modern issue tracking and project management for high-performance teams. Free for 1 year for qualifying startups.',
  description: `Linear for Startups provides free access to Linear's powerful issue tracking and project management platform for 1 year.

What's Included:
• Full Linear Pro features for 1 year
• Unlimited issues and projects
• Cycles and roadmaps
• GitHub, GitLab, Slack integrations
• API access
• Priority support

Best for: Engineering teams, product teams, and startups that need fast, keyboard-first issue tracking.

Not ideal for: Non-tech teams or companies already on Linear paid plans.`,
  eligibility: [
    'Early-stage startup',
    'Less than 50 employees',
    'Not currently on a Linear paid plan'
  ],
  applicationProcess: [
    'Visit linear.app/startups',
    'Sign up or log in to Linear',
    'Apply for the startup program',
    'Provide company details',
    'Get approved and enjoy free access'
  ],
  benefits: [
    'Full Linear Pro features',
    'Unlimited issues and projects',
    'Cycles and roadmaps',
    'GitHub, GitLab, Slack integrations',
    'API access',
    'Priority support'
  ],
  faqs: [
    {
      question: 'Who is eligible?',
      answer: 'Early-stage startups with less than 50 employees who are not currently on a Linear paid plan.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3-5 business days.'
    },
    {
      question: 'What happens after 1 year?',
      answer: 'You can continue on a paid plan or downgrade to the free tier.'
    }
  ],
  applicationUrl: 'https://linear.app/startups',
  providerWebsite: 'https://linear.app',
  logoUrl: 'https://linear.app/static/apple-touch-icon.png',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '10 minutes',
  approvalTime: '3-5 days',
  difficulty: 'easy',
  successRate: '85%+',
  lastVerified: '2025-01-27',
  appliedCount: 1000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// AWS Activate
const awsDeal = {
  id: 'aws-activate',
  slug: 'aws-activate',
  title: 'AWS Activate — Up to $100,000 in Cloud Credits',
  provider: 'Amazon Web Services',
  category: 'data',
  subcategory: 'cloud-computing',
  tags: ['cloud-credits', 'aws', 'infrastructure', 'compute', 'ai-ml', 'amazon-bedrock', 'startup-program'],
  value: 'Up to $100,000 in credits',
  savings: '$100,000',
  savingsAmount: 100000,
  shortDescription: "World's leading cloud platform. Credits for EC2, S3, Lambda, AI/ML, and 200+ services. $1K (self-funded) to $100K (VC-backed).",
  description: `AWS Activate is Amazon's flagship startup program, providing cloud credits to build, test, and scale on AWS. Over 350,000 startups globally have joined since 2013, with AWS providing $8+ billion in promotional credits.

Two Credit Packages Available:

Activate Founders — $1,000
For self-funded, early-stage startups without VC backing.

Activate Portfolio — Up to $100,000
For startups affiliated with an Activate Provider (VC, accelerator, incubator). Requires Organization ID (Org ID) from your provider.

What Credits Cover:
• 200+ AWS services (EC2, S3, RDS, Lambda, etc.)
• Amazon Bedrock (AI/ML foundation models)
• Third-party AI models (Anthropic, Meta, AI21 Labs, Cohere)
• AWS Business Support (included with Portfolio)
• Infrastructure, compute, storage, databases
• Machine learning and AI services

What Credits DON'T Cover:
• Reserved Instances upfront payments
• AWS Marketplace third-party software (some exceptions)
• Route 53 domain registration fees
• Historical/past bills (only future usage)

Credit Validity:
• Founders: 2 years
• Portfolio: 1-2 years (varies by provider)

Best for: Any startup building on cloud infrastructure — SaaS, AI/ML, mobile apps, web platforms, data analytics, IoT.

Not ideal for: Series B+ startups, companies with existing high AWS credits, or those not building tech products.

Activate Providers Include: Y Combinator, Sequoia Capital, Andreessen Horowitz (a16z), Greylock Partners, NVIDIA, Carta, Techstars, 500 Global, and 1000s more.

Notable users: Airbnb, Stripe, Slack, Perplexity, Hugging Face, Rappi`,
  eligibility: [
    'Pre-Series B startup (Seed, Series A OK)',
    'Founded in the last 10 years',
    'Have a functioning company website',
    'AWS account on Paid Tier (not Free Tier)',
    'New to AWS Activate Credits OR requesting more than previously received',
    'For Portfolio: Must have Org ID from an Activate Provider'
  ],
  applicationProcess: [
    'Go to aws.amazon.com/startups/credits and click "Apply Now"',
    'Create an AWS Builder ID (use personal email) or sign in',
    'Complete your AWS Activate profile (use business email)',
    'Select package: Founders ($1K) or Portfolio (up to $100K)',
    'Provide startup details: funding stage, product info, website',
    'Link your AWS account (must have admin permissions)',
    'Verify your AWS account',
    'Review and submit application',
    'Wait 7-10 business days for approval email'
  ],
  benefits: [
    'Up to $100,000 in AWS credits',
    '200+ AWS services covered',
    'Amazon Bedrock AI/ML access',
    'AWS Business Support (Portfolio)',
    '2 year credit validity (Founders)',
    'Third-party AI models included'
  ],
  faqs: [
    {
      question: 'Who is eligible for AWS Activate?',
      answer: 'Pre-Series B startups founded in the last 10 years with a company website. Must have an AWS account on Paid Tier (not Free Tier).'
    },
    {
      question: "What's the difference between Founders and Portfolio?",
      answer: 'Founders ($1K) is for self-funded startups. Portfolio (up to $100K) is for startups backed by a VC, accelerator, or Activate Provider — you need their Org ID.'
    },
    {
      question: 'How long does approval take?',
      answer: '7-10 business days. Check status at aws.amazon.com/startups/credits/status.'
    },
    {
      question: 'How long are credits valid?',
      answer: 'Typically 1-2 years depending on package. Check your AWS Billing Console for exact expiration date.'
    },
    {
      question: 'Can I apply multiple times?',
      answer: "Yes, if you're requesting MORE credits than previously received. You cannot get duplicate credits."
    },
    {
      question: 'Do credits cover AI/ML services?',
      answer: 'Yes! Credits work on Amazon Bedrock and third-party foundation models (Anthropic Claude, Meta Llama, etc.).'
    },
    {
      question: 'What happens when credits expire?',
      answer: "You'll be charged standard AWS rates for any ongoing services. Set calendar reminders!"
    },
    {
      question: 'My application was rejected. Why?',
      answer: 'Common reasons: incorrect funding stage, website issues, domain mismatch between application and AWS account, or already received maximum credits.'
    }
  ],
  applicationUrl: 'https://aws.amazon.com/startups/credits',
  providerWebsite: 'https://aws.amazon.com/startups',
  logoUrl: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '15-30 minutes',
  approvalTime: '7-10 business days',
  difficulty: 'medium',
  successRate: '75%+',
  lastVerified: '2025-01-27',
  appliedCount: 350000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Update or add Linear
let linearIndex = deals.findIndex(d => d.slug?.includes('linear') || d.title?.toLowerCase().includes('linear'));
if (linearIndex >= 0) {
  deals[linearIndex] = { ...deals[linearIndex], ...linearDeal };
  console.log('✅ Updated Linear deal');
} else {
  deals.push(linearDeal);
  console.log('✅ Added Linear deal');
}

// Update or add AWS
let awsIndex = deals.findIndex(d => d.slug === 'aws-activate' || d.title?.toLowerCase().includes('aws activate'));
if (awsIndex >= 0) {
  deals[awsIndex] = { ...deals[awsIndex], ...awsDeal };
  console.log('✅ Updated AWS Activate deal');
} else {
  deals.push(awsDeal);
  console.log('✅ Added AWS Activate deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
