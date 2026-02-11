'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const type = searchParams.get('type')

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || type !== 'signup') {
        setStatus('error')
        setError('Invalid verification link')
        return
      }

      try {
        const supabase = createClient()
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup',
        })

        if (verifyError) {
          setStatus('error')
          setError(verifyError.message)
          return
        }

        setStatus('success')
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } catch (err) {
        setStatus('error')
        setError('An unexpected error occurred')
      }
    }

    verifyEmail()
  }, [token, type, router])

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#f8f9fa] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8 text-center">
            {status === 'verifying' && (
              <>
                <div className="w-16 h-16 bg-primary text-black flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <span className="material-symbols-outlined text-3xl animate-spin">progress_activity</span>
                </div>
                <h1 className="text-2xl font-black uppercase mb-4">Verifying Email</h1>
                <p className="text-gray-600">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h1 className="text-2xl font-black uppercase mb-4">Email Verified!</h1>
                <p className="text-gray-600 mb-6">
                  Your email has been successfully verified. You can now access all features of FoundersPrime.
                </p>
                <div className="p-4 bg-green-50 border-2 border-green-400 text-green-800 text-sm mb-6">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-lg mt-0.5">info</span>
                    <span>Redirecting you to your dashboard in 3 seconds...</span>
                  </div>
                </div>
                <Link 
                  href="/dashboard"
                  className="inline-block w-full h-12 bg-green-500 text-white font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all leading-[44px]"
                >
                  Go to Dashboard
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <span className="material-symbols-outlined text-3xl">error</span>
                </div>
                <h1 className="text-2xl font-black uppercase mb-4">Verification Failed</h1>
                <p className="text-gray-600 mb-6">
                  {error || 'We couldn\'t verify your email address. The link may have expired or is invalid.'}
                </p>
                <div className="p-4 bg-red-50 border-2 border-red-400 text-red-800 text-sm mb-6">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-lg mt-0.5">info</span>
                    <span>Please try signing up again or contact support if the problem persists.</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link 
                    href="/signup"
                    className="inline-block w-full h-12 bg-primary text-black font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all leading-[44px]"
                  >
                    Sign Up Again
                  </Link>
                  <Link 
                    href="/login"
                    className="inline-block w-full h-12 bg-white text-black font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-gray-50 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all leading-[44px]"
                  >
                    Back to Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
