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
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Await,
  Link as RouterLink,
  useFetcher,
  useLoaderData,
} from 'react-router';
import { LegacyCard } from '@/components/LegacyCard/LegacyCard';
import { loader } from '@/routes/home';
import { BFFDataRecord, BFFSearchResult } from '@/types/record';
import { Suspense } from 'react';
import { AsyncErrorBoundary } from '@/components/DefaultErrorBoundary/AsyncErrorBoundary';

export const ListPublicationsCard = () => {
  const { t } = useTranslation();
  const { recordList } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const columns: GridColDef<BFFDataRecord>[] = [
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
      valueGetter: (_, row) => getCorrectTitle(row),
    },
    {
      field: 'createdAt',
      headerName: `${t('divaClient_listPublicationsHeaderCreatedText')}`, // Created,
      sortable: true,
      width: 160,
      valueGetter: (_, row) =>
        dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') || '-',
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
                disabled={
                  !params.row.userRights ||
                  !params.row.userRights.includes('update')
                }
                aria-label='edit'
                component={RouterLink}
                to={`/update/${params.row.recordType}/${params.id}`}
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('divaClient_readPublicationText')}>
            <span>
              <IconButton
                disabled={
                  !params.row.userRights ||
                  !params.row.userRights.includes('read')
                }
                aria-label='view'
                component={RouterLink}
                to={`/view/${params.row.recordType}/${params.id}`}
              >
                <FeedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('divaClient_deletePublicationText')}>
            <span>
              <fetcher.Form
                method='POST'
                action={`/delete/${params.row.recordType}/${params.row.id}`}
              >
                <IconButton type='submit'>
                  <DeleteForeverIcon />
                </IconButton>
              </fetcher.Form>
            </span>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <LegacyCard
      title={t('divaClient_listPublicationsText') as string}
      variant='variant5'
      tooltipTitle={t('divaClient_listPublicationsTooltipTitleText') as string}
      tooltipBody={t('divaClient_listPublicationsTooltipBodyText') as string}
    >
      <div style={{ height: 600, width: '100%' }}>
        <Suspense fallback={<Skeleton height={500} />}>
          <Await
            resolve={recordList}
            errorElement={<AsyncErrorBoundary />}
          >
            {(recordList) => (
              <DataGrid<BFFDataRecord>
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
                disableRowSelectionOnClick
                rows={(recordList as BFFSearchResult).data}
                columns={columns}
                /* components={{
                  NoRowsOverlay: () => <p>TODO: better no data message</p>,
                }} */
                hideFooter
              />
            )}
          </Await>
        </Suspense>
      </div>
    </LegacyCard>
  );
};

export const getCorrectTitle = (record: BFFDataRecord) => {
  return record.data.output.titleInfo.title.value;
};
