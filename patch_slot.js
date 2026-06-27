const fs = require('fs');
let content = fs.readFileSync('components/deals/featured/FeaturedSlot.tsx', 'utf8');

// Replace DealView banner variant
content = content.replace(
  /className="group relative flex items-center gap-4 bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white border-2 border-black rounded-xl px-4 py-3 shadow-\[3px_3px_0px_#111\] hover:shadow-\[5px_5px_0px_#111\] hover:-translate-y-px transition-all overflow-hidden"/g,
  `className="group relative flex items-center gap-4 bg-gradient-to-r from-[#140b00] to-black text-white border border-amber-500/20 rounded-xl px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.05)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.15)] hover:border-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"`
);

// Replace DealView rail variant
content = content.replace(
  /className="group relative block bg-white dark:bg-\[#0c0c0c\] border-2 border-black dark:border-white\/10 rounded-lg p-3 shadow-\[3px_3px_0px_#111\] dark:shadow-\[3px_3px_0px_rgba\(255,255,255,0.05\)\] hover:shadow-\[5px_5px_0px_#111\] dark:hover:shadow-\[5px_5px_0px_rgba\(255,255,255,0.1\)\] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"/g,
  `className="group relative block bg-[#0a0500] border border-amber-500/20 rounded-lg p-3 shadow-[0_4px_15px_rgba(245,158,11,0.05)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:border-amber-500/40 hover:-translate-y-px transition-all duration-300 overflow-hidden"`
);

// Replace Promo rail compact variant
content = content.replace(
  /className="group relative block bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-dashed border-amber-400 rounded-lg p-3 shadow-\[3px_3px_0px_#111\] hover:shadow-\[5px_5px_0px_#111\] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"/g,
  `className="group relative block bg-gradient-to-br from-[#140b00] to-black text-white border border-dashed border-amber-500/40 rounded-lg p-3 shadow-[0_4px_15px_rgba(245,158,11,0.05)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:border-amber-500/60 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"`
);

// Replace Promo banner variant
content = content.replace(
  /className="group relative flex items-center gap-4 bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white border-2 border-black rounded-xl px-4 py-3 shadow-\[3px_3px_0px_#111\] hover:shadow-\[5px_5px_0px_#111\] hover:-translate-y-px transition-all overflow-hidden"/g,
  `className="group relative flex items-center gap-4 bg-gradient-to-r from-[#140b00] to-black text-white border border-amber-500/30 rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(245,158,11,0.08)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"`
);

// Replace Promo banner mic icon and decorative elements
content = content.replace(
  /{\/\* Decorative megaphone watermark \*\/}[\s\S]*?(<span className="relative z-10 inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-\[8px\] font-black uppercase tracking-\[0.12em\] px-2 py-0.5 border border-black whitespace-nowrap">)/g,
  `{/* Decorative megaphone watermark */}
                <div className="absolute top-1/2 right-[25%] -translate-y-1/2 pointer-events-none select-none hidden lg:flex items-center justify-center opacity-[0.2] group-hover:opacity-[0.35] group-hover:scale-110 transition-all duration-500">
                    <span className="material-symbols-outlined !text-[90px] text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] -rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                    <span className="material-symbols-outlined !text-[40px] text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] absolute -top-4 -right-8 rotate-12">stars</span>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <span className="relative z-10 inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm shadow-[0_0_10px_rgba(250,204,21,0.3)] whitespace-nowrap">`
);

// Replace Promo banner text styling
content = content.replace(
  /<p className="font-mono text-sm md:text-base font-black leading-tight">Pin your deal to the top<\/p>\s*<p className="text-\[11px\] text-gray-300 truncate">Jump above every listing — seen first by thousands of founders.<\/p>/g,
  `<p className="font-mono text-sm md:text-base font-black leading-tight text-amber-50 drop-shadow-sm">Pin your deal to the top</p>
                    <p className="text-[11px] text-amber-200/80 truncate">Jump above every listing — seen first by thousands of founders.</p>`
);

// Replace Promo banner CTA
content = content.replace(
  /<span className="relative z-10 inline-flex items-center gap-1 bg-accent-yellow text-black font-mono text-\[10px\] md:text-\[11px\] font-black uppercase tracking-wide px-3 py-1.5 border-2 border-black whitespace-nowrap">/g,
  `<span className="relative z-10 inline-flex items-center gap-1 bg-amber-400/10 text-amber-400 font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wide px-3 py-1.5 border border-amber-400/30 group-hover:bg-accent-yellow group-hover:text-black group-hover:border-accent-yellow rounded-sm transition-all duration-300 whitespace-nowrap">`
);

// Replace Promo inline variant
content = content.replace(
  /className="group relative flex h-full flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-dashed border-amber-400 rounded-sm shadow-\[3px_3px_0px_#111\] hover:shadow-\[5px_5px_0px_#111\] hover:-translate-x-px hover:-translate-y-px transition-all p-4 overflow-hidden"/g,
  `className="group relative flex h-full flex-col items-center justify-center text-center bg-gradient-to-br from-[#140b00] to-black text-white border border-dashed border-amber-500/40 hover:border-amber-400/80 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:-translate-y-0.5 transition-all duration-300 p-4 overflow-hidden"`
);

// Replace Promo inline CTA
content = content.replace(
  /<span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-\[8px\] font-black uppercase tracking-\[0.12em\] px-2 py-0.5 border border-black mb-2">/g,
  `<span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm shadow-[0_0_8px_rgba(250,204,21,0.3)] mb-2">`
);
content = content.replace(
  /<span className="inline-flex items-center gap-1 bg-accent-yellow text-black font-mono text-\[10px\] font-black uppercase tracking-wide px-2.5 py-1 border border-black">/g,
  `<span className="inline-flex items-center gap-1 bg-amber-400/10 text-amber-400 font-mono text-[10px] font-black uppercase tracking-wide px-2.5 py-1 border border-amber-400/30 group-hover:bg-accent-yellow group-hover:text-black rounded-sm transition-all duration-300">`
);

// Replace Promo rail full variant
content = content.replace(
  /className={`group relative block bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-black rounded-xl shadow-\[3px_3px_0px_#111\] hover:shadow-\[5px_5px_0px_#111\] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden \${dense \? 'p-3' : 'p-4'}`}/g,
  `className={\`group relative block bg-gradient-to-br from-[#140b00] to-black text-white border border-amber-500/30 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden \${dense ? 'p-3' : 'p-4'}\`}`
);

// Replace Promo rail full "Open Slot" tag
content = content.replace(
  /<span className={`inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-black uppercase tracking-\[0.12em\] border border-black \${dense \? 'text-\[7px\] px-1.5 py-0.5 mb-1.5' : 'text-\[8px\] px-2 py-0.5 mb-2.5'}`}>/g,
  `<span className={\`inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-black uppercase tracking-[0.12em] rounded-sm shadow-[0_0_8px_rgba(250,204,21,0.3)] \${dense ? 'text-[7px] px-1.5 py-0.5 mb-1.5' : 'text-[8px] px-2 py-0.5 mb-2.5'}\`}>`
);

// Replace Promo rail full CTA
content = content.replace(
  /<span className={`inline-flex items-center gap-1 bg-accent-yellow text-black font-mono font-black uppercase tracking-wide border border-black group-hover:gap-2 transition-all \${dense \? 'text-\[9px\] px-2 py-0.5' : 'text-\[10px\] px-2.5 py-1'}`}>/g,
  `<span className={\`inline-flex items-center gap-1 bg-amber-400/10 text-amber-400 font-mono font-black uppercase tracking-wide border border-amber-400/30 group-hover:bg-accent-yellow group-hover:text-black group-hover:gap-2 rounded-sm transition-all duration-300 \${dense ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'}\`}>`
);

fs.writeFileSync('components/deals/featured/FeaturedSlot.tsx', content, 'utf8');
console.log('Patched FeaturedSlot.tsx successfully.');
