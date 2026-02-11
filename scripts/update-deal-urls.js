/**
 * Update Deal URLs with actual startup program links
 */

const fs = require('fs');
const path = require('path');

// Known startup program URLs
const STARTUP_PROGRAM_URLS = {
  'cloudflare': 'https://www.cloudflare.com/forstartups/',
  'aws': 'https://aws.amazon.com/startups/',
  'google cloud': 'https://cloud.google.com/startup',
  'azure': 'https://azure.microsoft.com/en-us/solutions/startups/',
  'mongodb': 'https://www.mongodb.com/startups',
  'stripe': 'https://stripe.com/startups',
  'stripe atlas': 'https://stripe.com/atlas',
  'hubspot': 'https://www.hubspot.com/startups',
  'notion': 'https://www.notion.so/startups',
  'slack': 'https://slack.com/solutions/startups',
  'intercom': 'https://www.intercom.com/early-stage',
  'segment': 'https://segment.com/startup-program/',
  'amplitude': 'https://amplitude.com/startups',
  'mixpanel': 'https://mixpanel.com/startups/',
  'brex': 'https://www.brex.com/startups',
  'mercury': 'https://mercury.com/',
  'carta': 'https://carta.com/startups/',
  'gusto': 'https://gusto.com/',
  'zendesk': 'https://www.zendesk.com/startups/',
  'freshdesk': 'https://www.freshworks.com/startups/',
  'freshworks': 'https://www.freshworks.com/startups/',
  'mailchimp': 'https://mailchimp.com/',
  'sendgrid': 'https://sendgrid.com/solutions/startups/',
  'twilio': 'https://www.twilio.com/startups',
  'airtable': 'https://www.airtable.com/lp/startups',
  'asana': 'https://asana.com/startups',
  'clickup': 'https://clickup.com/teams/startups',
  'linear': 'https://linear.app/startups',
  'figma': 'https://www.figma.com/startups/',
  'canva': 'https://www.canva.com/canva-for-startups/',
  'miro': 'https://miro.com/startups/',
  'vercel': 'https://vercel.com/',
  'netlify': 'https://www.netlify.com/',
  'heroku': 'https://www.heroku.com/startups',
  'digitalocean': 'https://www.digitalocean.com/hatch',
  'github': 'https://github.com/',
  'gitlab': 'https://about.gitlab.com/solutions/startups/',
  'jetbrains': 'https://www.jetbrains.com/store/startups/',
  'postman': 'https://www.postman.com/company/startup-program/',
  'algolia': 'https://www.algolia.com/industries/startups/',
  'auth0': 'https://auth0.com/startups',
  'okta': 'https://www.okta.com/startups/',
  'datadog': 'https://www.datadoghq.com/partner/startup/',
  'sentry': 'https://sentry.io/for/startups/',
  'launchdarkly': 'https://launchdarkly.com/startups/',
  'retool': 'https://retool.com/startups',
  'webflow': 'https://webflow.com/',
  'shopify': 'https://www.shopify.com/',
  'wix': 'https://www.wix.com/',
  'squarespace': 'https://www.squarespace.com/',
  'typeform': 'https://www.typeform.com/startups/',
  'calendly': 'https://calendly.com/',
  'cal.com': 'https://cal.com/',
  'loom': 'https://www.loom.com/startups',
  'descript': 'https://www.descript.com/',
  'synthesia': 'https://www.synthesia.io/',
  'jasper': 'https://www.jasper.ai/',
  'copy.ai': 'https://www.copy.ai/',
  'grammarly': 'https://www.grammarly.com/business',
  'zapier': 'https://zapier.com/early-stage-startups',
  'make': 'https://www.make.com/',
  'n8n': 'https://n8n.io/',
  'pipedrive': 'https://www.pipedrive.com/',
  'salesforce': 'https://www.salesforce.com/solutions/small-business-solutions/startup/',
  'close': 'https://www.close.com/',
  'apollo.io': 'https://www.apollo.io/',
  'lemlist': 'https://www.lemlist.com/',
  'instantly': 'https://instantly.ai/',
  'klaviyo': 'https://www.klaviyo.com/',
  'brevo': 'https://www.brevo.com/',
  'activecampaign': 'https://www.activecampaign.com/',
  'hotjar': 'https://www.hotjar.com/startups/',
  'posthog': 'https://posthog.com/startups',
  'heap': 'https://www.heap.io/',
  'semrush': 'https://www.semrush.com/',
  'ahrefs': 'https://ahrefs.com/',
  'hootsuite': 'https://www.hootsuite.com/',
  'buffer': 'https://buffer.com/',
  'sprout social': 'https://sproutsocial.com/',
  'monday': 'https://monday.com/',
  'trello': 'https://trello.com/',
  'jira': 'https://www.atlassian.com/software/jira',
  'confluence': 'https://www.atlassian.com/software/confluence',
  'todoist': 'https://todoist.com/',
  'coda': 'https://coda.io/startups',
  'quickbooks': 'https://quickbooks.intuit.com/',
  'xero': 'https://www.xero.com/',
  'freshbooks': 'https://www.freshbooks.com/',
  'expensify': 'https://www.expensify.com/',
  'bill': 'https://www.bill.com/',
  'ramp': 'https://ramp.com/',
  'docusign': 'https://www.docusign.com/',
  'pandadoc': 'https://www.pandadoc.com/',
  'legalzoom': 'https://www.legalzoom.com/',
  'clerky': 'https://www.clerky.com/',
  'firstbase': 'https://www.firstbase.io/',
  'doola': 'https://www.doola.com/',
  'bamboohr': 'https://www.bamboohr.com/',
  'rippling': 'https://www.rippling.com/',
  'deel': 'https://www.deel.com/',
  'remote': 'https://remote.com/',
  'oyster': 'https://www.oysterhr.com/',
  'zoom': 'https://zoom.us/',
  'google meet': 'https://meet.google.com/',
  'aircall': 'https://aircall.io/',
  'nordvpn': 'https://nordvpn.com/',
  '1password': 'https://1password.com/startups/',
  'keeper': 'https://www.keepersecurity.com/',
  'drata': 'https://drata.com/',
  'vanta': 'https://www.vanta.com/',
  'sprinto': 'https://sprinto.com/',
  'teachable': 'https://teachable.com/',
  'thinkific': 'https://www.thinkific.com/',
  'kajabi': 'https://kajabi.com/',
  'gumroad': 'https://gumroad.com/',
  'podia': 'https://www.podia.com/',
  'convertkit': 'https://convertkit.com/',
  'substack': 'https://substack.com/',
  'beehiiv': 'https://www.beehiiv.com/',
  'ghost': 'https://ghost.org/',
  'webflow': 'https://webflow.com/',
  'framer': 'https://www.framer.com/',
  'bubble': 'https://bubble.io/',
  'glide': 'https://www.glideapps.com/',
  'softr': 'https://www.softr.io/',
  'supabase': 'https://supabase.com/pricing',
  'planetscale': 'https://planetscale.com/',
  'neon': 'https://neon.tech/',
  'railway': 'https://railway.app/',
  'render': 'https://render.com/',
  'fly.io': 'https://fly.io/',
};

function getStartupProgramUrl(companyName) {
  const nameLower = companyName.toLowerCase();
  
  // Check exact matches first
  for (const [key, url] of Object.entries(STARTUP_PROGRAM_URLS)) {
    if (nameLower === key || nameLower.includes(key)) {
      return url;
    }
  }
  
  // Generate a reasonable URL based on company name
  // Clean the name and create a domain guess
  const cleanName = companyName
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '') // Remove parenthetical text
    .replace(/[^a-z0-9]/g, '')     // Remove special chars
    .trim();
  
  if (cleanName) {
    return `https://www.${cleanName}.com/`;
  }
  
  // Fallback to Google search
  return `https://www.google.com/search?q=${encodeURIComponent(companyName + ' startup program')}`;
}

function updateDeals() {
  const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
  const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
  
  console.log('Updating URLs for ' + deals.length + ' deals...');
  
  let updated = 0;
  let googleFallback = 0;
  
  deals.forEach(deal => {
    const newUrl = getStartupProgramUrl(deal.title);
    
    if (newUrl !== deal.applicationUrl) {
      deal.applicationUrl = newUrl;
      updated++;
    }
    
    if (newUrl.includes('google.com/search')) {
      googleFallback++;
    }
  });
  
  fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
  
  console.log('Updated ' + updated + ' URLs');
  console.log('Google fallback URLs: ' + googleFallback);
  console.log('Direct URLs: ' + (deals.length - googleFallback));
}

updateDeals();
