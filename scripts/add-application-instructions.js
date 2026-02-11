/**
 * Add category-specific application instructions to deals
 * Since source data doesn't have instructions, we add helpful category-based guidance
 */

const fs = require('fs');
const path = require('path');

// Category-specific application instructions
const CATEGORY_INSTRUCTIONS = {
  'cloud-credits': {
    applicationProcess: [
      'Visit the startup program page',
      'Verify your startup meets eligibility (usually <5 years old, <$10M funding)',
      'Create an account or sign in',
      'Submit your company details and pitch deck',
      'Wait for approval (typically 1-2 weeks)'
    ],
    eligibility: ['Early-stage startups', 'Less than 5 years old', 'Under $10M in funding'],
    requirements: ['Valid business email', 'Company registration', 'Brief company description'],
    proTips: ['Apply early - credits often have limited availability', 'Have your pitch deck ready', 'Some programs require VC backing']
  },
  'ai-development': {
    applicationProcess: [
      'Sign up for a free account',
      'Navigate to startup/developer program',
      'Provide company details and use case',
      'Submit application for credits/discount',
      'Receive approval and activate credits'
    ],
    eligibility: ['Startups building with AI/ML', 'Developers and technical founders'],
    requirements: ['GitHub account', 'Technical project description', 'Business email'],
    proTips: ['Mention specific use cases in your application', 'Show traction or MVP if available']
  },
  'ai-marketing': {
    applicationProcess: [
      'Create a free account on the platform',
      'Look for startup or small business pricing',
      'Apply through their startup program if available',
      'Provide company details and marketing goals',
      'Activate your discount or credits'
    ],
    eligibility: ['Startups', 'Small businesses', 'Marketing teams'],
    requirements: ['Business email', 'Company website', 'Marketing use case'],
    proTips: ['Many offer free trials - test before committing', 'Look for annual billing discounts']
  },
  'ai-sales-business': {
    applicationProcess: [
      'Sign up for a free trial',
      'Request startup pricing through sales team',
      'Provide company size and sales team details',
      'Negotiate startup discount',
      'Activate your plan'
    ],
    eligibility: ['B2B startups', 'Sales teams', 'Growing companies'],
    requirements: ['Business email', 'Company details', 'Team size information'],
    proTips: ['Ask for extended trials', 'Negotiate annual contracts for better rates']
  },
  'ai-design': {
    applicationProcess: [
      'Create an account on the platform',
      'Check for startup or education pricing',
      'Apply through startup program if available',
      'Provide portfolio or project examples',
      'Activate your discount'
    ],
    eligibility: ['Startups', 'Designers', 'Creative teams'],
    requirements: ['Business or education email', 'Portfolio or project examples'],
    proTips: ['Many design tools offer free tiers', 'Education discounts often apply to startups']
  },
  'ai-productivity': {
    applicationProcess: [
      'Sign up for a free account',
      'Explore startup or team pricing',
      'Apply for startup credits if available',
      'Set up your workspace',
      'Invite team members'
    ],
    eligibility: ['Startups', 'Small teams', 'Remote workers'],
    requirements: ['Business email', 'Team size'],
    proTips: ['Start with free tier to evaluate', 'Many offer nonprofit discounts too']
  },
  'ai-automation': {
    applicationProcess: [
      'Create a free account',
      'Explore available integrations',
      'Apply for startup pricing if available',
      'Set up your first automation',
      'Upgrade when ready'
    ],
    eligibility: ['Startups', 'Developers', 'Operations teams'],
    requirements: ['Business email', 'Use case description'],
    proTips: ['Start with free tier to learn the platform', 'Check for partner discounts']
  },
  'ai-data-analysis': {
    applicationProcess: [
      'Sign up for a free account',
      'Apply for startup program',
      'Integrate with your data sources',
      'Set up tracking and dashboards',
      'Activate startup credits'
    ],
    eligibility: ['Startups with products', 'Data-driven teams'],
    requirements: ['Business email', 'Product or website to track'],
    proTips: ['Most offer generous free tiers', 'Apply early for best credit amounts']
  },
  'ai-customer-support': {
    applicationProcess: [
      'Sign up for a free trial',
      'Apply for startup pricing',
      'Set up your support channels',
      'Configure chatbots and workflows',
      'Activate your discount'
    ],
    eligibility: ['Startups with customers', 'Support teams'],
    requirements: ['Business email', 'Customer base size estimate'],
    proTips: ['Start with essential features', 'Many offer migration assistance']
  },
  'ai-agents': {
    applicationProcess: [
      'Create an account',
      'Explore AI agent capabilities',
      'Apply for startup credits',
      'Set up your first AI agent',
      'Monitor and optimize'
    ],
    eligibility: ['Startups', 'Developers', 'AI enthusiasts'],
    requirements: ['Business email', 'Use case description'],
    proTips: ['Start with simple use cases', 'Test thoroughly before production']
  },
  'ai-writing': {
    applicationProcess: [
      'Sign up for a free account',
      'Explore writing features',
      'Apply for startup or team pricing',
      'Set up your workspace',
      'Activate your discount'
    ],
    eligibility: ['Content creators', 'Marketing teams', 'Startups'],
    requirements: ['Business email'],
    proTips: ['Most offer free trials', 'Compare output quality before committing']
  },
  'finance-legal': {
    applicationProcess: [
      'Visit the provider website',
      'Look for startup or small business pricing',
      'Create an account with business details',
      'Complete verification if required',
      'Activate your account and discount'
    ],
    eligibility: ['Registered businesses', 'Startups', 'Founders'],
    requirements: ['Business registration', 'EIN or tax ID', 'Business bank account'],
    proTips: ['Compare multiple providers', 'Check for integration with your existing tools']
  },
  'hr-recruitment': {
    applicationProcess: [
      'Sign up for a free trial',
      'Apply for startup pricing',
      'Set up your company profile',
      'Configure hiring workflows',
      'Activate your discount'
    ],
    eligibility: ['Hiring startups', 'HR teams', 'Growing companies'],
    requirements: ['Business email', 'Company details', 'Team size'],
    proTips: ['Start with essential features', 'Many offer pay-per-hire options']
  },
  'communication': {
    applicationProcess: [
      'Create a free account',
      'Explore startup or team pricing',
      'Apply for startup credits if available',
      'Set up your workspace',
      'Invite team members'
    ],
    eligibility: ['Startups', 'Remote teams', 'Small businesses'],
    requirements: ['Business email', 'Team size'],
    proTips: ['Most offer generous free tiers', 'Check for nonprofit discounts']
  },
  'ecommerce': {
    applicationProcess: [
      'Sign up for a free trial',
      'Set up your store',
      'Apply for startup pricing if available',
      'Configure payment and shipping',
      'Launch your store'
    ],
    eligibility: ['E-commerce startups', 'Online sellers', 'Retail businesses'],
    requirements: ['Business email', 'Product catalog', 'Payment processor'],
    proTips: ['Start with basic plan', 'Upgrade as you scale']
  },
  'security-compliance': {
    applicationProcess: [
      'Request a demo or free trial',
      'Apply for startup pricing',
      'Complete security assessment',
      'Set up your security tools',
      'Activate your discount'
    ],
    eligibility: ['Startups handling sensitive data', 'B2B companies', 'Regulated industries'],
    requirements: ['Business email', 'Security requirements', 'Compliance needs'],
    proTips: ['Start with essential security', 'Many offer SOC 2 assistance']
  },
  'saas-discounts': {
    applicationProcess: [
      'Visit the provider website',
      'Look for startup or small business pricing',
      'Create an account',
      'Apply for startup discount if available',
      'Activate your plan'
    ],
    eligibility: ['Startups', 'Small businesses', 'Entrepreneurs'],
    requirements: ['Business email', 'Company details'],
    proTips: ['Compare alternatives', 'Ask for extended trials', 'Negotiate annual pricing']
  }
};

// Company-specific instructions for major providers
const COMPANY_SPECIFIC = {
  'cloudflare': {
    applicationProcess: [
      'Go to cloudflare.com/forstartups',
      'Click "Apply Now"',
      'Fill out the startup application form',
      'Provide company details and funding status',
      'Wait for approval (usually 1-2 weeks)'
    ],
    eligibility: ['Startups under 5 years old', 'Less than $10M in funding', 'Not yet profitable'],
    requirements: ['Company website', 'Business email', 'Brief company description'],
    proTips: ['Self-funded startups get $5K credits', 'VC-backed startups can get up to $250K']
  },
  'mongodb': {
    applicationProcess: [
      'Visit mongodb.com/startups',
      'Click "Apply Now"',
      'Create MongoDB Atlas account',
      'Submit startup application',
      'Receive credits upon approval'
    ],
    eligibility: ['Startups under 5 years old', 'Less than $5M in funding'],
    requirements: ['Business email', 'Company details', 'Use case description'],
    proTips: ['Credits apply to Atlas cloud database', 'Great for MVP development']
  },
  'hubspot': {
    applicationProcess: [
      'Visit hubspot.com/startups',
      'Check eligibility requirements',
      'Apply through startup program',
      'Provide company and funding details',
      'Receive discount code upon approval'
    ],
    eligibility: ['Startups with VC backing', 'Part of approved accelerator/incubator'],
    requirements: ['Proof of VC funding or accelerator membership', 'Business email'],
    proTips: ['30% off for first year', 'Includes CRM, Marketing, Sales, and Service Hubs']
  },
  'stripe': {
    applicationProcess: [
      'Visit stripe.com/atlas for incorporation',
      'Or stripe.com for payment processing',
      'Create a Stripe account',
      'Complete business verification',
      'Start accepting payments'
    ],
    eligibility: ['Any business', 'Startups', 'Entrepreneurs'],
    requirements: ['Business registration', 'Bank account', 'Identity verification'],
    proTips: ['Atlas helps with US incorporation', 'No monthly fees, pay per transaction']
  },
  'notion': {
    applicationProcess: [
      'Visit notion.so/startups',
      'Apply with your startup details',
      'Provide team size and use case',
      'Receive credits upon approval',
      'Upgrade your workspace'
    ],
    eligibility: ['Startups under 50 employees', 'Less than $10M in funding'],
    requirements: ['Business email', 'Company details'],
    proTips: ['Get up to $1000 in credits', 'Great for documentation and wikis']
  },
  'slack': {
    applicationProcess: [
      'Visit slack.com/solutions/startups',
      'Check eligibility requirements',
      'Apply through startup program',
      'Provide company details',
      'Receive discount upon approval'
    ],
    eligibility: ['Startups under 50 employees', 'Less than $5M in funding'],
    requirements: ['Business email', 'Company details'],
    proTips: ['25% off Pro plan', 'Great for team communication']
  },
  'aws': {
    applicationProcess: [
      'Visit aws.amazon.com/startups',
      'Apply for AWS Activate',
      'Choose Founders or Portfolio track',
      'Provide company and funding details',
      'Receive credits upon approval'
    ],
    eligibility: ['Startups under 10 years old', 'Self-funded or VC-backed'],
    requirements: ['AWS account', 'Business email', 'Company details'],
    proTips: ['Founders track: up to $100K credits', 'Portfolio track: up to $100K with VC backing']
  },
  'google cloud': {
    applicationProcess: [
      'Visit cloud.google.com/startup',
      'Apply for Google for Startups Cloud Program',
      'Provide company and funding details',
      'Complete application form',
      'Receive credits upon approval'
    ],
    eligibility: ['Startups under 10 years old', 'Less than $100M in funding'],
    requirements: ['Google Cloud account', 'Business email', 'Company details'],
    proTips: ['Up to $200K in credits over 2 years', 'Includes technical support']
  },
  'microsoft': {
    applicationProcess: [
      'Visit startups.microsoft.com',
      'Apply for Microsoft for Startups',
      'Provide company and product details',
      'Complete application form',
      'Receive Azure credits upon approval'
    ],
    eligibility: ['B2B startups', 'Building on Microsoft technologies'],
    requirements: ['Business email', 'Product description', 'Company details'],
    proTips: ['Up to $150K in Azure credits', 'Includes GitHub Enterprise and more']
  }
};

function updateDeals() {
  const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
  const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
  
  console.log('Updating application instructions for ' + deals.length + ' deals...');
  
  let companySpecific = 0;
  let categoryBased = 0;
  
  deals.forEach(deal => {
    const titleLower = deal.title.toLowerCase();
    
    // Check for company-specific instructions first
    let matched = false;
    for (const [company, instructions] of Object.entries(COMPANY_SPECIFIC)) {
      if (titleLower.includes(company)) {
        deal.applicationProcess = instructions.applicationProcess;
        deal.eligibility = instructions.eligibility;
        deal.requirements = instructions.requirements;
        deal.proTips = instructions.proTips;
        companySpecific++;
        matched = true;
        break;
      }
    }
    
    // Fall back to category-based instructions
    if (!matched) {
      const categoryInstructions = CATEGORY_INSTRUCTIONS[deal.subcategory] || CATEGORY_INSTRUCTIONS['saas-discounts'];
      deal.applicationProcess = categoryInstructions.applicationProcess;
      deal.eligibility = categoryInstructions.eligibility;
      deal.requirements = categoryInstructions.requirements;
      deal.proTips = categoryInstructions.proTips || [];
      categoryBased++;
    }
  });
  
  fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
  
  console.log('Updated ' + companySpecific + ' deals with company-specific instructions');
  console.log('Updated ' + categoryBased + ' deals with category-based instructions');
}

updateDeals();
