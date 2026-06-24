import IdeaSaveButton, { ideaIdFromTitle } from "./IdeaSaveButton";

interface IdeaCardProps {
  idea: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    author: string;
    source: string;
    itchScore?: string;
  };
  index?: number;
}

// Category → icon + color config (matching screenshot)
const CATEGORY_CONFIG: Record<string, { icon: string; bg: string; text: string; border: string }> = {
  "AI Tools":          { icon: "auto_awesome",      bg: "bg-violet-500/20", text: "text-violet-400",   border: "border-violet-500/30" },
  "AI Infrastructure": { icon: "memory",            bg: "bg-purple-500/20", text: "text-purple-400",   border: "border-purple-500/30" },
  "Fintech":           { icon: "account_balance",   bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
  "FinTech":           { icon: "account_balance",   bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
  "SaaS":              { icon: "cloud",             bg: "bg-sky-500/20",    text: "text-sky-400",      border: "border-sky-500/30" },
  "Services":          { icon: "design_services",   bg: "bg-blue-500/20",   text: "text-blue-400",     border: "border-blue-500/30" },
  "GovTech":           { icon: "account_balance",   bg: "bg-cyan-500/20",   text: "text-cyan-400",     border: "border-cyan-500/30" },
  "Manufacturing":     { icon: "precision_manufacturing", bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  "Industrial":        { icon: "factory",           bg: "bg-amber-500/20",  text: "text-amber-400",    border: "border-amber-500/30" },
  "Healthcare":        { icon: "favorite",          bg: "bg-rose-500/20",   text: "text-rose-400",     border: "border-rose-500/30" },
  "Healthtech":        { icon: "health_and_safety", bg: "bg-red-500/20",    text: "text-red-400",      border: "border-red-500/30" },
  "EdTech":            { icon: "school",            bg: "bg-yellow-500/20", text: "text-yellow-400",   border: "border-yellow-500/30" },
  "E-commerce":        { icon: "shopping_bag",      bg: "bg-pink-500/20",   text: "text-pink-400",     border: "border-pink-500/30" },
  "Consumer Services": { icon: "person",            bg: "bg-indigo-500/20", text: "text-indigo-400",   border: "border-indigo-500/30" },
  "B2B Services":      { icon: "business",          bg: "bg-teal-500/20",   text: "text-teal-400",     border: "border-teal-500/30" },
  "Logistics":         { icon: "local_shipping",    bg: "bg-lime-500/20",   text: "text-lime-400",     border: "border-lime-500/30" },
  "Transportation":    { icon: "directions_car",    bg: "bg-stone-500/20",  text: "text-stone-400",    border: "border-stone-500/30" },
  "Hardware":          { icon: "developer_board",   bg: "bg-zinc-500/20",   text: "text-zinc-400",     border: "border-zinc-500/30" },
  "Real Estate":       { icon: "home",              bg: "bg-amber-600/20",  text: "text-amber-500",    border: "border-amber-600/30" },
  "Housing":           { icon: "apartment",         bg: "bg-yellow-600/20", text: "text-yellow-500",   border: "border-yellow-600/30" },
  "Automotive":        { icon: "directions_car",    bg: "bg-red-600/20",    text: "text-red-500",      border: "border-red-600/30" },
  "Food & Beverage":   { icon: "restaurant",        bg: "bg-green-600/20",  text: "text-green-500",    border: "border-green-600/30" },
  "Career":            { icon: "work",              bg: "bg-slate-500/20",  text: "text-slate-400",    border: "border-slate-500/30" },
  "Travel":            { icon: "flight",            bg: "bg-sky-600/20",    text: "text-sky-500",      border: "border-sky-600/30" },
  "Home Services":     { icon: "handyman",          bg: "bg-orange-600/20", text: "text-orange-500",   border: "border-orange-600/30" },
};

// Tag → color mapping (like in the screenshot)
const TAG_COLORS = [
  "bg-violet-500/15 text-violet-300 border-violet-500/25",
  "bg-sky-500/15 text-sky-300 border-sky-500/25",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  "bg-amber-500/15 text-amber-300 border-amber-500/25",
  "bg-pink-500/15 text-pink-300 border-pink-500/25",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
];

function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category] || {
    icon: "lightbulb",
    bg: "bg-accent-yellow/20",
    text: "text-accent-yellow",
    border: "border-accent-yellow/30",
  };
}

// Deterministic signal score per idea (based on title hash)
function getSignalScore(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
  return 75 + Math.abs(hash) % 25; // 75–99%
}

// Short source label
function getSourceLabel(source: string): string {
  if (source.includes("YC")) return "YC";
  if (source.includes("Razorpay")) return "RP";
  return source.substring(0, 2).toUpperCase();
}

export default function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  const cfg = getCategoryConfig(idea.category);
  const signal = idea.itchScore ? parseInt(idea.itchScore) : getSignalScore(idea.title);
  const srcLabel = getSourceLabel(idea.source);

  return (
    <div
      className="idea-card group relative flex flex-col bg-[#0f0f0f] dark:bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-200 h-full"
      style={{ animationDelay: `${Math.min(index, 9) * 0.04}s` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/0 to-transparent group-hover:via-accent-yellow/60 transition-all duration-300" />

      <div className="relative flex flex-col flex-1 p-4">
        {/* ── Top row: category icon + bookmark ── */}
        <div className="flex items-start justify-between mb-3">
          {/* Category icon circle */}
          <div className={`w-9 h-9 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}>
            <span className={`material-symbols-outlined text-[18px] ${cfg.text}`}>{cfg.icon}</span>
          </div>
          {/* Bookmark */}
          <IdeaSaveButton
            ideaId={ideaIdFromTitle(idea.title)}
            variant="icon"
            className="p-1.5 border border-white/10 bg-white/5 hover:bg-accent-yellow hover:border-accent-yellow text-gray-500 hover:text-black rounded-lg transition-all duration-150 disabled:opacity-60"
          />
        </div>

        {/* ── Tags row ── */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {/* Category as first tag */}
          <span className={`px-1.5 py-0.5 font-mono text-[9px] font-bold rounded border uppercase tracking-wide ${TAG_COLORS[0]}`}>
            {idea.category}
          </span>
          {idea.tags && idea.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className={`px-1.5 py-0.5 font-mono text-[9px] font-bold rounded border uppercase tracking-wide ${TAG_COLORS[(i + 1) % TAG_COLORS.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Title ── */}
        <h3 className="font-mono text-[13px] font-bold text-white leading-snug mb-2 group-hover:text-accent-yellow transition-colors line-clamp-2 flex-none">
          {idea.title}
        </h3>

        {/* ── Description ── */}
        <p className="font-sans text-[11px] text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-3">
          {idea.description}
        </p>

        {/* ── Footer: source badge + signal + explore ── */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.07] mt-auto">
          {/* Source badge */}
          <span className="px-1.5 py-0.5 bg-white/10 text-gray-300 font-mono text-[9px] font-bold rounded uppercase border border-white/10">
            {srcLabel}
          </span>

          {/* Signal score */}
          <div className="flex items-center gap-0.5 text-gray-400">
            <span className="material-symbols-outlined text-[11px] text-accent-yellow">bolt</span>
            <span className="font-mono text-[9px] font-bold text-gray-300">Top Signal {signal}%</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Explore button */}
          <button className="inline-flex items-center gap-0.5 px-2.5 py-1 bg-white/10 hover:bg-accent-yellow text-gray-200 hover:text-black border border-white/10 hover:border-accent-yellow font-mono text-[10px] font-bold rounded-lg transition-all duration-150 whitespace-nowrap">
            Explore
            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes ideaCardFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .idea-card {
          animation: ideaCardFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .idea-card { animation: none; }
        }
      `}</style>
    </div>
  );
}
