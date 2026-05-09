import { motion } from 'framer-motion';

import type { HeroCopy } from './hero.types';

interface HeroBenefitsProps {
  copy: HeroCopy['benefits'];
}

export function HeroBenefits({ copy }: HeroBenefitsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08 }}
      className="space-y-3 pt-2"
    >
      {copy.map((benefit) => (
        <div key={benefit.title} className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
          </div>
          <div>
            <div className="mb-1 font-medium text-white">{benefit.title}</div>
            <div className="text-sm text-slate-500">{benefit.description}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

