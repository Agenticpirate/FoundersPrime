import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

async function verifyAdmin() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { ok: false, error: 'Unauthorized', status: 401 }

    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('email', user.email)
        .single()

    if (!adminUser) return { ok: false, error: 'Forbidden', status: 403 }
    return { ok: true }
}

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
