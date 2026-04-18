import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { useLocale } from '@/i18n/UseLocale';
import { contactMessageApi } from '@/admin/api/contactMessages';
import { normalizeApiError } from '@/admin/api/client';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { premiumEase, premiumMotion } from '@/lib/motion';

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
    <section id="contact" className="section-depth section-divider relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100/65 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: premiumMotion.normal, ease: premiumEase }}
          className="mb-14 max-w-4xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-slate-300/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
            {t.contact.badge}
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: premiumMotion.normal, ease: premiumEase }}
            className="premium-panel premium-texture lg:col-span-7 rounded-3xl p-7 md:p-9"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">{t.contact.nameLabel}</label>
                <input
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3.5 text-lg text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-gray-400 focus:outline-none focus:ring-0"
                  required
                />
                {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">{t.contact.emailLabel}</label>
                <input
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3.5 text-lg text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-gray-400 focus:outline-none focus:ring-0"
                  required
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">{t.contact.messageLabel}</label>
                <textarea
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange('message')}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white/85 px-4 py-3.5 text-lg text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-gray-400 focus:outline-none focus:ring-0"
                  required
                />
                {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>}
              </div>

              <div className="pt-4">
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 rounded-full border border-gray-900 bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-gray-900/20 transition-colors duration-300 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.sendButton}
                      <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </MagneticButton>
              </div>

              {submitState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-gray-900"
                >
                  {`✓ ${t.contact.success}`}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: premiumMotion.normal, delay: 0.1, ease: premiumEase }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32 space-y-10 overflow-hidden rounded-3xl border border-gray-800 bg-linear-to-b from-gray-950 via-slate-900 to-gray-950 p-8 text-gray-100 shadow-2xl shadow-slate-900/30">
              <motion.div
                className="pointer-events-none absolute -top-20 right-[-2.5rem] h-52 w-52 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
              />

              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">{t.contact.email}</p>
                <a
                  href="mailto:hello@codegetit.com"
                  className="text-lg font-semibold text-white hover:text-gray-300 transition-colors duration-200 underline decoration-gray-700 underline-offset-4"
                >
                  hello@codegetit.com
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">{t.contact.location}</p>
                <p className="text-lg text-white">Greece</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Response time</p>
                <p className="inline-flex items-center gap-2 text-lg text-white">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" />
                  Within 24 hours
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900/80 px-4 py-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Clear scope, honest timelines, and direct collaboration from day one.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

