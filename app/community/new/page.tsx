import { Metadata } from 'next'
import NewDiscussionHeader from '../../../components/new-discussion/NewDiscussionHeader'
import NewDiscussionContent from '../../../components/new-discussion/NewDiscussionContent'
import NewDiscussionSidebar from '../../../components/new-discussion/NewDiscussionSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Start New Discussion | FoundersPrime Community',
  description: 'Start a new discussion in the FoundersPrime community. Share your questions, insights, and connect with fellow founders.',
}

export default function NewDiscussionPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <NewDiscussionHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <NewDiscussionContent />
            </div>
            <div className="lg:col-span-1">
              <NewDiscussionSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}