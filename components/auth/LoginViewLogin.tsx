'use client'

import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import type { LoginAuthFormsProps } from './login-auth-types'

export default function LoginViewLogin(props: LoginAuthFormsProps) {
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
                        Welcome back, <span className="text-accent-yellow">founder.</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">Sign in to your account to continue</p>
                    </div>

                    {/* OAuth buttons */}
                    <div className="grid grid-cols-3 gap-2 mb-3 font-mono text-[9px] font-bold uppercase">
                      <button type="button" onClick={() => handleOAuthLogin('google')} disabled={loading} className="h-9 border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 hover:border-gray-300 dark:hover:border-white/10">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Google
                      </button>

                      <button type="button" onClick={() => handleOAuthLogin('github')} disabled={loading} className="h-9 border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 hover:border-gray-300 dark:hover:border-white/10">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </button>
                      <button type="button" onClick={() => handleOAuthLogin('linkedin')} disabled={loading} className="h-9 border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 hover:border-gray-300 dark:hover:border-white/10">
                        <svg className="w-3.5 h-3.5" fill="#0077b5" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">or sign in with email</span>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                    </div>

                    <form onSubmit={handleSignInSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-500 dark:text-gray-400">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="username"
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
                        <label htmlFor="current-password" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-500 dark:text-gray-400">Password</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock</span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="current-password"
                            name="password"
                            autoComplete="current-password"
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
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input type="checkbox" className="w-3.5 h-3.5 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] accent-accent-yellow rounded" />
                          <span className="text-[11px] font-medium text-gray-550 dark:text-gray-400">Remember me</span>
                        </label>
                        <button type="button" onClick={() => handleToggleView('forgot')} className="text-[11px] font-bold text-accent-yellow hover:underline">Forgot password?</button>
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
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Signing in...</>
                        ) : (
                          <>SIGN IN TO FOUNDERS[PRIME] <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-3 border-t border-white/5 text-center text-xs font-mono">
                      <span className="text-gray-500">New here? </span>
                      <button type="button" onClick={() => handleToggleView('signup')} className="text-accent-yellow font-black hover:underline inline-flex items-center gap-0.5 transition-all hover:gap-1">
                        Create an account <span className="material-symbols-outlined !text-[11px]">arrow_forward</span>
                      </button>
                    </div>
                  </>
  )
}
