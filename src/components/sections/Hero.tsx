import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';

export const Hero = () => {
  const { t } = useLocale();

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-linear-to-b from-white via-gray-50/70 to-white pt-28 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-12 -left-10 h-72 w-72 rounded-full bg-gray-100/80 blur-3xl" />
        <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-gray-200/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-gray-900 leading-[1.04] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.55rem, 5.4vw, 5rem)', fontWeight: 800 }}
            >
              {t.hero.title}
              <br />
              <span className="text-gray-500">
                {t.hero.reimagined}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-6"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-sm font-medium text-gray-500 mb-10"
            >
              {t.hero.availability}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-black transition-colors duration-200 shadow-lg shadow-gray-900/10"
              >
                {t.hero.startProject}
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 underline decoration-gray-300 underline-offset-4"
              >
                {t.hero.viewWork}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-600"
            >
              {[t.hero.proofBar.seniorEngineering, t.hero.proofBar.builtForScale, t.hero.proofBar.modernStack].map((item, index) => (
                <span key={item} className="inline-flex items-center gap-4">
                  <span>{item}</span>
                  {index < 2 && <span className="text-gray-300">/</span>}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="relative"
          >
            <div className="rounded-3xl border lux-hairline lux-surface p-7 lux-shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">Delivery Framework</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">From strategy to launch</p>
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.08em]">Direct collaboration</span>
              </div>

              <div className="space-y-4">
                {[
                  'Discovery and technical scope',
                  'Design and implementation',
                  'Launch, QA, and optimization',
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { label: 'Typical launch', value: '2-4 wks' },
                  { label: 'Response', value: '<24h' },
                  { label: 'Uptime target', value: '99.9%' },
                  { label: 'Code quality', value: 'Type-safe' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-200 bg-white px-3 py-3">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
