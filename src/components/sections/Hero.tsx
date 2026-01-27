import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { heroStats } from '@/data/stats';
import { Badge } from '@/components/ui/badge';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const Hero = () => {
  const { t } = useLocale();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-32 pb-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
      </div>

      {/* Floating Geometric Shapes with Parallax */}
      <motion.div
        style={{ y: y1, x: mousePosition.x * 0.5 }}
        className="absolute top-40 right-20 w-64 h-64 border border-gray-200 rounded-2xl rotate-12 opacity-30"
      />
      <motion.div
        style={{ y: y2, x: -mousePosition.x * 0.3 }}
        className="absolute bottom-40 left-10 w-48 h-48 bg-linear-to-br from-gray-100 to-gray-200 rounded-full opacity-20"
      />
      <motion.div
        style={{ x: mousePosition.x * 0.2, y: mousePosition.y * 0.2 }}
        className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-gray-900 rotate-45 opacity-10"
      />

      <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Main Headline - Large Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-8">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                FULL-STACK DEVELOPMENT AGENCY
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-display mb-8 leading-none">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block"
              >
                {t.hero.title}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-gray-400"
              >
                Reimagined
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-body-lg text-gray-600 max-w-2xl mb-12 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 text-body elegant-shadow-lg"
              >
                <motion.span
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2"
                >
                  {t.hero.startProject}
                  <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection('portfolio')}
                className="relative px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 text-body overflow-hidden group/btn"
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.hero.viewWork}
                </motion.span>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Stats Cards - Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative p-6 bg-linear-to-br from-white to-gray-50 border border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow texture-noise overflow-hidden"
              >
                {/* Diagonal Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 bg-linear-to-br ${stat.color} rounded-xl mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-headline-md font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-body-sm text-gray-600 font-medium">{stat.label}</div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
