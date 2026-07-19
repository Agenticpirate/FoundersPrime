"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { StartupCardData } from "@/lib/startups-data";
import { MapPin, ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";
import {
  CardHoverGlowShell,
  cardHoverClass,
  cardLogoHoverClass,
  cardTitleHoverClass,
} from "@/components/ui/card-hover";
import { cardTitle, cardDescription } from "@/lib/card-text";

interface StartupCardProps {
  company: StartupCardData;
}

const FounderAvatar = ({ founder }: { founder: { name: string; avatar?: string } }) => {
  const [error, setError] = useState(false);
  return (
    <div
      className="h-5 w-5 md:h-6 md:w-6 rounded-full ring-2 ring-[#0c0c0c] border border-white/10 bg-white/10 flex items-center justify-center overflow-hidden relative z-0 hover:z-10 transition-all"
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
        <span className="text-[8px] font-bold text-gray-400 uppercase">{founder.name.charAt(0)}</span>
      )}
    </div>
  );
};

/**
 * Mobile-compact startup card — same density as All Deals:
 * fixed height, 2-col grid friendly, short copy, value/CTA bar.
 */
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
      chain.push(`https://img.logo.dev/${domain}?token=pk_WQ-XL0MlQ3-ODa_K0zgqEg&size=128&format=png`);
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

  const shortName = cardTitle(company.name, 28);
  const shortLine = cardDescription(company.one_liner || "", 64);

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.22 }}
      className={`relative h-[168px] md:h-[196px] flex flex-col rounded-xl md:rounded-2xl min-w-0 border border-white/10 bg-[#0c0c0c] overflow-visible ${cardHoverClass}`}
    >
      <CardHoverGlowShell />

      <div className="relative z-[1] flex flex-col flex-1 p-2.5 md:p-3.5 min-w-0">
        {/* Logo + name + bookmark */}
        <div
          className="shrink-0 min-w-0 pr-7"
          style={{
            display: "grid",
            gridTemplateColumns: "40px minmax(0, 1fr)",
            columnGap: 8,
            alignItems: "start",
          }}
        >
          <div
            className={`w-10 h-10 flex-shrink-0 bg-white border border-black/10 rounded-[10px] flex items-center justify-center overflow-hidden p-1.5 ${cardLogoHoverClass}`}
          >
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={`${company.name} logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            ) : (
              <span className="text-sm font-black text-gray-400">{company.name.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0 overflow-hidden pt-0.5">
            <div className="flex items-center gap-1 min-w-0">
              <h3
                className={`font-bold text-[11px] md:text-[13px] text-white leading-[1.2] truncate ${cardTitleHoverClass}`}
                title={company.name}
              >
                <Link href={`/startups/${company.slug}`} className="focus:outline-none">
                  {shortName}
                </Link>
              </h3>
              <span
                className="flex items-center justify-center w-3 h-3 rounded-full bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30 flex-shrink-0"
                title="Verified Startup"
              >
                <span className="material-symbols-outlined text-[8px] font-bold">check</span>
              </span>
            </div>
            {company.all_locations && (
              <div className="mt-0.5 flex items-center gap-0.5 text-[9px] text-gray-500 font-mono min-w-0">
                <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="truncate">{company.all_locations}</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className={`absolute top-2 right-2 z-10 flex-shrink-0 p-1 rounded-md border transition-colors ${
            isBookmarked
              ? "bg-accent-yellow border-accent-yellow text-black"
              : "border-white/10 text-gray-500 hover:text-white hover:bg-white/5"
          }`}
          aria-label="Bookmark startup"
        >
          <Bookmark className="h-3 w-3 fill-current" />
        </button>

        <p
          className="mt-1.5 md:mt-2 shrink-0 text-[10px] md:text-[11px] leading-[1.3] h-[1.3rem] md:h-[2.6rem] text-gray-400 line-clamp-1 md:line-clamp-2 overflow-hidden"
          title={company.one_liner}
        >
          {shortLine}
        </p>

        {/* Tags — desktop only to keep mobile dense */}
        {company.tags && company.tags.length > 0 && (
          <div className="hidden md:flex mt-1.5 flex-wrap gap-1">
            {company.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={tag}
                className="text-[8px] font-mono font-semibold uppercase tracking-wide text-gray-400 bg-white/5 px-1.5 py-0.5 rounded-full border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer bar */}
        <div className="mt-auto shrink-0 w-full min-w-0 pt-1.5">
          <div className="w-full flex items-center justify-between gap-1.5 h-8 md:h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] pl-2 pr-0.5 md:pr-1 min-w-0">
            <div className="flex -space-x-1.5 overflow-hidden min-w-0">
              {(company.founders_enriched || []).slice(0, 3).map((founder) => (
                <FounderAvatar key={founder.name || founder.avatar} founder={founder} />
              ))}
              {(!company.founders_enriched || company.founders_enriched.length === 0) && (
                <span className="text-[9px] font-mono text-gray-500 truncate">—</span>
              )}
            </div>
            <Link
              href={`/startups/${company.slug}`}
              className="shrink-0 inline-flex h-6 md:h-7 items-center justify-center gap-0.5 md:gap-1 bg-[#000000] text-white border border-[#FFD500]/40 text-[8px] md:text-[9px] font-bold uppercase tracking-wide px-1.5 md:px-2.5 rounded-md shadow-sm group-hover:bg-[#FFD500] group-hover:text-black group-hover:border-[#FFD500] hover:bg-[#FFD500] hover:text-black hover:border-[#FFD500] transition-all duration-200 leading-none"
            >
              <span className="leading-none md:hidden">View</span>
              <span className="leading-none hidden md:inline">Details</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </m.div>
  );
}
