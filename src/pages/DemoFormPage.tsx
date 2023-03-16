import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AsidePortal, Card, Checkbox, Search } from '../components';

export const DemoFormPage = () => {
  const methods = useForm();
  const { control } = methods;
  return (
    <div>
      <AsidePortal>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 'bold' }}>Publication types</Typography>
          <Controller
            control={control}
            name='facet-demo-1'
            defaultValue=''
            render={({ field }) => (
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
            )}
          />
        </Stack>
      </AsidePortal>
      <Card
        title='Search'
        variant='variant1'
        tooltipTitle='Search'
        tooltipBody='Search help body text tooltip'
      >
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel>Search</FormLabel>
          <Search
            onSubmit={(search) => console.log(search)}
            placeholderText='Search here'
            searchText=''
          />
        </FormControl>
      </Card>
    </div>
  );
};
