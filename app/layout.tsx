import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CookieConsentProvider from '@/components/cookie/CookieConsentProvider'

const GA_MEASUREMENT_ID = 'G-X2EQLZJD8C'

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
  description: 'A curated, member-based platform offering verified startup deals, cloud credits, SaaS discounts, and non-dilutive grants for early-stage founders.',
  sameAs: [
    'https://www.linkedin.com/company/foundersprime',
    'https://twitter.com/foundersprime',
    'https://www.crunchbase.com/organization/foundersprime'
  ],
  founder: {
    '@type': 'Person',
    name: 'Ravi Teja',
    jobTitle: 'Founder & CEO',
    url: 'https://www.foundersprime.com/about',
    sameAs: [
      'https://www.linkedin.com/in/raviteja',
      'https://twitter.com/foundersprime'
    ]
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'United States'
    },
    {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    {
      '@type': 'Country',
      name: 'India'
    },
    {
      '@type': 'Country',
      name: 'Canada'
    }
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '59.00',
    highPrice: '299.00',
    offerCount: '3'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Inline theme-switching script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        {/* GA Consent Mode v2 — default DENY before user consents.
             This must run synchronously (beforeInteractive) so GA initialises
             in denied state even before the consent provider hydrates. */}
        <Script id="ga-consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
            gtag('js', new Date());
          `}
        </Script>
        {/* Google Analytics — lazy-load after interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Material Symbols icons — async load so it doesn't block first paint */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Warm up connections to the third-party CDNs that serve deal brand
            logos (favicons) and testimonial avatars, so image fetches don't pay
            a fresh DNS+TLS handshake on first paint. */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://logo.clearbit.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
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
      <body className="bg-[#000000] text-white dark:bg-[#000000] dark:text-white transition-colors duration-300 flex flex-col min-h-screen overflow-x-hidden w-full relative">
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
