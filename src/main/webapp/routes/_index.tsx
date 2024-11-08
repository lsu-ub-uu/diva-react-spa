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

import { HomePage } from '@/pages';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { getAuth } from '@/sessions';
import { getValidationTypes } from '@/data/getValidationTypes';

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = await getAuth(request);
  const validationTypes = auth
    ? await getValidationTypes(auth.data.token)
    : null;
  return json({ validationTypes });
}

export default function IndexRoute() {
  return <HomePage />;
}