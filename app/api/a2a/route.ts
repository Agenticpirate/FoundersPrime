import { NextRequest, NextResponse } from 'next/server'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/agent-ready/config'

export const dynamic = 'force-dynamic'

/** Lightweight A2A-compatible JSON endpoint for agent-to-agent discovery. */
export async function GET() {
  return NextResponse.json({
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/api/a2a`,
    card: `${SITE_URL}/.well-known/agent-card.json`,
    skills: ['search-deals', 'site-info'],
  })
}

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const skill = body?.skill || body?.params?.skill || body?.message?.skill
  const text =
    body?.message?.parts?.[0]?.text ||
    body?.params?.message ||
    body?.query ||
    body?.text ||
    ''

  if (skill === 'site-info' || /what is foundersprime/i.test(String(text))) {
    return NextResponse.json({
      role: 'agent',
      parts: [
        {
          type: 'text',
          text: `${SITE_NAME}: ${SITE_DESCRIPTION}\n\nStart here: ${SITE_URL}/llms.txt`,
        },
      ],
    })
  }

  const q = String(text || '').trim() || 'startup credits'
  return NextResponse.json({
    role: 'agent',
    parts: [
      {
        type: 'text',
        text: `Search FoundersPrime for “${q}”:\n- ${SITE_URL}/search?q=${encodeURIComponent(q)}\n- ${SITE_URL}/deals\n- ${SITE_URL}/llms.txt`,
      },
    ],
  })
}
