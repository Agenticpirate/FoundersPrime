import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * Verified Startups is retired from the public FoundersPrime product surface.
 * Data + components remain in-repo for reuse on another site:
 *   - data/yc_companies_2024_2026.json
 *   - lib/startups-data.ts
 *   - components/startups/**
 *   - app/api/startups/**
 * See docs/ARCHIVED-STARTUPS.md
 */
export const metadata: Metadata = {
  title: 'Verified Startups',
  robots: { index: false, follow: false },
}

export default function StartupsPage() {
  redirect('/ideas')
}
