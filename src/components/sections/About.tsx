import { useEffect, useState, useRef } from 'react';
import { useLocale } from '@/i18n/UseLocale';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import {ProcessTimeline} from "@/components/sections/ProcessTimeline.tsx";

const StatCard = ({ value, label, index }: { value: string; label: string; index: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const object = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (object) {
        observer.unobserve(object);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      let currentCount = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className={`text-center group cursor-default transform transition-all duration-500 delay-${index * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-slate-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-slate-900">
          <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-gray-900 group-hover:scale-110 transition-transform duration-300 wrap-break-word">
            {count > 0 ? count : parseInt(value.replace(/\D/g, ''))}
            {value.includes('+') && '+'}
            {value.includes('%') && '%'}
          </div>
          <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { t } = useLocale();

  const stats = [
    { value: '15+', label: t.stats.projects },
    { value: '10+', label: t.stats.clients },
    { value: '2+', label: t.stats.experience },
    { value: '100%', label: t.stats.satisfaction },
  ];

  return (
    <Section id="about" className="bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-linear-to-r from-gray-100 to-gray-200 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-linear-to-r from-gray-200 to-gray-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Meet the Founder */}
          <div className="animate-slide-up">
            <Badge className="mb-6">
              <div className="w-2 h-2 bg-white rounded-full" />
              {t.about.badge.toUpperCase()}
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {t.about.title}
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
              {t.about.subtitle}
            </h3>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
              {t.about.description}
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {t.about.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div id="process">
          <ProcessTimeline />
        </div>

        {/* What You Get - Performance Metrics */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <Badge className="mb-6 mx-auto">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              WHAT YOU GET
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Results That Matter
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every project is built to perform, scale, and deliver value from day one
            </p>
          </div>

          {/* Key Metrics - Impact Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-slate-900 transition-all duration-300 hover:shadow-xl group">
              <div className="text-5xl font-black text-slate-900 mb-3 group-hover:scale-110 transition-transform">
                99.9%
              </div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Uptime Average
              </div>
              <div className="text-xs text-gray-500">
                Production-grade reliability
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-slate-900 transition-all duration-300 hover:shadow-xl group">
              <div className="text-5xl font-black text-slate-900 mb-3 group-hover:scale-110 transition-transform">
                &lt;200ms
              </div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Avg Response Time
              </div>
              <div className="text-xs text-gray-500">
                Optimized for performance
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-slate-900 transition-all duration-300 hover:shadow-xl group">
              <div className="text-5xl font-black text-slate-900 mb-3 group-hover:scale-110 transition-transform">
                2-4wks
              </div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Time to Launch
              </div>
              <div className="text-xs text-gray-500">
                From concept to production
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial or CTA */}
        <div className="mt-24 text-center">
          <div className="max-w-4xl mx-auto glass p-12 rounded-3xl border-2 border-white/50 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-linear-to-br from-gray-400 to-gray-600 border-4 border-white shadow-lg"
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 italic mb-4 leading-relaxed">
              "{t.about.testimonialQuote}"
            </p>
            <p className="font-semibold text-gray-900">- {t.about.testimonialAuthor}</p>
          </div>
        </div>
      </div>
    </Section>
  );
};
