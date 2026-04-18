import { useState, useEffect, useCallback } from 'react';
import { useLocale } from '@/i18n/UseLocale';

export const Header = () => {
  const { t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const navItems = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.portfolio, id: 'portfolio' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/90 border lux-hairline lux-shadow backdrop-blur-md'
              : 'bg-white/80 border border-gray-100/80 backdrop-blur-sm'
          }`}
        >
          {/* Logo — plain, confident */}
          <button
            onClick={() => scrollToSection('hero')}
            className="inline-flex items-center text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight hover:opacity-80 transition-opacity duration-200"
          >
            CodeGetIt
          </button>

          {/* Desktop Nav — 4 items only */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black transition-colors duration-200 shadow-sm"
            >
              {t.hero.startProject}
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-3 rounded-2xl border border-gray-200 bg-white/95 p-4 space-y-1 shadow-lg shadow-gray-900/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2.5 text-gray-700 hover:text-gray-900 font-medium text-base"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition-colors duration-200"
            >
              {t.hero.startProject}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
