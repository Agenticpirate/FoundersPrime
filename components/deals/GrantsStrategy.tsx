export default function GrantsStrategy() {
  return (
    <div className="bg-white border-2 border-black p-3 md:p-5 mb-3 md:mb-5 shadow-[2px_2px_0px_#111]">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-7 h-7 bg-accent-yellow border border-black rounded-sm flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-sm text-black">lightbulb</span>
        </span>
        <div>
          <h2 className="font-mono text-sm md:text-lg font-bold text-black">Grant Landscape</h2>
          <p className="text-gray-500 font-mono text-[9px] md:text-xs">Non-dilutive capital as primary funding</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 md:gap-3 mb-3">
        {[
          { icon: 'policy', title: 'Industrial Policy', desc: 'Governments de-risking deep tech — AI, biotech, clean energy' },
          { icon: 'analytics', title: 'Metric-Driven', desc: 'Demonstrate commercialization pathways and societal impact' },
          { icon: 'emoji_events', title: 'Megaprizes', desc: 'XPRIZE alone exceeds $236M in active competitions' },
        ].map((item) => (
          <div key={item.title} className="bg-gray-50 border border-black p-2 md:p-3 rounded-sm">
            <span className="material-symbols-outlined text-xs md:text-sm text-black mb-1 block">{item.icon}</span>
            <h3 className="font-bold text-[9px] md:text-xs text-black mb-0.5">{item.title}</h3>
            <p className="text-[8px] md:text-[11px] text-gray-600 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-2">
        <h3 className="font-bold text-[10px] md:text-sm mb-1.5 text-black font-mono uppercase">Key Trends</h3>
        <div className="grid grid-cols-2 gap-1.5 md:gap-3">
          {[
            { title: 'Blended Finance', desc: 'EIC offers €2.5M grant + optional equity' },
            { title: 'Go-to-Market Focus', desc: 'Shift from pure R&D to commercialization' },
            { title: 'Hardware Renaissance', desc: 'Hard-tech prototyping grants growing' },
            { title: 'Relocation Incentives', desc: 'Gulf states offering $1M+ to relocate' },
          ].map((t) => (
            <div key={t.title} className="flex gap-1.5">
              <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-[9px] md:text-xs text-black">{t.title}: </span>
                <span className="text-[9px] md:text-[11px] text-gray-600">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
