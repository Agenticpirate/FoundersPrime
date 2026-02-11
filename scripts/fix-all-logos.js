const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Comprehensive brand logo mapping - using official CDN/brand assets
const brandLogos = {
  // Major Tech Companies
  'notion': 'https://www.notion.so/images/favicon.ico',
  'stripe': 'https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg',
  'google': 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
  'microsoft': 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
  'aws': 'https://a0.awsstatic.com/libra-css/images/logos/aws_smile-header-desktop-en-white_59x35.png',
  'amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  
  // Cloud & Infrastructure
  'digitalocean': 'https://www.digitalocean.com/_next/static/media/logo.87a8f3b8.svg',
  'cloudflare': 'https://www.cloudflare.com/favicon.ico',
  'heroku': 'https://www.herokucdn.com/favicons/favicon.ico',
  'vercel': 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
  'netlify': 'https://www.netlify.com/v3/static/favicon/favicon-32x32.png',
  'ovhcloud': 'https://www.ovhcloud.com/sites/default/files/2022-02/ovh-favicon.png',
  'scalingo': 'https://scalingo.com/favicon.ico',
  'linode': 'https://www.linode.com/favicon.ico',
  'vultr': 'https://www.vultr.com/favicon.ico',
  'render': 'https://render.com/favicon.ico',
  'railway': 'https://railway.app/favicon.ico',
  
  // Productivity & Collaboration
  'slack': 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
  'asana': 'https://luna1.co/eb0e4e.png',
  'trello': 'https://trello.com/favicon.ico',
  'airtable': 'https://airtable.com/images/favicon/baymax/favicon-32x32.png',
  'clickup': 'https://clickup.com/landing/images/clickup-symbol_color.svg',
  'monday': 'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png',
  'linear': 'https://linear.app/favicon.ico',
  'miro': 'https://miro.com/favicon.ico',
  'loom': 'https://cdn.loom.com/assets/favicons-loom/favicon.ico',
  'coda': 'https://coda.io/favicon.ico',
  'basecamp': 'https://basecamp.com/favicon.ico',
  'evernote': 'https://evernote.com/favicon.ico',
  'dropbox': 'https://www.dropbox.com/static/images/favicon.ico',
  
  // CRM & Sales
  'hubspot': 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
  'salesforce': 'https://www.salesforce.com/etc/designs/sfdc-www/en_us/favicon.ico',
  'pipedrive': 'https://www.pipedrive.com/favicon.ico',
  'zoho': 'https://www.zoho.com/favicon.ico',
  'zendesk': 'https://d1eipm3vz40ber.cloudfront.net/images/p-favicon.ico',
  'intercom': 'https://www.intercom.com/favicon.ico',
  'freshworks': 'https://www.freshworks.com/favicon.ico',
  'apollo': 'https://www.apollo.io/favicon.ico',
  'drift': 'https://www.drift.com/favicon.ico',
  'crisp': 'https://crisp.chat/favicon.ico',
  'close': 'https://close.com/favicon.ico',
  'copper': 'https://www.copper.com/favicon.ico',
  'insightly': 'https://www.insightly.com/favicon.ico',
  
  // Marketing & Email
  'mailchimp': 'https://mailchimp.com/release/plums/cxp/images/apple-touch-icon-192.png',
  'sendgrid': 'https://sendgrid.com/favicon.ico',
  'brevo': 'https://www.brevo.com/favicon.ico',
  'activecampaign': 'https://www.activecampaign.com/favicon.ico',
  'klaviyo': 'https://www.klaviyo.com/favicon.ico',
  'customer.io': 'https://customer.io/favicon.ico',
  'customerio': 'https://customer.io/favicon.ico',
  'mailgun': 'https://www.mailgun.com/favicon.ico',
  'convertkit': 'https://convertkit.com/favicon.ico',
  'drip': 'https://www.drip.com/favicon.ico',
  'mailerlite': 'https://www.mailerlite.com/favicon.ico',
  'sendinblue': 'https://www.brevo.com/favicon.ico',
  'constant contact': 'https://www.constantcontact.com/favicon.ico',
  'getresponse': 'https://www.getresponse.com/favicon.ico',
  'aweber': 'https://www.aweber.com/favicon.ico',
  
  // Development Tools
  'github': 'https://github.githubassets.com/favicons/favicon.svg',
  'gitlab': 'https://about.gitlab.com/nuxt-images/ico/favicon.ico',
  'bitbucket': 'https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon.png',
  'sentry': 'https://sentry.io/_static/getsentry/images/favicon.ico',
  'datadog': 'https://imgix.datadoghq.com/img/favicons/favicon-32x32.png',
  'postman': 'https://www.postman.com/favicon.ico',
  'retool': 'https://retool.com/favicon.ico',
  'posthog': 'https://posthog.com/favicon.ico',
  'newrelic': 'https://newrelic.com/favicon.ico',
  'logdna': 'https://www.mezmo.com/favicon.ico',
  'papertrail': 'https://papertrailapp.com/favicon.ico',
  'rollbar': 'https://rollbar.com/favicon.ico',
  'bugsnag': 'https://www.bugsnag.com/favicon.ico',
  'raygun': 'https://raygun.com/favicon.ico',
  'logrocket': 'https://logrocket.com/favicon.ico',
  'fullstory': 'https://www.fullstory.com/favicon.ico',
  'heap': 'https://heap.io/favicon.ico',
  
  // Design Tools
  'figma': 'https://static.figma.com/app/icon/1/favicon.png',
  'canva': 'https://static.canva.com/static/images/favicon-1.ico',
  'framer': 'https://framerusercontent.com/images/3ydDiVhenEiPpGdWdkKefAqAQ.png',
  'webflow': 'https://assets-global.website-files.com/5d3e265ac89f6a3e64292efc/5d5595354de4fbdd8c554dba_default_favicon.png',
  'sketch': 'https://www.sketch.com/favicon.ico',
  'invision': 'https://www.invisionapp.com/favicon.ico',
  'adobe': 'https://www.adobe.com/favicon.ico',
  'zeplin': 'https://zeplin.io/favicon.ico',
  'abstract': 'https://www.abstract.com/favicon.ico',
  
  // Database & Backend
  'mongodb': 'https://www.mongodb.com/assets/images/global/favicon.ico',
  'supabase': 'https://supabase.com/favicon/favicon-32x32.png',
  'firebase': 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/firebase/images/favicon.png',
  'planetscale': 'https://planetscale.com/favicon.ico',
  'prisma': 'https://www.prisma.io/images/favicon-32x32.png',
  'redis': 'https://redis.io/favicon.ico',
  'cockroachdb': 'https://www.cockroachlabs.com/favicon.ico',
  'fauna': 'https://fauna.com/favicon.ico',
  'hasura': 'https://hasura.io/favicon.ico',
  'neon': 'https://neon.tech/favicon.ico',
  
  // E-commerce & Payments
  'shopify': 'https://cdn.shopify.com/shopifycloud/brochure/assets/favicons/favicon-196x196.png',
  'mercury': 'https://mercury.com/favicon.ico',
  'wise': 'https://wise.com/public-resources/assets/icons/favicon.ico',
  'worldfirst': 'https://www.worldfirst.com/favicon.ico',
  'airwallex': 'https://www.airwallex.com/favicon.ico',
  'brex': 'https://www.brex.com/favicon.ico',
  'ramp': 'https://ramp.com/favicon.ico',
  'paypal': 'https://www.paypal.com/favicon.ico',
  'square': 'https://squareup.com/favicon.ico',
  'adyen': 'https://www.adyen.com/favicon.ico',
  'checkout': 'https://www.checkout.com/favicon.ico',
  'mollie': 'https://www.mollie.com/favicon.ico',
  'paddle': 'https://paddle.com/favicon.ico',
  'chargebee': 'https://www.chargebee.com/favicon.ico',
  'recurly': 'https://recurly.com/favicon.ico',
  
  // AI & ML
  'openai': 'https://openai.com/favicon.ico',
  'anthropic': 'https://www.anthropic.com/favicon.ico',
  'perplexity': 'https://www.perplexity.ai/favicon.ico',
  'elevenlabs': 'https://elevenlabs.io/favicon.ico',
  'huggingface': 'https://huggingface.co/favicon.ico',
  'cohere': 'https://cohere.com/favicon.ico',
  'replicate': 'https://replicate.com/favicon.ico',
  'stability': 'https://stability.ai/favicon.ico',
  'midjourney': 'https://www.midjourney.com/favicon.ico',
  'jasper': 'https://www.jasper.ai/favicon.ico',
  'copy.ai': 'https://www.copy.ai/favicon.ico',
  'writesonic': 'https://writesonic.com/favicon.ico',
  'grammarly': 'https://www.grammarly.com/favicon.ico',
  'gemini': 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
  'claude': 'https://www.anthropic.com/favicon.ico',
  'customgpt': 'https://customgpt.ai/favicon.ico',
  
  // Analytics
  'mixpanel': 'https://mixpanel.com/favicon.ico',
  'amplitude': 'https://amplitude.com/favicon.ico',
  'segment': 'https://segment.com/favicon.ico',
  'algolia': 'https://www.algolia.com/favicon.ico',
  'hotjar': 'https://www.hotjar.com/favicon.ico',
  'pendo': 'https://www.pendo.io/favicon.ico',
  'appcues': 'https://www.appcues.com/favicon.ico',
  'userpilot': 'https://userpilot.com/favicon.ico',
  'chameleon': 'https://www.chameleon.io/favicon.ico',
  
  // Communication
  'twilio': 'https://www.twilio.com/favicon.ico',
  'zoom': 'https://st1.zoom.us/zoom.ico',
  'calendly': 'https://calendly.com/favicon.ico',
  'vonage': 'https://www.vonage.com/favicon.ico',
  'messagebird': 'https://messagebird.com/favicon.ico',
  'plivo': 'https://www.plivo.com/favicon.ico',
  'bandwidth': 'https://www.bandwidth.com/favicon.ico',
  'ringcentral': 'https://www.ringcentral.com/favicon.ico',
  'dialpad': 'https://www.dialpad.com/favicon.ico',
  'aircall': 'https://aircall.io/favicon.ico',
  
  // Security & Auth
  'auth0': 'https://auth0.com/favicon.ico',
  'okta': 'https://www.okta.com/favicon.ico',
  'onelogin': 'https://www.onelogin.com/favicon.ico',
  '1password': 'https://1password.com/favicon.ico',
  'lastpass': 'https://www.lastpass.com/favicon.ico',
  'bitwarden': 'https://bitwarden.com/favicon.ico',
  'dashlane': 'https://www.dashlane.com/favicon.ico',
  'keeper': 'https://www.keepersecurity.com/favicon.ico',
  'snyk': 'https://snyk.io/favicon.ico',
  'sonarqube': 'https://www.sonarqube.org/favicon.ico',
  'veracode': 'https://www.veracode.com/favicon.ico',
  
  // Advertising
  'tiktok': 'https://sf16-website-login.neutral.ttscdn.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png',
  'snapchat': 'https://www.snapchat.com/favicon.ico',
  'reddit': 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png',
  'linkedin': 'https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca',
  'facebook': 'https://www.facebook.com/favicon.ico',
  'instagram': 'https://www.instagram.com/favicon.ico',
  'twitter': 'https://twitter.com/favicon.ico',
  'pinterest': 'https://www.pinterest.com/favicon.ico',
  'buffer': 'https://buffer.com/favicon.ico',
  'hootsuite': 'https://www.hootsuite.com/favicon.ico',
  'sproutsocial': 'https://sproutsocial.com/favicon.ico',
  'later': 'https://later.com/favicon.ico',
  
  // Other Popular Tools
  'make': 'https://www.make.com/favicon.ico',
  'zapier': 'https://zapier.com/favicon.ico',
  'typeform': 'https://www.typeform.com/favicon.ico',
  'indeed': 'https://www.indeed.com/favicon.ico',
  'flippa': 'https://flippa.com/favicon.ico',
  'quicknode': 'https://www.quicknode.com/favicon.ico',
  'mux': 'https://mux.com/favicon.ico',
  'confluent': 'https://www.confluent.io/favicon.ico',
  'databricks': 'https://www.databricks.com/favicon.ico',
  'document360': 'https://document360.com/favicon.ico',
  'netcore': 'https://netcorecloud.com/favicon.ico',
  'merge': 'https://merge.dev/favicon.ico',
  'devrev': 'https://devrev.ai/favicon.ico',
  'voiceflow': 'https://www.voiceflow.com/favicon.ico',
  'rankspro': 'https://rankspro.io/favicon.ico',
  'clearcrm': 'https://clearcrm.io/favicon.ico',
  'xero': 'https://www.xero.com/favicon.ico',
  'softr': 'https://softr.io/favicon.ico',
  'n8n': 'https://n8n.io/favicon.ico',
  'ifttt': 'https://ifttt.com/favicon.ico',
  'integromat': 'https://www.make.com/favicon.ico',
  'workato': 'https://www.workato.com/favicon.ico',
  'tray': 'https://tray.io/favicon.ico',
  
  // HR & Recruiting
  'gusto': 'https://gusto.com/favicon.ico',
  'bamboohr': 'https://www.bamboohr.com/favicon.ico',
  'workday': 'https://www.workday.com/favicon.ico',
  'greenhouse': 'https://www.greenhouse.io/favicon.ico',
  'lever': 'https://www.lever.co/favicon.ico',
  'ashby': 'https://www.ashbyhq.com/favicon.ico',
  'rippling': 'https://www.rippling.com/favicon.ico',
  'deel': 'https://www.deel.com/favicon.ico',
  'remote': 'https://remote.com/favicon.ico',
  'oyster': 'https://www.oysterhr.com/favicon.ico',
  'justworks': 'https://justworks.com/favicon.ico',
  
  // Legal & Compliance
  'docusign': 'https://www.docusign.com/favicon.ico',
  'hellosign': 'https://www.hellosign.com/favicon.ico',
  'pandadoc': 'https://www.pandadoc.com/favicon.ico',
  'ironclad': 'https://ironcladapp.com/favicon.ico',
  'contractbook': 'https://contractbook.com/favicon.ico',
  'legalzoom': 'https://www.legalzoom.com/favicon.ico',
  'rocket lawyer': 'https://www.rocketlawyer.com/favicon.ico',
  
  // Customer Support
  'freshdesk': 'https://freshdesk.com/favicon.ico',
  'helpscout': 'https://www.helpscout.com/favicon.ico',
  'livechat': 'https://www.livechat.com/favicon.ico',
  'tidio': 'https://www.tidio.com/favicon.ico',
  'gorgias': 'https://www.gorgias.com/favicon.ico',
  'kustomer': 'https://www.kustomer.com/favicon.ico',
  'front': 'https://front.com/favicon.ico',
  'gladly': 'https://www.gladly.com/favicon.ico',
  
  // Website Builders & CMS
  'wordpress': 'https://wordpress.com/favicon.ico',
  'wix': 'https://www.wix.com/favicon.ico',
  'squarespace': 'https://www.squarespace.com/favicon.ico',
  'ghost': 'https://ghost.org/favicon.ico',
  'medium': 'https://medium.com/favicon.ico',
  'substack': 'https://substack.com/favicon.ico',
  'carrd': 'https://carrd.co/favicon.ico',
  'webnode': 'https://www.webnode.com/favicon.ico',
  'strikingly': 'https://www.strikingly.com/favicon.ico',
  'duda': 'https://www.duda.co/favicon.ico',
  
  // Video & Media
  'vimeo': 'https://vimeo.com/favicon.ico',
  'wistia': 'https://wistia.com/favicon.ico',
  'vidyard': 'https://www.vidyard.com/favicon.ico',
  'brightcove': 'https://www.brightcove.com/favicon.ico',
  'cloudinary': 'https://cloudinary.com/favicon.ico',
  'imgix': 'https://imgix.com/favicon.ico',
  'kapwing': 'https://www.kapwing.com/favicon.ico',
  'descript': 'https://www.descript.com/favicon.ico',
  'riverside': 'https://riverside.fm/favicon.ico',
  'streamyard': 'https://streamyard.com/favicon.ico',
  
  // Project Management
  'jira': 'https://www.atlassian.com/favicon.ico',
  'confluence': 'https://www.atlassian.com/favicon.ico',
  'atlassian': 'https://www.atlassian.com/favicon.ico',
  'height': 'https://height.app/favicon.ico',
  'shortcut': 'https://shortcut.com/favicon.ico',
  'clubhouse': 'https://shortcut.com/favicon.ico',
  'productboard': 'https://www.productboard.com/favicon.ico',
  'aha': 'https://www.aha.io/favicon.ico',
  'roadmunk': 'https://roadmunk.com/favicon.ico',
  
  // Accounting & Finance
  'quickbooks': 'https://quickbooks.intuit.com/favicon.ico',
  'freshbooks': 'https://www.freshbooks.com/favicon.ico',
  'wave': 'https://www.waveapps.com/favicon.ico',
  'expensify': 'https://www.expensify.com/favicon.ico',
  'bill': 'https://www.bill.com/favicon.ico',
  'pilot': 'https://pilot.com/favicon.ico',
  'bench': 'https://bench.co/favicon.ico',
  'fyle': 'https://www.fylehq.com/favicon.ico',
  
  // Surveys & Forms
  'surveymonkey': 'https://www.surveymonkey.com/favicon.ico',
  'jotform': 'https://www.jotform.com/favicon.ico',
  'google forms': 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
  'tally': 'https://tally.so/favicon.ico',
  'paperform': 'https://paperform.co/favicon.ico',
  'formstack': 'https://www.formstack.com/favicon.ico',
  'cognito forms': 'https://www.cognitoforms.com/favicon.ico',
};


// Read current deals
let deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`\n📊 Fixing logos for ${deals.length} deals...\n`);

let updatedCount = 0;
let missingLogos = [];

deals = deals.map(deal => {
  const providerLower = (deal.provider || '').toLowerCase().trim();
  const titleLower = (deal.title || '').toLowerCase().trim();
  
  // Check if current logo is a placeholder (ui-avatars) or missing
  const isPlaceholder = !deal.logoUrl || 
                        deal.logoUrl.includes('ui-avatars.com') ||
                        (deal.logoUrl.includes('favicon.ico') && deal.logoUrl.length < 50);
  
  if (isPlaceholder) {
    // Try to find a matching brand logo
    let newLogo = null;
    
    // Check provider name first (exact match)
    if (brandLogos[providerLower]) {
      newLogo = brandLogos[providerLower];
    }
    
    // Check partial matches in provider
    if (!newLogo) {
      for (const [brand, logo] of Object.entries(brandLogos)) {
        if (providerLower.includes(brand) || brand.includes(providerLower)) {
          newLogo = logo;
          break;
        }
      }
    }
    
    // Check title for brand names
    if (!newLogo) {
      for (const [brand, logo] of Object.entries(brandLogos)) {
        if (titleLower.includes(brand)) {
          newLogo = logo;
          break;
        }
      }
    }
    
    if (newLogo) {
      deal.logoUrl = newLogo;
      deal.brandIcon = newLogo;
      updatedCount++;
      console.log(`✅ ${deal.provider}`);
    } else {
      missingLogos.push(deal.provider);
    }
  }
  
  return deal;
});

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(deals, null, 2));

console.log(`\n✅ Logo update complete!`);
console.log(`Updated: ${updatedCount} deals`);
console.log(`Still missing: ${missingLogos.length} deals`);

// Show unique missing providers
const uniqueMissing = [...new Set(missingLogos)].sort();
if (uniqueMissing.length > 0 && uniqueMissing.length <= 50) {
  console.log(`\nUnique providers still needing logos (${uniqueMissing.length}):`);
  uniqueMissing.forEach(p => console.log(`  - ${p}`));
}
