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
    // onAuthStateChange fires with INITIAL_SESSION synchronously on mount
    // using the stored session from cookies/localStorage. This is the correct
    // and only way to initialise client-side auth state.
    //
    // Do NOT add a separate getUser() call here — it creates a race condition
    // where the async network response can override the correct session state
    // with null (e.g. if the JWT has minor clock skew), causing false logouts.
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
