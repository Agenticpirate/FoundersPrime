#!/usr/bin/env node
/**
 * Inspect and update the email-authentication DNS records on Cloudflare.
 *
 *   node scripts/dns-email-policy.mjs                 # report only, changes nothing
 *   node scripts/dns-email-policy.mjs --apply         # write the target records
 *   node scripts/dns-email-policy.mjs --apply --policy=reject
 *   node scripts/dns-email-policy.mjs --apply --rua="mailto:a@b,mailto:c@d"
 *
 * What --apply writes:
 *   _dmarc            DMARC policy without ruf=/fo=, explicit relaxed alignment
 *   _smtp._tls        TLS reporting, so failed inbound TLS is visible
 *
 * Deliberately never touches SPF, DKIM or MX: those are verified working for
 * Resend (DKIM d=foundersprime.com, envelope send.foundersprime.com) and
 * Hostinger inbound, and a bad edit there stops mail entirely.
 *
 * Alignment stays relaxed on purpose. aspf=s would compare the envelope domain
 * send.foundersprime.com against foundersprime.com and fail DMARC on every
 * Resend send.
 *
 * Requires CLOUDFLARE_API_TOKEN with Zone → DNS → Edit on the zone, and no
 * client-IP filter on the token (a filter surfaces as error 9109).
 */
import fs from 'node:fs'

const ZONE = process.env.CLOUDFLARE_ZONE_NAME || 'foundersprime.com'
const REPORT_MAILBOX = `mailto:support@${ZONE}`

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const policy = (args.find((a) => a.startsWith('--policy='))?.split('=')[1] || 'quarantine').trim()
const rua = (args.find((a) => a.startsWith('--rua='))?.split('=')[1] || REPORT_MAILBOX).trim()

if (!['none', 'quarantine', 'reject'].includes(policy)) {
  console.error(`--policy must be none, quarantine or reject (got "${policy}")`)
  process.exit(1)
}

/** Read the token from the environment, falling back to .env.local for local runs. */
function readToken() {
  if (process.env.CLOUDFLARE_API_TOKEN?.trim()) return process.env.CLOUDFLARE_API_TOKEN.trim()
  try {
    const env = fs.readFileSync('.env.local', 'utf8')
    return env.match(/^CLOUDFLARE_API_TOKEN=(.*)$/m)?.[1].trim() || ''
  } catch {
    return ''
  }
}

const token = readToken()
if (!token) {
  console.error('CLOUDFLARE_API_TOKEN is not set (env or .env.local).')
  process.exit(1)
}

const api = async (path, init = {}) => {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok && body.success !== false, status: res.status, body }
}

/** Resolve through Cloudflare DoH so the result is what the internet sees. */
async function resolveTxt(name) {
  const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${name}&type=TXT`, {
    headers: { accept: 'application/dns-json' },
  })
  const body = await res.json()
  return (body.Answer || []).map((a) => a.data.replace(/^"|"$/g, ''))
}

const TARGETS = [
  {
    name: `_dmarc.${ZONE}`,
    // ruf=/fo= removed: Google never sends failure reports and those that do
    // forward the full failing message, which is a privacy liability.
    content: `v=DMARC1; p=${policy}; rua=${rua}; adkim=r; aspf=r`,
    why: 'DMARC policy',
  },
  {
    name: `_smtp._tls.${ZONE}`,
    content: `v=TLSRPTv1; rua=${REPORT_MAILBOX}`,
    why: 'TLS reporting',
  },
]

const verify = await api('/user/tokens/verify')
if (!verify.ok) {
  const err = verify.body.errors?.[0]
  console.error(`Token rejected: ${verify.status} ${err?.code} ${err?.message}`)
  if (err?.code === 9109) {
    console.error('Error 9109 means the token has a client-IP filter that excludes this machine.')
  }
  process.exit(2)
}

const zones = await api(`/zones?name=${ZONE}`)
const zone = zones.body.result?.[0]
if (!zone) {
  console.error(`Zone ${ZONE} not visible to this token.`)
  process.exit(3)
}
console.log(`zone ${zone.name} (${zone.id}) status=${zone.status}\n`)

for (const target of TARGETS) {
  const existing = await api(`/zones/${zone.id}/dns_records?type=TXT&name=${target.name}`)
  const record = existing.body.result?.[0]

  console.log(`${target.why} — ${target.name}`)
  console.log(`  live:   ${record ? record.content : '(no record)'}`)
  console.log(`  target: ${target.content}`)

  if (!apply) {
    console.log('  action: none (dry run)\n')
    continue
  }
  if (record && record.content === target.content) {
    console.log('  action: already correct\n')
    continue
  }

  const payload = JSON.stringify({
    type: 'TXT',
    name: target.name,
    content: target.content,
    ttl: 3600,
    comment: 'Managed by scripts/dns-email-policy.mjs',
  })

  const result = record
    ? await api(`/zones/${zone.id}/dns_records/${record.id}`, { method: 'PUT', body: payload })
    : await api(`/zones/${zone.id}/dns_records`, { method: 'POST', body: payload })

  if (!result.ok) {
    console.error(`  action: FAILED ${result.status} ${JSON.stringify(result.body.errors)}\n`)
    process.exitCode = 4
    continue
  }
  console.log(`  action: ${record ? 'updated' : 'created'}\n`)
}

console.log('--- resolved from public DNS ---')
for (const target of TARGETS) {
  const values = await resolveTxt(target.name)
  console.log(`${target.name} -> ${values.length ? values.join(' | ') : '(none)'}`)
}
