import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * On-demand ISR revalidation endpoint.
 *
 * Deal/program pages are statically generated with `revalidate = 3600`
 * (hourly). This endpoint lets you flush a specific path immediately after
 * editing a deal, instead of waiting for the hourly window.
 *
 * SECURITY: This mutates server cache, so it is protected by a bearer secret.
 * Set REVALIDATION_SECRET in your environment. (Falls back to
 * SUPABASE_SERVICE_ROLE_KEY so it still works before the new var is added.)
 *
 * Usage:
 *   POST /api/revalidate
 *   Authorization: Bearer <secret>
 *   Body: { "path": "/deals/notion" }   // or { "slug": "notion" }
 *   Body (multiple): { "paths": ["/deals/notion", "/deals/aws-activate"] }
 */

export const dynamic = 'force-dynamic'

function isAuthorized(request: Request): boolean {
  const expected = process.env.REVALIDATION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!expected) return false
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${expected}`
}

// Normalize a slug or path into a concrete app route under /deals.
function toDealPath(input: string): string {
  const trimmed = input.trim()
  if (trimmed.startsWith('/')) return trimmed
  return `/deals/${trimmed}`
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Collect requested paths from path / slug / paths
  const requested: string[] = []
  if (typeof body?.path === 'string') requested.push(body.path)
  if (typeof body?.slug === 'string') requested.push(toDealPath(body.slug))
  if (Array.isArray(body?.paths)) {
    for (const p of body.paths) {
      if (typeof p === 'string') requested.push(p.startsWith('/') ? p : toDealPath(p))
    }
  }

  if (requested.length === 0) {
    return NextResponse.json(
      { error: 'Provide a "path", "slug", or "paths" to revalidate.' },
      { status: 400 }
    )
  }

  const revalidated: string[] = []
  for (const path of requested) {
    try {
      revalidatePath(path)
      revalidated.push(path)
    } catch (err) {
      console.error(`Failed to revalidate ${path}:`, err)
    }
  }

  return NextResponse.json({
    revalidated: true,
    paths: revalidated,
    now: Date.now(),
  })
}
