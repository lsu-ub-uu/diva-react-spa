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

import { LoaderFunctionArgs } from '@remix-run/node';
import { createTextDefinition } from '@/data/textDefinition/textDefinition';
import { invariant } from '@remix-run/router/history';

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { lang } = params;
  invariant(lang, 'Missing param lang');

  return createTextDefinition(context.dependencies, lang);
};
