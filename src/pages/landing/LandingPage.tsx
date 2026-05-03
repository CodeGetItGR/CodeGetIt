import { Contact } from '@/components/sections/Contact';
import { SEO } from '@/components/SEO';
import { useLocale } from '@/i18n/UseLocale';
import { PublicSettingsProvider } from '@/settings/PublicSettingsProvider';
import {
  ComparisonSection,
  FAQSection,
  FooterSection,
  HeroSection,
  HowWeWorkSection,
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
} from './components';

export function LandingPage() {
  const { t } = useLocale();

  return (
    <PublicSettingsProvider>
      <div className="min-h-screen overflow-x-hidden bg-[#0a0e27] text-slate-100">
        <SEO
          title={t.landing.seo.title}
          description={t.landing.seo.description}
          canonicalUrl="https://codegetit.com"
        />
        <HeroSection />
        <ServicesSection />
        <ComparisonSection />
        <HowWeWorkSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FAQSection />
        <Contact />
        <FooterSection />
      </div>
    </PublicSettingsProvider>
  );
}
