import { useLocale } from '@/i18n/UseLocale';

export const Footer = () => {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} CodeGetIt. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a
              href="mailto:hello@codegetit.com"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
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
