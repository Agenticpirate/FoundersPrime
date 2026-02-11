import { User, MessageSquare, TrendingUp, Clock, Crown, Star, Users, Calendar, HelpCircle, Flag } from 'lucide-react'
import Link from 'next/link'

interface Discussion {
  id: number
  title: string
  category: string
  author: {
    name: string
    avatar: string
    memberType: string
    points: number
  }
  content: string
  createdAt: string
  upvotes: number
  replies: number
  views: number
  tags: string[]
}

interface Props {
  discussion: Discussion
}

export default function DiscussionSidebar({ discussion }: Props) {
  return (
    <div className="space-y-6">
      {/* Author Profile */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          AUTHOR_PROFILE
        </h3>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">{discussion.author.avatar}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Link href={`/community/profile/${discussion.author.name.toLowerCase().replace(' ', '-')}`} className="font-bold text-black hover:text-[#13b6ec] transition-colors">
              {discussion.author.name}
            </Link>
            {discussion.author.memberType === 'Pro+' && (
              <Crown className="w-4 h-4 text-yellow-500" />
            )}
          </div>
          
          <div className={`inline-block px-3 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-3 ${
            discussion.author.memberType === 'Pro+' ? 'bg-yellow-100 text-yellow-800' :
            discussion.author.memberType === 'Pro' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {discussion.author.memberType} MEMBER
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Points:</span>
              <span className="font-bold">{discussion.author.points.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discussions:</span>
              <span className="font-bold">47</span>
            </div>
            <div className="flex justify-between">
              <span>Replies:</span>
              <span className="font-bold">234</span>
            </div>
            <div className="flex justify-between">
              <span>Joined:</span>
              <span className="font-bold">Mar 2025</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Link 
              href={`/community/profile/${discussion.author.name.toLowerCase().replace(' ', '-')}`}
              className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 block text-center"
            >
              View Profile
            </Link>
            <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Discussion Stats */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          DISCUSSION_STATS
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Created</span>
            <span className="text-sm font-bold">{discussion.createdAt}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Last Activity</span>
            <span className="text-sm font-bold text-green-600">20 min ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Views</span>
            <span className="text-sm font-bold">{discussion.views.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Unique Viewers</span>
            <span className="text-sm font-bold">847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Participants</span>
            <span className="text-sm font-bold">12</span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">Trending</span>
            </div>
            <p className="text-xs text-blue-700">
              This discussion is trending in the Funding category
            </p>
          </div>
        </div>
      </div>

      {/* Related Discussions */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          RELATED_DISCUSSIONS
        </h3>
        
        <div className="space-y-4">
          <Link href="/community/series-a-preparation" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <h4 className="font-bold text-black text-sm mb-1">Series A preparation checklist</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>34 replies</span>
              <span>•</span>
              <span>2.1k views</span>
            </div>
          </Link>

          <Link href="/community/investor-pitch-mistakes" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <h4 className="font-bold text-black text-sm mb-1">Common pitch deck mistakes to avoid</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>28 replies</span>
              <span>•</span>
              <span>1.8k views</span>
            </div>
          </Link>

          <Link href="/community/valuation-expectations" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <h4 className="font-bold text-black text-sm mb-1">Realistic valuation expectations for SaaS</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>45 replies</span>
              <span>•</span>
              <span>3.2k views</span>
            </div>
          </Link>

          <Link href="/community/due-diligence-process" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <h4 className="font-bold text-black text-sm mb-1">What to expect during due diligence</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>19 replies</span>
              <span>•</span>
              <span>1.4k views</span>
            </div>
          </Link>
        </div>

        <Link 
          href="/community?category=funding"
          className="block mt-4 text-center text-sm text-[#13b6ec] hover:underline"
        >
          View All Funding Discussions →
        </Link>
      </div>

      {/* Active Participants */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          ACTIVE_PARTICIPANTS
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-black text-sm">Sarah Chen</span>
                <Crown className="w-3 h-3 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-600">3 replies • 24 upvotes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">MR</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-black text-sm">Mike Rodriguez</span>
                <Star className="w-3 h-3 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">2 replies • 18 upvotes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">EJ</span>
            </div>
            <div className="flex-1">
              <span className="font-bold text-black text-sm">Emily Johnson</span>
              <p className="text-xs text-gray-600">1 reply • 12 upvotes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">DL</span>
            </div>
            <div className="flex-1">
              <span className="font-bold text-black text-sm">David Lee</span>
              <p className="text-xs text-gray-600">1 reply • 8 upvotes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          COMMUNITY_HELP
        </h3>
        
        <div className="space-y-3">
          <Link 
            href="/community/guidelines"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Community Guidelines
          </Link>
          <Link 
            href="/community/faq"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Community FAQ
          </Link>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors">
            <Flag className="w-4 h-4" />
            Report Discussion
          </button>
          <Link 
            href="/contact"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Contact Moderators
          </Link>
        </div>
      </div>

      {/* Discussion Activity */}
      <div className="bg-green-50 border-3 border-green-500 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] p-6">
        <div className="text-center">
          <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-green-800 mb-2">
            Active Discussion
          </h3>
          <p className="text-sm text-green-700 mb-4">
            This discussion has been very active with 23 replies in the last 2 hours. 
            Join the conversation!
          </p>
          <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-green-800">23</p>
                <p className="text-xs text-green-600">Replies Today</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-800">12</p>
                <p className="text-xs text-green-600">Participants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}