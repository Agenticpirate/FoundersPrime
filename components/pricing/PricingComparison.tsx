export default function PricingComparison() {
  const features = [
    {
      category: 'Core Access',
      items: [
        { feature: 'Deals Database', free: '500 deals', pro: '2,800+ deals', proPlus: '2,800+ deals' },
        { feature: 'Startup Database', free: '1,000 startups', pro: '12,847 startups', proPlus: '12,847 startups' },
        { feature: 'Startup Ideas', free: '100 ideas', pro: '2,847 ideas', proPlus: '2,847 ideas' },
        { feature: 'Resources Library', free: 'Basic access', pro: 'Full access', proPlus: 'Full access' }
      ]
    },
    {
      category: 'Features & Tools',
      items: [
        { feature: 'Advanced Search', free: false, pro: true, proPlus: true },
        { feature: 'Deal Application Tracking', free: false, pro: true, proPlus: true },
        { feature: 'Saved Lists & Bookmarks', free: false, pro: true, proPlus: true },
        { feature: 'Analytics Dashboard', free: 'Basic', pro: 'Advanced', proPlus: 'Advanced' },
        { feature: 'Custom Alerts', free: false, pro: false, proPlus: true },
        { feature: 'API Access', free: false, pro: false, proPlus: true }
      ]
    },
    {
      category: 'Collaboration',
      items: [
        { feature: 'Team Members', free: '1 user', pro: '1 user', proPlus: '5 users' },
        { feature: 'Shared Workspaces', free: false, pro: false, proPlus: true },
        { feature: 'White-label Reports', free: false, pro: false, proPlus: true }
      ]
    },
    {
      category: 'Support & Services',
      items: [
        { feature: 'Email Support', free: 'Basic', pro: 'Priority', proPlus: 'Priority' },
        { feature: 'Phone & Chat Support', free: false, pro: false, proPlus: true },
        { feature: 'Monthly Strategy Calls', free: false, pro: false, proPlus: true },
        { feature: 'Custom Research', free: false, pro: false, proPlus: true }
      ]
    }
  ]

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="material-symbols-outlined text-green-600">check_circle</span>
      ) : (
        <span className="material-symbols-outlined text-gray-400">remove_circle</span>
      )
    }
    return <span className="font-mono text-sm">{value}</span>
  }

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-mono text-4xl font-bold text-black mb-4">
          Feature Comparison
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
          Compare all features across our plans to find the perfect fit for your needs.
        </p>
      </div>

      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-3 border-black bg-gray-50">
                <th className="text-left font-mono text-sm font-bold py-4 px-6">Features</th>
                <th className="text-center font-mono text-sm font-bold py-4 px-6">Free</th>
                <th className="text-center font-mono text-sm font-bold py-4 px-6 bg-primary/10">Pro</th>
                <th className="text-center font-mono text-sm font-bold py-4 px-6 bg-black text-white">Pro+</th>
              </tr>
            </thead>
            <tbody>
              {features.map((category, categoryIndex) => (
                <>
                  <tr key={`category-${categoryIndex}`} className="bg-gray-100">
                    <td colSpan={4} className="font-mono text-sm font-bold py-3 px-6 uppercase tracking-wide">
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item, itemIndex) => (
                    <tr key={`item-${categoryIndex}-${itemIndex}`} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="font-sans text-sm py-4 px-6">{item.feature}</td>
                      <td className="text-center py-4 px-6">{renderFeatureValue(item.free)}</td>
                      <td className="text-center py-4 px-6 bg-primary/5">{renderFeatureValue(item.pro)}</td>
                      <td className="text-center py-4 px-6 bg-gray-900 text-white">{renderFeatureValue(item.proPlus)}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Value Calculator */}
      <div className="mt-12 bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <div className="text-center mb-8">
          <h3 className="font-mono text-2xl font-bold text-primary mb-4">
            Calculate Your Savings
          </h3>
          <p className="font-sans text-gray-300">
            See how much time and money FoundersPrime can save you compared to researching deals manually.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-black size-16 flex items-center justify-center font-mono text-2xl font-bold rounded-sm mx-auto mb-4">
              40h
            </div>
            <h4 className="font-mono text-lg font-bold text-primary mb-2">Time Saved</h4>
            <p className="font-sans text-sm text-gray-300">
              Average hours saved per month on deal research and validation
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary text-black size-16 flex items-center justify-center font-mono text-2xl font-bold rounded-sm mx-auto mb-4">
              $50K
            </div>
            <h4 className="font-mono text-lg font-bold text-primary mb-2">Potential Savings</h4>
            <p className="font-sans text-sm text-gray-300">
              Average value of deals and credits accessed through our platform
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary text-black size-16 flex items-center justify-center font-mono text-2xl font-bold rounded-sm mx-auto mb-4">
              10x
            </div>
            <h4 className="font-mono text-lg font-bold text-primary mb-2">ROI</h4>
            <p className="font-sans text-sm text-gray-300">
              Return on investment for Pro users within the first 3 months
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}