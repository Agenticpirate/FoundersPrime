import startupsData from '@/data/yc_companies_2024_2026.json'
import { YCCompany } from '@/types/startup'

/**
 * Lightweight projection of a YC company for the Verified Startups UI.
 *
 * PUBLIC SURFACE: retired on foundersprime.com (/startups redirects to /ideas).
 * DATA KEPT: this module + data/yc_companies_2024_2026.json + components/startups/*
 * remain for reuse on another site. See docs/ARCHIVED-STARTUPS.md.
 *
 * The raw dataset is large (~14MB). Trimming here keeps listing payloads ~0.6MB.
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
