export default function BlogHero() {
  const featuredPost = {
    title: 'The Complete Guide to Startup Funding in 2024',
    excerpt: 'Everything you need to know about raising capital, from pre-seed to Series A. We break down the latest trends, investor expectations, and actionable strategies for founders.',
    author: 'Alex Chen',
    date: '2024-01-08',
    readTime: '12 min read',
    category: 'Funding',
    image: '/api/placeholder/800/400',
    slug: 'complete-guide-startup-funding-2024'
  }

  return (
    <div className="mb-12">
      {/* Featured Post */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm overflow-hidden hover:translate-y-[-2px] transition-transform">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="bg-gray-100 border-r-3 border-black h-64 lg:h-auto flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">article</span>
              <p className="font-mono text-sm text-gray-500">Featured Article</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
                FEATURED
              </span>
              <span className="px-3 py-1 bg-white text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
                {featuredPost.category}
              </span>
            </div>
            
            <h2 className="font-mono text-2xl font-bold text-black mb-4 leading-tight">
              {featuredPost.title}
            </h2>
            
            <p className="font-sans text-gray-700 mb-6 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 bg-gray-200 border-2 border-black rounded-sm flex items-center justify-center">
                    <span className="font-bold text-sm text-gray-600">A</span>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-black">{featuredPost.author}</p>
                    <p className="font-sans text-xs text-gray-500">{featuredPost.date}</p>
                  </div>
                </div>
                <div className="text-gray-400">•</div>
                <span className="font-sans text-sm text-gray-500">{featuredPost.readTime}</span>
              </div>
              
              <a 
                href={`/blog/${featuredPost.slug}`}
                className="px-6 py-2 bg-black text-white font-mono font-bold rounded-sm hover:bg-gray-800 transition-colors"
              >
                Read Article
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary mb-1">247</div>
          <div className="font-sans text-sm text-gray-600">Articles Published</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary mb-1">50K+</div>
          <div className="font-sans text-sm text-gray-600">Monthly Readers</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary mb-1">12</div>
          <div className="font-sans text-sm text-gray-600">Expert Contributors</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary mb-1">4.8</div>
          <div className="font-sans text-sm text-gray-600">Average Rating</div>
        </div>
      </div>
    </div>
  )
}