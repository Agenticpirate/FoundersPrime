import { Users, MessageSquare, TrendingUp, Crown, Plus } from 'lucide-react'
import Link from 'next/link'

export default function CommunityHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-[#13b6ec] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Community</span>
      </div>

      {/* Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-[#13b6ec] border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold font-mono text-black mb-3">
              COMMUNITY_HUB
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Connect with fellow founders, share insights, ask questions, and learn from the experiences 
              of successful entrepreneurs in our vibrant community.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Start Discussion
            </button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Members</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">12,847</p>
            <p className="text-sm text-blue-600">Active founders</p>
          </div>

          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Discussions</span>
            </div>
            <p className="text-2xl font-bold text-green-800">3,429</p>
            <p className="text-sm text-green-600">Total topics</p>
          </div>

          <div className="bg-purple-50 border-3 border-purple-500 p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">This Week</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">247</p>
            <p className="text-sm text-purple-600">New posts</p>
          </div>

          <div className="bg-yellow-50 border-3 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">Pro+ Only</span>
            </div>
            <p className="text-2xl font-bold text-yellow-800">89</p>
            <p className="text-sm text-yellow-600">Exclusive topics</p>
          </div>
        </div>

        {/* Mobile Start Discussion Button */}
        <div className="md:hidden mt-6">
          <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Start Discussion
          </button>
        </div>

        {/* Community Guidelines Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">Community Guidelines:</span> Be respectful, stay on topic, and help fellow founders succeed. 
            <Link href="/community/guidelines" className="text-[#13b6ec] hover:underline ml-1">
              Read full guidelines →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}