import { MapPin, Globe, Twitter, Linkedin, Calendar, Crown, Shield, Star, ArrowLeft } from 'lucide-react'
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

interface UserProfileHeaderProps {
  user: User
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'PRO+': return 'bg-yellow-400 text-yellow-900 border-yellow-600'
    case 'PRO': return 'bg-blue-400 text-blue-900 border-blue-600'
    case 'VERIFIED': return 'bg-green-400 text-green-900 border-green-600'
    case 'ADMIN': return 'bg-red-400 text-red-900 border-red-600'
    default: return 'bg-gray-200 text-gray-800 border-gray-400'
  }
}

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {

  return (
    <div className="mb-4 md:mb-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#13b6ec] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Deals
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-[#13b6ec] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/deals" className="hover:text-[#13b6ec] transition-colors">
          Deals
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">@{user.username}</span>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-2 md:border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 md:p-8">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 md:gap-6">
            <div className="bg-[#13b6ec] border-2 md:border-[3px] border-black p-4 md:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
              <span className="text-white font-bold text-2xl md:text-3xl">{user.avatar}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold font-mono text-black break-words">
                  {user.displayName}
                </h1>
                <span className={`px-2.5 md:px-3 py-0.5 md:py-1 text-xs md:text-sm font-bold border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${getBadgeColor(user.badge)}`}>
                  {user.badge}
                </span>
              </div>

              <p className="text-gray-600 text-base md:text-lg mb-2">@{user.username}</p>
              <p className="text-gray-800 font-medium text-sm md:text-base mb-3 md:mb-4">{user.title}</p>

              {/* Location and Links */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {user.joinedDate}</span>
                </div>
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#13b6ec] hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
                {user.twitter && (
                  <a
                    href={`https://twitter.com/${user.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#13b6ec] hover:underline"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>{user.twitter}</span>
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${user.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#13b6ec] hover:underline"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

              {/* Bio */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {user.bio}
              </p>

              {/* Achievement Badges */}
              <div className="flex flex-wrap gap-3">
                {user.badges.map((badge, index) => (
                  <div
                    key={badge.name}
                    className="bg-gray-50 border-2 border-gray-300 p-3 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] group hover:shadow-[4px_4px_0px_0px_rgba(107,114,128,1)] transition-all"
                    title={badge.description}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{badge.icon}</span>
                      <span className="text-sm font-bold text-gray-800">{badge.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-5 md:mt-6 pt-5 md:pt-8 border-t-2 md:border-t-[3px] border-gray-200">
          <h3 className="text-base md:text-lg font-bold font-mono text-black mb-3 md:mb-4">
            COMMUNITY_STATS
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 md:gap-4">
            <div className="bg-blue-50 border-2 md:border-[3px] border-blue-500 p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] text-center">
              <div className="text-xl md:text-2xl font-bold text-blue-800 mb-1">{user.stats.points.toLocaleString()}</div>
              <div className="text-[10px] md:text-xs font-bold text-blue-600 uppercase">Points</div>
            </div>

            <div className="bg-green-50 border-2 md:border-[3px] border-green-500 p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)] text-center">
              <div className="text-xl md:text-2xl font-bold text-green-800 mb-1">{user.stats.discussions}</div>
              <div className="text-[10px] md:text-xs font-bold text-green-600 uppercase">Discussions</div>
            </div>

            <div className="bg-yellow-50 border-2 md:border-[3px] border-yellow-500 p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] text-center">
              <div className="text-xl md:text-2xl font-bold text-yellow-800 mb-1">{user.stats.comments}</div>
              <div className="text-[10px] md:text-xs font-bold text-yellow-600 uppercase">Comments</div>
            </div>

            <div className="bg-purple-50 border-2 md:border-[3px] border-purple-500 p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)] text-center">
              <div className="text-xl md:text-2xl font-bold text-purple-800 mb-1">{user.stats.helpfulAnswers}</div>
              <div className="text-[10px] md:text-xs font-bold text-purple-600 uppercase">Helpful</div>
            </div>

            <div className="bg-red-50 border-2 md:border-[3px] border-red-500 p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(239,68,68,1)] text-center">
              <div className="text-xl md:text-2xl font-bold text-red-800 mb-1">{user.stats.dealsApplied}</div>
              <div className="text-[10px] md:text-xs font-bold text-red-600 uppercase">Deals Applied</div>
            </div>

            <div className="bg-gray-50 border-2 md:border-[3px] border-gray-500 p-3 md:p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{user.stats.creditsSecured}</div>
              <div className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">Credits Secured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}