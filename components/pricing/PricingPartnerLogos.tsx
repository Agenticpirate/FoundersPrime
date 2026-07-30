'use client'

import { useRef, useState } from 'react'

/**
 * Pricing partner marquee — local brand marks on dark strip, no white plates.
 * Failed logos collapse (no empty gap in the animation).
 */
const LOGO_V = '20260718official'

type Partner = {
  name: string
  domain: string
  logo: string
  fallback?: string
}

/**
 * Prefer multi-color / light-on-dark assets only.
 * Slack must use multi-color SVG (unfilled paths = black = invisible on black).
 */
const PARTNERS: Partner[] = [
  { name: 'OpenAI', domain: 'openai.com', logo: `/brand-logos/openai-white.svg?v=${LOGO_V}`, fallback: `/brand-logos/openai.png?v=${LOGO_V}` },
  { name: 'Stripe', domain: 'stripe.com', logo: `/brand-logos/stripe.svg?v=${LOGO_V}`, fallback: `/brand-logos/stripe.png?v=${LOGO_V}` },
  { name: 'Figma', domain: 'figma.com', logo: `/brand-logos/figma.svg?v=${LOGO_V}`, fallback: `/brand-logos/figma.png?v=${LOGO_V}` },
  { name: 'AWS', domain: 'aws.amazon.com', logo: `/brand-logos/aws.png?v=${LOGO_V}` },
  { name: 'Google Cloud', domain: 'cloud.google.com', logo: `/brand-logos/googlecloud.svg?v=${LOGO_V}`, fallback: `/brand-logos/googlecloud.png?v=${LOGO_V}` },
  { name: 'Notion', domain: 'notion.so', logo: `/brand-logos/notion-white.svg?v=${LOGO_V}`, fallback: `/brand-logos/notion.png?v=${LOGO_V}` },
  { name: 'Vercel', domain: 'vercel.com', logo: `/brand-logos/vercel-white.svg?v=${LOGO_V}`, fallback: `/brand-logos/vercel.png?v=${LOGO_V}` },
  { name: 'Supabase', domain: 'supabase.com', logo: `/brand-logos/supabase.svg?v=${LOGO_V}`, fallback: `/brand-logos/supabase.png?v=${LOGO_V}` },
  { name: 'Slack', domain: 'slack.com', logo: `/brand-logos/slack.svg?v=${LOGO_V}`, fallback: `/brand-logos/slack.png?v=${LOGO_V}` },
  { name: 'Linear', domain: 'linear.app', logo: `/brand-logos/linear.svg?v=${LOGO_V}`, fallback: `/brand-logos/linear.png?v=${LOGO_V}` },
  { name: 'Framer', domain: 'framer.com', logo: `/brand-logos/framer.svg?v=${LOGO_V}`, fallback: `/brand-logos/framer.png?v=${LOGO_V}` },
  { name: 'Webflow', domain: 'webflow.com', logo: `/brand-logos/webflow.svg?v=${LOGO_V}`, fallback: `/brand-logos/webflow.png?v=${LOGO_V}` },
  { name: 'DigitalOcean', domain: 'digitalocean.com', logo: `/brand-logos/digitalocean.svg?v=${LOGO_V}`, fallback: `/brand-logos/digitalocean.png?v=${LOGO_V}` },
  { name: 'Intercom', domain: 'intercom.com', logo: `/brand-logos/intercom.svg?v=${LOGO_V}`, fallback: `/brand-logos/intercom.png?v=${LOGO_V}` },
  { name: 'GitHub', domain: 'github.com', logo: `/brand-logos/github-white.svg?v=${LOGO_V}`, fallback: `/brand-logos/github.png?v=${LOGO_V}` },
  { name: 'HubSpot', domain: 'hubspot.com', logo: `/brand-logos/hubspot.png?v=${LOGO_V}` },
  { name: 'Airtable', domain: 'airtable.com', logo: `/brand-logos/airtable.png?v=${LOGO_V}` },
  { name: 'Datadog', domain: 'datadoghq.com', logo: `/brand-logos/datadog.png?v=${LOGO_V}` },
  { name: 'Sentry', domain: 'sentry.io', logo: `/brand-logos/sentry.png?v=${LOGO_V}` },
  { name: 'Mixpanel', domain: 'mixpanel.com', logo: `/brand-logos/mixpanel.png?v=${LOGO_V}` },
  { name: 'Twilio', domain: 'twilio.com', logo: `/brand-logos/twilio.png?v=${LOGO_V}` },
  { name: 'Discord', domain: 'discord.com', logo: `/brand-logos/discord.png?v=${LOGO_V}` },
  { name: 'Canva', domain: 'canva.com', logo: `/brand-logos/canva.png?v=${LOGO_V}` },
  { name: 'Adobe', domain: 'adobe.com', logo: `/brand-logos/adobe.png?v=${LOGO_V}` },
  { name: 'Salesforce', domain: 'salesforce.com', logo: `/brand-logos/salesforce.png?v=${LOGO_V}` },
  { name: 'Microsoft', domain: 'microsoft.com', logo: `/brand-logos/microsoft.svg?v=${LOGO_V}`, fallback: `/brand-logos/microsoft.png?v=${LOGO_V}` },
  { name: 'Cloudflare', domain: 'cloudflare.com', logo: `/brand-logos/cloudflare.png?v=${LOGO_V}` },
  { name: 'Shopify', domain: 'shopify.com', logo: `/brand-logos/shopify.png?v=${LOGO_V}` },
  { name: 'Spotify', domain: 'spotify.com', logo: `/brand-logos/spotify.png?v=${LOGO_V}` },
  { name: 'MongoDB', domain: 'mongodb.com', logo: `/brand-logos/mongodb.png?v=${LOGO_V}` },
  { name: 'Auth0', domain: 'auth0.com', logo: `/brand-logos/auth0.png?v=${LOGO_V}` },
  { name: 'Netlify', domain: 'netlify.com', logo: `/brand-logos/netlify.png?v=${LOGO_V}` },
  { name: 'Dropbox', domain: 'dropbox.com', logo: `/brand-logos/dropbox.png?v=${LOGO_V}` },
  { name: 'Zoom', domain: 'zoom.us', logo: `/brand-logos/zoom.png?v=${LOGO_V}` },
  { name: 'Asana', domain: 'asana.com', logo: `/brand-logos/asana.png?v=${LOGO_V}` },
  { name: 'Atlassian', domain: 'atlassian.com', logo: `/brand-logos/atlassian.png?v=${LOGO_V}` },
  { name: 'Brex', domain: 'brex.com', logo: `/brand-logos/brex.png?v=${LOGO_V}` },
  { name: 'Ramp', domain: 'ramp.com', logo: `/brand-logos/ramp.png?v=${LOGO_V}` },
]

const seamless = [...PARTNERS, ...PARTNERS]

function PartnerLogo({ brand, size = 28 }: { brand: Partner; size?: number }) {
  const [src, setSrc] = useState(brand.logo)
  const stepRef = useRef(0)
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  return (
    <span
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
      title={brand.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={brand.name}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        draggable={false}
        onError={() => {
          if (stepRef.current === 0 && brand.fallback) {
            stepRef.current = 1
            setSrc(brand.fallback)
          } else if (stepRef.current < 2) {
            stepRef.current = 2
            setSrc(`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`)
          } else {
            // Collapse slot so the marquee has no empty hole
            setHidden(true)
          }
        }}
      />
    </span>
  )
}

export default function PricingPartnerLogos() {
  return (
    <section className="w-full py-5 md:py-7 bg-[#000000] border-y border-[#1b2028] overflow-hidden relative">
      <div className="text-center">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
          Access $500K+ in deals from
        </p>
        <div className="relative w-full overflow-hidden mask-gradient-x">
          {/*
            Two identical tracks in one flex row; animation shifts by -50% for a seamless loop.
            Equal gaps only between visible logos (failed ones return null).
          */}
          <div className="flex w-max items-center gap-7 md:gap-10 animate-marquee-fast px-4">
            {(['a', 'b'] as const).flatMap((pass) =>
              PARTNERS.map((partner) => (
                <PartnerLogo key={`${pass}-${partner.domain || partner.name}`} brand={partner} size={30} />
              ))
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee-fast {
          animation: marquee-fast 48s linear infinite;
        }
        @keyframes marquee-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 6%,
            black 94%,
            transparent
          );
        }
      `}</style>
    </section>
  )
}
