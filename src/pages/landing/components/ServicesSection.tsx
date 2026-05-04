import { motion, useInView } from 'framer-motion';
import {useCallback, useRef} from 'react';
import { Code2, Database, Globe } from 'lucide-react';
import { useLocale } from '@/i18n/UseLocale';
import { SectionHeading } from '@/pages/landing';
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/admin/api/queryKeys.ts";
import {settingsApi} from "@/admin/api/settings.ts";

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const serviceIcons = [Globe, Code2, Database];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLocale();
  const settingsQuery = useQuery({
    queryKey: queryKeys.settings.list,
    queryFn: () => settingsApi.listAll(),
  });

  const services = t.landing.services;

  const formatPrice = useCallback((value: string) => {
    return t.landing.services.from.replace('{price}', new Intl.NumberFormat('el-GR').format(Number.parseInt(value)));
  }, [t]);

  return (
    <section ref={ref} id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = serviceIcons[index] ?? serviceIcons[0];
            const featured = index === 1;

            return (
              <motion.article
                key={service.title}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={sectionFade}
                custom={index * 0.08}
                whileHover={{ y: -6 }}
                className={[
                  'relative rounded-3xl border p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-sm transition-colors',
                  featured
                    ? 'border-cyan-400/40 bg-linear-to-br from-cyan-400/10 to-white/5'
                    : 'border-white/10 bg-white/5 hover:border-cyan-400/30',
                ].join(' ')}
              >
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-300 px-4 py-1 text-sm font-semibold text-slate-950">
                    {services.featured}
                  </div>
                )}

                <div className={['mb-6 inline-flex rounded-2xl p-3', featured ? 'bg-cyan-400/15' : 'bg-white/10'].join(' ')}>
                  <Icon className={['h-6 w-6', featured ? 'text-cyan-300' : 'text-slate-300'].join(' ')} />
                </div>

                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>

                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                  <div className="mt-8 text-2xl font-bold text-cyan-300">{formatPrice(settingsQuery.data?.find(i => i.key === service.priceKey)?.value ?? service.defaultPrice)}</div>

                  <button
                    type="button"
                    className={[
                      'mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-semibold transition-colors',
                      featured ? 'bg-cyan-300 text-slate-950 hover:bg-white' : 'bg-white/10 text-white hover:bg-white/15',
                    ].join(' ')}
                  >
                    {services.getStarted}
                  </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
