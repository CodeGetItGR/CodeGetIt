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
    <section id="services" className="py-32 lg:py-40 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header — left-aligned, no badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 max-w-2xl"
        >
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services — clean stacked layout with dividers */}
        <div className="divide-y divide-gray-200">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-16 first:pt-0 last:pb-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Title + description */}
                <div>
                  <span className="text-sm font-medium text-gray-400 mb-4 block">0{index + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Right: Feature list */}
                <div className="flex items-start">
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
          className="mt-24 pt-16 border-t border-gray-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-lg text-gray-600 max-w-xl">{t.services.customSolutions}</p>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 shrink-0"
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
