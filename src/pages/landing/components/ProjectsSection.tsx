import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLocale } from '@/i18n/UseLocale';
import { SectionHeading } from '@/pages/landing';

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const projectColors = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLocale();
  const projects = t.landing.projects;

  return (
    <section ref={ref} id="projects" className="bg-[#151b3d] px-6 py-26">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.items.map((project, index) => (
            <motion.article
              key={project.title}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={sectionFade}
              custom={index * 0.06}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/20"
            >
              <div className="h-2 w-full" style={{ backgroundColor: projectColors[index] ?? projectColors[0] }} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-all group-hover:gap-3"
                >
                  {projects.viewProject}
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${projectColors[index] ?? projectColors[0]}18, transparent 70%)`,
                }}
              />
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
