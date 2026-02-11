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

interface BlogPostSidebarProps {
  post: BlogPost
}

export default function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  const relatedPosts = [
    {
      title: 'The $500K Mistake: Why Most Startups Fail at Fundraising',
      slug: 'fundraising-mistakes-cost-millions',
      category: 'Funding',
      readTime: '10 min read',
      date: '2024-01-06'
    },
    {
      title: 'Building a $10M ARR SaaS: Lessons from Stripe\'s Early Days',
      slug: 'stripe-10m-arr-lessons',
      category: 'Founder Stories',
      readTime: '15 min read',
      date: '2024-01-05'
    },
    {
      title: 'The Ultimate Guide to Product-Market Fit',
      slug: 'ultimate-guide-product-market-fit',
      category: 'Product',
      readTime: '12 min read',
      date: '2024-01-04'
    }
  ]

  const tableOfContents = [
    { title: 'Why Validation Matters', anchor: '#why-validation-matters' },
    { title: 'The 30-Day Framework', anchor: '#30-day-framework' },
    { title: 'Week 1: Problem Validation', anchor: '#week-1' },
    { title: 'Week 2: Solution Validation', anchor: '#week-2' },
    { title: 'Week 3: Market Validation', anchor: '#week-3' },
    { title: 'Week 4: Demand Validation', anchor: '#week-4' },
    { title: 'Validation Methods', anchor: '#validation-methods' },
    { title: 'Common Mistakes', anchor: '#common-mistakes' },
    { title: 'Tools for Validation', anchor: '#tools' },
    { title: 'Measuring Success', anchor: '#measuring-success' },
    { title: 'What to Do After', anchor: '#after-validation' },
    { title: 'Case Study', anchor: '#case-study' }
  ]

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 sticky top-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item, index) => (
            <a
              key={index}
              href={item.anchor}
              className="block font-sans text-sm text-gray-700 hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Get More Like This
        </h3>
        <p className="font-sans text-sm text-gray-700 mb-4">
          Join 25,000+ founders getting actionable startup advice every week.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-3 py-2 border-2 border-black rounded-sm font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_#1a1a1a]"
          />
          <button className="w-full px-4 py-2 bg-black text-white font-mono font-bold rounded-sm hover:bg-gray-800 transition-colors">
            Subscribe
          </button>
        </div>
        <p className="font-sans text-xs text-gray-500 mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Article Stats */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Article Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-600">Views</span>
            <span className="font-mono text-sm font-bold text-black">{post.views}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-600">Likes</span>
            <span className="font-mono text-sm font-bold text-black">{post.likes}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-600">Comments</span>
            <span className="font-mono text-sm font-bold text-black">{post.comments}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-600">Reading Time</span>
            <span className="font-mono text-sm font-bold text-black">{post.readTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-600">Published</span>
            <span className="font-mono text-sm font-bold text-black">{post.date}</span>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Related Articles
        </h3>
        <div className="space-y-4">
          {relatedPosts.map((relatedPost, index) => (
            <div key={index} className="border-b-2 border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <a 
                href={`/blog/${relatedPost.slug}`}
                className="block hover:text-primary transition-colors"
              >
                <h4 className="font-mono text-sm font-bold text-black mb-2 leading-tight">
                  {relatedPost.title}
                </h4>
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded-sm font-mono">
                  {relatedPost.category}
                </span>
                <span>{relatedPost.readTime}</span>
                <span>•</span>
                <span>{relatedPost.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <a 
            href={`/blog/category/${post.category.toLowerCase()}`}
            className="font-mono text-sm text-primary hover:text-black transition-colors"
          >
            View all {post.category} articles →
          </a>
        </div>
      </div>

      {/* Share Article */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Share This Article
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
            <span className="material-symbols-outlined text-sm">alternate_email</span>
            <span className="font-mono text-xs">Twitter</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
            <span className="material-symbols-outlined text-sm">work</span>
            <span className="font-mono text-xs">LinkedIn</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
            <span className="material-symbols-outlined text-sm">link</span>
            <span className="font-mono text-xs">Copy Link</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors">
            <span className="material-symbols-outlined text-sm">email</span>
            <span className="font-mono text-xs">Email</span>
          </button>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'startup', 'funding', 'validation', 'mvp', 'product-market-fit',
            'customer-interviews', 'growth', 'saas', 'bootstrapping'
          ].map((tag, index) => (
            <a
              key={index}
              href={`/blog/tag/${tag}`}
              className="px-3 py-1 bg-gray-100 hover:bg-primary/20 border-2 border-black rounded-sm font-mono text-xs transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-primary border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 text-center">
        <h3 className="font-mono text-lg font-bold text-black mb-3">
          Found This Helpful?
        </h3>
        <p className="font-sans text-sm text-gray-800 mb-4">
          Get access to our complete startup resource library with 500+ guides, templates, and tools.
        </p>
        <button className="w-full px-4 py-2 bg-black text-white font-mono font-bold rounded-sm hover:bg-gray-800 transition-colors mb-2">
          Upgrade to Pro
        </button>
        <p className="font-sans text-xs text-gray-700">
          14-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  )
}