import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SingleStartupContent from '@/components/startups/SingleStartupContent'
import SingleStartupSidebar from '@/components/startups/SingleStartupSidebar'
import startupsData from '@/public/data/verified-startups.json'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const startup = startupsData.find((s: any) => s.slug === params.slug)

  if (!startup) {
    return {
      title: 'Startup Not Found | FoundersPrime',
    }
  }

  return {
    title: `${startup.name} | Verified Startups | FoundersPrime`,
    description: startup.shortDescription || startup.description.substring(0, 160),
  }
}

export default function StartupDetailPage({ params }: PageProps) {
  const startup = startupsData.find((s: any) => s.slug === params.slug)

  if (!startup) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 text-sm font-bold uppercase tracking-wide mb-8">
            <Link className="text-black/60 hover:text-primary hover:underline decoration-2" href="/">Home</Link>
            <span className="text-black/60">/</span>
            <Link className="text-black/60 hover:text-primary hover:underline decoration-2" href="/startups">Startups</Link>
            <span className="text-black/60">/</span>
            <span className="text-black">{startup.name}</span>
          </div>

          {/* Page Header */}
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] p-8 mb-8">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="size-20 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
                {startup.logoUrl ? (
                  <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-3xl text-gray-600">{startup.name.charAt(0)}</span>
                )}
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="font-mono text-3xl md:text-4xl font-bold text-black mb-2">{startup.name}</h1>
                    <p className="font-sans text-lg text-gray-600 mb-3">{startup.shortDescription}</p>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-primary/20 text-black px-3 py-1 font-mono text-sm font-bold rounded-sm border border-black">
                        {startup.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 font-mono text-sm rounded-sm border border-gray-300">
                        {startup.source}
                      </span>
                      {startup.featured && (
                        <span className="bg-amber-400 text-black px-3 py-1 font-mono text-sm font-bold rounded-sm border-2 border-black">
                          Featured
                        </span>
                      )}
                      {startup.forSale && (
                        <span className="bg-green-400 text-black px-3 py-1 font-mono text-sm font-bold rounded-sm border-2 border-black flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">sell</span>
                          For Sale
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 font-mono text-sm">
                  {startup.country && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{startup.country}</span>
                    </div>
                  )}
                  {startup.founded && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      <span>Founded {startup.founded}</span>
                    </div>
                  )}
                  {startup.teamSize && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">group</span>
                      <span>{startup.teamSize}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Verified Startup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <SingleStartupContent startup={startup} />
            </div>
            <div className="lg:w-[320px]">
              <SingleStartupSidebar startup={startup} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return startupsData.map((startup: any) => ({
    slug: startup.slug,
  }))
}
