import { NextResponse } from 'next/server'
import { CORS_JSON_HEADERS } from '@/lib/agent-ready/config'

export const dynamic = 'force-static'
export const revalidate = 3600

/**
 * Public JWKS endpoint for OAuth discovery completeness.
 * Session tokens are issued by Supabase; this keyset is intentionally empty
 * unless you later publish site-signed tokens.
 */
export async function GET() {
  return NextResponse.json(
    { keys: [] },
    {
      headers: {
        ...CORS_JSON_HEADERS,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: { ...CORS_JSON_HEADERS } })
}
