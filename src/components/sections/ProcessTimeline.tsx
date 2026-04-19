import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/UseLocale';
import { premiumEase, premiumMotion } from '@/lib/motion';

export const ProcessTimeline = () => {
  const { t } = useLocale();

  const steps = [
    {
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description,
      duration: t.process.steps.discovery.duration,
      icon: '🔍',
      benefits: t.process.steps.discovery.benefits,
    },
    {
      title: t.process.steps.design.title,
      description: t.process.steps.design.description,
      duration: t.process.steps.design.duration,
      icon: '📐',
      benefits: t.process.steps.design.benefits,
    },
    {
      title: t.process.steps.development.title,
      description: t.process.steps.development.description,
      duration: t.process.steps.development.duration,
      icon: '⚙️',
      benefits: t.process.steps.development.benefits,
    },
    {
      title: t.process.steps.deployment.title,
      description: t.process.steps.deployment.description,
      duration: t.process.steps.deployment.duration,
      icon: '🚀',
      benefits: t.process.steps.deployment.benefits,
    },
  ];

  return (
    <section className="section-depth section-divider relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mb-20 max-w-3xl"
        >
          <p className="section-kicker">{t.process.kicker}</p>
          <h2 className="section-title">
            {t.process.title}
          </h2>
          <p className="section-subtitle">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: premiumMotion.normal, delay: index * 0.1, ease: premiumEase }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Step Number & Icon */}
                <div className="lg:col-span-2 flex flex-col items-center gap-4 lg:items-start">
                  <div className="relative">
                    {/* Connection line (hidden on last item) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-slate-300 to-transparent" />
                    )}

                    {/* Circle with icon */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-slate-200 text-3xl">
                      {step.icon}
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t.process.phaseLabel} 0{index + 1}
                    </p>
                    <p className="text-sm font-medium text-gray-600 mt-1">{step.duration}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-10">
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {step.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold text-lg mt-0.5">✓</span>
                          <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, delay: 0.5, ease: premiumEase }}
          className="mt-16 text-center text-sm text-gray-500 italic"
        >
          {t.process.disclaimer}
        </motion.p>
      </div>
    </section>
  );
};
