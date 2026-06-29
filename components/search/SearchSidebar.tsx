export default function SearchSidebar() {
  const searchStats = [
    { label: 'Total Results', value: '1,247', icon: 'search' },
    { label: 'Deals Found', value: '156', icon: 'local_offer' },
    { label: 'Startups Found', value: '892', icon: 'business' },
    { label: 'Ideas Found', value: '134', icon: 'lightbulb' },
    { label: 'Resources Found', value: '45', icon: 'folder' },
    { label: 'Blog Posts Found', value: '20', icon: 'article' }
  ]

  const trendingSearches = [
    { query: 'AWS credits', searches: '2.5K', trend: 'up' },
    { query: 'Y Combinator', searches: '1.8K', trend: 'up' },
    { query: 'SaaS tools', searches: '1.2K', trend: 'down' },
    { query: 'Stripe integration', searches: '980', trend: 'up' },
    { query: 'Marketing automation', searches: '756', trend: 'stable' }
  ]

  const recentSearches = [
    'cloud hosting deals',
    'fintech startups',
    'AI startup ideas',
    'pitch deck templates',
    'funding guides'
  ]

  const suggestedFilters = [
    { name: 'High Value Deals', count: 45, type: 'deals' },
    { name: 'Recently Funded', count: 123, type: 'startups' },
    { name: 'Trending Ideas', count: 67, type: 'ideas' },
    { name: 'Free Resources', count: 234, type: 'resources' },
    { name: 'Latest Posts', count: 12, type: 'blog' }
  ]

  return (
    <div className="space-y-6">
      {/* Search Statistics */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Search Results
        </h3>
        <div className="space-y-3">
          {searchStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">{stat.icon}</span>
                <span className="font-sans text-sm text-gray-700">{stat.label}</span>
              </div>
              <span className="font-mono text-sm font-bold text-black">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Searches */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Trending Searches
        </h3>
        <div className="space-y-3">
          {trendingSearches.map((search, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <button className="font-mono text-sm text-primary hover:text-black transition-colors text-left">
                  {search.query}
                </button>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-sans text-xs text-gray-500">{search.searches} searches</span>
                  <span className={`material-symbols-outlined text-xs ${
                    search.trend === 'up' ? 'text-green-600' : 
                    search.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {search.trend === 'up' ? 'trending_up' : 
                     search.trend === 'down' ? 'trending_down' : 'trending_flat'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Your Recent Searches
        </h3>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="block w-full text-left font-mono text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded-sm"
            >
              <span className="material-symbols-outlined text-sm mr-2">history</span>
              {search}
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <button className="font-mono text-sm text-red-600 hover:text-black transition-colors">
            Clear search history
          </button>
        </div>
      </div>

      {/* Suggested Filters */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Suggested Filters
        </h3>
        <div className="space-y-2">
          {suggestedFilters.map((filter, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <span className="font-mono text-sm text-black">{filter.name}</span>
              <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-sm">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Tips */}
      <div className="bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Search Tips
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">tips_and_updates</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Use quotes for exact phrases</p>
              <p className="font-sans text-gray-700">&quot;AWS credits&quot; finds exact matches</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">add</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Use + to require terms</p>
              <p className="font-sans text-gray-700">+startup +funding finds both terms</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">remove</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Use - to exclude terms</p>
              <p className="font-sans text-gray-700">deals -expired excludes expired</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">star</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Use * as wildcard</p>
              <p className="font-sans text-gray-700">market* finds marketing, marketplace</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Search */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 text-center">
        <h3 className="font-mono text-lg font-bold text-black mb-3">
          Need More Control?
        </h3>
        <p className="font-sans text-sm text-gray-700 mb-4">
          Use our advanced search for more precise filtering and boolean operators.
        </p>
        <button className="w-full px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all">
          Advanced Search
        </button>
      </div>

      {/* Save Search */}
      <div className="bg-yellow-50 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 text-center">
        <h3 className="font-mono text-lg font-bold text-black mb-3">
          Save This Search
        </h3>
        <p className="font-sans text-sm text-gray-700 mb-4">
          Get notified when new results match your search criteria.
        </p>
        <button className="w-full px-4 py-2 bg-yellow-400 hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all mb-2">
          Save Search Alert
        </button>
        <p className="font-sans text-xs text-gray-600">
          Pro feature • Upgrade to save searches
        </p>
      </div>
    </div>
  )
}