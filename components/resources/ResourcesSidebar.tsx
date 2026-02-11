export default function ResourcesSidebar() {
  const topCategories = [
    { name: 'Business Planning', count: 187, icon: 'business_center' },
    { name: 'Fundraising', count: 156, icon: 'trending_up' },
    { name: 'Marketing & Sales', count: 143, icon: 'campaign' },
    { name: 'Legal & Compliance', count: 98, icon: 'gavel' },
    { name: 'Product Development', count: 89, icon: 'build' },
    { name: 'Finance & Accounting', count: 76, icon: 'account_balance' }
  ]

  const featuredResources = [
    { title: 'Ultimate Pitch Deck Template', downloads: '45K', rating: 4.9 },
    { title: 'Complete Business Plan Guide', downloads: '38K', rating: 4.8 },
    { title: 'Growth Marketing Toolkit', downloads: '28K', rating: 4.6 },
    { title: 'Product Roadmap Template', downloads: '22K', rating: 4.5 }
  ]

  const quickStats = [
    { label: 'Free Resources', value: '892', icon: 'free_breakfast' },
    { label: 'Premium Resources', value: '355', icon: 'workspace_premium' },
    { label: 'New This Week', value: '12', icon: 'new_releases' },
    { label: 'Most Downloaded', value: '45K', icon: 'download' }
  ]

  const resourceTypes = [
    { type: 'Templates', count: 423, percentage: 34 },
    { type: 'Guides', count: 298, percentage: 24 },
    { type: 'Tools', count: 234, percentage: 19 },
    { type: 'Courses', count: 156, percentage: 12 },
    { type: 'Reports', count: 89, percentage: 7 },
    { type: 'Other', count: 47, percentage: 4 }
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

      {/* Top Categories */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">category</span>
          Top Categories
        </h3>
        <div className="space-y-3">
          {topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-sm cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm text-gray-500">{category.icon}</span>
                <span className="font-mono text-sm font-bold">{category.name}</span>
              </div>
              <span className="font-mono text-sm text-gray-600">{category.count}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-2 border-black font-mono rounded-sm transition-colors">
          View All Categories
        </button>
      </div>

      {/* Resource Types */}
      <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">pie_chart</span>
          Resource Types
        </h3>
        <div className="space-y-3">
          {resourceTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <span className="font-mono text-sm text-gray-300">{type.type}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-white">{type.count}</span>
                <span className="font-mono text-xs text-gray-400 ml-2">({type.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Resources */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">star</span>
          Most Popular
        </h3>
        <div className="space-y-4">
          {featuredResources.map((resource, index) => (
            <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-sm font-bold">{resource.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-gray-500">{resource.downloads} downloads</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                  <span className="font-mono text-xs font-bold">{resource.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-2 border-black font-mono rounded-sm transition-colors">
          View All Popular
        </button>
      </div>

      {/* Submit Resource */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined">add_circle</span>
          Submit Resource
        </h3>
        <p className="font-sans text-sm text-gray-600 mb-4">
          Have a great resource to share with the community? Submit it for review and potential inclusion.
        </p>
        <button className="w-full py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">upload</span>
          Submit Resource
        </button>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-3">Weekly Resource Digest</h3>
        <p className="font-sans text-sm text-gray-600 mb-4">
          Get the latest resources, templates, and tools delivered to your inbox every week.
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