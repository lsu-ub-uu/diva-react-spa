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
import dayjs from 'dayjs';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'validationType', headerName: 'Type', width: 120 },
    { field: 'title', headerName: 'Title', width: 220 },
    {
      field: 'createdAt',
      headerName: 'Created',
      sortable: true,
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        dayjs(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss') || '-',
    },
    {
      field: 'action',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          aria-label='edit'
          component={RouterLink}
          to={`/update/record/${params.id}`}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Card
      title={t('divaClient_listPublicationsText') as string}
      variant='variant5'
      tooltipTitle={t('divaClient_listPublicationsTooltipTitleText') as string}
      tooltipBody={
        t('divaClient_listPublicationsTooltipTitleBodyText') as string
      }
    >
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
          autoHeight
          disableColumnMenu
          disableColumnSelector
          disableSelectionOnClick
          loading={publicationsState.isLoading}
          rows={publicationsState.publications}
          columns={columns}
          hideFooter
        />
      </div>
    </Card>
  );
};
