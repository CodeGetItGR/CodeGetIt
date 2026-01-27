import type { Locale, Translations } from './types';
import { en, es, fr, de } from './locales';

export type { Locale, Translations };

export const translations: Record<Locale, Translations> = {
  en,
  es,
  fr,
  de,
};
