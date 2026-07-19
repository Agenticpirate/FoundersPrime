import { redirect } from 'next/navigation'

/**
 * Legacy route — forgot password lives on the login page (synced with signup/login UI).
 * Server redirect avoids a client-side useEffect hop.
 */
export default function ForgotPasswordPage() {
  redirect('/login?view=forgot')
}
