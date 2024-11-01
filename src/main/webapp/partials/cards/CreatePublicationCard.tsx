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
import { Link as RouterLink } from "@remix-run/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, Select } from '@/components';
import {
  loadValidationTypesAsync,
  validationTypeSelector,
} from '@/features/validationTypes';

export const CreatePublicationCard = () => {
  const { t } = useTranslation();
  const [validationType, setValidationType] = useState('');
  const dispatch = useAppDispatch();
  const validationTypeState = useAppSelector(validationTypeSelector);

  useEffect(() => {
    dispatch(loadValidationTypesAsync());
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    event.preventDefault();
    setValidationType(event.target.value as string);
  };

  return (
    <Card
      title={t('divaClient_createPublicationTypeText')}
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
            value={validationType || ''}
            onChange={handleChange}
            sx={{
              '& .MuiSelect-select .notranslate::after': {
                content: `"${t('divaClient_selectPublicationTypeText')}"`,
                opacity: 0.42,
              },
            }}
            name='publication-type-select'
            size='small'
            loading={validationTypeState.isLoading}
            fullWidth
          >
            {validationTypeState.validationTypes.map((validationTypeOption) => (
              <MenuItem
                key={validationTypeOption.value}
                value={validationTypeOption.value}
                disableRipple
              >
                {t(validationTypeOption.label)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Button
            disabled={!validationType}
            disableRipple
            variant='contained'
            component={RouterLink}
            to={`/create/${validationType}`}
            endIcon={<ArrowForwardIcon />}
          >
            {t('divaClient_continueText')}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
