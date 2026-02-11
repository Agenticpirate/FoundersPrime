import Link from 'next/link'
import { Crown, Shield, Award } from 'lucide-react'

interface UserProfileLinkProps {
  username: string
  displayName: string
  avatar: string
  badge?: 'PRO' | 'PRO+' | 'VERIFIED' | 'ADMIN'
  points?: number
  showPoints?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function UserProfileLink({ 
  username, 
  displayName, 
  avatar, 
  badge, 
  points,
  showPoints = false,
  size = 'md'
}: UserProfileLinkProps) {
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

  const sizeClasses = {
    sm: {
      avatar: 'w-8 h-8 p-1 text-sm',
      name: 'text-sm',
      badge: 'px-1 py-0.5 text-xs',
      points: 'text-xs'
    },
    md: {
      avatar: 'w-10 h-10 p-2 text-sm',
      name: 'text-base',
      badge: 'px-2 py-1 text-xs',
      points: 'text-sm'
    },
    lg: {
      avatar: 'w-12 h-12 p-3 text-base',
      name: 'text-lg',
      badge: 'px-2 py-1 text-sm',
      points: 'text-base'
    }
  }

  const IconComponent = getBadgeIcon(badge)

  return (
    <Link 
      href={`/u/${username}`}
      className="inline-flex items-center gap-3 group hover:bg-gray-50 p-2 rounded transition-colors"
    >
      <div className={`bg-[#13b6ec] border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center flex-shrink-0 ${sizeClasses[size].avatar}`}>
        <span className="text-white font-bold">{avatar}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-black group-hover:text-[#13b6ec] transition-colors truncate ${sizeClasses[size].name}`}>
            {displayName}
          </span>
          {badge && (
            <div className={`flex items-center gap-1 font-bold border-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${getBadgeColor(badge)} ${sizeClasses[size].badge}`}>
              {IconComponent && <IconComponent className="w-3 h-3" />}
              <span>{badge}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-gray-600 ${sizeClasses[size].points}`}>@{username}</span>
          {showPoints && points && (
            <>
              <span className="text-gray-400">•</span>
              <span className={`text-gray-600 ${sizeClasses[size].points}`}>{points.toLocaleString()} points</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}