import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

/**
 * Detail routes for Verified Startups are retired publicly.
 * Dataset and UI components are preserved under components/startups + data/.
 */
export const metadata: Metadata = {
  title: 'Verified Startups',
  robots: { index: false, follow: false },
}

export default function StartupDetailPage() {
  redirect('/ideas')
}
