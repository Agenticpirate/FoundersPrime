/**
 * Recategorize all deals - Version 3 with comprehensive matching
 */
const fs = require('fs');
const path = require('path');

// Comprehensive company overrides
const COMPANY_OVERRIDES = {
  // AI
  'openai': { category: 'ai', subcategory: 'ai-development' },
  'anthropic': { category: 'ai', subcategory: 'ai-development' },
  'jenni ai': { category: 'ai', subcategory: 'ai-writing' },
  'openart': { category: 'ai', subcategory: 'ai-design' },
  'colossyan': { category: 'ai', subcategory: 'ai-design' },
  'chatbase': { category: 'ai', subcategory: 'ai-agents' },
  'jasper': { category: 'ai', subcategory: 'ai-writing' },
  'grammarly': { category: 'ai', subcategory: 'ai-writing' },
  'zapier': { category: 'ai', subcategory: 'ai-automation' },
  'make': { category: 'ai', subcategory: 'ai-automation' },
  'n8n': { category: 'ai', subcategory: 'ai-automation' },
  'anything': { category: 'ai', subcategory: 'ai-automation' },
  
  // Data / Cloud
  'cloudflare': { category: 'data', subcategory: 'cloud-computing' },
  'aws': { category: 'data', subcategory: 'cloud-computing' },
  'google cloud': { category: 'data', subcategory: 'cloud-computing' },
  'alibaba cloud': { category: 'data', subcategory: 'cloud-computing' },
  'azure': { category: 'data', subcategory: 'cloud-computing' },
  'digitalocean': { category: 'data', subcategory: 'cloud-computing' },
  'vercel': { category: 'data', subcategory: 'cloud-computing' },
  'netlify': { category: 'data', subcategory: 'cloud-computing' },
  'heroku': { category: 'data', subcategory: 'cloud-computing' },
  'railway': { category: 'data', subcategory: 'cloud-computing' },
  'render': { category: 'data', subcategory: 'cloud-computing' },
  'galaxy': { category: 'data', subcategory: 'cloud-computing' },
  'confluent': { category: 'data', subcategory: 'cloud-computing' },
  'mux': { category: 'data', subcategory: 'cloud-computing' },
  'mongodb': { category: 'data', subcategory: 'cloud-data-management' },
  'supabase': { category: 'data', subcategory: 'cloud-data-management' },
  'planetscale': { category: 'data', subcategory: 'cloud-data-management' },
  'neon': { category: 'data', subcategory: 'cloud-data-management' },
  'amplitude': { category: 'data', subcategory: 'data-analytics' },
  'mixpanel': { category: 'data', subcategory: 'data-analytics' },
  'segment': { category: 'data', subcategory: 'data-analytics' },
  'posthog': { category: 'data', subcategory: 'data-analytics' },
  'hotjar': { category: 'data', subcategory: 'data-analytics' },
  'datapills': { category: 'data', subcategory: 'data-analytics' },
  'sirdata': { category: 'data', subcategory: 'data-analytics' },
  'google sheets': { category: 'data', subcategory: 'document-management' },
  'google docs': { category: 'data', subcategory: 'document-management' },
  'depositphotos': { category: 'development', subcategory: 'design' },
  
  // Project Management
  'notion': { category: 'project-management', subcategory: 'productivity' },
  'coda': { category: 'project-management', subcategory: 'productivity' },
  'airtable': { category: 'project-management', subcategory: 'productivity' },
  'granola': { category: 'project-management', subcategory: 'productivity' },
  'asana': { category: 'project-management', subcategory: 'task-management' },
  'monday': { category: 'project-management', subcategory: 'task-management' },
  'trello': { category: 'project-management', subcategory: 'task-management' },
  'clickup': { category: 'project-management', subcategory: 'task-management' },
  'linear': { category: 'project-management', subcategory: 'task-management' },
  'backlog': { category: 'project-management', subcategory: 'task-management' },
  'producter': { category: 'project-management', subcategory: 'task-management' },
  'slack': { category: 'project-management', subcategory: 'collaboration' },
  'discord': { category: 'project-management', subcategory: 'collaboration' },
  'blue': { category: 'project-management', subcategory: 'collaboration' },
  'google meet': { category: 'project-management', subcategory: 'collaboration' },
  'zoom': { category: 'project-management', subcategory: 'collaboration' },
  'calendly': { category: 'project-management', subcategory: 'time-management' },
  'prezi': { category: 'project-management', subcategory: 'presentation' },
  'gamma': { category: 'project-management', subcategory: 'presentation' },
  
  // Development
  'github': { category: 'development', subcategory: 'web-development' },
  'gitlab': { category: 'development', subcategory: 'web-development' },
  'jetbrains': { category: 'development', subcategory: 'web-development' },
  'postman': { category: 'development', subcategory: 'web-development' },
  'usecsv': { category: 'development', subcategory: 'web-development' },
  'lovable': { category: 'development', subcategory: 'no-code-development' },
  'webflow': { category: 'development', subcategory: 'no-code-development' },
  'bubble': { category: 'development', subcategory: 'no-code-development' },
  'softr': { category: 'development', subcategory: 'no-code-development' },
  'glide': { category: 'development', subcategory: 'no-code-development' },
  'pivony': { category: 'development', subcategory: 'no-code-development' },
  'wix': { category: 'development', subcategory: 'website-builder' },
  'squarespace': { category: 'development', subcategory: 'website-builder' },
  'tailor brands': { category: 'development', subcategory: 'website-builder' },
  'figma': { category: 'development', subcategory: 'design' },
  'canva': { category: 'development', subcategory: 'design' },
  'miro': { category: 'development', subcategory: 'design' },
  'framer': { category: 'development', subcategory: 'design' },
  'loom': { category: 'development', subcategory: 'video' },
  'descript': { category: 'development', subcategory: 'video' },
  'synthesia': { category: 'development', subcategory: 'video' },
  'skillshare': { category: 'development', subcategory: 'educational' },
  'teachable': { category: 'development', subcategory: 'cms' },
  'thinkific': { category: 'development', subcategory: 'cms' },
  
  // Customer
  'hubspot': { category: 'customer', subcategory: 'crm' },
  'salesforce': { category: 'customer', subcategory: 'crm' },
  'pipedrive': { category: 'customer', subcategory: 'crm' },
  'attio': { category: 'customer', subcategory: 'crm' },
  'folk': { category: 'customer', subcategory: 'crm' },
  'intercom': { category: 'customer', subcategory: 'customer-experience' },
  'zendesk': { category: 'customer', subcategory: 'customer-experience' },
  'freshdesk': { category: 'customer', subcategory: 'customer-experience' },
  'crisp': { category: 'customer', subcategory: 'customer-experience' },
  'tidio': { category: 'customer', subcategory: 'customer-experience' },
  'prodcamp': { category: 'customer', subcategory: 'customer-experience' },
  'typeform': { category: 'customer', subcategory: 'survey' },
  'jotform': { category: 'customer', subcategory: 'survey' },
  'apollo': { category: 'customer', subcategory: 'lead-management' },
  'lusha': { category: 'customer', subcategory: 'lead-management' },
  'hunter': { category: 'customer', subcategory: 'lead-management' },
  'seamless': { category: 'customer', subcategory: 'lead-management' },
  'iproyal': { category: 'customer', subcategory: 'lead-management' },
  
  // Marketing
  'mailchimp': { category: 'marketing', subcategory: 'email-marketing' },
  'sendgrid': { category: 'marketing', subcategory: 'email-marketing' },
  'brevo': { category: 'marketing', subcategory: 'email-marketing' },
  'klaviyo': { category: 'marketing', subcategory: 'email-marketing' },
  'beehiiv': { category: 'marketing', subcategory: 'email-marketing' },
  'semrush': { category: 'marketing', subcategory: 'seo' },
  'ahrefs': { category: 'marketing', subcategory: 'seo' },
  'hootsuite': { category: 'marketing', subcategory: 'social-media' },
  'buffer': { category: 'marketing', subcategory: 'social-media' },
  'phantombuster': { category: 'marketing', subcategory: 'growth-marketing' },
  'apphud': { category: 'marketing', subcategory: 'mobile-marketing' },
  
  // Finance
  'stripe': { category: 'finance', subcategory: 'payments' },
  'paypal': { category: 'finance', subcategory: 'payments' },
  'chargebee': { category: 'finance', subcategory: 'payments' },
  'mercury': { category: 'finance', subcategory: 'online-banking' },
  'brex': { category: 'finance', subcategory: 'online-banking' },
  'ramp': { category: 'finance', subcategory: 'online-banking' },
  'qonto': { category: 'finance', subcategory: 'online-banking' },
  'worldfirst': { category: 'finance', subcategory: 'online-banking' },
  'airwallex': { category: 'finance', subcategory: 'online-banking' },
  'quickbooks': { category: 'finance', subcategory: 'accounting' },
  'xero': { category: 'finance', subcategory: 'accounting' },
  'freshbooks': { category: 'finance', subcategory: 'accounting' },
  'every': { category: 'finance', subcategory: 'accounting' },
  'mainstreet': { category: 'finance', subcategory: 'accounting' },
  
  // Sales
  'shopify': { category: 'sales', subcategory: 'ecommerce' },
  'woocommerce': { category: 'sales', subcategory: 'ecommerce' },
  'lemlist': { category: 'sales', subcategory: 'prospecting' },
  'instantly': { category: 'sales', subcategory: 'prospecting' },
  'upwork': { category: 'sales', subcategory: 'ecommerce' },
  
  // Business
  'tomorro': { category: 'business', subcategory: 'legal' },
  'docusign': { category: 'business', subcategory: 'digital-signature' },
  'pandadoc': { category: 'business', subcategory: 'digital-signature' },
  
  // IT
  'zenduty': { category: 'it', subcategory: 'it-management' },
  'pagerly': { category: 'it', subcategory: 'it-management' },
  'instatus': { category: 'it', subcategory: 'application-monitoring' },
  'adopt': { category: 'it', subcategory: 'security' },
  'eset': { category: 'it', subcategory: 'cybersecurity' },
  'nordvpn': { category: 'it', subcategory: 'vpn' },
  'expressvpn': { category: 'it', subcategory: 'vpn' },
  'aircall': { category: 'it', subcategory: 'it-management' },
  'callhippo': { category: 'it', subcategory: 'it-management' },
  
  // Human Resources
  'content beta': { category: 'human-resources', subcategory: 'recruitment' },
  'gusto': { category: 'human-resources', subcategory: 'payroll-management' },
  'deel': { category: 'human-resources', subcategory: 'payroll-management' },
  'remote': { category: 'human-resources', subcategory: 'payroll-management' }
};


// Enhanced keyword patterns
const KEYWORD_PATTERNS = {
  'ai': {
    'ai-development': ['ai platform', 'machine learning', 'llm', 'gpt', 'ai api', 'ai model'],
    'ai-automation': ['automation', 'workflow automation', 'automate', 'build apps'],
    'ai-agents': ['ai agent', 'chatbot', 'virtual assistant', 'conversational ai'],
    'ai-writing': ['ai writing', 'content generation', 'copywriting', 'ai research assistant'],
    'ai-marketing': ['ai marketing', 'marketing automation', 'ai ads'],
    'ai-data-analysis': ['ai analytics', 'data analysis ai', 'predictive analytics'],
    'ai-customer-support': ['ai support', 'customer service ai'],
    'ai-productivity': ['ai productivity', 'ai assistant', 'smart workspace'],
    'ai-sales-business': ['ai sales', 'sales automation', 'ai crm'],
    'ai-design': ['ai design', 'generative design', 'ai graphics', 'create videos', 'ai video'],
    'ai-hr': ['ai recruiting', 'hr automation', 'ai hiring']
  },
  'project-management': {
    'collaboration': ['team collaboration', 'workspace', 'team communication', 'video conferencing', 'connect and collaborate', 'collaborative work'],
    'task-management': ['task management', 'project tracking', 'kanban', 'sprint', 'product management', 'turn chaos into progress'],
    'productivity': ['productivity', 'notes', 'documentation', 'wiki', 'capturing what matters'],
    'presentation': ['presentation', 'slides', 'pitch deck'],
    'time-management': ['scheduling', 'calendar', 'time tracking', 'booking']
  },
  'data': {
    'cloud-computing': ['cloud', 'hosting', 'server', 'infrastructure', 'cdn', 'powering global'],
    'cloud-storage': ['storage', 'file storage', 'backup', 'cloud drive'],
    'data-analytics': ['analytics', 'data visualization', 'metrics', 'tracking'],
    'cloud-data-management': ['database', 'data management', 'data warehouse', 'data import'],
    'document-management': ['document management', 'file management', 'google docs', 'google sheets']
  },
  'customer': {
    'crm': ['crm', 'customer relationship', 'sales pipeline'],
    'lead-management': ['lead generation', 'lead management', 'prospecting', 'b2b data', 'smarter leads', 'connect globally'],
    'customer-experience': ['customer support', 'helpdesk', 'live chat', 'feedback'],
    'survey': ['survey', 'forms', 'questionnaire']
  },
  'development': {
    'web-development': ['developer tools', 'api', 'sdk', 'code', 'devops', 'add data import'],
    'no-code-development': ['no-code', 'low-code', 'visual development', 'app builder', 'build apps'],
    'website-builder': ['website builder', 'landing page', 'site builder', 'launch your dream business'],
    'design': ['design tool', 'graphic design', 'ui/ux', 'prototyping', 'pixels to impact', 'stock photos'],
    'video': ['video editing', 'video creation', 'screen recording', 'create videos at scale'],
    'application-development': ['app development', 'mobile app', 'building web applications'],
    'cms': ['cms', 'content management', 'course platform'],
    'educational': ['learning', 'education', 'courses', 'training']
  },
  'marketing': {
    'advertising': ['advertising', 'ads', 'ppc', 'ad management'],
    'email-marketing': ['email marketing', 'newsletter', 'email automation'],
    'content-marketing': ['content marketing', 'blog', 'content creation'],
    'seo': ['seo', 'search engine', 'keyword', 'backlink'],
    'marketing-automation': ['marketing automation', 'campaign management'],
    'social-media': ['social media', 'social management', 'social scheduling'],
    'growth-marketing': ['growth', 'referral', 'viral', 'affiliate', 'influencer'],
    'translation': ['translation', 'localization', 'multilingual'],
    'mobile-marketing': ['mobile marketing', 'app marketing', 'push notification']
  },
  'finance': {
    'payments': ['payment', 'billing', 'subscription', 'checkout', 'international payments'],
    'online-banking': ['banking', 'business banking', 'corporate card', 'financial suite', 'smarter international payments'],
    'accounting': ['accounting', 'bookkeeping', 'financial management', 'boost profitability'],
    'invoicing': ['invoicing', 'invoice', 'billing software']
  },
  'sales': {
    'prospecting': ['outreach', 'cold email', 'sales engagement', 'empower your work'],
    'ecommerce': ['ecommerce', 'online store', 'dropshipping', 'marketplace', 'freelance']
  },
  'business': {
    'erp': ['erp', 'enterprise resource'],
    'business-intelligence': ['business intelligence', 'reporting', 'dashboards'],
    'scheduling': ['scheduling', 'appointment booking'],
    'legal': ['legal', 'contract', 'compliance'],
    'company-formation': ['incorporation', 'company formation'],
    'business-process': ['business process', 'workflow', 'operations'],
    'digital-signature': ['e-signature', 'digital signature', 'document signing']
  },
  'it': {
    'it-management': ['it management', 'it service', 'incident management', 'incident response', 'telephone system', 'business calling', 'dial into efficiency'],
    'remote-desktop': ['remote desktop', 'remote access'],
    'vpn': ['vpn', 'virtual private network', 'privacy', 'stay secure'],
    'application-monitoring': ['monitoring', 'apm', 'uptime', 'status page'],
    'cybersecurity': ['cybersecurity', 'threat detection', 'encrypt', 'defend'],
    'security': ['security', 'authentication', 'identity', 'sso'],
    'domain-management': ['domain', 'dns']
  },
  'human-resources': {
    'applicant-tracking': ['ats', 'applicant tracking', 'hiring software'],
    'employee-engagement': ['employee engagement', 'team building', 'hr platform'],
    'payroll-management': ['payroll', 'salary', 'compensation'],
    'recruitment': ['recruiting', 'hiring', 'talent acquisition', 'full-time creative']
  },
  'operations': {
    'field-service': ['field service', 'field management'],
    'inventory-management': ['inventory', 'stock management', 'warehouse'],
    'contract-management': ['contract management', 'clm']
  },
  'lifestyle': {
    'fitness-wellness': ['fitness', 'wellness', 'health', 'meditation'],
    'gaming': ['gaming', 'game', 'esports'],
    'travel': ['travel', 'booking', 'flights', 'hotels'],
    'entertainment': ['entertainment', 'streaming', 'music', 'podcast']
  }
};


const CATEGORY_ICONS = {
  'ai': '🤖',
  'project-management': '📋',
  'data': '☁️',
  'customer': '👥',
  'development': '💻',
  'marketing': '📈',
  'finance': '💰',
  'sales': '🛒',
  'business': '🏢',
  'it': '🔒',
  'human-resources': '👔',
  'operations': '⚙️',
  'lifestyle': '🎮'
};

function categorizeDeals(deal) {
  const providerLower = (deal.provider || '').toLowerCase().trim();
  const titleLower = (deal.title || '').toLowerCase().trim();
  const descLower = (deal.description || '').toLowerCase();
  const tagsLower = (deal.tags || []).map(t => t.toLowerCase()).join(' ');
  const searchText = `${providerLower} ${titleLower} ${descLower} ${tagsLower}`;
  
  // Check company overrides first
  for (const [company, mapping] of Object.entries(COMPANY_OVERRIDES)) {
    if (providerLower.includes(company) || titleLower.includes(company)) {
      return { category: mapping.category, subcategory: mapping.subcategory, icon: CATEGORY_ICONS[mapping.category] };
    }
  }
  
  // Check keyword patterns
  for (const [category, subcategories] of Object.entries(KEYWORD_PATTERNS)) {
    for (const [subcategory, keywords] of Object.entries(subcategories)) {
      for (const keyword of keywords) {
        if (searchText.includes(keyword.toLowerCase())) {
          return { category, subcategory, icon: CATEGORY_ICONS[category] };
        }
      }
    }
  }
  
  // Fallback based on tags
  if (tagsLower.includes('cloud') || tagsLower.includes('hosting')) return { category: 'data', subcategory: 'cloud-computing', icon: '☁️' };
  if (tagsLower.includes('ai')) return { category: 'ai', subcategory: 'ai-productivity', icon: '🤖' };
  if (tagsLower.includes('marketing') || tagsLower.includes('email')) return { category: 'marketing', subcategory: 'email-marketing', icon: '📈' };
  if (tagsLower.includes('finance') || tagsLower.includes('payment')) return { category: 'finance', subcategory: 'payments', icon: '💰' };
  if (tagsLower.includes('hr') || tagsLower.includes('recruitment')) return { category: 'human-resources', subcategory: 'recruitment', icon: '👔' };
  if (tagsLower.includes('security')) return { category: 'it', subcategory: 'security', icon: '🔒' };
  if (tagsLower.includes('saas')) return { category: 'business', subcategory: 'business-process', icon: '🏢' };
  
  return { category: 'business', subcategory: 'business-process', icon: '🏢' };
}

async function recategorizeDeals() {
  const dealsPath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');
  console.log('Reading deals from:', dealsPath);
  
  const dealsData = fs.readFileSync(dealsPath, 'utf8');
  const deals = JSON.parse(dealsData);
  console.log(`Found ${deals.length} deals to recategorize`);
  
  const categoryCounts = {};
  const subcategoryCounts = {};
  
  const updatedDeals = deals.map(deal => {
    const { category, subcategory, icon } = categorizeDeals(deal);
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    const subKey = `${category}/${subcategory}`;
    subcategoryCounts[subKey] = (subcategoryCounts[subKey] || 0) + 1;
    return { ...deal, category, subcategory, icon };
  });
  
  fs.writeFileSync(dealsPath, JSON.stringify(updatedDeals, null, 2));
  
  console.log('\n=== Recategorization Complete ===');
  console.log(`Total deals: ${updatedDeals.length}`);
  console.log('\nCategory breakdown:');
  Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${CATEGORY_ICONS[cat] || '📦'} ${cat}: ${count} deals`);
  });
  
  console.log('\nTop subcategories:');
  Object.entries(subcategoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([subcat, count]) => {
    console.log(`  - ${subcat}: ${count} deals`);
  });
  
  console.log('\nDeals saved to:', dealsPath);
}

recategorizeDeals().catch(console.error);
