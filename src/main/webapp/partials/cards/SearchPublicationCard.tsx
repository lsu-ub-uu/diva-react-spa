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
import { Alert, AlertTitle } from '@mui/material';
import { Card } from '@/components';
import { SearchForm } from '@/components/Form/SearchForm';
import { Search } from '@/data/getSearchForm';

const searchType = 'diva-outputSimpleSearch';
interface SearchPublicationCardProps {
  searchForm: Search;
}

export const SearchPublicationCard = ({
  searchForm,
}: SearchPublicationCardProps) => {
  const { t } = useTranslation();
  const { error, form } = searchForm;

  if (error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Hoppsan!</AlertTitle>Fel vid hämtning av sökformuläret.
        Försök igen lite senare.
      </Alert>
    );
  }

  return (
    <Card
      title={t('divaClient_searchPublicationText') as string}
      variant='variant2'
      tooltipTitle={
        t('divaClient_searchPublicationTypeTooltipTitleText') as string
      }
      tooltipBody={
        t('divaClient_searchPublicationTypeTooltipBodyText') as string
      }
    >
      <SearchForm
        formSchema={form!}
        searchType={searchType}
      />
    </Card>
  );
};
