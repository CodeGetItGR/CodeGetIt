import { useState, useEffect, useCallback, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/UseLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { usePublicSettings } from '@/settings/usePublicSettings';

export const Header = () => {
  const { t } = useLocale();
  const { getBool, getString } = usePublicSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoTapStreak, setLogoTapStreak] = useState(0);
  const [showGem, setShowGem] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoTapStreak === 0) {
      return;
    }

    const resetTimer = window.setTimeout(() => setLogoTapStreak(0), 2200);
    return () => window.clearTimeout(resetTimer);
  }, [logoTapStreak]);

  const triggerGem = useCallback(() => {
    setShowGem(true);
    const hideTimer = window.setTimeout(() => setShowGem(false), 3200);
    return () => window.clearTimeout(hideTimer);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const requestSubmissionEnabled = getBool('availability.requestSubmissionEnabled', true);
  const ctaPrimaryText = getString('marketing.ctaPrimaryText', t.hero.startProject);
  const ctaPrimaryUrl = getString('marketing.ctaPrimaryUrl', '#contact');

  const handlePrimaryCta = useCallback(() => {
    const target = ctaPrimaryUrl.trim();
    setIsMobileMenuOpen(false);

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

  const handleLogoClick = useCallback(() => {
    scrollToSection('hero');
    setLogoTapStreak(prev => {
      const next = prev + 1;
      if (next >= 5) {
        triggerGem();
        return 0;
      }
      return next;
    });
  }, [scrollToSection, triggerGem]);

  const handleNavItemClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const sectionId = event.currentTarget.dataset.sectionId;
    if (!sectionId) {
      return;
    }
    scrollToSection(sectionId);
  }, [scrollToSection]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const navItems = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.portfolio, id: 'portfolio' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`premium-panel premium-texture relative flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-500 ${
            isScrolled
              ? 'translate-y-0 bg-white/88 shadow-xl shadow-slate-900/10'
              : 'translate-y-0.5 bg-white/74'
          }`}
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/90 to-transparent" />

          <button
            onClick={handleLogoClick}
            className="group inline-flex items-center gap-4 text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 transition-opacity duration-300 hover:opacity-85"
          >
            <span className="h-2 w-2 rounded-full bg-gray-900/70 shadow-[0_0_0_6px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:scale-110" />
            <span>CodeGetIt</span>
          </button>

          {showGem && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="hidden-gem absolute left-28 top-1/2 -translate-y-1/2"
            >
              {t.hero.hiddenGem}
            </motion.span>
          )}

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-section-id={item.id}
                onClick={handleNavItemClick}
                className="cursor-pointer hover:opacity-75 relative text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900 after:absolute after:left-0 after:bottom-[-0.45rem] after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
            {requestSubmissionEnabled && (
              <MagneticButton
                onClick={handlePrimaryCta}
                className="cursor-pointer hover:opacity-75 cta-polish inline-flex items-center rounded-full border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition-colors duration-300 hover:bg-black"
              >
                {ctaPrimaryText}
              </MagneticButton>
            )}
          </nav>

          <button
            onClick={handleMobileMenuToggle}
            className="cursor-pointer hover:opacity-75 md:hidden rounded-xl border border-slate-200/80 bg-white/70 p-2 text-gray-700 transition-colors duration-200 hover:bg-white"
            aria-label={t.nav.toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="premium-panel premium-texture md:hidden mt-3 rounded-2xl p-4 shadow-lg shadow-gray-900/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-section-id={item.id}
                onClick={handleNavItemClick}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-white/60 hover:text-gray-900"
              >
                {item.label}
              </button>
            ))}
            {requestSubmissionEnabled && (
              <MagneticButton
                onClick={handlePrimaryCta}
                className="cta-polish mt-3 inline-flex w-full items-center justify-center rounded-full border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black"
              >
                {ctaPrimaryText}
              </MagneticButton>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
