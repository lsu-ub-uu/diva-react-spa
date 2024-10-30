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

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card } from '@/components';
import {
  loadPublicationsAsync,
  publicationsSelector,
} from '@/features/publications';
import { DivaOutput } from '@/features/publications/actions';

export const ListPublicationsCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const publicationsState = useAppSelector(publicationsSelector);
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  useEffect(() => {
    dispatch(loadPublicationsAsync());
  }, [dispatch]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: `${t('divaClient_listPublicationsHeaderIdText')}`, // ID
      width: 230,
    },
    {
      field: 'validationType',
      headerName: `${t('divaClient_listPublicationsHeaderTypeText')}`, // Type
      width: 120,
    },
    {
      field: 'title',
      headerName: `${t('divaClient_listPublicationsHeaderTitleText')}`, // Title
      width: 200,
    },
    {
      field: 'createdAt',
      headerName: `${t('divaClient_listPublicationsHeaderCreatedText')}`, // Created,
      sortable: true,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        dayjs(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss') || '-',
    },
    {
      field: 'action',
      headerName: `${t('divaClient_listPublicationsHeaderActionsText')}`, // Actions
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction='row'>
          <Tooltip title={t('divaClient_updatePublicationText')}>
            <span>
              <IconButton
                disabled={!params.row.userRights.includes('update')}
                aria-label='edit'
                component={RouterLink}
                to={`/update/record/${params.row.recordType}/${params.id}`}
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('divaClient_readPublicationText')}>
            <span>
              <IconButton
                disabled={!params.row.userRights.includes('read')}
                aria-label='view'
                component={RouterLink}
                to={`/view/record/${params.row.recordType}/${params.id}`}
              >
                <FeedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('divaClient_deletePublicationText')}>
            <span>
              <IconButton
                disabled={!params.row.userRights.includes('delete')}
                aria-label='delete'
                onClick={async () => {
                  try {
                    await axios.delete(
                      `/record/${params.row.recordType}/${params.row.id}`,
                    );
                    dispatch(loadPublicationsAsync());
                    notification(
                      `Record ${params.row.id} was successfully deleted `,
                      'success',
                    );
                  } catch (err: any) {
                    console.log('err', err);
                    notification(`${err.message}`, 'error');
                  }
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Card
      title={t('divaClient_listPublicationsText') as string}
      variant='variant5'
      tooltipTitle={t('divaClient_listPublicationsTooltipTitleText') as string}
      tooltipBody={t('divaClient_listPublicationsTooltipBodyText') as string}
    >
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid<DivaOutput>
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
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
          /* components={{
            NoRowsOverlay: () => <p>TODO: better no data message</p>,
          }} */
          hideFooter
        />
      </div>
    </Card>
  );
};
