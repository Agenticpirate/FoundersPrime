import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Mandala from '@/components/ui/Mandala'
import Link from 'next/link'
import { safeJsonLd } from '@/lib/safe-json-ld'

export const metadata: Metadata = {
  title: 'About FoundersPrime — Built by Founders, for Founders',
  description: 'FoundersPrime was built to give every bootstrapped and funded startup the unfair advantage—verified deals, non-dilutive capital, and tools that actually work.',
  alternates: {
    canonical: 'https://www.foundersprime.com/about',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ravi Teja',
  jobTitle: 'Founder & CEO of FoundersPrime',
  worksFor: {
    '@type': 'Organization',
    name: 'FoundersPrime',
    url: 'https://www.foundersprime.com'
  },
  url: 'https://www.foundersprime.com/about',
  sameAs: [
    'https://www.linkedin.com/in/raviteja',
    'https://twitter.com/foundersprime'
  ],
  knowsAbout: [
    'Startup Growth',
    'Non-dilutive Funding',
    'SaaS Deals',
    'Cloud Computing Credits',
    'Bootstrapping'
  ]
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }}
      />
      <Header />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative bg-white dark:bg-[#09090b] border-b-2 border-black dark:border-white/10 pattern-grid-lg overflow-hidden">
          <Mandala
            variant="rings"
            colorClass="text-gray-900 dark:text-white/5"
            opacity={0.05}
            speed={90}
            className="absolute -top-16 -right-16 w-80 h-80 hidden md:block"
          />
          <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12 py-10 md:py-20 lg:py-24">
            <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center">
              <div className="flex-1 fp-fade-up">
                <div className="inline-flex items-center gap-2 bg-accent-yellow border-2 border-black px-3 py-1 mb-4 md:mb-6 shadow-[3px_3px_0px_#111]">
                  <span className="material-symbols-outlined text-sm text-black">bolt</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">Our Mission</span>
                </div>
                <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 uppercase">
                  Built by Founders,<br />
                  <span className="bg-black dark:bg-[#13b6ec]/10 text-primary dark:text-[#13b6ec] dark:border dark:border-[#13b6ec]/20 px-2">For Founders</span>
                </h1>
                <p className="font-sans text-sm md:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-300 border-l-4 border-primary pl-4 md:pl-5 max-w-xl">
                  FoundersPrime is the unfair advantage for bootstrapped and funded startups. We give you the verified deals, non-dilutive capital sources, and battle-tested tools that others hide behind paywalls or consultants.
                </p>
              </div>

              {/* Stats card */}
              <div className="w-full md:w-[360px] shrink-0 fp-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-black shadow-[6px_6px_0px_#ffd700] md:shadow-[8px_8px_0px_#ffd700] p-5 md:p-8 overflow-hidden">
                  <Mandala
                    variant="orbital"
                    colorClass="text-accent-yellow"
                    opacity={0.14}
                    speed={70}
                    strokeWidth={0.7}
                    className="absolute -top-10 -right-10 w-40 h-40"
                  />
                  <div className="relative">
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4 md:mb-6">Impact So Far</p>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-0 md:space-y-5">
                      {[
                        { value: '$4.2M+', label: 'Tracked in savings' },
                        { value: '—', label: 'Startups in network' },
                        { value: '—', label: 'Verified deals listed' },
                        { value: '43+', label: 'Countries reached' },
                      ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b border-white/10 pb-3 md:pb-5 last:border-0 last:pb-0 pt-3 md:pt-0 first:pt-0">
                          <span className="font-mono text-2xl md:text-3xl font-black text-primary">{value}</span>
                          <span className="font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-wide">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE STORY ────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-background-light dark:bg-[#000000] border-b-2 border-black dark:border-white/10">
          <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-12">
            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-10 text-gray-900 dark:text-white">
              <span className="material-symbols-outlined text-2xl md:text-4xl">history_edu</span>
              <h2 className="font-mono text-xl md:text-3xl font-black uppercase">The Story</h2>
            </div>
            <div className="space-y-4 md:space-y-5 font-sans text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                It started with a spreadsheet. After wasting weeks navigating broken links, expired offers, and predatory &ldquo;consultants&rdquo; asking for 5% equity just to introduce us to a grant officer, we realised the startup ecosystem was fundamentally broken for founders who don&apos;t have the right network.
              </p>
              <p>
                The information was out there — but it was fragmented, hidden behind paywalls, or buried inside SEO-spam articles optimised for clicks, not founders.
              </p>
              <p className="font-bold font-mono text-xl border-b-2 border-primary inline-block pb-1 text-gray-900 dark:text-white">
                So we built FoundersPrime.
              </p>
              <p>
                A verified, no-nonsense database of non-dilutive capital, SaaS deals, accelerators, and tools. We don&apos;t sell your data. We don&apos;t take a cut of your funding. We just give you the map — and keep it accurate.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW WE MAINTAIN QUALITY ──────────────────────────────── */}
        <section className="py-12 md:py-16 bg-white dark:bg-[#09090b] border-b-2 border-black dark:border-white/10">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-14 gap-3 md:gap-6">
              <h2 className="font-mono text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight max-w-xl text-gray-900 dark:text-white">
                How We Maintain Quality
              </h2>
              <div className="font-mono text-xs md:text-sm border-2 border-black dark:border-white/15 px-2 py-1 md:px-3 md:py-1.5 bg-white dark:bg-[#0c0c0c] flex items-center gap-2 self-start shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] text-gray-900 dark:text-white">
                <span className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse inline-block"></span>
                System Status: <span className="text-amber-700 font-bold ml-1">OPERATIONAL</span>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {[
                { num: '01', icon: 'search', color: 'text-primary', bg: 'bg-primary/10', title: 'Research', desc: 'We scour government portals, corporate partner pages, and investor networks daily to find new opportunities.' },
                { num: '02', icon: 'verified', color: 'text-accent-yellow', bg: 'bg-accent-yellow/10', title: 'Verify', desc: 'We personally test promo codes, call grant offices, and apply ourselves to confirm every listing is active.' },
                { num: '03', icon: 'update', color: 'text-amber-700', bg: 'bg-amber-50 dark:bg-accent-yellow/10', title: 'Update', desc: 'Dead links are removed weekly. If it\'s listed on FoundersPrime, it works. No 404s allowed.' },
                { num: '04', icon: 'visibility', color: 'text-accent-red', bg: 'bg-red-50 dark:bg-red-500/10', title: 'Add Context', desc: 'We translate legalese into plain English so you know exactly what the catch is — before you apply.' },
              ].map(({ num, icon, color, bg, title, desc }) => (
                <div key={num} className="relative bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[5px_5px_0px_#111] dark:shadow-[5px_5px_0px_rgba(255,255,255,0.05)] p-4 md:p-6 group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#111] transition-all">
                  <div className="absolute -top-3 -left-2 md:-top-4 md:-left-3 bg-black dark:bg-[#1a1a1a] text-white font-mono text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 border-2 border-black dark:border-white/15">
                    {num}
                  </div>
                  <div className={`w-10 h-10 md:w-14 md:h-14 ${bg} border-2 border-black dark:border-white/15 flex items-center justify-center mb-3 md:mb-5 mt-2 md:mt-3`}>
                    <span className={`material-symbols-outlined text-xl md:text-3xl ${color}`}>{icon}</span>
                  </div>
                  <h3 className="font-mono text-sm md:text-lg font-black uppercase mb-1 md:mb-2 text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-background-light dark:bg-[#000000] border-b-2 border-black dark:border-white/10">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12">
            <h2 className="font-mono text-xl md:text-3xl font-black uppercase mb-8 md:mb-12 text-center text-gray-900 dark:text-white">What Makes Us Different</h2>
            <div className="bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[6px_6px_0px_#111] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black dark:bg-[#1a1a1a] text-white font-mono text-xs uppercase">
                    <th className="p-4 border-r-2 border-white/20 w-1/3">Feature</th>
                    <th className="p-4 border-r-2 border-black dark:border-white/10 w-1/4 bg-primary text-black font-bold">FoundersPrime ✓</th>
                    <th className="p-4 border-r-2 border-white/20 w-1/4 opacity-70">Other Platforms</th>
                    <th className="p-4 w-1/4 opacity-70">Random Spreadsheets</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {[
                    ['Link Verification', 'Weekly manual tests', 'Automated / rarely', 'None'],
                    ['Non-Dilutive Focus', '100% focused', 'Mixed with VC deals', 'Random'],
                    ['Hidden Fees', '$0 — always', 'Upsells & paywalls', 'Ads / phishing'],
                    ['Plain-English Context', 'Every listing', 'Basic info only', 'None'],
                    ['Updated Frequency', 'Weekly', 'Monthly / never', 'Abandoned'],
                  ].map(([feature, us, them, sheet]) => (
                    <tr key={feature} className="border-b-2 border-black/10 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 border-r-2 border-black dark:border-white/10 font-bold text-gray-900 dark:text-white">{feature}</td>
                      <td className="p-4 border-r-2 border-black dark:border-white/10 bg-primary/10 font-bold text-gray-900 dark:text-white">{us}</td>
                      <td className="p-4 border-r-2 border-black dark:border-white/10 text-gray-500 dark:text-gray-400">{them}</td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">{sheet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PRINCIPLES ───────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-white dark:bg-[#09090b] border-b-2 border-black dark:border-white/10">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12">
            <h2 className="font-mono text-xl md:text-3xl font-black uppercase mb-8 md:mb-12 text-gray-900 dark:text-white">Our Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-black dark:border-white/10 shadow-[6px_6px_0px_#111] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)]">
              {[
                { icon: 'target', color: 'bg-primary/15 text-primary', label: '01', title: 'Accuracy Over Quantity', desc: "We'd rather list 50 grants that actually pay out than 5,000 that are expired or scams. Quality is our single metric." },
                { icon: 'person', color: 'bg-accent-yellow/20 text-yellow-700 dark:text-accent-yellow', label: '02', title: 'Founder-First', desc: 'We build for the founder with 2 months of runway left. Every resource is vetted for speed, utility, and zero friction.' },
                { icon: 'visibility', color: 'bg-amber-100 dark:bg-accent-yellow/15 text-amber-800 dark:text-accent-yellow', label: '03', title: 'Radical Transparency', desc: "If we earn a commission on a tool, we say so. If a grant is hard to get, we say so. No surprises. Ever." },
                { icon: 'block', color: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400', label: '04', title: 'No Bullshit', desc: 'Zero hype. Zero growth-hacking buzzwords. Just verified tools and money to build your company.' },
              ].map(({ icon, color, label, title, desc }, i) => (
                <div key={label} className={`p-5 md:p-8 hover:bg-background-light dark:hover:bg-white/5 transition-colors ${i < 2 ? 'border-b-2' : ''} ${i % 2 === 0 ? 'md:border-r-2' : ''} border-black dark:border-white/10`}>
                  <div className={`inline-flex items-center gap-2 mb-3 md:mb-4 px-2 py-0.5 md:px-3 md:py-1 ${color} border border-current/30`}>
                    <span className="material-symbols-outlined text-xs md:text-sm">{icon}</span>
                    <span className="font-mono text-[10px] md:text-xs font-bold uppercase">Principle {label}</span>
                  </div>
                  <h3 className="font-mono text-base md:text-xl font-black mb-2 md:mb-3 text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUNDER + CONTACT ─────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-background-light dark:bg-[#000000]">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

              {/* Founder card */}
              <div className="lg:col-span-4">
                <h2 className="font-mono text-2xl font-black uppercase mb-4 md:mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="material-symbols-outlined">groups</span>
                  The Team
                </h2>
                <div className="bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[6px_6px_0px_#111] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] p-8 flex flex-col items-center text-center">
                  {/* Branded avatar — no external image */}
                  <div className="w-24 h-24 bg-black dark:bg-[#1a1a1a] border-2 border-black dark:border-white/10 shadow-[4px_4px_0px_#ffd700] flex items-center justify-center mb-5">
                    <span className="font-mono text-3xl font-black text-primary font-black">FP</span>
                  </div>
                  <h3 className="font-mono text-xl font-black mb-1 text-gray-900 dark:text-white">Ravi Teja</h3>
                  <p className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-4">Founder & CEO</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xs">
                    Serial builder obsessed with helping bootstrapped founders save money, extend runway, and build faster through verified non-dilutive capital.
                  </p>
                  <div className="w-full space-y-3">
                    <a
                      href="mailto:support@foundersprime.com"
                      className="w-full py-2.5 flex items-center justify-center gap-2 bg-black dark:bg-[#1a1a1a] text-white border-2 border-black dark:border-white/15 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] font-mono text-xs uppercase hover:bg-primary hover:text-black transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Get in Touch
                    </a>
                    <a
                      href="https://twitter.com/foundersprime"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 flex items-center justify-center gap-2 bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-white border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] font-mono text-xs uppercase hover:bg-accent-yellow hover:text-black transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">alternate_email</span>
                      @FoundersPrime
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="lg:col-span-8">
                <h2 className="font-mono text-2xl font-black uppercase mb-4 md:mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="material-symbols-outlined">contact_support</span>
                  Reach Out
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'General Enquiries', hover: 'hover:bg-accent-yellow hover:text-black' },
                    { label: 'Support', hover: 'hover:bg-primary hover:text-black' },
                    { label: 'Press & Media', hover: 'hover:bg-accent-blue hover:text-white' },
                    { label: 'Partnerships & Deals', hover: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black' },
                  ].map(({ label, hover }) => (
                    <a key={label} href="mailto:support@foundersprime.com" className={`bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[4px_4px_0px_#111] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] p-5 group transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 ${hover}`}>
                      <span className="font-mono text-xs font-bold uppercase text-gray-500 group-hover:text-current block mb-1">{label}</span>
                      <span className="font-mono text-sm font-bold text-gray-900 dark:text-white group-hover:text-current">support@foundersprime.com</span>
                    </a>
                  ))}
                </div>

                {/* CTA strip */}
                <div className="relative border-2 border-black dark:border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-black p-6 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden shadow-[6px_6px_0px_#ffd700]">
                  <Mandala
                    variant="orbital"
                    colorClass="text-accent-yellow"
                    opacity={0.12}
                    speed={70}
                    strokeWidth={0.7}
                    className="absolute -top-8 -right-8 w-36 h-36"
                  />
                  <div className="relative">
                    <p className="font-mono text-white font-black text-lg uppercase">Ready to save money?</p>
                    <p className="font-mono text-gray-400 text-sm mt-1">Start with our verified deals — free, no credit card.</p>
                  </div>
                  <Link
                    href="/deals"
                    className="relative shrink-0 inline-flex items-center gap-2 bg-primary text-black font-mono font-black text-sm uppercase px-6 py-3 border-2 border-black hover:bg-accent-yellow transition-colors shadow-[4px_4px_0px_#ffd700] hover:shadow-[2px_2px_0px_#ffd700]"
                  >
                    Browse Deals
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
