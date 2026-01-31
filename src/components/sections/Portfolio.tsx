import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
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

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn("group relative", sizeClasses[size])}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full min-h-96 bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-900 transition-all duration-500 shadow-md hover:shadow-xl">
        {/* Project Image/Gradient */}
        <div className={cn("absolute inset-0 bg-linear-to-br opacity-90", project.color)}>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          />
        </div>

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
          {/* Top: Category & Number */}
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-full">
                {project.category}
              </span>
            </motion.div>

            <div className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900">
              {project.id.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Bottom: Project Info */}
          <div>
            {project.client && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-white/70 mb-2"
              >
                {project.client}
              </motion.p>
            )}

            <motion.h3
              className="text-2xl md:text-3xl text-white mb-2 font-bold"
            >
              {project.title}
            </motion.h3>

            <p className="text-base text-white/90 mb-3 line-clamp-2">
              {project.description}
            </p>

            {/* Result - Always visible */}
            {project.result && (
              <div className="mb-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-sm font-semibold text-white">
                  📈 {project.result}
                </p>
              </div>
            )}

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-white font-semibold text-sm group/btn"
                  >
                    {t.portfolio.viewCaseStudy}
                    <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<'all' | Project['category']>('all');
  const [showAllProjects, setShowAllProjects] = useState(false);

  const categories: Array<'all' | Project['category']> = ['all', 'Full-Stack', 'Front-End', 'Back-End'];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Show only first 3 projects in normal view
  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  // Define layout pattern - some large, some normal
  const getCardSize = (index: number): 'normal' | 'large' | 'wide' => {
    if (index === 0) return 'large';
    if (index === 3) return 'large';
    return 'normal';
  };

  const toggleShowAllProjects = useCallback(() => {
    setShowAllProjects(prev => !prev);
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleFilterChange = useCallback((category: 'all' | Project['category']) => {
    setActiveFilter(category);
  }, []);

  return (
    <Section id="portfolio" className="bg-white relative overflow-hidden py-20 lg:py-28">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div style={{
          backgroundImage: `radial-gradient(circle, #171717 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <Badge>
                  <div className="w-2 h-2 bg-white rounded-full" />
                  {t.portfolio.badge.toUpperCase()}
                </Badge>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight text-gray-900">
                {t.portfolio.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                {t.portfolio.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange(category)}
              className={cn(
                'px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
                activeFilter === category
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
              )}
            >
              {category === 'all' ? t.portfolio.allProjects : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Bento Grid - Minimal View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-12 gap-4 md:gap-6"
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                size={getCardSize(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleShowAllProjects}
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              {showAllProjects ? '← Show Less' : `View All ${filteredProjects.length} Projects →`}
            </motion.button>
          </motion.div>
        )}

        {/* Bottom CTA - Only show when not showing all projects */}
        {!showAllProjects && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="inline-block max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{t.portfolio.projectCTA}</h3>
              <p className="text-base md:text-lg text-gray-600 mb-8">
                {t.portfolio.projectCTADesc}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                {t.portfolio.startProject}
                <HiArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  );
};
