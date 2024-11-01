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
    fallbackLng: 'sv',
    debug: false, // TODO set to true if dev env
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${VITE_BFF_API_URL}/translations/{{lng}}`,
    },
  });
