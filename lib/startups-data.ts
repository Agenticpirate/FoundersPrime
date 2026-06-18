import startupsData from '@/data/yc_companies_2024_2026.json'
import { YCCompany } from '@/types/startup'

/**
 * Lightweight projection of a YC company containing ONLY the fields the
 * startups grid + card actually render. The raw dataset is ~14MB because each
 * record carries long descriptions, Q&A blobs, highlight results, photos, etc.
 * — none of which the listing needs. Trimming here keeps the payload that
 * crosses the server→client boundary at ~0.6MB (a ~95% reduction), which is
 * the single biggest load-time win for the /startups route.
 */
export interface StartupCardData {
  id: number
  name: string
  slug: string
  website: string
  small_logo_thumb_url: string
  one_liner: string
  all_locations: string
  industry: string
  tags: string[]
  founders_enriched: { name: string; avatar?: string }[]
}

const allStartups = startupsData as unknown as YCCompany[]

/** Server-only: trimmed list for the listing grid. Never ship the raw JSON to the client. */
export function getStartupCards(): StartupCardData[] {
  return allStartups.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    website: c.website,
    small_logo_thumb_url: c.small_logo_thumb_url,
    one_liner: c.one_liner ?? '',
    all_locations: c.all_locations ?? '',
    industry: c.industry ?? '',
    tags: Array.isArray(c.tags) ? c.tags : [],
    founders_enriched: Array.isArray(c.founders_enriched)
      ? c.founders_enriched.slice(0, 3).map((f) => ({ name: f.name, avatar: f.avatar }))
      : [],
  }))
}

export function getStartupCount(): number {
  return allStartups.length
}
