import { Crown, MessageSquare, Users, TrendingUp, Award, Calendar, Target, Zap } from 'lucide-react'
import Link from 'next/link'

interface User {
  username: string
  displayName: string
  avatar: string
  badge: 'PRO' | 'PRO+' | 'VERIFIED' | 'ADMIN'
  title: string
  location: string
  website?: string
  twitter?: string
  linkedin?: string
  joinedDate: string
  bio: string
  stats: {
    points: number
    discussions: number
    comments: number
    helpfulAnswers: number
    dealsApplied: number
    creditsSecured: string
  }
  badges: Array<{
    name: string
    icon: string
    description: string
  }>
}

interface UserProfileSidebarProps {
  user: User
}

export default function UserProfileSidebar({ user }: UserProfileSidebarProps) {
  const membershipLevel = user.badge === 'PRO+' ? 'Pro+' : user.badge === 'PRO' ? 'Pro' : 'Free'
  const membershipColor = user.badge === 'PRO+' ? 'yellow' : user.badge === 'PRO' ? 'blue' : 'gray'

  return (
    <div className="space-y-6">
      {/* Membership Status */}
      <section className={`bg-${membershipColor}-50 border-3 border-${membershipColor}-500 shadow-[6px_6px_0px_0px_rgba(${membershipColor === 'yellow' ? '234,179,8' : membershipColor === 'blue' ? '59,130,246' : '107,114,128'},1)] p-6`}>
        <div className="flex items-center gap-2 mb-4">
          {user.badge === 'PRO+' && <Crown className="w-5 h-5 text-yellow-600" />}
          {user.badge === 'PRO' && <Award className="w-5 h-5 text-blue-600" />}
          <h3 className={`text-lg font-bold font-mono text-${membershipColor}-800`}>
            {membershipLevel.toUpperCase()}_MEMBER
          </h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-bold text-${membershipColor}-800`}>Member Since</span>
            <span className={`text-sm text-${membershipColor}-700`}>{user.joinedDate}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm font-bold text-${membershipColor}-800`}>Community Points</span>
            <span className={`text-sm text-${membershipColor}-700`}>{user.stats.points.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm font-bold text-${membershipColor}-800`}>Reputation Level</span>
            <span className={`text-sm text-${membershipColor}-700`}>
              {user.stats.points > 2000 ? 'Expert' : user.stats.points > 1000 ? 'Advanced' : 'Contributor'}
            </span>
          </div>
        </div>

        {user.badge === 'PRO+' && (
          <div className="mt-4 pt-4 border-t-2 border-yellow-300">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-800">Pro+ Benefits</span>
            </div>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Exclusive deal access</li>
              <li>• Priority support</li>
              <li>• Advanced analytics</li>
              <li>• Pro+ community</li>
            </ul>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          QUICK_STATS
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Discussions Started</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">{user.stats.discussions}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Comments Posted</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">{user.stats.comments}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Helpful Answers</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">{user.stats.helpfulAnswers}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Deals Applied</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">{user.stats.dealsApplied}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Credits Secured</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">{user.stats.creditsSecured}</span>
          </div>
        </div>
      </section>

      {/* Achievement Highlights */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          ACHIEVEMENTS
        </h3>
        
        <div className="space-y-3">
          {user.badges.slice(0, 3).map((badge, index) => (
            <div key={index} className="bg-gray-50 border-2 border-gray-300 p-3 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-bold text-gray-800">{badge.name}</span>
              </div>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button className="w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-4 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            View All Badges
          </button>
        </div>
      </section>

      {/* Community Ranking */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          COMMUNITY_RANKING
        </h3>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#13b6ec] mb-1">
              #{user.stats.points > 2000 ? '12' : user.stats.points > 1000 ? '47' : '156'}
            </div>
            <div className="text-sm font-bold text-gray-600">Overall Ranking</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50 border-2 border-blue-500 p-2">
              <div className="text-lg font-bold text-blue-800">#3</div>
              <div className="text-xs font-bold text-blue-600">This Month</div>
            </div>
            <div className="bg-green-50 border-2 border-green-500 p-2">
              <div className="text-lg font-bold text-green-800">#7</div>
              <div className="text-xs font-bold text-green-600">This Week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Actions */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          CONNECT
        </h3>
        
        <div className="space-y-3">
          <button className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Send Message
          </button>
          
          <button className="w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Follow Updates
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Connect with {user.displayName} to collaborate and share insights
          </p>
        </div>
      </section>

      {/* Similar Profiles */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          SIMILAR_PROFILES
        </h3>
        
        <div className="space-y-3">
          <Link href="/u/mike-rodriguez" className="block group">
            <div className="bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 p-3 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-[#13b6ec] border-2 border-black p-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <span className="text-white font-bold text-sm">MR</span>
                </div>
                <div>
                  <div className="font-bold text-black text-sm">Mike Rodriguez</div>
                  <div className="text-xs text-gray-600">CTO at DataSync</div>
                </div>
              </div>
            </div>
          </Link>
          
          <div className="bg-gray-50 border-2 border-gray-300 p-3 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex items-center gap-3">
              <div className="bg-[#13b6ec] border-2 border-black p-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                <span className="text-white font-bold text-sm">JP</span>
              </div>
              <div>
                <div className="font-bold text-black text-sm">Jennifer Park</div>
                <div className="text-xs text-gray-600">Product Manager</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Link 
            href="/community"
            className="block w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-4 text-sm text-center border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Browse Community
          </Link>
        </div>
      </section>
    </div>
  )
}