'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#f8f9fa] flex items-center justify-center py-6 md:py-8 px-4">
        <div className="w-full max-w-md">
          <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center mx-auto mb-4 border-2 border-black">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <h1 className="text-2xl font-black uppercase">Set New Password</h1>
              <p className="text-gray-600 text-sm mt-2">Enter your new password below</p>
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
                <label className="block text-sm font-bold uppercase mb-2">New Password</label>
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
                <p className="text-xs text-gray-500 mt-1">Min 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">Confirm Password</label>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 px-4 border-3 border-black bg-[#f8f9fa] font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[4px_4px_0px_#111111] outline-none transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  disabled={loading}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-green-500 text-white font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#111111] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
