import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ResourcesHeader from '@/components/resources/ResourcesHeader'
import { resourcesData } from '@/components/resources/resources-data'
import { ArrowLeft, Star, Download, User, Calendar, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return resourcesData.map((resource) => ({
    id: resource.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resource = resourcesData.find((r) => r.id === params.id)
  if (!resource) {
    return { title: 'Resource Not Found' }
  }
  return {
    title: `${resource.title} | FoundersPrime Resources`,
    description: resource.description,
  }
}

export default function ResourceDetailPage({ params }: PageProps) {
  const resource = resourcesData.find((r) => r.id === params.id)
  if (!resource) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <ResourcesHeader currentSection={resource.title} />
          
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Resources
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: Detail info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-5 md:p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
                
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-black text-2xl text-accent-yellow flex-shrink-0">
                    {resource.thumbnail}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-[#ffd700] text-black text-[10px] font-black uppercase tracking-wide rounded-md">
                        {resource.category}
                      </span>
                      {resource.isPremium && (
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-bold rounded-md uppercase tracking-wide">
                          PRO
                        </span>
                      )}
                    </div>

                    <h1 className="font-mono text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                      {resource.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> {resource.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> {resource.downloads} downloads
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-accent-yellow">
                        <Star className="w-3.5 h-3.5 fill-current" /> {resource.rating} Rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 md:p-6">
                <h2 className="font-mono text-sm font-black uppercase mb-3 text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-yellow flex-shrink-0" />
                  Description
                </h2>
                <p className="text-[13px] md:text-sm text-gray-300 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 md:p-6">
                <h2 className="font-mono text-sm font-black uppercase mb-3 text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-yellow flex-shrink-0" />
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resource.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-[13px] text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quick actions */}
            <div className="space-y-5">
              <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5">
                <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.1em] mb-4 border-b border-white/5 pb-2.5 text-white">
                  Quick Facts
                </h3>

                <div className="space-y-3.5 text-[12px] font-mono mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 uppercase tracking-wider text-[10px]">Format</span>
                    <span className="font-bold text-white">{resource.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 uppercase tracking-wider text-[10px]">Price</span>
                    <span className="font-bold text-[#ffd700]">{resource.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 uppercase tracking-wider text-[10px]">Last Updated</span>
                    <span className="font-bold text-white">{resource.lastUpdated}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-[#ffd700] hover:bg-[#ffe033] text-black font-mono text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                  <Download className="w-4 h-4" />
                  {resource.price === 'Free' ? 'Download Free' : 'Access Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
