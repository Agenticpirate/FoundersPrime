import type { Metadata } from 'next'
import { safeJsonLd } from '@/lib/safe-json-ld'

export const metadata: Metadata = {
  title: 'Startup Grants | Non-Dilutive Funding',
  description:
    'Verified startup grants, competitions, and non-dilutive capital from government agencies, foundations, and global programs — eligibility, deadlines, and award sizes in one place.',
  keywords: [
    'startup grants',
    'non-dilutive funding',
    'SBIR',
    'NIH grants',
    'NSF grants',
    'government grants for startups',
    'startup competitions',
  ],
  alternates: {
    canonical: 'https://www.foundersprime.com/programs',
  },
  openGraph: {
    type: 'website',
    title: 'Startup Grants | Non-Dilutive Funding',
    description:
      'Verified startup grants, competitions, and non-dilutive capital from government agencies, foundations, and global programs — all in one place.',
    url: 'https://www.foundersprime.com/programs',
    siteName: 'FoundersPrime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Grants | Non-Dilutive Funding',
    description:
      'Verified startup grants, competitions, and non-dilutive capital from government agencies, foundations, and global programs — all in one place.',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Startup Grants',
  description:
    'Verified startup grants, competitions, and non-dilutive capital from government agencies, foundations, and global programs.',
  url: 'https://www.foundersprime.com/programs',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.foundersprime.com' },
      { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://www.foundersprime.com/programs' },
      { '@type': 'ListItem', position: 3, name: 'Grants', item: 'https://www.foundersprime.com/programs' },
    ],
  },
}

export default function ProgramsGrantsLayout({ children }: { children: React.ReactNode }) {
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
