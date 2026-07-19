import SearchResultCard from '@/components/search/SearchResultCard'

interface SearchResult {
  type: 'deal' | 'startup' | 'idea' | 'resource'
  title: string
  description: string
  category: string
  url: string
  featured?: boolean
  metadata: Record<string, any>
  [key: string]: any
}

const searchResults: SearchResult[] = [
    {
      type: 'deal',
      title: 'AWS Activate - Up to $100,000 in Credits',
      description: 'Get up to $100,000 in AWS credits, plus technical support, training, and exclusive offers for startups.',
      category: 'Cloud Credits',
      value: '$100,000',
      provider: 'Amazon Web Services',
      status: 'Active',
      featured: false,
      url: '/deals/aws-activate',
      metadata: {
        expires: '2024-12-31',
        eligibility: 'Early-stage startups',
        requirements: 'Less than 10 years old'
      }
    },
    {
      type: 'startup',
      title: 'Stripe',
      description: 'Online payment processing for internet businesses. Stripe is a suite of payment APIs that powers commerce for businesses of all sizes.',
      category: 'Fintech',
      funding: '$2.2B',
      valuation: '$95B',
      stage: 'Public',
      url: '/ideas',
      metadata: {
        founded: '2010',
        employees: '4,000+',
        revenue: '$12B+ ARR'
      }
    },
    {
      type: 'idea',
      title: 'AI-Powered Code Review Assistant',
      description: 'An intelligent code review tool that uses machine learning to identify bugs, security vulnerabilities, and suggest improvements.',
      category: 'Developer Tools',
      demandScore: 8.5,
      complexity: 'High',
      url: '/ideas/ai-code-reviewer',
      metadata: {
        marketSize: '$2.1B',
        competition: 'Medium',
        buildTime: '6-12 months'
      }
    },
    {
      type: 'resource',
      title: 'Startup Pitch Deck Template',
      description: 'Professional pitch deck template used by 500+ funded startups. Includes 15 slides with detailed guidance and examples.',
      category: 'Templates',
      format: 'PDF + PowerPoint',
      price: 'Free',
      url: '/resources/pitch-deck-template',
      metadata: {
        downloads: '25,000+',
        rating: '4.9/5',
        updated: '2024-01-01'
      }
    },
    {
      type: 'resource',
      title: 'The Complete Guide to Startup Funding in 2024',
      description: 'Everything you need to know about raising capital, from pre-seed to Series A. We break down the latest trends and strategies.',
      category: 'Funding',
      author: 'Alex Chen',
      readTime: '12 min read',
      url: 'https://foundersblog.com/complete-guide-startup-funding-2024',
      metadata: {
        published: '2024-01-08',
        views: '12.5K',
        comments: 67
      }
    },
    {
      type: 'deal',
      title: 'Google Cloud Credits - Up to $200,000',
      description: 'Google for Startups Cloud Program provides up to $200,000 in Google Cloud credits over 2 years.',
      category: 'Cloud Credits',
      value: '$200,000',
      provider: 'Google Cloud',
      status: 'Active',
      featured: false,
      url: '/deals/google-cloud-credits',
      metadata: {
        expires: '2024-12-31',
        eligibility: 'Series A and below',
        requirements: 'Less than 5 years old'
      }
    },
    {
      type: 'startup',
      title: 'Notion',
      description: 'All-in-one workspace for notes, tasks, wikis, and databases. Notion helps teams organize their work and knowledge.',
      category: 'Productivity',
      funding: '$343M',
      valuation: '$10B',
      stage: 'Series C',
      url: '/ideas',
      metadata: {
        founded: '2016',
        employees: '500+',
        revenue: '$100M+ ARR'
      }
    },
    {
      type: 'idea',
      title: 'Sustainable Food Delivery Platform',
      description: 'A food delivery service focused on sustainable packaging, local sourcing, and carbon-neutral delivery methods.',
      category: 'Food & Beverage',
      demandScore: 7.2,
      complexity: 'Medium',
      url: '/ideas/sustainable-food-delivery',
      metadata: {
        marketSize: '$150B',
        competition: 'High',
        buildTime: '3-6 months'
      }
    },
    {
      type: 'resource',
      title: 'Financial Model Template for SaaS Startups',
      description: 'Comprehensive financial model template with 5-year projections, unit economics, and scenario planning for SaaS businesses.',
      category: 'Financial Models',
      format: 'Excel',
      price: '$49',
      url: '/resources/saas-financial-model',
      metadata: {
        downloads: '5,000+',
        rating: '4.8/5',
        updated: '2023-12-15'
      }
    },
    {
      type: 'resource',
      title: 'How to Validate Your Startup Idea in 30 Days',
      description: 'A step-by-step framework for testing your startup concept before you build anything. Learn the exact validation process.',
      category: 'Product',
      author: 'Sarah Kim',
      readTime: '8 min read',
      url: 'https://foundersblog.com/validate-startup-idea-30-days',
      metadata: {
        published: '2024-01-07',
        views: '8.9K',
        comments: 24
      }
    }
  ]

export default function SearchResults() {
  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-mono text-xl font-bold text-black">
            Search Results
          </h2>
          <p className="font-sans text-sm text-gray-600">
            Found {searchResults.length} results • Showing 1-10 of 1,247 total results
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-gray-600">View:</span>
          <div className="flex border-2 border-black rounded-sm overflow-hidden">
            <button type="button" className="p-2 bg-primary border-r-2 border-black">
              <span className="material-symbols-outlined text-sm">view_list</span>
            </button>
            <button type="button" className="p-2 bg-white hover:bg-gray-100">
              <span className="material-symbols-outlined text-sm">grid_view</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {searchResults.map((result) => (
          <SearchResultCard key={result.id || result.slug || result.title || result.href} result={result} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <button type="button" className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono font-bold rounded-sm transition-colors disabled:opacity-50" disabled>
          Previous
        </button>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button type="button"
              key={page}
              className={`px-4 py-2 border-2 border-black font-mono font-bold rounded-sm transition-colors ${page === 1
                  ? 'bg-primary text-black'
                  : 'bg-white hover:bg-gray-100 text-black'
                }`}
            >
              {page}
            </button>
          ))}
          <span className="px-4 py-2 text-gray-400">...</span>
          <button type="button" className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono font-bold rounded-sm transition-colors">
            125
          </button>
        </div>

        <button type="button" className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono font-bold rounded-sm transition-colors">
          Next
        </button>
      </div>

      {/* Results Per Page */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="font-mono text-sm text-gray-600">Results per page:</span>
          <select aria-label="Results per page" className="px-3 py-1 border-2 border-black rounded-sm font-mono text-sm bg-white">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  )
}