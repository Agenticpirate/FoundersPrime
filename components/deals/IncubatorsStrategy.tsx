export default function IncubatorsStrategy() {
  return (
    <div className="bg-white border-2 border-black p-3 md:p-5 mb-3 md:mb-5 shadow-[2px_2px_0px_#111]">
      <h2 className="font-mono text-sm md:text-lg font-bold mb-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-primary border border-black" />
        Incubator vs Accelerator
      </h2>

      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2">
        <div className="border border-black p-2 md:p-4 bg-gray-50">
          <h3 className="font-mono font-bold text-[10px] md:text-sm mb-2 uppercase border-b border-black/10 pb-1.5">Incubators</h3>
          <ul className="space-y-1.5 text-[10px] md:text-xs">
            {['6-24 months support', 'Pre-idea to MVP', 'Lab space & co-working', 'Often equity-free', 'Co-founding opps'].map((t, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-black p-2 md:p-4 bg-gray-50">
          <h3 className="font-mono font-bold text-[10px] md:text-sm mb-2 uppercase border-b border-black/10 pb-1.5">Accelerators</h3>
          <ul className="space-y-1.5 text-[10px] md:text-xs">
            {['3-6 month cohorts', 'MVP to traction', 'Intensive mentorship', '$50K-$500K for equity', 'Demo Day pitch'].map((t, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-2 bg-accent-yellow border border-black">
        <p className="text-[10px] md:text-xs font-mono">
          <span className="font-bold">Tip:</span> Pre-idea → incubator. Have MVP → accelerator.
        </p>
      </div>
    </div>
  )
}
