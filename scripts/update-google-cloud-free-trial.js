const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Google Cloud Free Trial deal data
const googleCloudDeal = {
  id: 'google-cloud-free-trial',
  slug: 'google-cloud-free-trial',
  title: 'Google Cloud Free Trial — $300 in Credits (Gemini API & Vertex AI Included)',
  provider: 'Google Cloud',
  category: 'cloud-credits',
  subcategory: 'cloud-computing',
  value: '$300 in Google Cloud credits',
  enhancedValue: '$300',
  shortDescription: '91-day program with $300 in credits to explore GCP services including Gemini API, Vertex AI, Compute Engine, Cloud Storage, BigQuery, and 100+ cloud products.',
  description: `Google Cloud Free Trial is a 91-day program providing new users with $300 in credits to explore Google Cloud Platform services, including the Gemini API, Vertex AI, Compute Engine, Cloud Storage, BigQuery, and 100+ other cloud products. This is one of the most accessible ways to access production-grade AI models like Gemini 2.5 Pro, Gemini Flash, and other generative AI tools without upfront costs.`,
  detailedDescription: `Google Cloud Free Trial is a 91-day program providing new users with $300 in credits to explore Google Cloud Platform services, including the Gemini API, Vertex AI, Compute Engine, Cloud Storage, BigQuery, and 100+ other cloud products. This is one of the most accessible ways to access production-grade AI models like Gemini 2.5 Pro, Gemini Flash, and other generative AI tools without upfront costs.

What You Get:
• $300 in Google Cloud credits valid for 91 days from account activation
• Full access to Gemini API and Vertex AI including:
  - Gemini 2.5 Pro (multimodal reasoning, long-context understanding)
  - Gemini Flash (fast, cost-effective tasks)
  - Imagen (image generation)
  - Veo (video generation and editing)
  - PaLM and other foundation models
• Cloud infrastructure: Compute Engine VMs, Cloud Run, Kubernetes Engine, App Engine, Cloud Functions
• Data and analytics: BigQuery, Cloud Storage, Firestore, Cloud SQL, Pub/Sub
• Developer tools: Cloud Build, Artifact Registry, Cloud Source Repositories
• AI/ML platforms: AutoML, AI Platform, TensorFlow Enterprise
• Networking and security: VPC, Cloud CDN, Cloud Armor, IAM
• Access to Google Cloud Free Tier (always-free usage limits on 20+ products even after trial ends)

What Credits Cover:
• All eligible Google Cloud services including compute, storage, databases, networking, AI APIs, and ML tools
• Gemini API calls (text, vision, audio) via AI Studio or Vertex AI
• Production-level workloads and app deployments (no sandbox restrictions)
• Overage beyond Free Tier limits

What's NOT Included:
• Usage after 91 days or after exhausting the $300 credit
• GPU instances, Windows Server VMs during trial (restricted)
• Google Cloud Marketplace purchases
• Third-party generative AI models via Model-as-a-Service (MaaS)
• Quota increases (not available during trial)
• Cryptocurrency mining or prohibited use cases

Cost Context for Gemini API:
• Gemini 2.5 Pro: ~$0.00125 per 1K input tokens, ~$0.005 per 1K output tokens
• With $300 credit: ~240 million input tokens or ~60 million output tokens`,
  benefits: [
    '$300 in Google Cloud credits valid for 91 days',
    'Full Gemini API access (2.5 Pro, Flash, Imagen, Veo)',
    'Vertex AI for ML model training and deployment',
    'Compute Engine VMs, Cloud Run, Kubernetes Engine',
    'BigQuery, Cloud Storage, Firestore, Cloud SQL',
    'Cloud Build, Artifact Registry, developer tools',
    'AutoML and AI Platform for machine learning',
    'VPC, Cloud CDN, Cloud Armor for networking/security',
    'Access to always-free tier (20+ products) after trial',
    'No auto-billing — won\'t be charged unless you upgrade',
    'Instant approval after payment verification',
    'Production-ready infrastructure (not sandbox)'
  ],
  eligibility: [
    'New Google Cloud customer — never signed up for Free Trial before',
    'Never been a paying user of Google Cloud, Google Maps Platform, or Firebase',
    'Valid payment method (credit card or bank account) for identity verification',
    'Age 18+ and compliant with Google Cloud Terms of Service',
    'One trial per person/business (based on payment method and identity)'
  ],
  applicationProcess: [
    'Visit the Google Cloud Free Trial signup page at console.cloud.google.com/freetrial',
    'Sign in with your Google account (or create a new one with business email)',
    'Agree to the Free Trial Terms and Conditions',
    'Provide billing and contact information (country, address, tax info if required)',
    'Add payment method (credit card or bank account for verification)',
    'Google places a temporary $0–$1 authorization hold to verify payment (released within days)',
    'Once verified, Free Trial activates immediately with $300 credits and 91-day countdown',
    '(Optional) For Gemini API: Navigate to AI Studio, create/select a project, link Free Trial billing',
    'Start building! Deploy apps, run Gemini API queries, spin up VMs, use any GCP service'
  ],
  faqs: [
    {
      question: 'How long are the credits valid?',
      answer: '$300 in credits are valid for 91 days from account activation. After 91 days or after exhausting the credit (whichever comes first), the trial ends.'
    },
    {
      question: 'Will I be charged automatically after the trial?',
      answer: 'No. You will not be charged after 91 days or after exhausting credits unless you manually upgrade to a paid account. Your resources will stop if you don\'t upgrade.'
    },
    {
      question: 'Is Gemini API included in the free trial?',
      answer: 'Yes! You get full access to Gemini API including Gemini 2.5 Pro, Gemini Flash, Imagen, and Veo via AI Studio or Vertex AI. Your $300 credit covers API calls at production rate limits.'
    },
    {
      question: 'What\'s NOT included in the trial?',
      answer: 'GPU instances, Windows Server VMs, Google Cloud Marketplace purchases, third-party AI models via Model-as-a-Service, quota increases, and cryptocurrency mining are restricted during trial.'
    },
    {
      question: 'What happens after the trial ends?',
      answer: 'If you don\'t upgrade, your Free Trial billing account auto-closes and resources stop. You have a 30-day grace period to upgrade and recover resources. The always-free tier continues forever.'
    },
    {
      question: 'How much Gemini API usage can I get with $300?',
      answer: 'With Gemini 2.5 Pro pricing (~$0.00125/1K input tokens, ~$0.005/1K output tokens), you can process approximately 240 million input tokens or 60 million output tokens.'
    },
    {
      question: 'Who is eligible?',
      answer: 'New Google Cloud customers who have never signed up for Free Trial before and have never been a paying user of Google Cloud, Google Maps Platform, or Firebase.'
    }
  ],
  tags: ['cloud-credits', 'google-cloud', 'gcp', 'ai', 'gemini', 'vertex-ai', 'machine-learning', 'compute', 'startups'],
  status: 'active',
  applicationUrl: 'https://console.cloud.google.com/freetrial',
  logoUrl: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg',
  brandIcon: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $300',
  savingsAmount: 300,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '☁️'
};

// Find existing Google Cloud Free Trial deal(s) and remove them (but keep Google Cloud for Startups)
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  // Only remove Google Cloud Free Trial deals, not Google Cloud for Startups
  const isGoogleCloudFreeTrial = 
    slugLower === 'google-cloud-free-trial' ||
    (titleLower.includes('google cloud') && titleLower.includes('free trial')) ||
    (titleLower.includes('google cloud') && titleLower.includes('$300'));
  
  if (isGoogleCloudFreeTrial) {
    console.log(`Removing existing Google Cloud Free Trial deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isGoogleCloudFreeTrial;
});

// Add the new comprehensive Google Cloud Free Trial deal
filteredDeals.push(googleCloudDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Google Cloud Free Trial deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${googleCloudDeal.title}`);
console.log(`- Value: ${googleCloudDeal.value}`);
console.log(`- Application URL: ${googleCloudDeal.applicationUrl}`);
console.log(`- Benefits: ${googleCloudDeal.benefits.length} items`);
console.log(`- Eligibility: ${googleCloudDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${googleCloudDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${googleCloudDeal.faqs.length} questions`);
