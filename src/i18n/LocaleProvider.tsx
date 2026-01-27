import {type ReactNode, useCallback, useState} from 'react';
import { translations } from './translations';
import type {Locale} from './types.ts';
import {LocaleContext} from "./LocaleContext.ts";


export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};