/**
 * Recategorize all deals according to new category structure
 */

const fs = require('fs');
const path = require('path');

// New category mapping based on keywords
const CATEGORY_RULES = {
  // AI Category
  'ai': {
    'ai-development': ['openai', 'anthropic', 'gemini', 'cursor', 'copilot', 'ai api', 'machine learning', 'llm', 'gpt'],
    'ai-automation': ['zapier', 'make.com', 'n8n', 'integromat', 'automation', 'workflow automation', 'ifttt'],
    'ai-agents': ['chatbot', 'ai agent', 'virtual assistant', 'conversational ai', 'chatbase', 'lindy', '11x', 'fathom ai'],
    'ai-writing': ['jasper', 'copy.ai', 'grammarly', 'writesonic', 'quillbot', 'ai writing', 'copywriting'],
    'ai-marketing': ['ai marketing', 'ai content', 'ai seo'],
    'ai-data-analysis': ['ai analytics', 'ai insights', 'predictive'],
    'ai-customer-support': ['ai support', 'ai helpdesk', 'ai chat'],
    'ai-productivity': ['ai productivity', 'ai assistant'],
    'ai-sales-business': ['ai sales', 'ai crm'],
    'ai-design': ['ai design', 'ai image', 'midjourney', 'dall-e', 'stable diffusion'],
    'ai-hr': ['ai recruiting', 'ai hr']
  },
  
  // Project Management
  'project-management': {
    'collaboration': ['slack', 'discord', 'teams', 'collaboration', 'team chat', 'messaging'],
    'task-management': ['asana', 'monday', 'trello', 'clickup', 'linear', 'jira', 'task', 'project management', 'todo'],
    'productivity': ['notion', 'coda', 'airtable', 'productivity', 'workspace'],
    'presentation': ['prezi', 'pitch', 'slides', 'presentation', 'deck'],
    'time-management': ['calendly', 'cal.com', 'doodle', 'calendar', 'scheduling', 'time tracking', 'clockify']
  },
  
  // Data
  'data': {
    'cloud-computing': ['aws', 'azure', 'google cloud', 'gcp', 'digitalocean', 'heroku', 'vercel', 'netlify', 'railway', 'render', 'cloudflare', 'cloud hosting', 'infrastructure'],
    'cloud-storage': ['dropbox', 'box', 'google drive', 'onedrive', 'cloud storage', 'file storage', 'backup'],
    'data-analytics': ['amplitude', 'mixpanel', 'segment', 'heap', 'posthog', 'analytics', 'data analysis', 'bi ', 'business intelligence'],
    'cloud-data-management': ['mongodb', 'supabase', 'planetscale', 'neon', 'database', 'redis', 'postgres', 'mysql', 'data management'],
    'document-management': ['docusign', 'pandadoc', 'document', 'pdf', 'file management']
  },
  
  // Customer
  'customer': {
    'crm': ['salesforce', 'hubspot crm', 'pipedrive', 'close', 'attio', 'folk crm', 'crm', 'customer relationship'],
    'lead-management': ['apollo', 'lusha', 'hunter', 'lead generation', 'lead management', 'prospecting tool'],
    'customer-experience': ['intercom', 'zendesk', 'freshdesk', 'crisp', 'drift', 'customer support', 'helpdesk', 'live chat', 'customer service', 'customer experience'],
    'survey': ['typeform', 'surveymonkey', 'jotform', 'survey', 'feedback', 'forms', 'questionnaire']
  },
  
  // Development
  'development': {
    'web-development': ['github', 'gitlab', 'bitbucket', 'jetbrains', 'postman', 'developer tool', 'api', 'sdk', 'coding', 'programming', 'devops', 'ci/cd'],
    'no-code-development': ['bubble', 'webflow', 'softr', 'glide', 'base44', 'no-code', 'low-code', 'no code', 'lovable', 'emergent'],
    'website-builder': ['wix', 'squarespace', 'wordpress', 'elementor', 'carrd', 'website builder', 'landing page', 'site builder'],
    'design': ['figma', 'canva', 'adobe', 'sketch', 'miro', 'design tool', 'ui design', 'ux design', 'graphic design', 'prototype'],
    'video': ['loom', 'descript', 'synthesia', 'invideo', 'video editing', 'screen recording', 'video creation', 'video maker'],
    'application-development': ['replit', 'app development', 'mobile app', 'ios', 'android'],
    'cms': ['contentful', 'strapi', 'sanity', 'cms', 'content management', 'headless'],
    'educational': ['udemy', 'coursera', 'skillshare', 'masterclass', 'learning', 'course', 'education', 'training']
  },
  
  // Marketing
  'marketing': {
    'advertising': ['google ads', 'facebook ads', 'linkedin ads', 'tiktok ads', 'ad credits', 'ppc', 'paid media', 'advertising'],
    'email-marketing': ['mailchimp', 'sendgrid', 'brevo', 'klaviyo', 'activecampaign', 'email marketing', 'newsletter', 'email campaign'],
    'content-marketing': ['content marketing', 'blog', 'content creation', 'copywriting'],
    'seo': ['semrush', 'ahrefs', 'moz', 'seo', 'search engine', 'keyword', 'backlink'],
    'marketing-automation': ['hubspot marketing', 'marketo', 'marketing automation', 'drip campaign'],
    'social-media': ['hootsuite', 'buffer', 'sprout', 'social media', 'social management', 'instagram', 'twitter', 'linkedin'],
    'growth-marketing': ['growth', 'viral', 'referral', 'acquisition'],
    'translation': ['weglot', 'translation', 'localization', 'multilingual'],
    'mobile-marketing': ['apphud', 'mobile marketing', 'push notification', 'app marketing']
  },
  
  // Finance
  'finance': {
    'payments': ['stripe', 'paypal', 'square', 'payment processing', 'checkout', 'payment gateway'],
    'online-banking': ['mercury', 'brex', 'ramp', 'banking', 'business bank', 'neobank', 'fintech'],
    'accounting': ['quickbooks', 'xero', 'freshbooks', 'accounting', 'bookkeeping', 'financial management'],
    'invoicing': ['invoice', 'billing', 'subscription billing', 'recurring payment']
  },
  
  // Sales
  'sales': {
    'prospecting': ['outreach', 'sales engagement', 'cold email', 'prospecting', 'sales tool', 'lemlist', 'instantly', 'reply.io'],
    'ecommerce': ['shopify', 'woocommerce', 'bigcommerce', 'ecommerce', 'e-commerce', 'online store', 'shop', 'retail']
  },
  
  // Business
  'business': {
    'erp': ['erp', 'enterprise resource', 'odoo', 'sap'],
    'business-intelligence': ['tableau', 'power bi', 'looker', 'business intelligence', 'reporting', 'dashboard'],
    'scheduling': ['calendly', 'acuity', 'appointment', 'booking', 'schedule'],
    'legal': ['legalzoom', 'rocket lawyer', 'legal', 'attorney', 'lawyer', 'contract'],
    'company-formation': ['stripe atlas', 'firstbase', 'doola', 'clerky', 'incorporation', 'company formation', 'llc', 'corp'],
    'business-process': ['process', 'workflow', 'bpm'],
    'digital-signature': ['docusign', 'hellosign', 'signnow', 'e-signature', 'digital signature', 'electronic signature']
  },
  
  // IT
  'it': {
    'it-management': ['it management', 'device management', 'mdm', 'endpoint'],
    'remote-desktop': ['remote desktop', 'teamviewer', 'anydesk', 'remote access'],
    'vpn': ['nordvpn', 'expressvpn', 'surfshark', 'vpn', 'virtual private'],
    'application-monitoring': ['datadog', 'newrelic', 'sentry', 'monitoring', 'apm', 'observability', 'logging'],
    'cybersecurity': ['1password', 'lastpass', 'okta', 'auth0', 'security', 'password', 'authentication', 'sso'],
    'security': ['antivirus', 'malware', 'firewall', 'threat', 'compliance', 'gdpr', 'soc2'],
    'domain-management': ['godaddy', 'namecheap', 'domain', 'dns', 'hosting']
  },
  
  // Human Resources
  'human-resources': {
    'applicant-tracking': ['greenhouse', 'lever', 'workable', 'ats', 'applicant tracking', 'hiring'],
    'employee-engagement': ['lattice', 'culture amp', 'employee engagement', 'performance review', 'feedback'],
    'payroll-management': ['gusto', 'rippling', 'deel', 'payroll', 'salary', 'compensation'],
    'recruitment': ['indeed', 'linkedin jobs', 'recruitment', 'recruiting', 'talent', 'job posting']
  },
  
  // Operations
  'operations': {
    'field-service': ['field service', 'dispatch', 'technician'],
    'inventory-management': ['inventory', 'warehouse', 'stock', 'supply chain'],
    'contract-management': ['contract management', 'clm', 'agreement']
  },
  
  // Lifestyle
  'lifestyle': {
    'fitness-wellness': ['fitness', 'wellness', 'health', 'meditation', 'yoga'],
    'gaming': ['gaming', 'game', 'esports'],
    'travel': ['travel', 'flight', 'hotel', 'booking', 'airbnb', 'trip'],
    'entertainment': ['spotify', 'netflix', 'entertainment', 'music', 'streaming', 'podcast']
  }
};


// Company-specific overrides for accurate categorization
const COMPANY_OVERRIDES = {
  // AI
  'openai': { category: 'ai', subcategory: 'ai-development' },
  'anthropic': { category: 'ai', subcategory: 'ai-development' },
  'google gemini': { category: 'ai', subcategory: 'ai-development' },
  'chatbase': { category: 'ai', subcategory: 'ai-agents' },
  'lindy': { category: 'ai', subcategory: 'ai-agents' },
  '11x': { category: 'ai', subcategory: 'ai-agents' },
  'jasper': { category: 'ai', subcategory: 'ai-writing' },
  'copy.ai': { category: 'ai', subcategory: 'ai-writing' },
  'grammarly': { category: 'ai', subcategory: 'ai-writing' },
  
  // Data / Cloud
  'cloudflare': { category: 'data', subcategory: 'cloud-computing' },
  'aws': { category: 'data', subcategory: 'cloud-computing' },
  'google cloud': { category: 'data', subcategory: 'cloud-computing' },
  'azure': { category: 'data', subcategory: 'cloud-computing' },
  'digitalocean': { category: 'data', subcategory: 'cloud-computing' },
  'vercel': { category: 'data', subcategory: 'cloud-computing' },
  'netlify': { category: 'data', subcategory: 'cloud-computing' },
  'heroku': { category: 'data', subcategory: 'cloud-computing' },
  'railway': { category: 'data', subcategory: 'cloud-computing' },
  'render': { category: 'data', subcategory: 'cloud-computing' },
  'mongodb': { category: 'data', subcategory: 'cloud-data-management' },
  'supabase': { category: 'data', subcategory: 'cloud-data-management' },
  'amplitude': { category: 'data', subcategory: 'data-analytics' },
  'mixpanel': { category: 'data', subcategory: 'data-analytics' },
  'segment': { category: 'data', subcategory: 'data-analytics' },
  'posthog': { category: 'data', subcategory: 'data-analytics' },
  
  // Project Management
  'notion': { category: 'project-management', subcategory: 'productivity' },
  'asana': { category: 'project-management', subcategory: 'task-management' },
  'monday': { category: 'project-management', subcategory: 'task-management' },
  'trello': { category: 'project-management', subcategory: 'task-management' },
  'clickup': { category: 'project-management', subcategory: 'task-management' },
  'linear': { category: 'project-management', subcategory: 'task-management' },
  'slack': { category: 'project-management', subcategory: 'collaboration' },
  'calendly': { category: 'project-management', subcategory: 'time-management' },
  'cal.com': { category: 'project-management', subcategory: 'time-management' },
  
  // Development
  'github': { category: 'development', subcategory: 'web-development' },
  'gitlab': { category: 'development', subcategory: 'web-development' },
  'jetbrains': { category: 'development', subcategory: 'web-development' },
  'lovable': { category: 'development', subcategory: 'no-code-development' },
  'emergent': { category: 'development', subcategory: 'no-code-development' },
  'webflow': { category: 'development', subcategory: 'no-code-development' },
  'softr': { category: 'development', subcategory: 'no-code-development' },
  'glide': { category: 'development', subcategory: 'no-code-development' },
  'bubble': { category: 'development', subcategory: 'no-code-development' },
  'wix': { category: 'development', subcategory: 'website-builder' },
  'squarespace': { category: 'development', subcategory: 'website-builder' },
  'elementor': { category: 'development', subcategory: 'website-builder' },
  'figma': { category: 'development', subcategory: 'design' },
  'canva': { category: 'development', subcategory: 'design' },
  'miro': { category: 'development', subcategory: 'design' },
  'loom': { category: 'development', subcategory: 'video' },
  'descript': { category: 'development', subcategory: 'video' },
  'synthesia': { category: 'development', subcategory: 'video' },
  
  // Customer
  'hubspot': { category: 'customer', subcategory: 'crm' },
  'salesforce': { category: 'customer', subcategory: 'crm' },
  'pipedrive': { category: 'customer', subcategory: 'crm' },
  'intercom': { category: 'customer', subcategory: 'customer-experience' },
  'zendesk': { category: 'customer', subcategory: 'customer-experience' },
  'freshdesk': { category: 'customer', subcategory: 'customer-experience' },
  'typeform': { category: 'customer', subcategory: 'survey' },
  'jotform': { category: 'customer', subcategory: 'survey' },
  
  // Marketing
  'mailchimp': { category: 'marketing', subcategory: 'email-marketing' },
  'sendgrid': { category: 'marketing', subcategory: 'email-marketing' },
  'brevo': { category: 'marketing', subcategory: 'email-marketing' },
  'klaviyo': { category: 'marketing', subcategory: 'email-marketing' },
  'semrush': { category: 'marketing', subcategory: 'seo' },
  'ahrefs': { category: 'marketing', subcategory: 'seo' },
  'moz': { category: 'marketing', subcategory: 'seo' },
  'hootsuite': { category: 'marketing', subcategory: 'social-media' },
  'buffer': { category: 'marketing', subcategory: 'social-media' },
  
  // Finance
  'stripe': { category: 'finance', subcategory: 'payments' },
  'mercury': { category: 'finance', subcategory: 'online-banking' },
  'brex': { category: 'finance', subcategory: 'online-banking' },
  'quickbooks': { category: 'finance', subcategory: 'accounting' },
  'xero': { category: 'finance', subcategory: 'accounting' },
  'freshbooks': { category: 'finance', subcategory: 'accounting' },
  
  // Sales
  'shopify': { category: 'sales', subcategory: 'ecommerce' },
  'lemlist': { category: 'sales', subcategory: 'prospecting' },
  'instantly': { category: 'sales', subcategory: 'prospecting' },
  'apollo': { category: 'sales', subcategory: 'prospecting' },
  
  // Business
  'stripe atlas': { category: 'business', subcategory: 'company-formation' },
  'firstbase': { category: 'business', subcategory: 'company-formation' },
  'doola': { category: 'business', subcategory: 'company-formation' },
  'clerky': { category: 'business', subcategory: 'company-formation' },
  'legalzoom': { category: 'business', subcategory: 'legal' },
  'docusign': { category: 'business', subcategory: 'digital-signature' },
  'pandadoc': { category: 'business', subcategory: 'digital-signature' },
  
  // IT
  'nordvpn': { category: 'it', subcategory: 'vpn' },
  'expressvpn': { category: 'it', subcategory: 'vpn' },
  'surfshark': { category: 'it', subcategory: 'vpn' },
  '1password': { category: 'it', subcategory: 'cybersecurity' },
  'okta': { category: 'it', subcategory: 'cybersecurity' },
  'auth0': { category: 'it', subcategory: 'cybersecurity' },
  'datadog': { category: 'it', subcategory: 'application-monitoring' },
  'sentry': { category: 'it', subcategory: 'application-monitoring' },
  
  // Human Resources
  'gusto': { category: 'human-resources', subcategory: 'payroll-management' },
  'rippling': { category: 'human-resources', subcategory: 'payroll-management' },
  'deel': { category: 'human-resources', subcategory: 'payroll-management' },
  'indeed': { category: 'human-resources', subcategory: 'recruitment' },
  'bamboohr': { category: 'human-resources', subcategory: 'employee-engagement' },
  
  // Automation tools
  'zapier': { category: 'ai', subcategory: 'ai-automation' },
  'make': { category: 'ai', subcategory: 'ai-automation' },
  'n8n': { category: 'ai', subcategory: 'ai-automation' },
  'ifttt': { category: 'ai', subcategory: 'ai-automation' }
};


function categorizeByKeywords(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  
  for (const [category, subcategories] of Object.entries(CATEGORY_RULES)) {
    for (const [subcategory, keywords] of Object.entries(subcategories)) {
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          return { category, subcategory };
        }
      }
    }
  }
  
  // Default fallback
  return { category: 'business', subcategory: 'business-process' };
}

function recategorizeDeals() {
  const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
  const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
  
  console.log('Recategorizing ' + deals.length + ' deals...\n');
  
  const categoryCounts = {};
  
  deals.forEach(deal => {
    const titleLower = deal.title.toLowerCase();
    let newCat = null;
    
    // Check company overrides first
    for (const [company, cat] of Object.entries(COMPANY_OVERRIDES)) {
      if (titleLower.includes(company.toLowerCase())) {
        newCat = cat;
        break;
      }
    }
    
    // Fall back to keyword matching
    if (!newCat) {
      newCat = categorizeByKeywords(deal.title, deal.description);
    }
    
    deal.category = newCat.category;
    deal.subcategory = newCat.subcategory;
    
    // Count
    const key = newCat.category + ' > ' + newCat.subcategory;
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
  });
  
  fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
  
  console.log('=== NEW CATEGORY BREAKDOWN ===\n');
  
  // Group by main category
  const mainCats = {};
  Object.entries(categoryCounts).forEach(([key, count]) => {
    const [main, sub] = key.split(' > ');
    if (!mainCats[main]) mainCats[main] = { total: 0, subs: {} };
    mainCats[main].total += count;
    mainCats[main].subs[sub] = count;
  });
  
  Object.entries(mainCats).sort((a, b) => b[1].total - a[1].total).forEach(([main, data]) => {
    console.log(main.toUpperCase() + ' (' + data.total + ' deals)');
    Object.entries(data.subs).sort((a, b) => b[1] - a[1]).forEach(([sub, count]) => {
      console.log('  └─ ' + sub + ': ' + count);
    });
    console.log('');
  });
}

recategorizeDeals();
