'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Memoize the supabase client to prevent recreation on every render
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    // getUser() validates the session with the Supabase server on every call.
    // Do NOT use getSession() here — it only reads from local cache and can
    // return a stale/null session on cold loads, firing a false SIGNED_OUT event.
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes (token refresh, sign-in, sign-out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
    // Force page reload to clear all state
    window.location.href = '/login'
  }

  const signInWithGoogle = async (redirectAfter?: string) => {
    const next = redirectAfter || window.location.pathname + window.location.search
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) throw error
  }

  const signInWithGithub = async (redirectAfter?: string) => {
    const next = redirectAfter || window.location.pathname + window.location.search
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) throw error
  }

  return {
    user,
    session,
    loading,
    signOut,
    signInWithGoogle,
    signInWithGithub,
    isAuthenticated: !!user,
  }
}
