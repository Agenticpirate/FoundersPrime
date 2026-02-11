import BlogHeader from '@/components/blog/BlogHeader'
import BlogHero from '@/components/blog/BlogHero'
import BlogFilterBar from '@/components/blog/BlogFilterBar'
import BlogContent from '@/components/blog/BlogContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <BlogHeader />
          <BlogHero />
          <BlogFilterBar />
          <BlogContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}