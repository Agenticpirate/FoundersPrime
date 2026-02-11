#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

// Official logo URLs for major providers
const officialLogos = {
  'stripe': 'https://asset.brandfetch.io/idS-LIMMyd/idgWiKYeIE.svg',
  'notion': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  'google cloud': 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg',
  'google': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  'aws': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'azure': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  'digitalocean': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg',
  'github': 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  'slack': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  'hubspot': 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
  'figma': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
  'vercel': 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
  'netlify': 'https://www.netlify.com/v3/img/components/logomark.svg',
  'mongodb': 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
  'twilio': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg',
  'sendgrid': 'https://sendgrid.com/wp-content/themes/flavor/assets/images/sendgrid-logo.svg',
  'mailchimp': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Mailchimp_Logo.svg',
  'intercom': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Intercom_logo.svg',
  'zendesk': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg',
  'airtable': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg',
  'asana': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg',
  'linear': 'https://linear.app/static/apple-touch-icon.png',
  'openai': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'anthropic': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg'
};

let updated = 0;

deals.forEach((deal, index) => {
  const providerLower = deal.provider?.toLowerCase() || '';
  
  for (const [key, logoUrl] of Object.entries(officialLogos)) {
    if (providerLower.includes(key) || deal.slug?.includes(key)) {
      if (deal.logoUrl !== logoUrl) {
        deals[index].logoUrl = logoUrl;
        updated++;
        console.log(`Updated logo for: ${deal.title}`);
      }
      break;
    }
  }
});

fs.writeFileSync(path, JSON.stringify(deals, null, 2));
console.log(`\n✅ Updated ${updated} deal logos`);
console.log(`Total deals: ${deals.length}`);
