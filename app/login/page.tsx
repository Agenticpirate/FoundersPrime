'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import Mandala from '@/components/ui/Mandala'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginAuthForms from '@/components/auth/LoginAuthForms'
import LoginBrandPanel from '@/components/auth/LoginBrandPanel'
import { useLoginAuth } from '@/hooks/useLoginAuth'

function LoginContent() {
  const {
    redirect,
    errorParam,
    view,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordStrength,
    fullName,
    setFullName,
    agreeTerms,
    setAgreeTerms,
    showPassword,
    setShowPassword,
    error,
    successMsg,
    loading,
    needsVerification,
    resending,
    resendMsg,
    mounted,
    turnstileSiteKey,
    turnstileToken,
    setTurnstileToken,
    turnstileRef,
    mfaCode,
    setMfaCode,
    supabaseConfigured,
    handleOAuthLogin,
    handleSignInSubmit,
    handleSignupSubmit,
    handleForgotSubmit,
    handleMfaVerify,
    handleResendVerification,
    handleResetPasswordSubmit,
    handleToggleView,
  } = useLoginAuth()

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#000000] text-gray-900 dark:text-white transition-colors duration-300 selection:bg-accent-yellow selection:text-black relative">
      <Header />

      <main className="flex-grow flex items-center justify-center py-10 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,234,0,0.03),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/40 to-[#000000] pointer-events-none" />

        {/* Floating Mandalas for premium branding background */}
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.06}
          speed={100}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none"
        />
        <Mandala
          variant="rings"
          colorClass="text-accent-yellow"
          opacity={0.04}
          speed={140}
          direction="ccw"
          className="absolute -bottom-32 -left-32 w-[450px] h-[450px] pointer-events-none"
        />

        <div className="max-w-[1100px] w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          <LoginBrandPanel />

          {/* Right Panel — Form */}
          <div className="lg:col-span-6 col-span-12 flex flex-col justify-center items-center relative">
            <div className="w-full max-w-[380px] login-fade-up relative z-10">
              <div className="bg-white/80 dark:bg-[#09090b]/80 border border-gray-200 dark:border-white/5 rounded-xl px-5 py-5 shadow-xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden">
                
                {/* Subtle sheen on the card */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow font-mono text-[9px] font-black px-2.5 py-1 mb-3.5 uppercase tracking-wider rounded-full">
                  <span className="material-symbols-outlined !text-[10px] fill-current">lock</span>
                  {view === 'mfa' ? 'Security Gate' : view === 'reset' ? 'Secure reset' : view === 'forgot' ? 'Recovery' : 'Members area'}
                </div>

                {/* Local config warning */}
                {mounted && !supabaseConfigured && (
                  <div className="mb-3.5 p-3 bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    <div className="flex-1 space-y-1">
                      <p className="font-bold">Supabase is not configured for local login</p>
                      <p className="text-amber-100/80">
                        Add <code className="font-mono text-[10px]">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
                        <code className="font-mono text-[10px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{' '}
                        <code className="font-mono text-[10px]">.env.local</code>, then restart{' '}
                        <code className="font-mono text-[10px]">npm run dev</code>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error alerts */}
                {(error || errorParam) && (
                  <div className="mb-3.5 p-3 bg-red-950/45 border border-red-900/50 text-red-400 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    <div className="flex-1">
                      <p>{error || errorParam}</p>
                      {needsVerification && (
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={resending}
                          className="mt-2 inline-flex items-center gap-1.5 font-bold underline hover:no-underline disabled:opacity-50"
                        >
                          {resending ? 'Sending…' : 'Resend verification email'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {resendMsg && (
                  <div className="mb-3.5 p-3 bg-green-950/45 border border-green-900/50 text-green-400 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">mark_email_read</span>
                    {resendMsg}
                  </div>
                )}

                {successMsg && (
                  <div className="mb-3.5 p-3 bg-green-950/45 border border-green-900/50 text-green-400 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <p className="flex-1">{successMsg}</p>
                  </div>
                )}

                <LoginAuthForms
                  view={view}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  passwordStrength={passwordStrength}
                  fullName={fullName}
                  setFullName={setFullName}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  loading={loading}
                  mfaCode={mfaCode}
                  setMfaCode={setMfaCode}
                  mounted={mounted}
                  turnstileSiteKey={turnstileSiteKey}
                  turnstileToken={turnstileToken}
                  setTurnstileToken={setTurnstileToken}
                  turnstileRef={turnstileRef}
                  handleOAuthLogin={handleOAuthLogin}
                  handleSignInSubmit={handleSignInSubmit}
                  handleSignupSubmit={handleSignupSubmit}
                  handleForgotSubmit={handleForgotSubmit}
                  handleResetPasswordSubmit={handleResetPasswordSubmit}
                  handleMfaVerify={handleMfaVerify}
                  handleToggleView={handleToggleView}
                />

                <div className="mt-3.5 p-2.5 bg-gray-50 dark:bg-neutral-950/80 border border-gray-200 dark:border-neutral-900/50 rounded flex items-start gap-2 text-[10px] text-gray-600 dark:text-gray-400 font-mono leading-normal">
                  <span className="material-symbols-outlined text-accent-yellow text-sm flex-shrink-0 mt-0.5">verified_user</span>
                  <div className="flex-1">
                    Your data is secure with enterprise-grade encryption. We never share your information.
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes loginMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-login-marquee {
          animation: loginMarquee 25s linear infinite;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
        @keyframes loginFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .login-fade-up {
          animation: loginFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .testimonial-card {
          animation: float 6s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonial-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(255, 215, 0, 0.3);
          box-shadow: 0 10px 30px -10px rgba(255, 215, 0, 0.15);
          animation-play-state: paused;
        }
        .testimonial-card:hover .hover-glow {
          opacity: 1;
        }
        .testimonial-card:hover .quote-mark {
          color: rgba(255, 215, 0, 0.6);
        }
        .testimonial-card:hover .avatar-img {
          transform: scale(1.1) rotate(5deg);
          border-color: rgba(255, 215, 0, 0.4);
        }
        @media (prefers-reduced-motion: reduce) {
          .login-fade-up, .testimonial-card, .animate-login-marquee {
            animation: none !important;
            transition: none;
          }
          .testimonial-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center bg-black"><span className="material-symbols-outlined animate-spin text-4xl text-accent-yellow">progress_activity</span></div>}>
      <LoginContent />
    </Suspense>
  )
}
