import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AsidePortal } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadDummyDataAsync } from '../features/dummy/actions';
import { dummySelector } from '../features/dummy/selectors';
import { User } from '../features/dummy/dummySlice';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 250 },
  { field: 'firstname', headerName: 'Firstname', width: 250 },
  { field: 'lastname', headerName: 'Lastname', width: 250 },
];

export const ListUsersPage = () => {
  const dispatch = useAppDispatch();
  const dummyState = useAppSelector(dummySelector);

  useEffect(() => {
    dispatch(loadDummyDataAsync());
  }, [dispatch]);

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <p>list # users {dummyState.users.length}</p>
      </AsidePortal>
      <DataGrid<User>
        sx={{
          border: 0,
          width: '100%',
          boxShadow: 0,
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '.MuiDataGrid-columnHeaders': {
            background: '#eee',
            borderBottom: '1px solid #222',
          },
          '&.MuiDataGrid-root .MuiIconButton-root': {
            color: '#000',
          },
          '.MuiDataGrid-columnHeader': {
            background: '#eee',
            color: '#000',
          },
        }}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        pageSize={25}
        loading={dummyState.isLoading}
        rows={dummyState.users}
        columns={columns}
      />
    </Box>
  );
};
