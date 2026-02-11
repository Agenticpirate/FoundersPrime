import { ArrowUp, ArrowDown, MessageSquare, Reply, Crown, Clock, MoreHorizontal } from 'lucide-react'
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

export default function DiscussionContent({ discussion }: Props) {
  return (
    <div className="space-y-8">
      {/* Original Post */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex gap-6">
          {/* Voting */}
          <div className="flex flex-col items-center gap-2">
            <button className="bg-green-500 hover:bg-green-400 text-white p-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="font-bold text-lg">{discussion.upvotes}</span>
            <button className="bg-gray-200 hover:bg-gray-100 text-black p-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="prose max-w-none">
              {discussion.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t-2 border-gray-200">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
                <Reply className="w-4 h-4" />
                Reply
              </button>
              <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
                <MoreHorizontal className="w-4 h-4" />
                More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Replies Section */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-xl font-bold font-mono text-black mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          REPLIES ({discussion.replies})
        </h2>

        <div className="space-y-6">
          {/* Reply 1 */}
          <div className="border-3 border-gray-300 p-6 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex gap-4">
              {/* Voting */}
              <div className="flex flex-col items-center gap-1">
                <button className="bg-green-500 hover:bg-green-400 text-white p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm">24</span>
                <button className="bg-gray-200 hover:bg-gray-100 text-black p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Reply Content */}
              <div className="flex-1">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/community/profile/sarah-chen" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                      Sarah Chen
                    </Link>
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-bold border border-yellow-500">
                      PRO+ MEMBER
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      1 hour ago
                    </span>
                  </div>
                </div>

                {/* Reply Text */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Great question! I just closed our $2.5M seed round last month. Here are the key things investors focused on:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Unit economics and path to profitability</li>
                    <li>Market size and competitive differentiation</li>
                    <li>Team experience and domain expertise</li>
                    <li>Customer retention and satisfaction metrics</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Your metrics look solid! 50k MRR with 15% growth is impressive. I'd be happy to share our pitch deck template if you're interested.
                  </p>
                </div>

                {/* Reply Actions */}
                <div className="flex items-center gap-3">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1 text-sm">
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                  <button className="text-sm text-gray-500 hover:text-[#13b6ec] transition-colors">
                    Report
                  </button>
                </div>

                {/* Nested Reply */}
                <div className="mt-4 ml-6 border-l-3 border-gray-300 pl-4">
                  <div className="bg-gray-50 border-2 border-gray-300 p-4 shadow-[2px_2px_0px_0px_rgba(107,114,128,1)]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                        <span className="text-white font-bold text-xs">JD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-sm">John Doe</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold border border-blue-500">
                          PRO MEMBER
                        </span>
                        <span className="text-xs text-gray-500">30 minutes ago</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      @Sarah Chen That would be amazing! Could you DM me the template? Also, how long did your fundraising process take from start to finish?
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">Reply</button>
                      <span className="text-xs text-gray-400">•</span>
                      <button className="text-xs text-gray-500 hover:text-[#13b6ec] transition-colors">👍 5</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reply 2 */}
          <div className="border-3 border-gray-300 p-6 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex gap-4">
              {/* Voting */}
              <div className="flex flex-col items-center gap-1">
                <button className="bg-green-500 hover:bg-green-400 text-white p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm">18</span>
                <button className="bg-gray-200 hover:bg-gray-100 text-black p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Reply Content */}
              <div className="flex-1">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/community/profile/mike-rodriguez" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                      Mike Rodriguez
                    </Link>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold border border-blue-500">
                      PRO MEMBER
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      45 minutes ago
                    </span>
                  </div>
                </div>

                {/* Reply Text */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    From my experience raising a $1.8M seed round for our fintech startup, here are some additional tips:
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    1. <strong>Traction is king</strong> - Your 50k MRR is great, but show the trajectory and what's driving growth<br/>
                    2. <strong>Know your numbers cold</strong> - CAC, LTV, churn rate, gross margins<br/>
                    3. <strong>Have a clear use of funds</strong> - Break down exactly how you'll use the $2M<br/>
                    4. <strong>Warm introductions matter</strong> - Cold emails rarely work
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    Happy to hop on a call if you want to practice your pitch!
                  </p>
                </div>

                {/* Reply Actions */}
                <div className="flex items-center gap-3">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1 text-sm">
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                  <button className="text-sm text-gray-500 hover:text-[#13b6ec] transition-colors">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reply 3 */}
          <div className="border-3 border-gray-300 p-6 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex gap-4">
              {/* Voting */}
              <div className="flex flex-col items-center gap-1">
                <button className="bg-green-500 hover:bg-green-400 text-white p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm">12</span>
                <button className="bg-gray-200 hover:bg-gray-100 text-black p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Reply Content */}
              <div className="flex-1">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EJ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/community/profile/emily-johnson" className="font-bold text-black hover:text-[#13b6ec] transition-colors">
                      Emily Johnson
                    </Link>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold border border-blue-500">
                      PRO MEMBER
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      20 minutes ago
                    </span>
                  </div>
                </div>

                {/* Reply Text */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Don't forget about the legal side! Make sure you have:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Clean cap table with proper equity splits</li>
                    <li>All IP properly assigned to the company</li>
                    <li>Employee agreements and option pool set up</li>
                    <li>Basic corporate governance in place</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    Investors will do legal due diligence and any issues here can kill a deal fast.
                  </p>
                </div>

                {/* Reply Actions */}
                <div className="flex items-center gap-3">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1 text-sm">
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                  <button className="text-sm text-gray-500 hover:text-[#13b6ec] transition-colors">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More Replies */}
        <div className="mt-8 text-center">
          <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Load More Replies ({discussion.replies - 3} remaining)
          </button>
        </div>
      </section>

      {/* Add Reply Form */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h3 className="text-lg font-bold font-mono text-black mb-4">ADD_REPLY</h3>
        
        <div className="space-y-4">
          <textarea 
            rows={6}
            placeholder="Share your thoughts, experiences, or ask follow-up questions..."
            className="w-full p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span className="text-sm text-gray-700">Notify me of replies</span>
              </label>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                Preview
              </button>
              <button className="bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}