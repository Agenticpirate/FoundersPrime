import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About FoundersPrime — Built by Founders, for Founders',
  description: 'FoundersPrime was built to give every bootstrapped and funded startup the unfair advantage—verified deals, non-dilutive capital, and tools that actually work.',
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="bg-white border-b-3 border-black pattern-grid-lg">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 md:py-28">
            <div className="flex flex-col md:flex-row gap-14 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-accent-yellow border-2 border-black px-3 py-1 mb-6 shadow-neo-sm">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Our Mission</span>
                </div>
                <h1 className="font-mono text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-black mb-6 uppercase">
                  Built by Founders,<br />
                  <span className="bg-black text-primary px-2">For Founders</span>
                </h1>
                <p className="font-mono text-base md:text-lg leading-relaxed text-gray-700 border-l-4 border-primary pl-5 max-w-xl">
                  FoundersPrime is the unfair advantage for bootstrapped and funded startups. We give you the verified deals, non-dilutive capital sources, and battle-tested tools that others hide behind paywalls or consultants.
                </p>
              </div>

              {/* Stats card */}
              <div className="w-full md:w-[360px] shrink-0">
                <div className="bg-black border-3 border-black shadow-[8px_8px_0px_#ffd700] p-8">
                  <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-6">Impact So Far</p>
                  <div className="space-y-5">
                    {[
                      { value: '$4.2M+', label: 'Tracked in savings' },
                      { value: '1,200+', label: 'Startups in network' },
                      { value: '500+', label: 'Verified deals listed' },
                      { value: '43+', label: 'Countries reached' },
                    ].map(({ value, label }) => (
                      <div key={label} className="flex items-baseline justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">
                        <span className="font-mono text-3xl font-black text-primary">{value}</span>
                        <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE STORY ────────────────────────────────────────────── */}
        <section className="py-20 bg-[#F4F3EF] border-b-3 border-black">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="material-symbols-outlined text-4xl">history_edu</span>
              <h2 className="font-mono text-3xl font-black uppercase">The Story</h2>
            </div>
            <div className="space-y-5 font-sans text-lg leading-relaxed text-gray-800">
              <p>
                It started with a spreadsheet. After wasting weeks navigating broken links, expired offers, and predatory &ldquo;consultants&rdquo; asking for 5% equity just to introduce us to a grant officer, we realised the startup ecosystem was fundamentally broken for founders who don&apos;t have the right network.
              </p>
              <p>
                The information was out there — but it was fragmented, hidden behind paywalls, or buried inside SEO-spam articles optimised for clicks, not founders.
              </p>
              <p className="font-bold font-mono text-xl border-b-2 border-primary inline-block pb-1">
                So we built FoundersPrime.
              </p>
              <p>
                A verified, no-nonsense database of non-dilutive capital, SaaS deals, accelerators, and tools. We don&apos;t sell your data. We don&apos;t take a cut of your funding. We just give you the map — and keep it accurate.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW WE MAINTAIN QUALITY ──────────────────────────────── */}
        <section className="py-20 bg-white border-b-3 border-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
              <h2 className="font-mono text-4xl md:text-5xl font-black uppercase tracking-tight max-w-xl">
                How We Maintain Quality
              </h2>
              <div className="font-mono text-sm border-2 border-black px-3 py-1.5 bg-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
                System Status: <span className="text-green-600 font-bold ml-1">OPERATIONAL</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: '01', icon: 'search', color: 'text-primary', bg: 'bg-primary/10', title: 'Research', desc: 'We scour government portals, corporate partner pages, and investor networks daily to find new opportunities.' },
                { num: '02', icon: 'verified', color: 'text-accent-yellow', bg: 'bg-accent-yellow/10', title: 'Verify', desc: 'We personally test promo codes, call grant offices, and apply ourselves to confirm every listing is active.' },
                { num: '03', icon: 'update', color: 'text-green-600', bg: 'bg-green-50', title: 'Update', desc: 'Dead links are removed weekly. If it\'s listed on FoundersPrime, it works. No 404s allowed.' },
                { num: '04', icon: 'visibility', color: 'text-accent-red', bg: 'bg-red-50', title: 'Add Context', desc: 'We translate legalese into plain English so you know exactly what the catch is — before you apply.' },
              ].map(({ num, icon, color, bg, title, desc }) => (
                <div key={num} className="neo-brutal-box p-6 bg-white relative group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
                  <div className="absolute -top-4 -left-3 bg-black text-white font-mono text-sm font-bold px-3 py-1.5 border-2 border-black">
                    {num}
                  </div>
                  <div className={`w-14 h-14 ${bg} border-2 border-black flex items-center justify-center mb-5 mt-3`}>
                    <span className={`material-symbols-outlined text-3xl ${color}`}>{icon}</span>
                  </div>
                  <h3 className="font-mono text-lg font-black uppercase mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section className="py-20 bg-[#F4F3EF] border-b-3 border-black">
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <h2 className="font-mono text-3xl font-black uppercase mb-12 text-center">What Makes Us Different</h2>
            <div className="neo-brutal-box p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-xs uppercase">
                    <th className="p-4 border-r-2 border-white/20 w-1/3">Feature</th>
                    <th className="p-4 border-r-2 border-black w-1/4 bg-primary text-black font-bold">FoundersPrime ✓</th>
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
                  ].map(([feature, us, them, sheet], i) => (
                    <tr key={i} className="border-b-2 border-black/10 hover:bg-white transition-colors">
                      <td className="p-4 border-r-2 border-black font-bold">{feature}</td>
                      <td className="p-4 border-r-2 border-black bg-primary/10 font-bold text-black">{us}</td>
                      <td className="p-4 border-r-2 border-black text-gray-500">{them}</td>
                      <td className="p-4 text-gray-500">{sheet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PRINCIPLES ───────────────────────────────────────────── */}
        <section className="py-20 bg-white border-b-3 border-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="font-mono text-3xl font-black uppercase mb-12">Our Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 border-3 border-black">
              {[
                { icon: 'target', color: 'bg-primary/15 text-primary', label: '01', title: 'Accuracy Over Quantity', desc: "We'd rather list 50 grants that actually pay out than 5,000 that are expired or scams. Quality is our single metric." },
                { icon: 'person', color: 'bg-accent-yellow/20 text-yellow-700', label: '02', title: 'Founder-First', desc: 'We build for the founder with 2 months of runway left. Every resource is vetted for speed, utility, and zero friction.' },
                { icon: 'visibility', color: 'bg-green-100 text-green-700', label: '03', title: 'Radical Transparency', desc: "If we earn a commission on a tool, we say so. If a grant is hard to get, we say so. No surprises. Ever." },
                { icon: 'block', color: 'bg-red-100 text-red-700', label: '04', title: 'No Bullshit', desc: 'Zero hype. Zero growth-hacking buzzwords. Just verified tools and money to build your company.' },
              ].map(({ icon, color, label, title, desc }, i) => (
                <div key={i} className={`p-8 hover:bg-[#F4F3EF] transition-colors ${i < 2 ? 'border-b-3 md:border-b-3' : ''} ${i % 2 === 0 ? 'md:border-r-3' : ''} border-black`}>
                  <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 ${color} border border-current/30`}>
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                    <span className="font-mono text-xs font-bold uppercase">Principle {label}</span>
                  </div>
                  <h3 className="font-mono text-xl font-black mb-3">{title}</h3>
                  <p className="text-gray-700 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUNDER + CONTACT ─────────────────────────────────────── */}
        <section className="py-20 bg-[#F4F3EF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Founder card */}
              <div className="lg:col-span-4">
                <h2 className="font-mono text-2xl font-black uppercase mb-8 flex items-center gap-2">
                  <span className="material-symbols-outlined">groups</span>
                  The Team
                </h2>
                <div className="neo-brutal-box bg-white p-8 flex flex-col items-center text-center">
                  {/* Branded avatar — no external image */}
                  <div className="w-24 h-24 bg-black border-3 border-black shadow-[4px_4px_0px_#ffd700] flex items-center justify-center mb-5">
                    <span className="font-mono text-3xl font-black text-primary">FP</span>
                  </div>
                  <h3 className="font-mono text-xl font-black mb-1">Ravi Teja</h3>
                  <p className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-4">Founder & CEO</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-xs">
                    Serial builder obsessed with helping bootstrapped founders save money, extend runway, and build faster through verified non-dilutive capital.
                  </p>
                  <div className="w-full space-y-3">
                    <a
                      href="mailto:support@foundersprime.com"
                      className="neo-button w-full py-2.5 flex items-center justify-center gap-2 bg-black text-white font-mono text-xs uppercase hover:bg-primary hover:text-black transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Get in Touch
                    </a>
                    <a
                      href="https://twitter.com/foundersprime"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-button w-full py-2.5 flex items-center justify-center gap-2 bg-white font-mono text-xs uppercase hover:bg-accent-yellow transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">alternate_email</span>
                      @FoundersPrime
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="lg:col-span-8">
                <h2 className="font-mono text-2xl font-black uppercase mb-8 flex items-center gap-2">
                  <span className="material-symbols-outlined">contact_support</span>
                  Reach Out
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'General Enquiries', hover: 'hover:bg-accent-yellow' },
                    { label: 'Support', hover: 'hover:bg-primary' },
                    { label: 'Press & Media', hover: 'hover:bg-accent-blue hover:text-white' },
                    { label: 'Partnerships & Deals', hover: 'hover:bg-black hover:text-white' },
                  ].map(({ label, hover }) => (
                    <a key={label} href="mailto:support@foundersprime.com" className={`neo-brutal-box p-5 group transition-colors ${hover}`}>
                      <span className="font-mono text-xs font-bold uppercase text-gray-500 group-hover:text-current block mb-1">{label}</span>
                      <span className="font-mono text-sm font-bold">support@foundersprime.com</span>
                    </a>
                  ))}
                </div>

                {/* CTA strip */}
                <div className="border-3 border-black bg-black p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-white font-black text-lg uppercase">Ready to save money?</p>
                    <p className="font-mono text-gray-400 text-sm mt-1">Start with our verified deals — free, no credit card.</p>
                  </div>
                  <Link
                    href="/deals"
                    className="shrink-0 inline-flex items-center gap-2 bg-primary text-black font-mono font-black text-sm uppercase px-6 py-3 border-2 border-primary hover:bg-accent-yellow transition-colors shadow-[4px_4px_0px_#ffd700] hover:shadow-[2px_2px_0px_#ffd700]"
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
