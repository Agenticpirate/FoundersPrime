'use client'

import { useEffect } from 'react'

/**
 * Registers browser-side WebMCP tools when navigator.modelContext is available.
 * Scanners and agentic browsers detect tools at page load.
 */
export default function WebMcpProvider() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      modelContext?: {
        registerTool?: (tool: any) => void | Promise<void>
        provideContext?: (ctx: any) => void | Promise<void>
      }
    }

    const ctx = nav.modelContext
    if (!ctx) return

    const tools = [
      {
        name: 'search-deals',
        description:
          'Search FoundersPrime verified startup deals, credits, grants, and programs by keyword.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search keywords, e.g. AWS credits or student grants',
            },
          },
          required: ['query'],
        },
        async execute({ query }: { query: string }) {
          const q = encodeURIComponent(String(query || '').trim())
          window.location.href = `/search?q=${q}`
          return { status: 'redirecting', url: `/search?q=${q}`, query }
        },
      },
      {
        name: 'get-site-info',
        description: 'Get FoundersPrime overview, key URLs, and agent discovery endpoints.',
        inputSchema: { type: 'object', properties: {} },
        async execute() {
          return {
            name: 'FoundersPrime',
            url: 'https://www.foundersprime.com',
            description:
              'Verified startup deals, cloud credits, SaaS discounts, grants, accelerators, and founder programs.',
            llms: 'https://www.foundersprime.com/llms.txt',
            deals: 'https://www.foundersprime.com/deals',
            pricing: 'https://www.foundersprime.com/pricing',
            apiCatalog: 'https://www.foundersprime.com/.well-known/api-catalog',
            mcp: 'https://www.foundersprime.com/.well-known/mcp/server-card.json',
            skills: 'https://www.foundersprime.com/.well-known/agent-skills/index.json',
          }
        },
      },
      {
        name: 'open-pricing',
        description: 'Navigate to FoundersPrime pricing plans.',
        inputSchema: { type: 'object', properties: {} },
        async execute() {
          window.location.href = '/pricing'
          return { status: 'redirecting', url: '/pricing' }
        },
      },
      {
        name: 'browse-programs',
        description: 'Open accelerators, incubators, or grants program listings.',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['accelerators', 'incubators', 'grants', 'programs'],
              description: 'Which program list to open',
            },
          },
          required: ['type'],
        },
        async execute({ type }: { type: string }) {
          const map: Record<string, string> = {
            accelerators: '/deals/accelerators',
            incubators: '/deals/incubators',
            grants: '/deals/grants',
            programs: '/programs',
          }
          const url = map[type] || '/programs'
          window.location.href = url
          return { status: 'redirecting', url }
        },
      },
    ]

    try {
      if (typeof ctx.registerTool === 'function') {
        for (const tool of tools) {
          void ctx.registerTool(tool)
        }
      } else if (typeof ctx.provideContext === 'function') {
        void ctx.provideContext({ tools })
      }
    } catch {
      // WebMCP not fully supported — ignore
    }
  }, [])

  return null
}
