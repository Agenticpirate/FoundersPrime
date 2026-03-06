'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

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

            if (error) {
                console.error('Error fetching submissions:', error)
            } else {
                setSubmissions(data || [])
            }
            setLoading(false)
        }

        fetchSubmissions()
    }, [])

    if (loading) return <div className="p-8 font-mono">Loading submissions...</div>

    return (
        <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center bg-white p-6 border-4 border-black shadow-[4px_4px_0_0_#000]">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight font-display">Deal Submissions</h1>
                    <p className="text-gray-600 font-mono text-sm">Review and manage community submissions</p>
                </div>
                <div className="text-sm font-bold bg-yellow-100 px-4 py-2 border-2 border-black font-mono">
                    {submissions.filter(s => s.status === 'pending').length} PENDING REVIEW
                </div>
            </div>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b-4 border-black uppercase text-xs tracking-wider font-mono">
                                <th className="p-4 font-black border-r-2 border-black">Company</th>
                                <th className="p-4 font-black border-r-2 border-black">Category</th>
                                <th className="p-4 font-black border-r-2 border-black">Value</th>
                                <th className="p-4 font-black border-r-2 border-black">Status</th>
                                <th className="p-4 font-black border-r-2 border-black">Submitted</th>
                                <th className="p-4 font-black text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-sm">
                            {submissions.map((sub) => (
                                <tr key={sub.id} className="border-b-2 border-gray-200 hover:bg-yellow-50 transition-colors">
                                    <td className="p-4 font-bold border-r-2 border-gray-100 text-black">
                                        <div className="flex items-center gap-3">
                                            {sub.logo_url && (
                                                <div className="relative w-8 h-8 flex-shrink-0">
                                                    <Image src={sub.logo_url} alt="" fill sizes="32px" className="object-contain border border-black p-1 bg-white" />
                                                </div>
                                            )}
                                            {sub.company_name}
                                        </div>
                                    </td>
                                    <td className="p-4 border-r-2 border-gray-100">
                                        <span className="bg-gray-100 px-2 py-1 text-xs border border-black font-bold">{sub.category}</span>
                                    </td>
                                    <td className="p-4 font-bold border-r-2 border-gray-100 text-green-600">${sub.deal_value}</td>
                                    <td className="p-4 border-r-2 border-gray-100">
                                        <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase border border-black ${sub.status === 'pending' ? 'bg-yellow-200 text-yellow-900' :
                                            sub.status === 'approved' ? 'bg-green-200 text-green-900' :
                                                sub.status === 'rejected' ? 'bg-red-200 text-red-900' :
                                                    'bg-blue-200 text-blue-900'
                                            }`}>
                                            {sub.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500 border-r-2 border-gray-100">
                                        {new Date(sub.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/admin/submissions/${sub.id}`}
                                            className="inline-block px-4 py-2 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 transition-all border-2 border-transparent hover:border-black shadow-[2px_2px_0_0_#999]"
                                        >
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {submissions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-400 font-bold uppercase">
                                        No submissions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
