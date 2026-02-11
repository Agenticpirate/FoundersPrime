const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Miro for Startups deal data
const miroDeal = {
  id: 'miro-for-startups',
  slug: 'miro-for-startups',
  title: 'Miro for Startups — Up to $1,000 in Credits (Lifetime Validity)',
  provider: 'Miro',
  category: 'business',
  subcategory: 'collaboration',
  value: 'Up to $1,000 in credits',
  enhancedValue: '$1,000',
  shortDescription: '$1,000 in credits (partner-affiliated) or $500 (individual startups) with lifetime validity. Apply to any Miro paid plan — Starter, Business, or Enterprise.',
  description: `Miro for Startups is a credit-based program designed to help early-stage companies access the full power of Miro's visual collaboration platform without upfront costs. The program offers either $1,000 in credits (for startups connected to approved partners) or $500 in credits (for individual startups). These credits have lifetime validity and can be applied to any of Miro's paid plans.`,
  detailedDescription: `Miro for Startups is a credit-based program designed to help early-stage companies access the full power of Miro's visual collaboration platform without upfront costs. The program offers either $1,000 in credits (for startups connected to approved partners like accelerators, VCs, or incubators) or $500 in credits (for individual startups applying directly). These credits have lifetime validity and can be applied to any of Miro's paid plans, making it one of the most flexible startup programs in the collaboration software space.

What You Get:
• $1,000 in Miro credits (if connected to an approved partner)
• $500 in Miro credits (if applying as an individual startup)
• Lifetime validity: Credits never expire once activated
• 6-month activation window after approval

Flexible Plan Application:
• Starter Plan ($10/member/month): Unlimited editable boards, private boards, Brand Center
• Business Plan ($20/member/month): Unlimited workspaces, 2,500+ diagram shapes, Jira Planner
• Enterprise Plan (custom pricing): SSO, advanced security, dedicated support

Full Features Included:
• Unlimited boards and visitors for seamless collaboration
• 2,000+ pre-built templates (sprint planning, brainstorming, user journey mapping, Kanban, retrospectives)
• Advanced diagramming tools, sticky notes, mind maps, flowcharts
• Integrations with Slack, Jira, Google Workspace, Microsoft Teams, Figma, Notion, Asana, Trello, and 100+ tools
• Real-time collaboration with video chat, cursor tracking, and live editing
• Presentation mode for stakeholder meetings
• Web, desktop (Windows/Mac), and mobile (iOS/Android) access
• Miro Academy training resources and templates
• Exclusive startup community events and networking

What's NOT Included:
• Additional credits after initial $500–$1,000 is exhausted
• Retroactive credits if you've already started a paid trial
• Enterprise features unless you allocate credits to Enterprise plan
• Consulting or training services beyond Miro Academy`,
  benefits: [
    '$1,000 in credits (partner-affiliated) or $500 (individual startups)',
    'Lifetime validity — credits never expire once activated',
    'Apply to any Miro plan: Starter, Business, or Enterprise',
    'Unlimited boards and visitors for collaboration',
    '2,000+ pre-built templates for sprints, brainstorming, user journeys',
    'Advanced diagramming, sticky notes, mind maps, flowcharts',
    'Integrations with Slack, Jira, Figma, Notion, Asana, and 100+ tools',
    'Real-time collaboration with video chat and cursor tracking',
    'Presentation mode for stakeholder meetings',
    'Web, desktop, and mobile access',
    'Miro Academy training resources',
    'Exclusive startup community events'
  ],
  eligibility: [
    'Fewer than 30 employees',
    'Raised up to $10M in total funding',
    'Incorporated less than 7 years ago',
    'Independently owned and operated (not owned by parent corporation)',
    'Not a service provider (excludes consulting, agency, professional services)',
    'Not currently on a paid Miro subscription',
    'For $1,000 tier: Connected to approved Miro Startup Program partner (accelerator, VC, incubator)',
    'For $500 tier: Funded startup verified via Crunchbase with business domain email'
  ],
  applicationProcess: [
    'Verify your connection to a Miro Startup Program partner (for $1,000 tier)',
    'Create a free Miro account using your business email at miro.com/signup/',
    'Go to the application page (partner link for $1,000 or miro.com/startups/apply/ for $500)',
    'Complete the form: name, email, startup name, website, LinkedIn, Crunchbase profile',
    'Enter investor name and total funding raised',
    'Provide country, company size, and industry',
    'Upload supporting documents (incorporation docs, pitch deck, or media coverage)',
    'Select your partner from dropdown (for $1,000 tier)',
    'Agree to Terms of Service and Privacy Policy, then submit',
    'Await review (10–15 business days)',
    'Once approved, activate credits within 6 months',
    'Apply credits to your preferred Miro plan and start collaborating'
  ],
  faqs: [
    {
      question: 'What\'s the difference between $1,000 and $500 credits?',
      answer: '$1,000 credits are for startups connected to approved Miro partners (accelerators, VCs, incubators). $500 credits are for individual startups applying directly with Crunchbase verification.'
    },
    {
      question: 'Do the credits expire?',
      answer: 'Credits have lifetime validity once activated. However, you must activate them within 6 months of approval.'
    },
    {
      question: 'Who is eligible for Miro for Startups?',
      answer: 'Startups with fewer than 30 employees, up to $10M in funding, incorporated less than 7 years ago, independently owned, not a service provider, and not currently on a paid Miro subscription.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Applications are typically processed within 10–15 business days for both partner-affiliated and individual startup applications.'
    },
    {
      question: 'How far do the credits go?',
      answer: 'On Starter Plan ($10/member/month): $1,000 = ~100 member-months (~8 months for 12-person team). On Business Plan ($20/member/month): $1,000 = ~50 member-months (~4 months for 12-person team).'
    },
    {
      question: 'What\'s NOT included?',
      answer: 'Additional credits after initial amount is exhausted, retroactive credits if you\'ve already started a paid trial, and Enterprise features unless you allocate credits to Enterprise plan.'
    },
    {
      question: 'Can I apply if I\'m not connected to a partner?',
      answer: 'Yes! Individual startups can apply for $500 credits through miro.com/startups/apply/ with Crunchbase verification. Approval is case-by-case.'
    }
  ],
  tags: ['collaboration', 'whiteboard', 'visual-collaboration', 'miro', 'remote-work', 'brainstorming', 'startups'],
  status: 'active',
  applicationUrl: 'https://miro.com/startups/apply/',
  logoUrl: 'https://miro.com/blog/wp-content/uploads/2019/04/Miro-logo-1.svg',
  brandIcon: 'https://miro.com/blog/wp-content/uploads/2019/04/Miro-logo-1.svg',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $1,000',
  savingsAmount: 1000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '🎨'
};

// Find existing Miro deal(s) and remove them
const miroPatterns = ['miro'];
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMiro = miroPatterns.some(pattern => 
    titleLower.includes(pattern) || 
    providerLower === pattern ||
    slugLower.includes(pattern)
  );
  
  if (isMiro) {
    console.log(`Removing existing Miro deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMiro;
});

// Add the new comprehensive Miro deal
filteredDeals.push(miroDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Miro for Startups deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${miroDeal.title}`);
console.log(`- Value: ${miroDeal.value}`);
console.log(`- Application URL: ${miroDeal.applicationUrl}`);
console.log(`- Benefits: ${miroDeal.benefits.length} items`);
console.log(`- Eligibility: ${miroDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${miroDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${miroDeal.faqs.length} questions`);
