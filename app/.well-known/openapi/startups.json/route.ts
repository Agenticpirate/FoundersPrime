import { NextResponse } from 'next/server'
import { CORS_JSON_HEADERS } from '@/lib/agent-ready/config'
import { openApiStartups } from '@/lib/agent-ready/well-known'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  return NextResponse.json(openApiStartups(), {
    headers: { ...CORS_JSON_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
  })
}
