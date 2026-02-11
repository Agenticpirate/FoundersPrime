import { ArrowLeft, MessageSquare, ArrowUp, Eye, Clock, Crown, Share, Bookmark, Flag } from 'lucide-react'
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

export default function DiscussionHeader({ discussion }: Props) {
  return (
    <div className="mb-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#13b6ec] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Community
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-[#13b6ec] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/community" className="hover:text-[#13b6ec] transition-colors">
          Community
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Discussion</span>
      </div>

      {/* Discussion Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        {/* Category and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm font-bold border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              discussion.category === 'FUNDING' ? 'bg-blue-100 text-blue-800' :
              discussion.category === 'PRODUCT' ? 'bg-green-100 text-green-800' :
              discussion.category === 'MARKETING' ? 'bg-purple-100 text-purple-800' :
              discussion.category === 'TECH' ? 'bg-indigo-100 text-indigo-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {discussion.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {discussion.createdAt}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
              <Share className="w-4 h-4" />
              Share
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
              <Flag className="w-4 h-4" />
              Report
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold font-mono text-black mb-6">
          {discussion.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-500 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <span className="text-white font-bold">{discussion.author.avatar}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link href={`/community/profile/${discussion.author.name.toLowerCase().replace(' ', '-')}`} className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                {discussion.author.name}
              </Link>
              {discussion.author.memberType === 'Pro+' && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
              <span className={`px-2 py-1 text-xs font-bold border border-black ${
                discussion.author.memberType === 'Pro+' ? 'bg-yellow-100 text-yellow-800' :
                discussion.author.memberType === 'Pro' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {discussion.author.memberType} MEMBER
              </span>
            </div>
            <p className="text-sm text-gray-600">{discussion.author.points.toLocaleString()} points</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUp className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Upvotes</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{discussion.upvotes}</p>
          </div>

          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Replies</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{discussion.replies}</p>
          </div>

          <div className="bg-purple-50 border-3 border-purple-500 p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">Views</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">{discussion.views.toLocaleString()}</p>
          </div>

          <div className="bg-yellow-50 border-3 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">Activity</span>
            </div>
            <p className="text-sm font-bold text-yellow-800">2 hours ago</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {discussion.tags.map((tag, index) => (
            <Link 
              key={index}
              href={`/community?tag=${tag}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 text-sm border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}