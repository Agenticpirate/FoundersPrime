interface SearchResult {
  type: 'deal' | 'startup' | 'idea' | 'resource' | 'blog'
  title: string
  description: string
  category: string
  url: string
  featured?: boolean
  metadata: Record<string, any>
  [key: string]: any
}

interface SearchResultCardProps {
  result: SearchResult
}

export default function SearchResultCard({ result }: SearchResultCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deal':
        return 'local_offer'
      case 'startup':
        return 'business'
      case 'idea':
        return 'lightbulb'
      case 'resource':
        return 'folder'
      case 'blog':
        return 'article'
      default:
        return 'search'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deal':
        return 'bg-green-400'
      case 'startup':
        return 'bg-primary'
      case 'idea':
        return 'bg-yellow-400'
      case 'resource':
        return 'bg-purple-400'
      case 'blog':
        return 'bg-orange-400'
      default:
        return 'bg-gray-400'
    }
  }

  const renderTypeSpecificInfo = () => {
    switch (result.type) {
      case 'deal':
        return (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">payments</span>
              <span className="font-mono font-bold text-green-600">{result.value}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">business</span>
              <span className="font-sans text-gray-600">{result.provider}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">schedule</span>
              <span className="font-sans text-gray-600">Expires {result.metadata.expires}</span>
            </div>
          </div>
        )
      case 'startup':
        return (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">trending_up</span>
              <span className="font-mono font-bold text-primary">{result.funding} raised</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">assessment</span>
              <span className="font-sans text-gray-600">{result.valuation} valuation</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">calendar_today</span>
              <span className="font-sans text-gray-600">Founded {result.metadata.founded}</span>
            </div>
          </div>
        )
      case 'idea':
        return (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">star</span>
              <span className="font-mono font-bold text-yellow-600">{result.demandScore}/10 demand</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">build</span>
              <span className="font-sans text-gray-600">{result.complexity} complexity</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">public</span>
              <span className="font-sans text-gray-600">{result.metadata.marketSize} market</span>
            </div>
          </div>
        )
      case 'resource':
        return (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">description</span>
              <span className="font-sans text-gray-600">{result.format}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">payments</span>
              <span className="font-mono font-bold text-purple-600">{result.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">download</span>
              <span className="font-sans text-gray-600">{result.metadata.downloads} downloads</span>
            </div>
          </div>
        )
      case 'blog':
        return (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">person</span>
              <span className="font-sans text-gray-600">{result.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">schedule</span>
              <span className="font-sans text-gray-600">{result.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">visibility</span>
              <span className="font-sans text-gray-600">{result.metadata.views} views</span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 hover:translate-y-[-2px] transition-transform">
      <div className="flex items-start gap-4">
        {/* Type Icon */}
        <div className={`size-12 ${getTypeColor(result.type)} border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0`}>
          <span className="material-symbols-outlined text-lg text-black">
            {getTypeIcon(result.type)}
          </span>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 ${getTypeColor(result.type)} text-black font-mono text-xs font-bold rounded-sm border-2 border-black`}>
                {result.type.toUpperCase()}
              </span>
              <span className="px-2 py-1 bg-white text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
                {result.category}
              </span>
              {result.featured && (
                <span className="px-2 py-1 bg-yellow-400 text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
                  FEATURED
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                <span className="material-symbols-outlined text-sm">bookmark</span>
              </button>
              <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                <span className="material-symbols-outlined text-sm">share</span>
              </button>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="font-mono text-lg font-bold text-black mb-2 hover:text-primary transition-colors">
            <a href={result.url}>
              {result.title}
            </a>
          </h3>
          
          {/* Description */}
          <p className="font-sans text-gray-700 mb-4 leading-relaxed">
            {result.description}
          </p>
          
          {/* Type-specific Info */}
          <div className="mb-4">
            {renderTypeSpecificInfo()}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-500">
                Relevance: 95%
              </span>
              <span className="text-gray-400">•</span>
              <span className="font-mono text-xs text-gray-500">
                Updated recently
              </span>
            </div>
            
            <a 
              href={result.url}
              className="px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}