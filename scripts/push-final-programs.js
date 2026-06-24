/**
 * Push final_programs.json (DuckDuckGo logos + fixed links) to Supabase + TS files
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const finalPrograms = JSON.parse(
  fs.readFileSync(
    '/Users/raviteja/.gemini/antigravity-ide/brain/faeb3fb4-dc57-4fad-a75d-c66bbeacc50d/scratch/final_programs.json',
    'utf8'
  )
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const configs = [
  { filePath: path.join(__dirname, '..', 'data', 'accelerators-2026.ts'), varName: 'accelerators2026', typeName: 'Accelerator', category: 'accelerators' },
  { filePath: path.join(__dirname, '..', 'data', 'incubators-2026.ts'), varName: 'incubators2026', typeName: 'Incubator', category: 'incubators' },
  { filePath: path.join(__dirname, '..', 'data', 'grants-2026.ts'), varName: 'grants2026', typeName: 'Grant', category: 'grants' }
];

async function pushFinal() {
  // 1. Update TS files
  for (const cfg of configs) {
    const catPrograms = finalPrograms.filter(p => p.category === cfg.category);
    const content = `export interface ${cfg.typeName} {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  location: string;
  region: string;
  investment: string;
  equity: string;
  focusArea: string;
  founderStage: string;
  programDuration: string;
  applicationDeadline?: string;
  applicationStatus: 'Active' | 'Rolling' | 'Closed' | 'Opening Soon' | 'Invite Only';
  website: string;
  applicationLink: string;
  description: string;
  features?: string[];
}

export const ${cfg.varName}: ${cfg.typeName}[] = ${JSON.stringify(catPrograms, null, 2)};
`;
    fs.writeFileSync(cfg.filePath, content, 'utf8');
    console.log(`✅ TS: ${cfg.category} (${catPrograms.length} records) - logos updated to DuckDuckGo`);
  }

  // 2. Upsert to Supabase in batches
  console.log('\nPushing to Supabase...');
  let ok = 0, fail = 0;
  const batchSize = 50;

  for (let i = 0; i < finalPrograms.length; i += batchSize) {
    const batch = finalPrograms.slice(i, i + batchSize);
    const rows = batch.map(p => ({
      slug: p.slug,
      title: p.name,
      provider: p.name,
      category: 'startup-programs',
      subcategory: p.category,
      description: p.description,
      short_description: p.description.substring(0, 150),
      value: p.investment,
      application_url: p.applicationLink,
      logo_url: p.logo,
      provider_website: p.website,
      status: 'active',
      eligibility: [p.founderStage],
      requirements: ['Early Stage Startup'],
      application_process: ['Visit website to apply'],
      source_verified: true,
      data_source: 'import',
      featured: false,
      recommended: false,
      verified: true,
      difficulty: 'medium',
      time_to_apply: 'Varies',
      tags: p.features || []
    }));

    const { error } = await supabase.from('deals').upsert(rows, { onConflict: 'slug' });
    if (error) {
      console.error(`  ❌ Batch ${i}-${i+batchSize}: ${error.message}`);
      fail += batch.length;
    } else {
      console.log(`  ✅ Batch ${i+1}–${Math.min(i+batchSize, finalPrograms.length)} OK`);
      ok += batch.length;
    }
  }

  // 3. Quick verification spot-check
  const { data: sample } = await supabase
    .from('deals')
    .select('title, logo_url, application_url, provider_website')
    .eq('category', 'startup-programs')
    .limit(5);

  console.log('\n=== DB SPOT CHECK ===');
  (sample || []).forEach(r => {
    console.log(`  ${r.title}`);
    console.log(`    logo: ${r.logo_url}`);
    console.log(`    appUrl: ${r.application_url}`);
  });

  console.log(`\n=== DONE: ${ok} ✅  Failed: ${fail} ===`);
}

pushFinal().catch(e => { console.error(e.message); process.exit(1); });
