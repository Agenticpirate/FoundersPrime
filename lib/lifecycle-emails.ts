import { sendEmail, type EmailDeliveryResult } from '@/lib/mail-service'
import { createPreferenceToken } from '@/lib/email/preference-token'

export type MembershipPlan = 'nextfounder' | 'founder' | 'legend'
export type LifecycleUpdateKind = 'new_deal' | 'membership_offer' | 'resource'

/**
 * Auth app_metadata keys recording welcome-email delivery state. Shared so the
 * Dodo webhook and the admin backfill route can never disagree about which
 * subscriber has already been emailed.
 */
export const WELCOME_EMAIL_MARKERS = {
  sentAt: 'foundersprime_welcome_email_sent_at',
  plan: 'foundersprime_welcome_email_plan',
  pendingAt: 'foundersprime_welcome_email_pending_at',
  failedAt: 'foundersprime_welcome_email_failed_at',
} as const

/**
 * Auth app_metadata keys recording the account-created email. Separate from the
 * membership welcome markers so a free signup and a later purchase each send
 * exactly one email.
 */
export const SIGNUP_EMAIL_MARKERS = {
  sentAt: 'foundersprime_signup_email_sent_at',
  failedAt: 'foundersprime_signup_email_failed_at',
} as const

/**
 * Membership benefits shown in emails. Prices are deliberately omitted and
 * linked to /pricing instead, so email copy can never contradict the live
 * checkout amount.
 */
const PLAN_BENEFITS: Record<MembershipPlan, string[]> = {
  nextfounder: [
    '1,000+ student and indie-builder discounts',
    'AI and SaaS credits for builders',
    'Hackathons and early-stage grants',
    'Opportunity Hub access',
  ],
  founder: [
    'Full cloud and SaaS deal catalog',
    'Unlimited deal claims',
    'Grants, accelerators and incubators',
    'Founder Vault resources',
  ],
  legend: [
    'Everything in Founder, permanently',
    'No renewals, ever',
    'All future catalog updates included',
    'Launch-locked lifetime rate',
  ],
}

const PLAN_RENEWAL_NOTE: Record<MembershipPlan, string> = {
  nextfounder:
    'Your membership renews yearly. You can switch off auto-renewal any time from your dashboard and keep access until the period ends.',
  founder:
    'Your membership renews yearly. You can switch off auto-renewal any time from your dashboard and keep access until the period ends.',
  legend:
    'Legend is a one-time purchase. There is nothing to renew and nothing to cancel.',
}

export interface WelcomeEmailPayload {
  userId: string
  toEmail: string
  firstName?: string | null
  plan: MembershipPlan
}

export interface LifecycleUpdateEmailPayload {
  toEmail: string
  firstName?: string | null
  kind: LifecycleUpdateKind
  title: string
  summary: string
  ctaLabel: string
  ctaUrl: string
  /** ISO timestamp proving the recipient explicitly opted in to updates. */
  emailOptInAt: string
  /** Recipient-specific URL that immediately unsubscribes them from updates. */
  unsubscribeUrl: string
  /** Recipient-specific URL for granular category control. */
  preferencesUrl?: string
  /**
   * Endpoint for the List-Unsubscribe header, which mailbox providers POST to.
   * Falls back to unsubscribeUrl when omitted.
   */
  oneClickUnsubscribeUrl?: string
  idempotencyKey?: string
}

export type LifecycleEmailResult =
  | EmailDeliveryResult
  | { status: 'skipped'; reason: string }

const PLAN_LABELS: Record<MembershipPlan, string> = {
  nextfounder: 'NextFounder',
  founder: 'Founder',
  legend: 'Legend',
}

const UPDATE_LABELS: Record<LifecycleUpdateKind, string> = {
  new_deal: 'New Founder Deal',
  membership_offer: 'Membership Offer',
  resource: 'Founder Resource',
}

function appUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com').replace(/\/$/, '')
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

function validHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function greeting(firstName?: string | null): string {
  const normalized = firstName?.trim().split(/\s+/)[0]
  return normalized ? `Hi ${escapeHtml(normalized)},` : 'Hi Founder,'
}

/**
 * Brand tokens, mirrored from tailwind.config.js. Email HTML cannot use utility
 * classes, so these hex values must be kept in step with the Tailwind theme.
 */
const BRAND = {
  ink: '#111111',
  accent: '#ffd700',
  paper: '#F4F3EF',
  surface: '#ffffff',
  text: '#1a1a1a',
  muted: '#6b7280',
  subtle: '#4b5563',
  hairline: '#e5e7eb',
} as const

/** Absolute URL — email clients cannot resolve relative image paths. */
function logoUrl(): string {
  return `${appUrl()}/logo-icon.png`
}

/**
 * Signed preference-centre link for a recipient. Returns null when no signing
 * secret is available, in which case the email simply omits the link rather
 * than shipping one that cannot be verified.
 */
export function preferencesUrlFor(userId: string): string | null {
  const token = createPreferenceToken(userId)
  return token ? `${appUrl()}/email-preferences?token=${encodeURIComponent(token)}` : null
}

/** Signed one-click unsubscribe link for a recipient. */
export function unsubscribeUrlFor(userId: string): string | null {
  const token = createPreferenceToken(userId)
  return token
    ? `${appUrl()}/email-preferences?token=${encodeURIComponent(token)}&action=unsubscribe`
    : null
}

/**
 * Endpoint used by the List-Unsubscribe header. Mailbox providers POST here
 * directly, so it is the API route rather than the human-facing page.
 */
export function oneClickUnsubscribeUrlFor(userId: string): string | null {
  const token = createPreferenceToken(userId)
  return token
    ? `${appUrl()}/api/email/unsubscribe?token=${encodeURIComponent(token)}`
    : null
}

/**
 * Header lockup matching the site: the icon tile beside the mono FOUNDERS[PRIME]
 * wordmark with accent-yellow brackets. Built as a table so Outlook aligns it.
 */
function brandHeader(): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="padding-right:12px;vertical-align:middle;">
          <img src="${logoUrl()}" width="36" height="36" alt="FoundersPrime"
               style="display:block;width:36px;height:36px;border:0;outline:none;text-decoration:none;">
        </td>
        <td style="vertical-align:middle;">
          <span style="font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:17px;font-weight:900;letter-spacing:1px;color:${BRAND.surface};text-transform:uppercase;">FOUNDERS<span style="color:${BRAND.accent};">[</span>PRIME<span style="color:${BRAND.accent};">]</span></span>
        </td>
      </tr>
    </table>`
}

function emailShell({
  preheader,
  body,
  footer,
}: {
  preheader: string
  body: string
  footer: string
}): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <title>${escapeHtml(preheader)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.paper};color:${BRAND.text};font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${BRAND.paper};padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:${BRAND.surface};border:2px solid ${BRAND.ink};">
            <tr>
              <td style="background:${BRAND.ink};padding:20px 28px;">${brandHeader()}</td>
            </tr>
            <tr>
              <td style="height:4px;background:${BRAND.accent};line-height:4px;font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:32px 28px;line-height:1.65;font-size:16px;color:${BRAND.text};">${body}</td>
            </tr>
            <tr>
              <td style="padding:20px 28px;background:${BRAND.paper};border-top:2px solid ${BRAND.ink};color:${BRAND.muted};font-size:12px;line-height:1.6;">${footer}</td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">
            <tr>
              <td style="padding:14px 4px 0;text-align:center;color:${BRAND.muted};font-size:11px;line-height:1.5;">
                FoundersPrime &middot; Verified startup deals, credits and grants<br>
                <a href="${appUrl()}" style="color:${BRAND.muted};text-decoration:underline;">www.foundersprime.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/**
 * Primary action button. Accent-yellow on ink with a hard offset shadow, which
 * is the closest email-safe rendering of the site's neobrutalist buttons.
 */
function cta(label: string, url: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 8px;">
      <tr>
        <td style="background:${BRAND.accent};border:2px solid ${BRAND.ink};box-shadow:3px 3px 0 0 ${BRAND.ink};">
          <a href="${escapeHtml(url)}" style="display:inline-block;padding:13px 22px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:12px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:${BRAND.ink};text-decoration:none;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`
}

/** Footer link styling shared by the preference and unsubscribe links. */
function footerLink(label: string, url: string): string {
  return `<a href="${escapeHtml(url)}" style="color:${BRAND.subtle};text-decoration:underline;font-weight:700;">${escapeHtml(label)}</a>`
}

/**
 * Footer for transactional email. These confirm an action the recipient took,
 * so they carry a preference link rather than an unsubscribe link: a customer
 * cannot opt out of a payment receipt, but they can control everything optional.
 */
function transactionalFooter(note: string, preferencesUrl: string | null): string {
  const manage = preferencesUrl
    ? ` You can choose which optional emails you receive at any time: ${footerLink('manage email preferences', preferencesUrl)}.`
    : ''
  return `${escapeHtml(note)}${manage}`
}

function bulletList(items: string[]): string {
  return `<ul style="margin:0 0 18px;padding-left:20px;">${items
    .map(
      (item) =>
        `<li style="margin:0 0 8px;color:#374151;">${escapeHtml(item)}</li>`
    )
    .join('')}</ul>`
}

export async function sendWelcomeEmail(
  payload: WelcomeEmailPayload
): Promise<EmailDeliveryResult> {
  const dashboardUrl = `${appUrl()}/dashboard`
  const dealsUrl = `${appUrl()}/deals`
  const billingUrl = `${appUrl()}/dashboard?tab=billing`
  const preferencesUrl = preferencesUrlFor(payload.userId)
  const planLabel = PLAN_LABELS[payload.plan]
  const benefits = PLAN_BENEFITS[payload.plan]
  const renewalNote = PLAN_RENEWAL_NOTE[payload.plan]
  const subject = `Welcome to FoundersPrime ${planLabel}`
  const html = emailShell({
    preheader: `Your ${planLabel} membership is active.`,
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <p style="margin:0 0 10px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};">Membership activated</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;color:${BRAND.ink};">Your ${escapeHtml(planLabel)} membership is active.</h1>
      <p style="margin:0 0 18px;">Thanks for backing FoundersPrime. Here is what your membership includes:</p>
      ${bulletList(benefits)}
      <p style="margin:0 0 18px;">Every deal in the catalog is verified before it is listed, so the credits, discounts and programs you see are ones you can actually claim.</p>
      ${cta('Open your dashboard', dashboardUrl)}
      <p style="margin:18px 0 0;font-size:14px;color:#4b5563;">Start with the <a href="${escapeHtml(dealsUrl)}" style="color:#111827;font-weight:700;">deal catalog</a>, or review your plan and renewal date in <a href="${escapeHtml(billingUrl)}" style="color:#111827;font-weight:700;">billing</a>.</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">${escapeHtml(renewalNote)}</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Questions? Reply to this email or write to support@foundersprime.com and a human will answer.</p>
    `,
    footer: transactionalFooter(
      'This email confirms activation of a FoundersPrime membership you purchased. It is not a marketing subscription.',
      preferencesUrl
    ),
  })
  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\nYour ${planLabel} membership is active.\n\nYour membership includes:\n${benefits
    .map((b) => `- ${b}`)
    .join(
      '\n'
    )}\n\nOpen your dashboard: ${dashboardUrl}\nBrowse the deal catalog: ${dealsUrl}\nPlan and renewal date: ${billingUrl}\n\n${renewalNote}\n\nQuestions? Reply to this email or write to support@foundersprime.com.\n\nThis email confirms activation of a FoundersPrime membership you purchased.${
    preferencesUrl ? `\nManage which optional emails you receive: ${preferencesUrl}` : ''
  }`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: `foundersprime-welcome-v1-${payload.userId}`,
  })
}

export interface SignupEmailPayload {
  userId: string
  toEmail: string
  firstName?: string | null
}

/**
 * Account-created email for a new free signup.
 *
 * Transactional: it confirms an account the recipient just created and explains
 * what that account gives them. It includes a short membership overview but no
 * prices, so it can never contradict live checkout, and it is sent exactly once
 * per user via the SIGNUP_EMAIL_MARKERS guard at the call site.
 */
export async function sendSignupWelcomeEmail(
  payload: SignupEmailPayload
): Promise<EmailDeliveryResult> {
  const dealsUrl = `${appUrl()}/deals`
  const dashboardUrl = `${appUrl()}/dashboard`
  const pricingUrl = `${appUrl()}/pricing`
  const preferencesUrl = preferencesUrlFor(payload.userId)
  const subject = 'Welcome to FoundersPrime'

  const freeIncludes = [
    'Browse the verified deal catalog',
    'Save deals to your dashboard',
    'Preview grants, accelerators and incubators',
  ]

  const membershipSummary = [
    "Next'Founder — student and indie-builder discounts, AI and SaaS credits, hackathons and early grants",
    'Founder — the full cloud and SaaS catalog, unlimited claims, grants and accelerators, Founder Vault',
    'Legend — everything in Founder permanently, one payment, no renewals',
  ]

  const html = emailShell({
    preheader: 'Your FoundersPrime account is ready.',
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <p style="margin:0 0 10px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};">Account created</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;color:${BRAND.ink};">Your account is ready.</h1>
      <p style="margin:0 0 18px;">FoundersPrime collects verified startup deals in one place: cloud credits, SaaS discounts, non-dilutive grants, accelerators and incubators. Every listing is checked before it goes live.</p>
      <p style="margin:0 0 10px;font-weight:700;">With your free account you can:</p>
      ${bulletList(freeIncludes)}
      ${cta('Browse the deal catalog', dealsUrl)}
      <p style="margin:24px 0 10px;font-weight:700;">Memberships unlock the full catalog:</p>
      ${bulletList(membershipSummary)}
      <p style="margin:0 0 18px;font-size:14px;color:#4b5563;">See what each plan includes and current pricing on the <a href="${escapeHtml(pricingUrl)}" style="color:#111827;font-weight:700;">pricing page</a>.</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Your <a href="${escapeHtml(dashboardUrl)}" style="color:#374151;font-weight:700;">dashboard</a> keeps your saved deals in one place. Questions? Reply to this email or write to support@foundersprime.com.</p>
    `,
    footer: transactionalFooter(
      'This email confirms the FoundersPrime account you just created. You are not subscribed to any marketing list — optional emails are off until you turn them on.',
      preferencesUrl
    ),
  })

  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\nYour FoundersPrime account is ready.\n\nFoundersPrime collects verified startup deals in one place: cloud credits, SaaS discounts, non-dilutive grants, accelerators and incubators.\n\nWith your free account you can:\n${freeIncludes
    .map((f) => `- ${f}`)
    .join('\n')}\n\nBrowse the deal catalog: ${dealsUrl}\n\nMemberships unlock the full catalog:\n${membershipSummary
    .map((m) => `- ${m}`)
    .join(
      '\n'
    )}\n\nPlans and current pricing: ${pricingUrl}\nYour dashboard: ${dashboardUrl}\n\nQuestions? Reply to this email or write to support@foundersprime.com.\n\nThis email confirms the account you just created. You are not subscribed to any marketing list — optional emails are off until you turn them on.${
    preferencesUrl ? `\nChoose which emails you receive: ${preferencesUrl}` : ''
  }`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: `foundersprime-signup-v1-${payload.userId}`,
  })
}

/**
 * Reusable campaign boundary for deals, membership offers, and resources.
 * It deliberately refuses delivery without proof of opt-in and a valid
 * recipient-specific unsubscribe URL. Audience selection and scheduling live
 * outside this helper and should only pass consented recipients.
 */
export async function sendLifecycleUpdateEmail(
  payload: LifecycleUpdateEmailPayload
): Promise<LifecycleEmailResult> {
  const optedInAt = Date.parse(payload.emailOptInAt)
  if (!payload.emailOptInAt || Number.isNaN(optedInAt) || optedInAt > Date.now()) {
    return { status: 'skipped', reason: 'A valid past email opt-in timestamp is required' }
  }
  if (!validHttpUrl(payload.unsubscribeUrl)) {
    return { status: 'skipped', reason: 'A valid unsubscribe URL is required' }
  }
  if (!validHttpUrl(payload.ctaUrl)) {
    return { status: 'skipped', reason: 'A valid campaign CTA URL is required' }
  }

  const updateLabel = UPDATE_LABELS[payload.kind]
  const subject = `${updateLabel}: ${payload.title}`
  const safeTitle = escapeHtml(payload.title)
  const html = emailShell({
    preheader: `${updateLabel}: ${payload.title}`,
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <p style="margin:0 0 10px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(updateLabel)}</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;color:${BRAND.ink};">${safeTitle}</h1>
      <p style="margin:0;">${escapeHtml(payload.summary)}</p>
      ${cta(payload.ctaLabel, payload.ctaUrl)}
    `,
    footer: `You are receiving this because you opted in to FoundersPrime updates on ${escapeHtml(
      new Date(optedInAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    )}.<br><br>${footerLink('Unsubscribe from these emails', payload.unsubscribeUrl)}${
      payload.preferencesUrl && validHttpUrl(payload.preferencesUrl)
        ? ` &nbsp;&middot;&nbsp; ${footerLink('Choose which emails you receive', payload.preferencesUrl)}`
        : ''
    }`,
  })
  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\n${updateLabel}: ${payload.title}\n\n${payload.summary}\n\n${payload.ctaLabel}: ${payload.ctaUrl}\n\nUnsubscribe: ${payload.unsubscribeUrl}${
    payload.preferencesUrl ? `\nEmail preferences: ${payload.preferencesUrl}` : ''
  }`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: payload.idempotencyKey,
    // RFC 8058: lets Gmail and Yahoo render a native one-click unsubscribe.
    listUnsubscribeUrl:
      payload.oneClickUnsubscribeUrl && validHttpUrl(payload.oneClickUnsubscribeUrl)
        ? payload.oneClickUnsubscribeUrl
        : payload.unsubscribeUrl,
  })
}
