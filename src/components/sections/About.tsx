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
        <div className="absolute inset-0 bg-gray-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-gray-900">
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
                    <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
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
        <ProcessTimeline />

        {/* Why Founder-Led */}
        <div className="mt-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.about.whyFounderLed}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.about.founderAdvantage}
            </p>
          </div>
        </div>

        {/* Technical Approach */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12 border-2 border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              {t.about.technicalApproach}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.about.technicalApproachList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-900 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-900 rounded-xl">
              <p className="text-white text-center italic">
                "{t.about.philosophy}"
              </p>
            </div>
          </div>
        </div>

        {/* Ideal Projects */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.about.idealProjects}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.about.idealProjectsList.map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-base font-medium text-gray-900">{project}</p>
              </div>
            ))}
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
