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

import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import type { loader } from '@/routes/searchRecords';
import { RecordSearch } from '@/components/RecordSearch/RecordSearch';

export const SearchPage = () => {
  const { searchForm, query, searchResults } = useLoaderData<typeof loader>();

  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('divaClient_searchPageHeaderText')}</h1>
      <RecordSearch
        searchForm={searchForm}
        searchType={'diva-outputSimpleSearch'}
        query={query}
        searchResults={searchResults}
      />
    </div>
  );
};
