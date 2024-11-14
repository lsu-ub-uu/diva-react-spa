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

import { getSearchForm } from '@/data/getSearchForm';
import { getValidationTypes } from '@/data/getValidationTypes';
import { HomePage } from '@/pages';
import { getAuthentication, getSessionFromCookie } from '@/sessions';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { searchRecords } from '@/data/searchRecords';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);

  const validationTypes = auth
    ? getValidationTypes(auth.data.token)
    : Promise.resolve(null);

  const searchForm = getSearchForm('diva-outputSimpleSearch');

  const query = {
    search: {
      include: {
        includePart: {
          genericSearchTerm: [
            {
              value: '**',
            },
          ],
        },
      },
    },
  };
  const recordList = searchRecords('diva-outputSearch', query, auth);

  return defer({ validationTypes, searchForm, recordList });
}

export default function IndexRoute() {
  return <HomePage />;
}
