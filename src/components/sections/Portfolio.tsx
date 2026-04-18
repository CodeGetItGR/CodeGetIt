import { motion } from 'framer-motion';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';
import { projects } from '@/data/projects';
import { useLocale } from '@/i18n/UseLocale';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { premiumEase, premiumMotion } from '@/lib/motion';

export const Portfolio = () => {
  const { t } = useLocale();

  const featuredProjects = projects.slice(0, 6);

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
          <p className="mb-4 inline-flex rounded-full border border-slate-300/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
            {t.portfolio.badge}
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
            {t.portfolio.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: premiumMotion.quick, delay: index * 0.05, ease: premiumEase }}
              whileHover={{ y: -8 }}
              className="premium-panel premium-texture group relative overflow-hidden rounded-3xl transition-all duration-300"
            >
              <div className={`relative overflow-hidden bg-linear-to-br ${project.color} px-6 py-5`}>
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.16)_50%,transparent_80%)]"
                  animate={{ x: ['-120%', '120%'] }}
                  transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                />
                <div className="flex items-start justify-between gap-3 mb-8">
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-[0.08em]">
                    {project.category}
                  </span>
                  <span className="text-xs text-white/80 font-medium">{project.id.toString().padStart(2, '0')}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">High-impact digital product</p>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>

                <p className="text-sm text-gray-500 mb-6">{project.tags.slice(0, 4).join(' • ')}</p>

                <div className="flex items-center gap-5">
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-black">
                    {t.portfolio.viewCaseStudy}
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      Live Preview
                      <HiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
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
              className="inline-flex items-center gap-2 rounded-full border border-gray-900 bg-gray-900 px-7 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-black"
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
