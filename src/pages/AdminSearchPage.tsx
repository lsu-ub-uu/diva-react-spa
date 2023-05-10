import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AsidePortal, Card, Checkbox, Search } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getPersonByName } from '../features/search/searchSlice';

export const AdminSearchPage = () => {
  const dispatch = useAppDispatch();

  const { search, isLoading, isError, message } = useAppSelector(
    (state) => state.recordType,
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
  useEffect(() => {
    console.log('search', search);
  }, [name, setName]);

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
      <Card
        title={`Sökresultat – ${8} träffar`}
        variant='variant6'
        tooltipTitle='Search'
        tooltipBody='Search help body text tooltip'
      >
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
      </Card>
    </div>
  );
};
