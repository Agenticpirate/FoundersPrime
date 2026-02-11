const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// GitLab for Startups deal data
const gitlabDeal = {
  id: 'gitlab-for-startups',
  slug: 'gitlab-for-startups',
  title: 'GitLab for Startups — $6,960+ Free (20 Seats)',
  provider: 'GitLab',
  category: 'saas-discounts',
  subcategory: 'developer-tools',
  value: '$6,960+ (20 seats free)',
  enhancedValue: '$6,960+',
  shortDescription: 'Free GitLab Ultimate licenses for 20 seats for one year ($6,960+ value) for seed-stage startups. Complete AI-powered DevSecOps platform with CI/CD, security scanning, and deployment automation.',
  description: `GitLab for Startups provides free GitLab Ultimate licenses for 20 seats for one year (worth $6,960+) to qualifying seed-stage startups, plus additional discounts in year two. GitLab is a comprehensive AI-powered DevSecOps platform that unifies development, security, and operations in a single application.`,
  detailedDescription: `GitLab for Startups provides free GitLab Ultimate licenses for 20 seats for one year (worth $6,960+) to qualifying seed-stage startups, plus additional discounts in year two. GitLab is a comprehensive AI-powered DevSecOps platform that unifies development, security, and operations in a single application.

What's Covered:
• Seed Stage: Free Ultimate license (20 seats) for Year 1 + 50% discount Year 2
• Early Stage: 50% discount on any tier (20 users) Year 1 + 25% discount Year 2
• Complete DevSecOps platform with CI/CD, security scanning, and deployment automation
• GitLab Duo AI-powered development assistance
• Self-managed or SaaS deployment options
• Advanced security and compliance features
• Value stream management and collaboration tools

What's NOT Covered:
• Enterprise support (not included with free tier)
• Additional seats beyond 20 users
• Custom enterprise features
• On-premise dedicated support

Key Insights:
• $6,960+ value: Ultimate tier normally costs $29/user/month × 20 seats × 12 months = $6,960+ free for seed stage
• 2-year support: Discounts extend into year 2 (50% seed, 25% early stage)
• No support included: GitLab designed to be self-service—ideal for technical teams
• Trusted by enterprises: Used by Goldman Sachs, Deutsche Telekom, Nvidia, Lockheed Martin
• 7x faster cycles: Teams report 7× faster development cycles with GitLab
• All-in-one platform: Replaces multiple tools—GitHub + CI/CD + security scanning + deployment
• Self-managed or SaaS: Choose cloud or on-premise deployment
• Usage analytics required: Self-hosted instances must enable usage tracking`,
  benefits: [
    'Seed Stage Year 1: Free Ultimate license (20 seats, $6,960+ value)',
    'Seed Stage Year 2: 50% discount on any tier (up to 20 users)',
    'Early Stage Year 1: 50% discount on any tier (up to 20 users)',
    'Early Stage Year 2: 25% discount on any tier (up to 20 users)',
    'GitLab Duo AI-powered code suggestions and automation',
    'Advanced CI/CD pipelines for continuous integration/deployment',
    'Security scanning: SAST, DAST, dependency scanning, container scanning',
    'Code review with merge requests and approval rules',
    'Unified DevSecOps platform for dev, security, ops',
    'Deployment options: SaaS (GitLab.com) or self-managed'
  ],
  eligibility: [
    'Seed Stage: Pre-Seed or Seed stage with up to $5M in external funding',
    'Early Stage: Series A or Series B with up to $20M in external funding',
    'New customers only (not paying GitLab customers within 1 year)',
    'VC or accelerator backing (proof required)',
    'Active software development (not consulting/agencies)',
    'Proof via Crunchbase, PitchBook, Y Combinator, or accelerator webpage'
  ],
  applicationProcess: [
    'Visit the GitLab for Startups application page',
    'Complete the application form with first/last name, company name, work email',
    'Provide industry and number of employees',
    'Select total funding stage (Pre-Seed, Seed, Series A/B)',
    'Submit proof of funding: Crunchbase, PitchBook, Y Combinator, or accelerator webpage',
    'Provide country, billing address, city, postal code',
    'Submit required documentation (public funding profile link OR accelerator proof)',
    'Await verification (7-14 days processing time)',
    'Receive approval and program acceptance email',
    'Set up GitLab account (SaaS or self-managed)',
    'Start building with Ultimate tier features'
  ],
  faqs: [
    {
      question: 'How much is the deal worth?',
      answer: '$6,960+ value for seed stage startups. Ultimate tier normally costs $29/user/month × 20 seats × 12 months. Early stage startups get 50% discount Year 1 and 25% Year 2.'
    },
    {
      question: 'Who is eligible for GitLab for Startups?',
      answer: 'Seed stage startups (up to $5M funding) and early stage startups (Series A/B up to $20M). Must be new customers with VC or accelerator backing. Self-funded/bootstrapped startups are not currently eligible.'
    },
    {
      question: 'What proof of funding is required?',
      answer: 'Crunchbase profile, PitchBook profile, Y Combinator profile, or accelerator webpage showing funding status.'
    },
    {
      question: 'What deployment options are available?',
      answer: 'Choose between SaaS (GitLab.com) or self-managed deployment. Self-hosted instances must enable usage tracking.'
    },
    {
      question: 'What security features are included?',
      answer: 'SAST, DAST, dependency scanning, container scanning, and advanced security compliance features in the Ultimate tier.'
    },
    {
      question: 'How long does approval take?',
      answer: '7-14 days processing time. Note: Applications will not be processed during U.S. holidays.'
    }
  ],
  tags: ['devops', 'ci-cd', 'security', 'developer-tools', 'git', 'devsecops', 'startups', 'gitlab'],
  status: 'active',
  applicationUrl: 'https://about.gitlab.com/solutions/startups/#form',
  logoUrl: 'https://about.gitlab.com/images/press/press-kit-icon.svg',
  brandIcon: 'https://about.gitlab.com/images/press/press-kit-icon.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $6,960+',
  savingsAmount: 6960,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🦊'
};

// Find existing GitLab deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isGitLab = 
    slugLower.includes('gitlab') ||
    titleLower.includes('gitlab') ||
    providerLower === 'gitlab';
  
  if (isGitLab) {
    console.log(`Removing existing GitLab deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isGitLab;
});

// Add the new comprehensive GitLab deal
filteredDeals.push(gitlabDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ GitLab for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${gitlabDeal.title}`);
console.log(`- Value: ${gitlabDeal.value}`);
console.log(`- Application URL: ${gitlabDeal.applicationUrl}`);
console.log(`- Benefits: ${gitlabDeal.benefits.length} items`);
console.log(`- Eligibility: ${gitlabDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${gitlabDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${gitlabDeal.faqs.length} questions`);
