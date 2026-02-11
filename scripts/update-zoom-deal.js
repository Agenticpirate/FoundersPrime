const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Zoom for Startups deal data
const zoomDeal = {
  id: 'zoom-for-startups',
  slug: 'zoom-for-startups',
  title: 'Zoom for Startups — 1 Year Free (25 Seats)',
  provider: 'Zoom',
  category: 'saas-discounts',
  subcategory: 'communication',
  value: '$7,500+ in perks',
  enhancedValue: '$7,500',
  shortDescription: '1 year free of Zoom Workplace Business Plus for up to 25 seats. Video meetings, team chat, phone system, and AI Companion included.',
  description: `Zoom for Startups provides 1 year free of Zoom Workplace Business Plus for up to 25 seats. This is Zoom's premium collaboration suite with AI-powered features for team communication.`,
  detailedDescription: `Zoom for Startups provides 1 year free of Zoom Workplace Business Plus for up to 25 seats. This is Zoom's premium collaboration suite with AI-powered features for team communication.

What's Included (Business Plus Plan):

Meetings & Communication:
• HD video meetings (up to 300 participants)
• 30-hour meeting duration limit
• Team Chat (unlimited messaging)
• Cloud recording & transcripts
• Virtual backgrounds & noise cancellation

Phone & Scheduling:
• Zoom Phone (cloud-based phone system)
• Scheduler (appointment booking)
• Mail & Calendar integration

Productivity Tools:
• Whiteboard (collaborative brainstorming)
• Clips (video messages & screen recordings)
• Docs (AI-first collaborative documents)
• Workflow Automation

AI Companion (Included):
• Meeting summaries & action items
• Chat thread summaries
• AI-generated meeting notes
• Smart scheduling suggestions

Regular Pricing:
• Business Plus: ~$25/user/month ($300/user/year)
• 25 seats × $300 = $7,500/year value

Best For: Remote/hybrid teams needing professional video conferencing, team chat, phone system, and AI productivity tools.

Not Ideal For: Existing paid Zoom customers or companies needing more than 25 seats initially.`,
  benefits: [
    '1 year free Zoom Workplace Business Plus (25 seats)',
    'HD video meetings up to 300 participants',
    '30-hour meeting duration limit',
    'Team Chat with unlimited messaging',
    'Cloud recording & transcripts',
    'Zoom Phone (cloud-based phone system)',
    'Scheduler (appointment booking)',
    'Whiteboard for collaborative brainstorming',
    'Clips (video messages & screen recordings)',
    'Docs (AI-first collaborative documents)',
    'AI Companion: meeting summaries, action items, smart suggestions',
    'Workflow Automation included'
  ],
  eligibility: [
    'Pre-Seed to Series A startup',
    'Fewer than 50 employees',
    'Affiliated with select startup partners (VCs, accelerators)',
    'Not an existing paid Zoom customer',
    'Limited spots — applications reviewed individually',
    'SELECT PARTNERS INCLUDE:',
    'Andreessen Horowitz (a16z), Sequoia, NEA, Kleiner Perkins',
    'Lightspeed, Pear VC, Khosla Ventures, Y Combinator',
    'Emergence Capital, Maven, Redpoint, Basis Set, and others'
  ],
  applicationProcess: [
    'Go to zoom.com/en/lp/zoom-for-startups',
    'Fill out the application form with company details',
    'Provide: name, email, company, employee count, industry',
    'Enter year founded and current investment stage',
    'Select your startup partner (VC/accelerator)',
    'Submit and wait for review (3-7 days)'
  ],
  faqs: [
    {
      question: 'Who is eligible for this deal?',
      answer: 'Pre-Seed to Series A startups with fewer than 50 employees, affiliated with select startup partners (VCs, accelerators). Must not be an existing paid Zoom customer.'
    },
    {
      question: 'How long does approval take?',
      answer: '3-7 business days. Each application is reviewed individually. Spots are limited.'
    },
    {
      question: 'How many seats are included?',
      answer: 'Up to 25 seats (users) on Zoom Workplace Business Plus plan.'
    },
    {
      question: 'What happens after 1 year?',
      answer: 'You can continue on a paid plan (Business Plus ~$25/user/month) or downgrade to free Basic plan.'
    },
    {
      question: 'Is Zoom Phone included?',
      answer: 'Yes, Business Plus includes Zoom Phone for cloud-based calling.'
    },
    {
      question: 'What\'s Zoom AI Companion?',
      answer: 'AI assistant included with paid plans. It generates meeting summaries, action items, chat thread summaries, and smart suggestions.'
    },
    {
      question: 'Can I apply if I\'m not with a listed partner?',
      answer: 'Select "Others" in the partner dropdown and explain your situation. Approval is case-by-case.'
    }
  ],
  tags: ['video-conferencing', 'team-chat', 'phone-system', 'meetings', 'collaboration', 'ai-companion', 'remote-work', 'zoom'],
  status: 'active',
  applicationUrl: 'https://www.zoom.com/en/lp/zoom-for-startups/',
  logoUrl: 'https://media.zoom.com/images/assets/logo-zoom%402x.png',
  brandIcon: 'https://zoom.us/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save $7,500+',
  savingsAmount: 7500,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📹'
};

// Find existing Zoom deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isZoom = 
    slugLower.includes('zoom') ||
    titleLower.includes('zoom for startups') ||
    titleLower.includes('zoom startup') ||
    providerLower === 'zoom';
  
  if (isZoom) {
    console.log(`Removing existing Zoom deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isZoom;
});

// Add the new comprehensive Zoom deal
filteredDeals.push(zoomDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Zoom for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${zoomDeal.title}`);
console.log(`- Value: ${zoomDeal.value}`);
console.log(`- Application URL: ${zoomDeal.applicationUrl}`);
console.log(`- Benefits: ${zoomDeal.benefits.length} items`);
console.log(`- Eligibility: ${zoomDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${zoomDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${zoomDeal.faqs.length} questions`);
