import { useEffect } from 'react';
import { Box, ButtonGroup, Grid, IconButton, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Card } from '../components';
import { ControlledTextField } from '../components/Controlled';

const validationSchema = yup.object().shape({
  // eslint-disable-next-line react/forbid-prop-types
  nonRepTextVariable: yup.string().matches(/^[A-Za-z åäöÅÄÖ]{3,}$/, {
    message: 'Field1 must be either empty or 10 digits',
    excludeEmptyString: false,
  }),
  someTextVariable: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .test('is-cake', 'must be a cake', (value: string | undefined) => {
            if (value === 'cake') {
              return true;
            }
            return false;
          }),
      }),
    )
    .min(1)
    .max(2),
});

export const ReactHookFormTestPage = () => {
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nonRepTextVariable: '',
      someTextVariable: [{ value: '' }, { value: '' }],
    },
  });

  const { setFocus, control, handleSubmit } = methods;

  // @ts-ignore
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'someTextVariable',
  });

  useEffect(() => {
    setFocus('nonRepTextVariable');
    console.log('Mounted form');
  }, []);

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  const handleOnSubmit = (data: unknown) => {
    console.log(data);
  };

  const getFieldValidationPropertyValue = (
    fieldName: string,
    ruleName: string,
  ): number => {
    // @ts-ignore
    const fieldRules = validationSchema.fields[fieldName]?.describe();

    if (!fieldRules) {
      return 1;
    }

    const rule = fieldRules.tests.find((r: any) => r.name === ruleName);
    return rule ? rule.params[ruleName] : 1;
  };

  // @ts-ignore
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Stack spacing={1}>
        <Card
          title='Testing'
          variant='variant6'
          tooltipTitle='Title'
          tooltipBody='Here goes some text about how choose type'
        >
          <ControlledTextField
            placeholder='some placeholder'
            control={control}
            name='nonRepTextVariable'
            label='nonRepTextVariable'
          />
          {fields.map((item, index) => {
            return (
              <Grid
                key={item.id}
                container
                spacing={0}
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
                    name={`someTextVariable.${index}.value` as const}
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
                        fields.length <=
                        getFieldValidationPropertyValue(
                          'someTextVariable',
                          'min',
                        )
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
            fullWidth
            variant='outlined'
            disabled={
              fields.length >=
              getFieldValidationPropertyValue('someTextVariable', 'max')
            }
            disableRipple
            onClick={() => append({ value: '' })}
            endIcon={<AddCircleOutlineIcon />}
          >
            Add
          </Button>
        </Card>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid
            item
            xs={12}
          >
            <Button
              fullWidth
              type='submit'
              disableRipple
              variant='contained'
            >
              Submit form
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
