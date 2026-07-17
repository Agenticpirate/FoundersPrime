/**
 * Provider → official apply / pricing / startup-program URLs.
 * Used when deal.applicationUrl is missing or is a Google-search placeholder.
 */

export const startupProgramUrls: { [key: string]: string } = {
  // Status & Monitoring
  instatus: 'https://instatus.com/startups',
  statuspage: 'https://www.atlassian.com/software/statuspage/startup-program',
  pingdom: 'https://www.pingdom.com/startup-program/',
  'uptime robot': 'https://uptimerobot.com/pricing/',
  betteruptime: 'https://betteruptime.com/pricing',

  // Cloud Infrastructure
  cloudflare: 'https://www.cloudflare.com/forstartups/',
  aws: 'https://aws.amazon.com/activate/',
  'amazon web services': 'https://aws.amazon.com/activate/',
  'google cloud': 'https://cloud.google.com/startup',
  'google cloud platform': 'https://cloud.google.com/startup',
  gcp: 'https://cloud.google.com/startup',
  'microsoft azure': 'https://azure.microsoft.com/en-us/free/',
  azure: 'https://azure.microsoft.com/en-us/free/',
  digitalocean: 'https://www.digitalocean.com/hatch',
  heroku: 'https://www.heroku.com/startups',
  vercel: 'https://vercel.com/pricing',
  netlify: 'https://www.netlify.com/pricing/',
  linode: 'https://www.linode.com/lp/startups/',
  vultr: 'https://www.vultr.com/',

  // Productivity
  'google workspace': 'https://workspace.google.com/pricing.html',
  notion: 'https://www.notion.so/startups',
  slack: 'https://slack.com/pricing',
  asana: 'https://asana.com/pricing',
  trello: 'https://trello.com/pricing',
  airtable: 'https://www.airtable.com/pricing',
  clickup: 'https://clickup.com/pricing',
  'monday.com': 'https://monday.com/pricing',
  monday: 'https://monday.com/pricing',
  'monday crm': 'https://monday.com/pricing',
  'monday dev': 'https://monday.com/pricing',
  basecamp: 'https://basecamp.com/pricing',

  // CRM & Sales
  hubspot: 'https://www.hubspot.com/startups',
  salesforce: 'https://www.salesforce.com/form/signup/freetrial-sales/',
  pipedrive: 'https://www.pipedrive.com/en/pricing',
  zoho: 'https://www.zoho.com/crm/zohocrm-pricing.html',
  freshworks: 'https://www.freshworks.com/crm/sales/',
  freshsales: 'https://www.freshworks.com/crm/sales/',
  freshservice: 'https://www.freshworks.com/freshservice/pricing/',
  freshbooks: 'https://www.freshbooks.com/pricing',
  zendesk: 'https://www.zendesk.com/startups/',
  intercom: 'https://www.intercom.com/early-stage',
  drift: 'https://www.drift.com/pricing/',
  crisp: 'https://crisp.chat/en/pricing/',
  seamlessai: 'https://seamless.ai/pricing',
  'seamless.ai': 'https://seamless.ai/pricing',

  // Marketing & Email
  mailchimp: 'https://mailchimp.com/pricing/',
  sendgrid: 'https://sendgrid.com/pricing/',
  mailgun: 'https://www.mailgun.com/pricing/',
  convertkit: 'https://convertkit.com/pricing',
  brevo: 'https://www.brevo.com/pricing/',
  sendinblue: 'https://www.brevo.com/pricing/',
  klaviyo: 'https://www.klaviyo.com/pricing',
  activecampaign: 'https://www.activecampaign.com/pricing',
  getresponse: 'https://www.getresponse.com/pricing',
  campaigner: 'https://www.campaigner.com/',
  mailersend: 'https://www.mailersend.com/pricing',
  'sender.net': 'https://www.sender.net/pricing/',
  unbounce: 'https://unbounce.com/pricing/',
  clickfunnels: 'https://www.clickfunnels.com/',
  'swipe pages': 'https://swipepages.com/',
  impactcom: 'https://impact.com/',
  'impact.com': 'https://impact.com/',
  flexoffers: 'https://www.flexoffers.com/',
  partnerstack: 'https://www.partnerstack.com/',

  // Communication
  twilio: 'https://www.twilio.com/en-us/startup-program',
  vonage: 'https://www.vonage.com/communications-apis/pricing/',
  zoom: 'https://zoom.us/pricing',
  whereby: 'https://whereby.com/information/pricing/',
  calendly: 'https://calendly.com/pricing',
  myoperator: 'https://myoperator.com/',
  'quo (ex. openphone)': 'https://www.openphone.com/',
  openphone: 'https://www.openphone.com/',

  // Development Tools
  github: 'https://education.github.com/pack',
  gitlab: 'https://about.gitlab.com/pricing/',
  bitbucket: 'https://bitbucket.org/product/pricing',
  jira: 'https://www.atlassian.com/software/jira/pricing',
  confluence: 'https://www.atlassian.com/software/confluence/pricing',
  linear: 'https://linear.app/pricing',
  sentry: 'https://sentry.io/pricing/',
  datadog: 'https://www.datadoghq.com/pricing/',
  newrelic: 'https://newrelic.com/pricing',
  postman: 'https://www.postman.com/pricing/',
  insomnia: 'https://insomnia.rest/pricing',
  'blackbox ai': 'https://www.blackbox.ai/',
  blackbox: 'https://www.blackbox.ai/',
  lambdatest: 'https://www.lambdatest.com/pricing',
  instantlyai: 'https://instantly.ai/pricing',
  'instantly.ai': 'https://instantly.ai/pricing',
  phantombuster: 'https://phantombuster.com/pricing',
  rocketnew: 'https://www.rocket.new/',
  'rocket.new': 'https://www.rocket.new/',

  // Design
  figma: 'https://www.figma.com/pricing/',
  canva: 'https://www.canva.com/pricing/',
  sketch: 'https://www.sketch.com/pricing/',
  invision: 'https://www.invisionapp.com/plans',
  adobe: 'https://www.adobe.com/creativecloud/plans.html',
  illustrator: 'https://www.adobe.com/products/illustrator.html',
  piktochart: 'https://piktochart.com/pricing/',
  simplified: 'https://simplified.com/pricing',
  letsenhance: 'https://letsenhance.io/pricing',

  // Database
  mongodb: 'https://www.mongodb.com/startup-accelerator',
  supabase: 'https://supabase.com/pricing',
  firebase: 'https://firebase.google.com/pricing',
  planetscale: 'https://planetscale.com/pricing',
  cockroachdb: 'https://www.cockroachlabs.com/pricing/',
  redis: 'https://redis.io/pricing/',
  hygraph: 'https://hygraph.com/pricing',
  'hygraph (ex. graphcms)': 'https://hygraph.com/pricing',
  graphcms: 'https://hygraph.com/pricing',

  // Payments / ecommerce
  stripe: 'https://stripe.com/pricing',
  shopify: 'https://www.shopify.com/pricing',
  square: 'https://squareup.com/us/en/pricing',
  paypal: 'https://www.paypal.com/us/webapps/mpp/merchant-fees',
  woocommerce: 'https://woocommerce.com/pricing/',
  bigcommerce: 'https://www.bigcommerce.com/pricing/',
  apparelmagic: 'https://apparelmagic.com/',

  // Website builders / hosting
  webflow: 'https://webflow.com/pricing',
  wordpress: 'https://wordpress.com/pricing/',
  squarespace: 'https://www.squarespace.com/pricing',
  wix: 'https://www.wix.com/upgrade/website',
  ghost: 'https://ghost.org/pricing/',
  hostinger: 'https://www.hostinger.com/pricing',
  'hostinger horizons': 'https://www.hostinger.com/horizons',
  'elementor: hosting': 'https://elementor.com/hosting/',
  'elementor: website builder': 'https://elementor.com/pricing-plugin/',
  elementor: 'https://elementor.com/',
  'faaaster (ex. themecloud)': 'https://faaaster.com/',
  faaaster: 'https://faaaster.com/',
  themecloud: 'https://faaaster.com/',
  chemicloud: 'https://chemicloud.com/',
  'cherry servers': 'https://www.cherryservers.com/',
  builderall: 'https://www.builderall.com/',
  cloudimage: 'https://www.cloudimage.io/en/home',

  // Automation
  zapier: 'https://zapier.com/pricing',
  make: 'https://www.make.com/en/pricing',
  integromat: 'https://www.make.com/en/pricing',
  ifttt: 'https://ifttt.com/plans',
  'n8n': 'https://n8n.io/pricing/',
  processstreet: 'https://www.process.st/pricing/',
  'process street': 'https://www.process.st/pricing/',

  // AI
  openai: 'https://openai.com/pricing',
  anthropic: 'https://www.anthropic.com/pricing',
  'perplexity ai': 'https://www.perplexity.ai/pro',
  perplexity: 'https://www.perplexity.ai/pro',
  jasper: 'https://www.jasper.ai/pricing',
  'copy.ai': 'https://www.copy.ai/pricing',
  writesonic: 'https://writesonic.com/pricing',
  grammarly: 'https://www.grammarly.com/plans',
  logicballs: 'https://logicballs.com/',
  livechatai: 'https://livechatai.com/',
  chatsimple: 'https://www.chatsimple.ai/',
  'chatsimple.ai': 'https://www.chatsimple.ai/',

  // Analytics
  'google analytics': 'https://analytics.google.com/',
  mixpanel: 'https://mixpanel.com/pricing/',
  amplitude: 'https://amplitude.com/pricing',
  segment: 'https://segment.com/pricing/',
  heap: 'https://heap.io/pricing',
  hotjar: 'https://www.hotjar.com/pricing/',
  fullstory: 'https://www.fullstory.com/pricing/',
  similarweb: 'https://www.similarweb.com/corp/pricing/',
  'june analytics': 'https://www.june.so/',
  june: 'https://www.june.so/',
  livesession: 'https://livesession.io/pricing/',
  snowcatcloud: 'https://www.snowcatcloud.com/',
  iconosquare: 'https://www.iconosquare.com/pricing',
  crunchbase: 'https://www.crunchbase.com/',

  // Accounting & finance
  quickbooks: 'https://quickbooks.intuit.com/pricing/',
  'quickbooks online': 'https://quickbooks.intuit.com/pricing/',
  xero: 'https://www.xero.com/us/pricing-plans/',
  wave: 'https://www.waveapps.com/pricing',
  expensify: 'https://www.expensify.com/pricing',
  brex: 'https://www.brex.com/product/business-account',
  mercury: 'https://mercury.com/',
  ramp: 'https://ramp.com/',
  'sage accounting': 'https://www.sage.com/en-us/products/sage-accounting/',
  invoiceberry: 'https://www.invoiceberry.com/pricing',
  'guideline retirement': 'https://www.guideline.com/',
  guideline: 'https://www.guideline.com/',

  // HR
  gusto: 'https://gusto.com/product/pricing',
  bamboohr: 'https://www.bamboohr.com/pricing',
  workday: 'https://www.workday.com/',
  greenhouse: 'https://www.greenhouse.io/pricing',
  lever: 'https://www.lever.co/pricing',
  ashbyhq: 'https://www.ashbyhq.com/pricing',
  multiplier: 'https://www.usemultiplier.com/',
  remotepass: 'https://www.remotepass.com/',
  'talent sam': 'https://www.talentsam.com/',
  'betterway devs': 'https://www.betterway.dev/',
  somewhere: 'https://www.somewhere.com/',
  'somewhere (ex. support shepherd)': 'https://www.somewhere.com/',

  // Security / VPN
  okta: 'https://www.okta.com/pricing/',
  auth0: 'https://auth0.com/startups',
  onelogin: 'https://www.onelogin.com/pricing',
  lastpass: 'https://www.lastpass.com/pricing',
  '1password': 'https://1password.com/pricing/',
  bitwarden: 'https://bitwarden.com/pricing/',
  'keeper security': 'https://www.keepersecurity.com/pricing.html',
  keeper: 'https://www.keepersecurity.com/pricing.html',
  hypervault: 'https://hypervault.com/',
  expressvpn: 'https://www.expressvpn.com/',
  'hide.me vpn': 'https://hide.me/',
  'hide.me': 'https://hide.me/',
  'proton vpn': 'https://protonvpn.com/',
  'proton mail': 'https://proton.me/mail',
  'proton drive': 'https://proton.me/drive',
  'norton antivirus': 'https://us.norton.com/',
  'eset protect advanced': 'https://www.eset.com/us/business/',
  eset: 'https://www.eset.com/',
  'avg technologies': 'https://www.avg.com/',
  avg: 'https://www.avg.com/',
  'fraud blocker': 'https://fraudblocker.com/',

  // Social / media / creative
  buffer: 'https://buffer.com/pricing',
  hootsuite: 'https://www.hootsuite.com/plans',
  sproutsocial: 'https://sproutsocial.com/pricing/',
  later: 'https://later.com/pricing/',
  'social champ': 'https://www.socialchamp.com/pricing/',
  'mashup web social': 'https://www.mashup-web.com/',
  'amazon music': 'https://music.amazon.com/',
  'epidemic sound': 'https://www.epidemicsound.com/pricing/',
  shutterstock: 'https://www.shutterstock.com/pricing',
  depositphotos: 'https://depositphotos.com/pricing.html',
  masterclass: 'https://www.masterclass.com/',
  skillshare: 'https://www.skillshare.com/en/pricing',
  futurelearn: 'https://www.futurelearn.com/',
  'riverside.fm': 'https://riverside.fm/pricing',
  riverside: 'https://riverside.fm/pricing',
  'tella (ex. tella.tv)': 'https://www.tella.tv/',
  tella: 'https://www.tella.tv/',

  // Support / chat
  freshdesk: 'https://freshdesk.com/pricing',
  helpscout: 'https://www.helpscout.com/pricing/',
  livechat: 'https://www.livechat.com/pricing/',
  tidio: 'https://www.tidio.com/pricing/',
  'hiver gmail extension': 'https://hiverhq.com/pricing',
  hiver: 'https://hiverhq.com/pricing',

  // Legal / docs
  docusign: 'https://www.docusign.com/plans-and-pricing',
  hellosign: 'https://www.hellosign.com/pricing',
  pandadoc: 'https://www.pandadoc.com/pricing/',
  ironclad: 'https://ironcladapp.com/pricing/',
  legalstart: 'https://www.legalstart.fr/',
  legalplace: 'https://www.legalplace.fr/',
  'captain contrat': 'https://www.captaincontrat.com/',
  signaturit: 'https://www.signaturit.com/',
  'contract-factory': 'https://contract-factory.com/',
  'tailor brands': 'https://www.tailorbrands.com/',

  // Other SaaS from catalog with google placeholders
  typeform: 'https://www.typeform.com/pricing/',
  surveymonkey: 'https://www.surveymonkey.com/pricing/',
  surveysparrow: 'https://surveysparrow.com/pricing/',
  loom: 'https://www.loom.com/pricing',
  miro: 'https://miro.com/pricing/',
  lucidchart: 'https://www.lucidchart.com/pages/pricing',
  coda: 'https://coda.io/pricing',
  'fellow.app': 'https://fellow.app/pricing/',
  fellow: 'https://fellow.app/pricing/',
  blocksurvey: 'https://blocksurvey.io/pricing',
  carepatron: 'https://www.carepatron.com/pricing',
  'catchapp bookings': 'https://www.catchapp.com/',
  catchapp: 'https://www.catchapp.com/',
  findcustomer: 'https://www.findcustomer.com/',
  letterbucket: 'https://letterbucket.com/',
  memberstack: 'https://www.memberstack.com/pricing',
  mobiroller: 'https://www.mobiroller.com/',
  monsterone: 'https://monsterone.com/',
  mypresences: 'https://mypresences.com/',
  outreachly: 'https://outreachly.io/',
  'post affiliate pro': 'https://www.postaffiliatepro.com/pricing/',
  distrobird: 'https://distrobird.com/',
  'dotcom-monitor': 'https://www.dotcom-monitor.com/pricing/',
  'bright data': 'https://brightdata.com/pricing',
  brightdata: 'https://brightdata.com/pricing',
  influencekit: 'https://influencekit.com/',
  similarcontent: 'https://similarcontent.com/',
  'the saasy people': 'https://www.thesaasypeople.com/',
  learnworlds: 'https://www.learnworlds.com/pricing/',
}

/** Known awkward provider names → homepage host */
const PROVIDER_DOMAINS: Record<string, string> = {
  unbounce: 'unbounce.com',
  'fellow.app': 'fellow.app',
  'impact.com': 'impact.com',
  'sender.net': 'sender.net',
  'instantly.ai': 'instantly.ai',
  'chatsimple.ai': 'chatsimple.ai',
  'riverside.fm': 'riverside.fm',
  'rocket.new': 'rocket.new',
  'hide.me vpn': 'hide.me',
  'hide.me': 'hide.me',
  'seamless.ai': 'seamless.ai',
  'monday.com': 'monday.com',
  'monday crm': 'monday.com',
  'monday dev': 'monday.com',
  'elementor: hosting': 'elementor.com',
  'elementor: website builder': 'elementor.com',
  'faaaster (ex. themecloud)': 'faaaster.com',
  'hygraph (ex. graphcms)': 'hygraph.com',
  'proton mail': 'proton.me',
  'proton vpn': 'protonvpn.com',
  'proton drive': 'proton.me',
  'quo (ex. openphone)': 'openphone.com',
  'tella (ex. tella.tv)': 'tella.tv',
  'somewhere (ex. support shepherd)': 'somewhere.com',
  'avg technologies': 'avg.com',
  'eset protect advanced': 'eset.com',
  'norton antivirus': 'norton.com',
  'keeper security': 'keepersecurity.com',
  'amazon music': 'music.amazon.com',
  'epidemic sound': 'epidemicsound.com',
  'bright data': 'brightdata.com',
  'process street': 'process.st',
  'quickbooks online': 'quickbooks.intuit.com',
  'sage accounting': 'sage.com',
  'guideline retirement': 'guideline.com',
  'hostinger horizons': 'hostinger.com',
  'hiver gmail extension': 'hiverhq.com',
  'fraud blocker': 'fraudblocker.com',
  'betterway devs': 'betterway.dev',
  'captain contrat': 'captaincontrat.com',
  'catchapp bookings': 'catchapp.com',
  'cherry servers': 'cherryservers.com',
  'post affiliate pro': 'postaffiliatepro.com',
  'social champ': 'socialchamp.com',
  'tailor brands': 'tailorbrands.com',
  'talent sam': 'talentsam.com',
  'the saasy people': 'thesaasypeople.com',
  'mashup web social': 'mashup-web.com',
  'june analytics': 'june.so',
  'livechatai': 'livechatai.com',
  'blackbox ai': 'blackbox.ai',
  'contract-factory': 'contract-factory.com',
  'dotcom-monitor': 'dotcom-monitor.com',
}

export function isPlaceholderApplicationUrl(url?: string | null): boolean {
  if (!url || !String(url).trim()) return true
  const u = String(url).trim().toLowerCase()
  if (u === '#' || u === 'n/a' || u === 'none' || u === 'null') return true
  if (u.includes('google.com/search')) return true
  if (u.includes('google.com/url?')) return true
  if (u.startsWith('javascript:')) return true
  if (u.startsWith('about:blank')) return true
  // malformed
  try {
    const parsed = new URL(u.startsWith('http') ? u : `https://${u}`)
    if (!parsed.hostname || parsed.hostname === 'localhost') return true
  } catch {
    return true
  }
  return false
}

function normalizeProviderKey(providerName: string): string {
  return (providerName || '').toLowerCase().trim()
}

/**
 * Build a best-effort official homepage from a provider name.
 */
export function providerHomepageUrl(providerName: string): string {
  const normalized = normalizeProviderKey(providerName)
  if (!normalized) return 'https://www.foundersprime.com/deals'

  if (PROVIDER_DOMAINS[normalized]) {
    return `https://${PROVIDER_DOMAINS[normalized]}/`
  }

  // strip parentheticals / after colon
  let base = normalized
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/:.*$/, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // known multi-word leftovers
  if (PROVIDER_DOMAINS[base]) {
    return `https://${PROVIDER_DOMAINS[base]}/`
  }

  // Prefer .com from cleaned slug
  const slug = base.replace(/[^a-z0-9]/g, '')
  if (!slug) return 'https://www.foundersprime.com/deals'

  // common tld guesses for brand.tld already in name
  if (base.includes('.')) {
    const host = base.replace(/\s+/g, '')
    return `https://${host.startsWith('www.') ? host : host}/`
  }

  return `https://www.${slug}.com/`
}

/**
 * Get startup program URL with better matching
 */
export function getStartupProgramUrl(providerName: string): string {
  const normalized = normalizeProviderKey(providerName)
  if (!normalized) return 'https://www.foundersprime.com/deals'

  if (startupProgramUrls[normalized]) {
    return startupProgramUrls[normalized]
  }

  const variations = [
    normalized.replace(/[^a-z0-9\s]/g, ''),
    normalized.replace(/\s+/g, ''),
    normalized.replace(/\s+/g, '-'),
    normalized.replace(/\./g, ''),
    normalized.replace(/\s*\(.*?\)\s*/g, ' ').trim(),
    normalized.replace(/:.*$/, '').trim(),
  ]

  for (const variation of variations) {
    if (startupProgramUrls[variation]) {
      return startupProgramUrls[variation]
    }
  }

  for (const [key, url] of Object.entries(startupProgramUrls)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return url
    }
  }

  return providerHomepageUrl(providerName)
}

export type DealUrlFields = {
  applicationUrl?: string | null
  application_url?: string | null
  providerWebsite?: string | null
  provider_website?: string | null
  actualDealUrl?: string | null
  provider?: string | null
  title?: string | null
}

/**
 * Resolve a safe apply URL for a deal.
 * Never returns a Google search placeholder.
 */
export function resolveDealApplicationUrl(deal: DealUrlFields): string {
  const candidates = [
    deal.applicationUrl,
    deal.application_url,
    deal.actualDealUrl,
    deal.providerWebsite,
    deal.provider_website,
  ]

  for (const c of candidates) {
    if (c && !isPlaceholderApplicationUrl(c)) {
      const url = String(c).trim()
      if (url.startsWith('http://') || url.startsWith('https://')) return url
      return `https://${url}`
    }
  }

  return getStartupProgramUrl(deal.provider || deal.title || '')
}
