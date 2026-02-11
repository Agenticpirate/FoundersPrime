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
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 hover:translate-y-[-2px] transition-transform group">
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="size-16 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-2xl text-gray-600">{resource.thumbnail}</span>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-mono text-xl font-bold text-black">{resource.title}</h3>
                {resource.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 border-2 border-yellow-900 px-2 py-1 font-mono text-xs font-bold rounded-sm">
                    PRO
                  </span>
                )}
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="bg-primary/20 text-black px-2 py-1 font-mono text-xs rounded-sm border border-black">
                  {resource.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 font-mono text-xs rounded-sm border border-gray-300">
                  {resource.type}
                </span>
                <span className={`px-2 py-1 font-mono text-xs font-bold rounded-sm border-2 ${getPriceColor(resource.price)}`}>
                  {resource.price}
                </span>
              </div>
            </div>
            
            {/* Rating & Actions */}
            <div className="text-right ml-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                <span className="font-mono text-sm font-bold">{resource.rating}</span>
              </div>
              <div className="flex gap-2">
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
          <p className="font-sans text-sm text-gray-700 mb-4 line-clamp-2">
            {resource.description}
          </p>
          
          {/* Features */}
          <div className="mb-4">
            <h4 className="font-mono text-sm font-bold text-gray-700 mb-2">What's Included:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {resource.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  <span className="font-sans text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Format</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-gray-600">{getFormatIcon(resource.format)}</span>
                <span className="font-mono text-sm font-bold">{resource.format}</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Downloads</p>
              <p className="font-mono text-sm font-bold">{resource.downloads}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Author</p>
              <p className="font-mono text-sm font-bold">{resource.author}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase mb-1">Updated</p>
              <p className="font-mono text-sm font-bold">
                {new Date(resource.lastUpdated).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gray-50 text-gray-600 px-2 py-1 font-mono text-xs rounded-sm border border-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href={`/resources/${resource.id}`}>
                <button className="px-4 py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm rounded-sm transition-all">
                  View Details
                </button>
              </Link>
              <button className="px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all group-hover:shadow-[2px_2px_0px_0px_#1a1a1a] group-hover:translate-x-[2px] group-hover:translate-y-[2px] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                {resource.price === 'Free' ? 'Download' : 'Get Access'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}