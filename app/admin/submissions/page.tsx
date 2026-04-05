'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('deal_submissions')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setSubmissions(data || [])
      setLoading(false)
    }
    fetchSubmissions()
  }, [])

  if (loading) return (
    <>
      <AdminHeader />
      <div className="p-6 font-mono text-sm animate-pulse">Loading submissions...</div>
    </>
  )

  const pending = submissions.filter(s => s.status === 'pending').length

  return (
    <>
      <AdminHeader />
      <div className="p-3 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-mono text-lg md:text-xl font-black uppercase">Submissions</h1>
          {pending > 0 && (
            <span className="font-mono text-[10px] font-bold bg-yellow-200 text-yellow-900 px-2 py-1 border border-black">{pending} PENDING</span>
          )}
        </div>

        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] overflow-x-auto">
          <table className="w-full font-mono text-[11px] md:text-xs">
            <thead className="bg-gray-50 border-b-2 border-black">
              <tr>
                <th className="px-3 py-2 text-left font-bold uppercase">Company</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden sm:table-cell">Category</th>
                <th className="px-3 py-2 text-left font-bold uppercase">Value</th>
                <th className="px-3 py-2 text-left font-bold uppercase">Status</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden md:table-cell">Date</th>
                <th className="px-3 py-2 text-right font-bold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {sub.logo_url && (
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Image src={sub.logo_url} alt="" fill sizes="24px" className="object-contain border border-black p-0.5 bg-white" />
                        </div>
                      )}
                      <span className="font-bold truncate">{sub.company_name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">
                    <span className="bg-gray-100 px-1.5 py-0.5 text-[9px] border border-black font-bold">{sub.category}</span>
                  </td>
                  <td className="px-3 py-2 font-bold text-green-600">${sub.deal_value}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase border border-black ${
                      sub.status === 'pending' ? 'bg-yellow-200 text-yellow-900' :
                      sub.status === 'approved' ? 'bg-green-200 text-green-900' :
                      'bg-red-200 text-red-900'
                    }`}>{sub.status}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-400 hidden md:table-cell">{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-right">
                    <Link href={`/admin/submissions/${sub.id}`} className="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase hover:bg-gray-800 border border-black">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 font-bold">No submissions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
