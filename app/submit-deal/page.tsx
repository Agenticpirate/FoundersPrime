'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CATEGORIES = [
    { value: 'cloud', label: 'Cloud Credits', icon: 'cloud', desc: 'AWS, GCP, Azure, etc.' },
    { value: 'saas', label: 'SaaS Discount', icon: 'dns', desc: 'Software and API access' },
    { value: 'marketing', label: 'Marketing/Ads', icon: 'campaign', desc: 'Ad spend & growth tools' },
    { value: 'hiring', label: 'Hiring/Payroll', icon: 'groups', desc: 'HR, payroll & hiring platforms' },
    { value: 'legal', label: 'Legal/Finance', icon: 'gavel', desc: 'Legal help, accounting & banking' },
    { value: 'other', label: 'Other Perks', icon: 'more_horiz', desc: 'Anything else for startups' }
]

export default function SubmitDealPage() {
    const [logoMethod, setLogoMethod] = useState<'url' | 'upload'>('url')
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [redemptionMethod, setRedemptionMethod] = useState<'link' | 'code'>('link')
    const [challenge, setChallenge] = useState({ num1: 0, num2: 0, answer: '' })
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [isHuman, setIsHuman] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Generate dynamic challenge on client mount
    useEffect(() => {
        const num1 = Math.floor(Math.random() * 10) + 1
        const num2 = Math.floor(Math.random() * 10) + 1
        setChallenge({
            num1,
            num2,
            answer: (num1 + num2).toString()
        })
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const checkSecurity = (val: string) => {
        setSecurityAnswer(val)
        setIsHuman(val.trim() === challenge.answer)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [tier, setTier] = useState<'standard' | 'featured'>('standard')
    const [featuredPlan, setFeaturedPlan] = useState<'weekly' | 'monthly'>('weekly')
    
    // Snapshot of what the user submitted
    const [submittedTier, setSubmittedTier] = useState<'standard' | 'featured'>('standard')
    const [submittedPrice, setSubmittedPrice] = useState<string>('$25')
    const [submittedDuration, setSubmittedDuration] = useState<string>('7 days')

    const featuredPrice = featuredPlan === 'weekly' ? '$25' : '$99'
    const featuredAnchor = featuredPlan === 'weekly' ? '$99' : '$299'
    const featuredDuration = featuredPlan === 'weekly' ? '7 days' : '30 days'

    const formLoadedAt = useRef<number>(Date.now())
    useEffect(() => {
        formLoadedAt.current = Date.now()
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        if (params.get('tier') === 'featured') {
            setTier('featured')
        }
        const plan = params.get('plan')
        if (plan === 'weekly' || plan === 'monthly') {
            setFeaturedPlan(plan)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isHuman) {
            setErrorMessage('Please complete the security check correctly.')
            setSubmissionStatus('error')
            return
        }

        if (!selectedCategory) {
            setErrorMessage('Please select a deal category.')
            setSubmissionStatus('error')
            return
        }

        setIsSubmitting(true)
        setSubmissionStatus('idle')
        setErrorMessage('')

        const form = e.currentTarget
        const formData = new FormData(form)
        const data = {
            company_name: formData.get('company_name'),
            website_url: formData.get('website_url'),
            logo_url: logoMethod === 'url' ? formData.get('logo_url') : previewUrl,
            benefit_description: formData.get('benefit_description'),
            category: selectedCategory,
            deal_value: formData.get('deal_value'),
            redemption_method: redemptionMethod,
            redemption_link: formData.get('redemption_link'),
            is_exclusive: formData.get('is_exclusive') === 'on',
            submitter_email: formData.get('submitter_email'),
            featured_requested: tier === 'featured',
            featured_plan: featuredPlan,
            // Anti-bot signals
            website_link: formData.get('website_link'), // honeypot
            fill_time_ms: Date.now() - formLoadedAt.current,
        }

        try {
            const response = await fetch('/api/submit-deal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json().catch(() => ({}))

            if (response.ok) {
                setSubmittedTier(tier)
                setSubmittedPrice(featuredPrice)
                setSubmittedDuration(featuredDuration)
                setSubmissionStatus('success')
                form.reset()
                setSelectedCategory('')
                setPreviewUrl('')
                setIsHuman(false)
                setSecurityAnswer('')
                const num1 = Math.floor(Math.random() * 10) + 1
                const num2 = Math.floor(Math.random() * 10) + 1
                setChallenge({ num1, num2, answer: (num1 + num2).toString() })
            } else {
                setSubmissionStatus('error')
                setErrorMessage(result?.error || `Submission failed (${response.status}). Please try again.`)
            }
        } catch (error) {
            console.error('Submission error:', error)
            setSubmissionStatus('error')
            setErrorMessage('Network error. Please check your connection and try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#000000] text-white">
            <Header />

            <main className="flex-1 pattern-grid-lg py-12 md:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Hero section */}
                    <div className="mb-10 md:mb-12 text-center">
                        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                            Accepting Submissions
                        </div>
                        <h1 className="font-heading text-3xl md:text-5xl font-black uppercase mb-3 tracking-tight text-white">
                            Submit Your <span className="text-yellow-400">Deal</span>
                        </h1>
                        <p className="font-sans text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
                            Put your product in front of thousands of vetted founders. We only list high-quality, exclusive perks.
                            <span className="inline-block bg-yellow-400/10 text-yellow-400 px-2.5 py-0.5 rounded-md mt-2 md:ml-2 md:mt-0 font-mono text-xs border border-yellow-400/20">Zero fees.</span>
                        </p>
                    </div>

                    {submissionStatus === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="relative bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 md:p-12 text-center overflow-hidden shadow-2xl"
                        >
                            {/* Particles background */}
                            <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
                                {[...Array(8)].map((_, i) => {
                                    const angle = (i / 8) * Math.PI * 2
                                    return (
                                        <motion.span
                                            key={i}
                                            className="absolute top-[64px] md:top-[80px] w-2 h-2 bg-yellow-400 rounded-full"
                                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                x: Math.cos(angle) * 110,
                                                y: Math.sin(angle) * 110,
                                                scale: [0, 1.2, 0.4],
                                            }}
                                            transition={{ duration: 1.2, delay: 0.2 + i * 0.03, ease: 'easeOut' }}
                                        />
                                    )
                                })}
                            </div>

                            <motion.div
                                initial={{ scale: 0, rotate: -25 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                                className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full mb-6"
                            >
                                <span className="material-symbols-outlined text-4xl md:text-5xl">check_circle</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="font-heading text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tight text-white"
                            >
                                Submission Received!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-sans text-xs md:text-sm text-gray-400 mb-8 max-w-md mx-auto leading-relaxed"
                            >
                                Your deal request has been logged. Here is what you can expect next from our vetting process.
                            </motion.p>

                            {/* Timeline style details */}
                            <motion.ol
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
                                }}
                                className="text-left max-w-lg mx-auto space-y-4 mb-8"
                            >
                                {(submittedTier === 'featured'
                                    ? [
                                        { n: '1', t: 'Deal Verification & Vetting', d: 'Our team will review the exclusivity and quality of your deal within 24 hours.' },
                                        { n: '2', t: 'Approval & Payment Link', d: `Upon approval, we will email you a secure Stripe link for the ${submittedPrice} featured listing.` },
                                        { n: '3', t: 'Live Featured Promotion', d: `Once payment completes, your deal is pinned at the top with a premium Featured badge for ${submittedDuration}.` },
                                        { n: '4', t: 'Assurance Policy', d: 'If for any reason your deal is not approved, no charges will be made.' },
                                    ]
                                    : [
                                        { n: '1', t: 'Manual Admin Verification', d: 'We verify the deal and logo assets. This takes approximately 48 hours.' },
                                        { n: '2', t: 'Email Notification', d: "We'll send you an email confirmation when the deal goes live or if adjustments are required." },
                                        { n: '3', t: 'Live Listing', d: 'Your deal goes live and is listed chronologically in our active directory.' },
                                    ]
                                ).map((step) => (
                                    <motion.li
                                        key={step.n}
                                        variants={{
                                            hidden: { opacity: 0, x: -16 },
                                            show: { opacity: 1, x: 0 },
                                        }}
                                        className="flex gap-4 bg-[#111115] border border-zinc-800/60 p-4 rounded-xl hover:border-zinc-800 transition-colors"
                                    >
                                        <span className="bg-yellow-400 text-black w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black shrink-0">
                                            {step.n}
                                        </span>
                                        <div>
                                            <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-white">{step.t}</p>
                                            <p className="font-sans text-[11px] md:text-xs text-gray-400 mt-1 leading-relaxed">{step.d}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ol>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-[11px] md:text-xs text-yellow-400 bg-yellow-400/5 border border-yellow-400/10 rounded-lg px-4 py-3 max-w-lg mx-auto mb-8 leading-relaxed flex gap-2 items-center justify-center font-mono"
                            >
                                <span className="material-symbols-outlined !text-[16px] shrink-0">info</span>
                                Updates and status details will be sent to your provided submitter email address.
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 1 }}
                                onClick={() => setSubmissionStatus('idle')}
                                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-mono text-xs font-bold uppercase rounded-md transition-colors shadow-lg shadow-yellow-400/10"
                            >
                                Submit Another Deal
                            </motion.button>
                        </motion.div>
                    ) : (
                        <form className="relative bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 md:p-10 space-y-8 md:space-y-10 shadow-2xl" onSubmit={handleSubmit}>

                            {/* Section 1: Provider Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                                    <div className="size-8 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-lg flex items-center justify-center text-xs font-mono font-bold">1</div>
                                    <div>
                                        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Provider Details</h2>
                                        <p className="font-sans text-[10px] text-gray-500 mt-0.5">Let us know who is hosting this exclusive perk</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Company Name *</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">business</span>
                                            <input name="company_name" type="text" placeholder="e.g. Acme Corp" className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Website URL *</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">link</span>
                                            <input name="website_url" type="url" placeholder="https://acme.com" className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Honeypot */}
                                <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" tabIndex={-1}>
                                    <label>Leave this field blank
                                        <input type="text" name="website_link" tabIndex={-1} autoComplete="off" />
                                    </label>
                                </div>

                                <div>
                                    <label className="block font-mono text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Logo Upload *</label>

                                    <div className="flex gap-2.5 mb-3">
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('url')}
                                            className={`px-4 py-2 border font-mono text-[11px] font-medium rounded-lg transition-all ${logoMethod === 'url' ? 'bg-yellow-400 border-yellow-400 text-black font-bold shadow-md shadow-yellow-400/5' : 'bg-[#131316] border-zinc-800 text-gray-400 hover:text-white'}`}
                                        >
                                            URL Link
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('upload')}
                                            className={`px-4 py-2 border font-mono text-[11px] font-medium rounded-lg transition-all ${logoMethod === 'upload' ? 'bg-yellow-400 border-yellow-400 text-black font-bold shadow-md shadow-yellow-400/5' : 'bg-[#131316] border-zinc-800 text-gray-400 hover:text-white'}`}
                                        >
                                            Upload File
                                        </button>
                                    </div>

                                    {logoMethod === 'url' ? (
                                        <div className="flex gap-3">
                                            <div className="relative flex-1">
                                                <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">image</span>
                                                <input
                                                    name="logo_url"
                                                    type="url"
                                                    placeholder="https://acme.com/logo.png"
                                                    className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600"
                                                    required={logoMethod === 'url'}
                                                    onChange={(e) => setPreviewUrl(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg border border-zinc-800 bg-[#131316] flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-1" onError={(e) => e.currentTarget.style.display = 'none'} />
                                                ) : (
                                                    <span className="material-symbols-outlined text-zinc-600 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3">
                                            <div className="relative flex-1">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    onChange={handleFileChange}
                                                    required={logoMethod === 'upload'}
                                                />
                                                <div className="w-full px-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg flex items-center justify-between">
                                                    <span className="text-gray-400 truncate max-w-[200px] sm:max-w-xs">{fileInputRef.current?.files?.[0]?.name || "Select image file..."}</span>
                                                    <span className="material-symbols-outlined text-zinc-500 text-[18px]">upload_file</span>
                                                </div>
                                            </div>
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg border border-zinc-800 bg-[#131316] flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-zinc-600 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-gray-500 mt-2 font-sans">
                                        {logoMethod === 'url' ? 'Direct secure link to your startup logo (PNG or SVG format).' : 'Max file size 2MB. A square logo format is ideal.'}
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Deal Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                                    <div className="size-8 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-lg flex items-center justify-center text-xs font-mono font-bold">2</div>
                                    <div>
                                        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Deal Configuration</h2>
                                        <p className="font-sans text-[10px] text-gray-500 mt-0.5">Specify the terms of your premium discount or credit</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Benefit Description *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">featured_play_list</span>
                                        <input name="benefit_description" type="text" placeholder="e.g. $5,000 in Credits for 12 months" className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600" required />
                                    </div>
                                </div>

                                {/* Category Selection Grid Cards */}
                                <div>
                                    <label className="block font-mono text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Category *</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {CATEGORIES.map((cat) => {
                                            const isSelected = selectedCategory === cat.value
                                            return (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => setSelectedCategory(cat.value)}
                                                    className={`p-3 text-left border rounded-lg transition-all group flex flex-col items-start gap-1.5 ${
                                                        isSelected
                                                            ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg shadow-yellow-400/5'
                                                            : 'bg-[#131316] border-zinc-800/80 hover:border-zinc-700 text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    <span className={`material-symbols-outlined !text-[20px] ${isSelected ? 'text-black' : 'text-gray-500 group-hover:text-yellow-400 transition-colors'}`}>
                                                        {cat.icon}
                                                    </span>
                                                    <div>
                                                        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider leading-tight">{cat.label}</span>
                                                        <span className={`block font-sans text-[8px] mt-0.5 leading-tight ${isSelected ? 'text-black/70' : 'text-gray-500'}`}>{cat.desc}</span>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <input type="hidden" name="category" value={selectedCategory} required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Deal Value ($ USD) *</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">payments</span>
                                            <input name="deal_value" type="text" placeholder="e.g. 5000" className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Your Email (Status Updates)</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">mail</span>
                                            <input name="submitter_email" type="email" placeholder="hello@yourcompany.com" className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-mono text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Redemption Method *</label>
                                    <div className="flex gap-2.5 mb-3">
                                        <button
                                            type="button"
                                            onClick={() => setRedemptionMethod('link')}
                                            className={`px-4 py-2 border font-mono text-[11px] font-medium rounded-lg transition-all ${redemptionMethod === 'link' ? 'bg-yellow-400 border-yellow-400 text-black font-bold shadow-md shadow-yellow-400/5' : 'bg-[#131316] border-zinc-800 text-gray-400 hover:text-white'}`}
                                        >
                                            Unique URL Link
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRedemptionMethod('code')}
                                            className={`px-4 py-2 border font-mono text-[11px] font-medium rounded-lg transition-all ${redemptionMethod === 'code' ? 'bg-yellow-400 border-yellow-400 text-black font-bold shadow-md shadow-yellow-400/5' : 'bg-[#131316] border-zinc-800 text-gray-400 hover:text-white'}`}
                                        >
                                            Coupon Code
                                        </button>
                                    </div>
                                    <input type="hidden" name="redemption" value={redemptionMethod} />
                                </div>

                                <div>
                                    <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                        {redemptionMethod === 'link' ? 'Redemption Link / URL *' : 'Coupon Code / Details *'}
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined !text-[16px] text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                            {redemptionMethod === 'link' ? 'open_in_new' : 'vpn_key'}
                                        </span>
                                        <input
                                            name="redemption_link"
                                            type="text"
                                            placeholder={redemptionMethod === 'link' ? "https://yourcompany.com/foundersprime" : "PRIME2026"}
                                            className="w-full pl-10 pr-4 py-3 text-xs bg-[#131316] border border-zinc-800 rounded-lg text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-600"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Exclusivity */}
                            <div className="bg-[#111114] border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-all">
                                <label className="flex items-start gap-3.5 cursor-pointer select-none">
                                    <input name="is_exclusive" type="checkbox" className="mt-0.5 w-5 h-5 rounded accent-yellow-400 bg-[#131316] border border-zinc-800 cursor-pointer shrink-0" required />
                                    <div>
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white block">Exclusivity Commitment *</span>
                                        <span className="font-sans text-[11px] text-gray-400 leading-relaxed block mt-1.5">
                                            I verify this discount/credit provides a <span className="text-yellow-400 font-bold underline">verifiable custom perk</span> to FoundersPrime subscribers that exceeds public offerings. Generic affiliate or referral links will be declined.
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Section 4: Tier Selection */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                                    <div className="size-8 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-lg flex items-center justify-center text-xs font-mono font-bold">3</div>
                                    <div>
                                        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Listing Tier</h2>
                                        <p className="font-sans text-[10px] text-gray-500 mt-0.5">Select how prominent your startup deal should be displayed</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Standard Tier Card */}
                                    <div
                                        onClick={() => setTier('standard')}
                                        className={`relative cursor-pointer border rounded-xl p-5 md:p-6 transition-all flex flex-col justify-between group ${
                                            tier === 'standard'
                                                ? 'bg-[#111114] border-zinc-500 shadow-xl shadow-white/[0.02]'
                                                : 'bg-[#0d0d0f] border-zinc-800/80 hover:border-zinc-700/80'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${tier === 'standard' ? 'border-yellow-400' : 'border-zinc-700'}`}>
                                                        {tier === 'standard' && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />}
                                                    </div>
                                                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">Standard</span>
                                                </div>
                                                <span className="font-mono text-sm font-bold text-gray-400">FREE</span>
                                            </div>
                                            <p className="font-sans text-[11px] text-gray-400 leading-relaxed mb-4">
                                                List your startup perk chronologically below the featured directory. Reviewed in ~48 hours.
                                            </p>
                                        </div>
                                        <div className="border-t border-zinc-800/80 pt-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                                            · Chronological placement
                                        </div>
                                    </div>

                                    {/* Featured Tier Card */}
                                    <div
                                        onClick={() => setTier('featured')}
                                        className={`relative cursor-pointer border rounded-xl p-5 md:p-6 transition-all flex flex-col justify-between group overflow-hidden ${
                                            tier === 'featured'
                                                ? 'bg-[#161614] border-yellow-400 shadow-lg shadow-yellow-400/[0.03]'
                                                : 'bg-[#0d0d0f] border-zinc-800/80 hover:border-zinc-700/80'
                                        }`}
                                    >
                                        <div className="absolute top-2.5 right-2.5 bg-yellow-400 text-black px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider shadow">
                                            Priority
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${tier === 'featured' ? 'border-yellow-400' : 'border-zinc-700'}`}>
                                                        {tier === 'featured' && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />}
                                                    </div>
                                                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">star</span>
                                                        Featured
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-mono text-[10px] line-through text-zinc-600">{featuredAnchor}</span>
                                                    <span className="font-mono text-sm font-bold text-white">{featuredPrice}</span>
                                                </div>
                                            </div>
                                            <p className="font-sans text-[11px] text-gray-400 leading-relaxed mb-4">
                                                Boost exposure instantly. Pin your deal at the top of the category and main listings.
                                            </p>
                                        </div>

                                        <div className="border-t border-zinc-800/80 pt-3 space-y-1">
                                            <div className="text-[10px] font-mono text-yellow-400/80 uppercase tracking-wider">
                                                · Pinned placement for {featuredDuration}
                                            </div>
                                            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                                                · Featured visual badge
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" name="tier" value={tier} />

                                {tier === 'featured' && (
                                    <div className="bg-[#111114] border border-zinc-800 rounded-xl p-5 space-y-4">
                                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">Duration Option</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setFeaturedPlan('weekly')}
                                                className={`p-3 text-left border rounded-lg transition-all flex flex-col justify-between ${
                                                    featuredPlan === 'weekly'
                                                        ? 'bg-[#161614] border-yellow-400'
                                                        : 'bg-[#131316] border-zinc-800/80 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">7 Days</span>
                                                <span className="font-mono text-sm font-bold text-white mt-1">$25</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFeaturedPlan('monthly')}
                                                className={`p-3 text-left border rounded-lg transition-all flex flex-col justify-between relative overflow-hidden ${
                                                    featuredPlan === 'monthly'
                                                        ? 'bg-[#161614] border-yellow-400'
                                                        : 'bg-[#131316] border-zinc-800/80 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                <span className="absolute top-0 right-0 bg-yellow-400 text-black px-1.5 py-0.5 rounded-bl font-mono text-[7px] font-bold uppercase tracking-wider">Popular</span>
                                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">30 Days</span>
                                                <span className="font-mono text-sm font-bold text-white mt-1">$99</span>
                                            </button>
                                        </div>
                                        <div className="font-sans text-[11px] text-gray-400 bg-yellow-400/5 border border-yellow-400/10 rounded-lg p-3.5 leading-relaxed flex gap-2">
                                            <span className="material-symbols-outlined !text-[16px] text-yellow-400 shrink-0">info</span>
                                            <span>
                                                Submit now with no upfront charges. We review all featured applications within 24 hours. If verified and approved, you'll receive a secure Stripe payment invoice.
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Section 5: Security Check */}
                            <div className="border-t border-zinc-800 pt-6">
                                <label className="block font-mono text-[10px] font-bold text-gray-400 mb-2.5 uppercase tracking-wider">Verification Security Check *</label>
                                <div className="bg-[#111114] border border-zinc-800 p-4 rounded-xl flex items-center justify-between gap-4">
                                    <span className="font-mono text-sm font-bold text-white tracking-wider">
                                        ENTER THE SUM OF: <span className="text-yellow-400">{challenge.num1}</span> + <span className="text-yellow-400">{challenge.num2}</span>
                                    </span>
                                    <div className="flex items-center gap-3">
                                        {isHuman && (
                                            <div className="flex items-center text-green-400 font-mono text-xs gap-1">
                                                <span className="material-symbols-outlined !text-[16px]">verified</span>
                                                <span className="hidden sm:inline">VERIFIED</span>
                                            </div>
                                        )}
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="?"
                                            className={`w-16 p-2 text-sm bg-[#131316] border rounded-lg text-center font-mono font-bold text-white focus:outline-none transition-all ${isHuman ? 'border-green-500 shadow-md shadow-green-500/10' : 'border-zinc-800 focus:border-yellow-400'}`}
                                            value={securityAnswer}
                                            onChange={(e) => checkSecurity(e.target.value)}
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={!isHuman || isSubmitting}
                                    className={`w-full font-mono font-bold text-xs uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                                        isHuman && !isSubmitting
                                            ? 'bg-yellow-400 text-black hover:bg-yellow-500 active:scale-[0.99] cursor-pointer shadow-lg shadow-yellow-400/5'
                                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-800'
                                    }`}
                                >
                                    {isSubmitting ? 'Processing submission...' : 'Submit Deal Request'}
                                    <span className="material-symbols-outlined !text-[16px]">send</span>
                                </button>
                                
                                {submissionStatus === 'error' && (
                                    <div className="text-center text-xs font-mono text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg py-2.5 px-3">
                                        ⚠ {errorMessage || 'Error submitting deal. Please try again.'}
                                    </div>
                                )}
                                <p className="text-center font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                                    Vetting queue takes ~48 hours. Approval status notifications are sent via email.
                                </p>
                            </div>

                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
