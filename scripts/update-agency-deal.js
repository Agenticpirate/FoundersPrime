const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Agency for Startups deal data
const agencyDeal = {
  id: 'agency-for-startups',
  slug: 'agency-for-startups',
  title: 'Agency for Startups — $8,500+ in Cybersecurity Resources',
  provider: 'Agency',
  category: 'saas-discounts',
  subcategory: 'cybersecurity',
  value: '$8,500+ in cybersecurity resources',
  enhancedValue: '$8,500+',
  shortDescription: 'Over $8,500 in free cybersecurity resources for VC-backed startups. Enterprise-level personal cybersecurity protection, CrowdStrike Falcon endpoint detection, and 24/7 monitoring.',
  description: `Agency for Startups provides over $8,500 in free cybersecurity resources to early-stage VC-backed startups, delivering enterprise-level personal cybersecurity protection and managed detection & response (MDR) services. The program is leveraged by over 200 Y Combinator, TechStars, and VC-backed ventures.`,
  detailedDescription: `Agency for Startups provides over $8,500 in free cybersecurity resources to early-stage VC-backed startups, delivering enterprise-level personal cybersecurity protection and managed detection & response (MDR) services. The program is leveraged by over 200 Y Combinator, TechStars, and VC-backed ventures.

What's Covered:
• Employee-Targeted Digital Risk (ETDR) protection
• CrowdStrike Falcon endpoint detection & response
• 24/7 monitoring and threat response
• Agency Verse platform access for multi-party compliance
• Agency Cyber Guarantee with reimbursement
• Personal device and online account protection
• Insider threat & data loss prevention
• Advanced software and security tools

What's NOT Covered:
• Standalone cyber insurance policies (not an insurance provider)
• Hardware or physical security devices
• Custom enterprise-level SLA guarantees
• Non-cybersecurity infrastructure costs

Key Insights:
• 200+ startups served: Trusted by Y Combinator, TechStars, and leading VC-backed ventures
• CrowdStrike partnership: Industry-leading endpoint protection included at no cost
• Privacy-first approach: Protects employee personal devices without invasive monitoring
• Compliance enabler: Helps startups achieve SOC2, ISO 27001, and security certifications faster
• Y Combinator W22: Founded by Harvard/Stanford alumni with deep cybersecurity expertise
• Remote-work ready: Designed for distributed teams and BYOD environments
• Agency Cyber Guarantee: Unique reimbursement coverage included with subscription
• Partner programs accepted: 500 Startups, Antler, Bessemer, Google for Startups, Mercury, MongoDB, Ramp, and 40+ others`,
  benefits: [
    'Over $8,500 in free cybersecurity resources',
    'Employee-targeted digital risk protection for personal devices (ETDR)',
    'CrowdStrike Falcon lightweight endpoint detection & response',
    '24/7 continuous threat monitoring and incident response',
    'Agency Verse Platform for multi-party security & compliance management',
    'Agency Cyber Guarantee reimbursement coverage',
    'Personal device security without compromising privacy',
    'BreachSignal integration for real-time threat data',
    'Tools for SOC2, ISO 27001, and other compliance certifications'
  ],
  eligibility: [
    'VC-backed startup (raised institutional funding)',
    'Partner program affiliation (Y Combinator, TechStars, or listed VC partners)',
    'Early-stage company (typically pre-seed to Series B)',
    '1-100 employees (growing startup team)',
    'Active business with digital infrastructure and cloud services',
    'Employees using personal devices for work access'
  ],
  applicationProcess: [
    'Visit the Agency for Startups application page at getagency.com/startups',
    'Complete the application form with email and company name',
    'Provide website URL and number of employees',
    'Select funding stage (Pre-Seed, Seed, Series A/B/C)',
    'Indicate partner program affiliation (Y Combinator, TechStars, 500 Startups, Google for Startups, Mercury, Ramp, etc.)',
    'Submit application for team review',
    'Receive response within 5-7 days',
    'Schedule onboarding call with Agency team',
    'Deploy security tools across team devices',
    'Activate 24/7 monitoring and Agency Cyber Guarantee coverage'
  ],
  faqs: [
    {
      question: 'How much value does the program provide?',
      answer: 'Over $8,500 in free cybersecurity resources including CrowdStrike Falcon endpoint protection, 24/7 monitoring, and Agency Cyber Guarantee coverage.'
    },
    {
      question: 'Who is eligible for Agency for Startups?',
      answer: 'VC-backed startups (pre-seed to Series B) with 1-100 employees, affiliated with partner programs like Y Combinator, TechStars, 500 Startups, Google for Startups, Mercury, Ramp, and 40+ others.'
    },
    {
      question: 'What is CrowdStrike Falcon?',
      answer: 'Industry-leading lightweight endpoint detection & response (EDR) solution included at no cost through the Agency partnership.'
    },
    {
      question: 'Does Agency help with compliance?',
      answer: 'Yes. Agency provides tools and support for achieving SOC2, ISO 27001, and other security certifications faster.'
    },
    {
      question: 'What is the Agency Cyber Guarantee?',
      answer: 'Unique reimbursement coverage included with your subscription that provides financial protection in case of security incidents.'
    },
    {
      question: 'Is this suitable for remote teams?',
      answer: 'Yes. Agency is designed for distributed teams and BYOD (Bring Your Own Device) environments with privacy-first personal device protection.'
    }
  ],
  tags: ['cybersecurity', 'security', 'compliance', 'soc2', 'crowdstrike', 'endpoint-protection', 'startups', 'remote-work'],
  status: 'active',
  applicationUrl: 'https://getagency.com/startups',
  logoUrl: 'https://getagency.com/favicon.ico',
  brandIcon: 'https://getagency.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $8,500+',
  savingsAmount: 8500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🔒'
};

// Find existing Agency deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  // Be careful to only match "Agency" the cybersecurity company, not generic "agency" mentions
  const isAgency = 
    slugLower === 'agency-for-startups' ||
    slugLower === 'agency-startups' ||
    (providerLower === 'agency' && titleLower.includes('cybersecurity')) ||
    (titleLower.includes('agency') && titleLower.includes('cybersecurity')) ||
    (titleLower.includes('agency for startups') && !titleLower.includes('digital'));
  
  if (isAgency) {
    console.log(`Removing existing Agency deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isAgency;
});

// Add the new comprehensive Agency deal
filteredDeals.push(agencyDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Agency for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${agencyDeal.title}`);
console.log(`- Value: ${agencyDeal.value}`);
console.log(`- Application URL: ${agencyDeal.applicationUrl}`);
console.log(`- Benefits: ${agencyDeal.benefits.length} items`);
console.log(`- Eligibility: ${agencyDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${agencyDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${agencyDeal.faqs.length} questions`);
