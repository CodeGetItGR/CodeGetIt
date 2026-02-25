import {useLocale} from "../../i18n/UseLocale.tsx";

export const Footer = () => {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} CodeGetIt. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
