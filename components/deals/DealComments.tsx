'use client'

import { useState } from 'react'
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Flag, Crown, Shield, Clock, User } from 'lucide-react'
import Link from 'next/link'

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    badge?: 'PRO' | 'PRO+' | 'VERIFIED' | 'ADMIN'
    points: number
  }
  content: string
  timestamp: string
  upvotes: number
  downvotes: number
  replies: Comment[]
  isEdited?: boolean
  isPinned?: boolean
}

interface DealCommentsProps {
  dealId: string
  dealTitle: string
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC',
      badge: 'PRO+',
      points: 2847
    },
    content: 'Just got approved for the full $100k! The key is to be very specific about your AWS usage plans. I mentioned Lambda, RDS, and S3 with estimated monthly costs. Took exactly 5 days for approval.',
    timestamp: '2 hours ago',
    upvotes: 23,
    downvotes: 1,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'Mike Rodriguez',
          avatar: 'MR',
          badge: 'PRO',
          points: 1456
        },
        content: 'Thanks for the tip! Did you apply through the Founders tier or Portfolio tier?',
        timestamp: '1 hour ago',
        upvotes: 5,
        downvotes: 0,
        replies: []
      },
      {
        id: '1-2',
        author: {
          name: 'Sarah Chen',
          avatar: 'SC',
          badge: 'PRO+',
          points: 2847
        },
        content: 'I went with Portfolio tier since we\'re part of Techstars. Much higher approval rate and credit amount.',
        timestamp: '45 minutes ago',
        upvotes: 8,
        downvotes: 0,
        replies: []
      }
    ],
    isPinned: true
  },
  {
    id: '2',
    author: {
      name: 'Alex Thompson',
      avatar: 'AT',
      badge: 'VERIFIED',
      points: 892
    },
    content: 'Applied 3 weeks ago and still waiting. Anyone else experiencing delays? My application status still shows "Under Review".',
    timestamp: '4 hours ago',
    upvotes: 12,
    downvotes: 2,
    replies: [
      {
        id: '2-1',
        author: {
          name: 'Jennifer Park',
          avatar: 'JP',
          points: 634
        },
        content: 'Same here! Applied 2 weeks ago. I think they might be backed up due to high demand.',
        timestamp: '3 hours ago',
        upvotes: 7,
        downvotes: 0,
        replies: []
      }
    ]
  },
  {
    id: '3',
    author: {
      name: 'David Kim',
      avatar: 'DK',
      badge: 'PRO',
      points: 1923
    },
    content: 'Pro tip: Make sure your AWS account is set up properly before applying. I had to reapply because my account wasn\'t configured correctly. Also, having a detailed business plan helps a lot.',
    timestamp: '6 hours ago',
    upvotes: 18,
    downvotes: 0,
    replies: []
  },
  {
    id: '4',
    author: {
      name: 'Lisa Wang',
      avatar: 'LW',
      points: 445
    },
    content: 'Quick question - can you use these credits for Reserved Instances? The FAQ mentions some limitations but it\'s not entirely clear.',
    timestamp: '8 hours ago',
    upvotes: 9,
    downvotes: 1,
    replies: [
      {
        id: '4-1',
        author: {
          name: 'FoundersPrime Admin',
          avatar: 'FG',
          badge: 'ADMIN',
          points: 9999
        },
        content: 'AWS Activate credits generally cannot be used for Reserved Instances, Savings Plans, or some Marketplace purchases. They\'re primarily for on-demand usage of core AWS services.',
        timestamp: '7 hours ago',
        upvotes: 15,
        downvotes: 0,
        replies: [],
        isPinned: true
      }
    ]
  }
]

export default function DealComments({ dealId, dealTitle }: DealCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('popular')

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'YU',
        badge: 'PRO',
        points: 1247
      },
      content: newComment,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: []
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: {
        name: 'You',
        avatar: 'YU',
        badge: 'PRO',
        points: 1247
      },
      content: replyContent,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: []
    }

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] }
      }
      return comment
    }))

    setReplyContent('')
    setReplyingTo(null)
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'PRO+': return 'bg-yellow-400 text-yellow-900 border-yellow-600'
      case 'PRO': return 'bg-blue-400 text-blue-900 border-blue-600'
      case 'VERIFIED': return 'bg-green-400 text-green-900 border-green-600'
      case 'ADMIN': return 'bg-red-400 text-red-900 border-red-600'
      default: return 'bg-gray-200 text-gray-800 border-gray-400'
    }
  }

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      default:
        return 0
    }
  })

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : ''} ${comment.isPinned ? 'bg-yellow-50 border-yellow-500' : 'bg-white border-black'} border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6`}>
      {comment.isPinned && (
        <div className="flex items-center gap-2 mb-4 text-yellow-800">
          <Crown className="w-4 h-4" />
          <span className="text-xs font-bold uppercase">Pinned Comment</span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="bg-[#13b6ec] border-3 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
          <span className="text-white font-bold text-sm">{comment.author.avatar}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-black">{comment.author.name}</span>
            {comment.author.badge && (
              <span className={`px-2 py-1 text-xs font-bold border-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${getBadgeColor(comment.author.badge)}`}>
                {comment.author.badge}
              </span>
            )}
            <span className="text-sm text-gray-500">{comment.author.points} points</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{comment.timestamp}</span>
            {comment.isEdited && (
              <>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">edited</span>
              </>
            )}
          </div>
          
          <p className="text-gray-800 mb-4 leading-relaxed">{comment.content}</p>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.upvotes}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
              <ThumbsDown className="w-4 h-4" />
              <span>{comment.downvotes}</span>
            </button>
            {!isReply && (
              <button 
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#13b6ec] transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
              <Flag className="w-4 h-4" />
              <span>Report</span>
            </button>
          </div>
          
          {replyingTo === comment.id && (
            <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-3 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                rows={3}
              />
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="submit"
                  className="bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                >
                  Post Reply
                </button>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {comment.replies.length > 0 && (
        <div className="mt-6 space-y-4">
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section id="comments" className="scroll-mt-8">
      {/* Comments Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-[#13b6ec]" />
            <h3 className="text-2xl font-bold font-mono text-black">
              DEAL_COMMENTS
            </h3>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 text-sm font-bold border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              {comments.length} comments
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
              className="bg-white border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-3 py-1 text-sm font-bold"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm">
          Share your experience with <strong>{dealTitle}</strong> or ask questions to help other founders.
        </p>
      </div>

      {/* Add Comment Form */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h4 className="text-lg font-bold font-mono text-black mb-4">ADD_COMMENT</h4>
        
        <form onSubmit={handleSubmitComment}>
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-[#13b6ec] border-3 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
              <span className="text-white font-bold text-sm">YU</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience, ask questions, or provide tips for other founders..."
                className="w-full p-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">{newComment.length}/1000 characters</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>Notify me of replies</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>Post anonymously</span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-[#13b6ec] hover:bg-[#0ea5db] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>

      {/* Community Guidelines Notice */}
      <div className="bg-blue-50 border-3 border-blue-500 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-bold text-blue-800 text-sm mb-1">Community Guidelines</p>
            <p className="text-sm text-blue-700">
              Keep comments helpful and respectful. Share specific experiences and avoid promotional content. 
              <Link href="/community/guidelines" className="text-[#13b6ec] hover:underline ml-1">
                Read full guidelines →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-600 mb-2">No comments yet</h4>
            <p className="text-gray-500">Be the first to share your experience with this deal!</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {comments.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Load More Comments
          </button>
        </div>
      )}
    </section>
  )
}