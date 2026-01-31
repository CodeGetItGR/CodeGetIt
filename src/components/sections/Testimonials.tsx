import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { Section } from '@/components/ui/Section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/data/testimonials';
import { useLocale } from '@/i18n/UseLocale';

export const Testimonials = () => {
  const { t } = useLocale();

  return (
    <Section id="testimonials" className="bg-linear-to-b from-white to-gray-50">
      <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-gray-900 text-white text-label rounded-full mb-6"
          >
            {t.testimonials?.badge || 'CLIENT TESTIMONIALS'}
          </motion.span>
          <h2 className="text-headline-lg md:text-display-sm mb-6">
            {t.testimonials?.title || 'What Our Clients Say'}
          </h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            {t.testimonials?.subtitle || 'Trusted by innovative companies worldwide'}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow hover:elegant-shadow-lg"
                  >
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <HiStar key={i} className="w-5 h-5 text-gray-900" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-body text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-body">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-body">
                          {testimonial.name}
                        </div>
                        <div className="text-body-sm text-gray-600">
                          {testimonial.role} @ {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-4 lg:-left-12" />
              <CarouselNext className="-right-4 lg:-right-12" />
            </div>
          </Carousel>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: t.testimonials?.metrics?.satisfaction || '100% Satisfaction', value: '★★★★★' },
            { label: t.testimonials?.metrics?.projects || '50+ Projects', value: '50+' },
            { label: t.testimonials?.metrics?.clients || '30+ Clients', value: '30+' },
            { label: t.testimonials?.metrics?.experience || '5+ Years', value: '5+' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-headline-md font-bold text-gray-900 mb-2">
                {metric.value}
              </div>
              <div className="text-body-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
