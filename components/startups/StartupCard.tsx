"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StartupCardData } from "@/lib/startups-data";
import { MapPin, ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";
import { CardHoverGlow, cardHoverClass, cardLogoHoverClass, cardTitleHoverClass } from "@/components/ui/card-hover";

interface StartupCardProps {
  company: StartupCardData;
}

// Internal component to handle founder image errors
const FounderAvatar = ({ founder }: { founder: { name: string; avatar?: string } }) => {
  const [error, setError] = useState(false);
  return (
    <div
      className="h-6 w-6 rounded-full ring-2 ring-[#0c0c0c] border border-white/10 bg-white/10 flex items-center justify-center overflow-hidden relative z-0 hover:z-10 transition-all"
      title={founder.name}
    >
      {founder.avatar && !error ? (
        <Image
          src={founder.avatar}
          alt={founder.name}
          width={24}
          height={24}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-[9px] font-bold text-gray-400 uppercase">
          {founder.name.charAt(0)}
        </span>
      )}
    </div>
  );
};

export default function StartupCard({ company }: StartupCardProps) {
  const getDomain = () => {
    if (!company.website) return null;
    try {
      return new URL(company.website).hostname.replace("www.", "");
    } catch {
      return null;
    }
  };

  const buildFallbackChain = () => {
    const chain: string[] = [];
    if (company.small_logo_thumb_url) chain.push(company.small_logo_thumb_url);
    const domain = getDomain();
    if (domain) {
      chain.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      chain.push(`https://logo.clearbit.com/${domain}`);
      chain.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    }
    chain.push(
      `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=1a1a1a&color=ffd700&bold=true&size=128`
    );
    return chain;
  };

  const fallbackChain = buildFallbackChain();
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setFallbackIndex(0);
  }, [company.small_logo_thumb_url, company.website]);

  const imgSrc = fallbackChain[fallbackIndex] ?? null;
  const handleImageError = () => {
    setFallbackIndex((prev) => Math.min(prev + 1, fallbackChain.length - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col bg-[#0c0c0c] border border-white/10 rounded-xl h-full ${cardHoverClass}`}
    >
      <CardHoverGlow />
      {/* Header: logo + name + verified badge + bookmark */}
      <div className="relative flex items-start justify-between gap-2 px-4 pt-4 pb-2">
        <div className="flex items-start gap-3 min-w-0">
          {/* Logo */}
          <div className={`w-11 h-11 flex-shrink-0 bg-white border border-black/10 rounded-lg flex items-center justify-center overflow-hidden p-1 ${cardLogoHoverClass}`}>
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={`${company.name} logo`}
                width={44}
                height={44}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            ) : (
              <span className="text-lg font-black text-gray-400">
                {company.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Name + location */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className={`font-mono text-[13px] font-bold text-white leading-tight truncate ${cardTitleHoverClass}`}>
                <Link href={`/startups/${company.slug}`} className="focus:outline-none">
                  {company.name}
                </Link>
              </h3>
              {/* Verified check indicator */}
              <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30 flex-shrink-0" title="Verified Startup">
                <span className="material-symbols-outlined text-[9px] font-bold">check</span>
              </span>
            </div>
            {company.all_locations && (
              <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="truncate">{company.all_locations}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bookmark action button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className={`flex-shrink-0 p-1.5 rounded-lg border transition-colors ${
            isBookmarked
              ? "bg-accent-yellow border-accent-yellow text-black"
              : "border-white/10 text-gray-500 hover:text-white hover:bg-white/5"
          }`}
          aria-label="Bookmark startup"
        >
          <Bookmark className="h-3 w-3 fill-current" />
        </button>
      </div>

      {/* Description */}
      <div className="px-4 pb-3 flex-grow mt-1">
        <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2 font-sans">
          {company.one_liner}
        </p>
      </div>

      {/* Tags */}
      {company.tags && company.tags.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1">
          {company.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono font-semibold uppercase tracking-wide text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: founders + Redirect CTA */}
      <div className="mt-auto px-4 pb-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        {/* Founder avatars */}
        <div className="flex -space-x-1.5 overflow-hidden">
          {(company.founders_enriched || []).slice(0, 3).map((founder, i) => (
            <FounderAvatar key={i} founder={founder} />
          ))}
          {(!company.founders_enriched || company.founders_enriched.length === 0) && (
            <div className="h-6 w-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-gray-500">–</span>
            </div>
          )}
        </div>

        {/* View Details Redirect Button */}
        <Link
          href={`/startups/${company.slug}`}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-black hover:bg-accent-yellow hover:text-black transition-colors"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}