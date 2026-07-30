import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmailPreferencesForm from '@/components/email/EmailPreferencesForm'

export const metadata: Metadata = {
  title: 'Email preferences',
  description: 'Choose which FoundersPrime emails you receive.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

/**
 * Public preference centre.
 *
 * Reachable from any email via a signed token, with no login required. Without a
 * token it falls back to the signed-in session, so the page also works when
 * opened directly from the dashboard.
 */
export default function EmailPreferencesPage({
  searchParams,
}: {
  searchParams: { token?: string; action?: string }
}) {
  const token = typeof searchParams?.token === 'string' ? searchParams.token : undefined
  const autoUnsubscribe = searchParams?.action === 'unsubscribe'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#f7f7f5] dark:bg-black">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="font-mono text-2xl md:text-3xl font-black tracking-tight text-black dark:text-white">
            Email preferences
          </h1>
          <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400">
            You choose what lands in your inbox. Changes apply immediately.
          </p>

          <div className="mt-6 bg-white dark:bg-[#0d0d0d] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.06)] rounded-sm p-4 md:p-6">
            <EmailPreferencesForm token={token} autoUnsubscribe={autoUnsubscribe} />
          </div>

          {!token && (
            <p className="mt-5 text-[12px] text-gray-500 dark:text-gray-500">
              Not signed in?{' '}
              <Link href="/login" className="underline font-semibold">
                Sign in
              </Link>{' '}
              or open the preferences link from any FoundersPrime email.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
