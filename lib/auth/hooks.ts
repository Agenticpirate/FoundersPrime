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
    // onAuthStateChange fires with INITIAL_SESSION on mount using the stored
    // session. Do NOT add a separate getUser() call — it can race and force
    // false logouts.
    let settled = false
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      settled = true
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // If Supabase never emits INITIAL_SESSION (network hang / bad client),
    // stop blocking the UI after a short timeout.
    const timeout = setTimeout(() => {
      if (!settled) setLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
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
