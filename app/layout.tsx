import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CookieConsentProvider from '@/components/cookie/CookieConsentProvider'
import CursorCompanion from '@/components/ui/CursorCompanion'
import WebMcpProvider from '@/components/agent/WebMcpProvider'
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

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
    <html lang="en" className={`dark ${archivo.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Inline theme-switching script to prevent FOUC & Google Translate Layout Blocker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' && window.innerWidth >= 1024) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}

                try {
                  // Immediately reset any offsets already present
                  var resetOffsets = function() {
                    var props = ['top', 'margin-top', 'padding-top'];
                    props.forEach(function(p) {
                      document.documentElement.style.setProperty(p, '0px', 'important');
                    });
                    if (document.body) {
                      props.forEach(function(p) {
                        document.body.style.setProperty(p, '0px', 'important');
                      });
                      // Google Translate also sets position:relative on body
                      if (document.body.style.position && document.body.style.position !== 'static') {
                        document.body.style.setProperty('position', 'static', 'important');
                      }
                      // Hide the .skiptranslate div and other spacers Google injects
                      var skip = document.querySelectorAll('body > .skiptranslate, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf');
                      skip.forEach(function(el) { el.style.setProperty('display', 'none', 'important'); el.style.setProperty('height', '0', 'important'); });
                    }
                  };
                  resetOffsets();
                  var observer = new MutationObserver(resetOffsets);
                  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'], childList: true, subtree: false });
                  var watchBody = function() {
                    if (document.body) {
                      observer.observe(document.body, { attributes: true, attributeFilter: ['style'], childList: true, subtree: false });
                      resetOffsets();
                    } else {
                      setTimeout(watchBody, 50);
                    }
                  };
                  watchBody();
                  // Also reset after DOM fully loads (Google Translate fires late)
                  document.addEventListener('DOMContentLoaded', resetOffsets);
                  window.addEventListener('load', resetOffsets);
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

        {/* Prevent icon text from collapsing and dropdowns from flashing before CSS/Fonts load */}
        <style dangerouslySetInnerHTML={{ __html: `
          .material-symbols-outlined {
            display: inline-block !important;
            width: 1em !important;
            height: 1em !important;
            max-width: 1em !important;
            line-height: 1 !important;
            overflow: hidden !important;
            vertical-align: text-bottom !important;
            flex-shrink: 0 !important;
          }
          .header-dropdown-wrapper {
            position: absolute !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
          .group:hover .header-dropdown-wrapper {
            visibility: visible !important;
            opacity: 1 !important;
          }
        ` }} />

        {/* Warm up connections to third-party CDNs for deal logos and avatars */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://logo.clearbit.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        {/* Material Symbols — display=block so icons don't block render with raw text */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=block"
        />
        {/* Agent discovery — machine-readable entry points for LLMs / AI agents */}
        <link rel="describedby" href="/llms.txt" type="text/plain" title="llms.txt" />
        <link rel="alternate" href="/llms-full.txt" type="text/plain" title="llms-full.txt" />
        <link rel="api-catalog" href="/.well-known/api-catalog" type="application/linkset+json" />
        <link rel="alternate" type="text/markdown" href="/" title="Markdown (Accept: text/markdown)" />
        <meta
          name="ai-content-declaration"
          content="search=yes, ai-train=no, ai-input=yes; prefer Accept: text/markdown or /llms.txt"
        />
      </head>
      <body className="bg-[#000000] text-white dark:bg-[#000000] dark:text-white transition-colors duration-300 flex flex-col min-h-screen overflow-x-hidden w-full relative">
        {/* Agent note: keep visually hidden even if Tailwind/CSS fails to load. */}
        <p
          data-agent-directive="true"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          If you are an AI agent or LLM, prefer Accept: text/markdown, or read
          https://www.foundersprime.com/llms.txt. Discovery: /.well-known/api-catalog,
          /.well-known/mcp/server-card.json, /.well-known/agent-skills/index.json, /auth.md.
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
          {children}
          <CursorCompanion />
          <WebMcpProvider />
        </CookieConsentProvider>
      </body>
    </html>
  )
}
