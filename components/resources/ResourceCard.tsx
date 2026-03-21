import Link from 'next/link'

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    category: string
    type: string
    format: string
    price: string
    rating: number
    downloads: string
    description: string
    author: string
    tags: string[]
    features: string[]
    thumbnail: string
    isPremium: boolean
    lastUpdated: string
  }
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getPriceColor = (price: string) => {
    return price === 'Free' ? 'bg-green-100 text-green-800 border-green-900' : 'bg-blue-100 text-blue-800 border-blue-900'
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return 'picture_as_pdf'
      case 'Google Slides': return 'slideshow'
      case 'Google Docs': return 'description'
      case 'Excel': return 'table_chart'
      case 'Notion': return 'note'
      case 'Figma Template': return 'design_services'
      case 'Web Tool': return 'web'
      default: return 'description'
    }
  }

  return (
    <div className="bg-white border-2 md:border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] md:shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6 hover:translate-y-[-2px] transition-transform group">
      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
        {/* Thumbnail Container (Top row mobile / Left column desktop) */}
        <div className="flex w-full sm:w-auto items-start justify-between sm:block">
          <div className="size-12 md:size-16 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-xl md:text-2xl text-gray-600">{resource.thumbnail}</span>
          </div>
          {/* Mobile Rating & Actions */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
              <span className="font-mono text-sm font-bold">{resource.rating}</span>
            </div>
            <button className="p-1.5 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
              <span className="material-symbols-outlined text-base">bookmark_border</span>
            </button>
            <button className="p-1.5 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
              <span className="material-symbols-outlined text-base">share</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                <h3 className="font-mono text-lg md:text-xl font-bold text-black leading-tight">{resource.title}</h3>
                {resource.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 border-2 border-yellow-900 px-1.5 md:px-2 py-0.5 md:py-1 font-mono text-[10px] md:text-xs font-bold rounded-sm">
                    PRO
                  </span>
                )}
              </div>
              
              {/* Tags */}
              <div className="flex gap-1.5 md:gap-2 mb-2 md:mb-3 flex-wrap">
                <span className="bg-primary/20 text-black px-1.5 md:px-2 py-0.5 md:py-1 font-mono text-[10px] md:text-xs rounded-sm border border-black">
                  {resource.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-1.5 md:px-2 py-0.5 md:py-1 font-mono text-[10px] md:text-xs rounded-sm border border-gray-300">
                  {resource.type}
                </span>
                <span className={`px-1.5 md:px-2 py-0.5 md:py-1 font-mono text-[10px] md:text-xs font-bold rounded-sm border-2 ${getPriceColor(resource.price)}`}>
                  {resource.price}
                </span>
              </div>
            </div>
            
            {/* Desktop Rating & Actions */}
            <div className="hidden sm:block text-right ml-4">
              <div className="flex items-center justify-end gap-1 mb-2">
                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                <span className="font-mono text-sm font-bold">{resource.rating}</span>
              </div>
              <div className="flex gap-2 justify-end">
                <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-lg">bookmark_border</span>
                </button>
                <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-lg">share</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="font-sans text-xs md:text-sm text-gray-700 mb-3 md:mb-4 line-clamp-2">
            {resource.description}
          </p>
          
          {/* Features */}
          <div className="mb-3 md:mb-4">
            <h4 className="font-mono text-xs md:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">What's Included:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-1">
              {resource.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-1.5 md:gap-2">
                  <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                  <span className="font-sans text-xs md:text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4 bg-gray-50 border-2 border-black p-3 md:p-0 md:bg-transparent md:border-none">
            <div>
              <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase mb-0.5 md:mb-1">Format</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-gray-600">{getFormatIcon(resource.format)}</span>
                <span className="font-mono text-xs md:text-sm font-bold truncate">{resource.format}</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase mb-0.5 md:mb-1">Downloads</p>
              <p className="font-mono text-xs md:text-sm font-bold">{resource.downloads}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase mb-0.5 md:mb-1">Author</p>
              <p className="font-mono text-xs md:text-sm font-bold truncate">{resource.author}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase mb-0.5 md:mb-1">Updated</p>
              <p className="font-mono text-xs md:text-sm font-bold">
                {new Date(resource.lastUpdated).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          {/* Footer - Actions at bottom */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex gap-1.5 md:gap-2 flex-wrap">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gray-100 border-2 border-black text-black px-1.5 py-0.5 font-mono text-[10px] rounded-sm whitespace-nowrap">
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
            <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
              <Link href={`/resources/${resource.id}`} className="flex-1 sm:flex-none">
                <button className="w-full sm:w-auto px-3 md:px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 text-black font-mono text-xs md:text-sm rounded-sm transition-all text-center">
                  Details
                </button>
              </Link>
              <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-xs md:text-sm font-bold rounded-sm transition-all group-hover:shadow-[2px_2px_0px_0px_#1a1a1a] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">download</span>
                {resource.price === 'Free' ? 'Get Free' : 'Access'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}