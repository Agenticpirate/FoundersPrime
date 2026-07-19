'use client'

import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import type { LoginAuthFormsProps } from './login-auth-types'

export default function LoginViewReset(props: LoginAuthFormsProps) {
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
                        Choose a <span className="text-accent-yellow">new password</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">
                        Enter and confirm your new password below
                      </p>
                    </div>

                    <form onSubmit={handleResetPasswordSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="new-pass" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-500 dark:text-gray-400">
                          New password
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock</span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="new-pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className="w-full h-10 pl-10 pr-10 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="At least 8 characters"
                            required
                            minLength={8}
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
                        {password.length > 0 && (
                          <div className="mt-2">
                            <div className="flex gap-1 mb-1">
                              {[1, 2, 3, 4].map((level) => (
                                <div
                                  key={`pwd-level-${level}`}
                                  className={`h-1 flex-1 rounded-full transition-all ${
                                    level <= passwordStrength
                                      ? passwordStrength >= 3
                                        ? 'bg-emerald-500'
                                        : passwordStrength >= 2
                                          ? 'bg-yellow-500'
                                          : 'bg-red-500'
                                      : 'bg-gray-200 dark:bg-white/10'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-[9px] font-mono font-bold uppercase text-gray-500">
                              {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Too short'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="confirm-pass" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-500 dark:text-gray-400">
                          Confirm password
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock_reset</span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirm-pass"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="Re-enter password"
                            required
                            minLength={8}
                            disabled={loading}
                          />
                        </div>
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                          <p className="text-[10px] text-red-500 font-mono font-bold mt-1">Passwords don&apos;t match</p>
                        )}
                        {confirmPassword.length > 0 && password === confirmPassword && (
                          <p className="text-[10px] text-emerald-500 font-mono font-bold mt-1 inline-flex items-center gap-1">
                            <span className="material-symbols-outlined !text-[12px]">check</span>
                            Passwords match
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading || password.length < 8 || password !== confirmPassword}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                      >
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Updating…</>
                        ) : (
                          <>UPDATE PASSWORD <span className="material-symbols-outlined !text-[12px] font-black">arrow_forward</span></>
                        )}
                      </button>

                      <div className="text-center pt-2 flex flex-col gap-1.5">
                        <button type="button" onClick={() => handleToggleView('forgot')} className="text-[11px] font-bold text-accent-yellow hover:underline">
                          Need a new reset link?
                        </button>
                        <button type="button" onClick={() => handleToggleView('login')} className="text-[11px] font-bold text-gray-500 hover:text-accent-yellow hover:underline">
                          Back to Sign In
                        </button>
                      </div>
                    </form>
                  </>
  )
}
