import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import UserProfileHeader from '../../../components/profile/UserProfileHeader'
import UserProfileContent from '../../../components/profile/UserProfileContent'
import UserProfileSidebar from '../../../components/profile/UserProfileSidebar'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

// Mock user data - in a real app, this would come from a database
const users = {
  'sarah-chen': {
    username: 'sarah-chen',
    displayName: 'Sarah Chen',
    avatar: 'SC',
    badge: 'PRO+' as const,
    title: 'Founder & CEO at TechFlow',
    location: 'San Francisco, CA',
    website: 'https://techflow.io',
    twitter: '@sarahchen',
    linkedin: 'sarah-chen-ceo',
    joinedDate: 'March 2023',
    bio: 'Building the future of workflow automation. Previously scaled 2 startups to $10M+ ARR. Passionate about helping fellow founders navigate the startup journey.',
    stats: {
      points: 2847,
      discussions: 47,
      comments: 234,
      helpfulAnswers: 89,
      dealsApplied: 23,
      creditsSecured: '$247k'
    },
    badges: [
      { name: 'Top Contributor', icon: '🏆', description: 'Top 1% community contributor' },
      { name: 'Deal Expert', icon: '💰', description: 'Helped 50+ founders with deals' },
      { name: 'Verified Founder', icon: '✅', description: 'Verified startup founder' },
      { name: 'Pro+ Member', icon: '👑', description: 'Pro+ subscription member' }
    ],
    recentActivity: [
      {
        type: 'comment' as const,
        title: 'Commented on AWS Activate',
        description: 'Just got approved for the full $100k! The key is to be very specific about your AWS usage plans...',
        timestamp: '2 hours ago',
        link: '/deals/aws-activate#comments'
      },
      {
        type: 'discussion' as const,
        title: 'Started discussion: SaaS Pricing Strategy Help',
        description: 'Looking for advice on pricing our B2B SaaS product. We\'re targeting mid-market companies...',
        timestamp: '1 day ago',
        link: '/community/saas-pricing-strategy'
      },
      {
        type: 'deal' as const,
        title: 'Applied to Google Cloud Credits',
        description: 'Successfully applied and received $200k in Google Cloud credits',
        timestamp: '3 days ago',
        link: '/deals/google-cloud-credits'
      }
    ],
    topDiscussions: [
      {
        title: 'SaaS Pricing Strategy Help',
        replies: 23,
        upvotes: 45,
        timestamp: '1 day ago',
        link: '/community/saas-pricing-strategy'
      },
      {
        title: 'Technical Co-founder Equity Split',
        replies: 18,
        upvotes: 32,
        timestamp: '1 week ago',
        link: '/community/technical-cofounder-equity'
      },
      {
        title: 'Fundraising Deck Feedback',
        replies: 31,
        upvotes: 67,
        timestamp: '2 weeks ago',
        link: '/community/fundraising-deck-feedback'
      }
    ],
    dealActivity: [
      {
        deal: 'AWS Activate',
        status: 'Approved' as const,
        value: '$100k',
        appliedDate: '2 weeks ago',
        link: '/deals/aws-activate'
      },
      {
        deal: 'Google Cloud Credits',
        status: 'Approved' as const,
        value: '$200k',
        appliedDate: '3 weeks ago',
        link: '/deals/google-cloud-credits'
      },
      {
        deal: 'Microsoft Azure',
        status: 'Pending' as const,
        value: '$150k',
        appliedDate: '1 week ago',
        link: '/deals/microsoft-azure'
      }
    ]
  },
  'mike-rodriguez': {
    username: 'mike-rodriguez',
    displayName: 'Mike Rodriguez',
    avatar: 'MR',
    badge: 'PRO' as const,
    title: 'CTO at DataSync',
    location: 'Austin, TX',
    website: 'https://datasync.co',
    twitter: '@mikerodriguez',
    linkedin: 'mike-rodriguez-cto',
    joinedDate: 'June 2023',
    bio: 'Full-stack developer turned founder. Building data infrastructure tools for modern startups. Love helping other technical founders with architecture decisions.',
    stats: {
      points: 1456,
      discussions: 28,
      comments: 156,
      helpfulAnswers: 42,
      dealsApplied: 15,
      creditsSecured: '$89k'
    },
    badges: [
      { name: 'Technical Expert', icon: '⚡', description: 'Top technical contributor' },
      { name: 'Community Helper', icon: '🤝', description: 'Helped 25+ founders' },
      { name: 'Pro Member', icon: '💎', description: 'Pro subscription member' }
    ],
    recentActivity: [
      {
        type: 'comment' as const,
        title: 'Replied to Sarah Chen on AWS Activate',
        description: 'Thanks for the tip! Did you apply through the Founders tier or Portfolio tier?',
        timestamp: '1 hour ago',
        link: '/deals/aws-activate#comments'
      },
      {
        type: 'discussion' as const,
        title: 'Started discussion: Best Tech Stack for MVP',
        description: 'What\'s the best tech stack for building an MVP in 2024? Looking for something fast and scalable...',
        timestamp: '2 days ago',
        link: '/community/best-tech-stack-mvp'
      }
    ],
    topDiscussions: [
      {
        title: 'Best Tech Stack for MVP',
        replies: 15,
        upvotes: 28,
        timestamp: '2 days ago',
        link: '/community/best-tech-stack-mvp'
      },
      {
        title: 'Database Choice for Startups',
        replies: 22,
        upvotes: 41,
        timestamp: '1 week ago',
        link: '/community/database-choice-startups'
      }
    ],
    dealActivity: [
      {
        deal: 'DigitalOcean Hatch',
        status: 'Approved' as const,
        value: '$10k',
        appliedDate: '1 month ago',
        link: '/deals/digitalocean-hatch'
      },
      {
        deal: 'Stripe Atlas',
        status: 'Approved' as const,
        value: '$5k credits',
        appliedDate: '2 months ago',
        link: '/deals/stripe-atlas'
      }
    ]
  }
}

interface PageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = users[params.username as keyof typeof users]
  
  if (!user) {
    return {
      title: 'User Not Found',
      description: 'The requested user profile could not be found.',
    }
  }

  return {
    title: `${user.displayName} (@${user.username})`,
    description: `View ${user.displayName}'s profile on FoundersPrime. ${user.bio}`,
  }
}

export default function UserProfilePage({ params }: PageProps) {
  const user = users[params.username as keyof typeof users]
  
  if (!user) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <UserProfileHeader user={user} />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <UserProfileContent user={user} />
            </div>
            <div className="lg:col-span-1">
              <UserProfileSidebar user={user} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(users).map((username) => ({
    username,
  }))
}