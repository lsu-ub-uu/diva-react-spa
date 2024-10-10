/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { render, screen } from '@testing-library/react';
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from 'react-i18next';
import i18n from 'i18next';

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
  it('Can render a component with translation hook', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ComponentWithTranslation />
      </I18nextProvider>,
    );

    const translatedText = screen.getByText('Welcome to the DiVA tests');
    expect(translatedText).toHaveTextContent('Welcome to the DiVA tests');
  });
  it('Can change language to swedish', async () => {
    await i18n.changeLanguage('sv');
    render(
      <I18nextProvider i18n={i18n}>
        <ComponentWithTranslation />
      </I18nextProvider>,
    );

    const translatedText = screen.getByText('Välkommen till DiVA tester');
    expect(translatedText).toHaveTextContent('Välkommen till DiVA tester');
  });
});
