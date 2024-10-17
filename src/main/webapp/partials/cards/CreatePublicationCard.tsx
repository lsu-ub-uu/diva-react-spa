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

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, Select } from '@/components';
import {
  loadPublicationTypesAsync,
  publicationTypeSelector,
} from '@/features/publicationTypes';

export const CreatePublicationCard = () => {
  const { t } = useTranslation();
  const [publicationType, setPublicationType] = useState('');
  const dispatch = useAppDispatch();
  const publicationTypeState = useAppSelector(publicationTypeSelector);

  useEffect(() => {
    dispatch(loadPublicationTypesAsync());
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    event.preventDefault();
    setPublicationType(event.target.value as string);
  };

  return (
    <Card
      title={t('divaClient_createPublicationTypeText') as string}
      variant='variant1'
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
          <Select
            value={publicationType || ''}
            onChange={handleChange}
            sx={{
              '& .MuiSelect-select .notranslate::after': {
                content: `"${t('divaClient_selectPublicationTypeText')}"`,
                opacity: 0.42,
              },
            }}
            name='publication-type-select'
            size='small'
            loading={publicationTypeState.isLoading}
            fullWidth
          >
            {publicationTypeState.publicationTypes.map(
              (publicationTypeOption) => (
                <MenuItem
                  key={publicationTypeOption.value}
                  value={publicationTypeOption.value}
                  disableRipple
                >
                  {t(publicationTypeOption.label)}
                </MenuItem>
              ),
            )}
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Button
            disabled={!publicationType}
            disableRipple
            variant='contained'
            component={RouterLink}
            to={`/create/record/${publicationType}`}
            endIcon={<ArrowForwardIcon />}
          >
            {t('divaClient_continueText')}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
