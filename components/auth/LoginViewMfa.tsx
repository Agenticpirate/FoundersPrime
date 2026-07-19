'use client'

import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import type { LoginAuthFormsProps } from './login-auth-types'

export default function LoginViewMfa(props: LoginAuthFormsProps) {
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
                        Two-Step <span className="text-accent-yellow">Verification</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">Enter the 6-digit code from your authenticator app</p>
                    </div>

                    <form onSubmit={handleMfaVerify} className="space-y-2.5">
                      <div>
                        <label htmlFor="mfa-code" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Verification Code</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">security</span>
                          <input
                            type="text"
                            id="mfa-code"
                            maxLength={6}
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-11 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-center text-lg font-mono tracking-[0.3em] placeholder:text-gray-700 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="000000"
                            required
                            disabled={loading}
                          />
                        </div>
                        <p className="text-[9px] text-gray-500 font-mono mt-2 leading-normal">
                          For testing purposes in local development, enter <span className="text-accent-yellow font-bold">123456</span>.
                        </p>
                      </div>

                      <button type="submit" disabled={loading}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Verifying...</>
                        ) : (
                          <>VERIFY & ENTER <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <button type="button" onClick={() => handleToggleView('login')} className="text-[11px] font-bold text-accent-yellow hover:underline">
                          Cancel Verification
                        </button>
                      </div>
                    </form>
                  </>
  )
}
