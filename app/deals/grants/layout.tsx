import type { Metadata } from 'next'

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
    canonical: 'https://www.foundersprime.com/deals/grants',
  },
  openGraph: {
    type: 'website',
    title: 'Startup Grants | Non-Dilutive Funding',
    description:
      'Verified startup grants, competitions, and non-dilutive capital from government agencies, foundations, and global programs — all in one place.',
    url: 'https://www.foundersprime.com/deals/grants',
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
  url: 'https://www.foundersprime.com/deals/grants',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.foundersprime.com' },
      { '@type': 'ListItem', position: 2, name: 'Deals', item: 'https://www.foundersprime.com/deals' },
      { '@type': 'ListItem', position: 3, name: 'Grants', item: 'https://www.foundersprime.com/deals/grants' },
    ],
  },
}

export default function GrantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  )
}
