'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminSubmissionSidebar from '@/components/admin/AdminSubmissionSidebar'
import { formatDateShort } from '@/lib/format-date'

export default function AdminSubmissionDetailClient({ initialSubmission }: { initialSubmission: any }) {
    const router = useRouter()
    const [submission, setSubmission] = useState<any>(initialSubmission)
    const [processing, setProcessing] = useState(false)
    const [adminNote, setAdminNote] = useState(initialSubmission?.admin_notes || '')


    const [paymentLink, setPaymentLink] = useState<string>('')
    const [generatingLink, setGeneratingLink] = useState(false)

    const handleGeneratePaymentLink = async () => {
        setGeneratingLink(true)
        try {
            const res = await fetch('/api/admin/featured-payment-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId: submission.id }),
            })
            const data = await res.json()
            if (res.ok && data.url) {
                setPaymentLink(data.url)
            } else {
                alert(data.error || 'Failed to generate payment link')
            }
        } catch (err) {
            alert('Network error generating payment link')
        } finally {
            setGeneratingLink(false)
        }
    }

    const copyPaymentLink = () => {
        navigator.clipboard.writeText(paymentLink)
        alert('Payment link copied to clipboard')
    }

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

    if (!submission) return <div className="p-8 font-mono text-zinc-400 bg-[#090a0f] min-h-screen">Submission not found.</div>

    // Featured plan display values (defaults to monthly for legacy rows)
    const isWeekly = submission.featured_plan === 'weekly'
    const featuredPlanPrice = isWeekly ? '$25' : '$99'
    const featuredPlanDuration = isWeekly ? '7 days' : '30 days'
    const featuredPlanLabel = isWeekly ? '1 Week' : '30 Days'

    return (
        <div className="min-h-screen bg-[#090a0f] p-4 md:p-8 font-mono text-white">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/submissions" className="inline-flex items-center gap-2 text-sm font-bold uppercase mb-6 hover:text-accent-yellow text-zinc-400">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back to List
                </Link>

                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-white">{submission.company_name}</h1>
                        <div className="flex flex-wrap gap-2">
                            <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase border rounded ${submission.status === 'pending' ? 'bg-amber-500/15 text-accent-yellow border-amber-500/30' :
                                submission.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                                    submission.status === 'rejected' ? 'bg-red-500/15 text-red-300 border-red-500/30' :
                                        'bg-sky-500/15 text-sky-300 border-sky-500/30'
                                }`}>
                                {submission.status.replace('_', ' ')}
                            </span>
                            {submission.is_exclusive && (
                                <span className="inline-block px-2 py-1 text-[10px] font-black uppercase border border-white/15 bg-purple-100 text-purple-800">
                                    Exclusive
                                </span>
                            )}
                            {submission.featured_requested && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-black uppercase border border-white/15 bg-accent-yellow text-black">
                                    ⭐ Featured Requested
                                    {submission.featured_paid ? (
                                        <span className="ml-1 bg-emerald-600 text-white px-1 text-[9px]">PAID</span>
                                    ) : (
                                        <span className="ml-1 bg-orange-500 text-white px-1 text-[9px]">UNPAID</span>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-zinc-500 uppercase">Submitted On</p>
                        <p className="font-bold">{formatDateShort(submission.created_at)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5 md:p-6">
                            <h2 className="text-sm font-black uppercase border-b border-white/10 pb-2 mb-4 tracking-wider">Deal details</h2>

                            <div className="space-y-4">
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Benefit</span>
                                    <p className="font-medium text-[14px] text-zinc-100 leading-relaxed">{submission.benefit_description}</p>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Category / value</span>
                                    <p className="font-medium text-zinc-200">{submission.category} · ${submission.deal_value}</p>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Company website</span>
                                    <a href={submission.website_url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline break-all text-sm">
                                        {submission.website_url}
                                    </a>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Redemption</span>
                                    <p className="font-medium flex flex-wrap items-center gap-2">
                                        <span className="bg-white/10 text-zinc-300 px-2 py-0.5 rounded uppercase text-[10px] font-bold border border-white/10">{submission.redemption_method || 'link'}</span>
                                        <span className="font-mono text-[12px] bg-white/5 border border-white/10 px-2 py-1 rounded text-accent-yellow">{submission.redemption_link}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5 md:p-6">
                            <h2 className="text-sm font-black uppercase border-b border-white/10 pb-2 mb-4 tracking-wider">Review actions</h2>

                            <div className="mb-4">
                                <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1.5" htmlFor="admin-notes-reason">Admin notes / reason</label>
                                <textarea id="admin-notes-reason"
                                    className="w-full p-3 rounded-lg border border-white/15 bg-[#121318] text-white focus:border-accent-yellow/40 outline-none font-mono text-sm h-24 resize-none"
                                    placeholder="Notes for rejection or requested changes…"
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button type="button"
                                    onClick={() => handleAction('approve')}
                                    disabled={processing || submission.status === 'approved'}
                                    className="min-h-[44px] px-4 rounded-lg bg-emerald-600 text-white font-black uppercase text-[11px] border border-emerald-500/30 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Working…' : 'Approve & publish'}
                                </button>
                                <button type="button"
                                    onClick={() => handleAction('request_changes')}
                                    disabled={processing}
                                    className="min-h-[44px] px-4 rounded-lg bg-sky-600 text-white font-black uppercase text-[11px] border border-sky-500/30 hover:bg-sky-500 disabled:opacity-50"
                                >
                                    Request changes
                                </button>
                                <button type="button"
                                    onClick={() => handleAction('reject')}
                                    disabled={processing || submission.status === 'rejected'}
                                    className="min-h-[44px] px-4 rounded-lg bg-red-600 text-white font-black uppercase text-[11px] border border-red-500/30 hover:bg-red-500 disabled:opacity-50"
                                >
                                    Reject
                                </button>
                            </div>
                            {submission.status === 'approved' && (
                                <p className="mt-3 font-mono text-[10px] text-emerald-400">
                                    Already approved — deal was published to the catalog on approve.
                                </p>
                            )}
                        </div>
                    </div>

                    <AdminSubmissionSidebar
                        submission={submission}
                        featuredPlanLabel={featuredPlanLabel}
                        featuredPlanPrice={featuredPlanPrice}
                        featuredPlanDuration={featuredPlanDuration}
                        paymentLink={paymentLink}
                        generatingLink={generatingLink}
                        onGeneratePaymentLink={handleGeneratePaymentLink}
                        onCopyPaymentLink={copyPaymentLink}
                    />

                </div>
            </div>
        </div>
    )
}
