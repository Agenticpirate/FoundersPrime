import { NextRequest, NextResponse } from 'next/server'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/agent-ready/config'

export const dynamic = 'force-dynamic'

/**
 * Minimal Streamable-HTTP MCP endpoint for agent discovery & tool calls.
 * Implements enough of the JSON-RPC surface for list/call tools without a
 * full MCP SDK dependency.
 */
export async function GET() {
  return NextResponse.json({
    name: 'foundersprime',
    title: SITE_NAME,
    version: '1.0.0',
    protocol: 'mcp',
    transport: 'streamable-http',
    documentation: `${SITE_URL}/.well-known/mcp/server-card.json`,
    tools: TOOL_DEFS.map(({ name, description }) => ({ name, description })),
  })
}

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return jsonRpcError(null, -32700, 'Parse error')
  }

  // Support batch arrays minimally
  if (Array.isArray(body)) {
    const results = []
    for (const item of body) {
      results.push(await handleMessage(item))
    }
    return NextResponse.json(results)
  }

  return NextResponse.json(await handleMessage(body))
}

async function handleMessage(msg: any) {
  const id = msg?.id ?? null
  const method = msg?.method

  if (!method) {
    return rpcError(id, -32600, 'Invalid Request')
  }

  switch (method) {
    case 'initialize':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2025-06-18',
          capabilities: { tools: {}, resources: {} },
          serverInfo: { name: 'foundersprime', version: '1.0.0' },
        },
      }
    case 'notifications/initialized':
      return { jsonrpc: '2.0', id, result: {} }
    case 'ping':
      return { jsonrpc: '2.0', id, result: {} }
    case 'tools/list':
      return {
        jsonrpc: '2.0',
        id,
        result: { tools: TOOL_DEFS },
      }
    case 'tools/call': {
      const name = msg?.params?.name
      const args = msg?.params?.arguments || {}
      try {
        const text = await callTool(name, args)
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text }],
            isError: false,
          },
        }
      } catch (err: any) {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: err?.message || 'Tool error' }],
            isError: true,
          },
        }
      }
    }
    case 'resources/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          resources: [
            {
              uri: `${SITE_URL}/llms.txt`,
              name: 'llms.txt',
              mimeType: 'text/plain',
            },
            {
              uri: `${SITE_URL}/llms-full.txt`,
              name: 'llms-full.txt',
              mimeType: 'text/plain',
            },
            {
              uri: `${SITE_URL}/sitemap.xml`,
              name: 'sitemap',
              mimeType: 'application/xml',
            },
          ],
        },
      }
    default:
      return rpcError(id, -32601, `Method not found: ${method}`)
  }
}

const TOOL_DEFS = [
  {
    name: 'search_deals',
    description:
      'Search FoundersPrime verified startup deals by keyword (credits, SaaS, grants, accelerators).',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keywords' },
        limit: { type: 'number', description: 'Max results (default 10)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_site_info',
    description: 'Return FoundersPrime site summary and agent discovery endpoints.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_categories',
    description: 'List primary deal and program categories on FoundersPrime.',
    inputSchema: { type: 'object', properties: {} },
  },
]

async function callTool(name: string, args: Record<string, any>): Promise<string> {
  switch (name) {
    case 'get_site_info':
      return JSON.stringify(
        {
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          llms: `${SITE_URL}/llms.txt`,
          deals: `${SITE_URL}/deals`,
          pricing: `${SITE_URL}/pricing`,
          discovery: {
            apiCatalog: `${SITE_URL}/.well-known/api-catalog`,
            mcp: `${SITE_URL}/.well-known/mcp/server-card.json`,
            skills: `${SITE_URL}/.well-known/agent-skills/index.json`,
            agentCard: `${SITE_URL}/.well-known/agent-card.json`,
            auth: `${SITE_URL}/auth.md`,
          },
        },
        null,
        2
      )
    case 'list_categories':
      return JSON.stringify(
        {
          categories: [
            { id: 'cloud-credits', name: 'Cloud Credits', url: `${SITE_URL}/deals?category=cloud-credits` },
            { id: 'saas-discounts', name: 'SaaS Discounts', url: `${SITE_URL}/deals?category=saas-discounts` },
            { id: 'ad-credits', name: 'Ad Credits', url: `${SITE_URL}/deals?category=ad-credits` },
            { id: 'accelerators', name: 'Accelerators', url: `${SITE_URL}/programs/accelerators` },
            { id: 'incubators', name: 'Incubators', url: `${SITE_URL}/programs/incubators` },
            { id: 'grants', name: 'Grants', url: `${SITE_URL}/programs/grants` },
            { id: 'ideas', name: 'Startup Ideas', url: `${SITE_URL}/ideas` },
            { id: 'student-benefits', name: 'Student Benefits', url: `${SITE_URL}/student-benefits` },
          ],
        },
        null,
        2
      )
    case 'search_deals': {
      const query = String(args.query || '').trim()
      const limit = Math.min(Math.max(Number(args.limit) || 10, 1), 25)
      if (!query) throw new Error('query is required')

      // Best-effort live search against the public deals API
      try {
        const url = new URL(`${SITE_URL}/api/deals`)
        url.searchParams.set('q', query)
        const res = await fetch(url.toString(), {
          headers: { Accept: 'application/json' },
          next: { revalidate: 300 },
        })
        if (res.ok) {
          const data = await res.json()
          const items = Array.isArray(data)
            ? data
            : Array.isArray(data?.deals)
              ? data.deals
              : Array.isArray(data?.data)
                ? data.data
                : []
          const slim = items.slice(0, limit).map((d: any) => ({
            name: d.name || d.title,
            slug: d.slug,
            provider: d.provider,
            value: d.value || d.creditAmount || d.amount,
            url: d.slug ? `${SITE_URL}/deals/${d.slug}` : `${SITE_URL}/deals`,
            summary: d.summary || d.description || d.shortDescription,
          }))
          if (slim.length) {
            return JSON.stringify({ query, count: slim.length, results: slim }, null, 2)
          }
        }
      } catch {
        // fall through to guided response
      }

      return JSON.stringify(
        {
          query,
          message:
            'Live deal search unavailable from this runtime. Open the search/deals URLs below.',
          searchUrl: `${SITE_URL}/search?q=${encodeURIComponent(query)}`,
          dealsUrl: `${SITE_URL}/deals`,
          llms: `${SITE_URL}/llms.txt`,
        },
        null,
        2
      )
    }
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

function rpcError(id: any, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } }
}

function jsonRpcError(id: any, code: number, message: string) {
  return NextResponse.json(rpcError(id, code, message), { status: 400 })
}
