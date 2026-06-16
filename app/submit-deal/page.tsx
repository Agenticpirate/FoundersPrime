'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'

export default function SubmitDealPage() {
    const [logoMethod, setLogoMethod] = useState<'url' | 'upload'>('url')
    const [previewUrl, setPreviewUrl] = useState<string>('')
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
    // Snapshot of what the user submitted, so the success screen can show the
    // correct "what happens next" path even after the form is reset.
    const [submittedTier, setSubmittedTier] = useState<'standard' | 'featured'>('standard')
    const [submittedPrice, setSubmittedPrice] = useState<string>('$25')
    const [submittedDuration, setSubmittedDuration] = useState<string>('7 days')

    // Display values driven by the selected featured plan
    const featuredPrice = featuredPlan === 'weekly' ? '$25' : '$99'
    const featuredAnchor = featuredPlan === 'weekly' ? '$99' : '$299'
    const featuredDuration = featuredPlan === 'weekly' ? '7 days' : '30 days'

    // Track when the form was first rendered (for anti-bot fill-time check)
    const formLoadedAt = useRef<number>(Date.now())
    useEffect(() => {
        formLoadedAt.current = Date.now()
    }, [])

    // Pre-select the Featured tier when arriving from a "Get featured" CTA
    // (e.g. /submit-deal?tier=featured). Read from the URL directly to avoid
    // requiring a Suspense boundary around useSearchParams.
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

        setIsSubmitting(true)
        setSubmissionStatus('idle')
        setErrorMessage('')

        // Capture the form element now — `e.currentTarget` becomes null after
        // the first `await` below, so referencing it later would throw and get
        // mislabeled as a network error.
        const form = e.currentTarget
        const formData = new FormData(form)
        const data = {
            company_name: formData.get('company_name'),
            website_url: formData.get('website_url'),
            logo_url: logoMethod === 'url' ? formData.get('logo_url') : previewUrl,
            benefit_description: formData.get('benefit_description'),
            category: formData.get('category'),
            deal_value: formData.get('deal_value'),
            redemption_method: formData.get('redemption'),
            redemption_link: formData.get('redemption_link'),
            is_exclusive: formData.get('is_exclusive') === 'on',
            submitter_email: formData.get('submitter_email'),
            featured_requested: tier === 'featured',
            featured_plan: featuredPlan,
            // Anti-bot signals
            website_link: formData.get('website_link'), // honeypot — should be empty
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
                // Snapshot the submitted tier/plan for the success screen before resetting.
                setSubmittedTier(tier)
                setSubmittedPrice(featuredPrice)
                setSubmittedDuration(featuredDuration)
                setSubmissionStatus('success')
                form.reset()
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
        <div className="min-h-screen bg-background-light flex flex-col font-mono">
            <Header />

            <main className="flex-grow py-5 md:py-8 px-4 grid-bg">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-5 md:mb-8 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-black mb-3 shadow-[2px_2px_0px_#111]">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
                            Now accepting submissions
                        </div>
                        <h1 className="text-[26px] leading-[1.05] md:text-4xl font-black uppercase mb-2 md:mb-3 tracking-tight">Submit Your Deal</h1>
                        <p className="text-[13px] md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                            Reach thousands of verified founders. We only list high-value, exclusive deals.
                            <span className="inline-block bg-accent-yellow px-2 py-0.5 mt-2 md:ml-1.5 md:mt-0 border-2 border-black font-bold text-black text-xs md:text-sm">Zero fees.</span>
                        </p>
                    </div>

                    {submissionStatus === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="relative bg-white border-[3px] border-black p-6 md:p-10 text-center shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000] overflow-hidden"
                        >
                            {/* Sleek accent particles bursting from the check */}
                            <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
                                {[...Array(8)].map((_, i) => {
                                    const angle = (i / 8) * Math.PI * 2
                                    return (
                                        <motion.span
                                            key={i}
                                            className="absolute top-[64px] md:top-[80px] w-2 h-2 bg-accent-yellow border border-black"
                                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                x: Math.cos(angle) * 90,
                                                y: Math.sin(angle) * 90,
                                                scale: [0, 1, 0.4],
                                            }}
                                            transition={{ duration: 0.9, delay: 0.25 + i * 0.02, ease: 'easeOut' }}
                                        />
                                    )
                                })}
                            </div>

                            {/* Animated check badge */}
                            <motion.div
                                initial={{ scale: 0, rotate: -25 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                                className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-100 border-2 border-green-600 mb-4"
                            >
                                <motion.span
                                    className="material-symbols-outlined text-5xl md:text-6xl text-green-600"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.32 }}
                                >
                                    check_circle
                                </motion.span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.36 }}
                                className="text-xl md:text-2xl font-black mb-2 uppercase tracking-tight"
                            >
                                Submission Received!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.44 }}
                                className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto leading-relaxed"
                            >
                                Thanks for submitting your deal. Here's exactly what happens next.
                            </motion.p>

                            {/* What happens next — staggered timeline */}
                            <motion.ol
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
                                }}
                                className="text-left max-w-md mx-auto space-y-3 mb-6"
                            >
                                {(submittedTier === 'featured'
                                    ? [
                                        { n: '1', t: 'We review your deal', d: 'Priority review within ~24 hours.' },
                                        { n: '2', t: 'Approval email', d: `If approved, we email you a secure ${submittedPrice} payment link.` },
                                        { n: '3', t: 'You pay & go live', d: `After payment, your deal is pinned with a Featured badge for ${submittedDuration}.` },
                                        { n: '4', t: 'Auto-refund safety net', d: 'Not approved? Your payment is automatically refunded.' },
                                    ]
                                    : [
                                        { n: '1', t: 'We review your deal', d: 'Our team reviews within ~48 hours.' },
                                        { n: '2', t: 'Status email', d: "We'll email you once it's approved or if we need changes." },
                                        { n: '3', t: 'It goes live', d: 'Approved deals are listed for thousands of verified founders.' },
                                    ]
                                ).map((step) => (
                                    <motion.li
                                        key={step.n}
                                        variants={{
                                            hidden: { opacity: 0, x: -16 },
                                            show: { opacity: 1, x: 0 },
                                        }}
                                        className="flex items-start gap-3 bg-gray-50 border-2 border-black p-3 shadow-[2px_2px_0px_#111]"
                                    >
                                        <span className="bg-black text-accent-yellow w-6 h-6 flex items-center justify-center text-xs font-black shrink-0 shadow-[2px_2px_0px_#111]">
                                            {step.n}
                                        </span>
                                        <div>
                                            <p className="font-black uppercase text-xs md:text-sm tracking-tight">{step.t}</p>
                                            <p className="text-[11px] md:text-xs text-gray-600 leading-snug">{step.d}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ol>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-[11px] md:text-xs text-gray-500 bg-amber-50 border border-amber-200 px-3 py-2 max-w-md mx-auto mb-6 leading-snug"
                            >
                                <span className="font-bold">Heads up:</span> all status updates are sent to the email
                                you provided. If you didn't add one, check back here for your listing.
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.05 }}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 1 }}
                                onClick={() => setSubmissionStatus('idle')}
                                className="px-6 py-3 bg-black text-white font-mono font-bold text-sm uppercase border-2 border-black hover:bg-accent-yellow hover:text-black transition-colors shadow-[3px_3px_0px_#888]"
                            >
                                Submit Another Deal
                            </motion.button>
                        </motion.div>
                    ) : (
                        <form className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000] p-4 md:p-8 space-y-6 md:space-y-8" onSubmit={handleSubmit}>

                            {/* Section 1: Provider Info */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-base md:text-xl font-black uppercase border-b-2 border-black pb-2 flex items-center gap-2 tracking-tight">
                                    <span className="bg-black text-accent-yellow w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xs md:text-sm font-black shadow-[2px_2px_0px_#111]">1</span>
                                    Provider Details
                               </h2>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Company Name *</label>
                                        <input name="company_name" type="text" placeholder="e.g. Acme Corp" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Website URL *</label>
                                        <input name="website_url" type="url" placeholder="https://" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                </div>

                                {/* Honeypot — hidden from real users, visible to bots */}
                                <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" tabIndex={-1}>
                                    <label>Leave this field blank
                                        <input type="text" name="website_link" tabIndex={-1} autoComplete="off" />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Logo Upload *</label>

                                    <div className="flex gap-2 mb-2 text-xs font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('url')}
                                            className={`px-3 py-1.5 border-2 border-black uppercase tracking-wide transition-colors ${logoMethod === 'url' ? 'bg-black text-accent-yellow shadow-[2px_2px_0px_#111]' : 'bg-white text-black hover:bg-gray-100'}`}
                                        >
                                            Use URL
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('upload')}
                                            className={`px-3 py-1.5 border-2 border-black uppercase tracking-wide transition-colors ${logoMethod === 'upload' ? 'bg-black text-accent-yellow shadow-[2px_2px_0px_#111]' : 'bg-white text-black hover:bg-gray-100'}`}
                                        >
                                            Upload File
                                        </button>
                                    </div>

                                    {logoMethod === 'url' ? (
                                        <div className="flex gap-2">
                                            <input
                                                name="logo_url"
                                                type="url"
                                                placeholder="https://domain.com/logo.png"
                                                className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light"
                                                required={logoMethod === 'url'}
                                                onChange={(e) => setPreviewUrl(e.target.value)}
                                            />
                                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative w-full">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    onChange={handleFileChange}
                                                    required={logoMethod === 'upload'}
                                                />
                                                <div className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black bg-background-light flex items-center justify-between">
                                                    <span className="text-gray-500 truncate text-xs md:text-sm">{fileInputRef.current?.files?.[0]?.name || "Select file..."}</span>
                                                    <span className="material-symbols-outlined text-sm md:text-base">upload_file</span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        {logoMethod === 'url' ? 'Direct link to a high-res PNG/SVG.' : 'Max 2MB. Square format recommended.'}
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Deal Info */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-base md:text-xl font-black uppercase border-b-2 border-black pb-2 flex items-center gap-2 tracking-tight">
                                    <span className="bg-black text-accent-yellow w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xs md:text-sm font-black shadow-[2px_2px_0px_#111]">2</span>
                                    Deal Configuration
                                </h2>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Benefit Description *</label>
                                    <input name="benefit_description" type="text" placeholder="e.g. $5,000 in Credits for 12 months" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Category *</label>
                                        <select name="category" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light appearance-none" required>
                                            <option value="">Select Category...</option>
                                            <option value="cloud">Cloud Credits</option>
                                            <option value="saas">SaaS Discount</option>
                                            <option value="marketing">Marketing/Ads</option>
                                            <option value="hiring">Hiring/Payroll</option>
                                            <option value="legal">Legal/Finance</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Deal Value ($) *</label>
                                        <input name="deal_value" type="text" placeholder="e.g. 5000" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Redemption Method *</label>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer border-2 border-transparent hover:border-black p-2 -ml-2 rounded text-sm md:text-base">
                                            <input type="radio" name="redemption" value="link" className="accent-black w-3.5 h-3.5 md:w-4 md:h-4" defaultChecked />
                                            <span className="font-bold">Unique URL</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer border-2 border-transparent hover:border-black p-2 rounded text-sm md:text-base">
                                            <input type="radio" name="redemption" value="code" className="accent-black w-3.5 h-3.5 md:w-4 md:h-4" />
                                            <span className="font-bold">Coupon Code</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Redemption Link / Code *</label>
                                    <input name="redemption_link" type="text" placeholder="https://your-site.com/founders-prime OR Code: PRIME2025" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Your Email (optional)</label>
                                    <input name="submitter_email" type="email" placeholder="hello@yourcompany.com" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" />
                                    <p className="text-[10px] text-gray-500 mt-1">We'll only use this to notify you about your submission status.</p>
                                </div>
                            </div>

                            {/* Section 3: Exclusivity */}
                            <div className="bg-accent-yellow/20 border-2 border-black p-3 md:p-4 shadow-[2px_2px_0px_#111]">
                                <label className="flex items-start gap-2.5 md:gap-3 cursor-pointer">
                                    <input name="is_exclusive" type="checkbox" className="mt-0.5 w-5 h-5 accent-black border-2 border-black flex-shrink-0" required />
                                    <div>
                                        <span className="font-bold uppercase block text-xs md:text-sm tracking-wide">Exclusivity Confirmation *</span>
                                        <span className="text-[11px] md:text-xs text-gray-800 tracking-tight md:tracking-normal leading-snug block mt-0.5">
                                            I confirm this deal offers a <span className="font-bold underline">special benefit</span> to FoundersPrime users (e.g., extra credits, extended trial, or higher discount) compared to our public pricing. We do not list generic referral links.
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Section 4: Tier Selection */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-base md:text-xl font-black uppercase border-b-2 border-black pb-2 flex items-center gap-2 tracking-tight">
                                    <span className="bg-black text-accent-yellow w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xs md:text-sm font-black shadow-[2px_2px_0px_#111]">3</span>
                                    Listing Tier
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* Standard */}
                                    <label
                                        className={`relative cursor-pointer border-2 p-3 md:p-4 transition-all ${
                                            tier === 'standard'
                                                ? 'border-black bg-white shadow-[3px_3px_0px_#111]'
                                                : 'border-gray-300 bg-gray-50 hover:border-black'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="tier"
                                            value="standard"
                                            checked={tier === 'standard'}
                                            onChange={() => setTier('standard')}
                                            className="absolute opacity-0 pointer-events-none"
                                        />
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className={`w-4 h-4 rounded-full border-2 border-black flex-shrink-0 mt-0.5 ${tier === 'standard' ? 'bg-black' : 'bg-white'}`}>
                                                {tier === 'standard' && (
                                                    <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full m-auto mt-[3px]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                                                    <span className="font-mono text-sm md:text-base font-black uppercase">Standard</span>
                                                    <span className="font-mono text-base md:text-lg font-black">FREE</span>
                                                </div>
                                                <p className="text-[10px] md:text-xs text-gray-600 leading-snug">
                                                    Listed in standard order after admin approval. ~48 hour review.
                                                </p>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Featured */}
                                    <label
                                        className={`relative cursor-pointer border-2 p-3 md:p-4 transition-all ${
                                            tier === 'featured'
                                                ? 'border-black bg-accent-yellow/30 shadow-[3px_3px_0px_#111]'
                                                : 'border-gray-300 bg-gray-50 hover:border-black hover:bg-accent-yellow/10'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="tier"
                                            value="featured"
                                            checked={tier === 'featured'}
                                            onChange={() => setTier('featured')}
                                            className="absolute opacity-0 pointer-events-none"
                                        />
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white border border-black px-1.5 py-0.5 font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-[1px_1px_0px_#111] rotate-3">
                                            ⏳ Limited
                                        </span>
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className={`w-4 h-4 rounded-full border-2 border-black flex-shrink-0 mt-0.5 ${tier === 'featured' ? 'bg-black' : 'bg-white'}`}>
                                                {tier === 'featured' && (
                                                    <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full m-auto mt-[3px]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                                                    <span className="font-mono text-sm md:text-base font-black uppercase flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-base text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                        Featured
                                                    </span>
                                                    <span className="flex items-baseline gap-1">
                                                        <span className="font-mono text-xs font-bold line-through text-gray-400">{featuredAnchor}</span>
                                                        <span className="font-mono text-base md:text-lg font-black">{featuredPrice}</span>
                                                    </span>
                                                </div>
                                                <ul className="text-[10px] md:text-xs text-gray-700 leading-snug space-y-0.5 mt-1">
                                                    <li>· Pinned at top for {featuredDuration}</li>
                                                    <li>· ⭐ Featured badge on listing</li>
                                                    <li>· Priority admin review</li>
                                                    <li>· Auto-refund if not approved</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {tier === 'featured' && (
                                    <div className="space-y-2">
                                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-700">Choose duration</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setFeaturedPlan('weekly')}
                                                className={`border-2 p-2.5 text-left transition-all ${
                                                    featuredPlan === 'weekly'
                                                        ? 'border-black bg-accent-yellow/40 shadow-[2px_2px_0px_#111]'
                                                        : 'border-gray-300 bg-white hover:border-black'
                                                }`}
                                            >
                                                <div className="flex items-baseline justify-between gap-1">
                                                    <span className="font-mono text-xs md:text-sm font-black uppercase">1 Week</span>
                                                    <span className="font-mono text-sm md:text-base font-black">$25</span>
                                                </div>
                                                <p className="text-[9px] md:text-[10px] text-gray-600 mt-0.5">Test it for a week</p>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFeaturedPlan('monthly')}
                                                className={`relative border-2 p-2.5 text-left transition-all ${
                                                    featuredPlan === 'monthly'
                                                        ? 'border-black bg-accent-yellow/40 shadow-[2px_2px_0px_#111]'
                                                        : 'border-gray-300 bg-white hover:border-black'
                                                }`}
                                            >
                                                <span className="absolute -top-2 -right-2 bg-black text-accent-yellow border border-black px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest">
                                                    Best value
                                                </span>
                                                <div className="flex items-baseline justify-between gap-1">
                                                    <span className="font-mono text-xs md:text-sm font-black uppercase">30 Days</span>
                                                    <span className="font-mono text-sm md:text-base font-black">$99</span>
                                                </div>
                                                <p className="text-[9px] md:text-[10px] text-gray-600 mt-0.5">Full month of exposure</p>
                                            </button>
                                        </div>
                                        <p className="text-[10px] md:text-xs text-gray-600 bg-amber-50 border border-amber-200 px-3 py-2 leading-snug">
                                            <span className="font-bold">How it works:</span> Submit free → we review within 24 hours → if approved, you'll get a payment link for {featuredPrice} → after payment, your deal goes live with the Featured badge for {featuredDuration}.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Section 5: Security Check */}
                            <div className="border-t-2 border-black pt-4 md:pt-5">
                                <label className="block text-xs font-bold uppercase mb-2 tracking-wide">Security Verification *</label>
                                <div className="bg-gray-50 p-3 md:p-4 border-2 border-black flex items-center justify-between gap-3 shadow-[2px_2px_0px_#111]">
                                    <span className="font-mono text-sm md:text-lg font-black">{challenge.num1} + {challenge.num2} = ?</span>
                                    <div className="flex items-center gap-2">
                                        {isHuman && (
                                            <div className="flex items-center text-green-600 font-bold gap-1">
                                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                <span className="text-xs md:text-sm hidden sm:inline">Verified</span>
                                            </div>
                                        )}
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="?"
                                            className={`w-16 p-2 text-base border-2 border-black text-center font-black outline-none ring-2 bg-white ${isHuman ? 'ring-green-500 border-green-500' : 'ring-transparent'}`}
                                            value={securityAnswer}
                                            onChange={(e) => checkSecurity(e.target.value)}
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 md:pt-4">
                                <button
                                    type="submit"
                                    disabled={!isHuman || isSubmitting}
                                    className={`w-full font-mono font-black text-base md:text-lg uppercase tracking-wide py-3.5 md:py-4 border-[3px] border-[#101622] flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_#888] md:shadow-[6px_6px_0px_0px_#888]
                                    ${isHuman && !isSubmitting
                                            ? 'bg-[#101622] text-white hover:bg-accent-yellow hover:text-[#101622] cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 shadow-none'
                                        }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Deal'} <span className="material-symbols-outlined text-[18px] md:text-base">send</span>
                                </button>
                                <p className="text-center text-[9px] md:text-[10px] text-gray-500 mt-3 md:mt-4 uppercase font-bold">
                                    {submissionStatus === 'error' && (
                                        <span className="text-red-600 block mb-1 normal-case font-mono text-xs">
                                            ⚠ {errorMessage || 'Error submitting deal. Please try again.'}
                                        </span>
                                    )}
                                    Review time: ~48 Hours. You will be notified via email.
                                </p>
                            </div>

                        </form>
                    )}
                </div>
            </main>

            <footer className="bg-white border-t-2 border-black py-8 text-center">
                <div className="text-xs font-bold font-mono text-gray-400">© 2025 FoundersPrime. All rights reserved.</div>
            </footer>
        </div>
    )
}
