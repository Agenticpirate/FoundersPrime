'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

interface Deal {
  id: string
  logo: string
  category: string
  badge?: string
  badgeColor?: string
  title: string
  provider: string
  value: string
  valueSubtext: string
  valueStyle: string
  description: string
  eligibility?: string
  validFor?: string
  applicationUrl?: string
  verified?: boolean
}

interface DealCardProps {
  deal: Deal
  basePath?: string
  overrideHref?: string
}

// Generate domain from provider name
const providerToDomain = (provider: string): string => {
  const cleaned = (provider || '').replace(/^By\s+/i, '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const domainMap: Record<string, string> = {
    'aws': 'aws.amazon.com', 'amazon': 'amazon.com', 'amazonwebservices': 'aws.amazon.com',
    'googlecloud': 'cloud.google.com', 'googleforstartups': 'startup.google.com', 'google': 'google.com',
    'microsoftazure': 'azure.microsoft.com', 'microsoftforstartups': 'microsoft.com', 'microsoft': 'microsoft.com',
    'azure': 'azure.microsoft.com', 'digitalocean': 'digitalocean.com', 'github': 'github.com',
    'gitlab': 'gitlab.com', 'notion': 'notion.so', 'linear': 'linear.app',
    'vercel': 'vercel.com', 'netlify': 'netlify.com', 'stripe': 'stripe.com',
    'hubspot': 'hubspot.com', 'intercom': 'intercom.com', 'zendesk': 'zendesk.com',
    'slack': 'slack.com', 'discord': 'discord.com', 'figma': 'figma.com',
    'canva': 'canva.com', 'airtable': 'airtable.com', 'monday': 'monday.com',
    'asana': 'asana.com', 'trello': 'trello.com', 'atlassian': 'atlassian.com',
    'twilio': 'twilio.com', 'sendgrid': 'sendgrid.com', 'mailchimp': 'mailchimp.com',
    'segment': 'segment.com', 'mixpanel': 'mixpanel.com', 'amplitude': 'amplitude.com',
    'datadog': 'datadoghq.com', 'newrelic': 'newrelic.com', 'sentry': 'sentry.io',
    'mongodb': 'mongodb.com', 'redis': 'redis.com', 'supabase': 'supabase.com',
    'firebase': 'firebase.google.com', 'cloudflare': 'cloudflare.com', 'openai': 'openai.com',
    'anthropic': 'anthropic.com', 'brex': 'brex.com', 'ramp': 'ramp.com',
    'deel': 'deel.com', 'gusto': 'gusto.com', 'rippling': 'rippling.com',
    'webflow': 'webflow.com', 'framer': 'framer.com', 'retool': 'retool.com',
    'postman': 'postman.com', 'algolia': 'algolia.com', 'auth0': 'auth0.com',
    'miro': 'miro.com', 'clickup': 'clickup.com', 'typeform': 'typeform.com',
    'freshworks': 'freshworks.com', 'zoho': 'zoho.com', 'salesforce': 'salesforce.com',
    'loom': 'loom.com', 'zoom': 'zoom.us', 'adobe': 'adobe.com',
    'spotify': 'spotify.com', 'plaid': 'plaid.com', 'okta': 'okta.com',
  }
  return domainMap[cleaned] || `${cleaned}.com`
}

// Truncate value text to keep cards compact
const truncateValue = (val: string, max: number = 30): string => {
  if (val.length <= max) return val
  return val.substring(0, max).trim() + '…'
}

export default function DealCard({ deal, basePath = '/deals', overrideHref }: DealCardProps) {
  const { id, logo, badge, badgeColor, title, provider, value, description } = deal
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const href = overrideHref ?? `${basePath}/${id}`
  const isExternal = href.startsWith('http')
  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href }

  const cleanProvider = provider.replace(/^By\s+/i, '').trim()
  const domain = providerToDomain(cleanProvider)
  const displayTitle = title.length > 40 ? title.substring(0, 40) + '…' : title

  // Prefer the deal's own logoUrl when it points at a real image. Skip
  // generic placeholders (rocket emoji, ui-avatars) so we still hit the
  // brand favicon fallback for those.
  const hasOwnLogo =
    typeof logo === 'string' &&
    logo.trim().length > 0 &&
    /^https?:\/\//i.test(logo) &&
    !logo.includes('ui-avatars') &&
    !logo.includes('rocket')

  const fallbackChain = [
    ...(hasOwnLogo ? [logo] : []),
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://logo.clearbit.com/${domain}`,
    `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanProvider)}&background=f3f4f6&color=374151&bold=true&size=128`
  ]
  const currentSrc = fallbackChain[fallbackIndex] || fallbackChain[0]

  useEffect(() => {
    setFallbackIndex(0)
    setLoaded(false)
    setFailed(false)
  }, [logo, provider])

  const handleError = () => {
    const nextIndex = fallbackIndex + 1
    if (nextIndex < fallbackChain.length) {
      setFallbackIndex(nextIndex)
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  return (
    <div className="relative h-[200px] flex flex-col rounded-sm">
      <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <LinkComponent
        {...linkProps}
        className="relative flex flex-col bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex-1 rounded-xl text-left"
        aria-label={`View details for ${title}`}
      >
        {/* Badge */}
        {badge && (
          <div className="px-3 pt-2.5">
            <span className={`inline-block px-1.5 py-0.5 ${badgeColor || 'bg-orange-500'} text-white text-[8px] font-bold uppercase tracking-wider rounded-sm`}>
              {badge}
            </span>
          </div>
        )}

        {/* Logo + Title — fixed height */}
        <div className={`flex items-center gap-3 px-4 ${badge ? 'pt-2' : 'pt-4'} pb-2`}>
          <div className="w-10 h-10 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1.5 flex-shrink-0 rounded-lg overflow-hidden relative group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors">
            {!failed && (
              <img
                alt={`${cleanProvider} logo`}
                className="w-full h-full object-contain"
                src={currentSrc}
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={handleError}
              />
            )}
            {failed && (
              <span className="text-[10px] font-black font-mono text-gray-400">
                {cleanProvider.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-black dark:group-hover:text-accent-yellow transition-colors line-clamp-2 min-w-0">
            {displayTitle}
          </h3>
        </div>

        {/* Description — fixed 2 lines */}
        <div className="px-4 pb-4 flex-grow">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">{description}</p>
        </div>

        {/* Value + CTA — pinned bottom, compact */}
        <div className="px-4 pb-4 mt-auto border-t border-gray-100 dark:border-white/10 pt-4">
          <div className="flex items-center justify-between gap-1.5">
            <p className="text-xs sm:text-sm font-bold text-green-600 dark:text-emerald-400 font-mono line-clamp-1 flex-1 min-w-0">
              {truncateValue(value)}
            </p>
            <div className="relative rounded-lg flex-shrink-0">
              <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
              <span className="relative inline-flex items-center gap-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg group-hover:bg-accent-yellow dark:group-hover:bg-accent-yellow group-hover:text-black dark:group-hover:text-black transition-all duration-200 shadow-sm">
                View
                <span className="material-symbols-outlined text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </LinkComponent>
    </div>
  )
}
