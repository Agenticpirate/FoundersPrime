'use client'

import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import type { LoginAuthFormsProps } from './login-auth-types'

export default function LoginViewSignup(props: LoginAuthFormsProps) {
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
                        Create your <span className="text-accent-yellow">account</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">Unlock the premium startup database</p>
                    </div>

                    <form onSubmit={handleSignupSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="fullname" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Full Name</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">person</span>
                          <input
                            type="text"
                            id="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="John Doe"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="new-password" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Password</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock</span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 pl-10 pr-10 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                          </button>
                        </div>
                        <p className="text-[9px] text-gray-500 font-mono mt-1 leading-normal">
                          Min 8 characters, must include uppercase, lowercase, and a number
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="agree"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-3.5 h-3.5 mt-0.5 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] accent-accent-yellow rounded"
                          required
                        />
                        <label htmlFor="agree" className="text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-normal">
                          I agree to the <Link href="/terms" target="_blank" className="font-bold text-accent-yellow hover:underline">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="font-bold text-accent-yellow hover:underline">Privacy Policy</Link>
                        </label>
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
                            options={{ theme: 'dark', size: 'flexible' }}
                          />
                        )}
                      </div>

                      <button type="submit" disabled={loading || !turnstileToken}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Creating Account...</>
                        ) : (
                          <>CREATE ACCOUNT <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 text-center text-xs font-mono">
                      <span className="text-gray-500">Already have an account? </span>
                      <button type="button" onClick={() => handleToggleView('login')} className="text-accent-yellow font-black hover:underline inline-flex items-center gap-0.5 transition-all hover:gap-1">
                        Sign in <span className="material-symbols-outlined !text-[11px]">arrow_forward</span>
                      </button>
                    </div>
                  </>
  )
}
