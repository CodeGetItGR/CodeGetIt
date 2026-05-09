import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import type { HeroCopy } from './hero.types';

interface HeroCtasProps {
  copy: HeroCopy['ctas'];
  size: 'mobile' | 'desktop';
}

export function HeroCtas({ copy, size }: HeroCtasProps) {
  const isMobile = size === 'mobile';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.18 }}
      className={isMobile ? 'space-y-5' : 'space-y-4'}
    >
      <div className={isMobile ? 'flex flex-col gap-3' : 'flex gap-4'}>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#contact"
          className={[
            'group inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all',
            isMobile
              ? 'w-full bg-cyan-400 px-6 py-4 text-base font-bold text-[#0f1729] shadow-xl shadow-cyan-400/30'
              : 'bg-cyan-400 px-8 py-4 text-[#0f1729] shadow-lg shadow-cyan-400/25',
          ].join(' ')}
        >
          {copy.primary}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
        </motion.a>

        <a
          href="#projects"
          className={[
            'rounded-2xl font-semibold transition-colors',
            isMobile
              ? 'w-full border border-slate-700/50 bg-slate-800/40 px-6 py-4 text-base text-slate-200'
              : 'border border-slate-700 bg-slate-800/50 px-8 py-4 text-white hover:bg-slate-800',
          ].join(' ')}
        >
          {isMobile ? copy.mobileSecondary : copy.secondary}
        </a>
      </div>

      <p className={`text-xs text-slate-500 ${isMobile ? 'text-center px-4' : ''}`}>
        {copy.note}
      </p>
    </motion.div>
  );
}

