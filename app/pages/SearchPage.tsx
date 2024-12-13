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

import { useLoaderData } from 'react-router';
import type { FormSchema } from '@/components/FormGenerator/types';
import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { loader } from '@/routes/searchRecord';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import { SearchPublicationCard } from '@/partials/cards/SearchPublicationCard';

const SearchResultList = styled('ol')`
  list-style: none;
  padding: 0;
`;

const SearchResultListItem = styled('li')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  borderRadius: 8,
  border: '2px solid #eedcdb',
  backgroundColor: '#fcf8f8',
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));

export const SearchPage = () => {
  const { searchResults } = useLoaderData<typeof loader>();

  const { t } = useTranslation();
  console.log({ searchResults });
  return (
    <div>
      <h1>{t('divaClient_searchPageHeaderText')}</h1>
      <SearchPublicationCard />

      {searchResults && (
        <>
          <h2>
            {t('divaClient_searchPageResultText', {
              numberOfResults: searchResults?.totalNo,
            })}
          </h2>
          <SearchResultList>
            {searchResults.data.map((record) => (
              <SearchResultListItem key={record.id}>
                <AutocompleteForm
                  record={record}
                  formSchema={record.presentation as unknown as FormSchema}
                />
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    display: 'flex',
                    top: theme.spacing(1),
                    right: theme.spacing(1),
                  })}
                >
                  <RecordActionButtons record={record} />
                </Box>
              </SearchResultListItem>
            ))}
          </SearchResultList>
        </>
      )}
    </div>
  );
};
