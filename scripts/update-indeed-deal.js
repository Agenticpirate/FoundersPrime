const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Indeed $200 Hiring Credit deal data
const indeedDeal = {
  id: 'indeed-hiring-credit',
  slug: 'indeed-hiring-credit',
  title: 'Indeed — $200 Hiring Credit',
  provider: 'Indeed',
  category: 'saas-discounts',
  subcategory: 'recruitment',
  value: '$200 hiring credit',
  enhancedValue: '$200',
  shortDescription: '$200 sponsored job credit for new employers. Access 615M job seeker profiles, 3.1X more impressions than free posts, and pay-per-click model.',
  description: `Indeed offers new employers a $200 sponsored job credit to help simplify hiring and reach quality candidates faster.`,
  detailedDescription: `Indeed offers new employers a $200 sponsored job credit to help simplify hiring and reach quality candidates faster.

What's Covered:
• $200 Sponsored Job Credit: Automatic credit for enhanced job visibility
• Access to 615M Profiles: Global job seeker database
• Sponsored Job Features: 3.1X more impressions than free posts
• Pay-Per-Click Model: Only pay when candidates engage
• Employer Dashboard: Track applications, quality metrics, hiring outcomes
• Automated Messaging: Engage candidates at key hiring moments
• Free Job Posts: Up to 3 free posts per month (30 days each)
• Flexible Budget Control: Pause/resume campaigns anytime

What's NOT Covered:
• Existing Indeed users (new accounts only)
• Recruitment agencies (ineligible for free accounts)
• Businesses outside the US

Key Insights:
• Sponsored jobs deliver 60% more applicants than free listings and maintain optimal search visibility
• Premium plan with "Urgently Hiring" label makes hires 5 days faster than non-sponsored jobs
• Billing occurs monthly or when you reach $500 in spending—whichever comes first
• Free posts available: You can post up to 3 free jobs monthly (30 days each) even without using credit
• Budget flexibility: Set daily budgets as low as $5/day and pause campaigns anytime with no penalties`,
  benefits: [
    '$200 Sponsored Job Credit for enhanced job visibility',
    'Access to 615M global job seeker profiles',
    '3.1X more impressions than free posts',
    'Pay-per-click model: Only pay when candidates engage',
    'Employer dashboard: Track applications, quality metrics, hiring outcomes',
    'Automated messaging to engage candidates',
    'Up to 3 free job posts per month (30 days each)',
    'Flexible budget control: Pause/resume campaigns anytime'
  ],
  eligibility: [
    'New Indeed employer account (no prior credits received)',
    'US-based business only',
    'Must post at least one job to activate credit',
    'Cannot be a recruitment agency',
    'Valid business email address'
  ],
  applicationProcess: [
    'Visit the Indeed $200 Credit Page at indeed.com/partner/fitsmallbusiness',
    'Create employer account with your business email',
    'Credit automatically added upon registration',
    'Post your first job to activate the $200 credit',
    'Choose sponsorship: Standard or Premium plan (minimum $5/day budget)',
    'Credit automatically applies to your sponsored job campaigns',
    'Start hiring with enhanced visibility'
  ],
  faqs: [
    {
      question: 'How much credit do I get?',
      answer: '$200 sponsored job credit automatically added upon registration. Credit is valid for 12 months from account creation.'
    },
    {
      question: 'Who is eligible for Indeed hiring credit?',
      answer: 'New Indeed employer accounts for US-based businesses. Existing users, recruitment agencies, and businesses outside the US are not eligible.'
    },
    {
      question: 'How effective are sponsored jobs?',
      answer: 'Sponsored jobs deliver 60% more applicants than free listings and get 3.1X more impressions. Premium plan with "Urgently Hiring" label makes hires 5 days faster.'
    },
    {
      question: 'Can I post jobs for free?',
      answer: 'Yes. You can post up to 3 free jobs monthly (30 days each) even without using the credit. Free posts have limited visibility compared to sponsored.'
    },
    {
      question: 'How does billing work?',
      answer: 'Pay-per-click model: Only pay when candidates engage. Billing occurs monthly or when you reach $500 in spending—whichever comes first.'
    },
    {
      question: 'Can I control my budget?',
      answer: 'Yes. Set daily budgets as low as $5/day and pause/resume campaigns anytime with no penalties. Full flexibility to control spending.'
    }
  ],
  tags: ['recruitment', 'hiring', 'hr', 'job-posting', 'startups', 'small-business', 'indeed'],
  status: 'active',
  applicationUrl: 'https://www.indeed.com/partner/fitsmallbusiness',
  logoUrl: 'https://www.indeed.com/favicon.ico',
  brandIcon: 'https://www.indeed.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $200',
  savingsAmount: 200,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '💼'
};

// Find existing Indeed deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isIndeed = 
    slugLower.includes('indeed') ||
    titleLower.includes('indeed') ||
    providerLower === 'indeed';
  
  if (isIndeed) {
    console.log(`Removing existing Indeed deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isIndeed;
});

// Add the new comprehensive Indeed deal
filteredDeals.push(indeedDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Indeed $200 Hiring Credit deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${indeedDeal.title}`);
console.log(`- Value: ${indeedDeal.value}`);
console.log(`- Application URL: ${indeedDeal.applicationUrl}`);
console.log(`- Benefits: ${indeedDeal.benefits.length} items`);
console.log(`- Eligibility: ${indeedDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${indeedDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${indeedDeal.faqs.length} questions`);
