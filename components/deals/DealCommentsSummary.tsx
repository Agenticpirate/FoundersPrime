import { MessageSquare, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

interface DealCommentsSummaryProps {
  dealSlug: string
  commentCount: number
  recentActivity?: string
  trending?: boolean
}

export default function DealCommentsSummary({ 
  dealSlug, 
  commentCount, 
  recentActivity = '2 hours ago',
  trending = false 
}: DealCommentsSummaryProps) {
  return (
    <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#13b6ec]" />
          <span className="font-bold text-black">Community Discussion</span>
          {trending && (
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-bold border border-yellow-500">
              <TrendingUp className="w-3 h-3" />
              <span>TRENDING</span>
            </div>
          )}
        </div>
        <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-bold border border-black">
          {commentCount} comments
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <Clock className="w-4 h-4" />
        <span>Last activity: {recentActivity}</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="text-sm">
          <span className="font-bold text-black">Sarah Chen:</span>
          <span className="text-gray-700 ml-1">"Just got approved for the full $100k! The key is to be very specific..."</span>
        </div>
        <div className="text-sm">
          <span className="font-bold text-black">Mike Rodriguez:</span>
          <span className="text-gray-700 ml-1">"Thanks for the tip! Did you apply through the Founders tier..."</span>
        </div>
      </div>
      
      <Link 
        href={`/deals/${dealSlug}#comments`}
        className="block w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-2 px-4 text-center border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
      >
        Join Discussion
      </Link>
    </div>
  )
}