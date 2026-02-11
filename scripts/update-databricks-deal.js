const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Databricks for Startups deal data
const databricksDeal = {
  id: 'databricks-for-startups',
  slug: 'databricks-for-startups',
  title: 'Databricks for Startups — $50,000 in Platform Credits',
  provider: 'Databricks',
  category: 'cloud-credits',
  subcategory: 'data-analytics',
  value: '$50,000 in platform credits',
  enhancedValue: '$50,000',
  shortDescription: 'Up to $50,000 in platform credits for VC-funded startups building data-driven applications on the Databricks Lakehouse Platform. Unified data analytics, AI/ML capabilities, and expert technical support.',
  description: `Databricks for Startups provides up to $50,000 in platform credits to VC-funded startups building data-driven applications on the Databricks Lakehouse Platform. The program offers enterprise-grade unified data analytics, AI/ML capabilities, and expert technical support to help startups scale from MVP to IPO.`,
  detailedDescription: `Databricks for Startups provides up to $50,000 in platform credits to VC-funded startups building data-driven applications on the Databricks Lakehouse Platform. The program offers enterprise-grade unified data analytics, AI/ML capabilities, and expert technical support to help startups scale from MVP to IPO.

What's Covered:
• Up to $50,000 in Databricks platform credits
• Free Business-tier technical support
• Expert advice from Databricks technical specialists
• Access to Databricks marketing events and customer network
• Unified platform for data engineering, data science, and machine learning
• Open-source flexibility with multi-cloud options
• Cost-efficient scalability and performance optimization

What's NOT Covered:
• Third-party integrations or external tools
• Professional services beyond technical support
• Custom feature development
• Enterprise-level SLA guarantees

Key Insights:
• Unified platform: Single solution for data engineering, data science, ML, and analytics—eliminates tool sprawl
• Built on open standards: Apache Spark foundation with Delta Lake ensures no vendor lock-in
• Multi-cloud flexibility: Deploy on AWS, Azure, or GCP based on your infrastructure needs
• Notable customers: Abnormal Security, Iterable, Monte Carlo, and other successful data startups built on Databricks
• Additional opportunities: Participate in Built-On Databricks Challenge (up to $500K prizes) and AI Accelerator (up to $250K investment)
• Scalable pricing: Platform grows with you—credits cover initial development, transition to paid as you scale
• Expert ecosystem: Access to Databricks partners for professional services and implementation support`,
  benefits: [
    'Up to $50,000 in Databricks usage credits',
    'Unified data, analytics, and AI platform access (Lakehouse)',
    'Business-tier support with expert troubleshooting',
    'Data Engineering: ETL pipelines, data transformation, workflows',
    'Machine Learning: MLflow, AutoML, collaborative ML workspaces',
    'Data Science Tools: Interactive notebooks, collaborative coding',
    'Multi-Cloud: AWS, Azure, GCP deployment options',
    'Access to Databricks events and customer network',
    'Technical advice from Databricks specialists'
  ],
  eligibility: [
    'VC-funded startup (raised institutional funding)',
    'Building data-driven applications (core to business model)',
    'Data analytics or AI/ML focus (using data at scale)',
    'Active product development (not just research or POC)',
    'Scalable data infrastructure needs (processing large datasets)',
    'Pre-IPO stage (typically seed to Series B)'
  ],
  applicationProcess: [
    'Visit the Databricks for Startups application portal',
    'Complete the online application form with company information and founding details',
    'Provide VC funding information (investors, round, amount)',
    'Describe your product and data/AI use case',
    'Specify expected Databricks usage and technical requirements',
    'Include current stage and growth metrics',
    'Submit pitch deck (optional but recommended)',
    'Await review (7-14 day evaluation period)',
    'Receive approval decision via email',
    'Set up Databricks account with approved credits',
    'Onboard with technical team to optimize platform usage'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to $50,000 in Databricks platform credits for VC-funded startups building data-driven applications.'
    },
    {
      question: 'Who is eligible for Databricks for Startups?',
      answer: 'VC-funded startups (seed to Series B) building data-driven applications with data analytics or AI/ML focus. Bootstrapped startups, consultancies, and non-data-centric businesses are not eligible.'
    },
    {
      question: 'What cloud providers are supported?',
      answer: 'Databricks supports multi-cloud deployment on AWS, Azure, and GCP based on your infrastructure needs.'
    },
    {
      question: 'What technical support is included?',
      answer: 'Business-tier technical support with expert troubleshooting and advice from Databricks technical specialists.'
    },
    {
      question: 'Are there additional opportunities beyond credits?',
      answer: 'Yes! Participate in Built-On Databricks Challenge (up to $500K prizes) and AI Accelerator (up to $250K investment).'
    },
    {
      question: 'How long does approval take?',
      answer: '7-14 days for application review. Including a pitch deck is recommended to strengthen your application.'
    }
  ],
  tags: ['data-analytics', 'ai', 'ml', 'lakehouse', 'cloud-credits', 'big-data', 'startups', 'databricks'],
  status: 'active',
  applicationUrl: 'https://databricks.sjc1.qualtrics.com/jfe/form/SV_0Txabk3ctqWgFdY',
  logoUrl: 'https://www.databricks.com/wp-content/uploads/2022/06/db-nav-logo.svg',
  brandIcon: 'https://www.databricks.com/wp-content/uploads/2022/06/db-nav-logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $50,000',
  savingsAmount: 50000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing Databricks deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isDatabricks = 
    slugLower.includes('databricks') ||
    titleLower.includes('databricks') ||
    providerLower === 'databricks';
  
  if (isDatabricks) {
    console.log(`Removing existing Databricks deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isDatabricks;
});

// Add the new comprehensive Databricks deal
filteredDeals.push(databricksDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Databricks for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${databricksDeal.title}`);
console.log(`- Value: ${databricksDeal.value}`);
console.log(`- Application URL: ${databricksDeal.applicationUrl}`);
console.log(`- Benefits: ${databricksDeal.benefits.length} items`);
console.log(`- Eligibility: ${databricksDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${databricksDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${databricksDeal.faqs.length} questions`);
