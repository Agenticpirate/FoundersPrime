'use client'

import { Suspense } from 'react'
import Head from 'next/head'
import AcceleratorsHeader from '@/components/deals/AcceleratorsHeader'
import AcceleratorsHero from '@/components/deals/AcceleratorsHero'
import AcceleratorsStrategy from '@/components/deals/AcceleratorsStrategy'
import AcceleratorsGrid from '@/components/deals/AcceleratorsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AcceleratorsPage() {
  // SEO and Structured Data
  const pageTitle = "Startup Accelerators 2026 | 280+ Programs | FoundersPrime"
  const pageDescription = "Discover 280+ top startup accelerators worldwide. Get $250K+ in funding, mentorship, and connections. Y Combinator, Techstars, 500 Global & more. Updated Q1 2026."
  const pageUrl = "https://foundersprime.com/programs/accelerators"
  const ogImage = "https://foundersprime.com/og-accelerators.jpg"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Startup Accelerators 2026",
    "description": pageDescription,
    "url": pageUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 280,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Organization",
            "name": "Y Combinator",
            "description": "The Gold Standard of accelerators",
            "url": "https://www.ycombinator.com/"
          }
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://foundersprime.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Programs",
          "item": "https://foundersprime.com/programs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Accelerators",
          "item": pageUrl
        }
      ]
    }
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="startup accelerators, Y Combinator, Techstars, 500 Global, startup funding, seed funding, accelerator programs 2026" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="FoundersPrime" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
        <Header />
        <main className="flex-1">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
            <AcceleratorsHeader />

            <Suspense fallback={<HeroSkeleton />}>
              <AcceleratorsHero />
            </Suspense>

            <Suspense fallback={<StrategySkeleton />}>
              <AcceleratorsStrategy />
            </Suspense>

            <Suspense fallback={<GridSkeleton />}>
              <AcceleratorsGrid />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

// Loading Skeletons
function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 animate-pulse">
      <div className="lg:col-span-7 space-y-4">
        <div className="h-8 w-48 bg-gray-300 rounded" />
        <div className="h-16 w-full bg-gray-300 rounded" />
        <div className="h-24 w-full bg-gray-300 rounded" />
      </div>
      <div className="lg:col-span-5 space-y-5">
        <div className="h-24 bg-gray-300 rounded" />
        <div className="h-24 bg-gray-300 rounded" />
        <div className="h-24 bg-gray-300 rounded" />
      </div>
    </div>
  )
}

function StrategySkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 animate-pulse">
      <div className="lg:col-span-8">
        <div className="h-96 bg-gray-300 rounded" />
      </div>
      <div className="lg:col-span-4 space-y-6">
        <div className="h-48 bg-gray-300 rounded" />
        <div className="h-48 bg-gray-300 rounded" />
      </div>
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 bg-gray-300 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-300 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}
