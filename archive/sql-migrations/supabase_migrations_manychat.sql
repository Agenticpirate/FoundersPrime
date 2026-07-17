-- Add the ManyChat deal.
--   • Offer: First month free on the Pro plan
--   • Savings: Save up to $14
--   • Activation: sign up via the offer link
-- Note: the old "30% off for 3 months" offer is intentionally NOT used.
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this INSERT is what makes the deal appear in production.
-- Idempotent: ON CONFLICT (slug) updates the existing row, so it is re-run-safe.

INSERT INTO public.deals (
  id, slug, title, provider, category, subcategory,
  value, description, short_description, "shortDescription",
  eligibility, "applicationProcess",
  tags, status, application_url, "applicationUrl",
  "providerWebsite", logo_url, "logoUrl",
  featured, recommended, verified, difficulty,
  time_to_apply, "timeToApply", savings,
  "sourceVerified", "dataSource",
  created_at, updated_at, "lastUpdated"
) VALUES (
  'manychat',
  'manychat',
  'ManyChat — First Month Free on Pro Plan',
  'ManyChat',
  'saas-discounts',
  'marketing-tools',
  'First month free on Pro plan',
  'ManyChat is a leading chat marketing platform that automates conversations across Instagram, WhatsApp, Messenger, TikTok, and SMS to help businesses grow their audience, capture leads, and drive sales 24/7. With this deal, you get your first month free on the Pro plan — a savings of up to $14. Sign up via the activation link to claim the offer.',
  'Get your first month free on the ManyChat Pro plan (save up to $14). Automate conversations and marketing across Instagram, WhatsApp, Messenger, and SMS to capture leads and drive sales.',
  'Get your first month free on the ManyChat Pro plan (save up to $14). Automate conversations and marketing across Instagram, WhatsApp, Messenger, and SMS to capture leads and drive sales.',
  ARRAY[
    '✓ New ManyChat Pro plan sign-ups via the activation link',
    '✓ Businesses, creators, and marketers of any size',
    '✓ Available globally'
  ],
  ARRAY[
    '1. Sign up via the activation link to activate the offer',
    '2. Choose the Pro plan to apply your first month free',
    '3. Connect your Instagram, WhatsApp, Messenger, or other channel',
    '4. Build your first automation and start capturing leads'
  ],
  ARRAY['marketing','chat-marketing','automation','manychat','instagram','whatsapp','messenger','saas'],
  'active',
  'https://offers.manychat.com/get/100-off?source=21242acbdc12&mcdc=2d07bc1a&ps_partner_key=MjEyNDJhY2JkYzEy&sid1=551980&ps_xid=OWxkyRJx7MgV23&gsxid=OWxkyRJx7MgV23&gspk=MjEyNDJhY2JkYzEy',
  'https://offers.manychat.com/get/100-off?source=21242acbdc12&mcdc=2d07bc1a&ps_partner_key=MjEyNDJhY2JkYzEy&sid1=551980&ps_xid=OWxkyRJx7MgV23&gsxid=OWxkyRJx7MgV23&gspk=MjEyNDJhY2JkYzEy',
  'https://manychat.com',
  'https://manychat.com/favicon.ico',
  'https://manychat.com/favicon.ico',
  false, false, true, 'easy',
  '10 minutes', '10 minutes',
  'Save up to $14',
  true, 'manual-update',
  NOW(), NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  provider = EXCLUDED.provider,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  "shortDescription" = EXCLUDED."shortDescription",
  eligibility = EXCLUDED.eligibility,
  "applicationProcess" = EXCLUDED."applicationProcess",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  application_url = EXCLUDED.application_url,
  "applicationUrl" = EXCLUDED."applicationUrl",
  "providerWebsite" = EXCLUDED."providerWebsite",
  logo_url = EXCLUDED.logo_url,
  "logoUrl" = EXCLUDED."logoUrl",
  featured = EXCLUDED.featured,
  recommended = EXCLUDED.recommended,
  verified = EXCLUDED.verified,
  savings = EXCLUDED.savings,
  updated_at = NOW(),
  "lastUpdated" = NOW();

NOTIFY pgrst, 'reload schema';
