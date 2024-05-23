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

import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Alert from '@mui/material/Alert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import React from 'react';
import { AsidePortal, TabsMenu } from '../components';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('start')} | DiVA</title>
      </Helmet>
      <div>
        <AsidePortal>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
            mattis metus. Quisque condimentum cursus egestas. Suspendisse tellus
            dolor, euismod at dui a, ultrices tempor erat.
          </p>
        </AsidePortal>
        <Stack spacing={2}>
          <Alert
            icon={<PriorityHighIcon fontSize='inherit' />}
            severity='warning'
          >
            {t('divaClient_metadataWarningText')}
          </Alert>
          <TabsMenu />
        </Stack>
      </div>
    </>
  );
};
