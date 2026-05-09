import { useState } from 'react';
import { motion } from 'framer-motion';

import { useLocale } from '@/i18n/UseLocale';

import {
  HeroBenefits,
  HeroCtas,
  HeroLead,
  HeroMockupDescription, type HeroMockupIndex,
  HeroMockupStage,
  HeroMockupTabs,
  HeroNavigation,
} from './hero';

export function HeroSection() {
  const { t } = useLocale();
  const [activeMockup, setActiveMockup] = useState<HeroMockupIndex>(0);
  const copy = t.landing.hero;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden  text-slate-100">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at top left, rgba(34, 211, 238, 0.16), transparent 30%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 28%), linear-gradient(180deg, #0f1729 0%, #111c34 55%, #0f1729 100%)',
        }}
      />
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute left-1/4 top-0 h-150 w-150 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-130 w-130 rounded-full bg-blue-400/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <HeroNavigation copy={copy.navigation} />

        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center lg:hidden"
          >
            <HeroLead copy={copy.mobile} size="mobile" />
          </motion.div>

          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="hidden lg:block">
              <div className="space-y-8">
                <HeroLead copy={copy.desktop} size="desktop" />
                <HeroBenefits copy={copy.benefits} />
                <HeroCtas copy={copy.ctas} size="desktop" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <HeroMockupTabs
                copy={copy.mockups.tabs}
                activeIndex={activeMockup}
                onChange={setActiveMockup}
              />
              <HeroMockupStage activeIndex={activeMockup} copy={copy.mockups} />
              <HeroMockupDescription description={copy.mockups.descriptions[activeMockup]} />
            </div>
          </div>

          <div className="lg:hidden">
            <div className="mt-10 space-y-5 sm:mt-12">
              <HeroCtas copy={copy.ctas} size="mobile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

