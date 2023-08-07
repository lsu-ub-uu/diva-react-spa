import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../locales/en/translation.json';
import translationSV from '../locales/sv/translation.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      sv: {
        translation: translationSV,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
i18n
  .addResourceBundle('en', 'form', {
    key: '',
  })
  .addResourceBundle('sv', 'form', {
    key: '',
  });

// .then();

export default i18n;
