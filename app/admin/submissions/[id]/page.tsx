'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminSubmissionDetail() {
    const { id } = useParams()
    const router = useRouter()
    const [submission, setSubmission] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [adminNote, setAdminNote] = useState('')

    useEffect(() => {
        const fetchSubmission = async () => {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('deal_submissions')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching submission:', error)
            } else {
                setSubmission(data)
                setAdminNote(data.admin_notes || '')
            }
            setLoading(false)
        }

        if (id) fetchSubmission()
    }, [id])

    const handleAction = async (action: 'approve' | 'reject' | 'request_changes') => {
        if (!confirm(`Are you sure you want to ${action.replace('_', ' ')} this submission?`)) return

        setProcessing(true)
        try {
            const response = await fetch('/api/admin/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: submission.id,
                    action,
                    admin_notes: adminNote
                })
            })

            if (response.ok) {
                alert('Action completed successfully!')
                router.push('/admin/submissions')
            } else {
                const error = await response.json()
                alert(`Error: ${error.message || 'Action failed'}`)
            }
        } catch (error) {
            console.error('Action error:', error)
            alert('An unexpected error occurred.')
        } finally {
            setProcessing(false)
        }
    }

    if (loading) return <div className="p-8 font-mono">Loading details...</div>
    if (!submission) return <div className="p-8 font-mono">Submission not found.</div>

    return (
        <div className="min-h-screen bg-[#f6f8f8] p-8 font-mono text-[#111]">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/submissions" className="inline-flex items-center gap-2 text-sm font-bold uppercase mb-6 hover:underline text-gray-600">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back to List
                </Link>

                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{submission.company_name}</h1>
                        <div className="flex gap-2">
                            <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase border border-black ${submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                }`}>
                                {submission.status.replace('_', ' ')}
                            </span>
                            {submission.is_exclusive && (
                                <span className="inline-block px-2 py-1 text-[10px] font-black uppercase border border-black bg-purple-100 text-purple-800">
                                    Exclusive
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-500 uppercase">Submitted On</p>
                        <p className="font-bold">{new Date(submission.created_at).toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 pb-2 mb-4">Deal Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Benefit</label>
                                    <p className="font-bold text-lg">{submission.benefit_description}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category / Value</label>
                                    <p className="font-medium">{submission.category} • ${submission.deal_value}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Company Website</label>
                                    <a href={submission.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                        {submission.website_url}
                                    </a>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Redemption</label>
                                    <p className="font-medium">
                                        <span className="bg-gray-200 px-1 rounded uppercase text-xs">{submission.redemption_method}</span>
                                        <span className="ml-2 font-mono bg-gray-100 p-1">{submission.redemption_link}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 pb-2 mb-4">Admin Actions</h2>

                            <div className="mb-4">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Admin Notes / Reason</label>
                                <textarea
                                    className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none font-medium h-24"
                                    placeholder="Enter notes for rejection or requested changes..."
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => handleAction('approve')}
                                    disabled={processing || submission.status === 'approved'}
                                    className="px-6 py-2 bg-green-500 text-white font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Approve & Publish
                                </button>
                                <button
                                    onClick={() => handleAction('request_changes')}
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-500 text-white font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Request Changes
                                </button>
                                <button
                                    onClick={() => handleAction('reject')}
                                    disabled={processing || submission.status === 'rejected'}
                                    className="px-6 py-2 bg-red-500 text-white font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-sm font-black uppercase mb-4 text-center">Logo Preview</h2>
                            <div className="w-full aspect-square border-2 border-gray-100 flex items-center justify-center p-4">
                                {submission.logo_url ? (
                                    <img src={submission.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-gray-400 text-xs">No Logo</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-sm font-black uppercase mb-4">Contact Info</h2>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Submitter Email</label>
                                <a href={`mailto:${submission.submitter_email}`} className="text-blue-600 hover:underline font-bold text-sm truncate block">
                                    {submission.submitter_email}
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
