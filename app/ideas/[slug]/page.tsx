import { notFound } from 'next/navigation'
import SingleIdeaHeader from '@/components/ideas/SingleIdeaHeader'
import SingleIdeaContent from '@/components/ideas/SingleIdeaContent'
import SingleIdeaSidebar from '@/components/ideas/SingleIdeaSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Mock data - in real app this would come from database
const ideas = {
  'ai-code-reviewer': {
    id: 'ai-code-reviewer',
    title: 'AI-Powered Code Review Assistant',
    category: 'AI/ML',
    complexity: 'Medium',
    demandScore: 8.7,
    marketSize: '$2.1B',
    problem: 'Code reviews are time-consuming and inconsistent across development teams, leading to bugs, security vulnerabilities, and knowledge bottlenecks.',
    solution: 'AI assistant that provides instant, consistent code reviews with security, performance, and style suggestions, integrating seamlessly with existing development workflows.',
    tags: ['Developer Tools', 'AI', 'Productivity'],
    competitors: 3,
    monetization: 'Subscription',
    timeToMVP: '4-6 months',
    estimatedCost: '$150K-300K',
    targetAudience: 'Software development teams, DevOps engineers, tech leads',
    keyMetrics: {
      searchVolume: '12K/month',
      socialMentions: '2.4K/month',
      competitorFunding: '$45M',
      growthRate: '+23%'
    },
    demandSignals: {
      searchTrends: [
        { term: 'automated code review', volume: '8.2K/month', trend: '+15%' },
        { term: 'AI code analysis', volume: '3.8K/month', trend: '+45%' },
        { term: 'code review tools', volume: '12K/month', trend: '+8%' }
      ],
      communityActivity: [
        { platform: 'Reddit r/programming', mentions: '450/month', sentiment: 'Positive' },
        { platform: 'Hacker News', mentions: '120/month', sentiment: 'Very Positive' },
        { platform: 'Stack Overflow', mentions: '890/month', sentiment: 'Neutral' }
      ]
    },
    competitorAnalysis: [
      { name: 'CodeClimate', funding: '$18M', users: '50K+', pricing: '$7-30/dev/month' },
      { name: 'SonarQube', funding: '$63M', users: '200K+', pricing: 'Free-$150/month' },
      { name: 'DeepCode', funding: '$4M', users: '10K+', pricing: 'Acquired by Snyk' }
    ],
    monetizationModels: [
      { model: 'Per-developer subscription', pricing: '$15-50/dev/month', pros: 'Predictable revenue, scales with team size', cons: 'Higher barrier for large teams' },
      { model: 'Usage-based pricing', pricing: '$0.10-0.50/review', pros: 'Pay-as-you-go flexibility', cons: 'Unpredictable revenue' },
      { model: 'Enterprise licensing', pricing: '$10K-100K/year', pros: 'High-value contracts', cons: 'Longer sales cycles' }
    ],
    buildComplexity: {
      techRequirements: ['Machine Learning/NLP', 'Git integration', 'IDE plugins', 'Web dashboard', 'API development'],
      mvpFeatures: ['Basic code analysis', 'Security vulnerability detection', 'Style guide enforcement', 'GitHub/GitLab integration'],
      techStack: ['Python/Node.js', 'TensorFlow/PyTorch', 'React/Vue.js', 'PostgreSQL', 'Docker', 'AWS/GCP'],
      teamSize: '4-6 developers',
      timeline: '4-6 months for MVP',
      estimatedCost: '$150K-300K'
    },
    goToMarket: [
      'Developer community engagement (GitHub, Stack Overflow)',
      'Content marketing (technical blogs, tutorials)',
      'Integration partnerships with Git platforms',
      'Freemium model for individual developers',
      'Enterprise sales for larger teams'
    ],
    risks: [
      'Competition from established players like SonarQube',
      'Technical challenge of accurate AI code analysis',
      'Integration complexity with diverse development workflows',
      'Developer adoption resistance to AI suggestions'
    ],
    whoShouldBuild: [
      'Experienced software engineers with ML background',
      'Teams with deep understanding of code quality tools',
      'Founders with connections in developer tool ecosystem',
      'Technical co-founders with enterprise sales experience'
    ],
    nextSteps: [
      'Validate demand through developer surveys and interviews',
      'Build MVP focusing on one programming language (e.g., JavaScript)',
      'Create GitHub integration and basic web dashboard',
      'Test with 10-20 development teams for feedback',
      'Iterate based on user feedback and expand language support'
    ]
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function SingleIdeaPage({ params }: PageProps) {
  const idea = ideas[params.slug as keyof typeof ideas]

  if (!idea) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <SingleIdeaHeader idea={idea} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <SingleIdeaContent idea={idea} />
            </div>
            <div className="lg:col-span-4">
              <SingleIdeaSidebar idea={idea} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}