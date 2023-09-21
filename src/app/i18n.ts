import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const { VITE_BFF_API_URL } = import.meta.env;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .init({
    debug: false,
    preload: ['sv', 'en'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${VITE_BFF_API_URL}/translations/{{lng}}`,
    },
  })
  .then();

export default i18n;
