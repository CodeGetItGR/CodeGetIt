import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/UseLocale';

export const ProcessTimeline = () => {
  const { t } = useLocale();

  const steps = [
    {
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description,
      duration: t.process.steps.discovery.duration,
    },
    {
      title: t.process.steps.design.title,
      description: t.process.steps.design.description,
      duration: t.process.steps.design.duration,
    },
    {
      title: t.process.steps.development.title,
      description: t.process.steps.development.description,
      duration: t.process.steps.development.duration,
    },
    {
      title: t.process.steps.deployment.title,
      description: t.process.steps.deployment.description,
      duration: t.process.steps.deployment.duration,
    },
  ];

  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Process</p>
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          {t.process.title}
        </h3>
      </motion.div>

      {/* Clean numbered list — no cards, no icons, just content */}
      <div className="divide-y divide-gray-200">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="py-12 first:pt-0 last:pb-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              {/* Number + Duration */}
              <div className="lg:col-span-3 flex items-baseline gap-4">
                <span className="text-sm font-medium text-gray-400">0{index + 1}</span>
                <span className="text-sm text-gray-500">{step.duration}</span>
              </div>

              {/* Title */}
              <div className="lg:col-span-3">
                <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
              </div>

              {/* Description */}
              <div className="lg:col-span-6">
                <p className="text-base text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-sm text-gray-500 italic">{t.process.disclaimer}</p>
    </div>
  );
};
