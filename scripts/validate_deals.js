#!/usr/bin/env node
/**
 * Validates student-benefits-2026.ts for:
 * 1. Duplicate slugs
 * 2. Duplicate companies
 * 3. Missing required fields
 * 4. Empty/placeholder values
 * 5. Malformed URLs
 * 6. Broken links (HTTP checks, sampled)
 */

import { readFileSync, writeFileSync } from 'fs';
import https from 'https';
import http from 'http';

const DATA_FILE = 'data/student-benefits-2026.ts';
const REPORT_FILE = '/tmp/validation_report.json';

const REQUIRED_FIELDS = ['title', 'company', 'slug', 'category', 'appCategory',
  'offerSummary', 'description', 'benefitType', 'value',
  'eligibility', 'region', 'verification', 'url', 'claimUrl'];

const VALID_BENEFIT_TYPES = new Set(['Free', 'Discount', 'Credits', 'Grant', 'Scholarship', 'Program', 'Other']);
const VALID_APP_CATEGORIES = new Set(['Software & Tools', 'Credits & Savings', 'Funding & Opportunities', 'Programs', 'Lifestyle']);
const PLACEHOLDERS = new Set(['n/a', 'tbd', 'todo', 'placeholder', 'unknown', 'test', '???', 'example', 'lorem ipsum', 'lorem']);

// ── Load data ──────────────────────────────────────────────────────────
console.log('='.repeat(70));
console.log('STUDENT BENEFITS DATA VALIDATION');
console.log('='.repeat(70));

const content = readFileSync(DATA_FILE, 'utf-8');
const match = content.match(/const studentBenefits2026\s*[=:][^=]*=\s*(\[[\s\S]*\]);/);
if (!match) {
  console.error('ERROR: Could not find array in file');
  process.exit(1);
}

const benefits = eval('(' + match[1] + ')');
console.log(`\n📂 Loaded ${benefits.length} entries from ${DATA_FILE}\n`);

const issues = {
  duplicate_slugs: [],
  duplicate_companies: [],
  duplicate_titles: [],
  missing_fields: [],
  empty_values: [],
  invalid_urls: [],
  invalid_categories: [],
  invalid_benefit_types: [],
  broken_links: [],
  working_links: [],
  bot_blocked: [],
  redirects: [],
};

// ── 1. Duplicate slugs ─────────────────────────────────────────────────
console.log('🔍 Checking for duplicate slugs...');
const slugMap = new Map();
benefits.forEach((b, i) => {
  const slug = b.slug || '';
  if (slugMap.has(slug)) {
    issues.duplicate_slugs.push({
      slug,
      first_idx: slugMap.get(slug),
      second_idx: i,
      companies: [benefits[slugMap.get(slug)].company, b.company],
    });
  } else {
    slugMap.set(slug, i);
  }
});
console.log(`   ${issues.duplicate_slugs.length ? '⚠️  ' + issues.duplicate_slugs.length + ' duplicates' : '✓ None'}`);

// ── 2. Duplicate companies ─────────────────────────────────────────────
console.log('🔍 Checking for duplicate companies...');
const companyMap = new Map();
benefits.forEach((b, i) => {
  const co = (b.company || '').toLowerCase().trim();
  if (companyMap.has(co)) {
    const existingIdx = companyMap.get(co);
    const existing = benefits[existingIdx];
    // Flag if they have different values/offers (different plans are OK)
    if (b.value !== existing.value) {
      issues.duplicate_companies.push({
        company: b.company,
        slug1: existing.slug, value1: existing.value,
        slug2: b.slug, value2: b.value,
      });
    }
  } else {
    companyMap.set(co, i);
  }
});
console.log(`   ${issues.duplicate_companies.length ? '⚠️  ' + issues.duplicate_companies.length + ' duplicate companies' : '✓ None'}`);

// ── 3. Duplicate titles ───────────────────────────────────────────────
console.log('🔍 Checking for duplicate titles...');
const titleMap = new Map();
benefits.forEach((b, i) => {
  const title = (b.title || '').toLowerCase().trim();
  if (titleMap.has(title)) {
    issues.duplicate_titles.push({
      title: b.title,
      slug1: benefits[titleMap.get(title)].slug,
      slug2: b.slug,
    });
  } else {
    titleMap.set(title, i);
  }
});
console.log(`   ${issues.duplicate_titles.length ? '⚠️  ' + issues.duplicate_titles.length + ' duplicate titles' : '✓ None'}`);

// ── 4. Missing required fields ─────────────────────────────────────────
console.log('🔍 Checking for missing required fields...');
benefits.forEach(b => {
  const missing = REQUIRED_FIELDS.filter(f => !(b[f] || '').toString().trim());
  if (missing.length) {
    issues.missing_fields.push({ slug: b.slug || 'UNKNOWN', company: b.company || 'UNKNOWN', missing });
  }
});
console.log(`   ${issues.missing_fields.length ? '⚠️  ' + issues.missing_fields.length + ' entries with missing fields' : '✓ All present'}`);

// ── 5. Suspicious/placeholder values ─────────────────────────────────
console.log('🔍 Checking for placeholder/suspicious values...');
benefits.forEach(b => {
  ['offerSummary', 'description', 'value'].forEach(field => {
    const val = (b[field] || '').toLowerCase().trim();
    if (PLACEHOLDERS.has(val) || val.length < 5) {
      issues.empty_values.push({ slug: b.slug, company: b.company, field, value: b[field] });
    }
  });
});
console.log(`   ${issues.empty_values.length ? '⚠️  ' + issues.empty_values.length + ' suspicious values' : '✓ None'}`);

// ── 6. URL format validation ──────────────────────────────────────────
console.log('🔍 Validating URL formats...');
const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
benefits.forEach(b => {
  ['url', 'claimUrl'].forEach(field => {
    const url = b[field] || '';
    if (url && !urlPattern.test(url)) {
      issues.invalid_urls.push({ slug: b.slug, company: b.company, field, url });
    }
  });
});
console.log(`   ${issues.invalid_urls.length ? '⚠️  ' + issues.invalid_urls.length + ' malformed URLs' : '✓ All valid format'}`);

// ── 7. Category/type validation ───────────────────────────────────────
console.log('🔍 Checking categories and benefit types...');
benefits.forEach(b => {
  if (b.benefitType && !VALID_BENEFIT_TYPES.has(b.benefitType)) {
    issues.invalid_benefit_types.push({ slug: b.slug, company: b.company, benefitType: b.benefitType });
  }
  if (b.appCategory && !VALID_APP_CATEGORIES.has(b.appCategory)) {
    issues.invalid_categories.push({ slug: b.slug, company: b.company, appCategory: b.appCategory });
  }
});
const catIssues = issues.invalid_categories.length + issues.invalid_benefit_types.length;
console.log(`   ${catIssues ? '⚠️  ' + catIssues + ' invalid category/type values' : '✓ All valid'}`);

// ── 8. HTTP link checking ─────────────────────────────────────────────
console.log('\n🔗 Sampling links for HTTP status checks...');

function checkUrl(entry) {
  return new Promise((resolve) => {
    const url = entry.claimUrl || entry.url || '';
    const slug = entry.slug || 'unknown';
    
    if (!url || !url.startsWith('http')) {
      return resolve({ slug, url, status: 'EMPTY_OR_INVALID', severity: 'HIGH' });
    }
    
    let urlObj;
    try { urlObj = new URL(url); } catch(e) {
      return resolve({ slug, url, status: 'MALFORMED_URL', severity: 'HIGH' });
    }
    
    const lib = url.startsWith('https') ? https : http;
    const opts = {
      method: 'HEAD',
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      port: urlObj.port || (url.startsWith('https') ? 443 : 80),
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Accept': 'text/html,*/*',
      },
    };
    
    const req = lib.request(opts, (res) => {
      const status = res.statusCode;
      const location = res.headers.location || '';
      if (status >= 200 && status < 400) {
        resolve({ slug, url, status, location, ok: true });
      } else if (status === 401 || status === 403 || status === 405 || status === 429) {
        resolve({ slug, url, status, ok: true, note: 'bot-blocked' });
      } else if (status === 404 || status === 410 || status === 451) {
        resolve({ slug, url, status, severity: 'HIGH', ok: false });
      } else if (status >= 500) {
        resolve({ slug, url, status, severity: 'MEDIUM', ok: false });
      } else {
        resolve({ slug, url, status, ok: true });
      }
    });
    
    req.on('timeout', () => { req.destroy(); resolve({ slug, url, status: 'TIMEOUT', severity: 'LOW', ok: false }); });
    req.on('error', (e) => { resolve({ slug, url, status: 'NETWORK_ERROR: ' + e.message.slice(0,50), severity: 'MEDIUM', ok: false }); });
    req.end();
  });
}

// Sample: unique URLs, prioritize claimUrls that point to external sites
const seenUrls = new Set();
const toCheck = [];
for (const b of benefits) {
  const url = b.claimUrl || b.url || '';
  if (url && !seenUrls.has(url) && toCheck.length < 300) {
    seenUrls.add(url);
    toCheck.push(b);
  }
}
console.log(`   Checking ${toCheck.length} unique URLs (parallel batches of 40)...`);

async function checkBatch(batch) {
  return Promise.all(batch.map(checkUrl));
}

async function runAllChecks() {
  const batchSize = 40;
  const allResults = [];
  
  for (let i = 0; i < toCheck.length; i += batchSize) {
    const batch = toCheck.slice(i, i + batchSize);
    const results = await checkBatch(batch);
    allResults.push(...results);
    process.stdout.write(`   ... ${Math.min(i + batchSize, toCheck.length)}/${toCheck.length} checked\r`);
  }
  console.log(`   ✓ All ${toCheck.length} URLs checked             `);
  
  for (const r of allResults) {
    if (r.ok === true) {
      if (r.note === 'bot-blocked') {
        issues.bot_blocked.push(r);
      } else if (r.location) {
        issues.redirects.push(r);
        issues.working_links.push(r);
      } else {
        issues.working_links.push(r);
      }
    } else {
      issues.broken_links.push(r);
    }
  }
  
  console.log(`   ✅ Working: ${issues.working_links.length}`);
  console.log(`   🔄 Redirects: ${issues.redirects.length}`);
  console.log(`   🤖 Bot-blocked (likely fine): ${issues.bot_blocked.length}`);
  console.log(`   ❌ Broken: ${issues.broken_links.length}`);
  
  // ── Write report ─────────────────────────────────────────────────────
  const report = {
    summary: {
      total_entries: benefits.length,
      duplicate_slugs: issues.duplicate_slugs.length,
      duplicate_companies: issues.duplicate_companies.length,
      duplicate_titles: issues.duplicate_titles.length,
      missing_fields: issues.missing_fields.length,
      empty_values: issues.empty_values.length,
      invalid_urls: issues.invalid_urls.length,
      invalid_categories: issues.invalid_categories.length,
      invalid_benefit_types: issues.invalid_benefit_types.length,
      broken_links: issues.broken_links.length,
      working_links: issues.working_links.length,
      bot_blocked: issues.bot_blocked.length,
      redirects: issues.redirects.length,
      urls_checked: toCheck.length,
    },
    issues,
  };
  
  writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf-8');
  
  // ── Print summary ─────────────────────────────────────────────────────
  const s = report.summary;
  console.log('\n' + '='.repeat(70));
  console.log('FINAL SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total entries:         ${s.total_entries}`);
  console.log(`Duplicate slugs:       ${s.duplicate_slugs}  ${s.duplicate_slugs ? '❌' : '✅'}`);
  console.log(`Duplicate companies:   ${s.duplicate_companies}  ${s.duplicate_companies ? '⚠️' : '✅'}`);
  console.log(`Duplicate titles:      ${s.duplicate_titles}  ${s.duplicate_titles ? '⚠️' : '✅'}`);
  console.log(`Missing fields:        ${s.missing_fields}  ${s.missing_fields ? '⚠️' : '✅'}`);
  console.log(`Suspicious values:     ${s.empty_values}  ${s.empty_values ? '⚠️' : '✅'}`);
  console.log(`Malformed URLs:        ${s.invalid_urls}  ${s.invalid_urls ? '❌' : '✅'}`);
  console.log(`Invalid categories:    ${s.invalid_categories}  ${s.invalid_categories ? '⚠️' : '✅'}`);
  console.log(`Invalid benefit types: ${s.invalid_benefit_types}  ${s.invalid_benefit_types ? '⚠️' : '✅'}`);
  console.log(`\nLink Check (${s.urls_checked} URLs sampled):`);
  console.log(`  ✅ Working:       ${s.working_links}`);
  console.log(`  🔄 Redirects:     ${s.redirects}`);
  console.log(`  🤖 Bot-blocked:   ${s.bot_blocked}`);
  console.log(`  ❌ Broken:        ${s.broken_links}`);
  
  if (issues.duplicate_slugs.length) {
    console.log('\n❌ DUPLICATE SLUGS:');
    issues.duplicate_slugs.forEach(d => {
      console.log(`  Slug '${d.slug}': ${d.companies[0]} (idx ${d.first_idx}) vs ${d.companies[1]} (idx ${d.second_idx})`);
    });
  }
  
  if (issues.broken_links.length) {
    console.log('\n❌ BROKEN LINKS:');
    issues.broken_links.forEach(b => {
      console.log(`  [${b.severity || 'MED'}] ${b.slug}: HTTP ${b.status}`);
      console.log(`        ${b.url}`);
    });
  }
  
  if (issues.duplicate_companies.length) {
    console.log(`\n⚠️  DUPLICATE COMPANIES (top 15 of ${issues.duplicate_companies.length}):`);
    issues.duplicate_companies.slice(0, 15).forEach(d => {
      console.log(`  ${d.company}: [${d.slug1}] "${d.value1}"  vs  [${d.slug2}] "${d.value2}"`);
    });
  }
  
  if (issues.invalid_categories.length) {
    console.log('\n⚠️  INVALID APP CATEGORIES:');
    issues.invalid_categories.slice(0, 10).forEach(c => {
      console.log(`  ${c.slug}: "${c.appCategory}"`);
    });
  }
  
  if (issues.missing_fields.length) {
    console.log('\n⚠️  MISSING FIELDS (top 10):');
    issues.missing_fields.slice(0, 10).forEach(m => {
      console.log(`  ${m.slug} (${m.company}): missing [${m.missing.join(', ')}]`);
    });
  }
  
  console.log(`\n📄 Full report: ${REPORT_FILE}`);
}

runAllChecks().catch(console.error);
