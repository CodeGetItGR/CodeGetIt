import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiExternalLink, HiEye } from 'react-icons/hi';
import { Section } from '@/components/ui/Section';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import { useLocale } from '@/i18n/UseLocale';

const ProjectCard = ({ project, index, size = 'normal' }: { project: Project; index: number; size?: 'normal' | 'large' | 'wide' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  const sizeClasses = {
    normal: 'col-span-12 md:col-span-6 lg:col-span-4',
    large: 'col-span-12 md:col-span-6 lg:col-span-8',
    wide: 'col-span-12'
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={cn("group relative", sizeClasses[size])}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-full min-h-105 bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-gray-900 transition-all duration-500 shadow-lg hover:shadow-2xl">
          {/* Project Background with Enhanced Gradient */}
          <div className={cn("absolute inset-0 bg-linear-to-br opacity-95", project.color)}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              {/* Animated Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }} className="w-full h-full" />
              </div>

              {/* Spotlight Effect on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent"
              />
            </motion.div>
          </div>

          {/* Dynamic Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent"
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            {/* Top Section: Category Badge & Project Number */}
            <div className="flex items-start justify-between">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full shadow-md">
                  {project.category}
                </span>
              </motion.div>

              <motion.div
                className="w-12 h-12 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {project.id.toString().padStart(2, '0')}
              </motion.div>
            </div>

            {/* Bottom Section: Project Details */}
            <div>
              {/* Project Title */}
              <motion.h3
                className="text-3xl md:text-4xl text-white mb-3 font-bold tracking-tight leading-tight"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>

              {/* Project Description */}
              <p className="text-base md:text-lg text-white/90 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Hover Content: Tags & Actions */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 5).map((tag, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-3 py-1.5 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 text-white font-bold text-sm group/btn bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/30 hover:bg-white/20 transition-all"
                      >
                        {t.portfolio.viewCaseStudy}
                        <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>

                      {/* Live Preview Button */}
                      {project.link && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPreview(true);
                          }}
                          className="inline-flex items-center gap-2 text-white font-bold text-sm bg-teal-600/20 backdrop-blur-sm px-4 py-2.5 rounded-full border border-teal-400/40 hover:bg-teal-600/30 hover:border-teal-400/60 transition-all"
                        >
                          <HiEye className="w-4 h-4" />
                          Live Preview
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"
          />
        </div>
      </motion.div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {showPreview && project.link && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{project.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <HiExternalLink className="w-5 h-5 text-gray-700" />
                  </a>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-bold text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* iFrame Content */}
              <iframe
                src={project.link}
                className="w-full h-[calc(100%-60px)]"
                title={`Preview of ${project.title}`}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    <Section id="portfolio" className="bg-white py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — left-aligned, no badge, matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t.portfolio.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                activeFilter === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
              )}
            >
              {category === 'all' ? t.portfolio.allProjects : category}
            </button>
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

        {/* Show More / Show Less */}
        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={toggleShowAllProjects}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
            >
              {showAllProjects ? '← Show less' : `View all ${filteredProjects.length} projects →`}
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        {!showAllProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 pt-16 border-t border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.portfolio.projectCTA}</h3>
                <p className="text-lg text-gray-600">{t.portfolio.projectCTADesc}</p>
              </div>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 shrink-0"
              >
                {t.portfolio.startProject}
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  );
};
