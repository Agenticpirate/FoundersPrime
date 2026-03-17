import Link from 'next/link'

interface SingleIdeaHeaderProps {
  idea: {
    title: string
    category: string
    complexity: string
    demandScore: number
    tags: string[]
  }
}

export default function SingleIdeaHeader({ idea }: SingleIdeaHeaderProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-900'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-900'
      case 'High': return 'bg-red-100 text-red-800 border-red-900'
      default: return 'bg-gray-100 text-gray-800 border-gray-900'
    }
  }

  const getDemandScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600'
    if (score >= 7.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-4 md:mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 font-mono text-sm font-medium">
          <li className="inline-flex items-center">
            <Link className="text-gray-500 hover:text-black" href="/">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <Link className="text-gray-500 hover:text-black" href="/ideas">Ideas</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black">{idea.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header Content */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-3 py-1 font-mono text-sm font-bold rounded-sm border-2 ${getComplexityColor(idea.complexity)}`}>
                {idea.complexity} Complexity
              </div>
              <div className="bg-primary/20 text-black px-3 py-1 font-mono text-sm font-bold rounded-sm border border-black">
                {idea.category}
              </div>
            </div>
            
            <h1 className="font-mono text-4xl font-bold text-black mb-4 leading-tight">{idea.title}</h1>
            
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {idea.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 font-mono text-sm rounded-sm border border-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Demand Score & Actions */}
          <div className="text-right ml-6">
            <div className="mb-4">
              <p className="font-mono text-sm text-gray-500 uppercase mb-2">Demand Score</p>
              <p className={`font-mono text-5xl font-bold ${getDemandScoreColor(idea.demandScore)}`}>
                {idea.demandScore}/10
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                <span className="material-symbols-outlined text-xl">bookmark_border</span>
              </button>
              <button className="p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
              <button className="px-6 py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Export Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}