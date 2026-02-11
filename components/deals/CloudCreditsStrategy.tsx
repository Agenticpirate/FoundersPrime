export default function CloudCreditsStrategy() {
  const stackingExample = [
    { name: 'AWS Activate', value: '$100,000' },
    { name: 'Google Cloud', value: '$200,000' },
    { name: 'Azure Founders', value: '$150,000' },
    { name: 'DigitalOcean', value: '$10,000' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 md:p-8 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">strategy</span>
          </div>

          <h2 className="font-mono text-3xl font-bold text-black mb-8 flex items-center gap-3">
            <span className="bg-black text-white size-10 flex items-center justify-center text-xl rounded-sm">1</span>
            How to Maximize Credits
          </h2>

          <div className="prose prose-neutral max-w-none">
            <h3 className="font-mono text-xl font-bold uppercase mb-4 text-primary bg-black inline-block px-2 text-white">
              The Stacking Strategy
            </h3>
            <p className="font-sans text-gray-700 mb-6 text-lg">
              Most cloud providers do not require exclusivity. You can (and should) apply for credits across multiple platforms to diversify your infrastructure and extend your runway.
            </p>

            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-6 rounded-sm mb-8">
              <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-3">Example Stack</p>
              <ul className="space-y-3 font-mono text-sm md:text-base">
                {stackingExample.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span>{item.name}</span>
                    <span className="font-bold">{item.value}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-2 text-primary font-bold text-lg">
                  <span>TOTAL POTENTIAL</span>
                  <span>$460,000+</span>
                </li>
              </ul>
            </div>

            <h3 className="font-mono text-xl font-bold uppercase mb-4 text-primary bg-black inline-block px-2 text-white">
              When to Apply
            </h3>
            <p className="font-sans text-gray-700 text-lg">
              Timing is critical. Most credits expire after 12 or 24 months. Do not apply until you are ready to deploy infrastructure, or you will burn validity time while developing locally.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Pro Tip Card */}
        <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 bg-white border-2 border-black rounded-full p-2 size-20 flex items-end justify-center">
            <span className="material-symbols-outlined text-4xl mb-1">lightbulb</span>
          </div>
          <h3 className="font-mono text-2xl font-bold mb-4 uppercase">Pro Tip</h3>
          <p className="font-mono text-sm leading-relaxed font-medium">
            Check if your VC firm, Accelerator (Y Combinator, Techstars), or Incubator has a specific partnership code. These often bypass the standard application queue and offer higher tier credits (e.g., jumping straight to $100k tier).
          </p>
        </div>

        {/* Newsletter / CTA Card */}
        <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
          <h3 className="font-mono text-xl font-bold mb-3 text-primary">Don't Miss New Deals</h3>
          <p className="font-sans text-gray-300 mb-6 text-sm">
            We add ~3 new credit programs every week. Get the weekly digest.
          </p>
          <div className="flex flex-col gap-3">
            <input
              className="w-full bg-gray-800 border-2 border-gray-700 text-white px-4 py-2 font-mono text-sm focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm"
              placeholder="founder@startup.com"
              type="email"
            />
            <button className="w-full py-2 text-sm uppercase bg-primary hover:bg-white border-3 border-white text-black font-mono font-bold rounded-sm shadow-[4px_4px_0px_0px_#888] hover:shadow-[2px_2px_0px_0px_#888] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}