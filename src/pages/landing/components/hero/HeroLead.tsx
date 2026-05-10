import { motion } from 'framer-motion';

import type { HeroCopy } from './hero.types';

interface HeroLeadProps {
  copy: HeroCopy['desktop'];
}

export function HeroLead({ copy }: HeroLeadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      <div className="pointer-events-none absolute -inset-x-4 -bottom-2 -top-6 rounded-3xl
        bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 opacity-20 blur-3xl" />

      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10
        bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)]" />
        <span className="text-xs font-medium uppercase tracking-widest text-slate-300">
          Web &amp; App Studio
        </span>
      </div>

      <h1 className="mb-5 text-6xl font-extrabold leading-[1.06] tracking-tight text-white
        lg:text-7xl xl:text-[5.25rem]">
        {copy.title}
        <br />
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            {copy.highlight}
          </span>
          <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full
            bg-gradient-to-r from-cyan-400/80 to-blue-500/0" />
        </span>
      </h1>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      <p className="max-w-lg text-lg leading-[1.75] text-slate-400">{copy.subtitle}</p>
    </motion.div>
  );
}
