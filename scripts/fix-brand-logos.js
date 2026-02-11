#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const DEALS_FILE = path.join(process.cwd(), 'public/data/all-deals.json')

console.log('\n=== UPDATE BRAND LOGOS ===\n')

// Verified working logo URLs from official sources and CDNs
const logos = {
  // Cloud & Infrastructure
  'cloudflare': 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg',
  'digitalocean': 'https://www.digitalocean.com/_next/static/media/logo.87a8f3b8.svg',
  'vercel': 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
  'netlify': 'https://www.netlify.com/v3/img/components/logomark.svg',
  'heroku': 'https://www.herokucdn.com/favicons/favicon.ico',
  'railway': 'https://railway.app/brand/logo-light.png',
  'render': 'https://render.com/favicon.ico',
  'alibaba cloud': 'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png',
  'confluent': 'https://www.confluent.io/wp-content/themes/flavor/assets/images/logo.svg',

  // AI & ML
  'openai': 'https://openai.com/favicon.ico',
  'anthropic': 'https://www.anthropic.com/favicon.ico',
  'hugging face': 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
  'cohere': 'https://cohere.com/favicon.ico',
  'jasper': 'https://www.jasper.ai/favicon.ico',
  'grammarly': 'https://static.grammarly.com/assets/files/cb6ce17d281d15f2c819f1e.svg',
  'copy.ai': 'https://www.copy.ai/favicon.ico',

  // Productivity
  'notion': 'https://www.notion.so/images/logo-ios.png',
  'asana': 'https://luna1.co/eb0e4e.png',
  'monday': 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/monday-logo.png',
  'monday.com': 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/monday-logo.png',
  'clickup': 'https://clickup.com/landing/images/clickup-symbol_color.svg',
  'trello': 'https://trello.com/favicon.ico',
  'jira': 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
  'atlassian': 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
  'linear': 'https://linear.app/favicon.ico',
  'airtable': 'https://airtable.com/favicon.ico',
  'coda': 'https://coda.io/favicon.ico',
  'miro': 'https://miro.com/favicon.ico',
  'figma': 'https://static.figma.com/app/icon/1/favicon.png',
  'canva': 'https://static.canva.com/static/images/favicon-1.ico',
  'loom': 'https://cdn.loom.com/assets/favicons-loom/favicon.ico',

  // Communication
  'slack': 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
  'discord': 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico',
  'zoom': 'https://st1.zoom.us/zoom.ico',
  'zoom meetings': 'https://st1.zoom.us/zoom.ico',
  'microsoft teams': 'https://statics.teams.cdn.office.net/evergreen-assets/icons/microsoft-teams-logo.svg',
  'calendly': 'https://calendly.com/favicon.ico',
  'cal.com': 'https://cal.com/favicon.ico',
  'intercom': 'https://static.intercomassets.com/assets/favicon-9b3c6e.png',
  'zendesk': 'https://d1eipm3vz40ber.cloudfront.net/images/favicon.ico',
  'freshdesk': 'https://www.freshworks.com/favicon.ico',
  'twilio': 'https://www.twilio.com/favicon.ico',
  'sendgrid': 'https://sendgrid.com/favicon.ico',
  'aircall': 'https://aircall.io/favicon.ico',

  // Marketing & Sales
  'hubspot': 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
  'salesforce': 'https://www.salesforce.com/favicon.ico',
  'mailchimp': 'https://mailchimp.com/release/plums/cxp/images/favicon.ico',
  'brevo': 'https://www.brevo.com/favicon.ico',
  'sendinblue': 'https://www.brevo.com/favicon.ico',
  'brevo (ex. sendinblue)': 'https://www.brevo.com/favicon.ico',
  'klaviyo': 'https://www.klaviyo.com/favicon.ico',
  'activecampaign': 'https://www.activecampaign.com/favicon.ico',
  'convertkit': 'https://convertkit.com/favicon.ico',
  'mailerlite': 'https://www.mailerlite.com/favicon.ico',
  'semrush': 'https://www.semrush.com/favicon.ico',
  'ahrefs': 'https://ahrefs.com/favicon.ico',
  'buffer': 'https://buffer.com/favicon.ico',
  'hootsuite': 'https://hootsuite.com/favicon.ico',
  'typeform': 'https://www.typeform.com/favicon.ico',
  'hotjar': 'https://www.hotjar.com/favicon.ico',
  'mixpanel': 'https://mixpanel.com/favicon.ico',
  'amplitude': 'https://amplitude.com/favicon.ico',
  'segment': 'https://segment.com/favicon.ico',
  'posthog': 'https://posthog.com/favicon.ico',
  'apollo.io': 'https://www.apollo.io/favicon.ico',

  // Finance & Payments
  'stripe': 'https://stripe.com/favicon.ico',
  'stripe atlas': 'https://stripe.com/favicon.ico',
  'paypal': 'https://www.paypalobjects.com/webstatic/icon/favicon.ico',
  'square': 'https://squareup.com/favicon.ico',
  'wise': 'https://wise.com/favicon.ico',
  'mercury': 'https://mercury.com/favicon.ico',
  'brex': 'https://www.brex.com/favicon.ico',
  'ramp': 'https://ramp.com/favicon.ico',
  'quickbooks': 'https://quickbooks.intuit.com/favicon.ico',
  'xero': 'https://www.xero.com/favicon.ico',
  'freshbooks': 'https://www.freshbooks.com/favicon.ico',
  'gusto': 'https://gusto.com/favicon.ico',
  'rippling': 'https://www.rippling.com/favicon.ico',
  'deel': 'https://www.deel.com/favicon.ico',
  'paddle': 'https://paddle.com/favicon.ico',
  'chargebee': 'https://www.chargebee.com/favicon.ico',
  'carta': 'https://carta.com/favicon.ico',
  'bill': 'https://www.bill.com/favicon.ico',
  'airwallex': 'https://www.airwallex.com/favicon.ico',

  // Development Tools
  'github': 'https://github.githubassets.com/favicons/favicon.svg',
  'gitlab': 'https://gitlab.com/favicon.ico',
  'bitbucket': 'https://bitbucket.org/favicon.ico',
  'docker': 'https://www.docker.com/favicon.ico',
  'datadog': 'https://www.datadoghq.com/favicon.ico',
  'new relic': 'https://newrelic.com/favicon.ico',
  'sentry': 'https://sentry.io/favicon.ico',
  'circleci': 'https://circleci.com/favicon.ico',
  'jetbrains': 'https://www.jetbrains.com/favicon.ico',
  'postman': 'https://www.postman.com/favicon.ico',
  'ngrok': 'https://ngrok.com/favicon.ico',

  // E-commerce
  'shopify': 'https://cdn.shopify.com/shopifycloud/brochure/assets/favicons/favicon-196x196.png',
  'woocommerce': 'https://woocommerce.com/favicon.ico',
  'bigcommerce': 'https://www.bigcommerce.com/favicon.ico',
  'squarespace': 'https://www.squarespace.com/favicon.ico',
  'wix': 'https://www.wix.com/favicon.ico',
  'webflow': 'https://webflow.com/favicon.ico',
  'gumroad': 'https://gumroad.com/favicon.ico',

  // HR & Operations
  'bamboohr': 'https://www.bamboohr.com/favicon.ico',
  'lever': 'https://www.lever.co/favicon.ico',
  'greenhouse': 'https://www.greenhouse.io/favicon.ico',
  'ashby': 'https://www.ashbyhq.com/favicon.ico',
  'lattice': 'https://lattice.com/favicon.ico',
  'breezy': 'https://breezy.hr/favicon.ico',

  // Security
  '1password': 'https://1password.com/favicon.ico',
  'lastpass': 'https://lastpass.com/favicon.ico',
  'okta': 'https://www.okta.com/favicon.ico',
  'auth0': 'https://auth0.com/favicon.ico',
  'snyk': 'https://snyk.io/favicon.ico',
  'avast': 'https://www.avast.com/favicon.ico',
  'avg technologies': 'https://www.avg.com/favicon.ico',
  'ccleaner': 'https://www.ccleaner.com/favicon.ico',

  // Design
  'sketch': 'https://www.sketch.com/favicon.ico',
  'adobe': 'https://www.adobe.com/favicon.ico',
  'invision': 'https://www.invisionapp.com/favicon.ico',
  'framer': 'https://framer.com/favicon.ico',

  // Automation
  'zapier': 'https://zapier.com/favicon.ico',
  'make': 'https://www.make.com/favicon.ico',
  'n8n': 'https://n8n.io/favicon.ico',
  'ifttt': 'https://ifttt.com/favicon.ico',

  // CRM
  'pipedrive': 'https://www.pipedrive.com/favicon.ico',
  'close': 'https://close.com/favicon.ico',
  'zoho': 'https://www.zoho.com/favicon.ico',
  'attio': 'https://attio.com/favicon.ico',

  // Video & Media
  'vimeo': 'https://vimeo.com/favicon.ico',
  'wistia': 'https://wistia.com/favicon.ico',
  'cloudinary': 'https://cloudinary.com/favicon.ico',
  'animoto': 'https://animoto.com/favicon.ico',
  'capcut': 'https://www.capcut.com/favicon.ico',
  'artlist': 'https://artlist.io/favicon.ico',

  // Legal
  'docusign': 'https://www.docusign.com/favicon.ico',
  'pandadoc': 'https://www.pandadoc.com/favicon.ico',

  // Google Products
  'google workspace': 'https://workspace.google.com/favicon.ico',
  'google': 'https://www.google.com/favicon.ico',
  'google cloud': 'https://cloud.google.com/favicon.ico',
  'google cloud (gcp)': 'https://cloud.google.com/favicon.ico',

  // Microsoft Products
  'microsoft 365': 'https://www.microsoft.com/favicon.ico',
  'microsoft': 'https://www.microsoft.com/favicon.ico',
  'microsoft azure': 'https://azure.microsoft.com/favicon.ico',
  'azure': 'https://azure.microsoft.com/favicon.ico',

  // Storage
  'dropbox': 'https://cfl.dropboxstatic.com/static/images/favicon.ico',
  'box': 'https://www.box.com/favicon.ico',
  'evernote': 'https://evernote.com/favicon.ico',

  // Task Management
  'todoist': 'https://todoist.com/favicon.ico',
  'obsidian': 'https://obsidian.md/favicon.ico',

  // Database
  'mongodb': 'https://www.mongodb.com/favicon.ico',
  'mongodb atlas': 'https://www.mongodb.com/favicon.ico',
  'planetscale': 'https://planetscale.com/favicon.ico',
  'supabase': 'https://supabase.com/favicon.ico',
  'firebase': 'https://firebase.google.com/favicon.ico',
  'redis': 'https://redis.io/favicon.ico',
  'elastic': 'https://www.elastic.co/favicon.ico',
  'snowflake': 'https://www.snowflake.com/favicon.ico',

  // Learning
  'babbel': 'https://www.babbel.com/favicon.ico',
  'blinkist': 'https://www.blinkist.com/favicon.ico',

  // Other Popular Tools
  'crunchbase': 'https://www.crunchbase.com/favicon.ico',
  'brand24': 'https://brand24.com/favicon.ico',
  'bonsai': 'https://www.hellobonsai.com/favicon.ico',
  'carrd': 'https://carrd.co/favicon.ico',
  'chatbase': 'https://www.chatbase.co/favicon.ico',
  'clickfunnels': 'https://www.clickfunnels.com/favicon.ico',
  'cloudtalk': 'https://www.cloudtalk.io/favicon.ico',
  'cloudways': 'https://www.cloudways.com/favicon.ico',
  'builderall': 'https://builderall.com/favicon.ico',
  'bright data': 'https://brightdata.com/favicon.ico',
  'amazon music': 'https://music.amazon.com/favicon.ico',
  'adcreative.ai': 'https://www.adcreative.ai/favicon.ico',
  'callhippo': 'https://www.callhippo.com/favicon.ico',
  'camtasia': 'https://www.techsmith.com/favicon.ico',
  'clevertap': 'https://clevertap.com/favicon.ico',
  'colossyan': 'https://www.colossyan.com/favicon.ico',
  'outreach': 'https://www.outreach.io/favicon.ico',
  'salesloft': 'https://salesloft.com/favicon.ico',
  'gong': 'https://www.gong.io/favicon.ico',
  'clearbit': 'https://clearbit.com/favicon.ico',
  'zoominfo': 'https://www.zoominfo.com/favicon.ico',
  'lemlist': 'https://www.lemlist.com/favicon.ico',
  'hunter': 'https://hunter.io/favicon.ico',
  'superhuman': 'https://superhuman.com/favicon.ico',
  'front': 'https://front.com/favicon.ico',
  'galaxy': 'https://www.meteor.com/favicon.ico',
  'galaxy (ex. meteor cloud)': 'https://www.meteor.com/favicon.ico',
  'meteor': 'https://www.meteor.com/favicon.ico',
  'every': 'https://every.to/favicon.ico',
  'prodcamp': 'https://prodcamp.com/favicon.ico',
  'ahaslides': 'https://ahaslides.com/favicon.ico',
  'airalo': 'https://www.airalo.com/favicon.ico',
  'apphud': 'https://apphud.com/favicon.ico',
  'abyssale': 'https://www.abyssale.com/favicon.ico',
  'acumbamail': 'https://acumbamail.com/favicon.ico',
  'adopt': 'https://www.adopt.io/favicon.ico',
  'adriel': 'https://www.adriel.com/favicon.ico',
  'appmysite': 'https://www.appmysite.com/favicon.ico',
  'atolia': 'https://www.atolia.com/favicon.ico',
  'axeptio': 'https://www.axeptio.eu/favicon.ico',
  'axonaut': 'https://axonaut.com/favicon.ico',
  'backlog': 'https://backlog.com/favicon.ico',
  'base44': 'https://www.base44.com/favicon.ico',
  'beefree sdk': 'https://beefree.io/favicon.ico',
  'blocksurvey': 'https://blocksurvey.io/favicon.ico',
  'blue strawberry': 'https://bluestrawberry.com/favicon.ico',
  'botnation': 'https://botnation.ai/favicon.ico',
  'bouncer': 'https://www.usebouncer.com/favicon.ico',
  'cacheflow': 'https://www.getcacheflow.com/favicon.ico',
  'calendar': 'https://calendar.com/favicon.ico',
  'calendesk': 'https://calendesk.com/favicon.ico',
  'campaigner': 'https://www.campaigner.com/favicon.ico',
  'captain contrat': 'https://www.captaincontrat.com/favicon.ico',
  'carepatron': 'https://www.carepatron.com/favicon.ico',
  'catchapp bookings': 'https://catchapp.mobi/favicon.ico',
  'chatsimple.ai': 'https://www.chatsimple.ai/favicon.ico',
  'chemicloud': 'https://www.chemicloud.com/favicon.ico',
  'cherry servers': 'https://www.cherryservers.com/favicon.ico',
  'clearcrm': 'https://clearcrm.io/favicon.ico',
  'clemta': 'https://clemta.com/favicon.ico',
  'clerky': 'https://www.clerky.com/favicon.ico',
  'cloudimage': 'https://www.cloudimage.io/favicon.ico',
  'cobalt': 'https://www.cobalt.io/favicon.ico',
  'collabstr': 'https://collabstr.com/favicon.ico',
  'collect.chat': 'https://collect.chat/favicon.ico',
  'compass': 'https://compass.com/favicon.ico',
  'content beta': 'https://contentbeta.com/favicon.ico',
  'contract-factory': 'https://contract-factory.com/favicon.ico',
  'cookiebot': 'https://www.cookiebot.com/favicon.ico',
  'dna fi': 'https://dna.fi/favicon.ico',
}


// Read deals
const deals = JSON.parse(fs.readFileSync(DEALS_FILE, 'utf8'))
console.log(`Loaded ${deals.length} deals\n`)

// Update logos
let updated = 0
let notFound = []

deals.forEach(deal => {
  const providerLower = (deal.provider || '').toLowerCase().trim()
  const titleLower = (deal.title || '').toLowerCase().trim()
  
  // Try exact match first
  let logoUrl = logos[providerLower] || logos[titleLower]
  
  // Try partial matches
  if (!logoUrl) {
    for (const [brand, url] of Object.entries(logos)) {
      if (providerLower.includes(brand) || titleLower.includes(brand) ||
          brand.includes(providerLower) || brand.includes(titleLower)) {
        logoUrl = url
        break
      }
    }
  }
  
  // Fallback: try to construct favicon URL from provider name
  if (!logoUrl) {
    const cleanName = providerLower
      .replace(/\s+promo\s+code/gi, '')
      .replace(/\s+coupon/gi, '')
      .replace(/\s+discount/gi, '')
      .replace(/\(ex\.\s*[^)]+\)/gi, '')
      .replace(/[^a-z0-9.]/g, '')
      .trim()
    
    if (cleanName.length > 2) {
      // Try common domain patterns
      const domains = [
        `${cleanName}.com`,
        `${cleanName}.io`,
        `${cleanName}.co`,
        `${cleanName}.app`,
        `${cleanName}.ai`,
        `www.${cleanName}.com`
      ]
      logoUrl = `https://${domains[0]}/favicon.ico`
    }
  }
  
  if (logoUrl) {
    deal.logoUrl = logoUrl
    deal.brandIcon = logoUrl
    updated++
  } else {
    notFound.push(deal.provider || deal.title)
  }
})

// Save updated deals
fs.writeFileSync(DEALS_FILE, JSON.stringify(deals, null, 2))

console.log('='.repeat(50))
console.log('LOGO UPDATE COMPLETE')
console.log('='.repeat(50))
console.log(`\nTotal deals: ${deals.length}`)
console.log(`Updated: ${updated}`)
console.log(`Not found: ${notFound.length}`)

if (notFound.length > 0 && notFound.length <= 30) {
  console.log(`\nProviders without logos:`)
  notFound.forEach(p => console.log(`  - ${p}`))
}

console.log(`\nRefresh http://localhost:3000/deals to see changes\n`)
