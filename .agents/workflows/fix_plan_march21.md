# Fix Plan — March 21, 2026

## Phase 1 — Hero Section Compactness (All inner pages)
Fix: `StartupsHero.tsx`, `IdeasHero.tsx`, `AcceleratorsHero.tsx`, `ContactHero.tsx`, `ResourcesHero.tsx`
- Stats boxes stacked vertically on mobile → collapse into tight horizontal grid
- Large h1 font-size (5xl/6xl) → reduce to 2xl/3xl on mobile
- Long description text → limit to 2 lines max on mobile
- Search bar → show on mobile but make compact

## Phase 2 — Student Benefits Category Naming
Fix: breadcrumb and categories "Campus H" → properly named
Review: student-benefits-2026.ts appCategory values

## Phase 3 — Pricing Page Mobile Overhaul
Fix: `PricingPageContent.tsx`, `PricingPlans.tsx`, `PricingTestimonials.tsx`, `Pricing3DTestimonials.tsx`
- Add animated, pulsing CTA sections on mobile
- Add social proof banner above plans on mobile  
- Add urgency/attention-grabbing text
- Enhance testimonial animation on mobile (auto-scroll + dots)

## Phase 4 — ProUpgradeModal text fix  
Fix: `ProUpgradeModal.tsx`
- Change "Pro Access Required" → "Unlock Full Access"
- Change button text to "View Pricing Plans" and route to /pricing
- Remove intimidating "required" language

## Phase 5 — FounderLogs & Homepage Testimonials Compact
Fix: `FounderLogs.tsx`
- Card padding too large on mobile (p-6 → p-3)
- Quote text size too large → reduce
- Column height → reduce h-[280px] to match compact design

## Phase 6 — Resources Library Hero
Fix: `ResourcesHero.tsx` — make it compact on mobile

## Phase 7 — Push all changes to Git
