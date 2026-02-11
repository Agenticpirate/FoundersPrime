# Authentication Module

Complete authentication system for FoundersPrime with JWT token management, session handling, OAuth integration, and email verification.

## Features

✅ **Email/Password Authentication** - Traditional signup and login  
✅ **OAuth Providers** - Google, GitHub, GitLab, Bitbucket, Azure  
✅ **JWT Token Management** - Automatic token refresh and validation  
✅ **Session Management** - Secure session handling with auto-refresh  
✅ **Email Verification** - Secure email verification flow  
✅ **Route Protection** - Middleware-based route protection  
✅ **Role-Based Access** - Support for Free, Pro, and Admin users  
✅ **API Authentication** - Middleware for API route protection  
✅ **Security Features** - Rate limiting, CORS, input validation  

## Quick Start

### 1. Setup Environment

```bash
# Copy example env file
cp .env.local.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Basic Usage

```typescript
'use client'

import { useAuth } from '@/lib/auth'

export function MyComponent() {
  const { user, loading, signOut } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please login</div>

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## Module Structure

```
lib/auth/
├── actions.ts              # Server actions (login, signup, logout)
├── hooks.ts                # React hooks (useAuth)
├── user-context.ts         # User context and Pro status
├── jwt.ts                  # JWT token management
├── middleware.ts           # Authentication middleware
├── email-verification.ts   # Email verification utilities
├── oauth.ts                # OAuth provider integration
├── session.ts              # Session management
└── index.ts                # Module exports
```

## Core Modules

### 1. Actions (`actions.ts`)

Server actions for authentication operations.

```typescript
import { login, signup, logout, forgotPassword, updatePassword } from '@/lib/auth'

// Login
const result = await login(formData)

// Signup
const result = await signup(formData)

// Logout
await logout()

// Password reset
const result = await forgotPassword(formData)
```

### 2. Hooks (`hooks.ts`)

React hooks for client-side authentication.

```typescript
import { useAuth } from '@/lib/auth'

const { 
  user,                  // Current user
  session,               // Current session
  loading,               // Loading state
  isAuthenticated,       // Auth status
  signOut,               // Sign out function
  signInWithGoogle,      // Google OAuth
  signInWithGithub       // GitHub OAuth
} = useAuth()
```

### 3. JWT Management (`jwt.ts`)

Token validation and refresh utilities.

```typescript
import { 
  validateToken,
  refreshToken,
  getSessionWithRefresh,
  isTokenExpiringSoon 
} from '@/lib/auth'

// Validate current token
const validation = await validateToken()

// Refresh token
const result = await refreshToken()

// Get session with auto-refresh
const session = await getSessionWithRefresh()

// Check if token expires soon
const expiring = await isTokenExpiringSoon()
```

### 4. Session Management (`session.ts`)

Session handling and monitoring.

```typescript
import { 
  getSession,
  refreshSession,
  endSession,
  setupAutoRefresh 
} from '@/lib/auth'

// Get current session
const session = await getSession()

// Refresh session
const refreshed = await refreshSession()

// End session
await endSession()

// Setup auto-refresh (client-side)
const cleanup = setupAutoRefresh(50) // Refresh every 50 minutes
```

### 5. Email Verification (`email-verification.ts`)

Email verification flow.

```typescript
import { 
  sendVerificationEmail,
  getEmailVerificationStatus,
  requireEmailVerification 
} from '@/lib/auth'

// Send verification email
await sendVerificationEmail('user@example.com')

// Check verification status
const status = await getEmailVerificationStatus()

// Require verification (middleware)
const check = await requireEmailVerification()
if (!check.verified) {
  redirect(check.redirectUrl!)
}
```

### 6. OAuth Integration (`oauth.ts`)

OAuth provider integration.

```typescript
import { 
  signInWithGoogle,
  signInWithGithub,
  linkOAuthProvider,
  getLinkedProviders 
} from '@/lib/auth'

// Sign in with Google
await signInWithGoogle('/dashboard')

// Sign in with GitHub
await signInWithGithub('/dashboard')

// Link OAuth provider
await linkOAuthProvider('google')

// Get linked providers
const providers = await getLinkedProviders()
```

### 7. Middleware (`middleware.ts`)

API route protection and utilities.

```typescript
import { 
  withAuth,
  rateLimit,
  validateRequestBody,
  apiResponse,
  apiError 
} from '@/lib/auth'

// Protect API route
export async function GET(request: NextRequest) {
  const auth = await withAuth(request, { requireAuth: true })
  if (!auth.authorized) return auth.response
  
  return apiResponse({ data: 'Protected data' })
}

// Rate limiting
const limiter = rateLimit({ maxRequests: 100, windowMs: 60000 })

// Validate request body
const validation = await validateRequestBody(request, ['email', 'name'])
```

## API Routes

### Session Management

```bash
GET    /api/auth/session          # Get current session
POST   /api/auth/session          # Refresh session
DELETE /api/auth/session          # End session (logout)
```

### User Information

```bash
GET    /api/auth/me               # Get current user info
```

### Email Verification

```bash
POST   /api/auth/verify-email     # Send verification email
GET    /api/auth/verify-email     # Check verification status
```

## Route Protection

### Middleware Configuration

Protected routes are automatically handled by middleware:

```typescript
// middleware.ts
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|auth/callback).*)',
  ],
}
```

**Protected Routes:**
- `/dashboard/*` - Requires authentication
- `/billing/*` - Requires authentication
- `/admin/*` - Requires authentication

**Auth Routes** (redirect if authenticated):
- `/login`
- `/signup`
- `/forgot-password`

### API Route Protection

```typescript
import { withAuth } from '@/lib/auth'

// Require authentication
export async function GET(request: NextRequest) {
  const auth = await withAuth(request, { requireAuth: true })
  if (!auth.authorized) return auth.response
  
  return Response.json({ user: auth.user })
}

// Require admin access
export async function POST(request: NextRequest) {
  const auth = await withAuth(request, { 
    requireAuth: true,
    requireAdmin: true 
  })
  if (!auth.authorized) return auth.response
  
  return Response.json({ message: 'Admin only' })
}

// Require Pro access
export async function GET(request: NextRequest) {
  const auth = await withAuth(request, { 
    requireAuth: true,
    requirePro: true 
  })
  if (!auth.authorized) return auth.response
  
  return Response.json({ premiumContent: '...' })
}
```

## User Roles

### Free User
- Basic access to platform
- Limited features

### Pro User
- Full access to premium features
- Configured in `lib/auth/user-context.ts`

```typescript
const PRO_USERS = [
  'raviteja.journal@gmail.com',
  // Add more pro users here
]
```

### Admin User
- Full platform access
- Content management
- User management
- Stored in `admin_users` table

## Security Features

### 1. Rate Limiting

```typescript
import { rateLimit } from '@/lib/auth'

const limiter = rateLimit({ maxRequests: 5, windowMs: 60000 })

export async function POST(request: NextRequest) {
  const limit = limiter(request.ip || 'anonymous')
  
  if (!limit.allowed) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  // Process request
}
```

### 2. Input Validation

```typescript
import { validateRequestBody } from '@/lib/auth'

const validation = await validateRequestBody<{ email: string }>(
  request,
  ['email']
)

if (!validation.valid) {
  return Response.json({ error: validation.error }, { status: 400 })
}
```

### 3. CORS Configuration

```typescript
import { corsHeaders, handleCorsOptions } from '@/lib/auth'

export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request)
}

export async function GET(request: NextRequest) {
  return Response.json(data, {
    headers: corsHeaders(request.headers.get('origin') || undefined)
  })
}
```

### 4. Session Security

- Automatic token refresh
- Session expiry monitoring
- Activity logging
- Multi-session detection

## Documentation

- **[Authentication Guide](../../docs/AUTHENTICATION_GUIDE.md)** - Complete authentication guide
- **[OAuth Setup](../../docs/OAUTH_SETUP.md)** - OAuth provider configuration
- **[Database Setup](../../docs/DATABASE_SETUP.md)** - Database schema and setup

## Testing

```typescript
// Test authentication flow
import { login, signup, getSession } from '@/lib/auth'

// Test signup
const signupResult = await signup(formData)
expect(signupResult.success).toBe(true)

// Test login
const loginResult = await login(formData)
expect(loginResult.error).toBeUndefined()

// Test session
const session = await getSession()
expect(session.isAuthenticated).toBe(true)
```

## Troubleshooting

### Common Issues

**"Session expired"**
- Use `getSessionWithRefresh()` instead of `getSession()`
- Implement auto-refresh with `setupAutoRefresh()`

**"Email not verified"**
- Check status with `getEmailVerificationStatus()`
- Resend with `sendVerificationEmail()`

**"OAuth callback error"**
- Verify callback URL in OAuth app settings
- Check Supabase logs
- Ensure environment variables are set

**"Unauthorized" on protected routes**
- Check if user is authenticated
- Verify middleware configuration
- Check browser cookies

## Support

For issues or questions:
1. Check the [Authentication Guide](../../docs/AUTHENTICATION_GUIDE.md)
2. Review [OAuth Setup](../../docs/OAUTH_SETUP.md)
3. Check Supabase Dashboard logs
4. Review browser console errors

## License

Part of the FoundersPrime project.
