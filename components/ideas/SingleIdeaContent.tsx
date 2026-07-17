interface SingleIdeaContentProps {
  idea: {
    problem: string
    solution: string
    demandSignals: {
      searchTrends: Array<{
        term: string
        volume: string
        trend: string
      }>
      communityActivity: Array<{
        platform: string
        mentions: string
        sentiment: string
      }>
    }
    competitorAnalysis: Array<{
      name: string
      funding: string
      users: string
      pricing: string
    }>
    monetizationModels: Array<{
      model: string
      pricing: string
      pros: string
      cons: string
    }>
    buildComplexity: {
      techRequirements: string[]
      mvpFeatures: string[]
      techStack: string[]
      teamSize: string
      timeline: string
      estimatedCost: string
    }
    targetAudience: string
    goToMarket: string[]
    risks: string[]
    whoShouldBuild: string[]
    nextSteps: string[]
  }
}

export default function SingleIdeaContent({ idea }: SingleIdeaContentProps) {
  return (
    <div className="space-y-8">
      {/* The Problem */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">problem</span>
          The Problem
        </h2>
        <p className="font-sans text-lg text-gray-700 leading-relaxed">
          {idea.problem}
        </p>
      </div>

      {/* The Solution */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">lightbulb</span>
          The Solution
        </h2>
        <p className="font-sans text-lg text-gray-700 leading-relaxed">
          {idea.solution}
        </p>
      </div>

      {/* Demand Signals */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">trending_up</span>
          Demand Signals
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search Trends */}
          <div>
            <h3 className="font-mono text-lg font-bold mb-4">Search Volume Trends</h3>
            <div className="space-y-3">
              {idea.demandSignals.searchTrends.map((trend, index) => (
                <div key={index} className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold">{trend.term}</span>
                    <span className="font-mono text-xs text-amber-700">{trend.trend}</span>
                  </div>
                  <span className="font-mono text-sm text-gray-600">{trend.volume}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Community Activity */}
          <div>
            <h3 className="font-mono text-lg font-bold mb-4">Community Activity</h3>
            <div className="space-y-3">
              {idea.demandSignals.communityActivity.map((activity, index) => (
                <div key={index} className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold">{activity.platform}</span>
                    <span className={`font-mono text-xs px-2 py-1 rounded-sm ${
                      activity.sentiment === 'Very Positive' ? 'bg-amber-100 text-amber-900' :
                      activity.sentiment === 'Positive' ? 'bg-amber-50 text-amber-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.sentiment}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-gray-600">{activity.mentions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">compare</span>
          Competitor Analysis
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left font-mono text-sm font-bold py-3">Company</th>
                <th className="text-left font-mono text-sm font-bold py-3">Funding</th>
                <th className="text-left font-mono text-sm font-bold py-3">Users</th>
                <th className="text-left font-mono text-sm font-bold py-3">Pricing</th>
              </tr>
            </thead>
            <tbody>
              {idea.competitorAnalysis.map((competitor, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 font-mono text-sm font-bold">{competitor.name}</td>
                  <td className="py-4 font-mono text-sm">{competitor.funding}</td>
                  <td className="py-4 font-mono text-sm">{competitor.users}</td>
                  <td className="py-4 font-mono text-sm">{competitor.pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monetization Models */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">monetization_on</span>
          Monetization Models
        </h2>
        
        <div className="space-y-6">
          {idea.monetizationModels.map((model, index) => (
            <div key={index} className="bg-gray-50 border-2 border-gray-300 rounded-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-mono text-lg font-bold">{model.model}</h3>
                <span className="font-mono text-sm font-bold text-primary">{model.pricing}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-mono text-sm font-bold text-amber-800 mb-2">Pros</h4>
                  <p className="font-sans text-sm text-gray-700">{model.pros}</p>
                </div>
                <div>
                  <h4 className="font-mono text-sm font-bold text-red-700 mb-2">Cons</h4>
                  <p className="font-sans text-sm text-gray-700">{model.cons}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Build Complexity */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">construction</span>
          Build Complexity
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-lg font-bold mb-3">Technical Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {idea.buildComplexity.techRequirements.map((req, index) => (
                  <span key={index} className="bg-black text-white px-3 py-1 font-mono text-sm rounded-sm">
                    {req}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-mono text-lg font-bold mb-3">MVP Features</h3>
              <ul className="space-y-2">
                {idea.buildComplexity.mvpFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-primary mt-0.5">check_circle</span>
                    <span className="font-sans text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-lg font-bold mb-3">Recommended Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {idea.buildComplexity.techStack.map((tech, index) => (
                  <span key={index} className="bg-primary text-black px-3 py-1 font-mono text-sm font-bold rounded-sm border border-black">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-gray-600">Team Size:</span>
                  <span className="font-mono text-sm font-bold">{idea.buildComplexity.teamSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-gray-600">Timeline:</span>
                  <span className="font-mono text-sm font-bold">{idea.buildComplexity.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-gray-600">Estimated Cost:</span>
                  <span className="font-mono text-sm font-bold">{idea.buildComplexity.estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Go-to-Market Strategy */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">rocket_launch</span>
          Go-to-Market Strategy
        </h2>
        
        <div className="space-y-3">
          {idea.goToMarket.map((strategy, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="font-sans text-gray-700">{strategy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risks & Challenges */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">warning</span>
          Risks & Challenges
        </h2>
        
        <div className="space-y-3">
          {idea.risks.map((risk, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">error</span>
              <p className="font-sans text-gray-700">{risk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who Should Build This */}
      <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">person</span>
          Who Should Build This
        </h2>
        
        <div className="space-y-3">
          {idea.whoShouldBuild.map((profile, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
              <p className="font-sans text-gray-300">{profile}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">checklist</span>
          Next Steps
        </h2>
        
        <div className="space-y-4">
          {idea.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-sm">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="font-sans text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}