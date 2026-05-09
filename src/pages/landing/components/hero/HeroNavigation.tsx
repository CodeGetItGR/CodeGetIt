import { motion } from 'framer-motion';

import type { HeroCopy } from './hero.types';

interface HeroNavigationProps {
  copy: HeroCopy['navigation'];
}

export function HeroNavigation({ copy }: HeroNavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#0f1729]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500">
            <span className="text-sm font-bold text-[#0f1729]">{copy.brandInitial}</span>
          </div>
          <span className="font-semibold tracking-tight text-white">{copy.brandLabel}</span>
        </div>

        <a
          href="#contact"
          className="px-5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400"
        >
          {copy.contactButton}
        </a>
      </div>
    </motion.nav>
  );
}

