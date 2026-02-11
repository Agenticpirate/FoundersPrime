import BlogCard from '@/components/blog/BlogCard'

export default function BlogGrid() {
  const posts = [
    {
      title: 'How to Validate Your Startup Idea in 30 Days',
      excerpt: 'A step-by-step framework for testing your startup concept before you build anything. Learn the exact process we used to validate 50+ ideas.',
      author: 'Sarah Kim',
      date: '2024-01-07',
      readTime: '8 min read',
      category: 'Product',
      slug: 'validate-startup-idea-30-days',
      featured: false,
      comments: 24,
      likes: 156
    },
    {
      title: 'The $500K Mistake: Why Most Startups Fail at Fundraising',
      excerpt: 'Common fundraising mistakes that cost founders millions. Based on analysis of 1,000+ pitch decks and investor feedback.',
      author: 'Marcus Johnson',
      date: '2024-01-06',
      readTime: '10 min read',
      category: 'Funding',
      slug: 'fundraising-mistakes-cost-millions',
      featured: false,
      comments: 42,
      likes: 289
    },
    {
      title: 'Building a $10M ARR SaaS: Lessons from Stripe\'s Early Days',
      excerpt: 'Inside look at how Stripe scaled from idea to $10M ARR. Key strategies, pivotal decisions, and lessons for modern SaaS founders.',
      author: 'Elena Rodriguez',
      date: '2024-01-05',
      readTime: '15 min read',
      category: 'Founder Stories',
      slug: 'stripe-10m-arr-lessons',
      featured: true,
      comments: 67,
      likes: 445
    },
    {
      title: 'The Ultimate Guide to Product-Market Fit',
      excerpt: 'How to know when you\'ve achieved product-market fit and what to do next. Includes frameworks from successful founders.',
      author: 'David Park',
      date: '2024-01-04',
      readTime: '12 min read',
      category: 'Product',
      slug: 'ultimate-guide-product-market-fit',
      featured: false,
      comments: 38,
      likes: 234
    },
    {
      title: 'Growth Hacking Tactics That Actually Work in 2024',
      excerpt: 'Proven growth strategies from companies that scaled to millions of users. No BS, just tactics that work.',
      author: 'Lisa Wang',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Growth',
      slug: 'growth-hacking-tactics-2024',
      featured: false,
      comments: 31,
      likes: 198
    },
    {
      title: 'Legal Mistakes That Kill Startups (And How to Avoid Them)',
      excerpt: 'The most common legal pitfalls that destroy startups. Essential knowledge for every founder, from incorporation to IP protection.',
      author: 'Alex Chen',
      date: '2024-01-02',
      readTime: '11 min read',
      category: 'Legal',
      slug: 'legal-mistakes-kill-startups',
      featured: false,
      comments: 19,
      likes: 167
    },
    {
      title: 'From Idea to $1M Revenue: A Complete Roadmap',
      excerpt: 'The exact playbook we used to help 100+ startups reach their first million in revenue. Step-by-step guide with templates.',
      author: 'Sarah Kim',
      date: '2024-01-01',
      readTime: '18 min read',
      category: 'Operations',
      slug: 'idea-to-1m-revenue-roadmap',
      featured: true,
      comments: 89,
      likes: 567
    },
    {
      title: 'The Psychology of Successful Founders',
      excerpt: 'What separates successful founders from the rest? Deep dive into the mindset, habits, and traits of unicorn founders.',
      author: 'Marcus Johnson',
      date: '2023-12-30',
      readTime: '7 min read',
      category: 'Founder Stories',
      slug: 'psychology-successful-founders',
      featured: false,
      comments: 45,
      likes: 312
    },
    {
      title: 'Marketing on a $0 Budget: 15 Proven Strategies',
      excerpt: 'How to build a marketing engine without spending a dime. Real examples from bootstrapped startups that reached millions.',
      author: 'Elena Rodriguez',
      date: '2023-12-29',
      readTime: '13 min read',
      category: 'Marketing',
      slug: 'marketing-zero-budget-strategies',
      featured: false,
      comments: 56,
      likes: 389
    }
  ]

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-mono text-xl font-bold text-black">
            Latest Articles
          </h2>
          <p className="font-sans text-sm text-gray-600">
            Showing {posts.length} of 247 articles
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-gray-600">Page 1 of 28</span>
        </div>
      </div>
      
      {/* Posts Grid */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <button className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono font-bold rounded-sm transition-colors disabled:opacity-50" disabled>
          Previous
        </button>
        
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 border-2 border-black font-mono font-bold rounded-sm transition-colors ${
                page === 1
                  ? 'bg-primary text-black'
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-4 py-2 text-gray-400">...</span>
          <button className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono font-bold rounded-sm transition-colors">
            28
          </button>
        </div>
        
        <button className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono font-bold rounded-sm transition-colors">
          Next
        </button>
      </div>
    </div>
  )
}