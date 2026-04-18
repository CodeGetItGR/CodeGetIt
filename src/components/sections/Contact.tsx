import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { contactMessageApi } from '@/admin/api/contactMessages';
import { normalizeApiError } from '@/admin/api/client';

export const Contact = () => {
  const { t } = useLocale();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState('idle');
    setErrorText('');
    setFieldErrors({});

    try {
      await contactMessageApi.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setSubmitState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitState('idle'), 6000);
    } catch (error) {
      setSubmitState('error');
      const apiError = normalizeApiError(error);
      setFieldErrors(apiError.fieldErrors ?? {});
      setErrorText(
        apiError.fieldErrors
          ? 'Please fix the errors below.'
          : apiError.detail || 'Something went wrong. Please try again or email directly.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleChange = useCallback((field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  return (
    <section id="contact" className="py-32 lg:py-40 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 max-w-2xl"
        >
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Two-column: Form + Email */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Name</label>
                <input
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-lg text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors duration-200"
                  required
                />
                {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Email</label>
                <input
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-lg text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors duration-200"
                  required
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Message</label>
                <textarea
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange('message')}
                  rows={5}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-lg text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors duration-200 resize-none"
                  required
                />
                {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>

              {submitState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-gray-900"
                >
                  ✓ Message sent successfully. I'll get back to you shortly.
                </motion.p>
              )}

              {submitState === 'error' && errorText && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-red-600"
                >
                  ✖ {errorText}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Right column — just an email link, clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-32 space-y-12">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Email</p>
                <a
                  href="mailto:hello@codegetit.com"
                  className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-200 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
                >
                  hello@codegetit.com
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Based in</p>
                <p className="text-lg text-gray-900">Greece</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Response time</p>
                <p className="text-lg text-gray-900">Within 24 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

