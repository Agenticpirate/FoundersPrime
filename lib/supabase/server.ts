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

  // Next.js page components/route handlers might run in edge/serverless environments
  // where cookies are dropped on cross-site/SameSite boundaries.
  // Fall back to reading the raw Authorization Bearer token header if present.
  const cookieStore = cookies()
  
  // Safe dynamic read of headers on the server side
  let authHeader = ''
  if (typeof window === 'undefined') {
    try {
      // ONLY read headers inside a dynamic request execution context.
      // Next.js static page compilation calls createClient() during build time where next/headers is not allowed.
      const { headers: getHeaders } = require('next/headers')
      const headersList = getHeaders()
      authHeader = headersList.get('Authorization') || ''
    } catch (e) {
      // Ignore if headers API is not readable during static build or serverless init
    }
  }

  return createServerClient(url, anonKey, {
    global: {
      headers: {
        Authorization: authHeader
      }
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  })
}
