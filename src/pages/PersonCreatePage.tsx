import { useEffect, useState } from 'react';
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
import { useAppDispatch } from '../app/hooks';
import { loadPublicationTypesAsync } from '../features/publicationTypes';
import { Card, useBackdrop, ErrorSummary } from '../components';
// eslint-disable-next-line import/no-cycle
import { postOnePerson } from '../features/createPerson/createPersonSlice';

export interface PersonCreateModel {
  authorisedName: {
    givenName: string;
    familyName: string;
  };
  recordInfo?: {
    validationType: string;
  };
}

const validationSchema = yup.object().shape({
  authorisedName: yup.object().shape({
    givenName: yup
      .string()
      .trim()
      .matches(/[A-Za-z]/),
    familyName: yup
      .string()
      .trim()
      .matches(/[A-Za-z]/),
  }),
});

export const PersonCreatePage = () => {
  const [formData, setFormData] = useState<PersonCreateModel>({
    authorisedName: {
      givenName: '',
      familyName: '',
    },
  });

  const methods = useForm<PersonCreateModel>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      authorisedName: {
        givenName: '',
        familyName: '',
      },
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
    // console.log('d', formData);
    setBackdrop(true);
    if (
      formData.authorisedName.givenName !== '' &&
      formData.authorisedName.familyName !== ''
    ) {
      dispatch(postOnePerson(formData));
    }
    dispatch(loadPublicationTypesAsync(() => setBackdrop(false)));
  }, [dispatch, setBackdrop, setFormData, formData]);

  const handleOnSubmit = async (data: PersonCreateModel) => {
    setFormData(data);
  };

  return (
    <>
      <Helmet>
        <title>Add person | DiVA</title>
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
                  name='authorisedName.givenName'
                  defaultValue=''
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <FormLabel
                        required
                        error={error !== undefined}
                      >
                        Givenname
                      </FormLabel>
                      <TextField
                        error={error !== undefined}
                        {...field}
                        autoComplete='off'
                        placeholder='GivenName'
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
                  name='authorisedName.familyName'
                  defaultValue=''
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <FormLabel
                        required
                        error={error !== undefined}
                      >
                        Familyname
                      </FormLabel>
                      <TextField
                        error={error !== undefined}
                        {...field}
                        autoComplete='off'
                        placeholder='Familyname'
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
