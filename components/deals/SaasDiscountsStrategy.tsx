export default function SaasDiscountsStrategy() {
  const stackingExample = [
    { name: 'Notion for Startups', value: '$240/year saved' },
    { name: 'Figma Professional', value: '$1,440/year saved' },
    { name: 'Slack Pro Plan', value: '$765/year saved' },
    { name: 'HubSpot Starter+', value: '$25,000 saved' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6 md:mb-10">
      <div className="lg:col-span-8">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 md:p-10 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">build</span>
          </div>
          
          <h2 className="font-mono text-xl md:text-3xl font-bold text-black mb-4 flex items-center gap-3">
            <span className="bg-black text-white size-10 flex items-center justify-center text-xl rounded-sm">1</span>
            How to Stack SaaS Discounts
          </h2>
          
          <div className="prose prose-neutral max-w-none">
            <h3 className="font-mono text-xl font-bold uppercase mb-4 text-primary bg-black inline-block px-2 text-white">
              The Tool Stack Strategy
            </h3>
            <p className="font-sans text-gray-700 mb-6 text-lg">
              Unlike cloud credits, SaaS discounts can be combined across different tool categories. Build your complete startup tech stack while saving thousands on essential software.
            </p>
            
            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-6 rounded-sm mb-4 md:mb-6">
              <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-3">Example Annual Savings</p>
              <ul className="space-y-3 font-mono text-sm md:text-base">
                {stackingExample.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span>{item.name}</span>
                    <span className="font-bold">{item.value}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-2 text-primary font-bold text-lg">
                  <span>TOTAL ANNUAL SAVINGS</span>
                  <span>$27,445+</span>
                </li>
              </ul>
            </div>
            
            <h3 className="font-mono text-xl font-bold uppercase mb-4 text-primary bg-black inline-block px-2 text-white">
              Application Strategy
            </h3>
            <p className="font-sans text-gray-700 text-lg">
              Apply early in your startup journey. Most programs require less than $1M in funding or less than 50 employees. Some deals are retroactive, but it's easier to get approved before you scale.
            </p>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-4 space-y-6">
        {/* Pro Tip Card */}
        <div className="bg-accent-yellow border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 bg-white border-2 border-black rounded-full p-2 size-20 flex items-end justify-center">
            <span className="material-symbols-outlined text-4xl mb-1">tips_and_updates</span>
          </div>
          <h3 className="font-mono text-2xl font-bold mb-4 uppercase">Pro Tip</h3>
          <p className="font-mono text-sm leading-relaxed font-medium">
            Many SaaS companies offer "startup programs" that aren't publicly advertised. If you don't see your needed tool listed, reach out directly to their sales team mentioning you're an early-stage startup.
          </p>
        </div>
        
        {/* Categories Card */}
        <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h3 className="font-mono text-xl font-bold mb-3 text-primary">Popular Categories</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Productivity</span>
              <span className="font-bold">45 deals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Design & Creative</span>
              <span className="font-bold">32 deals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Development</span>
              <span className="font-bold">28 deals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Marketing & Sales</span>
              <span className="font-bold">41 deals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Communication</span>
              <span className="font-bold">19 deals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}