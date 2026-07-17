import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { CORS_JSON_HEADERS, SITE_URL } from '@/lib/agent-ready/config'
import { AGENT_SKILLS, skillDigest } from '@/lib/agent-ready/well-known'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const skills = []

  for (const skill of AGENT_SKILLS) {
    const filePath = path.join(process.cwd(), 'public', skill.path.replace(/^\//, ''))
    let digest = 'sha256:unknown'
    try {
      const content = await fs.readFile(filePath, 'utf8')
      digest = skillDigest(content)
    } catch {
      // Fallback digests if filesystem unavailable (edge) — keep discovery valid
      const FALLBACK: Record<string, string> = {
        'search-deals':
          'sha256:5b8f6cc7426707eb23579948527fc3de3106709d6375ba0810d6cf5dcb0adda4',
        'get-site-info':
          'sha256:b2bb30265680153b269fb70ef46b43f2fc865537382b4203b3ea68a1d55ca7ba',
        'browse-programs':
          'sha256:66a4dee9866593c1a93df37cbca8f4137bd1755f937fb420e5d10acbe4cd2fa5',
      }
      digest = FALLBACK[skill.name] || digest
    }

    skills.push({
      name: skill.name,
      type: skill.type,
      description: skill.description,
      url: `${SITE_URL}${skill.path}`,
      digest,
    })
  }

  return NextResponse.json(
    {
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      version: '0.2.0',
      name: 'FoundersPrime Agent Skills',
      description: 'Skills that help AI agents use FoundersPrime effectively.',
      skills,
    },
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
