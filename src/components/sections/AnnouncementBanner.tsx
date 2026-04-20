import { useMemo } from 'react';
import { usePublicSettings } from '@/settings/usePublicSettings';
import { useLocale } from '@/i18n/UseLocale';

type BannerSeverity = 'info' | 'success' | 'warning' | 'error';

const severityClasses: Record<BannerSeverity, string> = {
  info: 'border-blue-200 bg-blue-50/95 text-blue-900',
  success: 'border-emerald-200 bg-emerald-50/95 text-emerald-900',
  warning: 'border-amber-200 bg-amber-50/95 text-amber-900',
  error: 'border-rose-200 bg-rose-50/95 text-rose-900',
};

export const AnnouncementBanner = () => {
  const { t } = useLocale();
  const { getBool, getString } = usePublicSettings();
  const enabled = getBool('marketing.bannerEnabled', false);
  const text = getString('marketing.bannerText', t.hero.title).trim();
  console.log(t, text)
  const severity = getString('marketing.bannerSeverity', 'info').toLowerCase() as BannerSeverity;

  const palette = useMemo(() => severityClasses[severity] ?? severityClasses.info, [severity]);

  if (!enabled || text.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto mb-8 max-w-7xl px-6 sm:px-8 lg:px-12">
      <div className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${palette}`} role="status" aria-live="polite">
        {text}
      </div>
    </div>
  );
};



