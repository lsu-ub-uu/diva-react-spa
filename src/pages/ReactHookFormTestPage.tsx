import {
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Card, ErrorSummary, Option } from '../components';
import {
  ControlledTextField,
  ControlledMultiCheckboxField,
  ControlledRadioButtons,
  ControlledDateTimePicker,
  ControlledEditor,
} from '../components/Controlled';

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(),
  startDateTime: yup.date().typeError('Invalid Date!'),
  radioValue: yup.string().trim().required(),
  checkboxValues: yup.array().of(yup.string()).min(1).max(2),
  // eslint-disable-next-line react/forbid-prop-types
  someTextVariables: yup
    .array()
    .of(
      yup.object().shape({
        someTextVariable: yup
          .string()
          .trim()
          .matches(/[A-Za-z]{3}/),
      }),
    )
    .min(1)
    .max(3),
});

export const ReactHookFormTestPage = () => {
  const { t } = useTranslation();
  const methods = useForm({
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '<p>this is the title</p>',
      startDateTime: '2001-09-01 16:30',
      radioValue: '',
      checkboxValues: [],
      someTextVariables: [
        {
          someTextVariable: '',
        },
      ],
    },
  });
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { fields, append, remove, move } = useFieldArray({
    name: 'someTextVariables',
    control,
  });

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
    await trigger();
  };

  const handleRemove = async (index: number) => {
    remove(index);
    await trigger();
  };

  const handleOnSubmit = (data: unknown) => {
    console.log(data);
  };

  const optionsTest: Option[] = [
    {
      label: 'Option 1',
      value: '1',
      disabled: true,
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
  ];

  const getMaxRepeatingFromValidation = () => {
    const schemaFieldDescription =
      validationSchema.fields.someTextVariables.describe();
    // @ts-ignore
    return schemaFieldDescription.tests[1].params.max;
  };

  const getMinRepeatingFromValidation = () => {
    const schemaFieldDescription =
      validationSchema.fields.someTextVariables.describe();

    // @ts-ignore
    console.log(schemaFieldDescription.tests[0].params.min);
    // @ts-ignore
    return schemaFieldDescription.tests[0].params.min;
  };

  // @ts-ignore
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
            title='Testing'
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
              >
                <ControlledEditor
                  required
                  toolbar='italic | alignleft aligncenter alignright | fullscreen | code paste charmap superscript subscript'
                  control={control}
                  name='title'
                  label='Title'
                  plugins='code fullscreen paste charmap'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
              >
                <ControlledMultiCheckboxField
                  required
                  options={optionsTest}
                  control={control}
                  name='checkboxValues'
                  label='Checkbox Input'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
              >
                <ControlledRadioButtons
                  options={optionsTest}
                  control={control}
                  name='radioValue'
                  label='Radios label'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <ControlledDateTimePicker
                  control={control}
                  name='startDateTime'
                  label='Start datetime'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
              >
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel>&nbsp;</FormLabel>
                  <Button
                    size='medium'
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
              <Grid
                key={item.id}
                container
                spacing={2}
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
                    name={`someTextVariables.${index}.someTextVariable`}
                    label='Somelabel'
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
                      disabled={
                        fields.length === getMinRepeatingFromValidation()
                      }
                      onClick={() => handleRemove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
            );
          })}

          <Button
            disabled={fields.length >= getMaxRepeatingFromValidation()}
            disableRipple
            onClick={() => append({ someTextVariable: '' })}
            endIcon={<AddCircleOutlineIcon />}
          >
            Add
          </Button>
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
