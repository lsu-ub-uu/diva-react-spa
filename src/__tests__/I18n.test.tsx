import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from 'react-i18next';
import i18n from 'i18next';

/**
 * @vitest-environment jsdom
 */

const setupI18nEnvironment = async () => {
  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          Welcome: 'Welcome to the DiVA tests',
        },
      },
      sv: {
        translation: {
          Welcome: 'Välkommen till DiVA tester',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

const ComponentWithTranslation = () => {
  const { t } = useTranslation();
  return <span>{t('Welcome')}</span>;
};

beforeAll(async () => {
  await setupI18nEnvironment();
});


describe('I18n', () => {
  test('Can render a component with translation hook', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ComponentWithTranslation />
      </I18nextProvider>,
    );

    const translatedText = screen.getByText('Welcome to the DiVA tests');
    expect(translatedText).toHaveTextContent('Welcome to the DiVA tests');
  });
  test('Can change language to swedish', async () => {
    await i18n.changeLanguage('sv')
    render(
      <I18nextProvider i18n={i18n}>
        <ComponentWithTranslation />
      </I18nextProvider>,
    );

    const translatedText = screen.getByText('Välkommen till DiVA tester');
    expect(translatedText).toHaveTextContent('Välkommen till DiVA tester');
  });
});
