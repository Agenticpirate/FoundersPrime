import ResourcesHeader from '@/components/resources/ResourcesHeader'
import ResourcesContent from '@/components/resources/ResourcesContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Founder Resources, Templates & Guides',
  description:
    'Free templates, guides, and tools for founders — pitch decks, financial models, legal docs, and growth playbooks to help you build and scale faster.',
  alternates: {
    canonical: 'https://www.foundersprime.com/resources',
  },
  openGraph: {
    type: 'website',
    title: 'Founder Resources, Templates & Guides',
    description:
      'Free templates, guides, and tools for founders — pitch decks, financial models, legal docs, and growth playbooks.',
    url: 'https://www.foundersprime.com/resources',
    siteName: 'FoundersPrime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Resources, Templates & Guides',
    description:
      'Free templates, guides, and tools for founders — pitch decks, financial models, legal docs, and growth playbooks.',
  },
}

export default function ResourcesPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <ResourcesHeader parentSection={{ name: 'Resources', href: '/resources' }} />
          <ResourcesContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}