import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          Welcome: 'Welcome to DiVA',
          start: 'Start',
          users: 'List Users',
        },
      },
      sv: {
        translation: {
          Welcome: 'Välkommen till DiVA',
          start: 'Startsidan',
          users: 'Lista Användare',
        },
      },
    },
    lng: 'sv',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then();
