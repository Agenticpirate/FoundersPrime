#!/usr/bin/env node

/**
 * Update Brand Logos with Official Icons
 * 
 * Uses Clearbit Logo API and known brand domains to get actual brand logos
 * Usage: node scripts/update-brand-logos.js
 */

const fs = require('fs')
const path = require('path')

const DEALS_FILE = path.join(process.cwd(), 'public/data/all-deals.json')

console.log('\n' + '='.repeat(60))
console.log('  UPDATE BRAND LOGOS WITH OFFICIAL ICONS')
console.log('='.repeat(60))

// Brand to domain mapping for Clearbit Logo API
const brandDomains = {
  // Cloud & Infrastructure
  'aws': 'aws.amazon.com',
  'amazon web services': 'aws.amazon.com',
  'google cloud': 'cloud.google.com',
  'google cloud (gcp)': 'cloud.google.com',
  'gcp': 'cloud.google.com',
  'microsoft azure': 'azure.microsoft.com',
  'azure': 'azure.microsoft.com',
  'digitalocean': 'digitalocean.com',
  'cloudflare': 'cloudflare.com',
  'heroku': 'heroku.com',
  'vercel': 'vercel.com',
  'netlify': 'netlify.com',
  'railway': 'railway.app',
  'render': 'render.com',
  'fly.io': 'fly.io',
  'linode': 'linode.com',
  'vultr': 'vultr.com',
  'confluent': 'confluent.io',
  'mongodb': 'mongodb.com',
  'mongodb atlas': 'mongodb.com',
  'planetscale': 'planetscale.com',
  'supabase': 'supabase.com',
  'firebase': 'firebase.google.com',
  'redis': 'redis.com',
  'elastic': 'elastic.co',
  'elasticsearch': 'elastic.co',
  'snowflake': 'snowflake.com',
  'databricks': 'databricks.com',
  
  // AI & ML
  'openai': 'openai.com',
  'anthropic': 'anthropic.com',
  'claude': 'anthropic.com',
  'gemini': 'deepmind.google',
  'gemini api': 'deepmind.google',
  'google gemini': 'deepmind.google',
  'hugging face': 'huggingface.co',
  'cohere': 'cohere.com',
  'replicate': 'replicate.com',
  'stability ai': 'stability.ai',
  'midjourney': 'midjourney.com',
  'jasper': 'jasper.ai',
  'copy.ai': 'copy.ai',
  'writesonic': 'writesonic.com',
  'grammarly': 'grammarly.com',
  
  // Productivity & Project Management
  'notion': 'notion.so',
  'asana': 'asana.com',
  'monday.com': 'monday.com',
  'monday': 'monday.com',
  'clickup': 'clickup.com',
  'trello': 'trello.com',
  'jira': 'atlassian.com',
  'atlassian': 'atlassian.com',
  'confluence': 'atlassian.com',
  'linear': 'linear.app',
  'basecamp': 'basecamp.com',
  'airtable': 'airtable.com',
  'coda': 'coda.io',
  'miro': 'miro.com',
  'figma': 'figma.com',
  'canva': 'canva.com',
  'loom': 'loom.com',
  
  // Communication
  'slack': 'slack.com',
  'discord': 'discord.com',
  'zoom': 'zoom.us',
  'zoom meetings': 'zoom.us',
  'microsoft teams': 'microsoft.com',
  'teams': 'microsoft.com',
  'google meet': 'meet.google.com',
  'calendly': 'calendly.com',
  'cal.com': 'cal.com',
  'intercom': 'intercom.com',
  'zendesk': 'zendesk.com',
  'freshdesk': 'freshdesk.com',
  'crisp': 'crisp.chat',
  'drift': 'drift.com',
  'twilio': 'twilio.com',
  'sendgrid': 'sendgrid.com',
  
  // Marketing & Sales
  'hubspot': 'hubspot.com',
  'salesforce': 'salesforce.com',
  'mailchimp': 'mailchimp.com',
  'brevo': 'brevo.com',
  'sendinblue': 'brevo.com',
  'brevo (ex. sendinblue)': 'brevo.com',
  'klaviyo': 'klaviyo.com',
  'activecampaign': 'activecampaign.com',
  'convertkit': 'convertkit.com',
  'drip': 'drip.com',
  'mailerlite': 'mailerlite.com',
  'constant contact': 'constantcontact.com',
  'semrush': 'semrush.com',
  'ahrefs': 'ahrefs.com',
  'moz': 'moz.com',
  'buffer': 'buffer.com',
  'hootsuite': 'hootsuite.com',
  'sprout social': 'sproutsocial.com',
  'later': 'later.com',
  'typeform': 'typeform.com',
  'surveymonkey': 'surveymonkey.com',
  'hotjar': 'hotjar.com',
  'mixpanel': 'mixpanel.com',
  'amplitude': 'amplitude.com',
  'segment': 'segment.com',
  'google analytics': 'analytics.google.com',
  'plausible': 'plausible.io',
  'posthog': 'posthog.com',
  
  // Finance & Payments
  'stripe': 'stripe.com',
  'paypal': 'paypal.com',
  'square': 'squareup.com',
  'braintree': 'braintreepayments.com',
  'adyen': 'adyen.com',
  'wise': 'wise.com',
  'transferwise': 'wise.com',
  'mercury': 'mercury.com',
  'brex': 'brex.com',
  'ramp': 'ramp.com',
  'quickbooks': 'quickbooks.intuit.com',
  'xero': 'xero.com',
  'freshbooks': 'freshbooks.com',
  'wave': 'waveapps.com',
  'gusto': 'gusto.com',
  'rippling': 'rippling.com',
  'deel': 'deel.com',
  'remote': 'remote.com',
  'paddle': 'paddle.com',
  'chargebee': 'chargebee.com',
  'recurly': 'recurly.com',
  
  // Development Tools
  'github': 'github.com',
  'gitlab': 'gitlab.com',
  'bitbucket': 'bitbucket.org',
  'docker': 'docker.com',
  'kubernetes': 'kubernetes.io',
  'terraform': 'terraform.io',
  'hashicorp': 'hashicorp.com',
  'datadog': 'datadoghq.com',
  'new relic': 'newrelic.com',
  'sentry': 'sentry.io',
  'logdna': 'logdna.com',
  'papertrail': 'papertrail.com',
  'circleci': 'circleci.com',
  'travis ci': 'travis-ci.com',
  'jenkins': 'jenkins.io',
  'jetbrains': 'jetbrains.com',
  'vs code': 'code.visualstudio.com',
  'visual studio': 'visualstudio.microsoft.com',
  'postman': 'postman.com',
  'insomnia': 'insomnia.rest',
  'ngrok': 'ngrok.com',
  
  // E-commerce
  'shopify': 'shopify.com',
  'woocommerce': 'woocommerce.com',
  'bigcommerce': 'bigcommerce.com',
  'magento': 'magento.com',
  'squarespace': 'squarespace.com',
  'wix': 'wix.com',
  'webflow': 'webflow.com',
  'gumroad': 'gumroad.com',
  'lemonsqueezy': 'lemonsqueezy.com',
  
  // HR & Operations
  'bamboohr': 'bamboohr.com',
  'workday': 'workday.com',
  'lever': 'lever.co',
  'greenhouse': 'greenhouse.io',
  'ashby': 'ashbyhq.com',
  'lattice': 'lattice.com',
  '15five': '15five.com',
  'culture amp': 'cultureamp.com',
  
  // Security
  '1password': '1password.com',
  'lastpass': 'lastpass.com',
  'okta': 'okta.com',
  'auth0': 'auth0.com',
  'cloudflare': 'cloudflare.com',
  'crowdstrike': 'crowdstrike.com',
  'snyk': 'snyk.io',
  'sonarqube': 'sonarqube.org',
  
  // Design
  'figma': 'figma.com',
  'sketch': 'sketch.com',
  'adobe': 'adobe.com',
  'invision': 'invisionapp.com',
  'zeplin': 'zeplin.io',
  'framer': 'framer.com',
  
  // Automation
  'zapier': 'zapier.com',
  'make': 'make.com',
  'integromat': 'make.com',
  'n8n': 'n8n.io',
  'ifttt': 'ifttt.com',
  'workato': 'workato.com',
  'tray.io': 'tray.io',
  
  // CRM
  'pipedrive': 'pipedrive.com',
  'close': 'close.com',
  'copper': 'copper.com',
  'zoho': 'zoho.com',
  'freshsales': 'freshworks.com',
  
  // Customer Support
  'freshdesk': 'freshdesk.com',
  'help scout': 'helpscout.com',
  'front': 'front.com',
  'gorgias': 'gorgias.com',
  
  // Video & Media
  'vimeo': 'vimeo.com',
  'wistia': 'wistia.com',
  'vidyard': 'vidyard.com',
  'cloudinary': 'cloudinary.com',
  'imgix': 'imgix.com',
  
  // Legal & Compliance
  'docusign': 'docusign.com',
  'pandadoc': 'pandadoc.com',
  'hellosign': 'hellosign.com',
  
  // Google Products
  'google workspace': 'workspace.google.com',
  'google ads': 'ads.google.com',
  'google': 'google.com',
  
  // Microsoft Products
  'microsoft 365': 'microsoft.com',
  'office 365': 'microsoft.com',
  'microsoft': 'microsoft.com',
  
  // Other popular tools
  'dropbox': 'dropbox.com',
  'box': 'box.com',
  'evernote': 'evernote.com',
  'todoist': 'todoist.com',
  'roam research': 'roamresearch.com',
  'obsidian': 'obsidian.md',
  'craft': 'craft.do',
  'superhuman': 'superhuman.com',
  'front': 'front.com',
  'apollo': 'apollo.io',
  'outreach': 'outreach.io',
  'salesloft': 'salesloft.com',
  'gong': 'gong.io',
  'chorus': 'chorus.ai',
  'clearbit': 'clearbit.com',
  'zoominfo': 'zoominfo.com',
  'lusha': 'lusha.com',
  'phantom buster': 'phantombuster.com',
  'lemlist': 'lemlist.com',
  'instantly': 'instantly.ai',
  'reply.io': 'reply.io',
  'woodpecker': 'woodpecker.co',
  'hunter': 'hunter.io',
  'snov.io': 'snov.io',
  
  // Galaxy/Meteor
  'galaxy': 'galaxy.io',
  'galaxy (ex. meteor cloud)': 'meteor.com',
  'meteor': 'meteor.com',
}

// Read deals
const deals = JSON.parse(fs.readFileSync(DEALS_FILE, 'utf8'))
console.log(`\n📥 Loaded ${deals.length} deals\n`)

// Update logos
let updated = 0
let notFound = []

deals.forEach(deal => {
  const providerLower = (deal.provider || '').toLowerCase().trim()
  const titleLower = (deal.title || '').toLowerCase().trim()
  
  // Try to find domain from provider name
  let domain = brandDomains[providerLower]
  
  // If not found, try title
  if (!domain) {
    domain = brandDomains[titleLower]
  }
  
  // Try partial matches
  if (!domain) {
    for (const [brand, brandDomain] of Object.entries(brandDomains)) {
      if (providerLower.includes(brand) || titleLower.includes(brand)) {
        domain = brandDomain
        break
      }
    }
  }
  
  // Try to extract domain from provider name
  if (!domain) {
    // Clean provider name and try as domain
    const cleanName = providerLower
      .replace(/\s+promo\s+code/gi, '')
      .replace(/\s+coupon/gi, '')
      .replace(/\s+discount/gi, '')
      .replace(/\(ex\.\s*[^)]+\)/gi, '')
      .replace(/[^a-z0-9]/g, '')
      .trim()
    
    if (cleanName.length > 2) {
      // Try common TLDs
      const possibleDomains = [
        `${cleanName}.com`,
        `${cleanName}.io`,
        `${cleanName}.co`,
        `${cleanName}.app`,
        `${cleanName}.ai`
      ]
      domain = possibleDomains[0] // Default to .com
    }
  }
  
  if (domain) {
    // Use Clearbit Logo API
    deal.logoUrl = `https://logo.clearbit.com/${domain}`
    deal.brandIcon = `https://logo.clearbit.com/${domain}`
    updated++
  } else {
    notFound.push(deal.provider || deal.title)
  }
})

// Save updated deals
fs.writeFileSync(DEALS_FILE, JSON.stringify(deals, null, 2))

console.log('='.repeat(60))
console.log('✅ LOGO UPDATE COMPLETE')
console.log('='.repeat(60))
console.log(`\n📊 Results:`)
console.log(`   Total deals: ${deals.length}`)
console.log(`   Updated with brand logos: ${updated}`)
console.log(`   Could not find domain: ${notFound.length}`)

if (notFound.length > 0 && notFound.length <= 20) {
  console.log(`\n⚠️ Providers without mapped domains:`)
  notFound.slice(0, 20).forEach(p => console.log(`   - ${p}`))
}

console.log(`\n🔍 Logo URLs now use Clearbit: https://logo.clearbit.com/[domain]`)
console.log(`\n🌐 Refresh http://localhost:3000/deals to see the changes\n`)
