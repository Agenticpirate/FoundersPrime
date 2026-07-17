'use client'

import { useEffect, useState } from 'react'
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
            try {
                const res = await fetch(`/api/admin/submissions/${id}`)
                const json = await res.json()
                if (res.ok && json.submission) {
                    setSubmission(json.submission)
                    setAdminNote(json.submission.admin_notes || '')
                } else {
                    console.error('Error fetching submission:', json.error)
                }
            } catch (e) {
                console.error('Error fetching submission:', e)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchSubmission()
    }, [id])

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

    if (loading) return <div className="p-8 font-mono text-zinc-400 bg-[#090a0f] min-h-screen">Loading details…</div>
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
                        <p className="font-bold">{new Date(submission.created_at).toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5 md:p-6">
                            <h2 className="text-sm font-black uppercase border-b border-white/10 pb-2 mb-4 tracking-wider">Deal details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Benefit</label>
                                    <p className="font-medium text-[14px] text-zinc-100 leading-relaxed">{submission.benefit_description}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Category / value</label>
                                    <p className="font-medium text-zinc-200">{submission.category} · ${submission.deal_value}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Company website</label>
                                    <a href={submission.website_url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline break-all text-sm">
                                        {submission.website_url}
                                    </a>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Redemption</label>
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
                                <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Admin notes / reason</label>
                                <textarea
                                    className="w-full p-3 rounded-lg border border-white/15 bg-[#121318] text-white focus:border-accent-yellow/40 outline-none font-mono text-sm h-24 resize-none"
                                    placeholder="Notes for rejection or requested changes…"
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleAction('approve')}
                                    disabled={processing || submission.status === 'approved'}
                                    className="min-h-[44px] px-4 rounded-lg bg-emerald-600 text-white font-black uppercase text-[11px] border border-emerald-500/30 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Working…' : 'Approve & publish'}
                                </button>
                                <button
                                    onClick={() => handleAction('request_changes')}
                                    disabled={processing}
                                    className="min-h-[44px] px-4 rounded-lg bg-sky-600 text-white font-black uppercase text-[11px] border border-sky-500/30 hover:bg-sky-500 disabled:opacity-50"
                                >
                                    Request changes
                                </button>
                                <button
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

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5">
                            <h2 className="text-[11px] font-black uppercase mb-3 text-zinc-400 tracking-wider">Logo preview</h2>
                            <div className="w-full aspect-square rounded-lg border border-white/10 bg-white/5 flex items-center justify-center p-4">
                                {submission.logo_url ? (
                                    <img src={submission.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-zinc-600 text-xs font-mono">No logo</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5">
                            <h2 className="text-[11px] font-black uppercase mb-3 text-zinc-400 tracking-wider">Contact</h2>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Submitter email</label>
                                {submission.submitter_email ? (
                                    <a href={`mailto:${submission.submitter_email}`} className="text-sky-400 hover:underline font-bold text-sm break-all">
                                        {submission.submitter_email}
                                    </a>
                                ) : (
                                    <p className="text-zinc-600 text-sm font-mono">Not provided</p>
                                )}
                            </div>
                        </div>

                        {/* Featured Listing — only shown if requested */}
                        {submission.featured_requested && (
                            <div className="bg-[#0d0e12] border border-white/10 p-6 ">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-black uppercase flex items-center gap-1">
                                        <span className="text-amber-500">⭐</span> Featured Listing
                                    </h2>
                                    {submission.featured_paid ? (
                                        <span className="bg-emerald-600 text-white border border-white/15 px-2 py-0.5 text-[9px] font-black uppercase">PAID</span>
                                    ) : (
                                        <span className="bg-orange-500 text-white border border-white/15 px-2 py-0.5 text-[9px] font-black uppercase">UNPAID</span>
                                    )}
                                </div>

                                <div className="mb-3 flex items-center gap-2">
                                    <span className="bg-black text-accent-yellow border border-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">
                                        {featuredPlanLabel} · {featuredPlanPrice}
                                    </span>
                                </div>

                                <p className="text-xs text-zinc-400 mb-3 leading-snug">
                                    Submitter requested a Featured listing ({featuredPlanPrice} / {featuredPlanDuration}).
                                    {submission.status === 'pending' && ' Approve the submission first, then generate the payment link.'}
                                </p>

                                {submission.featured_paid && submission.featured_until && (
                                    <div className="bg-green-50 border-2 border-green-500 p-2 mb-3 text-xs font-bold text-green-800">
                                        Pinned until {new Date(submission.featured_until).toLocaleDateString()}
                                    </div>
                                )}

                                {/* Generate payment link */}
                                {submission.status === 'approved' && !submission.featured_paid && (
                                    <>
                                        {!paymentLink ? (
                                            <button
                                                onClick={handleGeneratePaymentLink}
                                                disabled={generatingLink}
                                                className="w-full px-3 py-2 bg-accent-yellow text-black font-black uppercase text-xs border border-accent-yellow  hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {generatingLink ? 'Generating…' : 'Generate Payment Link'}
                                            </button>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="bg-white/5 border border-white/15 p-2 text-[10px] font-mono break-all text-zinc-300">
                                                    {paymentLink}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={copyPaymentLink}
                                                        className="px-2 py-1.5 bg-black text-white font-bold uppercase text-[10px] border border-white/15 hover:bg-gray-800"
                                                    >
                                                        Copy
                                                    </button>
                                                    <a
                                                        href={`mailto:${submission.submitter_email || ''}?subject=${encodeURIComponent('Your Featured Listing payment link')}&body=${encodeURIComponent(`Hi,\n\nThanks for choosing Featured listing for ${submission.company_name} on FoundersPrime.\n\nPay ${featuredPlanPrice} here to activate your ${featuredPlanDuration} pinned placement:\n\n${paymentLink}\n\n— FoundersPrime`)}`}
                                                        className="px-2 py-1.5 bg-blue-500 text-white font-bold uppercase text-[10px] border border-white/15 hover:bg-blue-600 text-center"
                                                    >
                                                        Email it
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {submission.status === 'pending' && (
                                    <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2 font-bold">
                                        Approve the submission to enable payment link.
                                    </p>
                                )}

                                {(submission.status === 'rejected' || submission.status === 'changes_requested') && !submission.featured_paid && (
                                    <p className="text-[11px] text-zinc-500">
                                        No payment due — submission was {submission.status.replace('_', ' ')}.
                                    </p>
                                )}

                                {submission.featured_paid && (
                                    <a
                                        href="https://app.dodopayments.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-3 py-2 rounded-lg bg-transparent font-bold uppercase text-[11px] border border-red-500/50 text-red-400 hover:bg-red-500/10"
                                    >
                                        Refund in Dodo →
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
