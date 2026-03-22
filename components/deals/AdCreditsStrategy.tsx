export default function AdCreditsStrategy() {
  const adSpendStrategy = [
    { platform: 'Google Ads', allocation: '40%', reason: 'High-intent search traffic' },
    { platform: 'Meta Ads', allocation: '30%', reason: 'Broad audience targeting' },
    { platform: 'LinkedIn Ads', allocation: '20%', reason: 'B2B lead generation' },
    { platform: 'Other Platforms', allocation: '10%', reason: 'Testing & experimentation' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 md:mb-6">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6 relative overflow-hidden">
          {/* Decorative bg */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">campaign</span>
          </div>

          <h2 className="font-mono text-lg md:text-2xl font-bold text-black mb-3 flex items-center gap-2">
            <span className="bg-black text-white size-7 md:size-8 flex items-center justify-center text-sm rounded-sm">1</span>
            Ad Credit Allocation Strategy
          </h2>

          <div className="prose prose-neutral max-w-none">
            <h3 className="font-mono text-sm font-bold uppercase mb-2 text-primary bg-black inline-block px-2 text-white">
              Smart Budget Distribution
            </h3>
            <p className="font-sans text-gray-700 mb-3 text-sm">
              Don't spread your ad credits too thin. Focus on 2–3 platforms where your target customers spend time. Start with high-intent channels like Google Ads, then expand to broader awareness platforms.
            </p>

            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-3 rounded-sm mb-3">
              <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">Recommended Allocation</p>
              <div className="space-y-2">
                {adSpendStrategy.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 border-b border-gray-300 pb-2 last:border-b-0">
                    <div className="bg-primary text-black size-7 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0">
                      {item.allocation}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-xs">{item.platform}</span>
                      </div>
                      <p className="font-sans text-xs text-gray-600">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-mono text-sm font-bold uppercase mb-2 text-primary bg-black inline-block px-2 text-white">
              Credit Expiration Management
            </h3>
            <p className="font-sans text-gray-700 text-sm">
              Most ad credits expire within 30–90 days of activation. Plan your campaigns in advance and have creative assets ready before activating.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-3">
        {/* Pro Tip Card — compact */}
        <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-1 size-12 flex items-end justify-center">
            <span className="material-symbols-outlined text-xl mb-0.5">target</span>
          </div>
          <h3 className="font-mono text-base font-bold mb-2 uppercase">Pro Tip</h3>
          <p className="font-mono text-xs leading-relaxed font-medium">
            Set up conversion tracking BEFORE activating credits. Without proper attribution, you'll waste money. Most platforms require 7–14 days of data to optimize effectively.
          </p>
        </div>

        {/* Platform Types — compact, no deal counts */}
        <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold mb-2 text-primary uppercase">Platform Categories</h3>
          <div className="space-y-1.5 text-xs">
            {['Search Ads', 'Social Media', 'Display / Video', 'B2B Focused'].map(cat => (
              <div key={cat} className="flex items-center gap-2 py-1 border-b border-gray-800 last:border-b-0">
                <span className="material-symbols-outlined text-xs text-primary">arrow_right</span>
                <span className="text-gray-200">{cat}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-mono mt-3 pt-2 border-t border-gray-700">
            💡 Search ads typically have the highest conversion rates
          </p>
        </div>

        {/* Typical Terms — compact */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold mb-2">Typical Terms</h3>
          <div className="space-y-1.5 text-xs">
            {[['Credit Range', '$500–$20K'], ['Expiration', '30–90 days'], ['Min Spend', '$25–$100']].map(([label, val]) => (
              <div key={label} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600">{label}</span>
                <span className="font-bold">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}