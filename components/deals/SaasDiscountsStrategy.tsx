export default function SaasDiscountsStrategy() {
  const stackingExample = [
    { name: 'Notion for Startups', value: '$240/yr' },
    { name: 'Figma Professional', value: '$1,440/yr' },
    { name: 'Slack Pro Plan', value: '$765/yr' },
    { name: 'HubSpot Starter+', value: '$25,000' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 md:mb-6">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6 relative overflow-hidden">
          {/* Decorative bg */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">build</span>
          </div>

          <h2 className="font-mono text-lg md:text-2xl font-bold text-black mb-3 flex items-center gap-2">
            <span className="bg-black text-white size-7 md:size-8 flex items-center justify-center text-sm rounded-sm">1</span>
            How to Stack SaaS Discounts
          </h2>

          <div className="prose prose-neutral max-w-none">
            <h3 className="font-mono text-sm font-bold uppercase mb-2 text-primary bg-black inline-block px-2 text-white">
              The Tool Stack Strategy
            </h3>
            <p className="font-sans text-gray-700 mb-3 text-sm">
              Unlike cloud credits, SaaS discounts can be combined across different tool categories. Build your complete startup tech stack while saving thousands.
            </p>

            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-3 md:p-4 rounded-sm mb-3">
              <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">Example Annual Savings</p>
              <ul className="space-y-2 font-mono text-xs md:text-sm">
                {stackingExample.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-1.5 last:border-b-0">
                    <span>{item.name}</span>
                    <span className="font-bold">{item.value}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-1.5 text-primary font-bold text-sm">
                  <span>TOTAL ANNUAL SAVINGS</span>
                  <span>$27,445+</span>
                </li>
              </ul>
            </div>

            <h3 className="font-mono text-sm font-bold uppercase mb-2 text-primary bg-black inline-block px-2 text-white">
              Application Strategy
            </h3>
            <p className="font-sans text-gray-700 text-sm">
              Apply early in your startup journey. Most programs require less than $1M in funding or under 50 employees.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-3">
        {/* Pro Tip Card — compact */}
        <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-1 size-12 flex items-end justify-center">
            <span className="material-symbols-outlined text-xl mb-0.5">tips_and_updates</span>
          </div>
          <h3 className="font-mono text-base font-bold mb-2 uppercase">Pro Tip</h3>
          <p className="font-mono text-xs leading-relaxed font-medium">
            Many SaaS companies offer startup programs that aren't publicly advertised. Reach out to their sales team mentioning you're early-stage.
          </p>
        </div>

        {/* Popular Categories — compact, no deal counts */}
        <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold mb-2 text-primary uppercase">Popular Categories</h3>
          <div className="space-y-1.5 text-xs">
            {['Productivity', 'Design & Creative', 'Development', 'Marketing & Sales', 'Communication'].map(cat => (
              <div key={cat} className="flex items-center gap-2 py-1 border-b border-gray-800 last:border-b-0">
                <span className="material-symbols-outlined text-xs text-primary">arrow_right</span>
                <span className="text-gray-200">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}