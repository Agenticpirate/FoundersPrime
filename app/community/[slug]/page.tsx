import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscussionHeader from '../../../components/discussion/DiscussionHeader'
import DiscussionContent from '../../../components/discussion/DiscussionContent'
import DiscussionSidebar from '../../../components/discussion/DiscussionSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Mock data for discussions
const discussions = {
  'seed-round-preparation': {
    id: 1,
    title: 'How to prepare for a seed round in 2026?',
    category: 'FUNDING',
    author: {
      name: 'John Doe',
      avatar: 'JD',
      memberType: 'Pro',
      points: 1247
    },
    content: `I'm preparing for our seed round and wondering what investors are looking for in 2026. Any recent experiences or tips from founders who've raised recently?

Our startup is a B2B SaaS platform for project management, we have:
- 50k MRR
- 200 paying customers
- 15% month-over-month growth
- Team of 8 people

Looking to raise $2M to scale our sales and marketing efforts. What should I focus on in my pitch deck and what metrics are most important to highlight?`,
    createdAt: '2 hours ago',
    upvotes: 47,
    replies: 23,
    views: 1200,
    tags: ['fundraising', 'seed-round', 'b2b-saas']
  },
  'mvp-validation-strategies': {
    id: 2,
    title: 'Best strategies for MVP validation in B2B SaaS',
    category: 'PRODUCT',
    author: {
      name: 'Maria Kim',
      avatar: 'MK',
      memberType: 'Pro+',
      points: 2156
    },
    content: `We've built our MVP and are ready to validate with potential customers. What are the most effective validation strategies you've used for B2B SaaS products?

Our product is an AI-powered analytics dashboard for e-commerce businesses. We're targeting mid-market companies with $10M+ annual revenue.

Specific questions:
1. How many customers should we interview before making major product decisions?
2. What's the best way to structure validation interviews?
3. How do you balance feature requests vs. core product vision?
4. Any tools or frameworks you'd recommend?`,
    createdAt: '4 hours ago',
    upvotes: 32,
    replies: 15,
    views: 892,
    tags: ['mvp', 'validation', 'b2b-saas', 'product-market-fit']
  }
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const discussion = discussions[params.slug as keyof typeof discussions]
  
  if (!discussion) {
    return {
      title: 'Discussion Not Found | FoundersPrime Community'
    }
  }

  return {
    title: `${discussion.title} | FoundersPrime Community`,
    description: discussion.content.substring(0, 160) + '...',
  }
}

export default function DiscussionPage({ params }: Props) {
  const discussion = discussions[params.slug as keyof typeof discussions]

  if (!discussion) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <DiscussionHeader discussion={discussion} />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <DiscussionContent discussion={discussion} />
            </div>
            <div className="lg:col-span-1">
              <DiscussionSidebar discussion={discussion} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}