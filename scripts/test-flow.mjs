import fs from 'fs'
const t = fs.readFileSync('.env.local', 'utf8')
const e = {}
for (const l of t.split('\n')) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m) e[m[1]] = m[2] }
const U = e.NEXT_PUBLIC_SUPABASE_URL, K = e.SUPABASE_SERVICE_ROLE_KEY
const h = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }
const log = (...a) => console.log(...a)

// 0) Admin setup check
const admins = await (await fetch(`${U}/rest/v1/admin_users?select=email,role`, { headers: h })).json()
log('STEP 0 — admin_users:', Array.isArray(admins) ? admins.map(a => `${a.email} (${a.role})`).join(', ') || '(none)' : JSON.stringify(admins))

// 1) Submit a deal via the PUBLIC API (real path)
const submitRes = await fetch('http://localhost:3001/api/submit-deal', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    company_name: 'FlowTest Admin Demo',
    website_url: 'flowtest-demo.com',          // bare domain → should normalize
    benefit_description: 'End-to-end test: 40% off all annual plans for verified startups.',
    category: 'saas',
    deal_value: '40% off',
    redemption_method: 'code',
    redemption_link: 'FLOWTEST40',             // coupon code
    submitter_email: 'founder@flowtest-demo.com',
    fill_time_ms: 6000,
  }),
})
const submitJson = await submitRes.json()
log('STEP 1 — submit:', submitRes.status, JSON.stringify(submitJson))
const subId = submitJson.id
if (!subId) { log('ABORT: submission failed'); process.exit(1) }

// 2) Admin LIST query (same query the admin route runs)
const pending = await (await fetch(`${U}/rest/v1/deal_submissions?status=eq.pending&order=created_at.desc&select=id,company_name,status,website_url,redemption_link,redemption_method`, { headers: h })).json()
const found = pending.find(s => s.id === subId)
log('STEP 2 — appears in admin pending list:', !!found, found ? `(${found.company_name}, website=${found.website_url})` : '')

// 3) APPROVE logic (replicates /api/admin/submissions POST action=approve)
const sub = found
const slug = sub.company_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000)
// mark approved
await fetch(`${U}/rest/v1/deal_submissions?id=eq.${subId}`, { method: 'PATCH', headers: h, body: JSON.stringify({ status: 'approved', reviewed_by: 'test@local', reviewed_at: new Date().toISOString() }) })
// publish deal
const full = (await (await fetch(`${U}/rest/v1/deal_submissions?id=eq.${subId}&select=*`, { headers: h })).json())[0]
const isCode = (full.redemption_method || 'link') === 'code'
const applyUrl = isCode ? (full.website_url || full.redemption_link) : full.redemption_link
const codeNote = isCode && full.redemption_link ? ` Use code: ${full.redemption_link} at checkout.` : ''
const fullDescription = `${full.benefit_description || ''}${codeNote}`.trim()
const dealInsert = await fetch(`${U}/rest/v1/deals`, {
  method: 'POST', headers: h,
  body: JSON.stringify({
    slug,
    title: `${full.company_name} Deal`,
    provider: full.company_name,
    category: full.category,
    description: fullDescription,
    short_description: fullDescription.slice(0, 150),
    value: full.deal_value,
    application_url: applyUrl,
    logo_url: full.logo_url,
    provider_website: full.website_url,
    status: 'active',
    eligibility: ['Startups'],
    requirements: ['Valid business email'],
    application_process: isCode ? ['Click "Get Deal" to visit the provider', `Apply code ${full.redemption_link} at checkout`] : ['Click "Get Deal"', 'Follow instructions on provider site'],
    source_verified: true,
    data_source: 'submission',
    featured: false,
  }),
})
const dealRows = await dealInsert.json()
log('STEP 3 — approve → deal published:', dealInsert.status, dealInsert.ok ? `slug=${dealRows[0]?.slug}\n   apply_url=${dealRows[0]?.application_url}\n   desc=${dealRows[0]?.description}` : JSON.stringify(dealRows))

// 4) Cleanup
await fetch(`${U}/rest/v1/deals?slug=eq.${slug}`, { method: 'DELETE', headers: h })
await fetch(`${U}/rest/v1/deal_submissions?id=eq.${subId}`, { method: 'DELETE', headers: h })
log('STEP 4 — cleaned up test submission + test deal')
