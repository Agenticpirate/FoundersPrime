interface BlogPost {
  title: string
  excerpt: string
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

interface BlogPostHeaderProps {
  post: BlogPost
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-mono mb-6">
        <a href="/" className="text-gray-500 hover:text-black transition-colors">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <a href="/blog" className="text-gray-500 hover:text-black transition-colors">
          Blog
        </a>
        <span className="text-gray-400">/</span>
        <span className="text-black font-bold">{post.category}</span>
      </nav>
      
      {/* Article Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 mb-8">
        {/* Tags and Category */}
        <div className="flex items-center gap-3 mb-4">
          {post.featured && (
            <span className="px-3 py-1 bg-yellow-400 text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
              FEATURED
            </span>
          )}
          <span className="px-3 py-1 bg-primary text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
            {post.category}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="font-mono text-4xl font-bold text-black mb-4 leading-tight">
          {post.title}
        </h1>
        
        {/* Excerpt */}
        <p className="font-sans text-lg text-gray-700 mb-6 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* Author and Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-gray-200 border-2 border-black rounded-sm flex items-center justify-center">
              <span className="font-bold text-lg text-gray-600">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-black">{post.author}</p>
              <p className="font-sans text-sm text-gray-600">{post.authorRole}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="font-sans text-sm text-gray-500">{post.date}</span>
                <span className="text-gray-400">•</span>
                <span className="font-sans text-sm text-gray-500">{post.readTime}</span>
              </div>
            </div>
          </div>
          
          {/* Engagement Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">visibility</span>
              <span className="font-mono text-sm text-gray-600">{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">favorite</span>
              <span className="font-mono text-sm text-gray-600">{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">comment</span>
              <span className="font-mono text-sm text-gray-600">{post.comments}</span>
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="mt-6 pt-6 border-t-2 border-gray-100">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
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
      </div>
    </div>
  )
}