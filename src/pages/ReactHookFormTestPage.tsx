import React, { useEffect } from 'react';
import {
  Box,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Autocomplete,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
  researchSubjects: string[];
}

const validationSchema = yup.object().shape({
  publicationType: yup.string().required('Publication type is required'),
  researchSubjects: yup.array().of(yup.string()).min(1).max(5),
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
    defaultValues: {
      researchSubjects: [],
      authors: [{ firstname: '', lastname: '' }],
    },
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
    <Box
      component='form'
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Stack spacing={1}>
        <ErrorMessage errors={errors} />
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
              sm={6}
            >
              <FormControl
                fullWidth
                sx={{ mb: 2 }}
              >
                <FormLabel>&nbsp;</FormLabel>
                <Button
                  disableRipple
                  variant='outlined'
                >
                  Change Publication Type
                </Button>
              </FormControl>
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
                  <ButtonGroup
                    variant='outlined'
                    aria-label='outlined secondary button group'
                  >
                    <IconButton
                      aria-label='up'
                      disabled={index === 0}
                      onClick={() => handleMove(index, index - 1)}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      aria-label='down'
                      disabled={index === fields.length - 1}
                      onClick={() => handleMove(index, index + 1)}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Card>
          );
        })}
        <Button
          disableRipple
          onClick={() =>
            append({
              firstname: '',
              lastname: '',
            })
          }
          endIcon={<AddCircleOutlineIcon />}
        >
          Add Author
        </Button>
        <Card
          variant='variant6'
          title='Research Subject'
          tooltipTitle='Research Subject'
          tooltipBody='some text'
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
            >
              <Controller
                control={control}
                name='researchSubjects'
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Research subjects
                    </FormLabel>
                    <Autocomplete
                      onChange={(event, item) => {
                        console.log(item);
                        onChange(item);
                      }}
                      value={value}
                      popupIcon={<ExpandMoreIcon />}
                      multiple
                      isOptionEqualToValue={(option, val) => option === val}
                      id='multi-research-subjects'
                      options={['Datalogi']}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          inputRef={ref}
                          variant='outlined'
                          {...params}
                          error={error !== undefined}
                          placeholder='Search for subjects'
                        />
                      )}
                    />
                    <FormHelperText error={error !== undefined}>
                      {error !== undefined ? error.message : ' '}
                    </FormHelperText>
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
  );
};
