import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
// import LanguageDetector from 'i18next-browser-languagedetector'; // [REMOVED] Causing hydration mismatch

i18n
// .use(LanguageDetector) // [REMOVED]
  .use(resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`)))
  .use(initReactI18next)
  .init({
    lng: 'th', // [NEW] Force initial language to match server
    fallbackLng: 'th',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // detection: {
    //     order: ['localStorage', 'navigator'],
    //     caches: ['localStorage'],
    // }
  });

export default i18n;
