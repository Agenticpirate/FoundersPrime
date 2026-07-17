import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { Deal } from '@/lib/deals-database'

/**
 * Server-rendered deal link list for crawlers / AEO.
 * Hidden from visual UI (sr-only) but present in HTML so Google & agents
 * can follow deal detail URLs without waiting for client JS.
 */
export default function DealsCrawlIndex({
  deals,
  category,
}: {
  deals: Deal[]
  category?: string
}) {
  if (!deals.length) return null

  const heading = category
    ? `Verified deals in ${category.replace(/-/g, ' ')}`
    : 'Verified startup deals catalog'

  // Inline clip styles so this never dumps a huge visible list if CSS 404s.
  const hide: CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  }

  return (
    <section
      aria-label={heading}
      className="sr-only"
      style={hide}
      data-seo-deals-index="true"
    >
      <h2>{heading}</h2>
      <p>
        {deals.length} deals listed. Each link opens the full verified deal page on
        FoundersPrime.
      </p>
      <ul>
        {deals.map((deal) => (
          <li key={deal.slug || deal.id}>
            <Link href={`/deals/${deal.slug}`}>
              {deal.title || deal.provider}
              {deal.value ? ` — ${deal.value}` : ''}
              {deal.provider ? ` (${deal.provider})` : ''}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
