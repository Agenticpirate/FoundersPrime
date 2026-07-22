'use client'

import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import type { LoginAuthFormsProps } from './login-auth-types'

export default function LoginViewForgot(props: LoginAuthFormsProps) {
  const {
    email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
    passwordStrength, fullName, setFullName, agreeTerms, setAgreeTerms,
    showPassword, setShowPassword, loading, mfaCode, setMfaCode, mounted,
    turnstileSiteKey, turnstileToken, setTurnstileToken, turnstileRef,
    handleOAuthLogin, handleSignInSubmit, handleSignupSubmit, handleForgotSubmit,
    handleResetPasswordSubmit, handleMfaVerify, handleToggleView,
  } = props

  return (
<>
                    <div className="mb-3.5">
                      <h1 className="text-xl font-black uppercase font-mono mb-1 tracking-tight text-gray-900 dark:text-white">
                        Reset your <span className="text-accent-yellow">password</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">We will send you a secure recovery link</p>
                    </div>

                    <form onSubmit={handleForgotSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="forgot-email" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                          <input
                            type="email"
                            id="forgot-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {/* Cloudflare Turnstile */}
                      <div className="flex justify-center py-1">
                        {mounted && turnstileSiteKey && (
                          <Turnstile
                            ref={turnstileRef}
                            siteKey={turnstileSiteKey}
                            onSuccess={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken(null)}
                            onError={() => setTurnstileToken(null)}
                            options={{
                              theme: 'dark',
                              size: 'flexible',
                              appearance: 'interaction-only',
                              feedbackEnabled: false,
                            }}
                          />
                        )}
                      </div>

                      <button type="submit" disabled={loading || !turnstileToken}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Sending...</>
                        ) : (
                          <>SEND RESET LINK <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <button type="button" onClick={() => handleToggleView('login')} className="text-[11px] font-bold text-accent-yellow hover:underline">
                          Back to Sign In
                        </button>
                      </div>
                    </form>
                  </>
  )
}
