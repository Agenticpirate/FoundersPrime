import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Accelerators | Top Programs',
  description:
    'Discover top startup accelerators worldwide. Get $250K+ in funding, mentorship, and connections. Y Combinator, Techstars, 500 Global & more. Updated recently.',
  keywords: [
    'startup accelerators',
    'Y Combinator',
    'Techstars',
    '500 Global',
    'startup funding',
    'seed funding',
    'accelerator programs',
  ],
  alternates: {
    canonical: 'https://www.foundersprime.com/programs/accelerators',
  },
  openGraph: {
    type: 'website',
    title: 'Startup Accelerators | Top Programs',
    description:
      'Discover top startup accelerators worldwide. Get $250K+ in funding, mentorship, and connections. Y Combinator, Techstars, 500 Global & more.',
    url: 'https://www.foundersprime.com/programs/accelerators',
    siteName: 'FoundersPrime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Accelerators | Top Programs',
    description:
      'Discover top startup accelerators worldwide. Get $250K+ in funding, mentorship, and connections. Y Combinator, Techstars, 500 Global & more.',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Startup Accelerators',
  description:
    'Discover top startup accelerators worldwide. Get $250K+ in funding, mentorship, and connections. Y Combinator, Techstars, 500 Global & more.',
  url: 'https://www.foundersprime.com/programs/accelerators',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.foundersprime.com' },
      { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://www.foundersprime.com/programs/grants' },
      { '@type': 'ListItem', position: 3, name: 'Accelerators', item: 'https://www.foundersprime.com/programs/accelerators' },
    ],
  },
}

export default function ProgramsAcceleratorsLayout({ children }: { children: React.ReactNode }) {
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
