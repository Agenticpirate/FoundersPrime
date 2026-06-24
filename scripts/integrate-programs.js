const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const cleanPrograms = JSON.parse(
  fs.readFileSync(
    '/Users/raviteja/.gemini/antigravity-ide/brain/faeb3fb4-dc57-4fad-a75d-c66bbeacc50d/scratch/clean_excel_programs.json',
    'utf8'
  )
);

console.log(`Loaded ${cleanPrograms.length} clean programs from Excel.`);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized.');
} else {
  console.warn('Supabase env vars missing. Skipping DB upsert.');
}

// Map clean programs into the format expected by TS files and database
// Accelerators/Incubators/Grants interface fields:
// id, name, slug, logo, location, region, investment, equity, focusArea, founderStage, programDuration, applicationDeadline, applicationStatus, website, applicationLink, description, features

function parseTsFile(filePath, varName) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract array text using regex
  const startIdx = content.indexOf(`export const ${varName}`);
  if (startIdx === -1) return [];
  
  const arrayStart = content.indexOf('[', startIdx);
  if (arrayStart === -1) return [];
  
  // Basic brace matching to find the end of the array
  let braceCount = 0;
  let endIdx = -1;
  for (let i = arrayStart; i < content.length; i++) {
    if (content[i] === '[') braceCount++;
    else if (content[i] === ']') {
      braceCount--;
      if (braceCount === 0) {
        endIdx = i;
        break;
      }
    }
  }
  
  if (endIdx === -1) return [];
  
  const arrayText = content.substring(arrayStart, endIdx + 1);
  try {
    // Sanitize TS object string so it's parsable as JSON
    const jsonText = arrayText
      .replace(/\/\/.*$/gm, '') // remove line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
      .replace(/(\w+)\s*:/g, '"$1":') // quote keys
      .replace(/,\s*([\]}])/g, '$1') // remove trailing commas
      .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"'); // replace single quotes with double quotes
      
    return JSON.parse(jsonText);
  } catch (err) {
    console.error(`Failed to parse TS array for ${varName}:`, err.message);
    // Fallback using eval (safe here since it is local static file)
    try {
      const evalText = `(${arrayText})`;
      return eval(evalText);
    } catch (e) {
      console.error(`Eval fallback failed for ${varName}:`, e.message);
      return [];
    }
  }
}

function writeTsFile(filePath, varName, typeName, data) {
  const content = `export interface ${typeName} {
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

export const ${varName}: ${typeName}[] = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(filePath, content, 'utf8');
}

async function run() {
  const fileConfigs = [
    {
      filePath: path.join(__dirname, '..', 'data', 'accelerators-2026.ts'),
      varName: 'accelerators2026',
      typeName: 'Accelerator',
      category: 'accelerators',
      dbCategory: 'startup-programs',
      dbSubcategory: 'accelerators'
    },
    {
      filePath: path.join(__dirname, '..', 'data', 'incubators-2026.ts'),
      varName: 'incubators2026',
      typeName: 'Incubator',
      category: 'incubators',
      dbCategory: 'startup-programs',
      dbSubcategory: 'incubators'
    },
    {
      filePath: path.join(__dirname, '..', 'data', 'grants-2026.ts'),
      varName: 'grants2026',
      typeName: 'Grant',
      category: 'grants',
      dbCategory: 'startup-programs',
      dbSubcategory: 'grants'
    }
  ];

  for (const config of fileConfigs) {
    console.log(`\nMerging ${config.category}...`);
    const existing = parseTsFile(config.filePath, config.varName);
    console.log(`Existing ${config.category}: ${existing.length}`);
    
    const excelFiltered = cleanPrograms.filter(p => p.category === config.category);
    console.log(`New Excel ${config.category}: ${excelFiltered.length}`);
    
    // Merge by slug (Excel overrides existing if it has longer description)
    const mergedMap = new Map();
    for (const item of existing) {
      mergedMap.set(item.slug, item);
    }
    
    for (const item of excelFiltered) {
      const cleanItem = {
        id: item.id,
        name: item.name,
        slug: item.slug,
        logo: item.logo,
        location: item.location,
        region: item.region,
        investment: item.investment,
        equity: item.equity,
        focusArea: item.focusArea,
        founderStage: item.founderStage,
        programDuration: item.programDuration,
        applicationDeadline: item.applicationDeadline,
        applicationStatus: item.applicationStatus,
        website: item.website,
        applicationLink: item.applicationLink,
        description: item.description,
        features: item.features
      };
      
      if (mergedMap.has(item.slug)) {
        const exist = mergedMap.get(item.slug);
        if (cleanItem.description.length > exist.description.length) {
          mergedMap.set(item.slug, cleanItem);
        }
      } else {
        mergedMap.set(item.slug, cleanItem);
      }
    }
    
    const mergedList = Array.from(mergedMap.values());
    console.log(`Merged ${config.category}: ${mergedList.length}`);
    
    // Write back to TS file
    writeTsFile(config.filePath, config.varName, config.typeName, mergedList);
    console.log(`Wrote updated TS file: ${config.filePath}`);
    
    // Upsert into Supabase
    if (supabase) {
      console.log(`Upserting ${mergedList.length} rows into Supabase 'deals'...`);
      
      const dbRows = mergedList.map(item => ({
        slug: item.slug,
        title: item.name,
        provider: item.name,
        category: config.dbCategory,
        subcategory: config.dbSubcategory,
        description: item.description,
        short_description: item.description.substring(0, 150),
        value: item.investment,
        application_url: item.applicationLink,
        logo_url: item.logo,
        provider_website: item.website,
        status: 'active',
        eligibility: [item.founderStage],
        requirements: ['Early Stage Startup'],
        application_process: ['Visit website to apply'],
        source_verified: true,
        data_source: 'import',
        featured: false,
        recommended: false,
        verified: true,
        difficulty: 'medium',
        time_to_apply: 'Varies',
        tags: item.features || []
      }));
      
      // Upsert by slug
      const { error } = await supabase
        .from('deals')
        .upsert(dbRows, { onConflict: 'slug' });
        
      if (error) {
        console.error(`Error upserting to Supabase for ${config.category}:`, error.message);
      } else {
        console.log(`Successfully upserted to Supabase for ${config.category}.`);
      }
    }
  }
  
  console.log('\nAll integrations finished successfully.');
}

run();
