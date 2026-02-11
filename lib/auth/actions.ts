'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthResult = {
  error?: string
  success?: boolean
}

export async function login(formData: FormData): Promise<AuthResult> {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Invalid email or password. Please try again.' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Please verify your email before logging in. Check your inbox for the verification link.' }
      }
      return { error: error.message }
    }

    if (!data.session) {
      return { error: 'Failed to create session. Please try again.' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (error: any) {
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred during login. Please try again.' }
  }
}

export async function signup(formData: FormData): Promise<AuthResult> {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  // Validation
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || email.split('@')[0],
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      // Handle specific error cases
      if (error.message.includes('already registered')) {
        return { error: 'This email is already registered. Please login instead.' }
      }
      return { error: error.message }
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return { 
        success: true,
        error: 'Please check your email to verify your account before logging in.'
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Signup error:', error)
    return { error: 'An unexpected error occurred during signup. Please try again.' }
  }
}

export async function logout(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function forgotPassword(formData: FormData): Promise<AuthResult> {
  const supabase = createClient()

  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required' }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' }
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/reset-password`,
    })

    if (error) {
      // Don't reveal if email exists for security
      console.error('Password reset error:', error)
    }

    // Always return success to prevent email enumeration
    return { 
      success: true,
      error: 'If an account exists with this email, you will receive a password reset link shortly.'
    }
  } catch (error: any) {
    console.error('Forgot password error:', error)
    return { 
      success: true,
      error: 'If an account exists with this email, you will receive a password reset link shortly.'
    }
  }
}

export async function updatePassword(formData: FormData): Promise<AuthResult> {
  const supabase = createClient()

  const password = formData.get('password') as string

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
