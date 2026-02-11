const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Define the exact sequence from screenshots (provider names to match)
const dealSequence = [
  // Screenshot 1
  'Notion',
  'Stripe',
  'Google Cloud',
  'Xero',
  'Google Workspace',
  'Zendesk',
  'Airtable',
  'Auth0',
  'ElevenLabs',
  'AWS',
  'Linear',
  'DigitalOcean',
  'Hugging Face',
  'Framer',
  'Perplexity',
  'Webflow',
  'TikTok',
  'Intercom',
  'Microsoft Azure',
  'Kapwing',
  'Customer.io',
  'Nano Banana',
  'VEO Google',
  'Mixpanel',
  'Miro',
  'Retool',
  'Sentry',
  'Google AI Studio',
  'Gemini',
  'Reddit',
  'Wise',
  'Voiceflow',
  'Snov',
  'PostHog',
  'Incalio',
  'Teamcamp',
  
  // Screenshot 2
  'Rollbar',
  'CrunchzApp',
  'Snapchat',
  'FullEnrich',
  'Engine',
  'GitHub',
  'ActiveCampaign',
  'GoCardless',
  'Systeme',
  'Google Ads',
  'DevRev',
  'CustomGPT',
  'GoDaddy',
  'WEDOS',
  'RocketDevs',
  'Namecheap',
  'Clay',
  'Amazon EC2',
  'Deel',
  'Microsoft for Startups',
  'MailerLite',
  'Revolut',
  'OVHcloud',
  'Asana',
  'Simplyblock',
  'Databricks',
  'Agency',
  'Flippa',
  'QuickNode',
  'LinkedIn',
  'Zoho',
  'Document360',
  'Netcore',
  'Merge',
  'Datadog',
  'Algolia',
  
  // Screenshot 3
  'Galaxy',
  'Cloudflare',
  'Confluent',
  'Every',
  'ProdCamp',
  'Content Beta',
  'Producter',
  'Apphud',
  'Pivony',
  'Tomorro',
  'Zenduty',
  'Blue',
  'UseCSV',
  'AdOpt',
  'Datapills',
  'Mux',
  'Mainstreet',
  'Instatus',
  'Stripe Atlas',
  'MongoDB',
  'Indeed',
  'Jotpo',
  'Sirdata',
  'Array',
  'Scalingo',
  'E-goi',
  'Make',
  'Brevo',
  'Zoom',
  'HubSpot',
  'Pipedrive',
  'WorldFirst',
  'Shopify',
  'Airwallex',
  'Softr',
  'Slack',
  'Mercury',
  'Apollo',
  'ClearCRM',
  'RanksPro',
  'Prisma'
];

// Function to find matching deal by provider/title
function findDealIndex(deal, sequence) {
  const titleLower = (deal.title || '').toLowerCase();
  const providerLower = (deal.provider || '').toLowerCase();
  
  for (let i = 0; i < sequence.length; i++) {
    const searchTerm = sequence[i].toLowerCase();
    if (titleLower.includes(searchTerm) || providerLower.includes(searchTerm)) {
      return i;
    }
  }
  return -1;
}

// Add sortOrder to each deal
let matchedCount = 0;
let unmatchedCount = 0;

deals.forEach(deal => {
  const index = findDealIndex(deal, dealSequence);
  if (index !== -1) {
    deal.sortOrder = index;
    matchedCount++;
  } else {
    // Deals not in sequence get a high sortOrder (will appear at end)
    deal.sortOrder = 9999;
    unmatchedCount++;
  }
});

// Sort deals by sortOrder
deals.sort((a, b) => {
  // First sort by sortOrder
  if (a.sortOrder !== b.sortOrder) {
    return a.sortOrder - b.sortOrder;
  }
  // If same sortOrder, maintain original order by title
  return (a.title || '').localeCompare(b.title || '');
});

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(deals, null, 2));

console.log('\n✅ Deals reordered successfully!');
console.log(`Total deals: ${deals.length}`);
console.log(`Matched to sequence: ${matchedCount}`);
console.log(`Not in sequence (will appear at end): ${unmatchedCount}`);

// Show first 20 deals in new order
console.log('\nFirst 20 deals in new order:');
deals.slice(0, 20).forEach((deal, i) => {
  console.log(`${i + 1}. ${deal.title} (sortOrder: ${deal.sortOrder})`);
});
