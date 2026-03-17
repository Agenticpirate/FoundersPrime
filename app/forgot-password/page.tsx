'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
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

  if (success) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 bg-[#f8f9fa] flex items-center justify-center py-6 md:py-8 px-4">
          <div className="w-full max-w-md">
            <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8 text-center">
              <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center mx-auto mb-6 border-2 border-black">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <h1 className="text-2xl font-black uppercase mb-4">Check Your Email</h1>
              <p className="text-gray-600 mb-6">
                We&apos;ve sent a password reset link to <strong>{email}</strong>. 
                Click the link to reset your password.
              </p>
              <div className="p-4 bg-amber-50 border-2 border-amber-400 text-amber-800 text-sm mb-6">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-lg mt-0.5">info</span>
                  <span>The link will expire in 1 hour. Can&apos;t find the email? Check your spam folder.</span>
                </div>
              </div>
              <Link 
                href="/login"
                className="inline-block w-full h-12 bg-black text-white font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-primary hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all leading-[44px]"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#f8f9fa] flex items-center justify-center py-6 md:py-8 px-4">
        <div className="w-full max-w-md">
          <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="w-12 h-12 bg-amber-400 text-black flex items-center justify-center mx-auto mb-4 border-2 border-black">
                <span className="material-symbols-outlined">lock_reset</span>
              </div>
              <h1 className="text-2xl font-black uppercase">Reset Password</h1>
              <p className="text-gray-600 text-sm mt-2">Enter your email to receive a reset link</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">Email Address</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border-3 border-black bg-[#f8f9fa] font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[4px_4px_0px_#111111] outline-none transition-all"
                  placeholder="founder@startup.com"
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-amber-400 text-black font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
