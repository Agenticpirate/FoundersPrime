import { sendEmail, type EmailDeliveryResult } from '@/lib/mail-service'
import { createPreferenceToken } from '@/lib/email/preference-token'
import { readPreferences } from '@/lib/email/preference-store'

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

/**
 * Current launch offer. Kept here so email copy and the pricing page state the
 * same numbers; update both together if pricing changes.
 */
export const PLAN_OFFER: Record<
  MembershipPlan,
  { trial: string; annual: string; wasAnnual: string }
> = {
  nextfounder: { trial: '$1', annual: '$14.99/yr', wasAnnual: '$59' },
  founder: { trial: '$9.99', annual: '$48/yr', wasAnnual: '$149' },
  legend: { trial: '', annual: '$99 once', wasAnnual: '$299' },
}

/**
 * The natural next step after each plan. Used to seed the upgrade in the
 * activation email rather than waiting for a separate campaign.
 */
const PLAN_UPGRADE: Record<
  MembershipPlan,
  { label: string; pitch: string; adds: string[] } | null
> = {
  nextfounder: {
    label: 'Founder',
    pitch: 'Ready for the full catalog? Founder adds everything below for $48/yr.',
    adds: [
      'Cloud credits (AWS, GCP, Azure) and 100+ SaaS deals',
      'Ad credits, unlimited claims in every category',
      'Grants and funding matched to your stage',
      'Accelerators, incubators and fellowships',
      'Founder Vault and the ideas hub',
    ],
  },
  founder: {
    label: 'Legend',
    pitch: 'Never renew again — Legend is a one-time $99 for lifetime access.',
    adds: [
      'Everything in Founder, permanently',
      'No renewals, ever',
      'Every future deal and category included',
      'Launch-locked lifetime rate',
    ],
  },
  legend: null,
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
   * When supplied, consent is verified against email_preferences before sending.
   * Strongly preferred for campaigns: it makes an out-of-date audience list safe.
   */
  userId?: string
  /** Preference category this campaign belongs to, checked against the user's choice. */
  category?: 'dealAlerts' | 'membershipOffers' | 'productUpdates'
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

/** Canonical public site, used when no usable public URL is configured. */
const CANONICAL_APP_URL = 'https://www.foundersprime.com'

/**
 * Base URL for links inside email.
 *
 * Never returns a local address. During development NEXT_PUBLIC_APP_URL points at
 * localhost, and a localhost link in a real inbox is dead for the recipient — so
 * email always links to the public site regardless of local configuration.
 */
function appUrl(): string {
  const configured = (process.env.EMAIL_LINK_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || '')
    .trim()
    .replace(/\/$/, '')

  if (
    configured &&
    /^https:\/\//i.test(configured) &&
    !/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(configured)
  ) {
    return configured
  }

  return CANONICAL_APP_URL
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
  /** Matches the solid black background baked into the logo artwork. */
  headerBar: '#000000',
  accent: '#ffd700',
  paper: '#F4F3EF',
  surface: '#ffffff',
  text: '#1a1a1a',
  muted: '#6b7280',
  subtle: '#4b5563',
  hairline: '#e5e7eb',
} as const

/**
 * Base URL for images embedded in email.
 *
 * Deliberately separate from appUrl(): during local development
 * NEXT_PUBLIC_APP_URL points at localhost, and a localhost image URL is
 * unreachable from any real mail client, so the logo renders as a broken image.
 * Email assets therefore always resolve against a publicly reachable host.
 */
function emailAssetBase(): string {
  const configured = process.env.EMAIL_ASSET_BASE_URL?.trim()
  if (configured) return configured.replace(/\/$/, '')
  // appUrl() already guarantees a public HTTPS origin.
  return appUrl()
}

/** Full FOUNDERS[PRIME] wordmark, pre-trimmed for email at 220px wide. */
function wordmarkUrl(): string {
  return `${emailAssetBase()}/email/foundersprime-wordmark.png`
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
 * Header lockup: the real brand wordmark image. The source artwork already sits
 * on solid black, so the header bar uses pure black to avoid a visible seam.
 * The alt text carries the brand name for clients that block images.
 */
function brandHeader(): string {
  return `<a href="${appUrl()}" style="text-decoration:none;">
      <img src="${wordmarkUrl()}" width="220" height="71" alt="FoundersPrime"
           style="display:block;width:220px;height:71px;max-width:100%;border:0;outline:none;text-decoration:none;color:${BRAND.surface};font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:17px;font-weight:900;">
    </a>`
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
              <td style="background:${BRAND.headerBar};padding:18px 24px;">${brandHeader()}</td>
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

/**
 * Sender identity for marketing mail.
 *
 * CAN-SPAM requires a valid physical postal address in commercial email, and
 * filters treat its presence as a legitimacy signal. Set EMAIL_POSTAL_ADDRESS to
 * your registered address; the fallback names the operator and a contact route
 * so the requirement is never silently unmet.
 */
function senderIdentity(): string {
  const postal = process.env.EMAIL_POSTAL_ADDRESS?.trim()
  return postal
    ? `FoundersPrime &middot; ${escapeHtml(postal)}`
    : 'FoundersPrime &middot; Contact: support@foundersprime.com'
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

/** Secondary button, used where a section needs its own action. */
function buttonSmall(label: string, url: string, filled = false): string {
  const bg = filled ? BRAND.accent : BRAND.surface
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:10px 0 0;">
      <tr>
        <td style="background:${bg};border:2px solid ${BRAND.ink};box-shadow:2px 2px 0 0 ${BRAND.ink};">
          <a href="${escapeHtml(url)}" style="display:inline-block;padding:9px 16px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:0.8px;text-transform:uppercase;color:${BRAND.ink};text-decoration:none;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`
}

/**
 * Proof strip. Numbers are deliberately concrete — a specific figure is more
 * persuasive than an adjective, and these match what the site shows.
 */
function statStrip(
  stats: { value: string; label: string }[]
): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:20px 0 0;border-top:2px solid ${BRAND.ink};border-bottom:2px solid ${BRAND.ink};">
      <tr>
        ${stats
          .map(
            (s) =>
              `<td align="center" style="padding:12px 6px;">
                <div style="font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:18px;font-weight:900;color:${BRAND.ink};line-height:1.1;">${escapeHtml(s.value)}</div>
                <div style="font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:9px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:${BRAND.muted};margin-top:4px;">${escapeHtml(s.label)}</div>
              </td>`
          )
          .join('')}
      </tr>
    </table>`
}

/**
 * Two-column tiles linking straight into each catalog section, so a reader can
 * jump to the category they care about instead of landing on a generic page.
 */
function linkTiles(tiles: { title: string; meta: string; url: string }[]): string {
  const rows: string[] = []
  for (let i = 0; i < tiles.length; i += 2) {
    const pair = tiles.slice(i, i + 2)
    rows.push(
      `<tr>${pair
        .map(
          (t) =>
            `<td width="50%" style="padding:0 4px 8px 0;vertical-align:top;">
              <a href="${escapeHtml(t.url)}" style="display:block;border:2px solid ${BRAND.ink};background:${BRAND.surface};padding:11px 12px;text-decoration:none;">
                <span style="display:block;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.6px;color:${BRAND.ink};">${escapeHtml(t.title)}</span>
                <span style="display:block;font-size:11px;color:${BRAND.muted};margin-top:3px;">${escapeHtml(t.meta)}</span>
              </a>
            </td>`
        )
        .join('')}${pair.length === 1 ? '<td width="50%"></td>' : ''}</tr>`
    )
  }
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:14px 0 0;">${rows.join('')}</table>`
}

/** Catalog sections, each linking to a real route. */
const CATALOG_TILES = [
  { title: 'Cloud credits', meta: 'AWS, GCP, Azure and more', path: '/deals?category=cloud-credits' },
  { title: 'SaaS discounts', meta: '200+ tools at founder rates', path: '/deals?category=saas-discounts' },
  { title: 'Ad credits', meta: 'Paid acquisition budget', path: '/deals?category=ad-credits' },
  { title: 'Grants', meta: 'Non-dilutive funding', path: '/programs/grants' },
  { title: 'Accelerators', meta: 'YC, Techstars, 500 Global', path: '/programs/accelerators' },
  { title: 'Incubators', meta: 'Equity-free programs', path: '/programs/incubators' },
]

function catalogTiles(): string {
  return linkTiles(
    CATALOG_TILES.map((t) => ({ title: t.title, meta: t.meta, url: `${appUrl()}${t.path}` }))
  )
}

/**
 * Plan cards for the launch offer: trial price leads the eye, annual price and
 * the struck-through list price follow, and each card carries its own link so a
 * reader can act on the plan they want rather than a generic pricing link.
 */
function planOfferCards(pricingUrl: string): string {
  const rows: { plan: MembershipPlan; name: string; audience: string; featured: boolean }[] = [
    {
      plan: 'nextfounder',
      name: "Next'Founder",
      audience: 'Students & first builders',
      featured: false,
    },
    { plan: 'founder', name: 'Founder', audience: 'Full catalog, unlimited claims', featured: true },
  ]

  return rows
    .map((row) => {
      const offer = PLAN_OFFER[row.plan]
      return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 10px;border:2px solid ${row.featured ? BRAND.accent : BRAND.ink};background:${BRAND.surface};">
          <tr>
            <td style="padding:12px 14px;">
              ${
                row.featured
                  ? `<span style="display:inline-block;background:${BRAND.accent};color:${BRAND.ink};font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:8px;font-weight:900;letter-spacing:1px;text-transform:uppercase;padding:2px 6px;margin-bottom:6px;">Most popular</span><br>`
                  : ''
              }
              <span style="font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.6px;color:${BRAND.ink};">${escapeHtml(row.name)}</span>
              <span style="font-size:11px;color:${BRAND.muted};"> &middot; ${escapeHtml(row.audience)}</span>
              <div style="margin-top:8px;">
                <span style="font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:22px;font-weight:900;color:${BRAND.ink};">${escapeHtml(offer.trial)}</span>
                <span style="font-size:11px;font-weight:700;color:${BRAND.muted};text-transform:uppercase;"> first month</span>
                <div style="margin-top:3px;font-size:12px;color:${BRAND.subtle};">then ${escapeHtml(offer.annual)} <span style="color:${BRAND.muted};text-decoration:line-through;">${escapeHtml(offer.wasAnnual)}</span></div>
              </div>
              ${buttonSmall(`Start ${row.name} for ${offer.trial}`, pricingUrl, row.featured)}
            </td>
          </tr>
        </table>`
    })
    .join('')
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
  const pricingUrl = `${appUrl()}/pricing#plans`
  const planLabel = PLAN_LABELS[payload.plan]
  const benefits = PLAN_BENEFITS[payload.plan]
  const renewalNote = PLAN_RENEWAL_NOTE[payload.plan]
  const upgrade = PLAN_UPGRADE[payload.plan]

  // Seed the next tier inside the activation email, where intent is highest.
  const upgradeBlock = upgrade
    ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0 0;border:2px solid ${BRAND.accent};background:${BRAND.paper};">
        <tr>
          <td style="height:4px;background:${BRAND.accent};line-height:4px;font-size:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:16px 18px;">
            <p style="margin:0 0 6px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:10px;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:${BRAND.ink};">Next step &middot; ${escapeHtml(upgrade.label)}</p>
            <p style="margin:0 0 12px;font-size:16px;font-weight:800;color:${BRAND.ink};line-height:1.35;">${escapeHtml(upgrade.pitch)}</p>
            ${bulletList(upgrade.adds)}
            ${buttonSmall(`Upgrade to ${upgrade.label}`, pricingUrl, true)}
          </td>
        </tr>
      </table>`
    : ''

  const upgradeText = upgrade
    ? `\n\nNext step — ${upgrade.label}\n${upgrade.pitch}\n${upgrade.adds
        .map((a) => `- ${a}`)
        .join('\n')}\nSee ${upgrade.label}: ${pricingUrl}`
    : ''

  const subject = `Welcome to FoundersPrime ${planLabel}`
  const html = emailShell({
    preheader: `Your ${planLabel} membership is active.`,
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <p style="margin:0 0 10px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};">Membership activated</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;color:${BRAND.ink};">Your ${escapeHtml(planLabel)} membership is active.</h1>
      <p style="margin:0 0 18px;">Thanks for backing FoundersPrime. Here is what your membership includes:</p>
      ${bulletList(benefits)}
      <p style="margin:0 0 18px;">Every deal is verified before it is listed, so the credits, discounts and programs you see are ones you can actually claim.</p>

      <p style="margin:22px 0 0;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.muted};">Start claiming</p>
      ${catalogTiles()}
      ${cta('Open your dashboard', dashboardUrl)}
      <p style="margin:16px 0 0;font-size:13px;color:${BRAND.subtle};">Or go straight to the <a href="${escapeHtml(dealsUrl)}" style="color:${BRAND.ink};font-weight:700;">full catalog</a>, browse <a href="${escapeHtml(`${appUrl()}/flash-deals`)}" style="color:${BRAND.ink};font-weight:700;">flash deals</a>, or check your plan in <a href="${escapeHtml(billingUrl)}" style="color:${BRAND.ink};font-weight:700;">billing</a>.</p>
      ${upgradeBlock}
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
    )}\n\nOpen your dashboard: ${dashboardUrl}\nBrowse the deal catalog: ${dealsUrl}\nPlan and renewal date: ${billingUrl}${upgradeText}\n\n${renewalNote}\n\nQuestions? Reply to this email or write to support@foundersprime.com.\n\nThis email confirms activation of a FoundersPrime membership you purchased.${
    preferencesUrl ? `\nManage which optional emails you receive: ${preferencesUrl}` : ''
  }`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: `foundersprime-welcome-v1-${payload.userId}`,
    stream: 'transactional',
    entityRefId: `welcome-${payload.plan}-${payload.userId}`,
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
 * Transactional: it confirms an account the recipient just created, thanks them,
 * explains what the free account gives them, and presents the current launch
 * offer including the paid-trial terms. Sent exactly once per user via the
 * SIGNUP_EMAIL_MARKERS guard at the call site.
 */
export async function sendSignupWelcomeEmail(
  payload: SignupEmailPayload
): Promise<EmailDeliveryResult> {
  const dealsUrl = `${appUrl()}/deals`
  const dashboardUrl = `${appUrl()}/dashboard`
  const pricingUrl = `${appUrl()}/pricing#plans`
  const preferencesUrl = preferencesUrlFor(payload.userId)
  const subject = 'Thanks for signing up — your FoundersPrime account is ready'

  const freeIncludes = [
    'Browse the verified deal catalog',
    'Save deals to your dashboard',
    'Preview grants, accelerators and incubators',
  ]

  // Launch offer, priced explicitly. Trial terms are stated so the email cannot
  // imply a free trial or hide the renewal price.
  const membershipSummary = [
    `Next'Founder — students and indie builders. ${PLAN_OFFER.nextfounder.trial} for the first month, then ${PLAN_OFFER.nextfounder.annual} (was ${PLAN_OFFER.nextfounder.wasAnnual})`,
    `Founder — the full catalog, unlimited claims, grants and accelerators. ${PLAN_OFFER.founder.trial} for the first month, then ${PLAN_OFFER.founder.annual} (was ${PLAN_OFFER.founder.wasAnnual})`,
    `Legend — everything in Founder, permanently. ${PLAN_OFFER.legend.annual} (was ${PLAN_OFFER.legend.wasAnnual}), no renewals`,
  ]

  const html = emailShell({
    preheader: 'Your FoundersPrime account is ready.',
    body: `
      <p style="margin:0 0 18px;">${greeting(payload.firstName)}</p>
      <p style="margin:0 0 10px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};">Account created</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;letter-spacing:-0.7px;color:${BRAND.ink};">Thanks for signing up.</h1>
      <p style="margin:0 0 18px;">FoundersPrime collects verified startup deals in one place: cloud credits, SaaS discounts, non-dilutive grants, accelerators and incubators. Every listing is checked before it goes live.</p>
      <p style="margin:0 0 10px;font-weight:700;">With your free account you can:</p>
      ${bulletList(freeIncludes)}
      ${statStrip([
        { value: '242', label: 'Verified deals' },
        { value: '$3M+', label: 'Claimed by founders' },
        { value: '$500K+', label: 'Available per founder' },
      ])}

      <p style="margin:22px 0 0;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.muted};">Jump straight in</p>
      ${catalogTiles()}
      ${cta('Browse all 242 deals', dealsUrl)}

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0 0;border:2px solid ${BRAND.ink};background:${BRAND.paper};">
        <tr>
          <td style="padding:16px 18px;">
            <p style="margin:0 0 6px;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:10px;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:${BRAND.ink};">Launch offer &middot; limited time</p>
            <p style="margin:0 0 14px;font-size:17px;font-weight:800;color:${BRAND.ink};line-height:1.3;">Unlock everything for 30 days from ${escapeHtml(PLAN_OFFER.nextfounder.trial)}.</p>
            ${planOfferCards(pricingUrl)}
            <p style="margin:12px 0 0;font-size:11px;color:${BRAND.muted};">Trials renew automatically at the annual price shown. Cancel anytime before renewal.</p>
          </td>
        </tr>
      </table>

      <p style="margin:24px 0 0;font-size:13px;color:${BRAND.subtle};">Also worth a look: <a href="${escapeHtml(`${appUrl()}/flash-deals`)}" style="color:${BRAND.ink};font-weight:700;">flash deals</a>, <a href="${escapeHtml(`${appUrl()}/student-benefits`)}" style="color:${BRAND.ink};font-weight:700;">student benefits</a> and the <a href="${escapeHtml(`${appUrl()}/resources`)}" style="color:${BRAND.ink};font-weight:700;">founder resources</a>.</p>
      <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">Your <a href="${escapeHtml(dashboardUrl)}" style="color:#374151;font-weight:700;">dashboard</a> keeps your saved deals in one place. Questions? Reply to this email or write to support@foundersprime.com.</p>
    `,
    footer: transactionalFooter(
      'This email confirms the FoundersPrime account you just created. You are not subscribed to any marketing list — optional emails are off until you turn them on.',
      preferencesUrl
    ),
  })

  const text = `${payload.firstName?.trim() ? `Hi ${payload.firstName.trim().split(/\s+/)[0]},` : 'Hi Founder,'}\n\nYour FoundersPrime account is ready.\n\nFoundersPrime collects verified startup deals in one place: cloud credits, SaaS discounts, non-dilutive grants, accelerators and incubators.\n\nWith your free account you can:\n${freeIncludes
    .map((f) => `- ${f}`)
    .join('\n')}\n\nBrowse the deal catalog: ${dealsUrl}\n\nLAUNCH OFFER — try a full membership for 30 days from ${
    PLAN_OFFER.nextfounder.trial
  }:\n${membershipSummary
    .map((m) => `- ${m}`)
    .join(
      '\n'
    )}\nTrials renew automatically at the annual price shown. Cancel anytime before renewal.\n\nStart your trial: ${pricingUrl}\nYour dashboard: ${dashboardUrl}\n\nQuestions? Reply to this email or write to support@foundersprime.com.\n\nThis email confirms the account you just created. You are not subscribed to any marketing list — optional emails are off until you turn them on.${
    preferencesUrl ? `\nChoose which emails you receive: ${preferencesUrl}` : ''
  }`

  return sendEmail({
    to: payload.toEmail,
    subject,
    html,
    text,
    idempotencyKey: `foundersprime-signup-v1-${payload.userId}`,
    stream: 'transactional',
    entityRefId: `signup-${payload.userId}`,
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

  // Consent is re-checked against the database when a user is identified, so a
  // stale audience list cannot mail someone who has since opted out. The caller's
  // timestamp alone is not treated as authoritative.
  if (payload.userId) {
    const { preferences } = await readPreferences(payload.userId)
    if (preferences.unsubscribedAllAt) {
      return { status: 'skipped', reason: 'Recipient has unsubscribed from all optional email' }
    }
    if (!preferences.optedInAt) {
      return { status: 'skipped', reason: 'No recorded opt-in for this recipient' }
    }
    if (payload.category && !preferences[payload.category]) {
      return { status: 'skipped', reason: `Recipient has not opted in to ${payload.category}` }
    }
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
      <p style="margin:26px 0 0;font-family:'IBM Plex Mono',Consolas,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.muted};">More in the catalog</p>
      ${catalogTiles()}
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
    }<br><br><span style="color:${BRAND.muted};">${senderIdentity()}</span>`,
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
    stream: 'marketing',
    entityRefId: payload.idempotencyKey || `campaign-${Date.now()}`,
    // RFC 8058: lets Gmail and Yahoo render a native one-click unsubscribe.
    listUnsubscribeUrl:
      payload.oneClickUnsubscribeUrl && validHttpUrl(payload.oneClickUnsubscribeUrl)
        ? payload.oneClickUnsubscribeUrl
        : payload.unsubscribeUrl,
  })
}
