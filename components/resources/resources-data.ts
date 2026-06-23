export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: string;
  format: string;
  price: string;
  rating: number;
  downloads: string;
  description: string;
  author: string;
  tags: string[];
  features: string[];
  thumbnail: string;
  isPremium: boolean;
  lastUpdated: string;
}

export const resourcesData: ResourceItem[] = [
  {
    id: 'pitch-deck-template',
    title: 'Ultimate Pitch Deck Template',
    category: 'Fundraising',
    type: 'Templates',
    format: 'Google Docs',
    price: 'Free',
    rating: 4.9,
    downloads: '45K',
    description: 'Professional pitch deck template used by 500+ funded startups. Includes 15 essential slides with examples and best practices.',
    author: 'FoundersPrime Team',
    tags: ['Pitch Deck', 'Fundraising', 'Template'],
    features: ['15 slide templates', 'Real examples', 'Best practices guide', 'Editable in Google Slides'],
    thumbnail: 'P',
    isPremium: false,
    lastUpdated: '2024-03-15'
  },
  {
    id: 'business-plan-guide',
    title: 'Complete Business Plan Guide',
    category: 'Business Planning',
    type: 'Guides',
    format: 'PDF',
    price: 'Free',
    rating: 4.8,
    downloads: '38K',
    description: 'Step-by-step guide to writing a comprehensive business plan. Includes templates, examples, and financial modeling.',
    author: 'Sarah Chen',
    tags: ['Business Plan', 'Strategy', 'Planning'],
    features: ['50-page guide', 'Templates included', 'Financial models', 'Industry examples'],
    thumbnail: 'B',
    isPremium: false,
    lastUpdated: '2024-03-10'
  },
  {
    id: 'legal-startup-kit',
    title: 'Startup Legal Document Kit',
    category: 'Legal & Compliance',
    type: 'Templates',
    format: 'PDF',
    price: '$49',
    rating: 4.7,
    downloads: '12K',
    description: 'Essential legal documents for early-stage startups. Reviewed by startup attorneys and regularly updated.',
    author: 'LegalTech Partners',
    tags: ['Legal', 'Documents', 'Compliance'],
    features: ['10+ legal templates', 'Attorney reviewed', 'State-specific versions', 'Regular updates'],
    thumbnail: 'L',
    isPremium: true,
    lastUpdated: '2024-03-12'
  },
  {
    id: 'marketing-toolkit',
    title: 'Growth Marketing Toolkit',
    category: 'Marketing & Sales',
    type: 'Tools',
    format: 'Web Tool',
    price: 'Free',
    rating: 4.6,
    downloads: '28K',
    description: 'Collection of marketing tools and templates for growth hacking, content marketing, and customer acquisition.',
    author: 'GrowthHackers',
    tags: ['Marketing', 'Growth', 'Tools'],
    features: ['20+ marketing tools', 'Content templates', 'Analytics dashboards', 'Campaign trackers'],
    thumbnail: 'M',
    isPremium: false,
    lastUpdated: '2024-03-08'
  },
  {
    id: 'financial-model-template',
    title: 'SaaS Financial Model Template',
    category: 'Finance & Accounting',
    type: 'Templates',
    format: 'Excel/Sheets',
    price: '$29',
    rating: 4.9,
    downloads: '15K',
    description: 'Comprehensive financial model template specifically designed for SaaS startups. Includes revenue forecasting and unit economics.',
    author: 'FinanceForFounders',
    tags: ['Financial Model', 'SaaS', 'Forecasting'],
    features: ['5-year projections', 'Unit economics', 'Scenario planning', 'Investor-ready format'],
    thumbnail: 'F',
    isPremium: true,
    lastUpdated: '2024-03-14'
  },
  {
    id: 'product-roadmap-template',
    title: 'Product Roadmap Template',
    category: 'Product Development',
    type: 'Templates',
    format: 'Notion Template',
    price: 'Free',
    rating: 4.5,
    downloads: '22K',
    description: 'Strategic product roadmap template for planning and communicating your product vision and priorities.',
    author: 'ProductHunt Team',
    tags: ['Product', 'Roadmap', 'Planning'],
    features: ['Quarterly planning', 'Feature prioritization', 'Stakeholder views', 'Progress tracking'],
    thumbnail: 'R',
    isPremium: false,
    lastUpdated: '2024-03-11'
  }
];
