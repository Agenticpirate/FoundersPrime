import { notFound, redirect } from 'next/navigation'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { verifyAdminServer } from '@/lib/admin/verify-admin-server'
import AdminSubmissionDetailClient from '@/components/admin/AdminSubmissionDetailClient'

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export default async function AdminSubmissionDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const auth = await verifyAdminServer()
  if (!auth.ok) {
    redirect('/login?redirect=/admin/submissions')
  }

  const supabase = getServiceRoleClient()
  if (!supabase) {
    notFound()
  }

  const { data, error } = await supabase
    .from('deal_submissions')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    notFound()
  }

  return <AdminSubmissionDetailClient initialSubmission={data} />
}
