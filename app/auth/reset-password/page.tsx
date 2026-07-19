'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Legacy reset URL — establishes recovery session if tokens are present,
 * then redirects into the login page reset panel (synced UI).
 */
export default function ResetPasswordPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Opening password reset…')

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      const params = new URLSearchParams(window.location.search)
      const hashParams = new URLSearchParams(hash.replace(/^#/, ''))

      try {
        const supabase = createClient()
        const code = params.get('code')
        if (code) {
          setStatus('Verifying reset link…')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            router.replace(
              `/login?view=forgot&error=${encodeURIComponent(error.message)}`
            )
            return
          }
        } else if (params.get('token_hash') && params.get('type') === 'recovery') {
          setStatus('Verifying reset link…')
          const { error } = await supabase.auth.verifyOtp({
            token_hash: params.get('token_hash')!,
            type: 'recovery',
          })
          if (error) {
            router.replace(
              `/login?view=forgot&error=${encodeURIComponent(error.message)}`
            )
            return
          }
        } else if (hashParams.has('access_token')) {
          // detectSessionInUrl will parse hash on client init
          await supabase.auth.getSession()
        }
      } catch {
        // Fall through to login reset UI
      }

      if (!cancelled) {
        router.replace('/login?view=reset')
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-wider text-center">
        <span className="material-symbols-outlined !text-[20px] animate-spin text-accent-yellow">
          progress_activity
        </span>
        {status}
      </div>
    </div>
  )
}
