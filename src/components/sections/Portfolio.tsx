import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';
import { Section } from '@/components/ui/Section';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/i18n/UseLocale';

const ProjectCard = ({ project, index, size = 'normal' }: { project: Project; index: number; size?: 'normal' | 'large' | 'wide' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLocale();

  const sizeClasses = {
    normal: 'col-span-12 md:col-span-6 lg:col-span-4',
    large: 'col-span-12 md:col-span-6 lg:col-span-8',
    wide: 'col-span-12'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn("group relative", sizeClasses[size])}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full min-h-100 bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-900 transition-all duration-500 elegant-shadow-lg hover:elegant-shadow-xl texture-noise">
        {/* Project Image/Gradient */}
        <div className={cn("absolute inset-0 bg-linear-to-br opacity-90", project.color)}>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          />
        </div>

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8">
          {/* Top: Category */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur-sm text-label text-gray-900 rounded-full">
              {project.category}
            </span>
          </motion.div>

          {/* Bottom: Project Info */}
          <div>
            {project.client && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-body-sm text-white/70 mb-2"
              >
                {project.client}
              </motion.p>
            )}

            <motion.h3
              className="text-title-lg md:text-headline-md text-white mb-3 font-bold"
            >
              {project.title}
            </motion.h3>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-body text-white/90 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-body-sm bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-white font-semibold group/btn"
                  >
                    {t.portfolio.viewCaseStudy}
                    <HiArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Corner Number */}
        <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-body-sm font-bold text-gray-900">
          {project.id.toString().padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<'all' | Project['category']>('all');

  const categories: Array<'all' | Project['category']> = ['all', 'Full-Stack', 'Front-End', 'Back-End'];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Define layout pattern - some large, some normal
  const getCardSize = (index: number): 'normal' | 'large' | 'wide' => {
    if (index === 0) return 'large';
    if (index === 3) return 'large';
    return 'normal';
  };

  return (
    <Section id="portfolio" className="bg-white relative overflow-hidden py-24 lg:py-32">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div style={{
          backgroundImage: `radial-gradient(circle, #171717 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} className="w-full h-full" />
      </div>

      <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <Badge>
                  <div className="w-2 h-2 bg-white rounded-full" />
                  {t.portfolio.badge.toUpperCase()}
                </Badge>
              </motion.div>

              <h2 className="text-headline-xl mb-6 leading-tight">
                {t.portfolio.title}
              </h2>
              <p className="text-body-lg text-gray-600">
                {t.portfolio.subtitle}
              </p>
            </div>

            {/* View All Link */}
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => {
                // Scroll to bottom of portfolio section
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                  const bottom = portfolioSection.offsetTop + portfolioSection.offsetHeight;
                  window.scrollTo({ top: bottom - window.innerHeight + 100, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-body font-semibold text-gray-900 group"
            >
              {t.portfolio.viewAll}
              <HiExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={cn(
                'px-6 py-3 rounded-full font-semibold text-body-sm transition-all duration-300 border-2',
                activeFilter === category
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
              )}
            >
              {category === 'all' ? t.portfolio.allProjects : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-12 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                size={getCardSize(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="inline-block max-w-2xl">
            <h3 className="text-headline-md mb-4">{t.portfolio.projectCTA}</h3>
            <p className="text-body-lg text-gray-600 mb-8">
              {t.portfolio.projectCTADesc}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2 elegant-shadow-lg"
            >
              {t.portfolio.startProject}
              <HiArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
