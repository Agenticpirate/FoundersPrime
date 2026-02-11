const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Confluent for Startups deal data
const confluentDeal = {
  id: 'confluent-for-startups',
  slug: 'confluent-for-startups',
  title: 'Confluent for Startups — $20,000 in Cloud Credits',
  provider: 'Confluent',
  category: 'cloud-credits',
  subcategory: 'data-streaming',
  value: '$20,000 in cloud credits',
  enhancedValue: '$20,000',
  shortDescription: 'Up to $20,000 in Confluent Cloud credits for 12 months. Fully-managed Apache Kafka and Flink for real-time data streaming, event-driven architectures, and AI/ML data pipelines.',
  description: `Confluent provides a fully-managed Apache Kafka service for real-time data streaming, enabling startups to build event-driven architectures without operational overhead. Get up to $20,000 in credits.`,
  detailedDescription: `Confluent provides a fully-managed Apache Kafka service for real-time data streaming, enabling startups to build event-driven architectures without operational overhead. Get up to $20,000 in credits.

What's Covered:
• Up to $20,000 in Confluent Cloud credits valid for 12 months
• Fully-Managed Kafka: Apache Kafka® and Apache Flink® managed service
• Technical Support: Multiple one-on-one technical engagements with Kafka experts
• Expert Guidance: Seasoned Confluent and Kafka specialists for architecture support
• Community Access: Vibrant community of early-stage technical founders and data architects
• Premium Features: All Confluent Cloud managed services (connectors, ksqlDB, governance)
• Real-Time Processing: Event streaming, data pipelines, and stream processing
• Onboarding Support: Get up and running with simple, fully-managed service

What's NOT Covered:
• Existing Confluent Cloud customers
• Companies older than 5 years
• Startups beyond Series B (with exceptions)
• Those who've received credits from other Confluent programs
• Commit customers of Confluent

Key Insights:
• Value Breakdown: $20,000 covers 12+ months of Standard usage (~$550/month) or 12 months of Enterprise features (~$1,650/month)
• Credit Flexibility: Credits apply to ALL Confluent Cloud services including premium features—connectors, ksqlDB, Schema Registry, governance tools
• Apache Kafka Power: Fully-managed—no servers to maintain, automatic scaling, global availability
• Use Cases: Event-driven microservices, real-time analytics, CDC, stream processing with Flink, AI/ML data pipelines, IoT, log aggregation
• AI Accelerator Option: Select startups can join 10-week cohort (2x per year) for enhanced mentorship
• Timing Strategy: Apply BEFORE launching major workloads—credits are not retroactive`,
  benefits: [
    'Up to $20,000 in Confluent Cloud credits valid for 12 months',
    'Fully-managed Apache Kafka® and Apache Flink® service',
    'Multiple one-on-one technical engagements with Kafka experts',
    'Seasoned Confluent and Kafka specialists for architecture support',
    'Community of early-stage technical founders and data architects',
    'All premium features: connectors, ksqlDB, Schema Registry, governance',
    'Event streaming, data pipelines, and stream processing',
    'Simple onboarding with fully-managed service'
  ],
  eligibility: [
    'Early-round company (Series B and before, with exceptions)',
    'Founded within last 5 years (2021-2026)',
    'Ready to use credits in the next 12 months',
    'New to Confluent (not previously received credits from other programs)',
    'Not a Commit customer of Confluent',
    'Valid business with company website and email'
  ],
  applicationProcess: [
    'Visit the application form (Google Forms)',
    'Complete application with email, phone, name, company details',
    'Describe your product/use case and how you plan to use Confluent',
    'Submit application to Confluent for Startups team',
    'Wait for review (5-10 business days)',
    'Receive activation instructions via email',
    'Set up Confluent Cloud account with credits applied',
    'Deploy Apache Kafka clusters and build real-time data applications'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to $20,000 in Confluent Cloud credits valid for 12 months. This covers 12+ months of Standard usage or 12 months of Enterprise features.'
    },
    {
      question: 'Who is eligible for Confluent for Startups?',
      answer: 'Early-round companies (Series B and before) founded within the last 5 years, new to Confluent, and not Commit customers. Apply through accelerator/VC partners for maximum credit amount.'
    },
    {
      question: 'What services are covered?',
      answer: 'Credits apply to ALL Confluent Cloud services including premium features—connectors, ksqlDB, Schema Registry, governance tools, and even beta features.'
    },
    {
      question: 'What are common use cases?',
      answer: 'Event-driven microservices, real-time analytics pipelines, CDC (change data capture), stream processing with Flink, AI/ML data pipelines, IoT data ingestion, and log aggregation.'
    },
    {
      question: 'Is there additional support beyond credits?',
      answer: 'Yes. Multiple 1:1 sessions with Kafka experts are included. Select startups can also join the AI Accelerator (10-week cohort, 2x per year) for enhanced mentorship.'
    },
    {
      question: 'What happens when credits expire?',
      answer: 'Credits expire after 12 months OR when fully consumed (whichever comes first). Set up billing alerts in the dashboard to track spend and avoid surprise bills.'
    }
  ],
  tags: ['data-streaming', 'kafka', 'flink', 'real-time', 'event-driven', 'analytics', 'cloud-credits', 'startups', 'confluent'],
  status: 'active',
  applicationUrl: 'https://www.confluent.io/startups/',
  logoUrl: 'https://www.confluent.io/favicon.ico',
  brandIcon: 'https://www.confluent.io/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $20,000',
  savingsAmount: 20000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊'
};

// Find existing Confluent deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isConfluent = 
    slugLower.includes('confluent') ||
    titleLower.includes('confluent') ||
    providerLower === 'confluent';
  
  if (isConfluent) {
    console.log(`Removing existing Confluent deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isConfluent;
});

// Add the new comprehensive Confluent deal
filteredDeals.push(confluentDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Confluent for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${confluentDeal.title}`);
console.log(`- Value: ${confluentDeal.value}`);
console.log(`- Application URL: ${confluentDeal.applicationUrl}`);
console.log(`- Benefits: ${confluentDeal.benefits.length} items`);
console.log(`- Eligibility: ${confluentDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${confluentDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${confluentDeal.faqs.length} questions`);
