import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';

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
    <section id="services" className="py-28 lg:py-36 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header — left-aligned, no badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-3xl lux-surface border lux-hairline p-8 md:p-10 lux-shadow hover:lux-shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gray-200" />

              <div>
                <span className="text-xs font-semibold text-gray-500 mb-4 block tracking-[0.08em] uppercase">
                  Service 0{index + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-7">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gray-700" />
                      <span className="text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA — clean, no scale animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-3xl bg-gray-900 px-8 py-8 md:px-10 md:py-9 lux-shadow-lg">
            <p className="text-lg text-gray-200 max-w-xl">{t.services.customSolutions}</p>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 text-base font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 shrink-0"
            >
              {t.services.contactCTA}
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
