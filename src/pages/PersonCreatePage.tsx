import { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorIcon from '@mui/icons-material/Error';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../app/hooks';
import { loadPublicationTypesAsync } from '../features/publicationTypes';
import { Card, useBackdrop, ErrorSummary } from '../components';

interface PersonCreateModel {
  firstname: string;
  lastname: string;
  id: string;
}

const validationSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
});

export const PersonCreatePage = () => {
  const { t } = useTranslation();
  const methods = useForm<PersonCreateModel>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { setBackdrop } = useBackdrop();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setBackdrop(true);
    dispatch(loadPublicationTypesAsync(() => setBackdrop(false)));
  }, [dispatch, setBackdrop]);

  const handleOnSubmit = (data: PersonCreateModel) => {
    const idInLocalStorageObj = JSON.parse(
      localStorage.getItem('diva_session') as string,
    );
    data.id = idInLocalStorageObj.id;
    console.log('id', idInLocalStorageObj.id);
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>{t('addpub')} | DiVA</title>
      </Helmet>

      <Box
        component='form'
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Stack spacing={1}>
          <div>
            <ErrorSummary errors={errors} />
          </div>
          <Card
            variant='variant6'
            title='Add Person'
            tooltipBody='body'
            tooltipTitle='title'
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
                        placeholder='Firstname'
                        fullWidth
                        variant='outlined'
                        helperText={error !== undefined ? error.message : ' '}
                        InputProps={{
                          endAdornment: (
                            <ErrorIcon
                              sx={{
                                color: 'red',
                                visibility:
                                  error !== undefined ? 'visible' : 'hidden',
                              }}
                            />
                          ),
                        }}
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
                        placeholder='Lastname'
                        fullWidth
                        variant='outlined'
                        helperText={error !== undefined ? error.message : ' '}
                        InputProps={{
                          endAdornment: (
                            <ErrorIcon
                              sx={{
                                color: 'red',
                                visibility:
                                  error !== undefined ? 'visible' : 'hidden',
                              }}
                            />
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Card>

          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Grid
              item
              xs={6}
            >
              <Button
                disabled
                disableRipple
                variant='outlined'
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ textAlign: 'right' }}
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
        </Stack>
      </Box>
    </>
  );
};
