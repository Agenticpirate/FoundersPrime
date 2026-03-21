export default function ResourcesSidebar() {
  const topCategories = [
    { name: 'Business Planning', count: 187, icon: 'business_center' },
    { name: 'Fundraising', count: 156, icon: 'trending_up' },
    { name: 'Marketing & Sales', count: 143, icon: 'campaign' },
    { name: 'Legal & Compliance', count: 98, icon: 'gavel' },
    { name: 'Product Development', count: 89, icon: 'build' },
    { name: 'Finance & Accounting', count: 76, icon: 'account_balance' }
  ]

  return (
    <div className="space-y-6">
      {/* Top Categories */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">category</span>
          Top Categories
        </h3>
        <div className="space-y-2 md:space-y-3">
          {topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-sm cursor-pointer transition-colors">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="material-symbols-outlined text-sm text-gray-500">{category.icon}</span>
                <span className="font-mono text-xs md:text-sm font-bold">{category.name}</span>
              </div>
              <span className="font-mono text-xs md:text-sm text-gray-600">{category.count}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-2 border-black font-mono rounded-sm transition-colors">
          View All Categories
        </button>
      </div>
    </div>
  )
}