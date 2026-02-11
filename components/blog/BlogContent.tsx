import BlogGrid from '@/components/blog/BlogGrid'
import BlogSidebar from '@/components/blog/BlogSidebar'

export default function BlogContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <BlogGrid />
      </div>
      
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <BlogSidebar />
      </div>
    </div>
  )
}