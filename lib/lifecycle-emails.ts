import { sendEmail, type EmailDeliveryResult } from '@/lib/mail-service'

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
    <title>${escapeHtml(preheader)}</title>
  </head>
  <body style="margin:0;background:#f3f4f6;color:#111827;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #d1d5db;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#111827;color:#ffffff;padding:22px 28px;font-size:20px;font-weight:800;letter-spacing:-0.4px;">FoundersPrime</td>
            </tr>
            <tr>
              <td style="padding:32px 28px;line-height:1.65;font-size:16px;">${body}</td>
            </tr>
            <tr>
              <td style="padding:20px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.55;">${footer}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function cta(label: string, url: string): string {
  return `<p style="margin:28px 0 8px;"><a href="${escapeHtml(url)}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:9px;">${escapeHtml(label)}</a></p>`
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
  const planLabel = PLAN_LABELS[payload.plan]
  const benefits = PLAN_BENEFITS[payload.plan]
  const renewalNote = PLAN_RENEWAL_NOTE[payload.plan]
  const subject = `Welcome to FoundersPrime ${planLabel}`
  const html = emailShell({
    preheader: `Your ${planLabel} membership is active.`,
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;">Your ${escapeHtml(planLabel)} membership is active.</h1>
      <p style="margin:0 0 18px;">Thanks for backing FoundersPrime. Here is what your membership includes:</p>
      ${bulletList(benefits)}
      <p style="margin:0 0 18px;">Every deal in the catalog is verified before it is listed, so the credits, discounts and programs you see are ones you can actually claim.</p>
      ${cta('Open your dashboard', dashboardUrl)}
      <p style="margin:18px 0 0;font-size:14px;color:#4b5563;">Start with the <a href="${escapeHtml(dealsUrl)}" style="color:#111827;font-weight:700;">deal catalog</a>, or review your plan and renewal date in <a href="${escapeHtml(billingUrl)}" style="color:#111827;font-weight:700;">billing</a>.</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">${escapeHtml(renewalNote)}</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Questions? Reply to this email or write to support@foundersprime.com and a human will answer.</p>
    `,
    footer: 'This transactional email confirms activation of a FoundersPrime membership you purchased. It is not a marketing subscription.',
  })
  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\nYour ${planLabel} membership is active.\n\nYour membership includes:\n${benefits
    .map((b) => `- ${b}`)
    .join(
      '\n'
    )}\n\nOpen your dashboard: ${dashboardUrl}\nBrowse the deal catalog: ${dealsUrl}\nPlan and renewal date: ${billingUrl}\n\n${renewalNote}\n\nQuestions? Reply to this email or write to support@foundersprime.com.\n\nThis transactional email confirms activation of a FoundersPrime membership you purchased.`

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
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;">Your account is ready.</h1>
      <p style="margin:0 0 18px;">FoundersPrime collects verified startup deals in one place: cloud credits, SaaS discounts, non-dilutive grants, accelerators and incubators. Every listing is checked before it goes live.</p>
      <p style="margin:0 0 10px;font-weight:700;">With your free account you can:</p>
      ${bulletList(freeIncludes)}
      ${cta('Browse the deal catalog', dealsUrl)}
      <p style="margin:24px 0 10px;font-weight:700;">Memberships unlock the full catalog:</p>
      ${bulletList(membershipSummary)}
      <p style="margin:0 0 18px;font-size:14px;color:#4b5563;">See what each plan includes and current pricing on the <a href="${escapeHtml(pricingUrl)}" style="color:#111827;font-weight:700;">pricing page</a>.</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Your <a href="${escapeHtml(dashboardUrl)}" style="color:#374151;font-weight:700;">dashboard</a> keeps your saved deals in one place. Questions? Reply to this email or write to support@foundersprime.com.</p>
    `,
    footer:
      'This transactional email confirms the FoundersPrime account you just created. It is not a marketing subscription, and you are not subscribed to any mailing list.',
  })

  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\nYour FoundersPrime account is ready.\n\nFoundersPrime collects verified startup deals in one place: cloud credits, SaaS discounts, non-dilutive grants, accelerators and incubators.\n\nWith your free account you can:\n${freeIncludes
    .map((f) => `- ${f}`)
    .join('\n')}\n\nBrowse the deal catalog: ${dealsUrl}\n\nMemberships unlock the full catalog:\n${membershipSummary
    .map((m) => `- ${m}`)
    .join(
      '\n'
    )}\n\nPlans and current pricing: ${pricingUrl}\nYour dashboard: ${dashboardUrl}\n\nQuestions? Reply to this email or write to support@foundersprime.com.\n\nThis transactional email confirms the account you just created. You are not subscribed to any mailing list.`

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
      <p style="margin:0 0 10px;text-transform:uppercase;letter-spacing:1.2px;font-size:12px;font-weight:800;color:#6b7280;">${escapeHtml(updateLabel)}</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;">${safeTitle}</h1>
      <p style="margin:0;">${escapeHtml(payload.summary)}</p>
      ${cta(payload.ctaLabel, payload.ctaUrl)}
    `,
    footer: `You received this email because you opted in to FoundersPrime updates. <a href="${escapeHtml(payload.unsubscribeUrl)}" style="color:#374151;">Unsubscribe</a>.`,
  })
  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\n${updateLabel}: ${payload.title}\n\n${payload.summary}\n\n${payload.ctaLabel}: ${payload.ctaUrl}\n\nUnsubscribe: ${payload.unsubscribeUrl}`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: payload.idempotencyKey,
  })
}
