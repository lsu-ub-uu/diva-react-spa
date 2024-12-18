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

import { Alert, Box, Button, Skeleton, Stack, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { SidebarLayout } from '@/components/Layout/SidebarLayout';
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { AsyncErrorBoundary } from '@/components/DefaultErrorBoundary/AsyncErrorBoundary';
import { SearchForm } from '@/components/Form/SearchForm';
import type { loader } from '@/routes/_index';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { AutocompleteForm } from '@/components/Form/AutocompleteForm';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';

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

const searchType = 'diva-outputSimpleSearch';

export const HomePage = () => {
  const { t } = useTranslation();
  const { searchForm, validationTypes, searchResults } =
    useLoaderData<typeof loader>();

  return (
    <SidebarLayout sidebarContent={<p>Meddelanden kommer synas här</p>}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Suspense
            fallback={
              <Skeleton>
                <Button>Skapa</Button>
              </Skeleton>
            }
          >
            <Await
              resolve={validationTypes}
              errorElement={<AsyncErrorBoundary />}
            >
              {(validationTypes) => (
                <CreateRecordMenu validationTypes={validationTypes} />
              )}
            </Await>
          </Suspense>
        </Box>
        <Alert
          icon={<PriorityHighIcon fontSize='inherit' />}
          severity='warning'
        >
          {t('divaClient_metadataWarningText')}
        </Alert>
        <Suspense fallback={<Skeleton height={296} />}>
          <Await
            resolve={searchForm}
            errorElement={<AsyncErrorBoundary />}
          >
            {(searchForm) => (
              <div>
                <SearchForm
                  formSchema={searchForm}
                  searchType={searchType}
                />
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
                            formSchema={record.presentation!}
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
            )}
          </Await>
        </Suspense>
      </Stack>
    </SidebarLayout>
  );
};
