import IdeaSaveButton, { ideaIdFromTitle } from './IdeaSaveButton'

interface SingleIdeaSidebarProps {
  idea: {
    title?: string
    category: string
    complexity: string
    demandScore: number
    marketSize: string
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

export default function SingleIdeaSidebar({ idea }: SingleIdeaSidebarProps) {
  const quickFacts = [
    { label: 'Category', value: idea.category, icon: 'category' },
    { label: 'Complexity', value: idea.complexity, icon: 'construction' },
    { label: 'Market Size', value: idea.marketSize, icon: 'public' },
    { label: 'Competitors', value: idea.competitors.toString(), icon: 'compare' },
    { label: 'Monetization', value: idea.monetization, icon: 'monetization_on' },
    { label: 'Time to MVP', value: idea.timeToMVP, icon: 'schedule' },
    { label: 'Estimated Cost', value: idea.estimatedCost, icon: 'attach_money' }
  ]

  const similarIdeas = [
    { title: 'AI Meeting Assistant', score: 9.1, category: 'AI/ML' },
    { title: 'Developer Analytics', score: 7.8, category: 'Developer Tools' },
    { title: 'Code Quality Monitor', score: 8.3, category: 'AI/ML' },
    { title: 'Team Productivity Tracker', score: 7.5, category: 'Productivity' }
  ]

  const validationChecklist = [
    { item: 'Strong search volume trends', status: 'complete' },
    { item: 'Active community discussions', status: 'complete' },
    { item: 'Competitor funding validation', status: 'complete' },
    { item: 'Clear monetization path', status: 'complete' },
    { item: 'Technical feasibility confirmed', status: 'partial' }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Facts */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">fact_check</span>
          Quick Facts
        </h3>
        <div className="space-y-4">
          {quickFacts.map((fact, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-gray-500">{fact.icon}</span>
                <span className="font-mono text-sm">{fact.label}</span>
              </div>
              <span className="font-mono text-sm font-bold">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demand Metrics */}
      <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">trending_up</span>
          Demand Metrics
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-sm text-gray-300">Search Volume</span>
            <span className="font-mono text-sm font-bold text-white">{idea.keyMetrics.searchVolume}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-sm text-gray-300">Social Mentions</span>
            <span className="font-mono text-sm font-bold text-white">{idea.keyMetrics.socialMentions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-sm text-gray-300">Competitor Funding</span>
            <span className="font-mono text-sm font-bold text-white">{idea.keyMetrics.competitorFunding}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-sm text-gray-300">Growth Rate</span>
            <span className="font-mono text-sm font-bold text-primary">{idea.keyMetrics.growthRate}</span>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">group</span>
          Target Audience
        </h3>
        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          {idea.targetAudience}
        </p>
      </div>

      {/* Validation Checklist */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">checklist</span>
          Validation Status
        </h3>
        <div className="space-y-3">
          {validationChecklist.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-lg ${
                item.status === 'complete' ? 'text-green-600' : 
                item.status === 'partial' ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                {item.status === 'complete' ? 'check_circle' : 
                 item.status === 'partial' ? 'radio_button_partial' : 'radio_button_unchecked'}
              </span>
              <span className="font-mono text-sm">{item.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Ideas */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">lightbulb</span>
          Similar Ideas
        </h3>
        <div className="space-y-4">
          {similarIdeas.map((idea, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-sm hover:bg-gray-100 cursor-pointer transition-colors">
              <div>
                <p className="font-mono text-sm font-bold">{idea.title}</p>
                <p className="font-mono text-xs text-gray-500">{idea.category}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-gray-500">Score</p>
                <p className="font-mono text-sm font-bold">{idea.score}/10</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-2 border-black font-mono rounded-sm transition-colors">
          View All Similar
        </button>
      </div>

      {/* Actions */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold mb-4">Actions</h3>
        <div className="space-y-3">
          <IdeaSaveButton ideaId={ideaIdFromTitle(idea.title || '')} variant="full" />
          <button className="w-full py-3 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono font-bold rounded-sm transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Analysis
          </button>
          <button className="w-full py-3 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono font-bold rounded-sm transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">share</span>
            Share Idea
          </button>
        </div>
      </div>

      {/* Data Source */}
      <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
        <h4 className="font-mono text-sm font-bold mb-2">Analysis Methodology</h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-sm text-green-600">verified</span>
          <span className="font-mono text-xs text-gray-600">Validated by FoundersPrime</span>
        </div>
        <p className="font-sans text-xs text-gray-500">
          Analysis based on 50+ data points including search trends, social signals, competitor research, and market analysis. Last updated: March 2024.
        </p>
      </div>
    </div>
  )
}