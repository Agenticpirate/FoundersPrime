import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import HashScroll from '@/components/HashScroll'
import { safeJsonLd } from '@/lib/safe-json-ld'

/*
 * ─── Below-fold: lazy-loaded to reduce initial JS parse cost ───
 *
 * Server rendering stays enabled (the default), so the HTML these produce is
 * unchanged and there is no layout shift or content difference. Only their
 * client bundles are split out of the initial payload, which is what Lighthouse
 * reports as unused JavaScript on first load.
 */
const PopularDealsGrid = dynamic(() => import('@/components/PopularDealsGrid'))
const ProblemSection = dynamic(() => import('@/components/ProblemSection'))
const SystemModules = dynamic(() => import('@/components/SystemModules'))
const FounderLogs = dynamic(() => import('@/components/FounderLogs'))
const ProviderSection = dynamic(() => import('@/components/ProviderSection'))

export const metadata: Metadata = {
  // absolute avoids double brand from root template `%s | FoundersPrime`
  title: {
    absolute: 'FoundersPrime | Verified Startup Deals & Grants',
  },
  description:
    'Join thousands of founders saving millions with our verified database of startup credits, grants, and software deals.',
  alternates: {
    canonical: 'https://www.foundersprime.com',
  },
  openGraph: {
    title: 'FoundersPrime | Build More. Burn Less.',
    description:
      'Unlock up to $500K in verified startup credits, grants, and founder perks — zero dilution.',
    url: 'https://www.foundersprime.com',
    type: 'website',
    siteName: 'FoundersPrime',
    images: [
      {
        url: 'https://www.foundersprime.com/og-image.png?v=build-more-20260722',
        width: 1200,
        height: 630,
        alt: 'FoundersPrime — Build More. Burn Less. Unlock up to $500K in startup credits.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoundersPrime | Build More. Burn Less.',
    description:
      'Unlock up to $500K in verified startup credits, grants, and founder perks — zero dilution.',
    creator: '@foundersprime',
    images: ['https://www.foundersprime.com/og-image.png?v=build-more-20260722'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.foundersprime.com',
    name: 'FoundersPrime',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.foundersprime.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is FoundersPrime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FoundersPrime is the leading intelligence terminal and verified database for startup deals, SaaS credits, and non-dilutive grants, helping founders save over $500,000 on tools like AWS, Google Cloud, and OpenAI.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I get AWS and Google Cloud credits for my startup?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Startups can access verified AWS credits, Google Cloud credits, and other SaaS discounts by joining FoundersPrime. Our platform curates active, verified startup programs and accelerator benefits.'
        }
      }
    ]
  }
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <HashScroll />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow bg-[#f6f8f8] dark:bg-[#000000]">
        {/* Hero */}
        <HeroSection />
        {/* Subtle brand hairline between sections */}
        <div
          aria-hidden
          className="h-px w-full bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
        />
        <PopularDealsGrid />
        <ProblemSection />
        <SystemModules />
        <div
          aria-hidden
          className="h-px w-full bg-gradient-to-r from-transparent via-accent-yellow/30 to-transparent"
        />
        <ProviderSection />
        <FounderLogs />
      </main>
      <Footer />
    </>
  )
}