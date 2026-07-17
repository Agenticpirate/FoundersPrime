# auth.md

Agent authentication guide for **FoundersPrime**.

## Audience
AI agents and MCP clients that need to understand how humans sign in to FoundersPrime, and what is available without authentication.

## Public (no auth required)
- Browse deals, programs, startups, ideas, and resources
- Read `llms.txt`, `llms-full.txt`, and `sitemap.xml`
- Discover APIs via `/.well-known/api-catalog`
- Call public JSON endpoints such as `/api/deals` and `/api/startups` (rate limited)
- Use discovery docs under `/.well-known/`

## Human registration / login
- Login: https://www.foundersprime.com/login
- Signup: https://www.foundersprime.com/login?view=signup
- Password reset: https://www.foundersprime.com/forgot-password
- Email verification: handled via `/auth/verify-email` and `/auth/callback`

Authentication is powered by **Supabase Auth** (email magic/password and OAuth providers configured for the project). Browser sessions use secure HTTP-only cookies refreshed by Next.js middleware.

## OAuth / OIDC discovery (this site)
- Authorization server metadata: `/.well-known/oauth-authorization-server`
- OpenID configuration: `/.well-known/openid-configuration`
- Protected resource metadata: `/.well-known/oauth-protected-resource`
- JWKS: `/.well-known/jwks.json`

## Agent registration
FoundersPrime does **not** currently expose automated agent credential issuance (`POST /agent/auth`). Agents should:

1. Use public discovery documents and public APIs without credentials
2. Send the human through the normal login/signup UI when member-only actions are required (saved deals, billing, dashboard)
3. Never ask users to paste passwords into the agent chat

## Member-only capabilities (after human login)
- Save deals and ideas
- Access billing / subscription management
- Submit deals (subject to review)
- Dashboard features

## Security notes
- All API routes are rate limited
- Webhooks are signature-verified
- Prefer `Accept: text/markdown` to reduce tokens when reading public pages
