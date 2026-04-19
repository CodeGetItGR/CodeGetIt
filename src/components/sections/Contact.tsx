import { useState, useCallback, useEffect, useMemo, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { requestApi } from '@/admin/api/requests';
import type {
  BudgetFlexibility,
  BudgetRange,
  CommunicationPreference,
  DataSensitivity,
  DecisionMakerRole,
  DesiredStartWindow,
  Priority,
  ProjectType,
} from '@/admin/types';
import { useLocale } from '@/i18n/UseLocale';
import { contactMessageApi } from '@/admin/api/contactMessages';
import { normalizeApiError } from '@/admin/api/client';
import { useSettingsOptions } from '@/admin/hooks/useSettingsOptions';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { premiumEase, premiumMotion } from '@/lib/motion';
import { usePublicSettings } from '@/settings/usePublicSettings';

interface DetailedRequestFormState {
  title: string;
  requesterPhone: string;
  projectType: string;
  businessGoal: string;
  organizationName: string;
  industry: string;
  targetAudience: string;
  desiredStartWindow: string;
  targetLaunchWindow: string;
  budgetRange: string;
  budgetFlexibility: string;
  decisionMakerRole: string;
  stakeholderCount: string;
  communicationPreference: string;
  legalOrBrandConstraints: string;
  dataSensitivity: string;
  priority: string;
}

const blankDetailedRequest: DetailedRequestFormState = {
  title: '',
  requesterPhone: '',
  projectType: '',
  businessGoal: '',
  organizationName: '',
  industry: '',
  targetAudience: '',
  desiredStartWindow: '',
  targetLaunchWindow: '',
  budgetRange: '',
  budgetFlexibility: '',
  decisionMakerRole: '',
  stakeholderCount: '',
  communicationPreference: '',
  legalOrBrandConstraints: '',
  dataSensitivity: '',
  priority: 'MEDIUM',
};

export const Contact = () => {
  const { t } = useLocale();
  const { getBool, getString } = usePublicSettings();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [detailedRequest, setDetailedRequest] = useState<DetailedRequestFormState>(blankDetailedRequest);
  const [useDetailedRequest, setUseDetailedRequest] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [errorText, setErrorText] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [optionNotice, setOptionNotice] = useState('');

  const { options: projectTypeOptions } = useSettingsOptions({ groupKey: 'request.projectType', scope: 'public', onlyEnabled: true });
  const { options: desiredStartWindowOptions } = useSettingsOptions({ groupKey: 'request.desiredStartWindow', scope: 'public', onlyEnabled: true });
  const { options: budgetRangeOptions } = useSettingsOptions({ groupKey: 'request.budgetRange', scope: 'public', onlyEnabled: true });
  const { options: budgetFlexibilityOptions } = useSettingsOptions({ groupKey: 'request.budgetFlexibility', scope: 'public', onlyEnabled: true });
  const { options: decisionMakerRoleOptions } = useSettingsOptions({ groupKey: 'request.decisionMakerRole', scope: 'public', onlyEnabled: true });
  const { options: communicationPreferenceOptions } = useSettingsOptions({ groupKey: 'request.communicationPreference', scope: 'public', onlyEnabled: true });
  const { options: dataSensitivityOptions } = useSettingsOptions({ groupKey: 'request.dataSensitivity', scope: 'public', onlyEnabled: true });
  const { options: priorityOptions } = useSettingsOptions({ groupKey: 'request.priority', scope: 'public', onlyEnabled: true });

  const hasDetailedRequiredOptions =
    projectTypeOptions.length > 0 &&
    desiredStartWindowOptions.length > 0 &&
    budgetRangeOptions.length > 0 &&
    decisionMakerRoleOptions.length > 0;

  const resetMessages = useCallback(() => {
    setSubmitState('idle');
    setErrorText('');
    setFieldErrors({});
    setSubmittedRequestId(null);
  }, []);

  const ensureEnabledOption = useCallback((value: string, validValues: string[]) => {
    if (!value) {
      return value;
    }
    return validValues.includes(value) ? value : '';
  }, []);

  useEffect(() => {
    setDetailedRequest((prev) => {
      const next: DetailedRequestFormState = {
        ...prev,
        projectType: ensureEnabledOption(prev.projectType, projectTypeOptions.map((item) => item.value)),
        desiredStartWindow: ensureEnabledOption(prev.desiredStartWindow, desiredStartWindowOptions.map((item) => item.value)),
        budgetRange: ensureEnabledOption(prev.budgetRange, budgetRangeOptions.map((item) => item.value)),
        budgetFlexibility: ensureEnabledOption(prev.budgetFlexibility, budgetFlexibilityOptions.map((item) => item.value)),
        decisionMakerRole: ensureEnabledOption(prev.decisionMakerRole, decisionMakerRoleOptions.map((item) => item.value)),
        communicationPreference: ensureEnabledOption(prev.communicationPreference, communicationPreferenceOptions.map((item) => item.value)),
        dataSensitivity: ensureEnabledOption(prev.dataSensitivity, dataSensitivityOptions.map((item) => item.value)),
        priority: ensureEnabledOption(prev.priority, priorityOptions.map((item) => item.value)) || 'MEDIUM',
      };

      const changed =
        next.projectType !== prev.projectType ||
        next.desiredStartWindow !== prev.desiredStartWindow ||
        next.budgetRange !== prev.budgetRange ||
        next.budgetFlexibility !== prev.budgetFlexibility ||
        next.decisionMakerRole !== prev.decisionMakerRole ||
        next.communicationPreference !== prev.communicationPreference ||
        next.dataSensitivity !== prev.dataSensitivity ||
        next.priority !== prev.priority;

      if (changed) {
        setOptionNotice('Some options changed recently, so we cleared unavailable selections for you.');
      }

      return changed ? next : prev;
    });
  }, [
    budgetFlexibilityOptions,
    budgetRangeOptions,
    communicationPreferenceOptions,
    dataSensitivityOptions,
    decisionMakerRoleOptions,
    desiredStartWindowOptions,
    ensureEnabledOption,
    priorityOptions,
    projectTypeOptions,
  ]);

  const validateDetailedRequest = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!detailedRequest.title.trim()) errors.title = 'Project title is required.';
    else if (detailedRequest.title.trim().length > 255) errors.title = 'Project title must be 255 characters or fewer.';

    if (!formData.name.trim()) errors.requesterName = 'Your name is required.';
    else if (formData.name.trim().length > 255) errors.requesterName = 'Name must be 255 characters or fewer.';

    if (!formData.email.trim()) errors.requesterEmail = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.requesterEmail = 'Enter a valid email address.';
    else if (formData.email.trim().length > 255) errors.requesterEmail = 'Email must be 255 characters or fewer.';

    if (!detailedRequest.requesterPhone.trim()) errors.requesterPhone = 'Phone is required.';
    else if (detailedRequest.requesterPhone.trim().length > 50) errors.requesterPhone = 'Phone must be 50 characters or fewer.';

    if (!detailedRequest.projectType) errors.projectType = 'Project type is required.';
    if (!detailedRequest.businessGoal.trim()) errors.businessGoal = 'Business goal is required.';
    else if (detailedRequest.businessGoal.trim().length > 2000) errors.businessGoal = 'Business goal must be 2000 characters or fewer.';
    if (!detailedRequest.desiredStartWindow) errors.desiredStartWindow = 'Desired start window is required.';
    if (!detailedRequest.budgetRange) errors.budgetRange = 'Budget range is required.';
    if (!detailedRequest.decisionMakerRole) errors.decisionMakerRole = 'Decision-maker role is required.';

    if (formData.message.trim().length > 5000) errors.description = 'Description must be 5000 characters or fewer.';
    if (detailedRequest.organizationName.trim().length > 255) errors.organizationName = 'Organization name must be 255 characters or fewer.';
    if (detailedRequest.industry.trim().length > 100) errors.industry = 'Industry must be 100 characters or fewer.';
    if (detailedRequest.targetAudience.trim().length > 2000) errors.targetAudience = 'Target audience must be 2000 characters or fewer.';
    if (detailedRequest.targetLaunchWindow.trim().length > 100) errors.targetLaunchWindow = 'Target launch window must be 100 characters or fewer.';
    if (detailedRequest.legalOrBrandConstraints.trim().length > 2000) errors.legalOrBrandConstraints = 'Constraints must be 2000 characters or fewer.';

    if (detailedRequest.stakeholderCount.trim()) {
      const count = Number(detailedRequest.stakeholderCount);
      if (!Number.isInteger(count) || count < 1 || count > 1000) {
        errors.stakeholderCount = 'Stakeholder count must be an integer between 1 and 1000.';
      }
    }

    return errors;
  }, [detailedRequest, formData.email, formData.message, formData.name]);

  const detailedSteps = useMemo(() => [
    { title: 'Contact info' },
    { title: 'Project essentials' },
    { title: 'Extra context' },
  ] as const, []);

  const detailedStepFields = useMemo<ReadonlyArray<ReadonlyArray<string>>>(() => [
    ['requesterName', 'requesterEmail', 'title', 'requesterPhone'],
    ['projectType', 'businessGoal', 'desiredStartWindow', 'budgetRange', 'decisionMakerRole', 'stakeholderCount'],
    ['description', 'organizationName', 'industry', 'targetAudience', 'targetLaunchWindow', 'legalOrBrandConstraints'],
  ], []);

  const hasErrorsInStep = useCallback((errors: Record<string, string>, stepIndex: number) => {
    const fields = detailedStepFields[stepIndex] ?? [];
    return fields.some((field) => Boolean(errors[field]));
  }, [detailedStepFields]);

  const firstErrorStep = useCallback((errors: Record<string, string>) => {
    for (let index = 0; index < detailedStepFields.length; index += 1) {
      if (hasErrorsInStep(errors, index)) {
        return index;
      }
    }
    return 0;
  }, [detailedStepFields.length, hasErrorsInStep]);

  const handleNextStep = useCallback(() => {
    const validationErrors = validateDetailedRequest();
    if (hasErrorsInStep(validationErrors, currentStep)) {
      setFieldErrors(validationErrors);
      setSubmitState('error');
      setErrorText('Please complete the required fields in this step.');
      return;
    }

    resetMessages();
    setCurrentStep((prev) => Math.min(prev + 1, detailedSteps.length - 1));
  }, [currentStep, detailedSteps.length, hasErrorsInStep, resetMessages, validateDetailedRequest]);

  const handlePreviousStep = useCallback(() => {
    resetMessages();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [resetMessages]);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    resetMessages();

    try {
      if (!useDetailedRequest) {
        await contactMessageApi.submit({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        });
      } else {
        if (!hasDetailedRequiredOptions) {
          throw new Error('Request options are still loading. Please wait a moment and try again.');
        }

        const validationErrors = validateDetailedRequest();
        if (Object.keys(validationErrors).length > 0) {
          setFieldErrors(validationErrors);
          setSubmitState('error');
          setErrorText('Please review the highlighted fields and try again.');
          setCurrentStep(firstErrorStep(validationErrors));
          return;
        }

        const response = await requestApi.submit({
          title: detailedRequest.title.trim(),
          description: formData.message.trim() || undefined,
          requesterName: formData.name.trim(),
          requesterEmail: formData.email.trim(),
          requesterPhone: detailedRequest.requesterPhone.trim(),
          projectType: detailedRequest.projectType as ProjectType,
          businessGoal: detailedRequest.businessGoal.trim(),
          organizationName: detailedRequest.organizationName.trim() || undefined,
          industry: detailedRequest.industry.trim() || undefined,
          targetAudience: detailedRequest.targetAudience.trim() || undefined,
          desiredStartWindow: detailedRequest.desiredStartWindow as DesiredStartWindow,
          targetLaunchWindow: detailedRequest.targetLaunchWindow.trim() || undefined,
          budgetRange: detailedRequest.budgetRange as BudgetRange,
          budgetFlexibility: (detailedRequest.budgetFlexibility || undefined) as BudgetFlexibility | undefined,
          decisionMakerRole: detailedRequest.decisionMakerRole as DecisionMakerRole,
          stakeholderCount: detailedRequest.stakeholderCount ? Number(detailedRequest.stakeholderCount) : undefined,
          communicationPreference: (detailedRequest.communicationPreference || undefined) as CommunicationPreference | undefined,
          legalOrBrandConstraints: detailedRequest.legalOrBrandConstraints.trim() || undefined,
          dataSensitivity: (detailedRequest.dataSensitivity || undefined) as DataSensitivity | undefined,
          priority: (detailedRequest.priority || undefined) as Priority | undefined,
        });
        setSubmittedRequestId(response.id);
      }

      setSubmitState('success');
      setFormData({ name: '', email: '', message: '' });
      setDetailedRequest(blankDetailedRequest);
      setCurrentStep(0);
      setOptionNotice('');
      setTimeout(() => setSubmitState('idle'), 6000);
    } catch (error) {
      setSubmitState('error');
      const apiError = normalizeApiError(error);
      setFieldErrors(apiError.fieldErrors ?? {});
      setErrorText(
        apiError.fieldErrors
          ? t.contact.errorFixFields
          : apiError.detail || t.contact.errorGeneric,
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    detailedRequest,
    firstErrorStep,
    formData,
    hasDetailedRequiredOptions,
    resetMessages,
    t.contact.errorFixFields,
    t.contact.errorGeneric,
    useDetailedRequest,
    validateDetailedRequest,
  ]);

  const handleChange = useCallback((field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleDetailedRequestToggle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUseDetailedRequest(event.target.checked);
    setCurrentStep(0);
    resetMessages();
  }, [resetMessages]);

  const handleDetailedFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.currentTarget.dataset.requestField as keyof DetailedRequestFormState | undefined;
    if (!field) {
      return;
    }

    const { value } = event.currentTarget;
    setDetailedRequest((prev) => ({ ...prev, [field]: value }));
  }, []);

  const contactFormEnabled = getBool('availability.contactFormEnabled', true);
  const publicContactEmail = getString('marketing.contactEmail', 'hello@codegetit.com');

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
          <p className="section-kicker">
            {t.contact.badge}
          </p>
          <h2 className="section-title">
            {t.contact.title}
          </h2>
          <p className="section-subtitle">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {contactFormEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: premiumMotion.normal, ease: premiumEase }}
              className="interactive-card premium-panel premium-texture lg:col-span-7 rounded-3xl p-7 md:p-9"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-white/60 p-4">
                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={useDetailedRequest}
                    onChange={handleDetailedRequestToggle}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300"
                  />
                  <span>
                    I know the project scope and want to submit a detailed project request now.
                  </span>
                </label>
                {useDetailedRequest && (
                  <p className="mt-2 text-xs text-gray-500">
                    We will use these details to create your project request directly in our delivery pipeline.
                  </p>
                )}
              </div>

              {(!useDetailedRequest || currentStep === 0) && (
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
                {fieldErrors.requesterName && <p className="mt-1 text-xs text-red-500">{fieldErrors.requesterName}</p>}
              </div>
              )}

              {(!useDetailedRequest || currentStep === 0) && (
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
                {fieldErrors.requesterEmail && <p className="mt-1 text-xs text-red-500">{fieldErrors.requesterEmail}</p>}
              </div>
              )}

              {useDetailedRequest && (
                <>
                  <div className="rounded-2xl border border-gray-200 bg-white/65 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {detailedSteps.map((step, index) => (
                        <div key={step.title} className="flex items-center gap-2">
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                              index <= currentStep ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className={`text-xs font-medium ${index === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentStep === 0 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Project title</label>
                      <input
                        type="text"
                        value={detailedRequest.title}
                        data-request-field="title"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                        maxLength={255}
                        required={useDetailedRequest}
                      />
                      {fieldErrors.title && <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Phone</label>
                      <input
                        type="tel"
                        value={detailedRequest.requesterPhone}
                        data-request-field="requesterPhone"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                        maxLength={50}
                        required={useDetailedRequest}
                      />
                      {fieldErrors.requesterPhone && <p className="mt-1 text-xs text-red-500">{fieldErrors.requesterPhone}</p>}
                    </div>
                  </div>
                  )}

                  {currentStep === 1 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Business goal</label>
                    <textarea
                      value={detailedRequest.businessGoal}
                      data-request-field="businessGoal"
                      onChange={handleDetailedFieldChange}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                      maxLength={2000}
                      required={useDetailedRequest}
                    />
                    {fieldErrors.businessGoal && <p className="mt-1 text-xs text-red-500">{fieldErrors.businessGoal}</p>}
                  </div>
                  )}

                  {currentStep === 1 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Project type</label>
                      <select
                        value={detailedRequest.projectType}
                        data-request-field="projectType"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                        required={useDetailedRequest}
                      >
                        <option value="">Select project type</option>
                        {projectTypeOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                      {fieldErrors.projectType && <p className="mt-1 text-xs text-red-500">{fieldErrors.projectType}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Desired start</label>
                      <select
                        value={detailedRequest.desiredStartWindow}
                        data-request-field="desiredStartWindow"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                        required={useDetailedRequest}
                      >
                        <option value="">Select start window</option>
                        {desiredStartWindowOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                      {fieldErrors.desiredStartWindow && <p className="mt-1 text-xs text-red-500">{fieldErrors.desiredStartWindow}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Budget range</label>
                      <select
                        value={detailedRequest.budgetRange}
                        data-request-field="budgetRange"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                        required={useDetailedRequest}
                      >
                        <option value="">Select budget range</option>
                        {budgetRangeOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                      {fieldErrors.budgetRange && <p className="mt-1 text-xs text-red-500">{fieldErrors.budgetRange}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Decision-maker role</label>
                      <select
                        value={detailedRequest.decisionMakerRole}
                        data-request-field="decisionMakerRole"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                        required={useDetailedRequest}
                      >
                        <option value="">Select role</option>
                        {decisionMakerRoleOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                      {fieldErrors.decisionMakerRole && <p className="mt-1 text-xs text-red-500">{fieldErrors.decisionMakerRole}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Budget flexibility</label>
                      <select
                        value={detailedRequest.budgetFlexibility}
                        data-request-field="budgetFlexibility"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                      >
                        <option value="">Select flexibility</option>
                        {budgetFlexibilityOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Communication preference</label>
                      <select
                        value={detailedRequest.communicationPreference}
                        data-request-field="communicationPreference"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                      >
                        <option value="">Select preference</option>
                        {communicationPreferenceOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Data sensitivity</label>
                      <select
                        value={detailedRequest.dataSensitivity}
                        data-request-field="dataSensitivity"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                      >
                        <option value="">Select sensitivity</option>
                        {dataSensitivityOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Priority</label>
                      <select
                        value={detailedRequest.priority}
                        data-request-field="priority"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                      >
                        {priorityOptions.map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">Stakeholders</label>
                      <input
                        type="number"
                        min={1}
                        max={1000}
                        value={detailedRequest.stakeholderCount}
                        data-request-field="stakeholderCount"
                        onChange={handleDetailedFieldChange}
                        className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                      />
                      {fieldErrors.stakeholderCount && <p className="mt-1 text-xs text-red-500">{fieldErrors.stakeholderCount}</p>}
                    </div>
                  </div>
                  )}

                  {currentStep === 2 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Organization name (optional)"
                      value={detailedRequest.organizationName}
                      data-request-field="organizationName"
                      onChange={handleDetailedFieldChange}
                      className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Industry (optional)"
                      value={detailedRequest.industry}
                      data-request-field="industry"
                      onChange={handleDetailedFieldChange}
                      className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Target audience (optional)"
                      value={detailedRequest.targetAudience}
                      data-request-field="targetAudience"
                      onChange={handleDetailedFieldChange}
                      className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900 md:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="Target launch window (optional)"
                      value={detailedRequest.targetLaunchWindow}
                      data-request-field="targetLaunchWindow"
                      onChange={handleDetailedFieldChange}
                      className="w-full rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900 md:col-span-2"
                    />
                  </div>
                  )}

                  {currentStep === 2 && (
                  <textarea
                    placeholder="Legal or brand constraints (optional)"
                    value={detailedRequest.legalOrBrandConstraints}
                    data-request-field="legalOrBrandConstraints"
                    onChange={handleDetailedFieldChange}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white/85 px-4 py-3 text-base text-gray-900"
                  />
                  )}

                  {optionNotice && <p className="text-xs text-amber-700">{optionNotice}</p>}
                  {!hasDetailedRequiredOptions && (
                    <p className="text-xs text-amber-700">Request options are still loading. You can still send a simple message now.</p>
                  )}
                </>
              )}

              {(!useDetailedRequest || currentStep === 2) && (
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">
                  {useDetailedRequest ? 'Project description (optional)' : t.contact.messageLabel}
                </label>
                <textarea
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange('message')}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white/85 px-4 py-3.5 text-lg text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-gray-400 focus:outline-none focus:ring-0"
                  required
                />
                {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>}
                {fieldErrors.description && <p className="mt-1 text-xs text-red-500">{fieldErrors.description}</p>}
              </div>
              )}

              <div className="pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  {useDetailedRequest && currentStep > 0 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Back
                    </button>
                  )}

                  {useDetailedRequest && currentStep < detailedSteps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="rounded-full border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
                    >
                      Next step
                    </button>
                  ) : (
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer hover:opacity-75 cta-polish group inline-flex items-center gap-3 rounded-full border border-gray-900 bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-gray-900/20 transition-colors duration-300 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        <>
                          {useDetailedRequest ? 'Submit project request' : t.contact.sendButton}
                          <HiArrowRight className="w-5 h-5 opacity-90 transition-opacity duration-200 group-hover:opacity-100" />
                        </>
                      )}
                    </MagneticButton>
                  )}
                </div>
              </div>

              {submitState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-gray-900"
                >
                  {submittedRequestId
                    ? `✓ Project request submitted successfully. Reference ID: ${submittedRequestId}`
                    : `✓ ${t.contact.success}`}
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
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: premiumMotion.normal, delay: 0.1, ease: premiumEase }}
            className={contactFormEnabled ? 'lg:col-span-5' : 'lg:col-span-7'}
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
                  href={`mailto:${publicContactEmail}`}
                  className="text-lg font-semibold text-white hover:text-gray-300 transition-colors duration-200 underline decoration-gray-700 underline-offset-4"
                >
                  {publicContactEmail}
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">{t.contact.location}</p>
                <p className="text-lg text-white">{t.contact.locationValue}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">{t.contact.responseTimeLabel}</p>
                <p className="inline-flex items-center gap-2 text-lg text-white">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" />
                  {t.contact.responseTimeValue}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900/80 px-4 py-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t.contact.trustNote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

