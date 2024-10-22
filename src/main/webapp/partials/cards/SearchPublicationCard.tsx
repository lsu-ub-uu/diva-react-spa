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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useTranslation } from 'react-i18next';
import { AlertTitle, Grid, Skeleton } from '@mui/material';
import { Card, FormGenerator } from '@/components';
import { FormSchema } from '@/components/FormGenerator/types';
import { useCoraSearchForm } from '@/features/search/useCoraSearch';
import Alert from '@mui/material/Alert';

export const SearchPublicationCard = () => {
  const { t } = useTranslation();
  const { searchForm, error } = useCoraSearchForm('divaOutputSwepubSearch');

  if (error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Hoppsan!</AlertTitle>Fel vid hämtning av sökformuläret.
        Försök igen lite senare.
      </Alert>
    );
  }

  if (searchForm === null) {
    return (
      <Skeleton
        height={300}
        width='100%'
      />
    );
  }

  return (
    <Card
      title={t('Search publication / Change / Delete') as string}
      variant='variant2'
      tooltipTitle={
        t('divaClient_createPublicationTypeTooltipTitleText') as string
      }
      tooltipBody={
        t('divaClient_createPublicationTypeTooltipBodyText') as string
      }
    >
      <Grid
        container
        spacing={2}
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <FormGenerator
            onSubmit={() => {}}
            onInvalid={() => {}}
            formSchema={searchForm as FormSchema}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        ></Grid>
      </Grid>
    </Card>
  );
};
