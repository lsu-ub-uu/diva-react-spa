import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { publicationTypeSelector } from '../features/publicationTypes/selectors';
import { loadPublicationTypesAsync } from '../features/publicationTypes/actions';
import { Card, Select, ErrorMessage, Radio } from '../components';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  gender: yup.string().required('Gender is required'),
});

export const ReactHookFormTestPage = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useAppDispatch();
  const publicationTypeState = useAppSelector(publicationTypeSelector);

  useEffect(() => {
    dispatch(loadPublicationTypesAsync());
  }, [dispatch]);

  const handleOnSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <Stack spacing={2}>
      <Card
        title='Publikationstyp'
        variant='variant1'
        tooltipTitle='Choose publication type help'
        tooltipBody='Here goes some text about how choose type'
      >
        <ErrorMessage errors={errors} />
        <Box
          component='form'
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Grid
            container
            spacing={2}
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Controller
                control={control}
                name='firstname'
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Firstname
                    </FormLabel>
                    <TextField
                      error={error !== undefined}
                      {...field}
                      autoComplete='off'
                      placeholder='firstname'
                      fullWidth
                      variant='outlined'
                      helperText={error !== undefined ? error.message : ' '}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Controller
                control={control}
                name='lastname'
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Lastname
                    </FormLabel>
                    <TextField
                      error={error !== undefined}
                      {...field}
                      autoComplete='off'
                      placeholder='Lastname Placeholder'
                      fullWidth
                      variant='outlined'
                      helperText={error !== undefined ? error.message : ' '}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Controller
                control={control}
                name='gender'
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                      />
                      <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Radio />}
                        label='Other'
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Select
                loading={publicationTypeState.isLoading}
                value='article'
                label='Publikationstyp'
                items={publicationTypeState.publicationTypes}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='submit'
                disableRipple
                variant='contained'
                endIcon={<ArrowForwardIcon />}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Stack>
  );
};
