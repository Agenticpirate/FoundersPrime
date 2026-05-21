/**
 * Supabase Browser Client
 * 
 * Use this client for client-side operations (React components).
 * This client uses the anon key and respects RLS policies.
 *
 * If env vars are missing (e.g. local dev without .env.local), returns a
 * graceful stub so the app doesn't crash. Auth features will simply behave
 * as "logged out" until real credentials are provided.
 */

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Cached "not signed in" stub for local dev / missing config.
let stubInstance: SupabaseClient | null = null

function createStubClient(): SupabaseClient {
  if (stubInstance) return stubInstance

  const noSession = { data: { session: null }, error: null }
  const noUser = { data: { user: null }, error: null }
  const subscription = { unsubscribe() {} }

  // Minimal shape covering the auth methods used across the app.
  const auth = {
    getSession: async () => noSession,
    getUser: async () => noUser,
    onAuthStateChange: (_cb: any) => ({ data: { subscription } }),
    signOut: async () => ({ error: null }),
    signInWithOAuth: async () => ({ data: { provider: null, url: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: 'Auth is not configured in this environment.' } }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: 'Auth is not configured in this environment.' } }),
    resetPasswordForEmail: async () => ({ data: {}, error: null }),
    updateUser: async () => ({ data: { user: null }, error: null }),
    exchangeCodeForSession: async () => ({ data: { user: null, session: null }, error: null }),
  }

  // Builder that resolves to empty results for any chained query call.
  const buildEmptyQuery = () => {
    const result = { data: null, error: null, count: 0 }
    const handler: ProxyHandler<any> = {
      get(_t, prop) {
        if (prop === 'then') {
          // Make the builder thenable so `await supabase.from(...).select(...)` works.
          return (resolve: any) => Promise.resolve(result).then(resolve)
        }
        if (prop === 'single' || prop === 'maybeSingle') {
          return async () => result
        }
        // Any other chained method just returns the same proxy.
        return () => proxy
      },
    }
    const proxy: any = new Proxy(() => proxy, handler)
    return proxy
  }

  stubInstance = {
    auth,
    from: () => buildEmptyQuery(),
    rpc: async () => ({ data: null, error: null }),
    storage: { from: () => ({}) },
  } as unknown as SupabaseClient

  if (typeof window !== 'undefined' && !(window as any).__supabaseStubLogged) {
    ;(window as any).__supabaseStubLogged = true
    // eslint-disable-next-line no-console
    console.warn(
      '[supabase/client] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing — using stub client. Auth features are disabled.'
    )
  }

  return stubInstance
}

export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return createStubClient()
  }

  return createBrowserClient(url, anonKey)
}
