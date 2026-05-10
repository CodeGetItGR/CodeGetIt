import { AnimatePresence, motion } from 'framer-motion';

import type { HeroCopy, HeroMockupIndex } from './hero.types';

interface HeroMobileSelectorProps {
  copy: HeroCopy['mobile'];
  activeIndex: HeroMockupIndex | null;
  onChange: (i: HeroMockupIndex) => void;
}

export function HeroMobileSelector({ copy, activeIndex, onChange }: HeroMobileSelectorProps) {
  const hasSelection = activeIndex !== null;

  return (
    <div className="mb-8 lg:hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-4 text-sm font-medium text-slate-500"
      >
        {copy.question}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="mb-8 flex flex-wrap gap-2"
      >
        {copy.chips.map((chip, i) => (
          <button
            key={i}
            onClick={() => onChange(i as HeroMockupIndex)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200
              ${activeIndex === i
                ? 'border-cyan-400 bg-cyan-400 text-slate-900'
                : 'border-white/10 bg-white/3 text-slate-500 hover:border-white/20 hover:text-slate-400'
              }`}
          >
            {chip.label}
          </button>
        ))}
      </motion.div>

      <div className="relative min-h-32 mb-1">
        <AnimatePresence mode="wait">
          {!hasSelection ? (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-2xl font-bold leading-snug text-slate-700"
            >
              {copy.prompt}
            </motion.p>
          ) : (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mb-3 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-white">
                {copy.headlines[activeIndex]}
                <br />
                <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  {copy.highlights[activeIndex]}
                </span>
              </h1>
              <p className="max-w-[30ch] text-[0.85rem] leading-[1.75] text-slate-500">
                {copy.subtitles[activeIndex]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
