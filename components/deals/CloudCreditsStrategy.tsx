export default function CloudCreditsStrategy() {
  const stack = [
    { name: 'AWS Activate', value: '$100K' },
    { name: 'Google Cloud', value: '$200K' },
    { name: 'Azure Founders', value: '$150K' },
    { name: 'DigitalOcean', value: '$10K' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-4 mb-3 md:mb-5">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-3 md:p-5">
          <h2 className="font-mono text-sm md:text-lg font-bold text-black mb-2 flex items-center gap-2">
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs rounded-sm">1</span>
            Maximize Credits
          </h2>
          <p className="text-xs text-gray-600 mb-2">
            Most providers don't require exclusivity. Apply across multiple platforms to extend your runway.
          </p>
          <div className="bg-gray-50 border border-dashed border-gray-300 p-2 md:p-3 rounded-sm">
            <p className="font-mono text-[9px] font-bold text-gray-400 uppercase mb-1.5">Example Stack</p>
            <div className="space-y-1 font-mono text-[11px] md:text-xs">
              {stack.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-200 pb-1 last:border-0">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 text-primary font-bold text-xs">
                <span>TOTAL</span>
                <span>$460K+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="bg-accent-yellow border-2 border-black shadow-[2px_2px_0px_#111] p-3">
          <h3 className="font-mono text-xs font-bold mb-1.5 uppercase">Pro Tip</h3>
          <p className="font-mono text-[11px] leading-relaxed">
            Check if your VC or accelerator (YC, Techstars) has a partnership code — these often unlock higher credit tiers.
          </p>
        </div>
      </div>
    </div>
  )
}
