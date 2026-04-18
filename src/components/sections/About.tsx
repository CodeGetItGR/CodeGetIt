import { useEffect, useState, useRef } from 'react';
import { useLocale } from '@/i18n/UseLocale';
import { motion } from 'framer-motion';
import { ProcessTimeline } from "@/components/sections/ProcessTimeline.tsx";

const AnimatedNumber = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const increment = value / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref}>
      <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const About = () => {
  const { t } = useLocale();

  return (
    <section id="about" className="py-28 lg:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Two-column intro: description left, features right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-[0.08em] mb-4">{t.about.badge}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-10">
            {t.about.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <p className="text-xl text-gray-600 leading-relaxed">
              {t.about.description}
            </p>
            <ul className="space-y-4">
              {t.about.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                  <span className="text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Stats — 4 columns with left-aligned numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 py-14 border-y border-gray-200"
        >
          <AnimatedNumber value={15} suffix="+" label={t.stats.projects} />
          <AnimatedNumber value={10} suffix="+" label={t.stats.clients} />
          <AnimatedNumber value={2} suffix="+" label={t.stats.experience} />
          <AnimatedNumber value={100} suffix="%" label={t.stats.satisfaction} />
        </motion.div>

        {/* Process Timeline */}
        <div id="process">
          <ProcessTimeline />
        </div>

        {/* Performance Metrics — dark section for visual contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-gray-950 rounded-3xl p-10 md:p-14"
        >
          <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-[0.08em] mb-4">Performance</p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-12">
            Results that matter
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { metric: '99.9%', label: 'Uptime average', desc: 'Reliable performance' },
              { metric: '<200ms', label: 'Response time', desc: 'Optimized for performance' },
              { metric: '2–4 wks', label: 'Time to launch', desc: 'From concept to launch' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                  {item.metric}
                </div>
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
