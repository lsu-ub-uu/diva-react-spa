import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          Welcome: 'Welcome to DiVA',
          start: 'Start',
          users: 'List Users',
          common: {
            close: 'Close'
          }
        },
      },
      sv: {
        translation: {
          Welcome: 'Välkommen till DiVA',
          start: 'Startsidan',
          users: 'Lista Användare',
          common: {
            close: 'Stäng'
          }
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then();

export default i18n;
