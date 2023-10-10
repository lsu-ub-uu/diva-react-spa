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
import { Control, FieldValues, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArraySchema, NumberSchema, ObjectSchema, StringSchema } from 'yup';
import React from 'react';
import { ControlledTextField, ControlledSelectField } from '../Controlled';
// eslint-disable-next-line import/no-cycle
import {
  createDefaultValuesFromFormSchema,
  hasComponentAttributes,
  isComponentOptional,
  isComponentRepeating,
} from './utils';
// eslint-disable-next-line import/no-cycle
import { FieldArrayComponent } from './FieldArrayComponent';
import { Option, Typography } from '../index';

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

export interface FormComponentTooltip {
  title: string;
  body: string;
}

export interface FormComponent {
  type: string;
  name: string;
  label?: string;
  finalValue?: string;
  placeholder?: string;
  validation?: FormRegexValidation | FormNumberValidation;
  repeat: FormComponentRepeat;
  tooltip?: FormComponentTooltip;
  inputType?: 'input' | 'textarea'; // really be optional?
  mode?: string;
  options?: Option[];
  attributes?: FormAttributeCollection[];
}

type FormAttributeCollection = Omit<
  FormComponent,
  'repeat' | 'inputType' | 'attributes'
>;

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

const createYupStringRegexpSchema = (component: FormComponent) => {
  const regexpValidation = component.validation as FormRegexValidation;
  return yup
    .string()
    .matches(
      new RegExp(regexpValidation.pattern ?? '.+'),
      'Invalid input format',
    );
};

const createYupNumberSchema = (component: FormComponent) => {
  const numberValidation = component.validation as FormNumberValidation;
  return yup
    .string()
    .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
    .test('decimal-places', 'Invalid number of decimals', (value) => {
      if (!value) return true;
      const decimalPlaces = (value.split('.')[1] || []).length;
      return decimalPlaces === numberValidation.numberOfDecimals;
    })
    .test('min', 'Invalid range (min)', (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return numberValidation.min <= numValue;
    })
    .test('max', 'Invalid range (max)', (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return numberValidation.max >= numValue;
    });
};

const createYupComponentSchema = (component: FormComponent) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(component);
    case 'numberVariable':
      return createYupNumberSchema(component);
    default: // collectionVariable
      return yup.string().required();
  }
};

const generateYupSchema = (components: FormComponent[]) => {
  const validatableComponents = components.filter((component) =>
    ['numberVariable', 'textVariable', 'collectionVariable'].includes(
      component.type,
    ),
  );

  const composedShape = validatableComponents.reduce(
    (accumulator, component) => {
      // eslint-disable-next-line prefer-regex-literals
      if (hasComponentAttributes(component)) {
        const componentRule = {
          value: createYupComponentSchema(component),
        };
        const attributeRules = component.attributes?.map((attribute) => ({
          [`_${attribute.name}`]: yup.string().required(), // this is fine attributes are always required
        }));

        const componentShape = {
          ...componentRule,
          ...Object.assign({}, ...(attributeRules ?? [])),
        };

        accumulator[component.name] = yup.object().shape(componentShape);
      } else {
        if (
          component.type === 'textVariable' &&
          !isComponentRepeating(component)
        ) {
          accumulator[component.name] = createYupStringRegexpSchema(component);
        }

        if (
          component.type === 'textVariable' &&
          isComponentRepeating(component)
        ) {
          accumulator[component.name] = yup
            .array()
            .of(
              yup.object().shape({
                value: createYupStringRegexpSchema(component),
              }),
            )
            .min(component.repeat.repeatMin)
            .max(component.repeat.repeatMax);
        }

        if (
          component.type === 'collectionVariable' &&
          !isComponentRepeating(component)
        ) {
          if (!isComponentOptional(component)) {
            accumulator[component.name] = yup.string().required();
          }
        }

        if (
          component.type === 'collectionVariable' &&
          isComponentRepeating(component)
        ) {
          if (!isComponentOptional(component)) {
            accumulator[component.name] = yup
              .array()
              .of(
                yup.object().shape({
                  value: yup.string().required(),
                }),
              )
              .min(component.repeat.repeatMin)
              .max(component.repeat.repeatMax);
          }
        }

        if (
          component.type === 'numberVariable' &&
          isComponentRepeating(component)
        ) {
          accumulator[component.name] = yup
            .array()
            .of(
              yup.object().shape({
                value: createYupNumberSchema(component),
              }),
            )
            .min(component.repeat.repeatMin)
            .max(component.repeat.repeatMax);
        }

        if (
          component.type === 'numberVariable' &&
          !isComponentRepeating(component)
        ) {
          accumulator[component.name] = createYupNumberSchema(component);
        }
      }

      return accumulator;
    },
    {} as Record<
      string,
      | ObjectSchema<any, any>
      | StringSchema
      | NumberSchema
      | ArraySchema<any, any, any, any>
    >,
  );

  return yup.object().shape(composedShape);
};

export const renderVariableField = (
  component: FormComponent,
  reactKey: string,
  control: Control<any>,
  name: string,
) => {
  switch (component.type) {
    case 'textVariable':
    case 'numberVariable': {
      return (
        <ControlledTextField
          key={reactKey}
          label={component.label ?? ''}
          name={name}
          placeholder={component.placeholder}
          tooltip={component.tooltip}
          control={control}
          readOnly={!!component.finalValue}
        />
      );
    }
    case 'collectionVariable': {
      return (
        <ControlledSelectField
          key={reactKey}
          name={name}
          isLoading={false}
          loadingError={false}
          label={component.label ?? ''}
          placeholder={component.placeholder}
          tooltip={component.tooltip}
          control={control}
          options={component.options}
          readOnly={!!component.finalValue}
        />
      );
    }
    case 'text': {
      return (
        <Typography
          key={reactKey}
          variant='h5'
          text={component.name}
        />
      );
    }
    default:
      return null;
  }
};

export const FormGenerator = (props: FormGeneratorProps) => {
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(props.formSchema),
    resolver: yupResolver(generateYupSchema(props.formSchema.components)),
  });

  const { control, handleSubmit } = methods;

  // eslint-disable-next-line consistent-return
  const generateFormComponent = (component: FormComponent, idx: number) => {
    const reactKey = `${component.name}_${idx}`;

    if (
      isComponentRepeating(component) &&
      ['numberVariable', 'textVariable', 'collectionVariable'].includes(
        component.type,
      )
    ) {
      return (
        <FieldArrayComponent
          component={component}
          key={reactKey}
          control={control}
          name={component.name}
        />
      );
    }

    let renderResult = renderVariableField(
      component,
      reactKey,
      control,
      component.attributes ? `${component.name}.value` : component.name,
    );

    if (component.attributes !== undefined) {
      renderResult = (
        <React.Fragment key={reactKey}>
          {renderResult}
          {component.attributes.map((attribute, index) => {
            return (
              <ControlledSelectField
                key={`${attribute.name}_${index}`}
                name={`${component.name}._${attribute.name}`}
                isLoading={false}
                loadingError={false}
                label={attribute.label ?? ''}
                placeholder={attribute.placeholder}
                tooltip={attribute.tooltip}
                control={control}
                options={attribute.options}
                readOnly={!!attribute.finalValue}
              />
            );
          })}
        </React.Fragment>
      );
    }

    return renderResult;
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) => props.onSubmit(values))}
    >
      {props.formSchema.components.map(generateFormComponent)}
      <Button
        sx={{ mt: 4, mb: 2 }}
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
