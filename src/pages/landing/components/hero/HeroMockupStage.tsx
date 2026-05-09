import { AnimatePresence, motion } from 'framer-motion';

import type { HeroCopy } from './hero.types';
import { AnalyticsMockup, BookingMockup, EcommerceMockup } from './mockups';

interface HeroMockupStageProps {
  activeIndex: number;
  copy: HeroCopy['mockups'];
}

export function HeroMockupStage({ activeIndex, copy }: HeroMockupStageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {activeIndex === 0 ? (
          <EcommerceMockup {...copy.ecommerce} />
        ) : activeIndex === 1 ? (
          <AnalyticsMockup {...copy.analytics} />
        ) : (
          <BookingMockup {...copy.booking} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

