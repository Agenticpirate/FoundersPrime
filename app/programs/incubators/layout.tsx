import type { Metadata } from 'next'
import { safeJsonLd } from '@/lib/safe-json-ld'

export const metadata: Metadata = {
  title: 'Startup Incubators & Venture Studios',
  description:
    'Verified incubators, university programs, and venture studios — many equity-free, offering lab space, co-founders, and 6–24 months of runway support.',
  keywords: [
    'startup incubators',
    'venture studios',
    'university incubator programs',
    'equity-free incubators',
    'startup runway support',
  ],
  alternates: {
    canonical: 'https://www.foundersprime.com/programs/incubators',
  },
  openGraph: {
    type: 'website',
    title: 'Startup Incubators & Venture Studios',
    description:
      'Verified incubators, university programs, and venture studios — many equity-free, offering lab space, co-founders, and 6–24 months of runway support.',
    url: 'https://www.foundersprime.com/programs/incubators',
    siteName: 'FoundersPrime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Incubators & Venture Studios',
    description:
      'Verified incubators, university programs, and venture studios — many equity-free, offering lab space, co-founders, and runway support.',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Startup Incubators & Venture Studios',
  description:
    'Verified incubators, university programs, and venture studios — many equity-free, offering lab space, co-founders, and runway support.',
  url: 'https://www.foundersprime.com/programs/incubators',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.foundersprime.com' },
      { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://www.foundersprime.com/programs' },
      { '@type': 'ListItem', position: 3, name: 'Incubators', item: 'https://www.foundersprime.com/programs/incubators' },
    ],
  },
}

export default function ProgramsIncubatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
      {children}
    </>
  )
}
