export default function CloudCreditsStrategy() {
  const stackingExample = [
    { name: 'AWS Activate', value: '$100,000' },
    { name: 'Google Cloud', value: '$200,000' },
    { name: 'Azure Founders', value: '$150,000' },
    { name: 'DigitalOcean', value: '$10,000' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 md:mb-6">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6 relative overflow-hidden">
          {/* Decorative bg */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">strategy</span>
          </div>

          <h2 className="font-mono text-lg md:text-2xl font-bold text-black mb-3 flex items-center gap-2">
            <span className="bg-black text-white size-7 md:size-8 flex items-center justify-center text-sm rounded-sm">1</span>
            How to Maximize Credits
          </h2>

          <div className="prose prose-neutral max-w-none">
            <h3 className="font-mono text-sm font-bold uppercase mb-2 text-primary bg-black inline-block px-2 text-white">
              The Stacking Strategy
            </h3>
            <p className="font-sans text-gray-700 mb-3 text-sm">
              Most cloud providers do not require exclusivity. You can (and should) apply for credits across multiple platforms to diversify your infrastructure and extend your runway.
            </p>

            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-3 md:p-4 rounded-sm mb-3">
              <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">Example Stack</p>
              <ul className="space-y-2 font-mono text-xs md:text-sm">
                {stackingExample.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-1.5 last:border-b-0">
                    <span>{item.name}</span>
                    <span className="font-bold">{item.value}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-1.5 text-primary font-bold text-sm">
                  <span>TOTAL POTENTIAL</span>
                  <span>$460,000+</span>
                </li>
              </ul>
            </div>

            <h3 className="font-mono text-sm font-bold uppercase mb-2 text-primary bg-black inline-block px-2 text-white">
              When to Apply
            </h3>
            <p className="font-sans text-gray-700 text-sm">
              Timing is critical. Most credits expire after 12–24 months. Do not apply until you are ready to deploy infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        {/* Pro Tip Card — compact */}
        <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-1 size-12 flex items-end justify-center">
            <span className="material-symbols-outlined text-xl mb-0.5">lightbulb</span>
          </div>
          <h3 className="font-mono text-base font-bold mb-2 uppercase">Pro Tip</h3>
          <p className="font-mono text-xs leading-relaxed font-medium">
            Check if your VC firm or Accelerator (YC, Techstars) has a partnership code. These often bypass the standard queue and offer higher tier credits (e.g., jumping straight to $100k tier).
          </p>
        </div>
      </div>
    </div>
  )
}