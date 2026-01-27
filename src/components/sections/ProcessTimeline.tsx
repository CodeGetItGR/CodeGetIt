import { motion } from 'framer-motion';
import { HiCode, HiCube, HiLightningBolt, HiCheckCircle } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  duration: string;
}

export const ProcessTimeline = () => {
  const { t } = useLocale();

  const steps: ProcessStep[] = [
    {
      icon: HiLightningBolt,
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description,
      duration: t.process.steps.discovery.duration,
    },
    {
      icon: HiCube,
      title: t.process.steps.design.title,
      description: t.process.steps.design.description,
      duration: t.process.steps.design.duration,
    },
    {
      icon: HiCode,
      title: t.process.steps.development.title,
      description: t.process.steps.development.description,
      duration: t.process.steps.development.duration,
    },
    {
      icon: HiCheckCircle,
      title: t.process.steps.deployment.title,
      description: t.process.steps.deployment.description,
      duration: t.process.steps.deployment.duration,
    },
  ];

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h3 className="text-headline-md md:text-headline-lg font-bold text-gray-900 mb-4">
          {t.process.title}
        </h3>
        <p className="text-body-lg text-gray-600">
          {t.process.subtitle}
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-gray-200 via-gray-300 to-gray-200" />

        {/* Steps */}
        <div className="space-y-12 lg:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="inline-block p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 elegant-shadow hover:elegant-shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-label rounded-full mb-2">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-title-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-body text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Center Dot */}
              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900 border-4 border-white shadow-lg z-10" />

              {/* Number */}
              <div className="flex-1 flex lg:justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="w-16 h-16 rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-title-lg shadow-xl"
                >
                  {index + 1}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-body-sm text-gray-500 italic">
          {t.process.disclaimer}
        </p>
      </motion.div>
    </div>
  );
};
