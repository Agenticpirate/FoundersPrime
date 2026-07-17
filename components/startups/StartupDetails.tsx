"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { YCCompany } from "@/types/startup";
import { Globe, Linkedin, Twitter, ArrowLeft, MapPin, Users, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import Mandala from "@/components/ui/Mandala";
import { motion } from "framer-motion";

interface StartupDetailsProps {
  company: YCCompany;
}

/** Resilient logo loader — same fallback chain as StartupCard */
function useLogoChain(opts: { logoUrl?: string; website?: string; name: string }) {
  const buildChain = () => {
    const chain: string[] = [];
    if (opts.logoUrl) chain.push(opts.logoUrl);
    if (opts.website) {
      try {
        const domain = new URL(opts.website).hostname.replace("www.", "");
        chain.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
        chain.push(`https://logo.clearbit.com/${domain}`);
        chain.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
      } catch {}
    }
    chain.push(
      `https://ui-avatars.com/api/?name=${encodeURIComponent(opts.name)}&background=1a1a1a&color=ffd700&bold=true&size=128`
    );
    return chain;
  };
  const chain = buildChain();
  const [index, setIndex] = useState(0);
  useEffect(() => { setIndex(0); }, [opts.logoUrl, opts.website]);
  return {
    src: chain[index] ?? null,
    onError: () => setIndex((p) => Math.min(p + 1, chain.length - 1)),
  };
}

const FounderAvatar = ({ founder }: { founder: { name: string; avatar?: string } }) => {
  const { src, onError } = useLogoChain({ logoUrl: founder.avatar, name: founder.name });
  return (
    <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center relative">
      {src ? (
        <Image src={src} alt={founder.name} width={48} height={48} className="w-full h-full object-cover" onError={onError} />
      ) : (
        <span className="text-lg font-bold text-white/60 capitalize">{founder.name.charAt(0)}</span>
      )}
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.3 } }),
};

export default function StartupDetails({ company }: StartupDetailsProps) {
  const c = company as any;
  const logo = useLogoChain({ logoUrl: company.small_logo_thumb_url, website: company.website, name: company.name });

  const foundedYear = company.launched_at
    ? new Date(company.launched_at * 1000).getFullYear()
    : c.year_founded || null;

  const statusColor =
    company.status === "Active"
      ? "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30"
      : company.status === "Acquired"
      ? "bg-sky-500/20 text-sky-400 border-sky-500/30"
      : "bg-white/10 text-gray-400 border-white/10";

  const qa: { question: string; answer: string }[] = Array.isArray(c.free_response_question_answers)
    ? c.free_response_question_answers.filter((q: any) => q.answer?.trim())
    : [];

  const facts = [
    { label: "Batch", value: company.batch || "—", icon: "workspace_premium" },
    { label: "Team Size", value: company.team_size ? `${company.team_size}` : "—", icon: "group" },
    { label: "Founded", value: foundedYear ? `${foundedYear}` : "N/A", icon: "calendar_month" },
    { label: "Stage", value: c.stage || "—", icon: "trending_up" },
    { label: "Industry", value: company.industry || "—", icon: "category" },
    { label: "Location", value: company.all_locations || "Remote", icon: "location_on" },
  ];

  const tags = (
    company.tags && company.tags.length > 0
      ? company.tags
      : [company.industry, c.subindustry?.split("->").pop()?.trim()].filter(Boolean)
  ).slice(0, 6) as string[];

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 dark:bg-[#000000] min-h-screen">
      {/* Ambient decorative mandalas */}
      <Mandala variant="rings" colorClass="text-gray-900 dark:text-white/5" opacity={0.06} speed={120}
        className="absolute -top-24 -right-24 w-80 h-80 hidden md:block pointer-events-none" />
      <Mandala variant="orbital" colorClass="text-accent-yellow" opacity={0.04} speed={150} direction="ccw"
        className="absolute top-1/3 -left-28 w-72 h-72 hidden lg:block pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-10 md:pb-16">
        {/* ── Breadcrumb ── */}
        <nav className="flex mb-3 md:mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 flex-wrap">
            <li><Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/">Home</Link></li>
            <li className="text-gray-300 dark:text-white/20">/</li>
            <li><Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/startups">Verified Startups</Link></li>
            <li className="text-gray-300 dark:text-white/20">/</li>
            <li aria-current="page">
              <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[140px] md:max-w-none inline-block align-bottom">{company.name}</span>
            </li>
          </ol>
        </nav>

        {/* ── Back link ── */}
        <Link
          href="/startups"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 md:mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Startups
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-start">
          {/* ════ LEFT COLUMN ════ */}
          <div className="lg:col-span-2 space-y-4 md:space-y-5">

            {/* ── Hero card ── */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/80 to-transparent" />
              {/* Subtle glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent-yellow/5 blur-3xl pointer-events-none" />
              <Mandala variant="rings" colorClass="text-gray-900 dark:text-white/5" opacity={0.05} speed={90}
                className="absolute -top-16 -right-16 w-48 h-48 hidden md:block" />

              <div className="relative flex flex-col sm:flex-row gap-4 md:gap-6 items-start p-4 md:p-6">
                {/* Logo */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center p-2 flex-shrink-0 overflow-hidden shadow-sm">
                  {logo.src ? (
                    <Image src={logo.src} alt={company.name} width={80} height={80} className="w-full h-full object-contain" onError={logo.onError} />
                  ) : (
                    <span className="text-2xl md:text-3xl font-black text-gray-300 dark:text-white/20">{company.name.charAt(0)}</span>
                  )}
                </div>

                {/* Name + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h1 className="font-mono text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                      {company.name}
                    </h1>
                    {company.batch && (
                      <span className="px-2 py-0.5 bg-accent-yellow text-black text-[10px] md:text-xs font-black uppercase tracking-wide rounded-md shadow-sm">
                        {company.batch}
                      </span>
                    )}
                    {c.isHiring && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow/15 dark:bg-accent-yellow/20 text-amber-800 dark:text-accent-yellow border border-accent-yellow/30 text-[10px] font-bold rounded-full uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
                        Hiring
                      </span>
                    )}
                  </div>

                  <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 mb-3 leading-snug">
                    {company.one_liner}
                  </p>

                  {/* Quick meta row */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500 font-mono mb-3">
                    {company.all_locations && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{company.all_locations}
                      </span>
                    )}
                    {foundedYear && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{foundedYear}
                      </span>
                    )}
                    {company.team_size && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />{company.team_size} people
                      </span>
                    )}
                    {company.status && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                        {company.status}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] md:text-[11px] font-mono font-semibold text-gray-600 dark:text-gray-400 rounded-full uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions bar */}
              <div className="relative flex items-center gap-2 px-4 md:px-6 py-3 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02]">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-accent-yellow hover:text-black dark:hover:bg-accent-yellow dark:hover:text-black font-mono text-[11px] font-bold rounded-lg transition-all shadow-sm"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Visit Website
                  </a>
                )}
                {company.linkedin_url && (
                  <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer"
                    className="p-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] rounded-lg transition-all"
                    aria-label="LinkedIn">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {company.twitter_url && (
                  <a href={company.twitter_url} target="_blank" rel="noopener noreferrer"
                    className="p-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black hover:text-white hover:border-black dark:hover:border-white rounded-lg transition-all"
                    aria-label="X (Twitter)">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                )}
                {company.crunchbase_url && (
                  <a href={company.crunchbase_url} target="_blank" rel="noopener noreferrer"
                    className="px-2 py-1.5 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-[#099] hover:text-white hover:border-[#099] rounded-lg transition-all font-mono text-[10px] font-bold"
                    title="Crunchbase" aria-label="Crunchbase">
                    CB
                  </a>
                )}
              </div>
            </motion.div>

            {/* ── About ── */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm p-4 md:p-6 overflow-hidden"
            >
              <h2 className="font-mono text-sm md:text-base font-black uppercase mb-3 md:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-accent-yellow flex-shrink-0" />
                About Company
              </h2>
              <div className="text-[13px] md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium whitespace-pre-line">
                {company.long_description || company.one_liner}
              </div>
            </motion.div>

            {/* ── In Their Words (Q&A) ── */}
            {qa.length > 0 && (
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm p-4 md:p-6 overflow-hidden"
              >
                <h2 className="font-mono text-sm md:text-base font-black uppercase mb-3 md:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-accent-yellow flex-shrink-0" />
                  In Their Words
                </h2>
                <div className="space-y-4">
                  {qa.slice(0, 3).map((item, i) => (
                    <div key={i} className="border-l-2 border-accent-yellow/50 dark:border-accent-yellow/40 pl-3 md:pl-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
                        {item.question.replace(/&#x27;/g, "'")}
                      </p>
                      <p className="text-[12px] md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium whitespace-pre-line">
                        {item.answer.replace(/\\r\\n|\\n/g, "\n").replace(/&#x27;/g, "'").trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Founders ── */}
            {company.founders_enriched && company.founders_enriched.length > 0 && (
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="relative bg-gray-900 dark:bg-[#0c0c0c] border border-gray-800 dark:border-white/10 rounded-xl overflow-hidden"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent" />
                <Mandala variant="orbital" colorClass="text-accent-yellow" opacity={0.06} speed={80}
                  className="absolute -bottom-16 -right-16 w-56 h-56 pointer-events-none" />

                <div className="relative p-4 md:p-6">
                  <h2 className="font-mono text-sm md:text-base font-black uppercase mb-3 md:mb-4 flex items-center gap-2 text-accent-yellow">
                    <span className="w-2 h-2 rounded-full bg-accent-yellow flex-shrink-0" />
                    Active Founders
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {company.founders_enriched.map((founder, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 hover:bg-white/8 transition-colors">
                        <div className="flex items-start gap-3 mb-2">
                          <FounderAvatar founder={founder} />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-mono font-black text-sm text-white leading-tight truncate">{founder.name}</h3>
                            <p className="text-[10px] font-bold text-accent-yellow uppercase tracking-widest mt-0.5 mb-2 truncate">
                              {founder.title || "FOUNDER"}
                            </p>
                            <div className="flex gap-2">
                              {founder.linkedin && (
                                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer"
                                  className="text-gray-500 hover:text-[#0077b5] transition-colors" aria-label={`${founder.name} LinkedIn`}>
                                  <Linkedin className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {founder.twitter && (
                                <a href={founder.twitter} target="_blank" rel="noopener noreferrer"
                                  className="text-gray-500 hover:text-white transition-colors" aria-label={`${founder.name} X`}>
                                  <Twitter className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        {founder.bio && (
                          <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed line-clamp-3">{founder.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ════ RIGHT SIDEBAR ════ */}
          <div className="space-y-4 md:space-y-5">
            {/* Company Facts card */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm lg:sticky lg:top-20 overflow-hidden"
            >
              <Mandala variant="rings" colorClass="text-gray-900 dark:text-white/5" opacity={0.04} speed={100}
                className="absolute -top-14 -right-14 w-44 h-44 pointer-events-none" />

              <div className="relative p-4 md:p-5">
                <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.1em] mb-3 border-b border-gray-100 dark:border-white/[0.06] pb-2.5 text-gray-900 dark:text-white">
                  Company Facts
                </h3>

                {/* Visit website CTA */}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-accent-yellow hover:text-black dark:hover:bg-accent-yellow dark:hover:text-black py-2.5 font-mono text-[11px] font-bold rounded-lg transition-all shadow-sm mb-3"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Visit Website
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}

                {/* Social links */}
                {(company.linkedin_url || company.twitter_url || company.crunchbase_url) && (
                  <div className="flex gap-2 justify-center mb-3">
                    {company.linkedin_url && (
                      <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer"
                        className="p-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] rounded-lg transition-all text-gray-600 dark:text-gray-400"
                        aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                    )}
                    {company.twitter_url && (
                      <a href={company.twitter_url} target="_blank" rel="noopener noreferrer"
                        className="p-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black hover:text-white hover:border-black dark:hover:border-white rounded-lg transition-all text-gray-600 dark:text-gray-400"
                        aria-label="X (Twitter)"><Twitter className="w-4 h-4" /></a>
                    )}
                    {company.crunchbase_url && (
                      <a href={company.crunchbase_url} target="_blank" rel="noopener noreferrer"
                        className="px-2.5 py-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-[#099] hover:text-white hover:border-[#099] rounded-lg transition-all font-mono text-[10px] font-black text-gray-600 dark:text-gray-400"
                        aria-label="Crunchbase">CB</a>
                    )}
                  </div>
                )}

                {/* Facts list */}
                <div className="space-y-0 text-[11px] md:text-[12px]">
                  {facts.map((fact, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-100 dark:border-white/[0.06] py-2 last:border-0">
                      <span className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider font-mono">
                        <span className="material-symbols-outlined text-[13px] md:text-[14px]">{fact.icon}</span>
                        {fact.label}
                      </span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white text-right max-w-[55%] truncate">{fact.value}</span>
                    </div>
                  ))}
                  {/* Status row */}
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider font-mono">
                      <span className="material-symbols-outlined text-[13px] md:text-[14px]">bolt</span>
                      Status
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[9px] md:text-[10px] font-bold rounded-full border ${statusColor}`}>
                      {company.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Verified badge card */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="relative bg-gray-900 dark:bg-[#0c0c0c] border border-gray-800 dark:border-white/10 rounded-xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent" />
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-accent-yellow/20 border border-accent-yellow/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent-yellow text-[16px]">verified</span>
                  </div>
                  <h4 className="font-mono text-[11px] font-black uppercase tracking-[0.1em] text-white">
                    Data Verified
                  </h4>
                </div>
                <p className="font-sans text-[11px] text-gray-400 leading-relaxed mb-3">
                  Sourced directly from Y Combinator&apos;s public company database. Real metrics, vetted founders.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wide text-accent-yellow mb-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
                    YC Verified
                  </p>
                  <p className="font-sans text-[10px] text-gray-500 leading-snug">
                    Company data is sourced from the official YC company directory and publicly available information.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
