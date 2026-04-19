import { motion } from 'framer-motion';
import {useCallback, useState} from 'react';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';
import { projects } from '@/data/projects';
import { useLocale } from '@/i18n/UseLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { premiumEase, premiumMotion } from '@/lib/motion';

export const Portfolio = () => {
  const { t } = useLocale();
  const [revealedProjectId, setRevealedProjectId] = useState<number | null>(null);

  const featuredProjects = projects.slice(0, 6);

  const revealGem = useCallback((projectId: number) => {
    setRevealedProjectId(projectId);
    window.setTimeout(() => setRevealedProjectId(null), 2600);
  },[]);

  return (
    <section id="portfolio" className="section-depth section-divider relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mb-14 max-w-3xl"
        >
          <p className="section-kicker">
            {t.portfolio.badge}
          </p>
          <h2 className="section-title">
            {t.portfolio.title}
          </h2>
          <p className="section-subtitle">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => {
            const localized = t.portfolio.items[index];
            const title = localized?.title ?? project.title;
            const category = localized?.category ?? project.category;
            const description = localized?.description ?? project.description;

            return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: premiumMotion.quick, delay: index * 0.05, ease: premiumEase }}
              className="interactive-card premium-panel premium-texture group relative overflow-hidden rounded-3xl transition-[border-color,box-shadow,filter] duration-300"
            >
              <div className={`relative overflow-hidden bg-linear-to-br ${project.color} px-6 py-5`}>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_22%,rgba(255,255,255,0.14)_52%,transparent_82%)] opacity-40 transition-opacity duration-300 group-hover:opacity-60" />
                <div className="flex items-start justify-between gap-3 mb-8">
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-[0.08em]">
                    {category}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      if (event.shiftKey) {
                        revealGem(project.id);
                      }
                    }}
                    className="text-xs font-medium text-white/80 transition-colors duration-200 hover:text-white"
                    aria-label={`${t.portfolio.hiddenProjectNoteAria} ${title}`}
                  >
                    {project.id.toString().padStart(2, '0')}
                  </button>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{t.portfolio.highImpactLabel}</p>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

                <p className="text-sm text-gray-500 mb-6">{project.tags.slice(0, 4).join(' • ')}</p>

                {revealedProjectId === project.id && (
                  <span className="hidden-gem mb-5">
                    {t.portfolio.hiddenProjectNote}
                  </span>
                )}

                <div className="flex items-center gap-5">
                  <button className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-black">
                    {t.portfolio.viewCaseStudy}
                    <HiArrowRight className="w-4 h-4 opacity-80 transition-opacity duration-200 group-hover:opacity-100" />
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                    >
                      {t.portfolio.livePreview}
                      <HiExternalLink className="w-4 h-4 opacity-80 transition-opacity duration-200 group-hover:opacity-100" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mt-16 border-t border-gray-200/80 pt-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{t.portfolio.projectCTA}</h3>
              <p className="text-lg text-gray-600">{t.portfolio.projectCTADesc}</p>
            </div>
            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer hover:opacity-75 cta-polish inline-flex items-center gap-2 rounded-full border border-gray-900 bg-gray-900 px-7 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              {t.portfolio.startProject}
              <HiArrowRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
