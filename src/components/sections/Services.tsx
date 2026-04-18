import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { premiumEase, premiumMotion } from '@/lib/motion';

export const Services = () => {
  const { t } = useLocale();

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const services = [
    {
      title: t.services.fullStack.title,
      description: t.services.fullStack.simpleDescription,
      features: t.services.fullStack.features,
    },
    {
      title: t.services.api.title,
      description: t.services.api.simpleDescription,
      features: t.services.api.features,
    },
  ];

  return (
    <section id="services" className="section-depth section-divider relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100/75 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mb-16 max-w-3xl"
        >
          <p className="section-kicker">
            {t.services.badge}
          </p>
          <h2 className="section-title">
            {t.services.title}
          </h2>
          <p className="section-subtitle">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: premiumMotion.normal, delay: index * premiumMotion.stagger, ease: premiumEase }}
              whileHover={{ y: -6 }}
              className="interactive-card premium-panel premium-texture group relative overflow-hidden rounded-3xl p-8 md:p-10"
            >
              <motion.div
                className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-white/35"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              <div>
                <span className="text-xs font-semibold text-gray-500 mb-4 block tracking-[0.08em] uppercase">
                  Service 0{index + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-7">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gray-700 transition-transform duration-300 group-hover:scale-125" />
                      <span className="text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-900/80 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 px-8 py-8 md:px-10 md:py-9 shadow-2xl shadow-slate-900/20">
            <motion.div
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
              animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-lg text-gray-200">{t.services.customSolutions}</p>
              <MagneticButton
                onClick={scrollToContact}
                className="cta-polish group inline-flex shrink-0 items-center gap-3 rounded-full border border-white/80 bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-100"
              >
                {t.services.contactCTA}
                <HiArrowRight className="w-5 h-5 opacity-90 transition-opacity duration-200 group-hover:opacity-100" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
