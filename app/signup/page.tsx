'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleCredentialResponse = async (response: any) => {
      setError(null)
      setLoading(true)
      try {
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        })
        if (error) {
          setError(error.message)
        } else {
          window.location.href = '/dashboard'
        }
      } catch {
        setError('An unexpected error occurred during Google authentication.')
      } finally {
        setLoading(false)
      }
    }

    const initGoogleGSI = () => {
      const g = (window as any).google
      if (g && g.accounts && g.accounts.id) {
        g.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '310275392560-0g3esttkosm3tehjpc6rmu128okh44kr.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        })
        
        g.accounts.id.prompt()

        const el = document.getElementById('google-signup-btn')
        if (el && el.children.length === 0) {
          g.accounts.id.renderButton(el, {
            type: 'standard',
            shape: 'rectangular',
            theme: 'outline',
            size: 'large',
            width: 120,
          })
        }
      }
    }

    let script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]') as HTMLScriptElement
    if (!script) {
      script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    const g = (window as any).google
    if (g && g.accounts && g.accounts.id) {
      initGoogleGSI()
    } else {
      script.addEventListener('load', initGoogleGSI)
    }

    const observer = new MutationObserver(() => {
      initGoogleGSI()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [mounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validation
    if (!fullName.trim()) {
      setError('Full name is required')
      setLoading(false)
      return
    }

    if (fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters')
      setLoading(false)
      return
    }

    if (!email.trim()) {
      setError('Email is required')
      setLoading(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    // Password strength validation
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter')
      setLoading(false)
      return
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter')
      setLoading(false)
      return
    }

    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignup = async (provider: 'google' | 'github' | 'linkedin') => {
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'linkedin' ? 'linkedin_oidc' : provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    // Redirect to pending verification page
    router.push(`/auth/pending-verification?email=${encodeURIComponent(email)}`)
    return null
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1 flex items-center justify-center py-6 md:py-8 px-4">
        <div className="w-full max-w-md">
          <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8">
            <div className="text-center mb-4 md:mb-6">
              <img src="/logo-icon.png" alt="FoundersPrime" className="h-12 w-auto object-contain mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <h1 className="text-2xl font-black uppercase">Join FoundersPrime</h1>
              <p className="text-gray-600 text-sm mt-2">Start saving on tools and resources</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 px-4 border-3 border-black bg-[#f8f9fa] font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[4px_4px_0px_#111111] outline-none transition-all"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border-3 border-black bg-[#f8f9fa] font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[4px_4px_0px_#111111] outline-none transition-all"
                  placeholder="founder@foundersprime.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 border-3 border-black bg-[#f8f9fa] font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[4px_4px_0px_#111111] outline-none transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Min 8 characters, must include uppercase, lowercase, and number
                </p>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" className="w-4 h-4 border-2 border-black mt-1" required />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="font-bold text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="font-bold text-primary hover:underline">Privacy Policy</Link>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-black font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            <div className="mt-4 md:mt-6 pt-6 border-t-2 border-gray-200">
              <p className="text-xs text-center text-gray-500 uppercase font-bold mb-4">Or sign up with</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  disabled={loading}
                  className="relative overflow-hidden h-12 border-3 border-black bg-white font-bold text-xs md:text-sm uppercase hover:bg-gray-50 flex items-center justify-center gap-2 shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 px-1"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="hidden md:inline">Google</span>
                  <div id="google-signup-btn" className="absolute inset-0 opacity-0 scale-[3] origin-center cursor-pointer" />
                </button>
                <button
                  onClick={() => handleOAuthSignup('github')}
                  disabled={loading}
                  className="h-12 border-3 border-black bg-white font-bold text-xs md:text-sm uppercase hover:bg-gray-50 flex items-center justify-center gap-2 shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 px-1"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="hidden md:inline">GitHub</span>
                </button>
                <button
                  onClick={() => handleOAuthSignup('linkedin')}
                  disabled={loading}
                  className="h-12 border-3 border-black bg-white font-bold text-xs md:text-sm uppercase hover:bg-gray-50 flex items-center justify-center gap-2 shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 px-1"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="#0077b5" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="hidden md:inline">LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
