// Centralized provider URL mappings
// This ensures all deals redirect to actual provider websites

export interface ProviderUrlMapping {
  [key: string]: string
}

export const providerUrlMappings: ProviderUrlMapping = {
  // Cloud & Infrastructure
  'cloudflare': 'https://www.cloudflare.com/forstartups/',
  'aws': 'https://aws.amazon.com/activate/',
  'amazonwebservices': 'https://aws.amazon.com/activate/',
  'microsoftazure': 'https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0036p/',
  'azure': 'https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0036p/',
  'googlecloud': 'https://cloud.google.com/startup',
  'gcp': 'https://cloud.google.com/startup',
  'digitalocean': 'https://www.digitalocean.com/hatch',
  'heroku': 'https://www.heroku.com/',
  'vercel': 'https://vercel.com/',
  'netlify': 'https://www.netlify.com/',
  'linode': 'https://www.linode.com/',
  'vultr': 'https://www.vultr.com/',
  
  // Productivity & Collaboration
  'googleworkspace': 'https://workspace.google.com/',
  'notion': 'https://www.notion.so/startups',
  'slack': 'https://slack.com/',
  'asana': 'https://asana.com/',
  'trello': 'https://trello.com/',
  'airtable': 'https://www.airtable.com/',
  'clickup': 'https://clickup.com/',
  'monday': 'https://monday.com/',
  'mondaycom': 'https://monday.com/',
  'basecamp': 'https://basecamp.com/',
  'evernote': 'https://evernote.com/',
  'dropbox': 'https://www.dropbox.com/',
  'box': 'https://www.box.com/',
  'googledrive': 'https://www.google.com/drive/',
  
  // CRM & Sales
  'hubspot': 'https://www.hubspot.com/startups',
  'salesforce': 'https://www.salesforce.com/',
  'pipedrive': 'https://www.pipedrive.com/',
  'zoho': 'https://www.zoho.com/',
  'freshworks': 'https://www.freshworks.com/',
  'freshsales': 'https://www.freshworks.com/crm/sales/',
  'zendesk': 'https://www.zendesk.com/',
  'intercom': 'https://www.intercom.com/',
  'drift': 'https://www.drift.com/',
  'crisp': 'https://crisp.chat/',
  
  // Marketing & Email
  'mailchimp': 'https://mailchimp.com/',
  'sendgrid': 'https://sendgrid.com/',
  'mailgun': 'https://www.mailgun.com/',
  'convertkit': 'https://convertkit.com/',
  'activecampaign': 'https://www.activecampaign.com/',
  'constantcontact': 'https://www.constantcontact.com/',
  'sendinblue': 'https://www.sendinblue.com/',
  'brevo': 'https://www.brevo.com/',
  'klaviyo': 'https://www.klaviyo.com/',
  
  // Communication
  'twilio': 'https://www.twilio.com/',
  'vonage': 'https://www.vonage.com/',
  'zoom': 'https://zoom.us/',
  'whereby': 'https://whereby.com/',
  'calendly': 'https://calendly.com/',
  
  // Development Tools
  'github': 'https://github.com/',
  'gitlab': 'https://about.gitlab.com/',
  'bitbucket': 'https://bitbucket.org/',
  'jira': 'https://www.atlassian.com/software/jira',
  'confluence': 'https://www.atlassian.com/software/confluence',
  'linear': 'https://linear.app/',
  'sentry': 'https://sentry.io/',
  'datadog': 'https://www.datadoghq.com/',
  'newrelic': 'https://newrelic.com/',
  'postman': 'https://www.postman.com/',
  'insomnia': 'https://insomnia.rest/',
  
  // Design Tools
  'figma': 'https://www.figma.com/',
  'canva': 'https://www.canva.com/',
  'sketch': 'https://www.sketch.com/',
  'invision': 'https://www.invisionapp.com/',
  'adobe': 'https://www.adobe.com/',
  'adobecreativecloud': 'https://www.adobe.com/creativecloud.html',
  
  // Database & Backend
  'mongodb': 'https://www.mongodb.com/startup-accelerator',
  'postgresql': 'https://www.postgresql.org/',
  'mysql': 'https://www.mysql.com/',
  'redis': 'https://redis.io/',
  'supabase': 'https://supabase.com/',
  'firebase': 'https://firebase.google.com/',
  'planetscale': 'https://planetscale.com/',
  'cockroachdb': 'https://www.cockroachlabs.com/',
  'galaxyexmeteorcloud': 'https://www.meteor.com/cloud',
  'meteor': 'https://www.meteor.com/',
  
  // E-commerce
  'shopify': 'https://www.shopify.com/',
  'woocommerce': 'https://woocommerce.com/',
  'bigcommerce': 'https://www.bigcommerce.com/',
  'squarespace': 'https://www.squarespace.com/',
  'wix': 'https://www.wix.com/',
  'stripe': 'https://stripe.com/',
  'paypal': 'https://www.paypal.com/',
  'square': 'https://squareup.com/',
  
  // Website Builders
  'webflow': 'https://webflow.com/',
  'wordpress': 'https://wordpress.com/',
  'ghost': 'https://ghost.org/',
  'medium': 'https://medium.com/',
  'substack': 'https://substack.com/',
  
  // Automation
  'zapier': 'https://zapier.com/',
  'make': 'https://www.make.com/',
  'integromat': 'https://www.make.com/',
  'ifttt': 'https://ifttt.com/',
  'n8n': 'https://n8n.io/',
  
  // AI Tools
  'openai': 'https://openai.com/',
  'anthropic': 'https://www.anthropic.com/',
  'perplexityai': 'https://www.perplexity.ai/',
  'perplexity': 'https://www.perplexity.ai/',
  'jasper': 'https://www.jasper.ai/',
  'copy.ai': 'https://www.copy.ai/',
  'copyai': 'https://www.copy.ai/',
  'writesonic': 'https://writesonic.com/',
  'grammarly': 'https://www.grammarly.com/',
  
  // Analytics
  'googleanalytics': 'https://analytics.google.com/',
  'mixpanel': 'https://mixpanel.com/',
  'amplitude': 'https://amplitude.com/',
  'segment': 'https://segment.com/',
  'heap': 'https://heap.io/',
  'hotjar': 'https://www.hotjar.com/',
  'fullstory': 'https://www.fullstory.com/',
  
  // Accounting & Finance
  'quickbooks': 'https://quickbooks.intuit.com/',
  'xero': 'https://www.xero.com/',
  'freshbooks': 'https://www.freshbooks.com/',
  'wave': 'https://www.waveapps.com/',
  'expensify': 'https://www.expensify.com/',
  'brex': 'https://www.brex.com/',
  'ramp': 'https://ramp.com/',
  'mercury': 'https://mercury.com/',
  
  // HR & Recruiting
  'gusto': 'https://gusto.com/',
  'bamboohr': 'https://www.bamboohr.com/',
  'workday': 'https://www.workday.com/',
  'greenhouse': 'https://www.greenhouse.io/',
  'lever': 'https://www.lever.co/',
  'ashbyhq': 'https://www.ashbyhq.com/',
  
  // Security
  'okta': 'https://www.okta.com/',
  'auth0': 'https://auth0.com/startups',
  'onelogin': 'https://www.onelogin.com/',
  'lastpass': 'https://www.lastpass.com/',
  '1password': 'https://1password.com/',
  'bitwarden': 'https://bitwarden.com/',
  
  // Social Media
  'buffer': 'https://buffer.com/',
  'hootsuite': 'https://www.hootsuite.com/',
  'sproutsocial': 'https://sproutsocial.com/',
  'later': 'https://later.com/',
  
  // Customer Support
  'freshdesk': 'https://freshdesk.com/',
  'helpscout': 'https://www.helpscout.com/',
  'livechat': 'https://www.livechat.com/',
  'tidio': 'https://www.tidio.com/',
  
  // Legal
  'docusign': 'https://www.docusign.com/',
  'hellosign': 'https://www.hellosign.com/',
  'pandadoc': 'https://www.pandadoc.com/',
  'ironclad': 'https://ironcladapp.com/',
  
  // Other Popular Tools
  'typeform': 'https://www.typeform.com/',
  'surveymonkey': 'https://www.surveymonkey.com/',
  'loom': 'https://www.loom.com/',
  'miro': 'https://miro.com/',
  'lucidchart': 'https://www.lucidchart.com/',
  'coda': 'https://coda.io/',
}

/**
 * Get the actual provider URL from provider name
 * Filters out redirect URLs and google search URLs
 */
export function getProviderUrl(providerName: string, applicationUrl?: string, providerWebsite?: string): string {
  // First check if we have a direct provider website that's not a redirect
  if (providerWebsite && 
      !isRedirectUrl(providerWebsite)) {
    return providerWebsite
  }
  
  // Normalize provider name for lookup
  const normalizedProvider = providerName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[()]/g, '')
    .replace(/ex\./g, '')
    .replace(/\./g, '')
    .replace(/-/g, '')
  
  // Check if we have a mapping
  if (providerUrlMappings[normalizedProvider]) {
    return providerUrlMappings[normalizedProvider]
  }
  
  // If applicationUrl is not a redirect service, use it
  if (applicationUrl && 
      !isRedirectUrl(applicationUrl)) {
    return applicationUrl
  }
  
  // Generate a likely URL as fallback
  const cleanProvider = providerName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[()]/g, '')
    .replace(/ex\./g, '')
    .replace(/\./g, '')
    .replace(/-/g, '')
  
  return `https://www.${cleanProvider}.com/`
}

/**
 * Check if a URL is a redirect service
 */
export function isRedirectUrl(url: string): boolean {
  const redirectDomains = [
    'google.com/search'
  ]
  return redirectDomains.some(domain => url.includes(domain))
}
