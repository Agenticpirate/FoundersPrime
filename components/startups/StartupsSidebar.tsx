export default function StartupsSidebar() {
  const topIndustries = [
    { name: 'FinTech', count: 2847, growth: '+12%' },
    { name: 'HealthTech', count: 1923, growth: '+18%' },
    { name: 'EdTech', count: 1456, growth: '+8%' },
    { name: 'E-commerce', count: 1234, growth: '+15%' },
    { name: 'SaaS', count: 1156, growth: '+22%' },
    { name: 'AI/ML', count: 987, growth: '+45%' }
  ]

  const recentlyFunded = [
    { name: 'Anthropic', funding: '$4B', stage: 'Series C' },
    { name: 'Perplexity', funding: '$74M', stage: 'Series B' },
    { name: 'Runway', funding: '$237M', stage: 'Series D' },
    { name: 'Character.AI', funding: '$150M', stage: 'Series A' }
  ]

  const quickStats = [
    { label: 'Unicorns', value: '1,205', icon: 'star' },
    { label: 'IPOs (2024)', value: '89', icon: 'trending_up' },
    { label: 'Acquisitions', value: '2,847', icon: 'handshake' },
    { label: 'Failed', value: '4,123', icon: 'close' }
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
                <span className="font-mono text-sm">{stat.label}</span>
              </div>
              <span className="font-mono text-sm font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Industries */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">category</span>
          Top Industries
        </h3>
        <div className="space-y-3">
          {topIndustries.map((industry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <span className="font-mono text-sm font-bold">{industry.name}</span>
                <span className="text-xs text-green-600 ml-2">{industry.growth}</span>
              </div>
              <span className="font-mono text-sm text-gray-600">{industry.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-2 border-black font-mono rounded-sm transition-colors">
          View All Industries
        </button>
      </div>

      {/* Recently Funded */}
      <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">new_releases</span>
          Recently Funded
        </h3>
        <div className="space-y-4">
          {recentlyFunded.map((startup, index) => (
            <div key={index} className="border-b border-gray-700 pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-sm font-bold text-white">{startup.name}</span>
                <span className="font-mono text-xs text-gray-400">{startup.stage}</span>
              </div>
              <span className="font-mono text-sm text-primary">{startup.funding}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-primary hover:bg-white hover:text-black border-2 border-white text-black font-mono rounded-sm transition-colors">
          View All Recent
        </button>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-3">Weekly Startup Digest</h3>
        <p className="font-sans text-sm text-gray-600 mb-4">
          Get the latest funding rounds, acquisitions, and startup news delivered to your inbox.
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