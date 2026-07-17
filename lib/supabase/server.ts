/**
 * Supabase Server Client
 *
 * Use this client for server-side operations (Server Components, Route Handlers, Server Actions).
 * This client properly handles cookies for session management.
 *
 * If env vars are missing (e.g. local dev without .env.local), returns a graceful
 * stub so server components don't crash. Auth-dependent features behave as "logged out".
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'

let serverStub: SupabaseClient | null = null

function createServerStub(): SupabaseClient {
  if (serverStub) return serverStub

  const noSession = { data: { session: null }, error: null }
  const noUser = { data: { user: null }, error: null }
  const subscription = { unsubscribe() {} }

  const auth = {
    getSession: async () => noSession,
    getUser: async () => noUser,
    onAuthStateChange: (_cb: any) => ({ data: { subscription } }),
    signOut: async () => ({ error: null }),
    admin: {
      listUsers: async () => ({ data: { users: [] }, error: null }),
    },
  }

  const buildEmptyQuery = () => {
    const result = { data: null, error: null, count: 0 }
    const handler: ProxyHandler<any> = {
      get(_t, prop) {
        if (prop === 'then') return (resolve: any) => Promise.resolve(result).then(resolve)
        if (prop === 'single' || prop === 'maybeSingle') return async () => result
        return () => proxy
      },
    }
    const proxy: any = new Proxy(() => proxy, handler)
    return proxy
  }

  serverStub = {
    auth,
    from: () => buildEmptyQuery(),
    rpc: async () => ({ data: null, error: null }),
    storage: { from: () => ({}) },
  } as unknown as SupabaseClient

  return serverStub
}

export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[supabase/server] Supabase env vars missing — using stub client.')
    }
    return createServerStub()
  }

  const cookieStore = cookies()

  // Optional Bearer override. NEVER set Authorization to "" — empty header
  // overrides cookie session and breaks getUser() in admin route handlers.
  let authHeader = ''
  if (typeof window === 'undefined') {
    try {
      const { headers: getHeaders } = require('next/headers')
      const headersList = getHeaders()
      const raw = headersList.get('Authorization') || headersList.get('authorization') || ''
      if (/^Bearer\s+\S+/i.test(String(raw).trim())) {
        authHeader = String(raw).trim()
      }
    } catch {
      // headers unavailable during static build
    }
  }

  const options: any = {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // Server Component — ignore
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch {
          // Server Component — ignore
        }
      },
    },
  }

  if (authHeader) {
    options.global = {
      headers: {
        Authorization: authHeader,
      },
    }
  }

  return createServerClient(url, anonKey, options) as SupabaseClient
}
