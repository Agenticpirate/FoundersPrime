'use client'

import { Crown, Eye, Bold, Italic, Link as LinkIcon, Image, Code, List, Quote, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function NewDiscussionContent() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Discussion submitted:', { title, content, tags })
  }

  return (
    <div className="space-y-8">
      {/* Discussion Form */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6">
          CREATE_DISCUSSION
        </h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Discussion Title *
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or topic? Be specific and descriptive..."
              className="w-full p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-lg"
              maxLength={200}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/200 characters</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Category *
            </label>
            <select className="w-full p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <option value="">Select a category...</option>
              <option value="funding">💰 Funding & Investment</option>
              <option value="product">🚀 Product Development</option>
              <option value="marketing">📈 Marketing & Growth</option>
              <option value="tech">⚡ Technology & Engineering</option>
              <option value="legal">⚖️ Legal & Compliance</option>
              <option value="hiring">👥 Hiring & Team Building</option>
              <option value="general">💬 General Discussion</option>
              <option value="pro-plus" disabled className="text-gray-400">👑 Pro+ Exclusive (Upgrade Required)</option>
            </select>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Discussion Content *
            </label>
            
            {/* Formatting Toolbar */}
            <div className="bg-gray-100 border-3 border-black p-3 flex flex-wrap gap-2 mb-0">
              <button type="button" className="bg-white hover:bg-gray-50 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Bold className="w-4 h-4" />
              </button>
              <button type="button" className="bg-white hover:bg-gray-50 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Italic className="w-4 h-4" />
              </button>
              <button type="button" className="bg-white hover:bg-gray-50 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                <LinkIcon className="w-4 h-4" />
              </button>
              <button type="button" className="bg-white hover:bg-gray-50 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                <List className="w-4 h-4" />
              </button>
              <button type="button" className="bg-white hover:bg-gray-50 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Quote className="w-4 h-4" />
              </button>
              <button type="button" className="bg-white hover:bg-gray-50 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Code className="w-4 h-4" />
              </button>
              <button type="button" className="bg-yellow-400 hover:bg-yellow-300 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1">
                <Image className="w-4 h-4" />
                <Crown className="w-3 h-3" />
              </button>
            </div>
            
            <textarea 
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your question, experience, or insights with the community. Be detailed and provide context to get the best responses.

Tips for great discussions:
• Explain your situation and what you've tried
• Ask specific questions
• Share relevant metrics or data
• Be open to different perspectives"
              className="w-full p-4 border-3 border-black border-t-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
              maxLength={5000}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">{content.length}/5000 characters</p>
              <button 
                type="button" 
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-[#13b6ec] hover:underline"
              >
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Tags (Optional)
            </label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add relevant tags separated by commas (e.g., saas, b2b, fundraising)"
              className="w-full p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Tags help others find your discussion. Maximum 5 tags.</p>
          </div>

          {/* Discussion Settings */}
          <div className="bg-gray-50 border-3 border-gray-300 p-6 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <h3 className="text-lg font-bold text-black mb-4">Discussion Settings</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                <div>
                  <span className="font-bold text-black">Notify me of replies</span>
                  <p className="text-sm text-gray-600">Get email notifications when someone replies to your discussion</p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                <div>
                  <span className="font-bold text-black">Allow anonymous feedback</span>
                  <p className="text-sm text-gray-600">Let members provide feedback without revealing their identity</p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" defaultChecked />
                <div>
                  <span className="font-bold text-black">Enable voting</span>
                  <p className="text-sm text-gray-600">Allow community members to upvote/downvote your discussion</p>
                </div>
              </label>

              <div className="bg-yellow-50 border-2 border-yellow-500 p-4 shadow-[2px_2px_0px_0px_rgba(234,179,8,1)]">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="w-5 h-5 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-0.5" disabled />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-800">Pro+ Exclusive Discussion</span>
                      <Crown className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-sm text-yellow-700">Only Pro+ members can view and reply to this discussion</p>
                    <p className="text-xs text-yellow-600 mt-1">Upgrade to Pro+ to unlock this feature</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t-3 border-gray-200">
            <div className="flex items-center gap-4">
              <button type="button" className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                Save Draft
              </button>
              <button 
                type="button" 
                onClick={() => setShowPreview(!showPreview)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
            </div>
            
            <button type="submit" className="bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-8 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Post Discussion
            </button>
          </div>
        </form>
      </section>

      {/* Discussion Preview */}
      <section className={`bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 ${showPreview ? 'block' : 'hidden'}`} id="preview-section">
        <h2 className="text-2xl font-bold font-mono text-black mb-6">
          DISCUSSION_PREVIEW
        </h2>
        
        <div className="bg-gray-50 border-3 border-gray-300 p-6 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-bold border-2 border-blue-500">
              FUNDING
            </span>
            <span className="text-sm text-gray-500">Just now</span>
          </div>
          
          <h3 className="text-xl font-bold text-black mb-4">
            {title || 'Your discussion title will appear here'}
          </h3>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-blue-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-white font-bold">YU</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-black">Your Name</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold border border-blue-500">
                  PRO MEMBER
                </span>
              </div>
              <p className="text-sm text-gray-600">1,247 points</p>
            </div>
          </div>
          
          <div className="prose max-w-none mb-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {content || 'Your discussion content will be displayed here with proper formatting...'}
            </p>
          </div>
          
          {tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.split(',').map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-bold border border-gray-400">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>0 replies</span>
            <span>•</span>
            <span>1 view</span>
            <span>•</span>
            <span>0 upvotes</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            type="button" 
            onClick={() => setShowPreview(false)}
            className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Close Preview
          </button>
        </div>
      </section>

      {/* Community Guidelines Reminder */}
      <section className="bg-red-50 border-3 border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] p-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-red-800 mb-2">Community Guidelines Reminder</h3>
            <ul className="text-sm text-red-700 space-y-1 mb-4">
              <li>• Be respectful and constructive in all interactions</li>
              <li>• No spam, self-promotion, or off-topic content</li>
              <li>• Protect confidential information and respect NDAs</li>
              <li>• Use appropriate language and maintain professionalism</li>
              <li>• Search before posting to avoid duplicate discussions</li>
            </ul>
            <p className="text-sm text-red-700">
              Violations may result in discussion removal or account suspension. 
              <Link href="/community/guidelines" className="text-[#13b6ec] hover:underline ml-1">
                Read full guidelines →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}