const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Scalingo Startup Program deal data
const scalingoDeal = {
  id: 'scalingo-startup-program',
  slug: 'scalingo-startup-program',
  title: 'Scalingo Startup Program — €1,800 in Hosting Credits',
  provider: 'Scalingo',
  category: 'cloud-credits',
  subcategory: 'paas',
  value: '€1,800 (€200/month × 9 months)',
  enhancedValue: '€1,800',
  shortDescription: '€1,800 in free PaaS hosting credits over 9 months. GDPR-compliant EU hosting, 50+ technologies, GitOps deployment, and no DevOps required.',
  description: `Scalingo offers early-stage startups €1,800 in free PaaS hosting credits over 9 months to deploy, scale, and iterate rapidly without infrastructure management.`,
  detailedDescription: `Scalingo offers early-stage startups €1,800 in free PaaS hosting credits over 9 months to deploy, scale, and iterate rapidly without infrastructure management.

What's Covered:
• €1,800 Free Hosting: €200/month credit for 9 months
• 50+ Technologies: Ruby, Node.js, PHP, Python, Java, Meteor.js & more
• Database Support: PostgreSQL, MySQL, MongoDB, Redis, InfluxDB, OpenSearch
• GitOps Deployment: One-click deploy from GitHub/GitLab
• Developer Support: Chat with engineers (no tickets or wait times)
• 99.9% SLA: High availability with zero-downtime deployment
• EU Data Hosting: GDPR-compliant Paris datacenter
• ISO 27001 + HDS: Enterprise-grade security certifications
• Auto-Scaling: Scale containers seamlessly without interruption
• 30-Day Free Trial: Test platform before joining program

What's NOT Covered:
• Established companies with DevOps teams
• Non-European startups requiring US hosting
• Projects needing multi-cloud setups

Key Insights:
• Try before you apply: Scalingo offers a 30-day free trial with no credit card required
• Pay-as-you-grow model: After credits expire, transparent per-minute billing
• French Government Program: Separate €600/6-month program for French gov startups
• Enterprise-ready: ISO 27001 and HDS certifications ideal for B2B/healthcare SaaS
• No DevOps required: Platform handles server management, monitoring, and maintenance`,
  benefits: [
    '€1,800 free hosting (€200/month × 9 months)',
    '50+ technologies: Ruby, Node.js, PHP, Python, Java, Meteor.js',
    'Database support: PostgreSQL, MySQL, MongoDB, Redis, InfluxDB, OpenSearch',
    'GitOps deployment: One-click deploy from GitHub/GitLab',
    'Developer support: Chat with engineers (no tickets)',
    '99.9% SLA with zero-downtime deployment',
    'GDPR-compliant EU hosting (Paris datacenter)',
    'ISO 27001 + HDS enterprise-grade security certifications',
    'Auto-scaling containers without interruption',
    '30-day free trial to test platform'
  ],
  eligibility: [
    'Early-stage startup or in ideation phase',
    'Part of an incubator/accelerator program (preferred)',
    'Building web applications or SaaS products',
    'Willing to use European cloud infrastructure',
    'No current Scalingo customer (new accounts only)'
  ],
  applicationProcess: [
    'Visit https://scalingo.com/startup-program',
    'Complete contact form with name, company, incubator/program name',
    'Provide email and message describing your startup',
    'Submit application for eligibility review',
    'Receive confirmation (3-5 business days if approved)',
    'Sign up and connect your Git repo',
    'Deploy your first app in minutes'
  ],
  faqs: [
    {
      question: 'How much credit do I get?',
      answer: '€1,800 in free hosting credits distributed as €200/month for 9 months.'
    },
    {
      question: 'Who is eligible for Scalingo Startup Program?',
      answer: 'Early-stage startups or those in ideation phase, preferably part of an incubator/accelerator program, building web applications or SaaS products. New accounts only.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes. Scalingo offers a 30-day free trial with no credit card required—test the platform before joining the program.'
    },
    {
      question: 'Is Scalingo GDPR compliant?',
      answer: 'Yes. Scalingo hosts data in GDPR-compliant Paris datacenter with ISO 27001 and HDS certifications—ideal for B2B/healthcare SaaS targeting enterprise clients.'
    },
    {
      question: 'What happens after credits expire?',
      answer: 'Transparent per-minute billing ensures you only pay for actual usage. Pay-as-you-grow model with no surprises.'
    },
    {
      question: 'Do I need DevOps experience?',
      answer: 'No. The platform handles server management, monitoring, and maintenance—focus purely on code.'
    }
  ],
  tags: ['paas', 'cloud-hosting', 'european', 'gdpr', 'devops', 'deployment', 'startups', 'scalingo'],
  status: 'active',
  applicationUrl: 'https://scalingo.com/startup-program',
  logoUrl: 'https://scalingo.com/favicon.ico',
  brandIcon: 'https://scalingo.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save €1,800',
  savingsAmount: 1800,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🚀'
};

// Find existing Scalingo deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isScalingo = 
    slugLower.includes('scalingo') ||
    titleLower.includes('scalingo') ||
    providerLower === 'scalingo';
  
  if (isScalingo) {
    console.log(`Removing existing Scalingo deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isScalingo;
});

// Add the new comprehensive Scalingo deal
filteredDeals.push(scalingoDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Scalingo Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${scalingoDeal.title}`);
console.log(`- Value: ${scalingoDeal.value}`);
console.log(`- Application URL: ${scalingoDeal.applicationUrl}`);
console.log(`- Benefits: ${scalingoDeal.benefits.length} items`);
console.log(`- Eligibility: ${scalingoDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${scalingoDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${scalingoDeal.faqs.length} questions`);
