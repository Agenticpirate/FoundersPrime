/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent clickjacking: disallow embedding in iframes from other origins
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent cross-origin window.opener access (Tabnabbing / COOP)
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  // Prevent MIME type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information sent with requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Force HTTPS for 2 years (enable only in production behind HTTPS)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Disable browser feature APIs that could be abused
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // XSS Protection (legacy browsers)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Cross-Origin-Opener-Policy: allows Google OAuth popup while blocking cross-origin opener attacks.
  // 'same-origin-allow-popups' is required for Google Sign-In popup flow;
  // 'same-origin' would block OAuth popups.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  // Content Security Policy — allows Next.js inline scripts, Google Fonts, Supabase, Dodo, and Cloudflare Turnstile
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Allow Next.js inline scripts (required for __NEXT_DATA__ and JSON-LD), Cloudflare Turnstile, Google Sign-in, Google Translate, Google Analytics, and Cloudflare Insights
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://challenges.cloudflare.com https://accounts.google.com https://www.googletagmanager.com https://translate.google.com https://translate.googleapis.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      // Supabase, Dodo Payments, Cloudflare Turnstile, Google Accounts API, Google Analytics, Cloudflare Insights, and any other API origin
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.dodopayments.com https://checkout.dodopayments.com https://challenges.cloudflare.com https://accounts.google.com https://www.google-analytics.com https://*.google-analytics.com https://*.cloudflareinsights.com https://cloudflareinsights.com",
      // Allow Cloudflare Turnstile and Google Sign-in iframe
      "frame-src 'self' https://checkout.dodopayments.com https://challenges.cloudflare.com https://accounts.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      // form-action must allow OAuth provider redirects (Supabase redirects the browser
      // to GitHub, Google, LinkedIn for the OAuth dance) and Dodo Payments checkout.
      "form-action 'self' https://*.supabase.co https://accounts.google.com https://github.com https://www.linkedin.com https://checkout.dodopayments.com",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  optimizeFonts: false,
  // Lint remains non-blocking (legacy config/version drift). Typecheck is
  // enforced so broken types cannot ship silently.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      // Allow all HTTPS images (logos from external deal providers, etc.)
      { protocol: 'https', hostname: '**' },
    ],
    // Serve AVIF first (best compression), fallback to WebP — handled by sharp
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 7 days — logos/static assets rarely change
    minimumCacheTTL: 604800,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Default quality: 80 balances file size and visual quality
    qualities: [75, 80, 90],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Ensure sharp is used (faster than squoosh, better AVIF support)
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  async headers() {
    const agentLinkHeader = [
      '</.well-known/api-catalog>; rel="api-catalog"',
      '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
      '</.well-known/agent-card.json>; rel="describedby"; type="application/json"',
      '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
      '</llms.txt>; rel="describedby"; type="text/plain"',
      '</llms-full.txt>; rel="alternate"; type="text/plain"',
      '</sitemap.xml>; rel="sitemap"; type="application/xml"',
      '</auth.md>; rel="service-doc"; type="text/markdown"',
    ].join(', ')

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Homepage discovery headers (belt-and-suspenders with middleware Link)
      {
        source: '/',
        headers: [
          { key: 'Link', value: agentLinkHeader },
          { key: 'Content-Signal', value: 'search=yes, ai-train=no, ai-input=yes' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/auth.md',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/.well-known/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      // Cache static public assets aggressively
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo-icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo-foundersprime.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/FPLogo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Keep private/non-content routes out of the search index.
      // X-Robots-Tag is read by Googlebot even on JSON API responses that
      // can't carry an HTML <meta> tag, and it lets Google drop already-
      // indexed URLs (unlike a robots.txt block, which only hides content).
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/dashboard/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/billing',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/checkout',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/login',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/forgot-password',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/auth/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/featured-thank-you',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/maintenance',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/coming-soon',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/.well-known/llms.txt',
        destination: '/llms.txt',
        permanent: true,
      },
      // Verified Startups retired from public product (data kept in-repo).
      // See docs/ARCHIVED-STARTUPS.md
      {
        source: '/startups',
        destination: '/ideas',
        permanent: true,
      },
      {
        source: '/startups/:path*',
        destination: '/ideas',
        permanent: true,
      },
      // Cloud Credits no longer has a dedicated landing page — send old
      // links/bookmarks/SEO to the filtered All Deals view instead of 404.
      {
        source: '/deals/cloud-credits',
        destination: '/deals?category=cloud-credits',
        permanent: true,
      },
      // SaaS Discounts likewise folded into the filtered All Deals view.
      {
        source: '/deals/saas-discounts',
        destination: '/deals?category=saas-discounts',
        permanent: true,
      },
      // Ad Credits likewise folded into the filtered All Deals view.
      {
        source: '/deals/ad-credits',
        destination: '/deals?category=ad-credits',
        permanent: true,
      },
      // Program hubs: /programs/* is canonical (avoid /deals/* duplicates).
      {
        source: '/deals/accelerators',
        destination: '/programs/accelerators',
        permanent: true,
      },
      {
        source: '/deals/incubators',
        destination: '/programs/incubators',
        permanent: true,
      },
      {
        source: '/deals/grants',
        destination: '/programs/grants',
        permanent: true,
      },
      {
        source: '/deals/grants/:country',
        destination: '/programs/grants',
        permanent: true,
      },
      // Unify signup page under login page with a view parameter
      {
        source: '/signup',
        destination: '/login?view=signup',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig