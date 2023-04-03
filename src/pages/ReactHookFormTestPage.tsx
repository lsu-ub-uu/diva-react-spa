import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorIcon from '@mui/icons-material/Error';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  publicationTypeSelector,
  loadPublicationTypesAsync,
} from '../features/publicationTypes';
import { Card, Select, ErrorMessage, useBackdrop } from '../components';

interface TestModel {
  publicationType: string;
  authors: {
    firstname: string;
    lastname: string;
  }[];
}

const validationSchema = yup.object().shape({
  publicationType: yup.string().required('Publication type is required'),
  // eslint-disable-next-line react/forbid-prop-types
  authors: yup
    .array()
    .of(
      yup.object().shape({
        firstname: yup.string().trim().required('Firstname is required'),
        lastname: yup.string().trim().required('Lastname is required'),
      }),
    )
    .min(1)
    .max(3),
});

export const ReactHookFormTestPage = () => {
  const methods = useForm<TestModel>({
    resolver: yupResolver(validationSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { fields, append, remove, move } = useFieldArray({
    name: 'authors',
    control,
  });
  const { setBackdrop } = useBackdrop();
  const dispatch = useAppDispatch();
  const publicationTypeState = useAppSelector(publicationTypeSelector);

  useEffect(() => {
    setBackdrop(true);
    dispatch(loadPublicationTypesAsync(() => setBackdrop(false)));
  }, [dispatch, setBackdrop]);

  const handleMove = (prev: number, next: number) => {
    move(prev, next);
  };

  const handleOnSubmit = (data: TestModel) => {
    console.log(data);
  };

  return (
    <Stack spacing={1}>
      <ErrorMessage errors={errors} />
      <Box
        component='form'
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Card
          title='Publikationstyp'
          variant='variant6'
          tooltipTitle='Title'
          tooltipBody='Here goes some text about how choose type'
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
                defaultValue=''
                name='publicationType'
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Publication type
                    </FormLabel>
                    <Select
                      fullWidth
                      loadingError={publicationTypeState.isError}
                      error={error !== undefined}
                      {...field}
                      loading={publicationTypeState.isLoading}
                    >
                      {publicationTypeState.publicationTypes &&
                        publicationTypeState.publicationTypes.map((item) => {
                          return (
                            <MenuItem
                              key={`publication-type-${item.value}`}
                              disableRipple
                              value={item.value}
                            >
                              {item.label}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    <FormHelperText error={error !== undefined}>
                      {error !== undefined ? error.message : ' '}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='submit'
                disableRipple
                variant='outlined'
                endIcon={<ArrowForwardIcon />}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Card>
        {fields.map((item, index) => {
          return (
            <Card
              variant='variant6'
              key={item.id}
              title={`Author ${index + 1}`}
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
                    name={`authors.${index}.firstname`}
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
                    name={`authors.${index}.lastname`}
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
                <Grid
                  item
                  xs={12}
                >
                  <button
                    disabled={index === 0}
                    type='button'
                    onClick={() => handleMove(index, index - 1)}
                  >
                    UP
                  </button>
                  <button
                    disabled={index === fields.length - 1}
                    type='button'
                    onClick={() => handleMove(index, index + 1)}
                  >
                    DN
                  </button>
                  <button
                    type='button'
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </Grid>
              </Grid>
            </Card>
          );
        })}
        <Button
          disableRipple
          variant='outlined'
          onClick={() =>
            append({
              firstname: '',
              lastname: '',
            })
          }
        >
          Add Author
        </Button>
      </Box>
    </Stack>
  );
};
