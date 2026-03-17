export default function GrantsStrategy() {
  return (
    <div className="neo-card bg-white border-2 border-black p-4 md:p-8 mb-4 md:mb-6 md:mb-4 md:mb-6">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="p-2 md:p-3 bg-accent-yellow border-2 border-black rounded-sm flex-shrink-0">
          <span className="material-symbols-outlined text-xl md:text-3xl text-black">lightbulb</span>
        </div>
        <div>
          <h2 className="text-lg md:text-3xl font-black mb-1 md:mb-2 text-black">Strategic Insight: 2026 Grant Landscape</h2>
          <p className="text-gray-700 font-mono text-xs md:text-sm">Non-dilutive capital has evolved from supplementary to primary funding pillar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-gray-50 border-2 border-black p-3 md:p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-black text-base">policy</span>
            <h3 className="font-bold text-sm md:text-lg text-black">Industrial Policy Era</h3>
          </div>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            Governments acting as "investors of first resort," de-risking deep technology ventures to crowd in private VC. Focus on technological sovereignty in AI, biotech, clean energy.
          </p>
        </div>

        <div className="bg-gray-50 border-2 border-black p-3 md:p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-black text-base">analytics</span>
            <h3 className="font-bold text-sm md:text-lg text-black">Metric-Oriented</h3>
          </div>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            2026 grants are highly competitive, requiring startups to demonstrate not just innovative capacity but tangible pathways to commercialization and societal impact.
          </p>
        </div>

        <div className="bg-gray-50 border-2 border-black p-3 md:p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-black text-base">emoji_events</span>
            <h3 className="font-bold text-sm md:text-lg text-black">Megaprizes</h3>
          </div>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            Trend toward "megaprizes" exceeding $10M designed to mobilize entire industries. XPRIZE portfolio alone exceeds $236M in active competitions.
          </p>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-4 md:pt-6">
        <h3 className="font-bold text-base md:text-xl mb-3 flex items-center gap-2 text-black">
          <span className="material-symbols-outlined text-black text-base">tips_and_updates</span>
          Key Trends for Founders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-black text-xl">check_circle</span>
            <div>
              <div className="font-bold mb-1 text-black">Blended Finance Models</div>
              <div className="text-sm text-gray-700">EIC Accelerator offers €2.5M grant + optional equity, allowing founders to take non-dilutive portion only</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-black text-xl">check_circle</span>
            <div>
              <div className="font-bold mb-1 text-black">Commercialization Focus</div>
              <div className="text-sm text-gray-700">Shift from pure R&D to "go-to-market" funding (MassVentures START, Ignite Ideas Fund)</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-black text-xl">check_circle</span>
            <div>
              <div className="font-bold mb-1 text-black">Hardware Renaissance</div>
              <div className="text-sm text-gray-700">Emerging markets prioritizing hard-tech prototypes (NIDHI-PRAYAS, Lexus Design Award)</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-black text-xl">check_circle</span>
            <div>
              <div className="font-bold mb-1 text-black">Relocation Incentives</div>
              <div className="text-sm text-gray-700">Gulf states offering $1M+ packages to move HQ (NTDP Relocate, Startup Qatar)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}