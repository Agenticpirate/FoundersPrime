import IdeasHeader from '@/components/ideas/IdeasHeader'
import IdeasFilterBar from '@/components/ideas/IdeasFilterBar'
import IdeasContent from '@/components/ideas/IdeasContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function IdeasPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
          <IdeasHeader />
          <IdeasFilterBar />
          <IdeasContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}