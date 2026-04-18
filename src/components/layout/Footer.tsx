import { useLocale } from '@/i18n/UseLocale';

export const Footer = () => {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gray-800/90 bg-linear-to-b from-gray-950 via-slate-950 to-black py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute -left-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-slate-500/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} CodeGetIt. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a
              href="mailto:hello@codegetit.com"
              className="text-sm text-gray-300 transition-colors duration-200 hover:text-white"
              aria-label="Email"
            >
              hello@codegetit.com
            </a>
            <span>Based in Greece</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
