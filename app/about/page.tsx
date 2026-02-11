import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About FoundersPrime | FoundersPrime',
  description: 'Learn about FoundersPrime\'s mission to help founders access non-dilutive capital and resources. Built from experience, not theory.',
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b-3 border-surface-dark bg-white py-16 md:py-24 pattern-grid-lg">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <div className="inline-block bg-accent-yellow border-2 border-surface-dark px-3 py-1 mb-6 shadow-neo-sm">
                  <span className="font-mono text-xs font-bold uppercase">Our Mission</span>
                </div>
                <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-surface-dark mb-8 uppercase">
                  Built From <br className="hidden md:block" />
                  <span className="text-primary bg-surface-dark px-2">Experience</span>, <br className="hidden md:block" />
                  Not Theory
                </h1>
                <p className="font-mono text-lg md:text-xl leading-relaxed max-w-2xl border-l-4 border-primary pl-6 text-slate-700">
                  We saved $20,000+ using these resources. Now we help other founders do the same. No fluff. No expensive consultants. Just the raw data you need.
                </p>
              </div>
              <div className="w-full md:w-[400px] shrink-0">
                <div className="neo-brutal-box p-6 bg-primary/10 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-surface-dark/10">
                    <span className="material-symbols-outlined text-[150px]">savings</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 relative z-10">Total Savings Tracked</h3>
                  <div className="font-mono text-5xl font-bold text-primary mb-2 relative z-10">$4.2M+</div>
                  <p className="font-mono text-sm text-surface-dark/70 relative z-10">Across 1,200+ startups in our network.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Story */}
        <section className="py-20 bg-[#F4F3EF] border-b-3 border-surface-dark">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <h2 className="font-display text-3xl font-black uppercase mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl">history_edu</span>
              The Story
            </h2>
            <div className="space-y-6 font-body text-lg leading-relaxed text-surface-dark">
              <p>
                It started with a spreadsheet. After wasting weeks navigating broken links, expired offers, and predatory &quot;consultants&quot; asking for 5% equity just to introduce us to a grant officer, we realized the startup ecosystem was fundamentally broken.
              </p>
              <p>
                The information was out there, but it was fragmented, hidden behind paywalls, or buried in SEO-spam articles.
              </p>
              <p className="font-bold border-b-2 border-primary inline-block">
                So we built FoundersPrime.
              </p>
              <p>
                We designed it to be the resource we wished we had—a verified, no-nonsense database of non-dilutive capital and tools. We don&apos;t sell your data. We don&apos;t take a cut. We just give you the map.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do (Methodology) */}
        <section className="py-20 bg-white border-b-3 border-surface-dark">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight max-w-xl">
                How We Maintain Quality
              </h2>
              <div className="font-mono text-sm border-2 border-surface-dark px-3 py-1 bg-white">
                System Status: <span className="text-green-600 font-bold">OPERATIONAL</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="neo-brutal-box p-6 bg-white relative group">
                <div className="absolute -top-5 -left-3 bg-surface-dark text-white font-mono text-xl font-bold p-2 border-2 border-white shadow-sm">01</div>
                <div className="mb-4 text-accent-blue mt-2">
                  <span className="material-symbols-outlined text-5xl">search</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-2">Research</h3>
                <p className="text-sm">We scour gov sites, corporate portals, and private investor networks daily for new opportunities.</p>
              </div>
              <div className="neo-brutal-box p-6 bg-white relative group">
                <div className="absolute -top-5 -left-3 bg-surface-dark text-white font-mono text-xl font-bold p-2 border-2 border-white shadow-sm">02</div>
                <div className="mb-4 text-accent-yellow mt-2">
                  <span className="material-symbols-outlined text-5xl">verified</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-2">Verify</h3>
                <p className="text-sm">We personally test promo codes and call grant offices to ensure programs are active before listing.</p>
              </div>
              <div className="neo-brutal-box p-6 bg-white relative group">
                <div className="absolute -top-5 -left-3 bg-surface-dark text-white font-mono text-xl font-bold p-2 border-2 border-white shadow-sm">03</div>
                <div className="mb-4 text-primary mt-2">
                  <span className="material-symbols-outlined text-5xl">update</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-2">Update</h3>
                <p className="text-sm">Dead links are removed weekly. If it&apos;s on FoundersPrime, it works. No 404s allowed.</p>
              </div>
              <div className="neo-brutal-box p-6 bg-white relative group">
                <div className="absolute -top-5 -left-3 bg-surface-dark text-white font-mono text-xl font-bold p-2 border-2 border-white shadow-sm">04</div>
                <div className="mb-4 text-accent-red mt-2">
                  <span className="material-symbols-outlined text-5xl">visibility</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-2">Add Context</h3>
                <p className="text-sm">We translate &quot;legalese&quot; into plain English so you know exactly what the catch is.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-[#F4F3EF] border-b-3 border-surface-dark">
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <h2 className="font-display text-3xl font-black uppercase mb-10 text-center">What Makes Us Different</h2>
            <div className="overflow-x-auto neo-brutal-box p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-dark text-white font-mono text-sm uppercase">
                    <th className="p-4 border-r-2 border-white/20 w-1/3">Feature</th>
                    <th className="p-4 border-r-2 border-white/20 w-1/4 bg-primary text-surface-dark font-bold">FoundersPrime</th>
                    <th className="p-4 border-r-2 border-white/20 w-1/4 opacity-70">Other Platforms</th>
                    <th className="p-4 w-1/4 opacity-70">Google Sheets</th>
                  </tr>
                </thead>
                <tbody className="font-medium">
                  <tr className="border-b-2 border-surface-dark/10 hover:bg-white">
                    <td className="p-4 border-r-2 border-surface-dark">Link Verification</td>
                    <td className="p-4 border-r-2 border-surface-dark bg-primary/10 font-bold">Weekly Manual Tests</td>
                    <td className="p-4 border-r-2 border-surface-dark text-sm text-gray-600">Automated/Rare</td>
                    <td className="p-4 text-sm text-gray-600">None</td>
                  </tr>
                  <tr className="border-b-2 border-surface-dark/10 hover:bg-white">
                    <td className="p-4 border-r-2 border-surface-dark">Non-Dilutive Focus</td>
                    <td className="p-4 border-r-2 border-surface-dark bg-primary/10 font-bold">100% Focused</td>
                    <td className="p-4 border-r-2 border-surface-dark text-sm text-gray-600">Mixed/SaaS deals</td>
                    <td className="p-4 text-sm text-gray-600">Random</td>
                  </tr>
                  <tr className="border-b-2 border-surface-dark/10 hover:bg-white">
                    <td className="p-4 border-r-2 border-surface-dark">Hidden Fees</td>
                    <td className="p-4 border-r-2 border-surface-dark bg-primary/10 font-bold">Zero ($0)</td>
                    <td className="p-4 border-r-2 border-surface-dark text-sm text-gray-600">Upsells</td>
                    <td className="p-4 text-sm text-gray-600">Ads/Phishing</td>
                  </tr>
                  <tr className="hover:bg-white">
                    <td className="p-4 border-r-2 border-surface-dark">Context & Guides</td>
                    <td className="p-4 border-r-2 border-surface-dark bg-primary/10 font-bold">Included</td>
                    <td className="p-4 border-r-2 border-surface-dark text-sm text-gray-600">Basic Info</td>
                    <td className="p-4 text-sm text-gray-600">None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Our Principles */}
        <section className="py-20 bg-white border-b-3 border-surface-dark">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="font-display text-3xl font-black uppercase mb-12">Our Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-3 border-surface-dark">
              <div className="p-8 border-b-3 md:border-b-0 md:border-r-3 border-surface-dark hover:bg-background-light transition-colors">
                <div className="inline-flex items-center gap-2 mb-3 bg-accent-blue/20 px-3 py-1 rounded-sm">
                  <span className="material-symbols-outlined text-sm font-bold">target</span>
                  <span className="font-mono text-xs font-bold uppercase">Principle 01</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Accuracy Over Quantity</h3>
                <p className="text-surface-dark/80">We&apos;d rather list 50 grants that actually pay out than 5,000 that are expired or scams. Quality is our metric.</p>
              </div>
              <div className="p-8 border-b-3 md:border-b-0 border-surface-dark hover:bg-background-light transition-colors">
                <div className="inline-flex items-center gap-2 mb-3 bg-primary/20 px-3 py-1 rounded-sm">
                  <span className="material-symbols-outlined text-sm font-bold">person</span>
                  <span className="font-mono text-xs font-bold uppercase">Principle 02</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Founder-First</h3>
                <p className="text-surface-dark/80">We build for the founder with 2 months of runway left. Every resource is vetted for speed and utility.</p>
              </div>
              <div className="p-8 border-b-3 md:border-b-0 md:border-r-3 border-surface-dark md:border-t-3 hover:bg-background-light transition-colors">
                <div className="inline-flex items-center gap-2 mb-3 bg-accent-yellow/20 px-3 py-1 rounded-sm">
                  <span className="material-symbols-outlined text-sm font-bold">visibility</span>
                  <span className="font-mono text-xs font-bold uppercase">Principle 03</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Transparency</h3>
                <p className="text-surface-dark/80">If we make a commission on a tool, we say it. If a grant is hard to get, we say it. No surprises.</p>
              </div>
              <div className="p-8 md:border-t-3 border-surface-dark hover:bg-background-light transition-colors">
                <div className="inline-flex items-center gap-2 mb-3 bg-accent-red/20 px-3 py-1 rounded-sm">
                  <span className="material-symbols-outlined text-sm font-bold">block</span>
                  <span className="font-mono text-xs font-bold uppercase">Principle 04</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">No Bullshit</h3>
                <p className="text-surface-dark/80">Zero hype. Zero growth-hacking buzzwords. Just tools and money to build your business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Team & Contact */}
        <section className="py-20 bg-[#F4F3EF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl font-black uppercase mb-8">The Team</h2>
                <div className="neo-brutal-box p-6 bg-white flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-gray-300 border-3 border-surface-dark mb-4 overflow-hidden grayscale contrast-125 rounded-full">
                    <img className="w-full h-full object-cover" alt="Black and white portrait of a serious man in a suit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwz9Rb06yhRNPmB89DSm22JXXzHxo6iiT7Tbbl0xxbDcOPDp7KQHU9aRkyoe449Lrbbv4E8HNu9-0U5zEZ6GLMo_R4ztSsRthtQO9jFAooIaW_xNEM_TfmlyvJYdZ2XGbqpYhUGb6dNhL2d8rCfejf4lpw8p3WK3eTw6ssHtEG_ARqdyhEDLMuSEcqMcGlx4_Zwzm8684qHfEXlOKho7xJJl62lYqCxLm2XNYjG9UYUxhU6H6fri-mxSaHy-BZDx-MFoxPr1pCMmYG" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">Alex Mercer</h3>
                  <p className="font-mono text-sm text-primary font-bold mb-4">FOUNDER & CEO</p>
                  <p className="text-sm mb-6 max-w-xs mx-auto">Former YC founder. 3x bootstrapper. Obsessed with efficient capital allocation.</p>
                  <a className="neo-button w-full py-2 flex items-center justify-center gap-2 bg-surface-dark text-white font-mono text-sm uppercase hover:bg-primary hover:text-surface-dark transition-colors" href="#">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                    @AlexMercer
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl font-black uppercase mb-8">Contact Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a className="neo-brutal-box p-5 hover:bg-accent-yellow transition-colors group" href="mailto:support@foundersprime.com">
                    <span className="font-mono text-xs text-surface-dark/60 font-bold uppercase block mb-1">General</span>
                    <span className="font-display text-lg font-bold group-hover:underline">support@foundersprime.com</span>
                  </a>
                  <a className="neo-brutal-box p-5 hover:bg-primary transition-colors group" href="mailto:support@foundersprime.com">
                    <span className="font-mono text-xs text-surface-dark/60 font-bold uppercase block mb-1">Support</span>
                    <span className="font-display text-lg font-bold group-hover:underline">support@foundersprime.com</span>
                  </a>
                  <a className="neo-brutal-box p-5 hover:bg-accent-blue hover:text-white transition-colors group" href="mailto:support@foundersprime.com">
                    <span className="font-mono text-xs text-surface-dark/60 group-hover:text-white/80 font-bold uppercase block mb-1">Press</span>
                    <span className="font-display text-lg font-bold group-hover:underline">support@foundersprime.com</span>
                  </a>
                  <a className="neo-brutal-box p-5 hover:bg-accent-red hover:text-white transition-colors group" href="mailto:support@foundersprime.com">
                    <span className="font-mono text-xs text-surface-dark/60 group-hover:text-white/80 font-bold uppercase block mb-1">Partnerships</span>
                    <span className="font-display text-lg font-bold group-hover:underline">support@foundersprime.com</span>
                  </a>
                </div>
                <div className="flex gap-4 mt-6">
                  <a className="neo-button px-6 py-3 flex-1 flex items-center justify-center gap-2 bg-white font-bold uppercase hover:bg-gray-100" href="#">
                    <span className="material-symbols-outlined">link</span>
                    Twitter / X
                  </a>
                  <a className="neo-button px-6 py-3 flex-1 flex items-center justify-center gap-2 bg-white font-bold uppercase hover:bg-gray-100" href="#">
                    <span className="material-symbols-outlined">business_center</span>
                    LinkedIn
                  </a>
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
