import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StartupDetails from '@/components/startups/StartupDetails'
import startupsData from '@/data/yc_companies_2024_2026.json'
import { YCCompany } from '@/types/startup'

// Type assertion for data
const allStartups = startupsData as unknown as YCCompany[]

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const startup = allStartups.find((s) => s.slug === params.slug)

  if (!startup) {
    return {
      title: 'Startup Not Found | FoundersPrime',
    }
  }

  const title = `${startup.name} | Verified Startups | FoundersPrime`
  const description = startup.one_liner || (startup.long_description ? startup.long_description.substring(0, 160) : '')
  const image = startup.small_logo_thumb_url || 'https://www.foundersprime.com/og-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.foundersprime.com/startups/${startup.slug}`,
      siteName: 'FoundersPrime',
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: `${startup.name} logo`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@FoundersPrime',
    },
  }
}

export default function StartupDetailPage({ params }: PageProps) {
  const startup = allStartups.find((s) => s.slug === params.slug)

  if (!startup) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: startup.name,
    url: startup.website || `https://www.foundersprime.com/startups/${startup.slug}`,
    logo: startup.small_logo_thumb_url || 'https://www.foundersprime.com/logo.svg',
    description: startup.one_liner || (startup.long_description ? startup.long_description.substring(0, 160) : ''),
    sameAs: [
      startup.linkedin_url,
      startup.twitter_url,
      startup.crunchbase_url
    ].filter(Boolean),
    foundingDate: startup.launched_at ? new Date(startup.launched_at * 1000).getFullYear().toString() : undefined,
    address: startup.all_locations ? {
      '@type': 'PostalAddress',
      addressLocality: startup.all_locations
    } : undefined
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <StartupDetails company={startup} />
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return allStartups.map((startup) => ({
    slug: startup.slug,
  }))
}
