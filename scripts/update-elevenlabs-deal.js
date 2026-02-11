#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

const elevenlabsDeal = {
  id: 'elevenlabs-startup-grants',
  slug: 'elevenlabs-startup-grants',
  title: 'ElevenLabs Startup Grants — 12 Months Free',
  provider: 'ElevenLabs',
  category: 'ai',
  subcategory: 'ai-development',
  tags: ['ai-voice', 'text-to-speech', 'voice-cloning', 'conversational-ai', 'voice-agents', 'audio-ai'],
  value: '$4,000+ in credits',
  savings: '$4,000+',
  savingsAmount: 4000,
  shortDescription: 'AI voice platform with text-to-speech, voice cloning, and conversational agents in 70+ languages. 12 months free (33 million characters).',
  description: `ElevenLabs Grants gives startups 12 months free access to build conversational AI agents and voice-powered products using the world's most realistic AI voices.

What's Included:
• 33 million text characters (680+ hours of audio)
• 12 months access
• Scale-level benefits (high concurrency)
• Conversational AI Agents
• Text-to-Speech in 70+ languages
• Voice cloning capabilities
• Sound effects generation
• AI music generation
• Priority support

Products You Can Use:
• ElevenLabs Agents (AI voice assistants, customer support bots)
• Text-to-Speech & Speech-to-Text
• Voice cloning & custom voices
• Sound effects & AI music
• Dubbing studio

After 12 Months:
• Auto-converts to Free plan
• Or upgrade to paid/enterprise plans
• Contact sales@elevenlabs.io for custom pricing

Best for: Startups building AI tutors, voice assistants, customer support bots, gaming characters, accessibility tools, or any voice-powered product.

Not ideal for: Short-term projects, one-off campaigns, products for children under 18, or existing enterprise customers.

Requirement: Must display "ElevenLabs Grants" logo on website for 12 months.

Supported by: Andreessen Horowitz, Sequoia, Atomico, Lightspeed, Google for Startups, Antler, Entrepreneur First`,
  eligibility: [
    'Less than 25 employees',
    'Must have a monetization strategy (not hobby projects)',
    'Long-term product (not one-off campaigns)',
    'Must use business email (no Gmail/Yahoo)',
    'Not building products for minors (under 18)',
    'Not an existing ElevenLabs enterprise customer',
    'One application per company'
  ],
  applicationProcess: [
    'Visit ElevenLabs Grants application page',
    'Create an ElevenLabs account (if you don\'t have one)',
    'Fill application: product details, team size, growth plans',
    'Explain your monetization/business strategy',
    'Wait for approval (~1 week)',
    'If approved, credits applied to your account'
  ],
  benefits: [
    '33 million text characters (680+ hours of audio)',
    '12 months access',
    'Scale-level benefits (high concurrency)',
    'Conversational AI Agents',
    'Text-to-Speech in 70+ languages',
    'Voice cloning capabilities',
    'Sound effects & AI music generation',
    'Priority support'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Startups with <25 employees building a product with a monetization strategy. Must use business email. No hobby projects or short-term campaigns.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Approximately 1 week. ElevenLabs reviews applications on a rolling basis.'
    },
    {
      question: 'What happens after 12 months?',
      answer: 'Plan auto-converts to Free. You can upgrade to paid plans or contact sales for enterprise pricing.'
    },
    {
      question: 'What if I run out of characters early?',
      answer: 'Plan converts to Free. You\'ll get an email warning when approaching the 33M limit. Contact sales for extension options.'
    },
    {
      question: 'Can I resell the credits?',
      answer: 'No. Reselling violates terms and results in immediate termination.'
    },
    {
      question: 'Do you sign NDAs?',
      answer: 'No. ElevenLabs does not sign NDAs for grant applications.'
    },
    {
      question: "What's NOT eligible?",
      answer: 'Products for children under 18, one-off campaigns, hobby projects without monetization plans, existing enterprise customers.'
    }
  ],
  applicationUrl: 'https://elevenlabs.io/grants-application',
  providerWebsite: 'https://elevenlabs.io/startup-grants',
  logoUrl: 'https://elevenlabs.io/favicon.ico',
  verified: true,
  featured: true,
  recommended: true,
  status: 'active',
  timeToApply: '15 minutes',
  approvalTime: '~7 days',
  difficulty: 'medium',
  successRate: '70%+',
  lastVerified: '2025-01-27',
  appliedCount: 500,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dataSource: 'manual',
  sourceVerified: true
};

// Find and update or add ElevenLabs deal
const existingIndex = deals.findIndex(d => 
  d.slug === 'elevenlabs-startup-grants' ||
  d.slug?.includes('elevenlabs') ||
  d.title?.toLowerCase().includes('elevenlabs')
);

if (existingIndex >= 0) {
  deals[existingIndex] = { ...deals[existingIndex], ...elevenlabsDeal };
  console.log('✅ Updated existing ElevenLabs deal');
} else {
  deals.push(elevenlabsDeal);
  console.log('✅ Added new ElevenLabs deal');
}

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`Total deals: ${deals.length}`);
