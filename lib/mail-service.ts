/**
 * Server-only email delivery through Resend.
 * Keep provider credentials and sender configuration out of client bundles.
 */

export type EmailDeliveryResult =
  | { status: 'sent'; id?: string }
  | { status: 'not_configured'; error: string }
  | { status: 'failed'; error: string; retryable: boolean }

export interface SendEmailPayload {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  idempotencyKey?: string
}

export interface ProofEmailPayload {
  toEmail: string
  companyName: string
  websiteUrl: string
  dealSlug: string
}

function emailSender(): string {
  const name = process.env.RESEND_FROM_NAME?.trim() || 'FoundersPrime'
  const email = process.env.RESEND_FROM_EMAIL?.trim() || 'deals@foundersprime.com'
  return `${name} <${email}>`
}

export async function sendEmail(payload: SendEmailPayload): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return {
      status: 'not_configured',
      error: 'RESEND_API_KEY is not configured',
    }
  }

  const replyTo = payload.replyTo?.trim() || process.env.RESEND_REPLY_TO?.trim()

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...(payload.idempotencyKey
          ? { 'Idempotency-Key': payload.idempotencyKey }
          : {}),
      },
      body: JSON.stringify({
        from: emailSender(),
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        ...(payload.text ? { text: payload.text } : {}),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })

    if (!response.ok) {
      const providerError = await response.text()
      console.error(
        `Resend rejected email delivery (${response.status}):`,
        providerError
      )
      return {
        status: 'failed',
        error: `Resend rejected email delivery with status ${response.status}`,
        retryable: response.status === 429 || response.status >= 500,
      }
    }

    const body = (await response.json()) as { id?: string }
    return { status: 'sent', id: body.id }
  } catch (error) {
    console.error('Exception sending email through Resend:', error)
    return {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown Resend delivery error',
      retryable: true,
    }
  }
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

export async function sendDofollowProofEmail(
  payload: ProofEmailPayload
): Promise<{ success: boolean; message: string }> {
  const { toEmail, companyName, websiteUrl, dealSlug } = payload
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com'
  const dealUrl = `${appUrl}/deals/${encodeURIComponent(dealSlug)}`
  const verificationUrl = `${appUrl}/api/deals/${encodeURIComponent(dealSlug)}/verify-dofollow`
  const safeCompanyName = escapeHtml(companyName)
  const safeWebsiteUrl = escapeHtml(websiteUrl)
  const safeDealUrl = escapeHtml(dealUrl)
  const safeVerificationUrl = escapeHtml(verificationUrl)
  const subject = 'Verified: Your Do-Follow SEO Backlink is Live on FoundersPrime!'

  const html = `
    <div style="font-family: monospace, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; background-color: #ffffff; color: #000000;">
      <h2 style="text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0;">FoundersPrime SEO Dispatch</h2>
      <p>Hello Founder,</p>
      <p>Great news! Your deal for <strong>${safeCompanyName}</strong> has been approved, and your premium <strong>do-follow backlink</strong> is now live on our website.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border: 1px dashed #000; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>SEO Backlink Proof &amp; Details:</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Target Website:</strong> <a href="${safeWebsiteUrl}" style="color: #0066cc;">${safeWebsiteUrl}</a></li>
          <li><strong>Link Type:</strong> <code>dofollow</code> (rel="noopener")</li>
          <li><strong>Live Deal Page:</strong> <a href="${safeDealUrl}" style="color: #0066cc;">${safeDealUrl}</a></li>
          <li><strong>API Verification:</strong> <a href="${safeVerificationUrl}" style="color: #0066cc;">${safeVerificationUrl}</a></li>
        </ul>
      </div>
      <p>Search engines can now crawl this page and pass SEO authority to your domain.</p>
      <div style="margin-top: 30px; border-top: 2px solid #000; padding-top: 15px; font-size: 11px; color:#555;">
        <p>This is an automated delivery. No manual action is required. Thank you for listing with FoundersPrime.</p>
      </div>
    </div>
  `

  const result = await sendEmail({ to: toEmail, subject, html })
  if (result.status === 'sent') {
    return { success: true, message: 'Email sent successfully via Resend' }
  }

  console.warn(`Proof email was not delivered to ${toEmail}: ${result.error}`)
  return { success: false, message: result.error }
}
