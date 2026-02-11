import Link from 'next/link'

interface IdeaCardProps {
  idea: {
    id: string
    title: string
    category: string
    complexity: string
    demandScore: number
    marketSize: string
    problem: string
    solution: string
    tags: string[]
    competitors: number
    monetization: string
    timeToMVP: string
    estimatedCost: string
    targetAudience: string
    keyMetrics: {
      searchVolume: string
      socialMentions: string
      competitorFunding: string
      growthRate: string
    }
  }
}

export default function IdeaCard({ idea }: IdeaCardProps) {
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
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 hover:translate-y-[-2px] transition-transform group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-mono text-xl font-bold text-black">{idea.title}</h3>
            <div className={`px-2 py-1 font-mono text-xs font-bold rounded-sm border-2 ${getComplexityColor(idea.complexity)}`}>
              {idea.complexity}
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="bg-primary/20 text-black px-2 py-1 font-mono text-xs rounded-sm border border-black">
              {idea.category}
            </span>
            {idea.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 font-mono text-xs rounded-sm border border-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Demand Score */}
        <div className="text-right ml-4">
          <p className="font-mono text-xs text-gray-500 uppercase mb-1">Demand Score</p>
          <p className={`font-mono text-2xl font-bold ${getDemandScoreColor(idea.demandScore)}`}>
            {idea.demandScore}/10
          </p>
        </div>
      </div>
      
      {/* Problem & Solution */}
      <div className="mb-4">
        <div className="mb-3">
          <h4 className="font-mono text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">problem</span>
            Problem
          </h4>
          <p className="font-sans text-sm text-gray-600">{idea.problem}</p>
        </div>
        <div>
          <h4 className="font-mono text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">lightbulb</span>
            Solution
          </h4>
          <p className="font-sans text-sm text-gray-600">{idea.solution}</p>
        </div>
      </div>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="font-mono text-xs text-gray-500 uppercase mb-1">Market Size</p>
          <p className="font-mono text-sm font-bold">{idea.marketSize}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-gray-500 uppercase mb-1">Competitors</p>
          <p className="font-mono text-sm font-bold">{idea.competitors}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-gray-500 uppercase mb-1">Time to MVP</p>
          <p className="font-mono text-sm font-bold">{idea.timeToMVP}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-gray-500 uppercase mb-1">Est. Cost</p>
          <p className="font-mono text-sm font-bold">{idea.estimatedCost}</p>
        </div>
      </div>
      
      {/* Demand Signals */}
      <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4 mb-4">
        <h4 className="font-mono text-sm font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          Demand Signals
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <p className="text-gray-500 mb-1">Search Volume</p>
            <p className="font-mono font-bold">{idea.keyMetrics.searchVolume}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Social Mentions</p>
            <p className="font-mono font-bold">{idea.keyMetrics.socialMentions}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Competitor Funding</p>
            <p className="font-mono font-bold">{idea.keyMetrics.competitorFunding}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Growth Rate</p>
            <p className="font-mono font-bold text-green-600">{idea.keyMetrics.growthRate}</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="material-symbols-outlined text-sm">monetization_on</span>
            <span className="font-mono">{idea.monetization}</span>
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
        <Link href={`/ideas/${idea.id}`}>
          <button className="px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm rounded-sm transition-all group-hover:shadow-[2px_2px_0px_0px_#1a1a1a] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}