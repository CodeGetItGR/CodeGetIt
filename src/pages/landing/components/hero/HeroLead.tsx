import { motion } from 'framer-motion';

import type { HeroCopy } from './hero.types';

interface HeroLeadProps {
  copy: HeroCopy['mobile'] | HeroCopy['desktop'];
  size: 'mobile' | 'desktop';
}

export function HeroLead({ copy, size }: HeroLeadProps) {
  const headingClasses =
    size === 'mobile'
      ? 'text-3xl sm:text-4xl leading-tight'
      : 'text-5xl lg:text-6xl xl:text-7xl leading-[1.1]';

  const textClasses =
    size === 'mobile'
      ? 'text-sm sm:text-base max-w-md mx-auto'
      : 'text-lg max-w-xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h1 className={`${headingClasses} tracking-tight text-white`}>
        {copy.title}
        <br />
        <span className="text-cyan-400">{copy.highlight}</span>
      </h1>
      <p className={`${textClasses} leading-relaxed text-slate-400`}>
        {copy.subtitle}
      </p>
    </motion.div>
  );
}

