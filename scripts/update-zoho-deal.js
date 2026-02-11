const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Zoho for Startups deal data
const zohoDeal = {
  id: 'zoho-for-startups',
  slug: 'zoho-for-startups',
  title: 'Zoho for Startups — ₹1,86,000 in Credits (~$2,200)',
  provider: 'Zoho',
  category: 'saas-discounts',
  subcategory: 'business-software',
  value: '₹1,86,000 (~$2,200 USD)',
  enhancedValue: '₹1,86,000',
  shortDescription: 'Up to ₹1,86,000 in Zoho Wallet Credits (~$2,200 USD) valid for 360 days. Access 55+ integrated business applications including CRM, project management, accounting, HR, and collaboration tools.',
  description: `Zoho for Startups provides up to ₹1,86,000 in Zoho Wallet Credits (approximately $2,200 USD) valid for 360 days, enabling startups to access 55+ integrated business applications including CRM, project management, accounting, HR, and collaboration tools. The program is designed for DPIIT-recognized startups or those affiliated with Zoho collaborator incubators/accelerators.`,
  detailedDescription: `Zoho for Startups provides up to ₹1,86,000 in Zoho Wallet Credits (approximately $2,200 USD) valid for 360 days, enabling startups to access 55+ integrated business applications including CRM, project management, accounting, HR, and collaboration tools. The program is designed for DPIIT-recognized startups or those affiliated with Zoho collaborator incubators/accelerators.

What's Covered:
• Stage 1: ₹1,00,000 in Zoho Wallet Credits (all eligible startups)
• Stage 2: Additional ₹86,000 credits for domain hosting with Zoho
• Access to 55+ Zoho applications (CRM, Books, Projects, Mail, Workplace, etc.)
• Free weekday email support
• Free consultation with Zoho experts
• Implementation/training via Zoho Partners
• 360-day validity period

What's NOT Covered:
• Zoho Voice, Zoho Start, Zoho Sign API credits plan
• Zoho Campaigns Pay-as-you-go edition
• Zoho Domains, Zoho Backstage
• Stage 2 credits cannot be used for Zoho Workplace & Zoho Mail

Key Insights:
• ₹1.86 lakhs total value: Stage 1 (₹1L) + Stage 2 (₹86K) credits for maximum benefit
• 360-day validity: Full year to explore and implement Zoho suite
• 55+ applications: Complete business software ecosystem (CRM, accounting, HR, project management)
• Two-stage distribution: Stage 2 credits require domain hosting within 15 days
• Zoho Workplace limit: Stage 2 credits cannot be used for Workplace/Mail (₹1L upper limit)
• One-time benefit: Cannot reapply after using credits, even if unused
• Premium startups: Startup India tax-exempted, National Startup Awards winners, SISFS startups get up to ₹3 lakhs
• Made in India: Zoho is an Indian company supporting the Indian startup ecosystem`,
  benefits: [
    'Stage 1: ₹1,00,000 Zoho Wallet Credits (all eligible startups)',
    'Stage 2: ₹86,000 additional credits (domain hosting required)',
    'Total value up to ₹1,86,000 (~$2,200 USD)',
    '360 days validity from credit issuance',
    '55+ integrated apps (CRM, Books, Projects, Mail, etc.)',
    'Free weekday email technical support',
    'Free expert consultation for app selection',
    'Implementation support via Zoho Partners',
    'Credits for subscriptions, upgrades, add-ons, monthly renewals'
  ],
  eligibility: [
    'DPIIT-recognized startup OR affiliated with Zoho collaborator incubator/accelerator',
    'Aligned with Startup India definition (incorporated within 10 years, turnover <₹100 crore)',
    'New or free Zoho user (no active/previous paid subscriptions)',
    'First-time applicant (no history of Zoho Wallet Credits or Zoho One benefits)',
    'Valid business entity with primary/admin email address',
    'Stage 2: Domain hosting with Zoho must be set up within 15 days of Stage 1 credits'
  ],
  applicationProcess: [
    'Create a Zoho account using your organization\'s primary/admin email at www.zoho.com',
    'Visit the registration page at zoho.com/startups/founders-registration.html',
    'Complete the application form with company details and registration information',
    'Provide DPIIT recognition certificate OR accelerator/incubator affiliation proof',
    'Include business description and stage',
    'Submit application for validation',
    'Receive welcome email from Zoho for Startups team (respond to email)',
    'Await validation (5-7 business days from application date)',
    'Receive Stage 1 credits (₹1,00,000) upon approval',
    'Optional: Set up domain hosting within 15 days to unlock Stage 2 credits (₹86,000)',
    'Start using credits to purchase Zoho applications (360-day validity)'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to ₹1,86,000 (~$2,200 USD) in Zoho Wallet Credits. Stage 1 provides ₹1,00,000 for all eligible startups, and Stage 2 adds ₹86,000 if you set up domain hosting with Zoho within 15 days.'
    },
    {
      question: 'Who is eligible for Zoho for Startups?',
      answer: 'DPIIT-recognized Indian startups or those affiliated with Zoho collaborator incubators/accelerators. Must be new or free Zoho users with no previous paid subscriptions.'
    },
    {
      question: 'How long are the credits valid?',
      answer: '360 days from credit issuance. This gives you a full year to explore and implement the Zoho suite.'
    },
    {
      question: 'What applications are included?',
      answer: '55+ integrated Zoho applications including CRM, Books, Projects, Mail, Workplace, and more. Some exclusions apply (Zoho Voice, Zoho Start, Zoho Sign API credits plan).'
    },
    {
      question: 'Can I reapply if I don\'t use all credits?',
      answer: 'No. This is a one-time benefit. You cannot reapply after using credits, even if unused.'
    },
    {
      question: 'Are there premium benefits for certain startups?',
      answer: 'Yes. Startup India tax-exempted startups, National Startup Awards winners, and SISFS startups can get up to ₹3 lakhs in credits.'
    }
  ],
  tags: ['business-software', 'crm', 'accounting', 'project-management', 'hr', 'collaboration', 'india', 'startups', 'zoho'],
  status: 'active',
  applicationUrl: 'https://www.zoho.com/startups/founders-registration.html',
  logoUrl: 'https://www.zoho.com/favicon.ico',
  brandIcon: 'https://www.zoho.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save ₹1,86,000',
  savingsAmount: 2200,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing Zoho deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isZoho = 
    slugLower.includes('zoho') ||
    titleLower.includes('zoho') ||
    providerLower === 'zoho';
  
  if (isZoho) {
    console.log(`Removing existing Zoho deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isZoho;
});

// Add the new comprehensive Zoho deal
filteredDeals.push(zohoDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Zoho for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${zohoDeal.title}`);
console.log(`- Value: ${zohoDeal.value}`);
console.log(`- Application URL: ${zohoDeal.applicationUrl}`);
console.log(`- Benefits: ${zohoDeal.benefits.length} items`);
console.log(`- Eligibility: ${zohoDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${zohoDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${zohoDeal.faqs.length} questions`);
