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

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../components';
import {
  loadPublicationsAsync,
  publicationsSelector,
} from '../../features/publications';

export const ListPublicationsCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const publicationsState = useAppSelector(publicationsSelector);

  useEffect(() => {
    dispatch(loadPublicationsAsync());
  }, [dispatch]);

  return (
    <Card
      title={t('divaClient_listPublicationsText') as string}
      variant='variant5'
      tooltipTitle={t('divaClient_listPublicationsTooltipTitleText') as string}
      tooltipBody={
        t('divaClient_listPublicationsTooltipTitleBodyText') as string
      }
    >
      <pre>{JSON.stringify(publicationsState.publications, null, 1)}</pre>
    </Card>
  );
};
