import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/UseLocale';
import { premiumEase, premiumMotion } from '@/lib/motion';

export const ValueProposition = () => {
  const { t } = useLocale();

  const comparisons = t.valueProposition.table.rows;

  return (
    <section className="section-depth section-divider relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mb-20 max-w-3xl"
        >
          <p className="section-kicker">{t.valueProposition.kicker}</p>
          <h2 className="section-title">
            {t.valueProposition.title}
          </h2>
          <p className="section-subtitle">
            {t.valueProposition.subtitle}
          </p>
        </motion.div>

        {/* Mobile Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, delay: 0.1, ease: premiumEase }}
          className="space-y-4 md:hidden"
        >
          {comparisons.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
                <p className="text-sm font-semibold text-gray-900">{item.feature}</p>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{t.valueProposition.table.staticProject}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{item.staticProject}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{t.valueProposition.table.fullStackProject}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{item.fullStackProject}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, delay: 0.1, ease: premiumEase }}
          className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:block"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {t.valueProposition.table.comparison}
                  </th>
                  <th className="px-8 py-6 text-center text-sm font-semibold text-gray-600">
                    {t.valueProposition.table.staticProject}
                  </th>
                  <th className="px-8 py-6 text-center text-sm font-semibold text-gray-900">
                    {t.valueProposition.table.fullStackProject}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: premiumMotion.quick,
                      delay: index * 0.02,
                      ease: premiumEase,
                    }}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-8 py-5 text-base font-medium text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-8 py-5 text-left text-sm leading-relaxed text-gray-600">
                      {item.staticProject}
                    </td>
                    <td className="px-8 py-5 text-left text-sm leading-relaxed text-gray-700">
                      {item.fullStackProject}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.valueProposition.cards.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: premiumMotion.normal,
                delay: index * 0.05,
                ease: premiumEase,
              }}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 hover:border-slate-300 transition-colors"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};




