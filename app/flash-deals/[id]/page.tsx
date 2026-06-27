import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { flashDeals } from '@/data/flash-deals'
import FlashDealDetailContent from '@/components/flash/FlashDealDetailContent'

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
        {/* Breadcrumb */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500">
            <Link href="/" className="hover:text-accent-yellow transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[13px] text-gray-400">chevron_right</span>
            <Link href="/flash-deals" className="hover:text-accent-yellow transition-colors">Flash Deals</Link>
            <span className="material-symbols-outlined text-[13px] text-gray-400">chevron_right</span>
            <span className="text-gray-400 truncate max-w-[200px]">{deal.name}</span>
          </nav>
        </div>

        <FlashDealDetailContent deal={deal} />
      </main>

      <Footer />
    </div>
  )
}
