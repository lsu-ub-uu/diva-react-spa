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

import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { CoraSearchResult } from '@/features/record/types';
import { FormSchema } from '@/components/FormGenerator/types';
import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
import { Box, styled } from '@mui/material';
import { SearchPublicationCard } from '@/partials';
import { RecordActionButtons } from '@/components';

const SearchResultList = styled('ol')`
  list-style: none;
  padding: 0;
`;

const SearchResultListItem = styled('li')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  borderRadius: 8,
  backgroundColor: theme.palette.grey['200'],
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
}));

export const SearchPage = () => {
  const { searchType } = useParams();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get('query');
  const [searchResults, setSearchResults] = useState<CoraSearchResult | null>(
    null,
  );

  const query = useMemo(
    () => (queryString !== null ? JSON.parse(queryString) : null),
    [queryString],
  );

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        `/search/advanced/${'diva-outputSimpleSearch'}?query=${window.encodeURIComponent(JSON.stringify(query))}`,
      );
      setSearchResults(response.data);
    };
    search();
  }, [searchType, query]);

  return (
    <div>
      <h1>Sök</h1>
      <SearchPublicationCard />

      {searchResults && (
        <>
          <h2>Sökresultat - {searchResults?.totalNo} träffar</h2>
          <SearchResultList>
            {searchResults.data.map((record) => (
              <SearchResultListItem key={record.id}>
                <AutocompleteForm
                  record={record}
                  formSchema={record.presentation as FormSchema}
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
