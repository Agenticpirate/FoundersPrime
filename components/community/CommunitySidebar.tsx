import { Trophy, Star, TrendingUp, Users, MessageSquare, Crown, Calendar, HelpCircle, FileText, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CommunitySidebar() {
  return (
    <div className="space-y-6">
      {/* Top Contributors */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          TOP_CONTRIBUTORS
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href="/community/profile/sarah-chen" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                  Sarah Chen
                </Link>
                <Crown className="w-4 h-4 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-600">2,847 points • Pro+ Member</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">MR</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href="/community/profile/mike-rodriguez" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                  Mike Rodriguez
                </Link>
                <Star className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">2,156 points • Pro Member</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">EJ</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href="/community/profile/emily-johnson" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                  Emily Johnson
                </Link>
              </div>
              <p className="text-xs text-gray-600">1,923 points • Pro Member</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">DL</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href="/community/profile/david-lee" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                  David Lee
                </Link>
              </div>
              <p className="text-xs text-gray-600">1,687 points • Pro+ Member</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">AW</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href="/community/profile/anna-wilson" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                  Anna Wilson
                </Link>
              </div>
              <p className="text-xs text-gray-600">1,542 points • Pro Member</p>
            </div>
          </div>
        </div>

        <Link 
          href="/community/leaderboard"
          className="block mt-4 text-center text-sm text-[#13b6ec] hover:underline"
        >
          View Full Leaderboard →
        </Link>
      </div>

      {/* Trending Topics */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          TRENDING_TOPICS
        </h3>
        <div className="space-y-3">
          <Link href="/community/topic/ai-integration" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black">#ai-integration</span>
              <span className="text-xs text-gray-500">247 posts</span>
            </div>
          </Link>

          <Link href="/community/topic/fundraising-2026" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black">#fundraising-2026</span>
              <span className="text-xs text-gray-500">189 posts</span>
            </div>
          </Link>

          <Link href="/community/topic/remote-team" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black">#remote-team</span>
              <span className="text-xs text-gray-500">156 posts</span>
            </div>
          </Link>

          <Link href="/community/topic/product-market-fit" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black">#product-market-fit</span>
              <span className="text-xs text-gray-500">134 posts</span>
            </div>
          </Link>

          <Link href="/community/topic/saas-metrics" className="block p-3 bg-gray-50 border-2 border-gray-300 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black">#saas-metrics</span>
              <span className="text-xs text-gray-500">98 posts</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          COMMUNITY_STATS
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Members</span>
            <span className="text-sm font-bold">12,847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Active Today</span>
            <span className="text-sm font-bold text-green-600">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Discussions</span>
            <span className="text-sm font-bold">3,429</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Replies</span>
            <span className="text-sm font-bold">28,947</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Pro+ Members</span>
            <span className="text-sm font-bold text-yellow-600">2,156</span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">This Week</span>
            </div>
            <p className="text-xs text-blue-700">
              247 new discussions, 1,892 replies, 89 new members joined
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          UPCOMING_EVENTS
        </h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-2 border-green-500 p-3 shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-bold text-green-800">Jan 15, 2026</span>
            </div>
            <p className="text-sm text-green-700 font-medium">Founder AMA with YC Partner</p>
            <p className="text-xs text-green-600">2:00 PM EST • Virtual</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-500 p-3 shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-bold text-blue-800">Jan 22, 2026</span>
            </div>
            <p className="text-sm text-blue-700 font-medium">Fundraising Workshop</p>
            <p className="text-xs text-blue-600">6:00 PM EST • Pro+ Only</p>
          </div>

          <div className="bg-purple-50 border-2 border-purple-500 p-3 shadow-[2px_2px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-bold text-purple-800">Jan 29, 2026</span>
            </div>
            <p className="text-sm text-purple-700 font-medium">Monthly Networking</p>
            <p className="text-xs text-purple-600">7:00 PM EST • All Members</p>
          </div>
        </div>

        <Link 
          href="/community/events"
          className="block mt-4 text-center text-sm text-[#13b6ec] hover:underline"
        >
          View All Events →
        </Link>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          COMMUNITY_LINKS
        </h3>
        <div className="space-y-3">
          <Link 
            href="/community/guidelines"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Community Guidelines
          </Link>
          <Link 
            href="/community/faq"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Community FAQ
          </Link>
          <Link 
            href="/community/moderation"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Shield className="w-4 h-4" />
            Report Content
          </Link>
          <Link 
            href="/contact"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Contact Moderators
          </Link>
        </div>
      </div>

      {/* Pro+ Upgrade */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="text-center">
          <div className="bg-yellow-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-black mb-2">
            Unlock Pro+ Features
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Access exclusive discussions, priority support, and advanced community features.
          </p>
          <div className="space-y-2 text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-3 h-3 text-yellow-600" />
              <span>Exclusive Pro+ discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-yellow-600" />
              <span>Priority in events</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-yellow-600" />
              <span>Direct access to experts</span>
            </div>
          </div>
          <Link 
            href="/pricing"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 block text-center"
          >
            Upgrade to Pro+
          </Link>
        </div>
      </div>
    </div>
  )
}