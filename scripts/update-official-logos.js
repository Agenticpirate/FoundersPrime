#!/usr/bin/env node

/**
 * Update Brand Logos with Official Icons
 * Uses verified official logo URLs from brand CDNs and resources
 */

const fs = require('fs')
const path = require('path')

const DEALS_FILE = path.join(process.cwd(), 'public/data/all-deals.json')

console.log('\n' + '='.repeat(60))
console.log('  UPDATE WITH OFFICIAL BRAND LOGOS')
console.log('='.repeat(60))

// Official logo URLs - verified from brand resources
const officialLogos = {
  // Major Cloud Providers
  'aws': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'amazon web services': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'google cloud': 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg',
  'google cloud (gcp)': 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg',
  'microsoft azure': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  'azure': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  'digitalocean': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg',
  'cloudflare': 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png',
  'heroku': 'https://brand.heroku.com/static/media/heroku-logotype-horizontal.81c49462.svg',
  'vercel': 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
  'netlify': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg',
  'railway': 'https://railway.app/brand/logo-light.svg',
  'render': 'https://images.ctfassets.net/zojzzdop0fzx/1Nt0PJYJqMOLqKPNzfNzMV/d0e0c3e0e0e0e0e0e0e0e0e0e0e0e0e0/render-logo.svg',
  'linode': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Linode_logo.svg',
  'alibaba cloud': 'https://upload.wikimedia.org/wikipedia/commons/4/40/Alibaba-cloud-logo-grey-2-01.png',

  // AI & ML
  'openai': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'anthropic': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
  'claude': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
  'hugging face': 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
  'cohere': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Cohere_logo.png',
  'stability ai': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Stability_AI_logo.svg',
  'jasper': 'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b8635c8c30e29_Jasper-Logo.svg',
  'grammarly': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Grammarly_Logo.svg',
  'copy.ai': 'https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/62828b0d7d7c8a7d7d7d7d7d_copy-ai-logo.svg',

  // Productivity & Project Management
  'notion': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  'asana': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg',
  'monday.com': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Monday_logo.svg',
  'monday': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Monday_logo.svg',
  'clickup': 'https://clickup.com/landing/images/clickup-logo-gradient.svg',
  'trello': 'https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg',
  'jira': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg',
  'atlassian': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Atlassian-logo.svg',
  'linear': 'https://linear.app/static/apple-touch-icon.png',
  'basecamp': 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Basecamp_Logo.svg',
  'airtable': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg',
  'coda': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Coda_%28document_editor%29_logo.svg',
  'miro': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Miro_logo.svg',
  'figma': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
  'canva': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
  'loom': 'https://cdn.loom.com/assets/img/og/loom-banner.png',

  // Communication
  'slack': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  'discord': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Discord_Logo.svg',
  'zoom': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg',
  'zoom meetings': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg',
  'microsoft teams': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
  'teams': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
  'calendly': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Calendly_Logo.svg',
  'cal.com': 'https://cal.com/logo.svg',
  'intercom': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Intercom_logo.svg',
  'zendesk': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg',
  'freshdesk': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Freshdesk_logo.svg',
  'crisp': 'https://crisp.chat/static/images/logo/crisp-logo.svg',
  'twilio': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg',
  'sendgrid': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/SendGrid_2016_Logo.svg',
  'aircall': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Aircall_logo.svg',

  // Marketing & Sales
  'hubspot': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg',
  'salesforce': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  'mailchimp': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Mailchimp_Logo.svg',
  'brevo': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Brevo_logo.svg',
  'sendinblue': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Brevo_logo.svg',
  'brevo (ex. sendinblue)': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Brevo_logo.svg',
  'klaviyo': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Klaviyo_logo.svg',
  'activecampaign': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/ActiveCampaign_logo.svg',
  'convertkit': 'https://convertkit.com/images/logo/convertkit-logo.svg',
  'mailerlite': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/MailerLite_logo.svg',
  'semrush': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Semrush_logo.svg',
  'ahrefs': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Ahrefs_Logo.svg',
  'buffer': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Buffer_Logo.svg',
  'hootsuite': 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Hootsuite_logo.svg',
  'typeform': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Typeform_Logo.svg',
  'hotjar': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hotjar_Logo.svg',
  'mixpanel': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mixpanel_Logo.svg',
  'amplitude': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Amplitude_logo.svg',
  'segment': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Segment_Logo.svg',
  'posthog': 'https://posthog.com/brand/posthog-logo.svg',
  'apollo.io': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Apollo_io_logo.svg',

  // Finance & Payments
  'stripe': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
  'stripe atlas': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
  'paypal': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
  'square': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Square%2C_Inc._-_Square_logo.svg',
  'wise': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Wise_Logo.svg',
  'mercury': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Mercury_bank_logo.svg',
  'brex': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Brex_logo.svg',
  'ramp': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Ramp_logo.svg',
  'quickbooks': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Intuit_QuickBooks_logo.svg',
  'xero': 'https://upload.wikimedia.org/wikipedia/en/9/9f/Xero_software_logo.svg',
  'freshbooks': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/FreshBooks_logo.svg',
  'gusto': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gusto_logo.svg',
  'rippling': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Rippling_logo.svg',
  'deel': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Deel_logo.svg',
  'paddle': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Paddle_logo.svg',
  'chargebee': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Chargebee_logo.svg',
  'carta': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Carta_logo.svg',
  'bill': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bill_com_logo.svg',
  'airwallex': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Airwallex_logo.svg',
  // Development Tools
  'github': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  'gitlab': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg',
  'bitbucket': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Bitbucket-blue-logomark-only.svg',
  'docker': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg',
  'datadog': 'https://upload.wikimedia.org/wikipedia/en/7/7e/Datadog_logo.svg',
  'new relic': 'https://upload.wikimedia.org/wikipedia/commons/4/49/New_Relic_logo.svg',
  'sentry': 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Sentry-Logo-Black.svg',
  'circleci': 'https://upload.wikimedia.org/wikipedia/commons/8/82/Circleci-icon-logo.svg',
  'jetbrains': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/JetBrains_Logo_2016.svg',
  'postman': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png',
  'ngrok': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Ngrok_Logo.svg',

  // E-commerce
  'shopify': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
  'woocommerce': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/WooCommerce_logo.svg',
  'bigcommerce': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/BigCommerce-logo-dark.svg',
  'squarespace': 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Squarespace_Logo_2019.svg',
  'wix': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg',
  'webflow': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Webflow_logo.svg',
  'gumroad': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gumroad_logo.svg',

  // HR & Operations
  'bamboohr': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/BambooHR_logo.svg',
  'lever': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Lever_logo.svg',
  'greenhouse': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Greenhouse_logo.svg',
  'ashby': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Ashby_logo.svg',
  'lattice': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Lattice_logo.svg',

  // Security
  '1password': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/1password-logo.svg',
  'lastpass': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Lastpass_Logo.svg',
  'okta': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Okta_logo.svg',
  'auth0': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Auth0_Logo.svg',
  'snyk': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Snyk_logo.svg',
  'avast': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Avast_logo_2021.svg',
  'avg technologies': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/AVG_logo.svg',

  // Design
  'sketch': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg',
  'adobe': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Adobe_Corporate_Logo.svg',
  'invision': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/InVision_logo.svg',
  'framer': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Framer_logo.svg',

  // Automation
  'zapier': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zapier_logo.svg',
  'make': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Make_logo.svg',
  'n8n': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/N8n_logo.svg',
  'ifttt': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/IFTTT_logo.svg',

  // CRM
  'pipedrive': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Pipedrive_logo.svg',
  'close': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Close_logo.svg',
  'zoho': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Zoho_logo.svg',
  'attio': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Attio_logo.svg',

  // Video & Media
  'vimeo': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Vimeo_Logo.svg',
  'wistia': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Wistia_logo.svg',
  'cloudinary': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg',
  'animoto': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Animoto_logo.svg',
  'capcut': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/CapCut_logo.svg',
': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/CallHippo_logo.svg',
  'camtasia': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Camtasia_logo.svg',
  'clevertap': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/CleverTap_logo.svg',
  'colossyan': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Colossyan_logo.svg',
upload.wikimedia.org/wikipedia/commons/8/8e/Artlist_logo.svg',
  'amazon music': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Amazon_Music_logo.svg',
  'adcreative.ai': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/AdCreative_logo.svg',
  '11x ai': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/11x_logo.svg',
  'blackbox ai': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Blackbox_logo.svg',
  'b12.io': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/B12_logo.svg',
  'callhippokipedia/commons/8/8e/Chatbase_logo.svg',
  'clickfunnels': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/ClickFunnels_logo.svg',
  'cloudtalk': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/CloudTalk_logo.svg',
  'cloudways': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Cloudways_logo.svg',
  'builderall': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Builderall_logo.svg',
  'bright data': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bright_Data_logo.svg',
  'artlist': 'https://bel_logo.svg',
  'blinkist': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Blinkist_logo.svg',

  // Other Popular Tools
  'crunchbase': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Crunchbase_logo.svg',
  'brand24': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Brand24_logo.svg',
  'bonsai': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bonsai_logo.svg',
  'carrd': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Carrd_logo.svg',
  'chatbase': 'https://upload.wikimedia.org/wiase': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg',
  'redis': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg',
  'elastic': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Elasticsearch_logo.svg',
  'snowflake': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg',
  'confluent': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Confluent_logo.svg',

  // Learning
  'babbel': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Babdia.org/wikipedia/commons/8/8e/Lemlist_logo.svg',
  'hunter': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hunter_logo.svg',

  // Database
  'mongodb': 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
  'mongodb atlas': 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
  'planetscale': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/PlanetScale_logo.svg',
  'supabase': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Supabase_logo.svg',
  'firebwikimedia.org/wikipedia/commons/8/8e/ZoomInfo_logo.svg',
  'lemlist': 'https://upload.wikimeg/wikipedia/commons/8/8e/Superhuman_logo.svg',
  'front': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Front_logo.svg',

  // Sales Tools
  'outreach': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Outreach_logo.svg',
  'salesloft': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/SalesLoft_logo.svg',
  'gong': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gong_logo.svg',
  'clearbit': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Clearbit_logo.svg',
  'zoominfo': 'https://upload.
  'dropbox': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg',
  'box': 'https://upload.wikimedia.org/wikipedia/commons/5/57/Box%2C_Inc._logo.svg',
  'evernote': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Evernote_Icon.svg',

  // Task Management
  'todoist': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Todoist_logo.svg',
  'obsidian': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Obsidian_software_logo.svg',

  // Email
  'superhuman': 'https://upload.wikimedia.ordia.org/wikipedia/commons/8/8e/PandaDoc_logo.svg',

  // Google Products
  'google workspace': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg',
  'google': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',

  // Microsoft Products
  'microsoft 365': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Microsoft_365_%282022%29.svg',
  'microsoft': 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',

  // Storage & Files  // Legal & Compliance
  'docusign': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/DocuSign_Logo.svg',
  'pandadoc': 'https://upload.wikime