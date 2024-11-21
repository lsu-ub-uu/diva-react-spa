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
import { searchRecords } from '@/data/searchRecords';
import { CoraSearchResult } from '@/features/record/types';
import { SearchPage } from '@/pages';
import { getAuthentication, getSessionFromCookie } from '@/sessions';
import { parseFormDataFromSearchParams } from '@/utils/parseFormDataFromSearchParams';
import { LoaderFunctionArgs } from '@remix-run/node';
import { invariant } from '@remix-run/router/history';

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  const { searchType } = params;
  invariant(searchType, 'Missing searchType param');
  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);

  const searchForm = getSearchForm(
    context.dependencies,
    'diva-outputSimpleSearch',
  );

  const query = parseFormDataFromSearchParams(request);

  let searchResults: CoraSearchResult | null = null;
  try {
    searchResults = await searchRecords(
      context.dependencies,
      searchType,
      query,
      auth,
    );
  } catch (e) {
    console.error(e);
  }

  return { searchForm, searchResults };
};

export default function SearchRoute() {
  return <SearchPage />;
}
