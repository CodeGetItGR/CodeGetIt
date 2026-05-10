import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLocale } from '@/i18n/UseLocale';
import { SectionHeading } from './SectionHeading';

const sectionFade = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    }),
};

export function TestimonialsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useLocale();
    const testimonials = t.landing.testimonials;

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.items.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length);

    const currentTestimonial = testimonials.items[currentIndex];

    return (
        <section ref={ref} className="px-6 py-24">
            <div className="mx-auto max-w-4xl">
                <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} description={testimonials.description} />

                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={sectionFade}
                    className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 md:p-12"
                >
                    <Sparkles className="mb-6 h-10 w-10 text-cyan-300/80" />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.25 }}
                        >
                            <p className="text-xl leading-9 text-balance text-slate-100 md:text-2xl">{`“${currentTestimonial.quote}”`}</p>
                            <div className="mt-8">
                                <div className="font-semibold text-white">{currentTestimonial.author}</div>
                                <div className="text-slate-400">{currentTestimonial.role}</div>
                                <div className="mt-1 text-sm text-cyan-300">{currentTestimonial.company}</div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={prev}
                            aria-label={testimonials.prev}
                            className="rounded-full border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <div className="flex gap-2">
                            {testimonials.items.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrentIndex(index)}
                                    className={[
                                        'h-2 rounded-full transition-all',
                                        index === currentIndex ? 'w-8 bg-cyan-300' : 'w-2 bg-white/30',
                                    ].join(' ')}
                                    aria-label={testimonials.indicatorAria.replace('{index}', String(index + 1))}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={next}
                            aria-label={testimonials.next}
                            className="rounded-full border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
