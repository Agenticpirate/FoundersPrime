'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [strength, setStrength] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    setStrength(s)
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) { setError(error.message); return }
      setSuccess(true)
      setTimeout(() => { router.push('/dashboard'); router.refresh() }, 2500)
    } catch { setError('An unexpected error occurred') }
    finally { setLoading(false) }
  }

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong'][strength - 1] || ''
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][strength - 1] || 'bg-gray-200'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#fafafa] flex items-center justify-center px-4 py-10">
        <div className={`w-full max-w-md transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/dashboard" className="text-xs font-mono text-gray-400 hover:text-black uppercase inline-flex items-center gap-1 mb-4 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Dashboard
          </Link>

          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#111] p-6 md:p-8">
            {/* Header with animated lock */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-black text-accent-yellow flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#ffd700] transition-transform hover:rotate-[-5deg]">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
              <div>
                <h1 className="font-mono text-xl font-black uppercase tracking-tight">Change Password</h1>
                <p className="text-xs text-gray-500">Secure your FoundersPrime account</p>
              </div>
            </div>

            {success ? (
              <div className="text-center py-6 animate-fade-in">
                <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[3px_3px_0px_#111] animate-bounce-once">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <p className="font-mono font-black text-lg uppercase mb-1">Password Updated</p>
                <p className="text-sm text-gray-500 mb-4">Your account is now secured with the new password.</p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  Redirecting to dashboard...
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border-2 border-red-400 text-red-700 text-xs flex items-center gap-2 animate-shake">
                    <span className="material-symbols-outlined text-sm">error</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1.5 text-gray-700">New Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 px-3 border-2 border-black bg-gray-50 text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[3px_3px_0px_#111] outline-none transition-all"
                      placeholder="Enter new password" required minLength={8} disabled={loading} />

                    {/* Password strength meter */}
                    {password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-1 flex-1 transition-all duration-300 ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
                          ))}
                        </div>
                        <p className={`text-[10px] font-mono font-bold uppercase ${strength >= 3 ? 'text-green-600' : strength >= 2 ? 'text-yellow-600' : 'text-red-500'}`}>
                          {strengthLabel}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1.5 text-gray-700">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-11 px-3 border-2 border-black bg-gray-50 text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[3px_3px_0px_#111] outline-none transition-all"
                      placeholder="Confirm new password" required minLength={8} disabled={loading} />
                    {confirmPassword.length > 0 && password !== confirmPassword && (
                      <p className="text-[10px] text-red-500 font-mono font-bold mt-1">Passwords don&apos;t match</p>
                    )}
                    {confirmPassword.length > 0 && password === confirmPassword && (
                      <p className="text-[10px] text-green-600 font-mono font-bold mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">check</span> Passwords match
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={loading || password.length < 8 || password !== confirmPassword}
                    className="w-full h-12 bg-black text-white font-bold uppercase text-sm border-2 border-black shadow-[4px_4px_0px_#111] hover:bg-accent-yellow hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading ? (
                      <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Updating...</>
                    ) : (
                      <><span className="material-symbols-outlined text-sm">shield</span> Update Password</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          <style jsx>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
            @keyframes bounceOnce { 0% { transform: scale(0.5); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
            .animate-fade-in { animation: fadeIn 0.4s ease-out; }
            .animate-shake { animation: shake 0.3s ease-out; }
            .animate-bounce-once { animation: bounceOnce 0.4s ease-out; }
          `}</style>
        </div>
      </main>
      <Footer />
    </div>
  )
}
