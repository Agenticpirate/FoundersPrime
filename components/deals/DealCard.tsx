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

// Extract domain from various URL formats
const extractDomain = (url: string): string | null => {
  if (!url) return null
  try {
    if (url.includes('domain=')) {
      return url.split('domain=')[1].split('&')[0]
    }
    if (url.includes('logo.clearbit.com/')) {
      return url.split('logo.clearbit.com/')[1].split('?')[0]
    }
    if (url.includes('://')) {
      return new URL(url).hostname.replace('www.', '')
    }
  } catch {}
  return null
}

// Generate domain from provider name
const providerToDomain = (provider: string): string => {
  const cleaned = provider.toLowerCase().replace(/[^a-z0-9]/g, '')
  // Common provider domain mappings
  const domainMap: Record<string, string> = {
    'aws': 'aws.amazon.com',
    'amazonwebservices': 'aws.amazon.com',
    'googlecloud': 'cloud.google.com',
    'gcp': 'cloud.google.com',
    'microsoftazure': 'azure.microsoft.com',
    'azure': 'azure.microsoft.com',
    'digitalocean': 'digitalocean.com',
    'github': 'github.com',
    'gitlab': 'gitlab.com',
    'notion': 'notion.so',
    'linear': 'linear.app',
    'vercel': 'vercel.com',
    'netlify': 'netlify.com',
    'stripe': 'stripe.com',
    'hubspot': 'hubspot.com',
    'intercom': 'intercom.com',
    'zendesk': 'zendesk.com',
    'slack': 'slack.com',
    'discord': 'discord.com',
    'figma': 'figma.com',
    'canva': 'canva.com',
    'airtable': 'airtable.com',
    'monday': 'monday.com',
    'asana': 'asana.com',
    'trello': 'trello.com',
    'jira': 'atlassian.com',
    'atlassian': 'atlassian.com',
    'twilio': 'twilio.com',
    'sendgrid': 'sendgrid.com',
    'mailchimp': 'mailchimp.com',
    'segment': 'segment.com',
    'mixpanel': 'mixpanel.com',
    'amplitude': 'amplitude.com',
    'datadog': 'datadog.com',
    'newrelic': 'newrelic.com',
    'sentry': 'sentry.io',
    'mongodb': 'mongodb.com',
    'redis': 'redis.com',
    'supabase': 'supabase.com',
    'firebase': 'firebase.google.com',
    'cloudflare': 'cloudflare.com',
    'openai': 'openai.com',
    'anthropic': 'anthropic.com',
  }
  return domainMap[cleaned] || `${cleaned}.com`
}

export default function DealCard({ deal, basePath = '/deals', overrideHref }: DealCardProps) {
  const { id, logo, badge, badgeColor, title, provider, value, valueSubtext, description } = deal
  const [currentSrc, setCurrentSrc] = useState<string>('')
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const href = overrideHref ?? `${basePath}/${id}`
  const isExternal = href.startsWith('http')
  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href }

  const displayTitle = title.length > 50 ? title.substring(0, 50) + '…' : title

  // Build fallback chain
  const domain = extractDomain(logo) || providerToDomain(provider)
  const fallbackChain = [
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://ui-avatars.com/api/?name=${encodeURIComponent(provider)}&background=f3f4f6&color=374151&bold=true&size=128`
  ]

  useEffect(() => {
    setCurrentSrc(fallbackChain[0])
    setFallbackIndex(0)
    setLoaded(false)
    setFailed(false)
  }, [logo, provider])

  const handleError = () => {
    const nextIndex = fallbackIndex + 1
    if (nextIndex < fallbackChain.length) {
      setFallbackIndex(nextIndex)
      setCurrentSrc(fallbackChain[nextIndex])
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  return (
    <div className="relative h-full rounded-sm">
      <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <LinkComponent
        {...linkProps}
        className="relative flex flex-col bg-white border-2 border-black shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full rounded-sm"
        aria-label={`View details for ${title}`}
      >
        {badge && (
          <div className="px-4 pt-3">
            <span className={`inline-block px-2 py-0.5 ${badgeColor || 'bg-orange-500'} text-white text-[9px] font-bold uppercase tracking-wider rounded-sm`}>
              {badge}
            </span>
          </div>
        )}

        <div className={`flex items-center gap-3 px-4 ${badge ? 'pt-3' : 'pt-4'} pb-3`}>
          <div className="w-12 h-12 bg-gray-50 border-2 border-gray-200 flex items-center justify-center p-1.5 flex-shrink-0 rounded-sm overflow-hidden">
            {!failed ? (
              <img 
                alt={`${provider} logo`} 
                className={`w-full h-full object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                src={currentSrc}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={handleError}
              />
            ) : (
              <span className="text-xs font-black font-mono text-gray-400">
                {provider.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-black transition-colors line-clamp-2 min-w-0">
            {displayTitle}
          </h3>
        </div>

        <div className="px-4 pb-3 flex-grow">
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{description}</p>
        </div>

        <div className="px-4 pb-4 mt-auto border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-base font-bold text-green-600 font-mono">{value}</p>
              {valueSubtext && (
                <p className="text-[11px] text-gray-400 mt-0.5">{valueSubtext}</p>
              )}
            </div>
            <div className="relative rounded-sm">
              <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
              <span className="relative inline-flex items-center gap-1 bg-black text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-sm group-hover:bg-accent-yellow group-hover:text-black transition-all duration-200 shadow-[2px_2px_0px_#333] group-hover:shadow-[3px_3px_0px_#111]">
                View
                <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </LinkComponent>
    </div>
  )
}
