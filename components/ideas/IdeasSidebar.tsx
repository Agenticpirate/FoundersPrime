export default function IdeasSidebar() {
  const topCategories = [
    { name: 'AI/ML', count: 487, growth: '+67%' },
    { name: 'FinTech', count: 342, growth: '+23%' },
    { name: 'HealthTech', count: 298, growth: '+45%' },
    { name: 'Climate', count: 234, growth: '+89%' },
    { name: 'B2B Tools', count: 189, growth: '+34%' },
    { name: 'Consumer', count: 156, growth: '+12%' }
  ]

  const trendingIdeas = [
    { title: 'AI Code Review Assistant', score: 8.7, category: 'AI/ML' },
    { title: 'Remote Team Wellness', score: 8.1, category: 'B2B Tools' },
    { title: 'Local Food Rescue', score: 8.4, category: 'Consumer' },
    { title: 'Meeting Insights AI', score: 9.1, category: 'AI/ML' }
  ]

  const quickStats = [
    { label: 'High Demand (8+)', value: '847', icon: 'trending_up' },
    { label: 'Low Competition', value: '1,234', icon: 'sports_score' },
    { label: 'Quick MVP (&lt;3mo)', value: '923', icon: 'speed' },
    { label: 'Large Market ($1B+)', value: '456', icon: 'public' }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">analytics</span>
          Quick Stats
        </h3>
        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-gray-500">{stat.icon}</span>
                <span className="font-mono text-sm" dangerouslySetInnerHTML={{ __html: stat.label }}></span>
              </div>
              <span className="font-mono text-sm font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">category</span>
          Top Categories
        </h3>
        <div className="space-y-3">
          {topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <span className="font-mono text-sm font-bold">{category.name}</span>
                <span className="text-xs text-green-600 ml-2">{category.growth}</span>
              </div>
              <span className="font-mono text-sm text-gray-600">{category.count}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-2 border-black font-mono rounded-sm transition-colors">
          View All Categories
        </button>
      </div>

      {/* Trending Ideas */}
      <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">whatshot</span>
          Trending Ideas
        </h3>
        <div className="space-y-4">
          {trendingIdeas.map((idea, index) => (
            <div key={index} className="border-b border-gray-700 pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-sm font-bold text-white">{idea.title}</span>
                <span className="font-mono text-xs text-primary">{idea.score}/10</span>
              </div>
              <span className="font-mono text-xs text-gray-400">{idea.category}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-primary hover:bg-white hover:text-black border-2 border-white text-black font-mono rounded-sm transition-colors">
          View All Trending
        </button>
      </div>

      {/* Validation Methodology */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined">science</span>
          How We Validate
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-black size-6 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0">
              1
            </div>
            <p className="font-sans text-gray-700">Search volume analysis across Google, social media, and forums</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-black size-6 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0">
              2
            </div>
            <p className="font-sans text-gray-700">Competitor funding and market traction research</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-black size-6 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0">
              3
            </div>
            <p className="font-sans text-gray-700">Technical feasibility and cost estimation</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-black size-6 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0">
              4
            </div>
            <p className="font-sans text-gray-700">Market size and monetization potential analysis</p>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-3">Weekly Ideas Digest</h3>
        <p className="font-sans text-sm text-gray-600 mb-4">
          Get 5 new validated startup ideas delivered to your inbox every week.
        </p>
        <div className="space-y-3">
          <input 
            className="w-full bg-gray-50 border-2 border-black text-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm" 
            placeholder="your@email.com" 
            type="email"
          />
          <button className="w-full py-2 text-sm bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}