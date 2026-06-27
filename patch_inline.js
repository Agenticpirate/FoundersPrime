const fs = require('fs');
let content = fs.readFileSync('components/deals/featured/FeaturedSlot.tsx', 'utf8');

content = content.replace(
  /className="group relative flex h-full flex-col bg-amber-50 dark:bg-\[#1a1510\] border-2 border-amber-500 dark:border-amber-500\/50 rounded-sm shadow-\[3px_3px_0px_#b45309\] dark:shadow-\[3px_3px_0px_rgba\(245,158,11,0.2\)\] hover:shadow-\[5px_5px_0px_#b45309\] dark:hover:shadow-\[5px_5px_0px_rgba\(245,158,11,0.3\)\] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"/g,
  `className="group relative flex h-full flex-col bg-amber-50 dark:bg-[#140b00] border border-amber-500/20 rounded-lg shadow-[0_4px_15px_rgba(245,158,11,0.05)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:border-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"`
);

content = content.replace(
  /<span className="relative inline-flex items-center gap-0.5 bg-black text-white text-\[9px\] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow group-hover:text-black transition-all">/g,
  `<span className="relative inline-flex items-center gap-0.5 bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm border border-amber-400/30 group-hover:bg-accent-yellow group-hover:text-black group-hover:border-accent-yellow transition-all duration-300">`
);

fs.writeFileSync('components/deals/featured/FeaturedSlot.tsx', content, 'utf8');
console.log('Patched inline variant');
