export default function AdCreditsStrategy() {
  const adSpendStrategy = [
    { platform: 'Google Ads', allocation: '40%', reason: 'High-intent search traffic' },
    { platform: 'Meta Ads', allocation: '30%', reason: 'Broad audience targeting' },
    { platform: 'LinkedIn Ads', allocation: '20%', reason: 'B2B lead generation' },
    { platform: 'Other Platforms', allocation: '10%', reason: 'Testing & experimentation' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 md:p-8 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">campaign</span>
          </div>

          <h2 className="font-mono text-xl md:text-3xl font-bold text-black mb-8 flex items-center gap-3">
            <span className="bg-black text-white size-10 flex items-center justify-center text-xl rounded-sm">1</span>
            Ad Credit Allocation Strategy
          </h2>

          <div className="prose prose-neutral max-w-none">
            <h3 className="font-mono text-xl font-bold uppercase mb-4 text-primary bg-black inline-block px-2 text-white">
              Smart Budget Distribution
            </h3>
            <p className="font-sans text-gray-700 mb-6 text-lg">
              Don't spread your ad credits too thin. Focus on 2-3 platforms where your target customers spend time. Start with high-intent channels like Google Ads, then expand to broader awareness platforms like Meta and LinkedIn.
            </p>

            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-6 rounded-sm mb-8">
              <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-4">Recommended Allocation</p>
              <div className="space-y-4">
                {adSpendStrategy.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-gray-300 pb-3 last:border-b-0">
                    <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                      {item.allocation}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono font-bold text-sm">{item.platform}</span>
                      </div>
                      <p className="font-sans text-sm text-gray-600">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-mono text-xl font-bold uppercase mb-4 text-primary bg-black inline-block px-2 text-white">
              Credit Expiration Management
            </h3>
            <p className="font-sans text-gray-700 text-lg">
              Most ad credits expire within 30-90 days of activation. Plan your campaigns in advance and have creative assets ready. Don't activate credits until you're prepared to spend them effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Pro Tip Card */}
        <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 bg-white border-2 border-black rounded-full p-2 size-20 flex items-end justify-center">
            <span className="material-symbols-outlined text-4xl mb-1">target</span>
          </div>
          <h3 className="font-mono text-2xl font-bold mb-4 uppercase">Pro Tip</h3>
          <p className="font-mono text-sm leading-relaxed font-medium">
            Set up conversion tracking BEFORE activating credits. Without proper attribution, you'll waste money on campaigns that don't convert. Most platforms require 7-14 days of data to optimize effectively.
          </p>
        </div>

        {/* Platform Types Card */}
        <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
          <h3 className="font-mono text-xl font-bold mb-3 text-primary">Platform Categories</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Search Ads</span>
              <span className="font-bold">8 platforms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Social Media</span>
              <span className="font-bold">12 platforms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Display/Video</span>
              <span className="font-bold">9 platforms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">B2B Focused</span>
              <span className="font-bold">6 platforms</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 font-mono">
              💡 Search ads typically have the highest conversion rates
            </p>
          </div>
        </div>

        {/* Credit Terms Card */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
          <h3 className="font-mono text-xl font-bold mb-3">Typical Terms</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Credit Range</span>
              <span className="font-bold">$500-$20K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expiration</span>
              <span className="font-bold">30-90 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Min Spend</span>
              <span className="font-bold">Usually $25-100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}