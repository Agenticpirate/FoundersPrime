interface SingleStartupSidebarProps {
  startup: {
    name: string
    category: string
    revenueDisplay: string
    profitDisplay?: string
    askingPriceDisplay: string
    country?: string
    founded?: string
    teamSize?: string
    source: string
    sourceUrl: string
    featured: boolean
    financing?: string
    [key: string]: any
  }
}

export default function SingleStartupSidebar({ startup }: SingleStartupSidebarProps) {
  const quickFacts = [
    { label: 'Category', value: startup.category, icon: 'category' },
    { label: 'Country', value: startup.country || 'N/A', icon: 'location_on' },
    { label: 'Founded', value: startup.founded || 'N/A', icon: 'calendar_today' },
    { label: 'Team Size', value: startup.teamSize || 'N/A', icon: 'group' },
    { label: 'Revenue', value: startup.revenueDisplay, icon: 'attach_money' },
    { label: 'Profit', value: startup.profitDisplay || 'N/A', icon: 'trending_up' },
    { label: 'Asking Price', value: startup.askingPriceDisplay, icon: 'monetization_on' }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Facts */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 sticky top-8">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">fact_check</span>
          Quick Facts
        </h3>
        <div className="space-y-4">
          {quickFacts.map((fact, index) => (
            <div key={index} className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-gray-500">{fact.icon}</span>
                <span className="font-mono text-sm">{fact.label}</span>
              </div>
              <span className="font-mono text-sm font-bold text-right">{fact.value}</span>
            </div>
          ))}
        </div>

        {/* Featured Badge */}
        {startup.featured && (
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-400 rounded-sm p-3">
              <span className="material-symbols-outlined text-amber-600">star</span>
              <span className="font-mono text-sm font-bold text-amber-900">Featured Startup</span>
            </div>
          </div>
        )}

        {/* Financing Info */}
        {startup.financing && startup.financing !== 'Unknown' && (
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <h4 className="font-mono text-sm font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">account_balance</span>
              Financing
            </h4>
            <p className="font-sans text-sm text-gray-700">{startup.financing}</p>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <a
            href={startup.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            View on {startup.source}
          </a>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-2">
          <button className="w-full py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm rounded-sm transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">bookmark</span>
            Save to Watchlist
          </button>
          <button className="w-full py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm rounded-sm transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">share</span>
            Share
          </button>
        </div>
      </div>

      {/* Data Source */}
      <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
        <h4 className="font-mono text-sm font-bold mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-green-600">verified</span>
          Data Verification
        </h4>
        <p className="font-sans text-xs text-gray-600 mb-3">
          This startup listing has been verified and sourced from {startup.source}, a trusted marketplace for buying and selling online businesses.
        </p>
        <div className="bg-blue-50 border border-blue-300 rounded-sm p-3 mb-2">
          <p className="font-sans text-xs text-blue-800 font-semibold mb-1">
            🔒 Protected Information
          </p>
          <p className="font-sans text-xs text-blue-700">
            Website URL, founder details, and contact info are shared only with verified buyers on the marketplace.
          </p>
        </div>
        <p className="font-sans text-xs text-gray-500">
          Last updated: January 2026
        </p>
      </div>
    </div>
  )
}
