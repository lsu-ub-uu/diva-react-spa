/*
 * Copyright 2024 Uppsala University Library
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
import I18NextHttpBackend from 'i18next-http-backend';

import { RemixI18Next } from 'remix-i18next/server';
import { i18nConfig } from './i18nConfig';
import { i18nCookie } from '@/app/i18nCookie';

const i18next = new RemixI18Next({
  detection: {
    cookie: i18nCookie,
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  plugins: [I18NextHttpBackend],
});

export default i18next;
