import Link from 'next/link'

interface SingleStartupHeaderProps {
  startup: {
    name: string
    tagline: string
    logo: string
    industry: string
    founded: number
    location: string
    website: string
    tags: string[]
  }
}

export default function SingleStartupHeader({ startup }: SingleStartupHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-8">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 font-mono text-sm font-medium">
          <li className="inline-flex items-center">
            <Link className="text-gray-500 hover:text-black" href="/">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <Link className="text-gray-500 hover:text-black" href="/startups">Startups</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black">{startup.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header Content */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div className="size-20 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-3xl text-gray-600">{startup.logo}</span>
          </div>
          
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-mono text-4xl font-bold text-black mb-2">{startup.name}</h1>
                <p className="font-sans text-xl text-gray-600 mb-3">{startup.tagline}</p>
                
                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-primary/20 text-black px-3 py-1 font-mono text-sm font-bold rounded-sm border border-black">
                    {startup.industry}
                  </span>
                  {startup.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 font-mono text-sm rounded-sm border border-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 ml-6">
                <button className="p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-xl">bookmark_border</span>
                </button>
                <button className="p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-xl">share</span>
                </button>
                <a 
                  href={startup.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all flex items-center gap-2"
                >
                  Visit Website
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
            
            {/* Quick Info */}
            <div className="flex items-center gap-6 text-gray-600 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{startup.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>Founded {startup.founded}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">language</span>
                <span>{startup.website.replace('https://', '')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}