const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Voiceflow Promo deal data
const voiceflowDeal = {
  id: 'voiceflow-3-months-free',
  slug: 'voiceflow-3-months-free',
  title: 'Voiceflow Promo — 3 Months Free on Pro Plan',
  provider: 'Voiceflow',
  category: 'development',
  subcategory: 'ai-tools',
  value: '$180 in credits',
  enhancedValue: '$180',
  shortDescription: '3 months free on Pro plan (normally $60/month) + 10,000 AI credits. Build AI agents, voice assistants, and chatbots with no-code visual builder.',
  description: `Voiceflow promotional offer provides 3 months free on the Pro plan (normally $60/month), saving you $180. Voiceflow is a no-code platform for building AI agents, voice assistants, and chatbots for customer support, lead generation, and internal workflows.`,
  detailedDescription: `Voiceflow promotional offer provides 3 months free on the Pro plan (normally $60/month), saving you $180. Voiceflow is a no-code platform for building AI agents, voice assistants, and chatbots for customer support, lead generation, and internal workflows. The platform enables teams to design, prototype, and deploy conversational AI without coding, with integrations to OpenAI, Anthropic, Google AI, Salesforce, Zendesk, and 100+ other tools.

What You Get:
• 3 months free on Pro plan (normally $60/month = $180 total value)
• 10,000 credits included (for AI model usage and agent hosting)

Full Pro Plan Features:
• Up to 2 editors per workspace
• 1 workspace
• 200 knowledge base sources per agent
• 5,000 table rows
• Access to advanced LLM models (GPT-4, Claude, Gemini)
• Unlimited agents
• API access and integrations
• Voice and chat agent capabilities
• Session replay and analytics
• Custom branding

What's Covered:
• Pro plan subscription fees for 3 months
• 10,000 AI credits for model usage and agent hosting
• All Pro plan features and integrations

What's NOT Covered:
• Additional credits beyond 10,000 included (billed at $0.005 per credit)
• Business or Enterprise plan features (SSO, unlimited editors, advanced security)
• Third-party API costs (OpenAI, Anthropic, etc.)
• Custom development or professional services

Important: You MUST use manual email/password signup (NOT "Continue with Google") to qualify for the promo!`,
  benefits: [
    '3 months free on Pro plan ($180 value)',
    '10,000 AI credits included',
    'Up to 2 editors per workspace',
    '200 knowledge base sources per agent',
    'Access to GPT-4, Claude, Gemini, and custom models',
    'Unlimited AI agents',
    'API access and integrations with 100+ tools',
    'Voice and chat agent capabilities',
    'Session replay and analytics',
    'Custom branding',
    'No-code visual drag-and-drop builder',
    'Real-time collaboration for teams'
  ],
  eligibility: [
    'New Voiceflow user (cannot have previously used a promo code)',
    'Must use manual signup with email + password (NOT "Continue with Google")',
    'Must verify email to receive promo code'
  ],
  applicationProcess: [
    'Go to the Voiceflow partner signup link',
    'Click "Sign up" — DO NOT use "Continue with Google" (this disqualifies you)',
    'Manually create account with full name, email, and password',
    'Check email inbox and verify your email address',
    'After verification, receive promo code via email (may take a few minutes)',
    'Log in to Voiceflow and navigate to Settings → Billing',
    'Enter promo code in the "Promo Code" field and click apply',
    'Pro plan will show as $0 for 3 months — proceed to checkout',
    'Start building AI agents with full Pro plan access'
  ],
  faqs: [
    {
      question: 'How much is the Voiceflow promo worth?',
      answer: '$180 total value — 3 months free on Pro plan (normally $60/month) plus 10,000 AI credits included.'
    },
    {
      question: 'Who is eligible for this promo?',
      answer: 'New Voiceflow users who sign up via the partner link using manual email/password signup (NOT "Continue with Google") and verify their email.'
    },
    {
      question: 'Why can\'t I use "Continue with Google"?',
      answer: 'Using Google OAuth bypasses the promo code system. You must use manual email/password signup to receive the promo code via email.'
    },
    {
      question: 'What can I build with Voiceflow?',
      answer: 'AI customer support agents, voice assistants, internal copilots, lead qualification bots, appointment booking systems, FAQ automation, and more.'
    },
    {
      question: 'How many credits are included?',
      answer: '10,000 AI credits (~10,000 agent interactions). Simple queries use ~1 credit; complex multi-turn conversations use 2–5 credits.'
    },
    {
      question: 'What happens after 3 months?',
      answer: 'You can continue on Pro ($60/month), downgrade to Starter (free, limited), or upgrade to Business ($150/month). Annual billing saves 10%.'
    }
  ],
  tags: ['ai-agents', 'chatbots', 'voice-assistants', 'voiceflow', 'no-code', 'conversational-ai', 'startups'],
  status: 'active',
  applicationUrl: 'https://partners.voiceflow.com/w5sl815lrxz2',
  logoUrl: 'https://www.voiceflow.com/favicon.ico',
  brandIcon: 'https://www.voiceflow.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $180',
  savingsAmount: 180,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🤖'
};

// Find existing Voiceflow deal(s) and remove them
const voiceflowPatterns = ['voiceflow'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isVoiceflow = voiceflowPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower.includes(pattern) ||
    slugLower.includes(pattern)
  );
  
  if (isVoiceflow) {
    console.log(`Removing existing Voiceflow deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isVoiceflow;
});

// Add the new comprehensive Voiceflow deal
filteredDeals.push(voiceflowDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Voiceflow Promo deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${voiceflowDeal.title}`);
console.log(`- Value: ${voiceflowDeal.value}`);
console.log(`- Application URL: ${voiceflowDeal.applicationUrl}`);
console.log(`- Benefits: ${voiceflowDeal.benefits.length} items`);
console.log(`- Eligibility: ${voiceflowDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${voiceflowDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${voiceflowDeal.faqs.length} questions`);
