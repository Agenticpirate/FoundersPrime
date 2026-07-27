import { sendEmail, type EmailDeliveryResult } from '@/lib/mail-service'

export type MembershipPlan = 'nextfounder' | 'founder' | 'legend'
export type LifecycleUpdateKind = 'new_deal' | 'membership_offer' | 'resource'

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

export async function sendWelcomeEmail(
  payload: WelcomeEmailPayload
): Promise<EmailDeliveryResult> {
  const dashboardUrl = `${appUrl()}/dashboard`
  const dealsUrl = `${appUrl()}/deals`
  const planLabel = PLAN_LABELS[payload.plan]
  const subject = `Welcome to FoundersPrime ${planLabel}`
  const html = emailShell({
    preheader: `Your ${planLabel} membership is active.`,
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;">Your ${escapeHtml(planLabel)} membership is active.</h1>
      <p style="margin:0 0 16px;">Welcome to FoundersPrime. You can now explore your membership dashboard, discover founder deals, and use the resources included with your plan.</p>
      ${cta('Open your dashboard', dashboardUrl)}
      <p style="margin:18px 0 0;font-size:14px;color:#4b5563;">Start exploring now: <a href="${escapeHtml(dealsUrl)}" style="color:#111827;font-weight:700;">browse founder deals</a>.</p>
    `,
    footer: 'This transactional email confirms activation of a FoundersPrime membership you purchased. It is not a marketing subscription.',
  })
  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\nYour ${planLabel} membership is active.\n\nOpen your dashboard: ${dashboardUrl}\nBrowse founder deals: ${dealsUrl}\n\nThis transactional email confirms activation of a FoundersPrime membership you purchased.`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: `foundersprime-welcome-v1-${payload.userId}`,
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
