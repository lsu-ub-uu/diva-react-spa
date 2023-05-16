import { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
} from '@mui/material';
import {
  PaginationRequest,
  PersonSearchRequest,
} from 'types/personSearchResult';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AsidePortal, Checkbox, Search } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchPersonByTerm } from '../features/search/searchSlice';
import { Person } from '../types/person';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'familyName',
    valueGetter: (params) => {
      return params.row.authorisedName?.familyName ?? '';
    },
  },
  {
    field: 'givenName',
    valueGetter: (params) => {
      return params.row.authorisedName?.givenName ?? '';
    },
  },
  {
    field: 'orcids',
    valueGetter: (params) => {
      return params.row.orcids?.join(',') ?? '';
    },
    width: 400,
  },
];

export const PersonSearchPage = () => {
  const dispatch = useAppDispatch();

  const { search, isLoading } = useAppSelector((state) => state.search);
  const methods = useForm();
  const { control } = methods;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm === '') {
      return;
    }
    const start = page * pageSize;
    const rows = pageSize;

    const searchRequest = {
      searchTerm,
      paginationRequest: {
        start,
        rows,
      },
    } as PersonSearchRequest;
    dispatch(searchPersonByTerm(searchRequest));
  }, [page, pageSize, searchTerm, dispatch]);

  return (
    <div>
      <AsidePortal>
        <Stack spacing={2}>
          <Controller
            control={control}
            name='facet-demo-1'
            defaultValue=''
            render={({ field }) => (
              <>
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                  }}
                  component='span'
                >
                  Publication type
                </FormLabel>
                <FormGroup {...field}>
                  <FormControlLabel
                    value='choice-1'
                    control={<Checkbox />}
                    label='Articles (4500)'
                  />
                  <FormControlLabel
                    value='choice-2'
                    control={<Checkbox />}
                    label='Bok (234)'
                  />
                  <FormControlLabel
                    value='choice-3'
                    control={<Checkbox />}
                    label='Tidskrifter (34)'
                  />
                  <FormControlLabel
                    value='choice-4'
                    control={<Checkbox />}
                    label='Patent (10)'
                  />
                </FormGroup>
              </>
            )}
          />
        </Stack>
      </AsidePortal>
      <FormControl
        fullWidth
        sx={{ mb: 2 }}
      >
        <FormLabel>Search</FormLabel>
        <Search
          onSubmit={(searchName) => setSearchTerm(searchName)}
          placeholderText='Search here'
          searchText=''
        />
      </FormControl>
      <DataGrid<Person>
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
        pageSize={pageSize}
        onPageSizeChange={(size) => setPageSize(size)}
        loading={isLoading}
        rows={search.data}
        columns={columns}
        components={{
          BaseCheckbox: Checkbox,
        }}
        paginationMode='server'
        rowCount={100}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </div>
  );
};
