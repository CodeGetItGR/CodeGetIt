import { motion, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { premiumEase, premiumMotion } from '@/lib/motion';
import { usePublicSettings } from '@/settings/usePublicSettings';

export const Hero = () => {
  const { t } = useLocale();
  const { getBool, getString } = usePublicSettings();
  const [availabilityTapCount, setAvailabilityTapCount] = useState(0);
  const [showHeroGem, setShowHeroGem] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const topLineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.55, 0.25]);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const heroTitle = getString('marketing.heroTitle', t.hero.title);
  const heroSubtitle = getString('marketing.heroSubtitle', t.hero.subtitle);
  const availabilityMessage = getString('availability.statusMessage', t.hero.availability);
  const acceptingProjects = getBool('availability.acceptingProjects', true);
  const requestSubmissionEnabled = getBool('availability.requestSubmissionEnabled', true);
  const ctaPrimaryText = getString('marketing.ctaPrimaryText', t.hero.startProject);
  const ctaPrimaryUrl = getString('marketing.ctaPrimaryUrl', '#contact');

  const handlePrimaryCta = useCallback(() => {
    const target = ctaPrimaryUrl.trim();

    if (target === '/contact' || target === '/#contact') {
      scrollToSection('contact');
      return;
    }

    if (target.startsWith('#')) {
      scrollToSection(target.slice(1));
      return;
    }

    if (target.startsWith('/')) {
      window.location.assign(target);
      return;
    }

    window.open(target, '_blank', 'noopener,noreferrer');
  }, [ctaPrimaryUrl, scrollToSection]);

  const handleAvailabilityTap = useCallback(() => {
    setAvailabilityTapCount(prev => {
      const next = prev + 1;
      if (next >= 4) {
        setShowHeroGem(true);
        window.setTimeout(() => setShowHeroGem(false), 3500);
        return 0;
      }
      return next;
    });
  }, []);

  const handleViewWorkClick = useCallback(() => {
    scrollToSection('portfolio');
  }, [scrollToSection]);

  useEffect(() => {
    if (availabilityTapCount === 0) {
      return;
    }

    const timer = window.setTimeout(() => setAvailabilityTapCount(0), 1800);
    return () => window.clearTimeout(timer);
  }, [availabilityTapCount]);

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-30 pb-24 sm:pt-34 sm:pb-28">
      <div className="pointer-events-none absolute inset-0">
        {/* ...existing code... */}
        <motion.div
          className="absolute -top-8 left-[10%] h-44 w-44 rounded-full border border-white/60 bg-white/45 backdrop-blur-md"
          style={{ y: orbOneY }}
          animate={{ rotate: [0, 6, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-16 right-[9%] h-56 w-56 rounded-full border border-slate-200/70 bg-white/40"
          style={{ y: orbTwoY }}
          animate={{ x: [0, -8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
        <motion.div
          style={{ opacity: topLineOpacity }}
          className="absolute inset-x-0 top-20 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-slate-300/70 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Elegant Availability Badge */}
            <motion.button
              type="button"
              onClick={handleAvailabilityTap}
              className="mb-4 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: premiumEase }}
            >
              <div className={`relative group cursor-pointer`}>
                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                  acceptingProjects
                    ? 'border-emerald-200/60 bg-emerald-50/40 hover:bg-emerald-50/60 hover:border-emerald-300/80'
                    : 'border-rose-200/60 bg-rose-50/40 hover:bg-rose-50/60 hover:border-rose-300/80'
                }`}>
                  <motion.span
                    className={`h-2 w-2 rounded-full ${acceptingProjects ? 'bg-emerald-500' : 'bg-rose-500'} shadow-lg`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className={`text-xs font-semibold tracking-wide ${acceptingProjects ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {acceptingProjects ? 'Available' : 'Not Available'}
                  </span>
                </div>
                {/* Subtle tooltip on hover */}
                <div className="absolute top-full mt-2 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-gray-900/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap font-medium">
                    {availabilityMessage}
                  </div>
                </div>
              </div>
            </motion.button>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: premiumMotion.slow, delay: 0.05, ease: premiumEase }}
              className="mb-6 leading-[1.03] tracking-tight text-gray-900"
              style={{ fontSize: 'clamp(2.6rem, 5.7vw, 5.2rem)', fontWeight: 800 }}
            >
              {heroTitle}
              <br />
              <span className="bg-linear-to-r from-slate-500 via-slate-700 to-slate-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-[gradientShift_8s_ease_infinite]">
                {t.hero.reimagined}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: premiumMotion.normal, delay: 0.14, ease: premiumEase }}
              className="mb-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
            >
              {heroSubtitle}
            </motion.p>

            {/* Availability badge moved to fixed position in hero section - see below */}

            {showHeroGem && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden-gem mb-6"
              >
                {t.hero.hiddenGem}
              </motion.span>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: premiumMotion.normal, delay: 0.24, ease: premiumEase }}
              className="mb-10 flex flex-wrap items-center gap-4"
            >
              {requestSubmissionEnabled && (
                <MagneticButton
                  onClick={handlePrimaryCta}
                  className="cta-polish group inline-flex items-center gap-3 rounded-full border border-gray-900 bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 hover:bg-black cursor-pointer hover:opacity-75"
                >
                  {ctaPrimaryText}
                  <HiArrowRight className="w-5 h-5 opacity-90 transition-opacity duration-200 group-hover:opacity-100" />
                </MagneticButton>
              )}

              <button
                onClick={handleViewWorkClick}
                className="cursor-pointer hover:opacity-75 group inline-flex items-center gap-2 text-base font-semibold text-gray-700 transition-colors duration-200 hover:text-gray-900"
              >
                {t.hero.viewWork}
                <span className="block h-px w-10 bg-gray-400 transition-all duration-300 group-hover:w-14 group-hover:bg-gray-700" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: premiumMotion.slow, delay: 0.22, ease: premiumEase }}
            className="relative"
          >
            <div className="premium-panel premium-texture relative overflow-hidden rounded-3xl p-7 shadow-2xl shadow-slate-900/12 sm:p-8">
              <motion.div
                className="absolute -top-20 -right-16 h-44 w-44 rounded-full border border-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
              />

              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">{t.hero.delivery.frameworkTitle}</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{t.hero.delivery.frameworkSubtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                {t.hero.delivery.steps.map((step, index) => (
                  <motion.div
                    key={step}
                    className="premium-panel flex items-start gap-3 rounded-2xl bg-white/75 px-4 py-3"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 5.5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: t.hero.delivery.stats.typicalLaunch, value: '2-4 weeks' },
                  { label: t.hero.delivery.stats.response, value: '<24h' },
                  { label: t.hero.delivery.stats.uptimeTarget, value: '99.9%' },
                  { label: t.hero.delivery.stats.codeQuality, value: t.hero.visual.typeSafe },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200/80 bg-white/80 px-3 py-3 backdrop-blur-sm">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {t.hero.delivery.timelineNote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
