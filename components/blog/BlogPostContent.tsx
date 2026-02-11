'use client'

import { useState } from 'react'

interface BlogPost {
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  authorBio: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  likes: number
  comments: number
  views: string
  slug: string
}

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Convert markdown-like content to HTML (simplified)
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="font-mono text-3xl font-bold text-black mb-6 mt-8 first:mt-0">{line.slice(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="font-mono text-2xl font-bold text-black mb-4 mt-8">{line.slice(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="font-mono text-xl font-bold text-black mb-3 mt-6">{line.slice(4)}</h3>
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-sans text-lg font-bold text-black mb-4">{line.slice(2, -2)}</p>
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="font-sans text-gray-700 mb-2 ml-6">{line.slice(2)}</li>
        }
        if (line.trim() === '') {
          return <br key={index} />
        }
        return <p key={index} className="font-sans text-gray-700 mb-4 leading-relaxed">{line}</p>
      })
  }

  return (
    <div>
      {/* Social Share Bar */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-sm font-mono text-sm font-bold transition-colors ${
                liked ? 'bg-red-100 text-red-600' : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              <span className="material-symbols-outlined text-sm">favorite</span>
              {liked ? 'Liked' : 'Like'}
            </button>
            
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-sm font-mono text-sm font-bold transition-colors ${
                bookmarked ? 'bg-primary/20 text-primary' : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              <span className="material-symbols-outlined text-sm">bookmark</span>
              {bookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-600">Share:</span>
            <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
              <span className="material-symbols-outlined text-sm">link</span>
            </button>
            <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
            </button>
            <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
              <span className="material-symbols-outlined text-sm">work</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <article className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          {formatContent(post.content)}
        </div>
      </article>
      
      {/* Author Bio */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 mb-8">
        <h3 className="font-mono text-lg font-bold text-black mb-4">About the Author</h3>
        <div className="flex items-start gap-4">
          <div className="size-16 bg-gray-200 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-xl text-gray-600">
              {post.author.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-mono text-lg font-bold text-black mb-1">{post.author}</h4>
            <p className="font-mono text-sm text-primary font-bold mb-3">{post.authorRole}</p>
            <p className="font-sans text-sm text-gray-700 leading-relaxed mb-4">{post.authorBio}</p>
            <div className="flex gap-3">
              <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                <span className="material-symbols-outlined text-sm">work</span>
              </button>
              <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-mono text-lg font-bold text-black">
            Comments ({post.comments})
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-600">Sort by:</span>
            <select className="px-3 py-1 border-2 border-black rounded-sm font-mono text-sm bg-white">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Liked</option>
            </select>
          </div>
        </div>
        
        {/* Add Comment Form */}
        <div className="mb-8 p-4 bg-gray-50 border-2 border-black rounded-sm">
          <textarea
            placeholder="Share your thoughts..."
            className="w-full p-3 border-2 border-black rounded-sm font-sans text-sm resize-none focus:outline-none focus:shadow-[2px_2px_0px_0px_#1a1a1a]"
            rows={3}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="font-sans text-xs text-gray-500">
              Be respectful and constructive in your comments.
            </p>
            <button className="px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all">
              Post Comment
            </button>
          </div>
        </div>
        
        {/* Sample Comments */}
        <div className="space-y-6">
          {[
            {
              author: 'Jessica Martinez',
              role: 'Product Manager at Stripe',
              comment: 'This is incredibly comprehensive! The 30-day framework is exactly what I needed for my side project. The customer interview questions are particularly helpful.',
              date: '2 days ago',
              likes: 12,
              replies: 3
            },
            {
              author: 'David Chen',
              role: 'Founder at TechStart',
              comment: 'Great article! I wish I had this guide when I started my first company. The validation mistakes section really resonated with me - I made most of those errors.',
              date: '3 days ago',
              likes: 8,
              replies: 1
            },
            {
              author: 'Sarah Thompson',
              role: 'VC at Accel Partners',
              comment: 'From an investor perspective, this is spot on. Founders who come to us with proper validation data are much more likely to get funded. Bookmarking this to share with our portfolio.',
              date: '4 days ago',
              likes: 15,
              replies: 5
            }
          ].map((comment, index) => (
            <div key={index} className="border-b-2 border-gray-100 last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="size-10 bg-gray-200 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sm text-gray-600">
                    {comment.author.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-mono text-sm font-bold text-black">{comment.author}</h4>
                    <span className="font-sans text-xs text-gray-500">{comment.role}</span>
                    <span className="text-gray-400">•</span>
                    <span className="font-sans text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="font-sans text-sm text-gray-700 mb-3 leading-relaxed">
                    {comment.comment}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors">
                      <span className="material-symbols-outlined text-sm">thumb_up</span>
                      <span className="font-mono text-xs">{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors">
                      <span className="material-symbols-outlined text-sm">reply</span>
                      <span className="font-mono text-xs">Reply</span>
                    </button>
                    {comment.replies > 0 && (
                      <button className="font-mono text-xs text-primary hover:text-black transition-colors">
                        View {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Comments */}
        <div className="text-center mt-6">
          <button className="px-6 py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono font-bold rounded-sm transition-all">
            Load More Comments
          </button>
        </div>
      </div>
    </div>
  )
}