import Link from 'next/link'

interface StartupCardProps {
  startup: {
    id: string
    slug: string
    name: string
    category: string
    shortDescription: string
    revenueDisplay: string
    askingPriceDisplay: string
    country: string
    founded: string
    logoUrl: string
    featured: boolean
    forSale: boolean
    source: string
    teamSize: string
  }
}

export default function StartupCard({ startup }: StartupCardProps) {
  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 hover:translate-y-[-2px] transition-transform group relative">
      {/* Featured Badge */}
      {startup.featured && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-amber-400 border-2 border-black text-xs font-bold uppercase">
            Featured
          </span>
        </div>
      )}
      
      {/* For Sale Badge */}
      {startup.forSale && (
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 bg-green-400 border-2 border-black text-xs font-bold uppercase flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">sell</span>
            For Sale
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="size-16 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
          {startup.logoUrl ? (
            <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-2xl text-gray-600">{startup.name.charAt(0)}</span>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-4">
              <h3 className="font-mono text-xl font-bold text-black mb-1 line-clamp-2">{startup.name}</h3>
              <p className="font-sans text-gray-600 text-sm line-clamp-2">{startup.shortDescription}</p>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="bg-primary/20 text-black px-2 py-1 font-mono text-xs rounded-sm border border-black">
              {startup.category}
            </span>
            <span className="bg-gray-100 text-black px-2 py-1 font-mono text-xs rounded-sm border border-black">
              {startup.source}
            </span>
            <span className="bg-gray-50 text-gray-600 px-2 py-1 font-mono text-xs rounded-sm border border-gray-300">
              {startup.teamSize}
            </span>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Revenue</p>
              <p className="font-mono text-sm font-bold">{startup.revenueDisplay}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Asking Price</p>
              <p className="font-mono text-sm font-bold">{startup.askingPriceDisplay}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Country</p>
              <p className="font-mono text-sm font-bold">{startup.country}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Founded</p>
              <p className="font-mono text-sm font-bold">{startup.founded}</p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="font-mono">Verified Startup</span>
            </div>
            <Link href={`/startups/${startup.slug}`}>
              <button className="px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm rounded-sm transition-all group-hover:shadow-[2px_2px_0px_0px_#1a1a1a] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}