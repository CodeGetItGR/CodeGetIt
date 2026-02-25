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
    <section className="relative min-h-screen flex items-center bg-white pt-28 pb-24 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — copy */}
          <div>
            {/* Availability */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-gray-500 mb-10 flex items-center gap-2.5 tracking-wide"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
              </span>
              {t.hero.availability}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-900 leading-[1.08] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', letterSpacing: '-0.025em', fontWeight: 800 }}
            >
              {t.hero.title}
              <br />
              <span className="text-gray-400">{t.hero.reimagined}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                {t.hero.startProject}
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
              >
                {t.hero.viewWork}
              </button>
            </motion.div>
          </div>

          {/* Right — visual element that fills the space on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card — a real-looking project preview */}
              <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/20">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-700" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-xs text-gray-500 font-mono max-w-xs mx-auto text-center">
                      your-project.com
                    </div>
                  </div>
                </div>

                {/* Content — stylized UI mockup */}
                <div className="p-8 space-y-6">
                  {/* Simulated nav */}
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-4 bg-gray-800 rounded" />
                    <div className="flex gap-4">
                      <div className="w-12 h-3 bg-gray-800 rounded" />
                      <div className="w-12 h-3 bg-gray-800 rounded" />
                      <div className="w-12 h-3 bg-gray-800 rounded" />
                    </div>
                  </div>

                  {/* Hero area */}
                  <div className="pt-8 space-y-4">
                    <div className="w-3/4 h-6 bg-gray-800 rounded" />
                    <div className="w-1/2 h-6 bg-gray-800 rounded" />
                    <div className="w-2/3 h-3 bg-gray-800/60 rounded mt-4" />
                    <div className="w-1/2 h-3 bg-gray-800/60 rounded" />
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <div className="w-32 h-10 bg-teal-600 rounded-full" />
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-3 gap-3 pt-8">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="bg-gray-800/60 rounded-xl p-4 space-y-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-lg" />
                        <div className="w-full h-2.5 bg-gray-700 rounded" />
                        <div className="w-3/4 h-2 bg-gray-700/60 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating metric pill — top right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-lg"
              >
                <div className="text-xs font-medium text-gray-500 mb-0.5">Uptime</div>
                <div className="text-lg font-extrabold text-gray-900">99.9%</div>
              </motion.div>

              {/* Floating metric pill — bottom left */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-lg"
              >
                <div className="text-xs font-medium text-gray-500 mb-0.5">Response</div>
                <div className="text-lg font-extrabold text-gray-900">&lt;200ms</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
