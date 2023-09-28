/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Box } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumberSchema, StringSchema } from 'yup';
import { useTranslation } from 'react-i18next';
import { ControlledTextField } from '../Controlled';
// eslint-disable-next-line import/no-cycle
import { createDefaultValuesFromFormSchema } from './utils';
import { FieldArrayComponent } from './FieldArrayComponent';

interface FormGeneratorProps {
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
}

export interface FormSchema {
  validationTypeId: string;
  components: FormComponent[];
}

export interface FormComponentRepeat {
  repeatMin: number;
  repeatMax: number;
  minNumberOfRepeatingToShow?: number;
}

export interface FormComponent {
  type: string;
  name: string;
  placeholder?: string;
  validation?: FormRegexValidation | FormNumberValidation;
  repeat: FormComponentRepeat;
  inputType?: 'input' | 'textarea'; // really be optional?
}

interface FormRegexValidation {
  type: 'regex';
  pattern: string;
}

interface FormNumberValidation {
  type: 'number';
  min: number;
  max: number;
  warningMin: number;
  warningMax: number;
  numberOfDecimals: number;
}

const generateYupSchema = (components: FormComponent[]) => {
  const composedShape = components.reduce((accumulator, component) => {
    // eslint-disable-next-line prefer-regex-literals
    if (component.type === 'textVariable') {
      const regexpValidation = component.validation as FormRegexValidation;
      accumulator[component.name] = yup
        .string()
        .matches(
          new RegExp(regexpValidation.pattern ?? '.+'),
          'Invalid input format',
        );
    }

    if (component.type === 'numberVariable') {
      const numberValidation = component.validation as FormNumberValidation;
      accumulator[component.name] = yup
        .string()
        .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
        .test('decimal-places', 'Invalid number of decimals', (value) => {
          if (!value) return true;
          const decimalPlaces = (value.split('.')[1] || []).length;
          return decimalPlaces === numberValidation.numberOfDecimals;
        })
        .test('min', 'Invalid range (min)', (value) => {
          if (!value) return true;
          const intValue = parseInt(value, 10);
          return numberValidation.min <= intValue;
        })
        .test('max', 'Invalid range (max)', (value) => {
          if (!value) return true;
          const intValue = parseInt(value, 10);
          return numberValidation.max >= intValue;
        });
    }

    return accumulator;
  }, {} as Record<string, StringSchema | NumberSchema>);

  return yup.object().shape(composedShape);
};

export const FormGenerator = (props: FormGeneratorProps) => {
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(props.formSchema),
    resolver: yupResolver(
      generateYupSchema(
        props.formSchema.components.filter(
          (component) => component.type !== 'text',
        ),
      ),
    ),
  });

  // eslint-disable-next-line consistent-return
  const generateFormComponent = (component: FormComponent, idx: number) => {
    const reactKey = `${component.name}_${idx}`;

    if (component.repeat.repeatMin > 1) {
      return (
        <FieldArrayComponent
          key={reactKey}
          control={methods.control}
          name={component.name}
        />
      );
    }
    if (component.repeat.repeatMin === 1) {
      switch (component.type) {
        case 'textVariable':
        case 'numberVariable': {
          return (
            <ControlledTextField
              key={reactKey}
              label={component.name}
              name={component.name}
              placeholder={component.placeholder}
              control={methods.control}
            />
          );
        }
        default:
          return <h3 key={reactKey}>{t(component.name)}</h3>;
      }
    }
  };

  return (
    <Box
      component='form'
      onSubmit={methods.handleSubmit((values) => props.onSubmit(values))}
    >
      {props.formSchema.components.map(generateFormComponent)}
      <Button
        fullWidth
        type='submit'
        disableRipple
        variant='contained'
      >
        Submit
      </Button>
    </Box>
  );
};
