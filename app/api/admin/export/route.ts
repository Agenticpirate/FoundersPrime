import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'
const headers = ['ID', 'Slug', 'Title', 'Provider', 'Category', 'Subcategory', 'Value', 'Website', 'Featured', 'Dofollow', 'Description']

const escapeCSV = (val: any) => {
  if (val === null || val === undefined) return ''
  let str = String(val)
  // Escape quotes
  str = str.replace(/"/g, '""')
  // Wrap in quotes if it contains comma, newline, or quotes
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str}"`
  }
  return str
}

function hasDofollowTag(tags: unknown): boolean {
  if (!Array.isArray(tags)) return false
  for (let i = 0; i < tags.length; i++) {
    if (tags[i] === 'dofollow') return true
  }
  return false
}





export const dynamic = 'force-dynamic'

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function GET(request: Request) {
  try {
    // 1. Authorize Admin
    const auth = await verifyAdmin()
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status || 401 })
    }

    const url = new URL(request.url)
    const format = url.searchParams.get('format') || 'csv'

    const supabase = getServiceRoleClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database client not configured.' }, { status: 500 })
    }

    // 2. Fetch all deals/programs from the database
    const { data: deals, error } = await supabase
      .from('deals')
      .select('*')
      .order('title', { ascending: true })

    if (error) {
      console.error('Export fetch error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const records = deals || []

    // 3. Format Data
    if (format === 'txt') {
      // Notepad (TXT) Layout
      let txtContent = `FOUNDERSPRIME DATABASE CATALOG EXPORT\n`
      txtContent += `Generated: ${new Date().toISOString()}\n`
      txtContent += `Total Records: ${records.length}\n`
      txtContent += `================================================================================\n\n`

      records.forEach((r: any, idx: number) => {
        txtContent += `[#${idx + 1}] ${r.title}\n`
        txtContent += `--------------------------------------------------------------------------------\n`
        txtContent += `Provider:    ${r.provider || 'N/A'}\n`
        txtContent += `Category:    ${r.category || 'N/A'} (Sub: ${r.subcategory || 'N/A'})\n`
        txtContent += `Value:       ${r.value || 'N/A'}\n`
        txtContent += `Website:     ${r.provider_website || r.application_url || 'N/A'}\n`
        txtContent += `Status:      ${r.status || 'active'}\n`
        txtContent += `Featured:    ${r.featured ? 'Yes' : 'No'}\n`
        txtContent += `Dofollow:    ${hasDofollowTag(r.tags) ? 'Yes' : 'No'}\n`
        txtContent += `Description: ${r.description || 'No description available.'}\n`
        txtContent += `================================================================================\n\n`
      })

      return new Response(txtContent, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': 'attachment; filename="foundersprime_database_export.txt"'
        }
      })
    } else if (format === 'json') {
      // JSON format
      return NextResponse.json({
        total: records.length,
        exportedAt: new Date().toISOString(),
        deals: records
      })
    } else {
      // Excel/CSV Layout (Default)

      let csvContent = headers.join(',') + '\n'
      records.forEach((r: any) => {
        const row = [
          r.id,
          r.slug,
          r.title,
          r.provider,
          r.category,
          r.subcategory,
          r.value,
          r.provider_website || r.application_url,
          r.featured ? 'TRUE' : 'FALSE',
          hasDofollowTag(r.tags) ? 'TRUE' : 'FALSE',
          r.description
        ]
        csvContent += row.map(escapeCSV).join(',') + '\n'
      })

      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="foundersprime_database_export.csv"'
        }
      })
    }
  } catch (err: any) {
    console.error('Export GET error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
