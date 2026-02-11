const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// GitHub for Startups deal data
const githubDeal = {
  id: 'github-for-startups',
  slug: 'github-for-startups',
  title: 'GitHub for Startups — 20 Seats Free for 1 Year + 50% Off Year 2',
  provider: 'GitHub',
  category: 'development',
  subcategory: 'devops',
  value: 'Up to $7,560 in credits',
  enhancedValue: '$7,560',
  shortDescription: '20 seats of GitHub Enterprise free for 1 year + 50% off year 2. Optional Advanced Security discounts. Access to 30,000+ startup community across 145+ countries.',
  description: `GitHub for Startups provides early-stage funded startups with 20 free seats of GitHub Enterprise for one year, plus 50% off in year two. The program also offers discounts on GitHub Advanced Security (50% off year 1, 25% off year 2) and access to a global startup community of 30,000+ startups across 145+ countries.`,
  detailedDescription: `GitHub for Startups provides early-stage funded startups with 20 free seats of GitHub Enterprise for one year, plus 50% off in year two. The program also offers discounts on GitHub Advanced Security (50% off year 1, 25% off year 2) and access to a global startup community of 30,000+ startups across 145+ countries.

What You Get:
• 20 seats of GitHub Enterprise free for 1 year + 50% off in year 2
• GitHub Advanced Security: 50% off year 1, 25% off year 2 (optional, must contact team before applying)
• Full Enterprise features: advanced collaboration, CI/CD, code security, project management
• Access to exclusive startup events and resources
• Global startup community network (30,000+ startups, 145+ countries)

What's Covered:
• GitHub Enterprise subscription for 20 seats (1 year free)
• Advanced Security discounts (if applicable)
• Community access and startup resources

What's NOT Covered:
• Seats beyond the 20 included (charged at standard rates)
• Metered add-ons: Copilot, larger runners, Codespaces (charged separately)
• Pay-as-you-go billing (must switch to subscription model)
• Enterprise Accounts with managed users

Important Notes:
• Existing GitHub customers CAN apply — credits will be added to current account
• Must provide proof of funding from credible third-party sources (Crunchbase, news, investor pages)
• Cannot use personal emails or emails that don't match company domain
• If you need Advanced Security, contact GitHub team BEFORE applying`,
  benefits: [
    '20 seats of GitHub Enterprise free for 1 year',
    '50% off year 2 subscription',
    'GitHub Advanced Security: 50% off year 1, 25% off year 2 (optional)',
    'Full Enterprise features: collaboration, CI/CD, code security',
    'Project management and code review tools',
    'Access to exclusive startup events and resources',
    'Global startup community (30,000+ startups, 145+ countries)',
    'Existing customers can apply (credits added to current account)',
    'Advanced collaboration and team management',
    'Enterprise-grade security and compliance'
  ],
  eligibility: [
    'Received outside funding (Pre-Seed to Series B or earlier)',
    'New to GitHub Enterprise/Advanced Security (or not on Enterprise for past 6 months)',
    'Valid payment method required on file',
    'Must use subscription model (not pay-as-you-go)',
    'Proof of funding required (Crunchbase, news, investor portfolio)',
    'Business email with company domain (personal emails rejected)'
  ],
  applicationProcess: [
    'Sign up for a GitHub Enterprise trial with personal accounts (not managed users)',
    'Ensure a valid payment method is on file',
    'If interested in Advanced Security, contact GitHub for Startups team BEFORE applying',
    'Complete the application form indicating your Startups Partner',
    'Provide company details, website, role, work email (must match company domain)',
    'Enter funding stage, total raised, and proof of funding (third-party links)',
    'Provide link to GitHub Enterprise account (format: github.com/enterprises/SLUG)',
    'Accept GitHub Customer Agreement and GitHub for Startups Terms',
    'Submit application — GitHub team reviews within 2–3 business days',
    'If approved, benefits are applied and you receive a welcome email'
  ],
  faqs: [
    {
      question: 'How much is GitHub for Startups worth?',
      answer: 'Up to $7,560 — 20 seats of GitHub Enterprise free for 1 year (20 × $378/year) plus 50% off year 2. Optional Advanced Security discounts available.'
    },
    {
      question: 'Who is eligible for GitHub for Startups?',
      answer: 'Early-stage funded startups from Pre-Seed to Series B. Must be new to GitHub Enterprise (or not on Enterprise for past 6 months) and provide proof of funding from credible third-party sources.'
    },
    {
      question: 'Can existing GitHub customers apply?',
      answer: 'Yes! Existing GitHub customers can apply and credits will be added to their current account. However, you must not have been on Enterprise plan for the past 6 months.'
    },
    {
      question: 'What proof of funding is required?',
      answer: 'Credible third-party sources like Crunchbase, news articles, or investor portfolio pages. Self-published content is not accepted. "Stealth" is acceptable for stealth startups.'
    },
    {
      question: 'What\'s NOT included?',
      answer: 'Seats beyond 20 (charged at standard rates), metered add-ons (Copilot, Codespaces, larger runners), pay-as-you-go billing, and Enterprise Accounts with managed users.'
    },
    {
      question: 'How do I get Advanced Security discounts?',
      answer: 'Contact the GitHub for Startups team BEFORE applying to ensure correct setup for Advanced Security benefits (50% off year 1, 25% off year 2).'
    }
  ],
  tags: ['developer-tools', 'github', 'enterprise', 'code-collaboration', 'ci-cd', 'devops', 'startups'],
  status: 'active',
  applicationUrl: 'https://resources.github.com/startups/',
  logoUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  brandIcon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $7,560',
  savingsAmount: 7560,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '💻'
};

// Find existing GitHub for Startups deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  // Only remove GitHub for Startups deals, not other GitHub-related deals
  const isGitHubStartups = 
    slugLower === 'github-for-startups' ||
    (titleLower.includes('github') && titleLower.includes('startup')) ||
    (providerLower === 'github' && titleLower.includes('enterprise'));
  
  if (isGitHubStartups) {
    console.log(`Removing existing GitHub for Startups deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isGitHubStartups;
});

// Add the new comprehensive GitHub deal
filteredDeals.push(githubDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ GitHub for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${githubDeal.title}`);
console.log(`- Value: ${githubDeal.value}`);
console.log(`- Application URL: ${githubDeal.applicationUrl}`);
console.log(`- Benefits: ${githubDeal.benefits.length} items`);
console.log(`- Eligibility: ${githubDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${githubDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${githubDeal.faqs.length} questions`);
