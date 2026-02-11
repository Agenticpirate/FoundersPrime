import IdeaCard from './IdeaCard'

export default function IdeasGrid() {
  const ideas = [
    {
      id: 'ai-code-reviewer',
      title: 'AI-Powered Code Review Assistant',
      category: 'AI/ML',
      complexity: 'Medium',
      demandScore: 8.7,
      marketSize: '$2.1B',
      problem: 'Code reviews are time-consuming and inconsistent across development teams',
      solution: 'AI assistant that provides instant, consistent code reviews with security, performance, and style suggestions',
      tags: ['Developer Tools', 'AI', 'Productivity'],
      competitors: 3,
      monetization: 'Subscription',
      timeToMVP: '4-6 months',
      estimatedCost: '$150K-300K',
      targetAudience: 'Software development teams, DevOps engineers',
      keyMetrics: {
        searchVolume: '12K/month',
        socialMentions: '2.4K/month',
        competitorFunding: '$45M',
        growthRate: '+23%'
      }
    },
    {
      id: 'climate-carbon-tracker',
      title: 'Personal Carbon Footprint Tracker',
      category: 'Climate',
      complexity: 'Low',
      demandScore: 7.3,
      marketSize: '$890M',
      problem: 'Individuals lack easy ways to track and reduce their carbon footprint',
      solution: 'Mobile app that automatically tracks carbon footprint from purchases, travel, and lifestyle choices',
      tags: ['Climate', 'Mobile', 'Consumer'],
      competitors: 5,
      monetization: 'Freemium',
      timeToMVP: '2-3 months',
      estimatedCost: '$50K-100K',
      targetAudience: 'Environmentally conscious consumers, millennials, Gen Z',
      keyMetrics: {
        searchVolume: '8.5K/month',
        socialMentions: '1.8K/month',
        competitorFunding: '$12M',
        growthRate: '+45%'
      }
    },
    {
      id: 'remote-team-wellness',
      title: 'Remote Team Wellness Platform',
      category: 'B2B Tools',
      complexity: 'Medium',
      demandScore: 8.1,
      marketSize: '$1.4B',
      problem: 'Remote teams struggle with mental health, burnout, and team connection',
      solution: 'Platform combining wellness tracking, virtual team activities, and mental health resources',
      tags: ['Remote Work', 'Wellness', 'HR Tech'],
      competitors: 4,
      monetization: 'Subscription',
      timeToMVP: '3-5 months',
      estimatedCost: '$100K-200K',
      targetAudience: 'HR teams, remote-first companies, team managers',
      keyMetrics: {
        searchVolume: '15K/month',
        socialMentions: '3.2K/month',
        competitorFunding: '$78M',
        growthRate: '+67%'
      }
    },
    {
      id: 'micro-saas-analytics',
      title: 'Micro-SaaS Analytics Dashboard',
      category: 'SaaS',
      complexity: 'Low',
      demandScore: 7.8,
      marketSize: '$650M',
      problem: 'Small SaaS businesses need simple, affordable analytics without enterprise complexity',
      solution: 'Lightweight analytics dashboard focused on key SaaS metrics for micro-businesses',
      tags: ['Analytics', 'SaaS', 'Small Business'],
      competitors: 7,
      monetization: 'Subscription',
      timeToMVP: '2-4 months',
      estimatedCost: '$75K-150K',
      targetAudience: 'Solo founders, small SaaS companies, indie hackers',
      keyMetrics: {
        searchVolume: '6.8K/month',
        socialMentions: '1.5K/month',
        competitorFunding: '$23M',
        growthRate: '+34%'
      }
    },
    {
      id: 'local-food-rescue',
      title: 'Local Food Rescue Marketplace',
      category: 'Consumer',
      complexity: 'High',
      demandScore: 8.4,
      marketSize: '$3.2B',
      problem: 'Restaurants and grocery stores waste food while people need affordable meals',
      solution: 'Marketplace connecting businesses with excess food to consumers at discounted prices',
      tags: ['Food Tech', 'Marketplace', 'Sustainability'],
      competitors: 6,
      monetization: 'Transaction Fees',
      timeToMVP: '6-8 months',
      estimatedCost: '$200K-400K',
      targetAudience: 'Budget-conscious consumers, restaurants, grocery stores',
      keyMetrics: {
        searchVolume: '22K/month',
        socialMentions: '4.1K/month',
        competitorFunding: '$156M',
        growthRate: '+89%'
      }
    },
    {
      id: 'ai-meeting-insights',
      title: 'AI Meeting Insights & Action Items',
      category: 'AI/ML',
      complexity: 'Medium',
      demandScore: 9.1,
      marketSize: '$1.8B',
      problem: 'Teams lose track of meeting decisions and action items, reducing productivity',
      solution: 'AI that joins meetings, extracts key decisions, and automatically creates action items',
      tags: ['AI', 'Productivity', 'Meetings'],
      competitors: 8,
      monetization: 'Subscription',
      timeToMVP: '4-6 months',
      estimatedCost: '$180K-350K',
      targetAudience: 'Knowledge workers, project managers, executive teams',
      keyMetrics: {
        searchVolume: '18K/month',
        socialMentions: '3.8K/month',
        competitorFunding: '$89M',
        growthRate: '+56%'
      }
    }
  ]

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-2xl font-bold">Showing 847 ideas</h2>
          <span className="bg-gray-200 px-2 py-1 font-mono text-xs rounded-sm border border-black">
            Page 1 of 71
          </span>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="px-3 py-1 font-mono text-xs border-2 border-black bg-black text-white rounded-sm">
            Grid
          </button>
          <button className="px-3 py-1 font-mono text-xs border-2 border-black bg-white text-black rounded-sm hover:bg-gray-100">
            List
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="space-y-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-12">
        <button className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100 disabled:opacity-50" disabled>
          Previous
        </button>
        <button className="px-4 py-2 bg-black text-white border-2 border-black font-mono text-sm rounded-sm">
          1
        </button>
        <button className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100">
          2
        </button>
        <button className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100">
          3
        </button>
        <span className="px-2 font-mono text-sm">...</span>
        <button className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100">
          71
        </button>
        <button className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  )
}