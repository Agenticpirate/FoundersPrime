'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

import { Suspense } from 'react'

function PendingVerificationContent() {
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const handleResendEmail = async () => {
    if (!email) {
      setError('Email address not found. Please sign up again.')
      return
    }

    setResending(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (resendError) {
        setError(resendError.message)
        return
      }

      setResent(true)
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#f8f9fa] flex items-center justify-center py-6 md:py-8 px-4">
        <div className="w-full max-w-md">
          <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="w-16 h-16 bg-amber-400 text-black flex items-center justify-center mx-auto mb-6 border-2 border-black">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <h1 className="text-2xl font-black uppercase mb-4">Verify Your Email</h1>
              <p className="text-gray-600">
                We&apos;ve sent a verification link to{' '}
                {email && <strong className="text-black">{email}</strong>}
              </p>
            </div>

            <div className="space-y-4 mb-4 md:mb-6">
              <div className="p-4 bg-amber-50 border-2 border-amber-400 text-amber-900 text-sm">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-lg mt-0.5">info</span>
                  <div>
                    <p className="font-bold mb-1">Check your inbox</p>
                    <p>Click the verification link in the email to activate your account.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-2 border-blue-400 text-blue-900 text-sm">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-lg mt-0.5">help</span>
                  <div>
                    <p className="font-bold mb-1">Can&apos;t find the email?</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Check your spam or junk folder</li>
                      <li>Make sure you entered the correct email</li>
                      <li>Wait a few minutes for the email to arrive</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  {error}
                </div>
              </div>
            )}

            {resent && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 text-green-700 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  Verification email sent! Check your inbox.
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button type="button"
                onClick={handleResendEmail}
                disabled={resending || resent}
                className="w-full h-12 bg-amber-400 text-black font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {resending ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Sending...
                  </>
                ) : resent ? (
                  <>
                    <span className="material-symbols-outlined">check</span>
                    Email Sent
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">refresh</span>
                    Resend Verification Email
                  </>
                )}
              </button>

              <Link
                href="/login"
                className="inline-block w-full h-12 bg-white text-black font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-gray-50 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all leading-[44px] text-center"
              >
                Back to Login
              </Link>
            </div>

            <div className="mt-4 md:mt-6 pt-6 border-t-2 border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <Link href="/contact" className="font-bold text-primary hover:underline">
                  Contact Support
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

export default function PendingVerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center font-mono">Loading...</div>}>
      <PendingVerificationContent />
    </Suspense>
  )
}
