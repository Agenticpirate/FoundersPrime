import type { FormEvent, Dispatch, SetStateAction } from 'react'

export type LoginView = 'login' | 'signup' | 'forgot' | 'mfa' | 'reset'

export type LoginAuthFormsProps = {
  view: LoginView
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: Dispatch<SetStateAction<string>>
  passwordStrength: number
  fullName: string
  setFullName: Dispatch<SetStateAction<string>>
  agreeTerms: boolean
  setAgreeTerms: Dispatch<SetStateAction<boolean>>
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
  loading: boolean
  mfaCode: string
  setMfaCode: Dispatch<SetStateAction<string>>
  mounted: boolean
  turnstileSiteKey: string
  turnstileToken: string | null
  setTurnstileToken: Dispatch<SetStateAction<string | null>>
  // Turnstile's typings allow undefined; useRef(null) is fine at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  turnstileRef: any
  handleOAuthLogin: (provider: 'google' | 'github' | 'linkedin') => void
  handleSignInSubmit: (e: FormEvent) => void
  handleSignupSubmit: (e: FormEvent) => void
  handleForgotSubmit: (e: FormEvent) => void
  handleResetPasswordSubmit: (e: FormEvent) => void
  handleMfaVerify: (e: FormEvent) => void
  handleToggleView: (v: LoginView) => void
}
