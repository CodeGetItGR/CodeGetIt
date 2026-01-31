import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';

export const Contact = () => {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitMessage('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    setTimeout(() => setSubmitMessage(''), 5000);
  }, []);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
  }, []);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  }, []);

  const handleMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, message: e.target.value }));
  }, []);

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email',
      value: 'hello@codegetit.com',
      color: 'from-gray-700 to-gray-900',
    },
    {
      icon: HiPhone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      color: 'from-gray-800 to-black',
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: 'San Francisco, CA',
      color: 'from-gray-600 to-gray-800',
    },
  ];

  return (
    <Section id="contact" className="bg-white relative overflow-hidden py-24 lg:py-32">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div style={{
          backgroundImage: `radial-gradient(circle, #171717 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} className="w-full h-full" />
      </div>

      <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24 max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <Badge>
              <div className="w-2 h-2 bg-white rounded-full" />
              GET IN TOUCH
            </Badge>
          </motion.div>

          <h2 className="text-headline-xl mb-6 leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-body-lg text-gray-600">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Contact Form - Large Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message Textarea */}
              <div className="group">
                <label className="text-label text-gray-600 mb-2 block">YOUR MESSAGE</label>
                <textarea
                  rows={6}
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={handleMessageChange}
                  className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-300 hover:border-gray-300 resize-none"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="text-label text-gray-600 mb-2 block">YOUR EMAIL</label>
                <input
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleEmailChange}
                  className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-300 hover:border-gray-300"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div className="group">
                <label className="text-label text-gray-600 mb-2 block">YOUR MESSAGE</label>
                <textarea
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-300 hover:border-gray-300 resize-none"
                  required
                />

                {/* Helpful Tips */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 p-4 bg-gray-50 border border-gray-100 rounded-xl"
                >
                  <p className="text-body-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {t.contact.helpfulTips}:
                  </p>
                  <ul className="space-y-1 text-body-sm text-gray-600">
                    {t.contact.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 text-body elegant-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    {t.contact.sendButton}
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-900 text-white rounded-2xl text-body flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info Cards - Right Column */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative p-6 bg-linear-to-br from-white to-gray-50 border border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow texture-noise overflow-hidden"
              >
                {/* Diagonal Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 bg-linear-to-br ${info.color} rounded-xl mb-4`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-label text-gray-600 mb-2">{info.title}</div>
                  <div className="text-body text-gray-900 font-semibold">{info.value}</div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

// <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.6, delay: 0.2 }}
//     className="mb-8 lg:mb-12"
// >
//   <div className="relative p-8 lg:p-12 bg-gray-900 text-white rounded-2xl overflow-hidden elegant-shadow-xl">
//     {/* Grid Pattern Overlay */}
//     <div className="absolute inset-0 opacity-5">
//       <div style={{
//         backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
//         backgroundSize: '16px 16px'
//       }} className="w-full h-full" />
//     </div>
//
//     <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//       <div className="flex-1">
//         <div className="text-label text-gray-400 mb-3">AVAILABILITY</div>
//         <h3 className="text-title-lg lg:text-headline-md mb-3">Ready to start your project?</h3>
//         <p className="text-body text-gray-300 max-w-2xl">
//           We're currently accepting new projects. Let's build something amazing together with TypeScript, React, and Spring Boot.
//         </p>
//       </div>
//       <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//         <span className="text-green-400 font-semibold text-body-sm">Available Now</span>
//       </div>
//     </div>
//   </div>
// </motion.div>
