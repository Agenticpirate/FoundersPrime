import { Crown, TrendingUp, Users, MessageSquare, Clock, Star, BookOpen, HelpCircle, Zap, Target } from 'lucide-react'
import Link from 'next/link'

export default function NewDiscussionSidebar() {
  return (
    <div className="space-y-6">
      {/* Discussion Tips */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          DISCUSSION_TIPS
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Be Specific</p>
              <p className="text-xs text-gray-600">Clear, detailed questions get better responses</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-500 border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Share Context</p>
              <p className="text-xs text-gray-600">Include relevant background and what you've tried</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-yellow-500 border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Engage Back</p>
              <p className="text-xs text-gray-600">Reply to comments and mark helpful answers</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-red-500 border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Use Tags</p>
              <p className="text-xs text-gray-600">Help others find your discussion with relevant tags</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          POPULAR_CATEGORIES
        </h3>
        
        <div className="space-y-3">
          <Link href="/community?category=funding" className="block group">
            <div className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-500 p-3 shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(59,130,246,1)] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-800 text-sm">💰 Funding</span>
                <span className="text-xs text-blue-600">247 posts</span>
              </div>
            </div>
          </Link>

          <Link href="/community?category=product" className="block group">
            <div className="bg-green-50 hover:bg-green-100 border-2 border-green-500 p-3 shadow-[2px_2px_0px_0px_rgba(34,197,94,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(34,197,94,1)] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-800 text-sm">🚀 Product</span>
                <span className="text-xs text-green-600">189 posts</span>
              </div>
            </div>
          </Link>

          <Link href="/community?category=marketing" className="block group">
            <div className="bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-500 p-3 shadow-[2px_2px_0px_0px_rgba(234,179,8,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(234,179,8,1)] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-yellow-800 text-sm">📈 Marketing</span>
                <span className="text-xs text-yellow-600">156 posts</span>
              </div>
            </div>
          </Link>

          <Link href="/community?category=tech" className="block group">
            <div className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-500 p-3 shadow-[2px_2px_0px_0px_rgba(147,51,234,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(147,51,234,1)] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-800 text-sm">⚡ Technology</span>
                <span className="text-xs text-purple-600">134 posts</span>
              </div>
            </div>
          </Link>

          <Link href="/community?category=legal" className="block group">
            <div className="bg-red-50 hover:bg-red-100 border-2 border-red-500 p-3 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(239,68,68,1)] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-800 text-sm">⚖️ Legal</span>
                <span className="text-xs text-red-600">98 posts</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <Link 
            href="/community"
            className="text-sm text-[#13b6ec] hover:underline font-bold"
          >
            View All Categories →
          </Link>
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          COMMUNITY_STATS
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Total Discussions</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">2,847</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Active Members</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">1,234</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">Avg Response</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">2.4h</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-black">This Week</span>
            </div>
            <span className="text-sm font-bold text-[#13b6ec]">+127</span>
          </div>
        </div>
      </section>

      {/* Pro+ Features */}
      <section className="bg-yellow-50 border-3 border-yellow-500 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-bold font-mono text-yellow-800">
            PRO+_FEATURES
          </h3>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Priority visibility</span>
          </div>
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Exclusive categories</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Advanced formatting</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Direct expert access</span>
          </div>
        </div>

        <Link 
          href="/pricing"
          className="block w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-3 px-4 text-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
        >
          Upgrade to Pro+
        </Link>
      </section>

      {/* Recent Activity */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">
          RECENT_ACTIVITY
        </h3>
        
        <div className="space-y-4">
          <div className="pb-3 border-b border-gray-200">
            <Link href="/community/saas-pricing-strategy" className="block group">
              <p className="text-sm font-bold text-black group-hover:text-[#13b6ec] transition-colors mb-1">
                SaaS Pricing Strategy Help
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>by @sarah_founder</span>
                <span>•</span>
                <span>12 replies</span>
                <span>•</span>
                <span>2h ago</span>
              </div>
            </Link>
          </div>

          <div className="pb-3 border-b border-gray-200">
            <Link href="/community/technical-cofounder-equity" className="block group">
              <p className="text-sm font-bold text-black group-hover:text-[#13b6ec] transition-colors mb-1">
                Technical Co-founder Equity Split
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>by @mike_startup</span>
                <span>•</span>
                <span>8 replies</span>
                <span>•</span>
                <span>4h ago</span>
              </div>
            </Link>
          </div>

          <div className="pb-3 border-b border-gray-200">
            <Link href="/community/mvp-validation-tips" className="block group">
              <p className="text-sm font-bold text-black group-hover:text-[#13b6ec] transition-colors mb-1">
                MVP Validation Best Practices
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>by @alex_builder</span>
                <span>•</span>
                <span>15 replies</span>
                <span>•</span>
                <span>6h ago</span>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/community/fundraising-deck-feedback" className="block group">
              <p className="text-sm font-bold text-black group-hover:text-[#13b6ec] transition-colors mb-1">
                Fundraising Deck Feedback
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>by @jenny_ceo</span>
                <span>•</span>
                <span>23 replies</span>
                <span>•</span>
                <span>8h ago</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <Link 
            href="/community"
            className="text-sm text-[#13b6ec] hover:underline font-bold"
          >
            View All Discussions →
          </Link>
        </div>
      </section>

      {/* Help & Support */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold font-mono text-black">
            NEED_HELP?
          </h3>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/community/guidelines"
            className="block text-sm text-[#13b6ec] hover:underline"
          >
            Community Guidelines
          </Link>
          <Link 
            href="/community/faq"
            className="block text-sm text-[#13b6ec] hover:underline"
          >
            Community FAQ
          </Link>
          <Link 
            href="/contact"
            className="block text-sm text-[#13b6ec] hover:underline"
          >
            Contact Support
          </Link>
          <Link 
            href="/community/formatting-guide"
            className="block text-sm text-[#13b6ec] hover:underline"
          >
            Formatting Guide
          </Link>
        </div>
      </section>
    </div>
  )
}