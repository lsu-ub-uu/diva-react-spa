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

import { SearchPage } from '@/pages';
import { LoaderFunctionArgs } from '@remix-run/node';
import { searchRecords } from '@/data/searchRecords';
import { invariant } from '@remix-run/router/history';
import { CoraSearchResult } from '@/features/record/types';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchType } = params;
  invariant(searchType, 'Missing searchType param');
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  let searchResults: CoraSearchResult | null = null;
  try {
    searchResults = await searchRecords(searchType, query);
  } catch (e) {
    console.error(e);
  }

  return { searchResults };
};

export default function SearchRoute() {
  return <SearchPage />;
}
