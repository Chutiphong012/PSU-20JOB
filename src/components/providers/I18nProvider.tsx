'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { ReactNode, useEffect } from 'react';

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Recover language from localStorage on mount (Client only)
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }

    // 2. Persist language changes
    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem('i18nextLng', lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
