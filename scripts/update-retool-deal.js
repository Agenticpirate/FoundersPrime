const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Retool for Startups deal data
const retoolDeal = {
  id: 'retool-for-startups',
  slug: 'retool-for-startups',
  title: 'Retool for Startups — 1 Year Free (Up to $60K Value)',
  provider: 'Retool',
  category: 'development',
  subcategory: 'low-code',
  value: 'Up to $60,000',
  enhancedValue: '$60,000',
  shortDescription: '1 year 100% free on Team or Business plans to build internal tools, admin panels, dashboards, and customer portals. Plus 25% off year 2 and $200K in partner deals.',
  description: `Retool for Startups provides eligible early-stage companies with 1 year completely free on Team or Business plans to build custom internal tools, admin panels, dashboards, and customer portals. The program helps startups automate manual processes and stay lean while finding product-market fit.`,
  detailedDescription: `Retool for Startups provides eligible early-stage companies with 1 year completely free on Team or Business plans to build custom internal tools, admin panels, dashboards, and customer portals. The program helps startups automate manual processes and stay lean while finding product-market fit.

What You Get:
• 100% off for 1 year on Team or Business monthly plans (up to $60K value)
• 25% discount on year 2 after free period ends
• $200K in partner deals (additional startup credits and tools from Retool partners)

Full Platform Access:
• AI Agents and AI primitives
• App builder (internal tools, admin panels, dashboards)
• Mobile apps
• Workflows (automation)
• Database (Retool Database)
• External apps (customer-facing portals)
• 100+ integrations (PostgreSQL, MySQL, MongoDB, REST APIs, GraphQL, etc.)

What's Covered:
• All features on Team or Business plan including unlimited apps, workflows, and users
• AI capabilities, mobile apps, and database access
• Community support and documentation

What's NOT Included:
• Enterprise features (SSO, advanced security, dedicated support) unless on Business plan
• Self-hosted deployments (cloud-only)
• Cannot combine with other Retool sales discounts`,
  benefits: [
    '100% off for 1 year on Team or Business monthly plans',
    'Up to $60,000 value',
    '25% discount on year 2 after free period',
    '$200K in partner deals from Retool partners',
    'AI Agents and AI primitives',
    'App builder for internal tools, admin panels, dashboards',
    'Mobile apps support',
    'Workflows for automation',
    'Retool Database included',
    'External apps for customer-facing portals',
    '100+ integrations (PostgreSQL, MySQL, MongoDB, REST APIs, GraphQL)',
    'Unlimited apps, workflows, and users'
  ],
  eligibility: [
    'Raised less than $10M in total funding (bootstrapped, angel, debt, pre-seed, seed, or Series A)',
    'Founded within the last 10 years',
    'New Retool customer (not already on a paid plan for multiple billing cycles)',
    'Must use monthly Team or Business plan (cannot use with annual plans or other sales discounts)'
  ],
  applicationProcess: [
    'Sign up for Retool and upgrade to a monthly Team or Business plan at login.retool.com/auth/signup',
    'Submit the startup program application form',
    'Provide company details: funding stage, amount raised, founding date, business description',
    'Await approval (typically 3–5 business days)',
    'Once accepted, 100% discount applies automatically to your first invoice at end of first billing cycle'
  ],
  faqs: [
    {
      question: 'How much is the Retool Startups program worth?',
      answer: 'Up to $60,000 for 1 year free on Team or Business plans, plus 25% off year 2 and $200K in partner deals.'
    },
    {
      question: 'Who is eligible for Retool for Startups?',
      answer: 'Startups that have raised less than $10M in total funding, founded within the last 10 years, and are new Retool customers. Must use monthly Team or Business plan.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Typically 3–5 business days after submitting the application.'
    },
    {
      question: 'What can I build with Retool?',
      answer: 'Internal tools, admin panels, dashboards, customer support tools, operations automation, data management panels, and customer-facing portals.'
    },
    {
      question: 'What\'s NOT included?',
      answer: 'Enterprise features (SSO, advanced security, dedicated support) unless on Business plan, self-hosted deployments (cloud-only), and cannot combine with other Retool sales discounts.'
    },
    {
      question: 'What happens after year 1?',
      answer: 'You get 25% off year 2. After that, standard pricing applies.'
    }
  ],
  tags: ['internal-tools', 'low-code', 'app-builder', 'retool', 'dashboards', 'admin-panels', 'automation', 'startups'],
  status: 'active',
  applicationUrl: 'https://retool.com/startups',
  logoUrl: 'https://retool.com/favicon.ico',
  brandIcon: 'https://retool.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $60,000',
  savingsAmount: 60000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🛠️'
};

// Find existing Retool deal(s) and remove them
const retoolPatterns = ['retool'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isRetool = retoolPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isRetool) {
    console.log(`Removing existing Retool deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isRetool;
});

// Add the new comprehensive Retool deal
filteredDeals.push(retoolDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Retool for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${retoolDeal.title}`);
console.log(`- Value: ${retoolDeal.value}`);
console.log(`- Application URL: ${retoolDeal.applicationUrl}`);
console.log(`- Benefits: ${retoolDeal.benefits.length} items`);
console.log(`- Eligibility: ${retoolDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${retoolDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${retoolDeal.faqs.length} questions`);
