import { motion, useScroll, useTransform } from 'framer-motion';
import {useCallback, useEffect, useState} from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
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

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  },[]);

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
            className="col-span-12 lg:col-span-7"
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

          {/* Stunning Visual Showcase - Right Column */}
          <div className="col-span-12 lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="relative h-80 lg:h-100"
            >
              {/* Floating Code Window */}
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Window Header */}
                <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-400 font-mono">
                    App.tsx
                  </div>
                </div>

                {/* Code Content with Typing Animation */}
                <div className="p-6 font-mono text-sm space-y-3 overflow-hidden">
                  {[
                    { line: '// Your Idea →', delay: 0, color: 'text-gray-500' },
                    { line: '', delay: 0.2, color: '' },
                    { line: '✓ Beautiful Websites', delay: 0.4, color: 'text-green-400' },
                    { line: '✓ Fast & Responsive', delay: 0.7, color: 'text-green-400' },
                    { line: '✓ Mobile-First Design', delay: 1, color: 'text-green-400' },
                    { line: '✓ Full-Stack Apps', delay: 1.3, color: 'text-green-400' },
                    { line: '✓ Real Databases', delay: 1.6, color: 'text-green-400' },
                    { line: '', delay: 1.8, color: '' },
                    { line: '// → Your Reality', delay: 2, color: 'text-gray-500' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + item.delay, duration: 0.3 }}
                      className={`${item.color} ${item.line === '' ? 'h-4' : ''}`}
                    >
                      {item.line}
                    </motion.div>
                  ))}
                </div>

                {/* Animated Cursor */}
                <motion.div
                  className="absolute top-32 left-48 w-2 h-5 bg-green-400 rounded-sm"
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-linear-to-t from-green-500/10 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>

              {/* Floating Badges */}
              {[
                { text: 'React', icon: '⚛️', top: '10%', right: '-15%', delay: 0 },
                { text: 'TypeScript', icon: '📘', bottom: '30%', right: '-20%', delay: 0.3 },
                { text: 'Tailwind', icon: '🎨', top: '70%', left: '-15%', delay: 0.6 },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + badge.delay, type: "spring" }}
                  className="absolute"
                  style={{
                    top: badge.top,
                    bottom: badge.bottom,
                    left: badge.left,
                    right: badge.right,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                    className="bg-white border-2 border-gray-900 rounded-xl px-4 py-2 shadow-xl flex items-center gap-2"
                  >
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-sm font-bold text-gray-900">{badge.text}</span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Particle Effect */}
              {[...Array(8)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-2 h-2 bg-gray-900 rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + Math.cos((idx / 8) * Math.PI * 2) * 100}%`,
                    y: `${50 + Math.sin((idx / 8) * Math.PI * 2) * 100}%`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
