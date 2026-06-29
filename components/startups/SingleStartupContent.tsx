interface SingleStartupContentProps {
  startup: {
    id: string
    name: string
    category: string
    description: string
    shortDescription: string
    revenue: number
    revenueDisplay: string
    profit?: number
    profitDisplay?: string
    askingPrice: number
    askingPriceDisplay: string
    profitMultiple?: string
    revenueMultiple?: string
    country?: string
    founded?: string
    teamSize?: string
    businessModel?: string
    techStack?: string
    competitors?: string[]
    growthOpportunities?: string[]
    keyAssets?: string[]
    financing?: string
    reasonForSelling?: string
    source: string
    sourceUrl: string
    featured: boolean
    logoUrl?: string
    [key: string]: any
  }
}

export default function SingleStartupContent({ startup }: SingleStartupContentProps) {
  return (
    <div className="space-y-8">
      {/* Company Overview */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">info</span>
          Company Overview
        </h2>
        <p className="font-sans text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {startup.description}
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-3 border-blue-600 rounded-sm p-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-600 text-2xl">lock</span>
          <div>
            <h3 className="font-mono text-lg font-bold text-blue-900 mb-2">Privacy & Security Notice</h3>
            <p className="font-sans text-sm text-blue-800 leading-relaxed">
              For privacy and security reasons, sensitive information such as the <strong>actual website URL</strong>, <strong>founder/owner details</strong>, and <strong>contact information</strong> are only shared with verified buyers on {startup.source}. Click &quot;View Full Listing&quot; below to access complete details and connect with the seller.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">analytics</span>
          Financial Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
            <p className="font-mono text-xs text-gray-500 uppercase mb-1">Annual Revenue</p>
            <p className="font-mono text-2xl font-bold text-black">{startup.revenueDisplay}</p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
            <p className="font-mono text-xs text-gray-500 uppercase mb-1">Annual Profit</p>
            <p className="font-mono text-2xl font-bold text-black">{startup.profitDisplay || 'N/A'}</p>
          </div>
          <div className="bg-primary/20 border-2 border-black rounded-sm p-4">
            <p className="font-mono text-xs text-black uppercase mb-1">Asking Price</p>
            <p className="font-mono text-2xl font-bold text-black">{startup.askingPriceDisplay}</p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
            <p className="font-mono text-xs text-gray-500 uppercase mb-1">Profit Multiple</p>
            <p className="font-mono text-lg font-bold text-black">{startup.profitMultiple || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
            <p className="font-mono text-xs text-gray-500 uppercase mb-1">Revenue Multiple</p>
            <p className="font-mono text-lg font-bold text-black">{startup.revenueMultiple || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
            <p className="font-mono text-xs text-gray-500 uppercase mb-1">Team Size</p>
            <p className="font-mono text-lg font-bold text-black">{startup.teamSize}</p>
          </div>
        </div>
      </div>

      {/* Business Model */}
      {startup.businessModel && startup.businessModel !== 'Unknown' && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">business_center</span>
            Business Model
          </h2>
          <p className="font-sans text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {startup.businessModel}
          </p>
        </div>
      )}

      {/* Growth Opportunities */}
      {startup.growthOpportunities && startup.growthOpportunities.length > 0 && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">trending_up</span>
            Growth Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {startup.growthOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-50 border border-gray-300 rounded-sm p-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                <span className="font-sans text-gray-700">{opportunity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Assets */}
      {startup.keyAssets && startup.keyAssets.length > 0 && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">inventory_2</span>
            Key Assets Included
          </h2>
          <div className="flex flex-wrap gap-2">
            {startup.keyAssets.map((asset, index) => (
              <span key={index} className="bg-black text-white px-3 py-2 font-mono text-sm rounded-sm border-2 border-black">
                {asset}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {startup.techStack && startup.techStack !== '' && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">code</span>
            Tech Stack
          </h2>
          <p className="font-sans text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {startup.techStack}
          </p>
        </div>
      )}

      {/* Competitors */}
      {startup.competitors && startup.competitors.length > 0 && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">groups</span>
            Competitors
          </h2>
          <div className="flex flex-wrap gap-2">
            {startup.competitors.map((competitor, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 font-mono text-sm rounded-sm border border-gray-300">
                {competitor}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reason for Selling */}
      {startup.reasonForSelling && startup.reasonForSelling !== '' && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">help</span>
            Reason for Selling
          </h2>
          <p className="font-sans text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {startup.reasonForSelling}
          </p>
        </div>
      )}

      {/* View on Source */}
      <div className="bg-primary border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-mono text-xl font-bold mb-2">Interested in this startup?</h3>
            <p className="font-sans text-gray-700 mb-4">View the complete listing on {startup.source} to access:</p>
            <ul className="space-y-2 font-sans text-gray-700">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-black mt-0.5">check_circle</span>
                <span>Actual startup website URL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-black mt-0.5">check_circle</span>
                <span>Founder/owner contact information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-black mt-0.5">check_circle</span>
                <span>Detailed financial documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-black mt-0.5">check_circle</span>
                <span>Direct messaging with seller</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-black mt-0.5">check_circle</span>
                <span>Additional due diligence materials</span>
              </li>
            </ul>
          </div>
          <a
            href={startup.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-black text-white font-mono font-bold uppercase border-3 border-black hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
          >
            View Full Listing on {startup.source}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <p className="text-xs text-gray-600 text-center font-sans">
            Note: Website URLs and founder details are only shared with verified buyers on the marketplace for privacy and security reasons.
          </p>
        </div>
      </div>
    </div>
  )
}
