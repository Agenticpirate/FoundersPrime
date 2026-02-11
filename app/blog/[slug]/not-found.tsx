import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BlogPostNotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
            <div className="mb-6">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4 block">article</span>
              <h1 className="font-mono text-3xl font-bold text-black mb-2">
                Article Not Found
              </h1>
              <p className="font-sans text-gray-600">
                The blog post you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/blog"
                className="block w-full px-6 py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all"
              >
                Browse All Articles
              </Link>
              <Link 
                href="/"
                className="block w-full px-6 py-3 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono font-bold rounded-sm transition-all"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}