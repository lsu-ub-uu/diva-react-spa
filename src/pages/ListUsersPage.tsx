import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { AsidePortal, Checkbox } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadDummyDataAsync } from '../features/dummy/actions';
import { dummySelector } from '../features/dummy/selectors';
import { User } from '../features/dummy/dummySlice';

const columns: GridColDef[] = [
  { field: 'firstname', headerName: 'Firstname', width: 250 },
  { field: 'lastname', headerName: 'Lastname', width: 250 },
  /*   { field: 'givenName', headerName: 'Given Name', width: 250 },
  { field: 'familyName', headerName: 'Family Name', width: 250 },
  { field: 'domain', headerName: 'Domain', width: 250 },
  { field: 'academicTitle', headerName: 'Academic Title', width: 250 },
  { field: 'ORCID_ID', headerName: 'ORCID ID', width: 250 }, */
];

export const ListUsersPage = () => {
  const dispatch = useAppDispatch();
  const dummyState = useAppSelector(dummySelector);

  useEffect(() => {
    dispatch(loadDummyDataAsync());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>About | DiVA</title>
      </Helmet>
      <Box sx={{ height: '100vh', width: '100%' }}>
        <AsidePortal>
          <p>
            Nunc faucibus mauris bibendum, vulputate erat sed, viverra enim. Nam
            vitae dui velit. Donec pretium finibus neque, tempus fermentum elit
            cursus a. Ut ac posuere est, non dapibus justo. In nisi odio,
            gravida at diam ac, porta feugiat quam. Pellentesque in dapibus ex.
            Sed tincidunt massa auctor, consectetur massa sed, bibendum dolor.
            Phasellus odio lacus, bibendum id nisl eu, faucibus pulvinar sapien.
            Aenean leo libero, hendrerit sit amet elementum vitae, lacinia vitae
            sem. Mauris at lacus erat. Donec felis ligula, finibus in varius at,
            scelerisque ut mauris. Phasellus a consectetur erat. Fusce tempor
            mauris non tempus faucibus. Aliquam erat volutpat.
          </p>
          <p>
            Nunc faucibus mauris bibendum, vulputate erat sed, viverra enim. Nam
            vitae dui velit. Donec pretium finibus neque, tempus fermentum elit
            cursus a. Ut ac posuere est, non dapibus justo. In nisi odio,
            gravida at diam ac, porta feugiat quam. Pellentesque in dapibus ex.
            Sed tincidunt massa auctor, consectetur massa sed, bibendum dolor.
            Phasellus odio lacus, bibendum id nisl eu, faucibus pulvinar sapien.
            Aenean leo libero, hendrerit sit amet elementum vitae, lacinia vitae
            sem. Mauris at lacus erat. Donec felis ligula, finibus in varius at,
            scelerisque ut mauris. Phasellus a consectetur erat. Fusce tempor
            mauris non tempus faucibus. Aliquam erat volutpat.
          </p>
          <p>
            Nunc faucibus mauris bibendum, vulputate erat sed, viverra enim. Nam
            vitae dui velit. Donec pretium finibus neque, tempus fermentum elit
            cursus a. Ut ac posuere est, non dapibus justo. In nisi odio,
            gravida at diam ac, porta feugiat quam. Pellentesque in dapibus ex.
            Sed tincidunt massa auctor, consectetur massa sed, bibendum dolor.
            Phasellus odio lacus, bibendum id nisl eu, faucibus pulvinar sapien.
            Aenean leo libero, hendrerit sit amet elementum vitae, lacinia vitae
            sem. Mauris at lacus erat. Donec felis ligula, finibus in varius at,
            scelerisque ut mauris. Phasellus a consectetur erat. Fusce tempor
            mauris non tempus faucibus. Aliquam erat volutpat.
          </p>
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
          components={{
            BaseCheckbox: Checkbox,
          }}
        />
      </Box>
    </>
  );
};
