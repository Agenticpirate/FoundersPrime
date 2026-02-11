const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// OVHcloud Startup Program deal data
const ovhcloudDeal = {
  id: 'ovhcloud-startup-program',
  slug: 'ovhcloud-startup-program',
  title: 'OVHcloud Startup Program — €10,000 in Cloud Credits',
  provider: 'OVHcloud',
  category: 'cloud-credits',
  subcategory: 'cloud-infrastructure',
  value: '€10,000 in cloud credits',
  enhancedValue: '€10,000',
  shortDescription: '€10,000 in free cloud credits for 12 months plus 6 hours of 1-on-1 engineering consultation. European cloud provider with data sovereignty and GDPR compliance built-in.',
  description: `OVHcloud Startup Program offers €10,000 in free cloud credits for 12 months to early-stage startups, along with 6 hours of dedicated 1-on-1 engineering consultation and access to European data-sovereign cloud infrastructure. The program has supported over 2,000 startups since 2015 with secure, open-standards based cloud solutions.`,
  detailedDescription: `OVHcloud Startup Program offers €10,000 in free cloud credits for 12 months to early-stage startups, along with 6 hours of dedicated 1-on-1 engineering consultation and access to European data-sovereign cloud infrastructure. The program has supported over 2,000 startups since 2015 with secure, open-standards based cloud solutions.

What's Covered:
• €10,000 in free cloud credits (12 months)
• 6 hours of 1-on-1 technical consultation with engineers
• Access to Public Cloud and Hosted Private Cloud solutions
• Standard technical support for fast issue resolution
• Free visibility via social media and OVHcloud events
• Access to Showcase events with VCs and partners
• 1-on-1 mentoring for cloud and business challenges
• Content Hub access for growth resources

What's NOT Covered:
• Credits beyond €10K limit (Scale level available separately)
• Non-tech focused businesses
• NGOs, agencies, or e-commerce-only businesses
• Website hosting only (need scalable product development)

Key Insights:
• European cloud leader: GAIA-X founding member with data sovereignty and GDPR compliance built-in
• 12-month duration: Full year to build and test without credit expiration pressure
• Personal touch approach: Unlike big hyperscalers, OVHcloud offers regional manager support
• Upgrade available: Strong performers can upgrade to Scale level (€100K credits + 20 hours engineering)
• 2,000+ startups served since 2015—proven track record
• Open standards: Built on interoperability and technology freedom (no vendor lock-in)
• Fast Forward Accelerator: Additional go-to-market support via dedicated program
• Apply anytime—rolling applications accepted year-round with ~1 week review`,
  benefits: [
    '€10,000 in free cloud credits for 12 months',
    '6 hours of 1-on-1 consultation with solution architects',
    'Standard technical support for fast issue resolution',
    'Public Cloud + Hosted Private Cloud solutions access',
    '40 global water-cooled data centers (Europe-focused)',
    'Free social media promotion for new members (Shine On)',
    'Access to VC and business partner networking (Showcase Events)',
    '1-on-1 mentoring for cloud/business challenges',
    'Growth resources and startup content library (Content Hub)',
    'Eligibility to upgrade to Scale level (up to €100K)'
  ],
  eligibility: [
    'Early-stage startup (pre-seed to Series A)',
    'Tech-focused product (MVP, POC, or scalable service)',
    'Active website and business presence',
    'Founded within last 5 years',
    'Need cloud services within next few months (not just hosting)',
    'Building scalable product (not simple website hosting)',
    'Innovative tech approach with clear use case'
  ],
  applicationProcess: [
    'Visit the OVHcloud Startup Program page at startup.ovhcloud.com',
    'Click "Apply" in the top right corner',
    'Set up your OVHcloud account (or log in if existing)',
    'Complete the startup application form with company details, founding date, product description',
    'Provide website URL and tech stack information',
    'Indicate current stage (MVP, POC, growth phase)',
    'Mention partner/accelerator affiliation if applicable (for priority review)',
    'Submit application for review (~7 day response time)',
    'Receive approval email with program agreement',
    'Sign program agreement and activate credits',
    'Start building on OVHcloud infrastructure with engineer support'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: '€10,000 in free cloud credits valid for 12 months. Strong performers can upgrade to Scale level with up to €100K credits + 20 hours engineering support.'
    },
    {
      question: 'Who is eligible for OVHcloud Startup Program?',
      answer: 'Early-stage tech startups (pre-seed to Series A) founded within the last 5 years, building scalable products (MVP, POC, or services). Not for NGOs, agencies, e-commerce-only, or simple website hosting.'
    },
    {
      question: 'What engineering support is included?',
      answer: '6 hours of 1-on-1 technical consultation with solution architects, plus standard technical support for fast issue resolution.'
    },
    {
      question: 'Is OVHcloud GDPR compliant?',
      answer: 'Yes. OVHcloud is a GAIA-X founding member with data sovereignty and GDPR compliance built-in. They have 40 global water-cooled data centers with a Europe focus.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Approximately 7 days for application review. Partner/accelerator affiliations may receive priority review.'
    },
    {
      question: 'Can I upgrade to more credits?',
      answer: 'Yes. Strong performers can upgrade to Scale level which includes up to €100K in credits plus 20 hours of engineering support.'
    }
  ],
  tags: ['cloud-credits', 'european-cloud', 'gdpr', 'data-sovereignty', 'infrastructure', 'startups', 'ovhcloud'],
  status: 'active',
  applicationUrl: 'https://startup.ovhcloud.com/en-gb/login/',
  logoUrl: 'https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2021-09/OVHcloud_logo.png',
  brandIcon: 'https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2021-09/OVHcloud_logo.png',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save €10,000',
  savingsAmount: 10000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '☁️'
};

// Find existing OVHcloud deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isOVHcloud = 
    slugLower.includes('ovhcloud') ||
    slugLower.includes('ovh-cloud') ||
    titleLower.includes('ovhcloud') ||
    titleLower.includes('ovh cloud') ||
    providerLower === 'ovhcloud' ||
    providerLower === 'ovh';
  
  if (isOVHcloud) {
    console.log(`Removing existing OVHcloud deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isOVHcloud;
});

// Add the new comprehensive OVHcloud deal
filteredDeals.push(ovhcloudDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ OVHcloud Startup Program deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${ovhcloudDeal.title}`);
console.log(`- Value: ${ovhcloudDeal.value}`);
console.log(`- Application URL: ${ovhcloudDeal.applicationUrl}`);
console.log(`- Benefits: ${ovhcloudDeal.benefits.length} items`);
console.log(`- Eligibility: ${ovhcloudDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${ovhcloudDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${ovhcloudDeal.faqs.length} questions`);
