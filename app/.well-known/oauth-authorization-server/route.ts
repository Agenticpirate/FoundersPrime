import { NextResponse } from 'next/server'
import { CORS_JSON_HEADERS } from '@/lib/agent-ready/config'
import { oauthAuthorizationServer } from '@/lib/agent-ready/well-known'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  return NextResponse.json(oauthAuthorizationServer(), {
    headers: {
      ...CORS_JSON_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: { ...CORS_JSON_HEADERS } })
}
