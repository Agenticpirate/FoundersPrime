import { NextResponse } from 'next/server'
import { CORS_JSON_HEADERS } from '@/lib/agent-ready/config'
import { openApiDeals } from '@/lib/agent-ready/well-known'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  return NextResponse.json(openApiDeals(), {
    headers: { ...CORS_JSON_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
  })
}
