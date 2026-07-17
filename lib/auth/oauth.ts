/**
 * OAuth Provider Configuration and Utilities
 * 
 * Handles OAuth authentication with Google, GitHub, and other providers
 */

import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { Provider } from '@supabase/supabase-js'

export type OAuthProvider = 'google' | 'github' | 'gitlab' | 'bitbucket' | 'azure'

export interface OAuthConfig {
  provider: OAuthProvider
  redirectTo?: string
  scopes?: string
}

export interface OAuthResult {
  success: boolean
  error?: string
  url?: string
}

/**
 * Initiate OAuth sign-in flow (client-side)
 */
export async function signInWithOAuth(config: OAuthConfig): Promise<OAuthResult> {
  try {
    const supabase = createBrowserClient()

    const redirectTo = config.redirectTo || `${window.location.origin}/auth/callback`

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: config.provider as Provider,
      options: {
        redirectTo,
        scopes: config.scopes,
        skipBrowserRedirect: true,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    if (data.url && typeof window !== 'undefined') {
      window.location.assign(data.url)
    }

    return {
      success: true,
      url: data.url ?? undefined
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'OAuth sign-in failed'
    }
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(redirectTo?: string): Promise<OAuthResult> {
  return signInWithOAuth({
    provider: 'google',
    redirectTo,
    scopes: 'email profile'
  })
}

/**
 * Sign in with GitHub
 */
export async function signInWithGithub(redirectTo?: string): Promise<OAuthResult> {
  return signInWithOAuth({
    provider: 'github',
    redirectTo,
    scopes: 'user:email'
  })
}

/**
 * Sign in with GitLab
 */
export async function signInWithGitlab(redirectTo?: string): Promise<OAuthResult> {
  return signInWithOAuth({
    provider: 'gitlab',
    redirectTo,
    scopes: 'read_user'
  })
}

/**
 * Sign in with Bitbucket
 */
export async function signInWithBitbucket(redirectTo?: string): Promise<OAuthResult> {
  return signInWithOAuth({
    provider: 'bitbucket',
    redirectTo,
    scopes: 'account'
  })
}

/**
 * Sign in with Azure
 */
export async function signInWithAzure(redirectTo?: string): Promise<OAuthResult> {
  return signInWithOAuth({
    provider: 'azure',
    redirectTo,
    scopes: 'email openid profile'
  })
}

/**
 * Get OAuth provider display name
 */
export function getProviderDisplayName(provider: OAuthProvider): string {
  const names: Record<OAuthProvider, string> = {
    google: 'Google',
    github: 'GitHub',
    gitlab: 'GitLab',
    bitbucket: 'Bitbucket',
    azure: 'Microsoft Azure'
  }
  return names[provider] || provider
}

/**
 * Get OAuth provider icon/logo
 */
export function getProviderIcon(provider: OAuthProvider): string {
  const icons: Record<OAuthProvider, string> = {
    google: '🔍',
    github: '🐙',
    gitlab: '🦊',
    bitbucket: '🪣',
    azure: '☁️'
  }
  return icons[provider] || '🔐'
}

/**
 * Check if OAuth provider is configured
 */
export async function isProviderConfigured(provider: OAuthProvider): Promise<boolean> {
  // This would check if the provider is enabled in Supabase
  // For now, we'll assume Google and GitHub are the primary providers
  const configuredProviders: OAuthProvider[] = ['google', 'github']
  return configuredProviders.includes(provider)
}

/**
 * Get list of available OAuth providers
 */
export async function getAvailableProviders(): Promise<OAuthProvider[]> {
  // Return the list of configured OAuth providers
  // This should be configured based on your Supabase settings
  return ['google', 'github']
}

/**
 * Link OAuth provider to existing account (client-side)
 */
export async function linkOAuthProvider(provider: OAuthProvider): Promise<OAuthResult> {
  try {
    const supabase = createBrowserClient()

    const { data, error } = await supabase.auth.linkIdentity({
      provider: provider as Provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?link=true`
      }
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      url: data.url
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to link OAuth provider'
    }
  }
}

/**
 * Unlink OAuth provider from account (client-side)
 */
export async function unlinkOAuthProvider(provider: OAuthProvider): Promise<OAuthResult> {
  try {
    const supabase = createBrowserClient()

    // Get current user to find the identity to unlink
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    const identity = user.identities?.find(id => id.provider === provider)

    if (!identity) {
      throw new Error(`No linked identity found for ${provider}`)
    }

    const { error } = await supabase.auth.unlinkIdentity(identity)

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to unlink OAuth provider'
    }
  }
}

/**
 * Get linked OAuth providers for current user
 */
export async function getLinkedProviders(): Promise<OAuthProvider[]> {
  try {
    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return []
    }

    // Get identities from user metadata
    const identities = user.identities || []
    return identities.map(identity => identity.provider as OAuthProvider)
  } catch {
    return []
  }
}
