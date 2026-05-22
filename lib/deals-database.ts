// Deal Database Types and Utilities
// This file contains types and client-safe utilities only

export interface Deal {
  id: string
  slug: string
  title: string
  provider: string
  category: string
  subcategory?: string
  description: string
  shortDescription: string
  value: string
  originalPrice?: string
  discountedPrice?: string
  savings?: string
  savingsAmount?: number
  eligibility: string[]
  requirements: string[]
  applicationProcess: string[]
  proTips?: string[]
  tags: string[]
  status: 'active' | 'expired' | 'coming-soon' | 'limited'
  expiryDate?: string
  applicationUrl: string
  providerWebsite?: string
  logoUrl?: string
  featured: boolean
  featuredUntil?: string
  recommended: boolean
  verified: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  timeToApply: string
  successRate?: string
  lastUpdated: string
  createdAt: string
  updatedAt: string
  sourceVerified: boolean
  dataSource: 'manual' | 'api' | 'import' | 'bulk-import' | 'manual-update'
  icon?: string
}

export interface DealCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  dealCount: number
  totalValue: string
  featured: boolean
  subcategories: DealSubcategory[]
}

export interface DealSubcategory {
  id: string
  name: string
  slug: string
  parentCategory: string
  dealCount: number
}


export interface DealStats {
  totalDeals: number
  totalValue: string
  categoriesCount: number
  activeDeals: number
  expiringSoon: number
  recentlyAdded: number
}

// NEW Category Structure - 13 main categories matching recategorized deals
export const dealCategories: DealCategory[] = [
  {
    id: 'cloud-credits',
    name: 'Cloud Credits',
    slug: 'cloud-credits',
    description: 'Free credits for cloud infrastructure and services',
    icon: '☁️',
    color: 'bg-sky-100',
    dealCount: 0,
    totalValue: '$500K+',
    featured: true,
    subcategories: [
      { id: 'cloud-computing', name: 'Cloud Computing', slug: 'cloud-computing', parentCategory: 'cloud-credits', dealCount: 0 },
      { id: 'cloud-storage', name: 'Cloud Storage', slug: 'cloud-storage', parentCategory: 'cloud-credits', dealCount: 0 },
      { id: 'database', name: 'Database', slug: 'database', parentCategory: 'cloud-credits', dealCount: 0 },
      { id: 'serverless', name: 'Serverless', slug: 'serverless', parentCategory: 'cloud-credits', dealCount: 0 }
    ]
  },
  {
    id: 'ad-credits',
    name: 'Ad Credits',
    slug: 'ad-credits',
    description: 'Free advertising credits for major platforms',
    icon: '📢',
    color: 'bg-purple-100',
    dealCount: 0,
    totalValue: '$50K+',
    featured: true,
    subcategories: [
      { id: 'social-ads', name: 'Social Media Ads', slug: 'social-ads', parentCategory: 'ad-credits', dealCount: 0 },
      { id: 'search-ads', name: 'Search Ads', slug: 'search-ads', parentCategory: 'ad-credits', dealCount: 0 },
      { id: 'display-ads', name: 'Display Ads', slug: 'display-ads', parentCategory: 'ad-credits', dealCount: 0 }
    ]
  },
  {
    id: 'saas-discounts',
    name: 'SaaS Discounts',
    slug: 'saas-discounts',
    description: 'Discounts on essential software tools',
    icon: '💻',
    color: 'bg-indigo-100',
    dealCount: 0,
    totalValue: '$1M+',
    featured: true,
    subcategories: [
      { id: 'ai-tools', name: 'AI Tools', slug: 'ai-tools', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'productivity', name: 'Productivity', slug: 'productivity', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'marketing-tools', name: 'Marketing Tools', slug: 'marketing-tools', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'sales-crm', name: 'Sales & CRM', slug: 'sales-crm', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'dev-tools', name: 'Dev Tools', slug: 'dev-tools', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'design-tools', name: 'Design Tools', slug: 'design-tools', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'finance-legal', name: 'Finance & Legal', slug: 'finance-legal', parentCategory: 'saas-discounts', dealCount: 0 },
      { id: 'hr-ops', name: 'HR & Ops', slug: 'hr-ops', parentCategory: 'saas-discounts', dealCount: 0 }
    ]
  },
  {
    id: 'startup-programs',
    name: 'Startup Programs',
    slug: 'startup-programs',
    description: 'Accelerators, incubators, and startup support programs',
    icon: '🚀',
    color: 'bg-orange-100',
    dealCount: 0,
    totalValue: 'Priceless',
    featured: false,
    subcategories: [
      { id: 'accelerators', name: 'Accelerators', slug: 'accelerators', parentCategory: 'startup-programs', dealCount: 0 },
      { id: 'incubators', name: 'Incubators', slug: 'incubators', parentCategory: 'startup-programs', dealCount: 0 },
      { id: 'grants', name: 'Grants', slug: 'grants', parentCategory: 'startup-programs', dealCount: 0 },
      { id: 'communities', name: 'Communities', slug: 'communities', parentCategory: 'startup-programs', dealCount: 0 }
    ]
  }
]

// Category utilities
export function getAllCategories(): DealCategory[] {
  return dealCategories
}

export function getFeaturedCategories(): DealCategory[] {
  return dealCategories.filter(category => category.featured)
}

export function getCategoryBySlug(slug: string): DealCategory | undefined {
  return dealCategories.find(category => category.slug === slug)
}

export function getCategoryById(id: string): DealCategory | undefined {
  return dealCategories.find(category => category.id === id)
}

export function getSubcategoriesByCategory(categoryId: string): DealSubcategory[] {
  const category = dealCategories.find(cat => cat.id === categoryId)
  return category?.subcategories || []
}

export function searchDeals(_query: string): Deal[] {
  return []
}

export function getDealStats(deals: Deal[]): DealStats {
  const totalSavings = deals.reduce((sum, deal) => sum + (deal.savingsAmount || 0), 0)

  return {
    totalDeals: deals.length,
    totalValue: `${Math.round(totalSavings / 1000)}K+`,
    categoriesCount: dealCategories.filter(c => c.dealCount > 0).length,
    activeDeals: deals.filter(deal => deal.status === 'active').length,
    expiringSoon: 0,
    recentlyAdded: deals.filter(deal => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(deal.createdAt) >= weekAgo
    }).length
  }
}

export const sampleDeals: Deal[] = []
