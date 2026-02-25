import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { Badge } from '@/components/ui/badge';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const Hero = () => {
  const { t } = useLocale();

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  },[]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-32 pb-20">
      {/* Subtle Background Pattern - Reduced decorative noise */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Main Headline - Large Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-8">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {t.hero.badge.toUpperCase()}
              </Badge>
            </motion.div>

            {/* Main Heading - Better typography */}
            <h1 className="mb-6 leading-[1.1] font-semibold tracking-tight" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em'
            }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-gray-900"
              >
                {t.hero.title}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-gray-500"
              >
                {t.hero.reimagined}
              </motion.span>
            </h1>

            {/* Subheadline - Clear explanation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-700 max-w-2xl mb-4 leading-relaxed font-medium"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Additional clarity */}
            {/*<motion.p*/}
            {/*  initial={{ opacity: 0, y: 20 }}*/}
            {/*  animate={{ opacity: 1, y: 0 }}*/}
            {/*  transition={{ duration: 0.6, delay: 0.55 }}*/}
            {/*  className="text-base md:text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed"*/}
            {/*>*/}
            {/*  {t.hero.subheadline}*/}
            {/*</motion.p>*/}

            {/* Social Proof - Added above the fold */}
            {/*<motion.div*/}
            {/*  initial={{ opacity: 0, y: 20 }}*/}
            {/*  animate={{ opacity: 1, y: 0 }}*/}
            {/*  transition={{ duration: 0.6, delay: 0.6 }}*/}
            {/*  className="flex items-center gap-4 mb-10"*/}
            {/*>*/}
            {/*  <div className="flex -space-x-2">*/}
            {/*    {[1, 2, 3, 4].map((i) => (*/}
            {/*      <div*/}
            {/*        key={i}*/}
            {/*        className="w-10 h-10 rounded-full bg-linear-to-br from-gray-400 to-gray-600 border-2 border-white shadow-md"*/}
            {/*      ></div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*  <div className="text-sm font-medium text-gray-700">*/}
            {/*    {t.hero.socialProof}*/}
            {/*  </div>*/}
            {/*</motion.div>*/}

            {/* Proof Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="grid grid-cols-2 gap-3 mb-8 mt-16"
            >
              {[
                t.hero.proofBar.seniorEngineering,
                t.hero.proofBar.founderLed,
                t.hero.proofBar.builtForScale,
                t.hero.proofBar.modernStack,
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Availability Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-10 p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <p className="text-sm text-gray-700 font-medium">
                ⚡ {t.hero.availability}
              </p>
            </motion.div>

            {/* CTA Buttons - Improved hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection('contact')}
                aria-label="Start your project - Contact us"
                className="group px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
              >
                <motion.span
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2"
                >
                  {t.hero.startProject}
                  <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.span>
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection('portfolio')}
                aria-label="View our portfolio"
                className="px-8 py-4 bg-transparent text-slate-900 font-semibold rounded-full border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all duration-300 text-base focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.hero.viewWork}
                </motion.span>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Stunning Visual Showcase - Right Column */}
          <div className="col-span-12 lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="relative h-96 lg:h-125"
            >
              {/* Main Code Window */}
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Window Header */}
                <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-400 font-mono">
                    {t.hero.visual.fileName}
                  </div>
                </div>

                {/* Simplified Content */}
                <div className="p-6 font-mono text-sm space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="text-gray-500"
                  >
                    // {t.hero.visual.engineeringFocus}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    className="space-y-2"
                  >
                    <div className="text-green-400">✓ {t.hero.visual.typeSafe}</div>
                    <div className="text-green-400">✓ {t.hero.visual.scalableBackend}</div>
                    <div className="text-green-400">✓ {t.hero.visual.relationalData}</div>
                    <div className="text-green-400">✓ {t.hero.visual.productionReady}</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                    className="pt-4"
                  >
                    <div className="text-gray-500 mb-2">// {t.hero.visual.principles}</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
                        {t.hero.visual.performance}
                      </span>
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
                        {t.hero.visual.maintainable}
                      </span>
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
                        {t.hero.visual.scalable}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.1, duration: 0.4 }}
                    className="pt-4 text-gray-500"
                  >
                    // → {t.hero.visual.builtToLast}
                  </motion.div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-linear-to-t from-teal-500/5 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>

              {/* Minimal floating quality badges */}
              {[
                { text: t.hero.visual.reliable, top: '8%', right: '-12%', delay: 0 },
                { text: t.hero.visual.maintainable, bottom: '25%', right: '-15%', delay: 0.3 },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + badge.delay, type: "spring" }}
                  className="absolute hidden xl:block"
                  style={{
                    top: badge.top,
                    bottom: badge.bottom,
                    right: badge.right,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                    className="bg-white border-2 border-slate-900 rounded-lg px-4 py-2 shadow-xl"
                  >
                    <span className="text-sm font-bold text-slate-900">{badge.text}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
