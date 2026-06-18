-- Add the BytePlus AI Startups Accelerator (VStart) deal.
-- Source: https://www.byteplus.com/en/activity/vstart
--   • Up to $100,000 in AI model credits
--   • $2,000 in non-threshold AI model credits to start
--   • Free AI workshops, expert support, investor access, tailored solutions
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this INSERT is what makes the deal appear in production.
-- Idempotent: ON CONFLICT (slug) updates the existing row, so it is re-run-safe.

-- NOTE: column set kept to those confirmed present in the table (via the
-- /api/deals list SELECT and supabase_migrations_deals_patch.sql). The
-- camelCase variants below are the patch-added columns the app reads first.
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
  'byteplus-ai-startups-accelerator',
  'byteplus-ai-startups-accelerator',
  'BytePlus AI Startups Accelerator (VStart) — Up to $100,000 in AI Model Credits',
  'BytePlus',
  'cloud-credits',
  'cloud-computing',
  'Up to $100,000 in AI model credits',
  'BytePlus AI Startups Accelerator (VStart), powered by ByteDance, helps early-stage startups build and scale with AI. Selected startups receive up to $100,000 in AI model credits — including $2,000 in non-threshold credits to get started — along with priority access to large language models, speech (ASR/TTS), and vision models, plus free AI workshops, dedicated expert support, investor access, and tailored solutions.',
  'Up to $100,000 in AI model credits for startups — starting with $2,000 in non-threshold credits — plus free AI workshops, expert support, investor access, and tailored AI solutions from BytePlus (ByteDance).',
  'Up to $100,000 in AI model credits for startups — starting with $2,000 in non-threshold credits — plus free AI workshops, expert support, investor access, and tailored AI solutions from BytePlus (ByteDance).',
  ARRAY[
    '✓ Early-stage AI startups building products on AI models',
    '✓ Startups integrating LLM, voice (ASR/TTS), or vision AI',
    '✓ Year-round admissions — no application deadlines',
    '✓ Selected via a discovery and evaluation process (in-person discussions)',
    '✓ Clear startup vision and product details required in the application'
  ],
  ARRAY[
    '1. Submit your application year-round at byteplus.com/contact-us/vstart with your startup details and vision (no deadlines)',
    '2. Discovery & evaluation: promising candidates are invited to in-person discussions to explore collaboration opportunities',
    '3. Accelerate together: receive AI model credits, technical resources, mentorship, and strategic partnerships to grow'
  ],
  ARRAY['ai','ai-credits','cloud-credits','byteplus','bytedance','llm','machine-learning','startups'],
  'active',
  'https://www.byteplus.com/contact-us/vstart',
  'https://www.byteplus.com/contact-us/vstart',
  'https://www.byteplus.com/en/activity/vstart',
  'https://www.byteplus.com/favicon.ico',
  'https://www.byteplus.com/favicon.ico',
  true, true, true, 'medium',
  '15 minutes', '15 minutes',
  'Save up to $100,000',
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
