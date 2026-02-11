interface BlogPost {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  slug: string
  featured: boolean
  comments: number
  likes: number
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm overflow-hidden hover:translate-y-[-2px] transition-transform">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Image Placeholder */}
        <div className="bg-gray-100 border-r-3 border-black h-48 md:h-auto flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">article</span>
            <p className="font-mono text-xs text-gray-500">{post.category}</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:col-span-2 p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            {post.featured && (
              <span className="px-2 py-1 bg-yellow-400 text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
                FEATURED
              </span>
            )}
            <span className="px-2 py-1 bg-white text-black font-mono text-xs font-bold rounded-sm border-2 border-black">
              {post.category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="font-mono text-xl font-bold text-black mb-3 leading-tight hover:text-primary transition-colors">
            <a href={`/blog/${post.slug}`}>
              {post.title}
            </a>
          </h3>
          
          {/* Excerpt */}
          <p className="font-sans text-gray-700 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-gray-200 border-2 border-black rounded-sm flex items-center justify-center">
                  <span className="font-bold text-sm text-gray-600">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-black">{post.author}</p>
                  <p className="font-sans text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
              <div className="text-gray-400">•</div>
              <span className="font-sans text-sm text-gray-500">{post.readTime}</span>
            </div>
            
            {/* Engagement */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-gray-400">favorite</span>
                <span className="font-mono text-sm text-gray-600">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-gray-400">comment</span>
                <span className="font-mono text-sm text-gray-600">{post.comments}</span>
              </div>
              <a 
                href={`/blog/${post.slug}`}
                className="px-4 py-2 bg-black text-white font-mono text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors"
              >
                Read
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}