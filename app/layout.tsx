import type { Metadata } from 'next'
import Script from 'next/script'
import { IBM_Plex_Sans, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CookieConsentProvider from '@/components/cookie/CookieConsentProvider'

const GA_MEASUREMENT_ID = 'G-X2EQLZJD8C'

// Self-host fonts via next/font — eliminates render-blocking CSS request,
// preloads critical weights, swap behavior prevents FOIT.
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
  preload: false,
})

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
    title: 'FoundersPrime | Free Credits. Real Grants. Zero Dilution.',
    description: 'Access verified deals, non-dilutive grants, and startup credits worth $500K+. Built for modern founders.',
    siteName: 'FoundersPrime',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FoundersPrime — Free Credits. Real Grants. Zero Dilution.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoundersPrime | Free Credits. Real Grants. Zero Dilution.',
    description: 'Access verified deals, non-dilutive grants, and startup credits worth $500K+.',
    creator: '@foundersprime',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FoundersPrime',
  alternateName: ['Founders Prime', 'FoundersPrime Terminal'],
  url: 'https://www.foundersprime.com',
  logo: 'https://www.foundersprime.com/logo-fp.png',
  sameAs: [
    'https://twitter.com/foundersprime',
    'https://linkedin.com/company/foundersprime'
  ],
  description: 'The intelligence terminal for verified deals, non-dilutive grants, and startup credits.',
  slogan: 'The Intelligence Terminal for Startups'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontVariables = `${ibmPlexSans.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable}`

  return (
    <html lang="en" className={`light ${fontVariables}`}>
      <head>
        {/* Google Analytics — lazy-load after interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Material Symbols icons — async load so it doesn't block first paint */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
        />
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
