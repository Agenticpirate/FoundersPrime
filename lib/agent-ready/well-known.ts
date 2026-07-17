import { createHash } from 'crypto'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './config'

export function apiCatalogBody() {
  return {
    linkset: [
      {
        anchor: `${SITE_URL}/api/deals`,
        'service-desc': [
          {
            href: `${SITE_URL}/.well-known/openapi/deals.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${SITE_URL}/llms.txt`,
            type: 'text/plain',
          },
          {
            href: `${SITE_URL}/auth.md`,
            type: 'text/markdown',
          },
        ],
        status: [
          {
            href: `${SITE_URL}/api/deals`,
            type: 'application/json',
          },
        ],
      },
      {
        anchor: `${SITE_URL}/api/startups`,
        'service-desc': [
          {
            href: `${SITE_URL}/.well-known/openapi/startups.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${SITE_URL}/llms.txt`,
            type: 'text/plain',
          },
        ],
      },
      {
        anchor: `${SITE_URL}/api/mcp`,
        'service-desc': [
          {
            href: `${SITE_URL}/.well-known/mcp/server-card.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${SITE_URL}/.well-known/agent-skills/index.json`,
            type: 'application/json',
          },
        ],
      },
    ],
  }
}

export function mcpServerCard() {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/mcp-server-card/v0.1.json',
    version: '1.0',
    protocolVersion: '2025-06-18',
    serverInfo: {
      name: 'foundersprime',
      title: SITE_NAME,
      version: '1.0.0',
    },
    description: SITE_DESCRIPTION,
    transport: {
      type: 'streamable-http',
      endpoint: `${SITE_URL}/api/mcp`,
    },
    authentication: {
      required: false,
      schemes: [],
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
    },
    tools: [
      {
        name: 'search_deals',
        title: 'Search startup deals',
        description:
          'Search FoundersPrime verified startup deals by keyword (credits, SaaS, grants, accelerators, etc.).',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search keywords, e.g. "AWS credits" or "student"',
            },
            limit: {
              type: 'number',
              description: 'Max results (default 10)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_site_info',
        title: 'Get site info',
        description: 'Return FoundersPrime site summary, key URLs, and agent discovery endpoints.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'list_categories',
        title: 'List deal categories',
        description: 'List primary deal and program categories on FoundersPrime.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
    resources: [
      {
        name: 'llms.txt',
        uri: `${SITE_URL}/llms.txt`,
        description: 'Curated site index for LLMs',
        mimeType: 'text/plain',
      },
      {
        name: 'llms-full.txt',
        uri: `${SITE_URL}/llms-full.txt`,
        description: 'Expanded catalog for LLMs',
        mimeType: 'text/plain',
      },
      {
        name: 'sitemap',
        uri: `${SITE_URL}/sitemap.xml`,
        description: 'XML sitemap of public pages',
        mimeType: 'application/xml',
      },
    ],
  }
}

export function a2aAgentCard() {
  return {
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    version: '1.0.0',
    url: `${SITE_URL}/api/a2a`,
    provider: {
      organization: SITE_NAME,
      url: SITE_URL,
    },
    documentationUrl: `${SITE_URL}/llms.txt`,
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    defaultInputModes: ['text', 'text/plain'],
    defaultOutputModes: ['text', 'text/plain', 'application/json'],
    supportedInterfaces: [
      {
        url: `${SITE_URL}/api/a2a`,
        transport: 'HTTP+JSON',
      },
    ],
    skills: [
      {
        id: 'search-deals',
        name: 'Search Deals',
        description: 'Search verified startup deals, credits, and programs',
        tags: ['deals', 'credits', 'startups', 'grants'],
        examples: ['Find AWS Activate credits', 'List non-dilutive grants for India'],
      },
      {
        id: 'site-info',
        name: 'Site Info',
        description: 'Explain what FoundersPrime offers and key URLs',
        tags: ['about', 'discovery'],
        examples: ['What is FoundersPrime?'],
      },
    ],
  }
}

export function oauthAuthorizationServer() {
  return {
    issuer: SITE_URL,
    authorization_endpoint: `${SITE_URL}/login`,
    token_endpoint: `${SITE_URL}/api/auth/session`,
    registration_endpoint: `${SITE_URL}/login?view=signup`,
    jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
    response_types_supported: ['code', 'token'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    scopes_supported: ['openid', 'profile', 'email', 'offline_access'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
    claims_supported: ['sub', 'email', 'email_verified', 'name'],
    code_challenge_methods_supported: ['S256'],
    service_documentation: `${SITE_URL}/auth.md`,
    ui_locales_supported: ['en-US'],
  }
}

export function oauthProtectedResource() {
  return {
    resource: SITE_URL,
    authorization_servers: [SITE_URL],
    scopes_supported: ['openid', 'profile', 'email', 'offline_access'],
    bearer_methods_supported: ['header'],
    resource_documentation: `${SITE_URL}/auth.md`,
    resource_signing_alg_values_supported: ['RS256'],
  }
}

/** Skill definitions used for discovery index + digest generation */
export const AGENT_SKILLS = [
  {
    name: 'search-deals',
    type: 'skill-md' as const,
    description:
      'Search and summarize FoundersPrime verified startup deals, credits, grants, and programs.',
    path: '/.well-known/agent-skills/search-deals/SKILL.md',
  },
  {
    name: 'get-site-info',
    type: 'skill-md' as const,
    description: 'Return FoundersPrime overview, pricing tiers, and agent discovery endpoints.',
    path: '/.well-known/agent-skills/get-site-info/SKILL.md',
  },
  {
    name: 'browse-programs',
    type: 'skill-md' as const,
    description: 'Browse accelerators, incubators, and grants listed on FoundersPrime.',
    path: '/.well-known/agent-skills/browse-programs/SKILL.md',
  },
]

export function skillDigest(content: string): string {
  return `sha256:${createHash('sha256').update(content, 'utf8').digest('hex')}`
}

export function openApiDeals() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'FoundersPrime Deals API',
      version: '1.0.0',
      description: 'Public deal listing endpoints for FoundersPrime.',
    },
    servers: [{ url: SITE_URL }],
    paths: {
      '/api/deals': {
        get: {
          summary: 'List or search deals',
          parameters: [
            {
              name: 'q',
              in: 'query',
              schema: { type: 'string' },
              description: 'Optional search query',
            },
          ],
          responses: {
            '200': {
              description: 'Deal list',
              content: {
                'application/json': {
                  schema: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
  }
}

export function openApiStartups() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'FoundersPrime Startups API',
      version: '1.0.0',
      description: 'Public startup listing endpoints for FoundersPrime.',
    },
    servers: [{ url: SITE_URL }],
    paths: {
      '/api/startups': {
        get: {
          summary: 'List startups',
          responses: {
            '200': {
              description: 'Startup list',
              content: {
                'application/json': {
                  schema: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
  }
}
