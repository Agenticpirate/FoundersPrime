import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'

function getServiceRoleClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return null
    return createServiceClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const auth = await verifyAdmin()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const supabase = getServiceRoleClient()
    if (!supabase) {
        return NextResponse.json({ error: 'Service role not configured' }, { status: 503 })
    }

    const { data, error } = await supabase
        .from('deal_submissions')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ submission: data })
}
