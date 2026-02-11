import { MessageSquare, TrendingUp, Clock, Users, ArrowUp, Pin, Crown, Filter, Search } from 'lucide-react'
import Link from 'next/link'

export default function CommunityContent() {
  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex flex-wrap gap-3">
          <button className="bg-[#13b6ec] text-white font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            All Discussions
          </button>
          <button className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Funding
          </button>
          <button className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Product
          </button>
          <button className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Marketing
          </button>
          <button className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Tech
          </button>
          <button className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Legal
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
            <Crown className="w-4 h-4" />
            Pro+ Only
          </button>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search discussions..."
              className="w-full pl-12 pr-4 py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <option>Latest</option>
              <option>Most Popular</option>
              <option>Most Replies</option>
              <option>Oldest</option>
            </select>
            <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Pinned Discussions */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Pin className="w-5 h-5" />
          PINNED_DISCUSSIONS
        </h2>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 border-3 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-500 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Pin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <Link href="/community/welcome-new-members" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors">
                  Welcome to FoundersPrime Community - Start Here!
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  New to the community? Read this first to understand our guidelines, get tips for success, and learn how to make the most of your membership.
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span>By FoundersPrime Team</span>
                  <span>•</span>
                  <span>247 replies</span>
                  <span>•</span>
                  <span>12.5k views</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Pin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <Link href="/community/monthly-funding-roundup" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors">
                  January 2026 Funding Roundup - $2.3B Raised
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Monthly summary of startup funding rounds, trends, and insights. Share your funding news and celebrate with the community!
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span>By Sarah Chen</span>
                  <span>•</span>
                  <span>89 replies</span>
                  <span>•</span>
                  <span>4.2k views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          RECENT_DISCUSSIONS
        </h2>
        
        <div className="space-y-4">
          {/* Discussion 1 */}
          <div className="border-3 border-gray-300 p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold border border-blue-500">FUNDING</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <Link href="/community/seed-round-preparation" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors block mb-2">
                  How to prepare for a seed round in 2026?
                </Link>
                <p className="text-sm text-gray-600 mb-3">
                  I'm preparing for our seed round and wondering what investors are looking for in 2026. 
                  Any recent experiences or tips from founders who've raised recently?
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By John Doe</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      23 replies
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      1.2k views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">
                      <ArrowUp className="w-3 h-3" />
                      47
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion 2 */}
          <div className="border-3 border-gray-300 p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="text-white font-bold">MK</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold border border-green-500">PRODUCT</span>
                  <span className="text-xs text-gray-500">4 hours ago</span>
                </div>
                <Link href="/community/mvp-validation-strategies" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors block mb-2">
                  Best strategies for MVP validation in B2B SaaS
                </Link>
                <p className="text-sm text-gray-600 mb-3">
                  We've built our MVP and are ready to validate with potential customers. What are the most effective 
                  validation strategies you've used for B2B SaaS products?
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By Maria Kim</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      15 replies
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      892 views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">
                      <ArrowUp className="w-3 h-3" />
                      32
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion 3 - Pro+ Only */}
          <div className="border-3 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] hover:shadow-[1px_1px_0px_0px_rgba(234,179,8,1)] transition-all bg-yellow-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="text-white font-bold">AS</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold border border-black flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    PRO+ ONLY
                  </span>
                  <span className="text-xs text-gray-500">6 hours ago</span>
                </div>
                <Link href="/community/enterprise-sales-playbook" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors block mb-2">
                  Enterprise sales playbook - $1M+ deals
                </Link>
                <p className="text-sm text-gray-600 mb-3">
                  Sharing my playbook for closing enterprise deals over $1M. This is the exact process we used to land 
                  our biggest customers. Pro+ members only discussion.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By Alex Smith</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      67 replies
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      2.1k views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">
                      <ArrowUp className="w-3 h-3" />
                      89
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion 4 */}
          <div className="border-3 border-gray-300 p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="text-white font-bold">LW</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs font-bold border border-purple-500">MARKETING</span>
                  <span className="text-xs text-gray-500">8 hours ago</span>
                </div>
                <Link href="/community/content-marketing-roi" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors block mb-2">
                  Measuring content marketing ROI for early-stage startups
                </Link>
                <p className="text-sm text-gray-600 mb-3">
                  How do you measure the ROI of content marketing when you're still in the early stages? 
                  Looking for practical metrics and tools that actually work.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By Lisa Wang</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      12 replies
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      654 views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">
                      <ArrowUp className="w-3 h-3" />
                      28
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion 5 */}
          <div className="border-3 border-gray-300 p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:shadow-[1px_1px_0px_0px_rgba(107,114,128,1)] transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="text-white font-bold">RT</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 text-xs font-bold border border-indigo-500">TECH</span>
                  <span className="text-xs text-gray-500">12 hours ago</span>
                </div>
                <Link href="/community/scaling-infrastructure" className="text-lg font-bold text-black hover:text-[#13b6ec] transition-colors block mb-2">
                  Scaling infrastructure from 10k to 1M users
                </Link>
                <p className="text-sm text-gray-600 mb-3">
                  We're approaching 10k users and need to plan for scaling to 1M+. What are the key infrastructure 
                  decisions we should make now to avoid major rewrites later?
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By Robert Taylor</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      34 replies
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      1.8k views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">
                      <ArrowUp className="w-3 h-3" />
                      56
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Load More Discussions
          </button>
        </div>
      </section>
    </div>
  )
}