export default function AcceleratorsStrategy() {
  const trends = [
    { tip: 'Flight to Quality', desc: 'Programs with tangible customer pipelines over just mentorship' },
    { tip: 'Day Zero Residency', desc: 'Resident models (Antler, EF) where teams form post-acceptance' },
    { tip: 'Vertical Specialization', desc: 'Deep domain experts in AI, Climate, and Defense' },
    { tip: 'Sovereign Capital', desc: 'Saudi Vision 2030 driving new program launches' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-4 mb-3 md:mb-5">
      <div className="lg:col-span-8">
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-3 md:p-5">
          <h2 className="font-mono text-sm md:text-lg font-bold text-black mb-2 flex items-center gap-2">
            <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs rounded-sm">1</span>
            State of Acceleration
          </h2>
          <p className="text-xs text-gray-600 mb-2">
            The ecosystem has bifurcated into Global Asset Managers and Vertical Specialists. SEA and MENA show the highest growth in new programs.
          </p>
          <div className="bg-gray-50 border border-dashed border-gray-300 p-2 md:p-3 rounded-sm">
            <p className="font-mono text-[9px] font-bold text-gray-400 uppercase mb-1.5">Key Trends</p>
            <div className="space-y-1.5">
              {trends.map((item, i) => (
                <div key={i} className="flex items-start gap-2 border-b border-gray-200 pb-1.5 last:border-0">
                  <span className="bg-primary text-black w-5 h-5 flex items-center justify-center text-[9px] font-bold rounded-sm flex-shrink-0">{i + 1}</span>
                  <div>
                    <span className="font-mono font-bold text-[10px] md:text-xs">{item.tip}: </span>
                    <span className="text-[10px] md:text-[11px] text-gray-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-2">
        <div className="bg-accent-yellow border-2 border-black shadow-[2px_2px_0px_#111] p-3">
          <h3 className="font-mono text-xs font-bold mb-1.5 uppercase">Valuation Insight</h3>
          <p className="font-mono text-[11px] leading-relaxed">
            "Elite Dev Tools" accelerators (like HF0) command up to 10x the valuation of standard pre-seed startups.
          </p>
        </div>
        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_#111] p-3">
          <h3 className="font-mono text-xs font-bold mb-1.5 text-primary uppercase">Deal Terms</h3>
          <div className="space-y-1.5 text-[11px]">
            {[
              { name: 'Y Combinator', amount: '$500K', equity: '7% + MFN' },
              { name: 'Techstars', amount: '$120K', equity: '6%' },
              { name: 'HF0', amount: '$1M', equity: '5%' },
            ].map(d => (
              <div key={d.name} className="flex justify-between">
                <span className="text-gray-400">{d.name}</span>
                <span className="font-bold">{d.amount} <span className="text-gray-500 text-[9px]">{d.equity}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
