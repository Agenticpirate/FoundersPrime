export default function BlogSidebar() {
  const popularPosts = [
    {
      title: 'The Complete Guide to Startup Funding in 2024',
      slug: 'complete-guide-startup-funding-2024',
      views: '12.5K',
      date: '2024-01-08'
    },
    {
      title: 'Building a $10M ARR SaaS: Lessons from Stripe\'s Early Days',
      slug: 'stripe-10m-arr-lessons',
      views: '8.9K',
      date: '2024-01-05'
    },
    {
      title: 'From Idea to $1M Revenue: A Complete Roadmap',
      slug: 'idea-to-1m-revenue-roadmap',
      views: '7.2K',
      date: '2024-01-01'
    },
    {
      title: 'Marketing on a $0 Budget: 15 Proven Strategies',
      slug: 'marketing-zero-budget-strategies',
      views: '6.8K',
      date: '2023-12-29'
    }
  ]

  const categories = [
    { name: 'Funding', count: 42 },
    { name: 'Growth', count: 38 },
    { name: 'Product', count: 35 },
    { name: 'Founder Stories', count: 29 },
    { name: 'Marketing', count: 26 },
    { name: 'Operations', count: 24 },
    { name: 'Legal', count: 18 },
    { name: 'Industry Insights', count: 15 }
  ]

  const authors = [
    { name: 'Alex Chen', posts: 45, role: 'Founder & CEO' },
    { name: 'Sarah Kim', posts: 38, role: 'Co-founder & CTO' },
    { name: 'Marcus Johnson', posts: 32, role: 'Head of Product' },
    { name: 'Elena Rodriguez', posts: 28, role: 'Head of Growth' }
  ]

  return (
    <div className="space-y-8">
      {/* Newsletter Signup - Mobile */}
      <div className="lg:hidden bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Get Weekly Insights
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
      </div>

      {/* Popular Posts */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Most Popular
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={index} className="border-b-2 border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <a 
                href={`/blog/${post.slug}`}
                className="block hover:text-primary transition-colors"
              >
                <h4 className="font-mono text-sm font-bold text-black mb-2 leading-tight">
                  {post.title}
                </h4>
              </a>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-gray-500">{post.date}</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-gray-400">visibility</span>
                  <span className="font-mono text-xs text-gray-600">{post.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <span className="font-mono text-sm text-black">{category.name}</span>
              <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-sm">
                {category.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Top Authors */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Top Authors
        </h3>
        <div className="space-y-4">
          {authors.map((author, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="size-10 bg-gray-200 border-2 border-black rounded-sm flex items-center justify-center">
                <span className="font-bold text-sm text-gray-600">
                  {author.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-mono text-sm font-bold text-black">{author.name}</p>
                <p className="font-sans text-xs text-gray-500">{author.role}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-bold text-primary">{author.posts}</p>
                <p className="font-sans text-xs text-gray-500">articles</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'startup', 'funding', 'saas', 'growth', 'marketing', 'product',
            'founder', 'venture-capital', 'bootstrapping', 'mvp', 'scaling',
            'fundraising', 'pitch-deck', 'product-market-fit', 'customer-acquisition'
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

      {/* Archive */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Archive
        </h3>
        <div className="space-y-2">
          {[
            { month: 'January 2024', count: 12 },
            { month: 'December 2023', count: 15 },
            { month: 'November 2023', count: 18 },
            { month: 'October 2023', count: 14 },
            { month: 'September 2023', count: 16 }
          ].map((archive, index) => (
            <a
              key={index}
              href={`/blog/archive/${archive.month.toLowerCase().replace(' ', '-')}`}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <span className="font-mono text-sm text-black">{archive.month}</span>
              <span className="font-mono text-xs text-gray-500">({archive.count})</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}