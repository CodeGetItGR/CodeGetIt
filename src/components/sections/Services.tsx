import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { useState, useCallback } from 'react';
import { HiCode, HiServer, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/i18n/UseLocale';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  simpleDescription,
  features,
  technicalDetails,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  simpleDescription: string;
  features: string[];
  technicalDetails: {
    title: string;
    disclaimer?: string;
    items: string[];
  };
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLocale();

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Elegant hover glow */}
      <div className={cn(
        "absolute -inset-px bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500",
        isHovered && "animate-pulse"
      )}></div>

      <Card className="relative h-full bg-white border border-gray-200 group-hover:border-gray-900 transition-all duration-500 overflow-hidden">
        {/* Subtle corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 p-8">
          {/* Icon Container */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="mb-6 inline-flex"
          >
            <div className="p-4 bg-gray-900 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>

          {/* Simple Description (always visible) */}
          <p className="text-gray-700 leading-relaxed mb-4 font-medium">
            {simpleDescription}
          </p>

          {/* Elegant divider */}
          <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

          {/* Key Features list */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></span>
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Expand/Collapse Button */}
          <motion.button
            onClick={toggleExpanded}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? t.services.hideDetails : t.services.viewDetails}
            className="w-full mt-4 px-4 py-3 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 rounded-lg transition-all duration-300 flex items-center justify-between font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <span>{isExpanded ? t.services.hideDetails : t.services.viewDetails}</span>
            {isExpanded ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
          </motion.button>

          {/* Expandable Technical Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {technicalDetails.title}
                  </h4>
                  {technicalDetails.disclaimer && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 italic">
                        {technicalDetails.disclaimer}
                      </p>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mb-4">
                    {description}
                  </p>
                  <ul className="space-y-3">
                    {technicalDetails.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start text-sm text-gray-700 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Elegant shimmer */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          />
        )}
      </Card>
    </motion.div>
  );
};

export const Services = () => {
  const { t } = useLocale();

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: HiCode,
      title: t.services.fullStack.title,
      description: t.services.fullStack.description,
      simpleDescription: t.services.fullStack.simpleDescription,
      features: t.services.fullStack.features,
      technicalDetails: t.services.fullStack.technicalDetails,
    },
    {
      icon: HiServer,
      title: t.services.api.title,
      description: t.services.api.description,
      simpleDescription: t.services.api.simpleDescription,
      features: t.services.api.features,
      technicalDetails: t.services.api.technicalDetails,
    },
  ];

  return (
    <Section id="services" className="bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-50 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <Badge>{t.services.badge.toUpperCase()}</Badge>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-6">{t.services.customSolutions}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-2xl"
          >
            {t.services.contactCTA}
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
};
