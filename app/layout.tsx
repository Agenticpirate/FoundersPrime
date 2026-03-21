import type { Metadata } from 'next'
import './globals.css'
import CookieConsentProvider from '@/components/cookie/CookieConsentProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.foundersprime.com'),
  title: {
    default: 'FoundersPrime | The #1 Startup Deals & Credits Terminal',
    template: '%s | FoundersPrime',
  },
  description: 'Access $500K+ in startup credits, verified deals, and non-dilutive grants. The intelligence terminal for modern founders.',
  keywords: ['startup credits', 'aws credits', 'google cloud credits', 'startup grants', 'accelerators', 'y combinator', 'saas discounts', 'founder deals'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.foundersprime.com',
    title: 'FoundersPrime | The Intelligence Terminal for Startups',
    description: 'Access 500+ verified deals, non-dilutive grants, and startup credits worth $500k+.',
    siteName: 'FoundersPrime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoundersPrime | The Intelligence Terminal for Startups',
    description: 'Access 500+ verified deals, non-dilutive grants, and startup credits worth $500k+.',
    creator: '@foundersprime',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.svg',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FoundersPrime',
  alternateName: ['Founders Prime', 'FoundersPrime Terminal'],
  url: 'https://www.foundersprime.com',
  logo: 'https://www.foundersprime.com/icon.svg',
  sameAs: [
    'https://twitter.com/foundersprime',
    'https://linkedin.com/company/foundersprime'
  ],
  description: 'The intelligence terminal for 500+ verified deals, non-dilutive grants, and startup credits.',
  slogan: 'The Intelligence Terminal for Startups'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light text-black flex flex-col min-h-screen overflow-x-hidden w-full relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  )
}