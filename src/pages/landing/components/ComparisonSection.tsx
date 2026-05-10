import { motion, useInView } from 'framer-motion';
import {type ReactNode, useRef} from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useLocale } from '@/i18n/UseLocale';
import { SectionHeading } from '@/pages/landing';
import {BiLogoPostgresql, BiLogoSpringBoot, BiLogoTailwindCss, BiLogoTypescript} from "react-icons/bi";
import {FaReact} from "react-icons/fa";

const iconClassNames = 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 '

const icons : Record<string, ReactNode>  = {
  react : <FaReact className={iconClassNames}/>,
  ts : <BiLogoTypescript className={iconClassNames}/>,
  spring : <BiLogoSpringBoot className={iconClassNames}/>,
  postgres : <BiLogoPostgresql className={iconClassNames}/>,
  tailwind : <BiLogoTailwindCss className={iconClassNames}/>
}

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const comparisonMatrix = [
  { static: true, fullStack: true },
  { static: true, fullStack: true },
  { static: false, fullStack: true },
  { static: false, fullStack: true },
  { static: false, fullStack: true },
  { static: false, fullStack: true },
  { static: false, fullStack: true },
];

export function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLocale();
  const comparison = t.landing.comparison;
  const comparisonMatrixWithLabels = [
    ...comparisonMatrix,
    { static: comparison.maintenanceStatic, fullStack: comparison.maintenanceFull },
  ];

  return (
    <section ref={ref} className="bg-[#151b3d] px-6 py-24" id="compare">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={comparison.eyebrow}
          title={comparison.title}
          description={comparison.description}
        />

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={sectionFade}
          className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-white/10 text-sm uppercase tracking-[0.18em] text-slate-300">
                <tr>
                  <th className="px-6 py-5 font-semibold">{comparison.headers.feature}</th>
                  <th className="px-6 py-5 text-center font-semibold">{comparison.headers.staticWebsite}</th>
                  <th className="bg-cyan-400/10 px-6 py-5 text-center font-semibold">
                    {comparison.headers.fullStackApplication}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((rowLabel, index) => {
                  const row = comparisonMatrixWithLabels[index];

                  return (
                    <tr key={rowLabel} className="border-b border-white/5 last:border-none">
                      <td className="px-6 py-5 font-medium text-white">{rowLabel}</td>
                      <td className="px-6 py-5 text-center text-slate-300">
                        {typeof row.static === 'boolean' ? (
                          row.static ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-300" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-slate-500" />
                          )
                        ) : (
                          row.static
                        )}
                      </td>
                      <td className="bg-cyan-400/5 px-6 py-5 text-center text-slate-200">
                        {typeof row.fullStack === 'boolean' ? (
                          row.fullStack ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-cyan-300" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-slate-500" />
                          )
                        ) : (
                          <span className="font-semibold text-cyan-300">{row.fullStack}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-12">
          <h3 className="text-center text-2xl font-bold text-white">{comparison.stackTitle}</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {comparison.stack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={sectionFade}
                custom={0.1 + index * 0.05}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm flex flex-col items-center justify-center gap-y-1"
              >
                {/*<div*/}
                {/*  className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"*/}
                {/*  style={{ backgroundColor: stackColors[index] ?? stackColors[0] }}*/}
                {/*>*/}
                  {icons[tech.id]}
                {/*</div>*/}
                <div className="font-semibold text-white">{tech.name}</div>
                <div className="mt-1 text-xs text-slate-400">{tech.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
