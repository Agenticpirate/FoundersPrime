import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { flashDeals } from '@/data/flash-deals'
import FlashDealDetailContent from '@/components/flash/FlashDealDetailContent'
import PageBreadcrumb from '@/components/ui/PageBreadcrumb'

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return flashDeals.map((d) => ({ id: d.id }))
}

export async function generateMetadata({ params }: Props) {
  const deal = flashDeals.find((d) => d.id === params.id)
  if (!deal) return {}
  return {
    title: `${deal.name} — Flash Deal | FoundersPrime`,
    description: deal.longDescription || deal.description,
  }
}

export default function FlashDealDetailPage({ params }: Props) {
  const deal = flashDeals.find((d) => d.id === params.id)
  if (!deal) notFound()

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#000000] text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <Header />

      <main className="flex-1 relative z-10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-5">
          <PageBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Flash Deals', href: '/flash-deals' },
              { label: deal.name },
            ]}
          />
        </div>

        <FlashDealDetailContent deal={deal} />
      </main>

      <Footer />
    </div>
  )
}
