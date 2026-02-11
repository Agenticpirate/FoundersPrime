export default function BlogHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-mono mb-6">
        <a href="/" className="text-gray-500 hover:text-black transition-colors">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <span className="text-black font-bold">Blog</span>
      </nav>
      
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-4xl font-bold text-black mb-2">
            FoundersPrime Blog
          </h1>
          <p className="font-sans text-lg text-gray-600">
            Insights, guides, and stories from the startup ecosystem
          </p>
        </div>
        
        {/* Newsletter Signup */}
        <div className="hidden lg:block">
          <div className="bg-primary/10 border-2 border-black rounded-sm p-4">
            <p className="font-mono text-sm font-bold text-black mb-2">
              Get Weekly Insights
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-3 py-2 border-2 border-black rounded-sm font-mono text-sm w-48 focus:outline-none focus:shadow-[2px_2px_0px_0px_#1a1a1a]"
              />
              <button className="px-4 py-2 bg-black text-white font-mono text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}