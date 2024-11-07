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
import { Button, Grid, MenuItem } from '@mui/material';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card, Select } from '@/components';
import { loader } from '@/routes/_index';

export const CreatePublicationCard = () => {
  const { validationTypes } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const loading = navigation.state === 'loading';

  if (validationTypes === null || validationTypes.length === 0) {
    return null;
  }

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
      <Form action='/create'>
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
              defaultValue=''
              name='validationType'
              sx={{
                '& .MuiSelect-select .notranslate::after': {
                  content: `"${t('divaClient_selectPublicationTypeText')}"`,
                  opacity: 0.42,
                },
              }}
              size='small'
              loading={loading}
              fullWidth
              required
            >
              {validationTypes.map((validationType) => (
                <MenuItem
                  key={validationType.value}
                  value={validationType.value}
                  disableRipple
                >
                  {t(validationType.label)}
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
              disabled={loading}
              type='submit'
              disableRipple
              variant='contained'
              endIcon={<ArrowForwardIcon />}
            >
              {t('divaClient_continueText')}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};
