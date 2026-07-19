'use client'

export type { LoginView, LoginAuthFormsProps } from './login-auth-types'
import type { LoginAuthFormsProps } from './login-auth-types'
import LoginViewLogin from './LoginViewLogin'
import LoginViewSignup from './LoginViewSignup'
import LoginViewForgot from './LoginViewForgot'
import LoginViewReset from './LoginViewReset'
import LoginViewMfa from './LoginViewMfa'

export default function LoginAuthForms(props: LoginAuthFormsProps) {
  const { view } = props
  if (view === 'login') return <LoginViewLogin {...props} />
  if (view === 'signup') return <LoginViewSignup {...props} />
  if (view === 'forgot') return <LoginViewForgot {...props} />
  if (view === 'reset') return <LoginViewReset {...props} />
  if (view === 'mfa') return <LoginViewMfa {...props} />
  return null
}
