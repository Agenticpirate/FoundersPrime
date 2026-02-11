import { MessageSquare, Bell, Crown } from 'lucide-react'
import Link from 'next/link'

interface DealCommentsNotificationProps {
  dealTitle: string
  dealSlug: string
  newComments: number
  isPro?: boolean
}

export default function DealCommentsNotification({ 
  dealTitle, 
  dealSlug, 
  newComments,
  isPro = false 
}: DealCommentsNotificationProps) {
  if (newComments === 0) return null

  return (
    <div className="bg-blue-50 border-3 border-blue-500 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-blue-800 text-sm">New Comments</span>
            {isPro && <Crown className="w-4 h-4 text-yellow-600" />}
          </div>
          <p className="text-sm text-blue-700 mb-2">
            <strong>{newComments}</strong> new comment{newComments > 1 ? 's' : ''} on <strong>{dealTitle}</strong>
          </p>
          <Link 
            href={`/deals/${dealSlug}#comments`}
            className="inline-flex items-center gap-1 text-sm text-[#13b6ec] hover:underline font-bold"
          >
            View Comments
            <MessageSquare className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}