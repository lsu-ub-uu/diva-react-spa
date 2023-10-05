import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '../components';
import {
  ControlledSelectField,
  ControlledTextField,
} from '../components/Controlled';

const validationSchema = yup.object().shape({
  someTextVariable: yup.object().shape({
    value: yup.string().required(),
    _someAttrib: yup.string().required(),
    _someAttrib2: yup.string().required(),
  }),
});

export const ReactHookFormTestPage = () => {
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      someTextVariable: {
        value: 'init value test',
        _someAttrib: '',
        _someAttrib2: 'testVal2',
      },
    },
  });

  const { formState, setFocus, control, handleSubmit } = methods;

  useEffect(() => {
    setFocus('someTextVariable');
  }, [setFocus]);

  // @ts-ignore
  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 1)),
      )}
    >
      <Card
        title='Testing'
        variant='variant6'
        tooltipTitle='Title'
        tooltipBody='Here goes some text about how choose type'
      >
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid
            item
            xs={12}
            sm={12}
          >
            <ControlledTextField
              placeholder='some placeholder'
              control={control}
              name={`someTextVariable.value` as const}
              label='Somelabel'
            />
            <Grid
              spacing={1}
              container
              direction='row'
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <Grid
                item
                xs={6}
              >
                <ControlledSelectField
                  placeholder='some placeholder'
                  control={control}
                  name={`someTextVariable._someAttrib` as const}
                  label='Somelabel'
                  isLoading={false}
                  loadingError={false}
                  options={[{ value: 'testVal', label: 'Option TestVal' }]}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <ControlledSelectField
                  placeholder='some placeholder'
                  control={control}
                  name={`someTextVariable._someAttrib2` as const}
                  label='Somelabel2 that are really realllllllllly loooong'
                  isLoading={false}
                  loadingError={false}
                  options={[{ value: 'testVal2', label: 'Option TestVal2' }]}
                  readOnly
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              disabled={!formState.isValid}
              fullWidth
              type='submit'
              disableRipple
              variant='contained'
            >
              Submit form
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
