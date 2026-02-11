const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Microsoft for Startups Founders Hub deal data
const microsoftDeal = {
  id: 'microsoft-for-startups-founders-hub',
  slug: 'microsoft-for-startups-founders-hub',
  title: 'Microsoft for Startups Founders Hub — $150,000 in Azure Credits',
  provider: 'Microsoft',
  category: 'cloud-credits',
  subcategory: 'cloud-computing',
  value: '$5K-$150K in Azure credits',
  enhancedValue: '$150,000',
  shortDescription: 'Up to $150,000 in Azure credits for eligible startups affiliated with the Microsoft Investor Network, plus comprehensive developer tools, technical support, and enterprise-grade infrastructure.',
  description: `Microsoft for Startups Founders Hub offers up to $150,000 in Azure credits for eligible startups affiliated with the Microsoft Investor Network, along with comprehensive developer tools, technical support, and enterprise-grade infrastructure. The program provides two pathways: up to $150,000 for investor-backed startups and up to $5,000 for independent startups.`,
  detailedDescription: `Microsoft for Startups Founders Hub offers up to $150,000 in Azure credits for eligible startups affiliated with the Microsoft Investor Network, along with comprehensive developer tools, technical support, and enterprise-grade infrastructure. The program provides two pathways: up to $150,000 for investor-backed startups and up to $5,000 for independent startups.

What's Covered:
• Azure cloud credits ($5K-$150K based on eligibility)
• Free 24/7 Azure Standard Support
• Microsoft 365 Business Premium seats
• GitHub Enterprise access
• Visual Studio Enterprise licenses
• Power Platform and Dynamics 365 access
• Technical architecture and scaling support
• Go-to-market assistance via Microsoft's enterprise network

What's NOT Covered:
• Credits beyond $150K lifetime limit
• Startups beyond Series C funding
• Non-software based businesses
• Credits for crypto/bitcoin mining

Best For:
• AI and ML startups building on Azure infrastructure
• SaaS platforms needing enterprise-grade cloud services
• Startups requiring scalability and security compliance
• Teams leveraging Microsoft's global customer network

Not Ideal For:
• Non-software based businesses
• Government organizations or educational institutions
• Consultancies, agencies, or development shops
• Companies already raised Series D or later

Key Insights:
• Flexible timelines: No restrictive expiration—credits grow as your startup grows
• Automatic upgrades: Your account is reviewed ~45 days before credit expiry for potential increase to $150K tier
• Cumulative credits: Track lifetime usage; maximum $350K total across all offers
• Free 24/7 support: Azure Standard Support included (normally paid tier)
• Enterprise credibility: Being in Microsoft for Startups program strengthens investor and enterprise sales conversations
• Partner ecosystem access: Unlock additional third-party tool discounts through Founders Hub marketplace
• No equity taken: Pure credit-based support with no equity requirements`,
  benefits: [
    'Azure Credits: $5K-$150K (tiered based on verification & investor network)',
    '24/7 Azure Standard Support (technical assistance)',
    'Microsoft 365 Business Premium seats for collaboration',
    'GitHub Enterprise: Version control & collaboration platform',
    'Visual Studio Enterprise-level development environment',
    'Power Platform: Low-code app development tools',
    'Dynamics 365: Business applications access',
    'Technical Experts: Azure architecture and scaling consultation',
    'Go-to-Market: Access to Microsoft\'s enterprise sales network'
  ],
  eligibility: [
    'INVESTOR NETWORK PATH ($150K):',
    '✓ Affiliated with Microsoft for Startups Investor Network (have referral code)',
    '✓ Pre-seed to Series A funding stage (privately held)',
    '✓ Software-based product or service (core to business model)',
    '✓ Less than $350K in lifetime Azure credits used previously',
    '✓ Verified legal entity with domain and business email',
    '✓ Product demo video available',
    'STANDARD PATH ($5K):',
    '✓ Software-based product development',
    '✓ Verified business entity with domain',
    '✓ Less than $10K in previous Azure credits received',
    '✓ Not raised Series D or later funding',
    '✓ For-profit private company',
    'NOT ELIGIBLE:',
    '✗ Series D+ funded companies',
    '✗ Educational institutions or government entities',
    '✗ Consultancies, agencies, or dev shops',
    '✗ Bitcoin/crypto mining businesses'
  ],
  applicationProcess: [
    'INVESTOR NETWORK PATH (Up to $150K):',
    '1. Contact your investor/accelerator to obtain a Microsoft for Startups referral code',
    '2. Visit the application portal at portal.startups.microsoft.com/signup',
    '3. Enter the investor referral code during signup',
    '4. Complete verification: Provide business entity details, verified domain, business email, and product demo video',
    '5. Submit application for review (5-7 day processing time)',
    '6. Receive approval and credit activation details via email',
    '7. Set up Azure account and start consuming credits immediately',
    'STANDARD PATH (Up to $5K):',
    '1. Visit Microsoft for Startups portal and click "Get started"',
    '2. Verify LinkedIn profile with clear solution description (unlocks $1K)',
    '3. Complete business verification (verified entity unlocks $5K)',
    '4. Start Azure free trial and access credits within 48 hours',
    '5. Grow with your startup: Credits increase automatically as you scale'
  ],
  faqs: [
    {
      question: 'How much credit can I get?',
      answer: 'Up to $150,000 for startups affiliated with the Microsoft Investor Network, or up to $5,000 for independent startups through the standard path.'
    },
    {
      question: 'What is the Microsoft Investor Network?',
      answer: 'A network of VCs and accelerators partnered with Microsoft. If your investor is part of this network, they can provide a referral code for the $150K tier.'
    },
    {
      question: 'Do credits expire?',
      answer: 'No restrictive expiration. Your account is reviewed ~45 days before credit expiry for potential automatic upgrade to higher tiers.'
    },
    {
      question: 'Is there a lifetime limit?',
      answer: 'Yes, maximum $350K total across all Microsoft for Startups offers. Track your cumulative usage in the portal.'
    },
    {
      question: 'What support is included?',
      answer: 'Free 24/7 Azure Standard Support is included—this is normally a paid tier.'
    },
    {
      question: 'Does Microsoft take equity?',
      answer: 'No. This is pure credit-based support with no equity requirements.'
    },
    {
      question: 'Can I use credits for AI/ML workloads?',
      answer: 'Yes, Azure credits can be used for AI and ML services including Azure OpenAI, Cognitive Services, and Machine Learning.'
    }
  ],
  tags: ['cloud-credits', 'azure', 'microsoft', 'startups', 'enterprise', 'ai', 'ml', 'saas'],
  status: 'active',
  applicationUrl: 'https://portal.startups.microsoft.com/signup',
  logoUrl: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
  brandIcon: 'https://www.microsoft.com/favicon.ico',
  featured: true,
  verified: true,
  recommended: true,
  savings: 'Save up to $150,000',
  savingsAmount: 150000,
  lastUpdated: '2026-01-27',
  createdAt: '2026-01-27',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '☁️'
};

// Find existing Microsoft for Startups deal(s) and remove them
const filteredDeals = deals.filter(deal => {
  const titleLower = deal.title?.toLowerCase() || '';
  const providerLower = deal.provider?.toLowerCase() || '';
  const slugLower = deal.slug?.toLowerCase() || '';
  
  const isMicrosoftStartups = 
    (slugLower.includes('microsoft') && (slugLower.includes('startup') || slugLower.includes('founders'))) ||
    (titleLower.includes('microsoft') && (titleLower.includes('startup') || titleLower.includes('founders'))) ||
    (providerLower === 'microsoft' && (titleLower.includes('startup') || titleLower.includes('founders') || titleLower.includes('azure')));
  
  if (isMicrosoftStartups) {
    console.log(`Removing existing Microsoft for Startups deal: ${deal.title} (${deal.slug})`);
  }
  
  return !isMicrosoftStartups;
});

// Add the new comprehensive Microsoft deal
filteredDeals.push(microsoftDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(filteredDeals, null, 2));

console.log('\n✅ Microsoft for Startups Founders Hub deal updated successfully!');
console.log(`Total deals: ${filteredDeals.length}`);
console.log('\nDeal details:');
console.log(`- Title: ${microsoftDeal.title}`);
console.log(`- Value: ${microsoftDeal.value}`);
console.log(`- Application URL: ${microsoftDeal.applicationUrl}`);
console.log(`- Benefits: ${microsoftDeal.benefits.length} items`);
console.log(`- Eligibility: ${microsoftDeal.eligibility.length} requirements`);
console.log(`- Application steps: ${microsoftDeal.applicationProcess.length} steps`);
console.log(`- FAQs: ${microsoftDeal.faqs.length} questions`);
