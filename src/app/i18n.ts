import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const { VITE_BFF_API_URL } = import.meta.env;

const useI18n = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        setLoading(true);
        await i18n
          .use(initReactI18next)
          .use(LanguageDetector)
          .use(I18NextHttpBackend)
          .init({
            fallbackLng: 'sv',
            debug: false, // TODO set to true if dev env
            interpolation: {
              escapeValue: false,
            },
            backend: {
              loadPath: `${VITE_BFF_API_URL}/translations/{{lng}}`,
            },
          });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    initializeI18n().then();
  }, []);

  return { i18n, loading };
};

export default useI18n;
