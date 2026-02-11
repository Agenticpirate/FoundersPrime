import Link from 'next/link'
import { MapPin, MessageSquare, ThumbsUp, Crown, Shield, Award, Calendar } from 'lucide-react'

interface UserProfileCardProps {
  username: string
  displayName: string
  avatar: string
  badge?: 'PRO' | 'PRO+' | 'VERIFIED' | 'ADMIN'
  title: string
  location: string
  bio: string
  joinedDate: string
  stats: {
    points: number
    discussions: number
    helpfulAnswers: number
  }
  topBadge?: {
    name: string
    icon: string
  }
}

export default function UserProfileCard({ 
  username, 
  displayName, 
  avatar, 
  badge, 
  title, 
  location, 
  bio, 
  joinedDate,
  stats,
  topBadge
}: UserProfileCardProps) {
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'PRO+': return 'bg-yellow-400 text-yellow-900 border-yellow-600'
      case 'PRO': return 'bg-blue-400 text-blue-900 border-blue-600'
      case 'VERIFIED': return 'bg-green-400 text-green-900 border-green-600'
      case 'ADMIN': return 'bg-red-400 text-red-900 border-red-600'
      default: return 'bg-gray-200 text-gray-800 border-gray-400'
    }
  }

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case 'PRO+': return Crown
      case 'PRO': return Award
      case 'VERIFIED': return Shield
      case 'ADMIN': return Shield
      default: return null
    }
  }

  const IconComponent = getBadgeIcon(badge)

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all p-6 group">
      <div className="flex items-start gap-4 mb-4">
        <Link href={`/u/${username}`}>
          <div className="bg-[#13b6ec] border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <span className="text-white font-bold text-lg">{avatar}</span>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link 
              href={`/u/${username}`}
              className="font-bold text-black group-hover:text-[#13b6ec] transition-colors truncate"
            >
              {displayName}
            </Link>
            {badge && (
              <div className={`flex items-center gap-1 px-2 py-1 text-xs font-bold border-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${getBadgeColor(badge)}`}>
                {IconComponent && <IconComponent className="w-3 h-3" />}
                <span>{badge}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-1">@{username}</p>
          <p className="text-gray-800 font-medium text-sm mb-2">{title}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Joined {joinedDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
        {bio}
      </p>
      
      {topBadge && (
        <div className="bg-gray-50 border-2 border-gray-300 p-2 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">{topBadge.icon}</span>
            <span className="text-xs font-bold text-gray-800">{topBadge.name}</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-[#13b6ec]">{stats.points.toLocaleString()}</div>
          <div className="text-xs font-bold text-gray-600 uppercase">Points</div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#13b6ec]">{stats.discussions}</div>
          <div className="text-xs font-bold text-gray-600 uppercase">Discussions</div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#13b6ec]">{stats.helpfulAnswers}</div>
          <div className="text-xs font-bold text-gray-600 uppercase">Helpful</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t-2 border-gray-200">
        <Link 
          href={`/u/${username}`}
          className="block w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-2 px-4 text-center text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}