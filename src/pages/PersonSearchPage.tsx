import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AsidePortal, Checkbox, Search } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getPersonByName,
  SearchPersonInterface,
} from '../features/search/searchSlice';

const columns: GridColDef[] = [
  { field: 'givenName', headerName: 'Given Name', width: 150 },
  { field: 'familyName', headerName: 'Family Name', width: 150 },
  { field: 'domain', headerName: 'Domain', width: 100 },
  { field: 'academicTitle', headerName: 'Academic Title', width: 150 },
  { field: 'ORCID_ID', headerName: 'ORCID ID', width: 200 },
];

export const PersonSearchPage = () => {
  const dispatch = useAppDispatch();

  const { search, isLoading, isError, message } = useAppSelector(
    (state) => state.search,
  );
  const methods = useForm();
  const { control } = methods;

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (isError) {
      console.log('error message', message);
    }
    if (name !== null) {
      dispatch(getPersonByName(name));
    }
  }, [isError, message, dispatch, name]);

  const handleInput = (e: React.MouseEvent<HTMLElement> | string): void => {
    if (e !== '' || e !== undefined || e !== null) {
      setName(e.toString());
    }
  };

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
          onSubmit={(e) => handleInput(e)}
          placeholderText='Search here'
          searchText=''
        />
      </FormControl>
      <DataGrid<SearchPersonInterface>
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
        loading={isLoading}
        rows={search}
        columns={columns}
        components={{
          BaseCheckbox: Checkbox,
        }}
      />
    </div>
  );
};
