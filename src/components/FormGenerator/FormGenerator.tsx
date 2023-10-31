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
import LaunchIcon from '@mui/icons-material/Launch';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ControlledTextField, ControlledSelectField } from '../Controlled';
import {
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
  isComponentGroup,
  isComponentRepeating,
  isComponentVariable,
} from './utils';
import { Card, Typography } from '../index';
import { FormComponent, FormSchema } from './types';
import { FieldArrayComponent } from './FieldArrayComponent';

interface FormGeneratorProps {
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
}

export const renderLeafComponent = (
  component: FormComponent,
  reactKey: string,
  control: Control<any>,
  name: string,
): JSX.Element | null => {
  switch (component.type) {
    case 'textVariable':
    case 'numberVariable':
    case 'recordLink': {
      return (
        <ControlledTextField
          key={reactKey}
          multiline={component.inputType === 'textarea'}
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
          variant={component.textStyle ?? 'bodyTextStyle'}
          text={component.name}
        />
      );
    }
    case 'guiElementLink': {
      // TODO If needed take component.presentAs in consideration
      // TODO Break out button ExternalLinkButton target, icon, text
      return (
        <Button
          component='a'
          href={component.url}
          target='_blank'
          rel='noopener noreferrer'
          endIcon={<LaunchIcon />}
          color='primary'
        >
          {i18next.t(component.elementText ?? '') as string}
        </Button>
      );
    }
    default:
      return null;
  }
};

export const FormGenerator = (props: FormGeneratorProps) => {
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(props.formSchema),
    resolver: yupResolver(generateYupSchemaFromFormSchema(props.formSchema)),
  });

  const { control, handleSubmit, reset } = methods;

  // eslint-disable-next-line consistent-return
  const generateFormComponent = (
    component: FormComponent,
    idx: number,
    path: string,
  ) => {
    const reactKey = `key_${idx}`;
    const currentComponentNamePath = !path
      ? `${component.name}`
      : `${path}.${component.name}`;

    const createFormComponentAttributes = (
      aComponent: FormComponent,
      aPath: string,
    ) => {
      return (aComponent.attributes ?? []).map((attribute, index) => {
        return (
          <ControlledSelectField
            key={`${attribute.name}_${index}`}
            name={`${aPath}._${attribute.name}`}
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
      });
    };

    if (isComponentGroup(component) && !isComponentRepeating(component)) {
      return (
        <Card
          variant='variant6'
          title={t(component.label ?? '') as string}
          key={reactKey}
          tooltipBody=''
          tooltipTitle='Non-repeating group'
          sx={{ mb: 1 }}
        >
          {createFormComponentAttributes(component, currentComponentNamePath)}
          {component.components &&
            createFormComponents(
              component.components,
              currentComponentNamePath,
            )}
        </Card>
      );
    }

    if (isComponentGroup(component) && isComponentRepeating(component)) {
      return (
        <Box key={reactKey}>
          <FieldArrayComponent
            control={control}
            component={component}
            name={currentComponentNamePath}
            renderCallback={(arrayPath: string) => {
              return [
                ...createFormComponentAttributes(component, arrayPath),
                ...createFormComponents(component.components ?? [], arrayPath),
              ];
            }}
          />
        </Box>
      );
    }
    if (isComponentVariable(component) && isComponentRepeating(component)) {
      return (
        <FieldArrayComponent
          key={reactKey}
          control={control}
          component={component}
          name={currentComponentNamePath}
          renderCallback={(variableArrayPath: string) => {
            return [
              ...createFormComponentAttributes(component, variableArrayPath),
              renderLeafComponent(
                component,
                variableArrayPath,
                control,
                `${variableArrayPath}.value`,
              ),
            ];
          }}
        />
      );
    }
    return (
      <div key={reactKey}>
        {createFormComponentAttributes(component, currentComponentNamePath)}
        {renderLeafComponent(
          component,
          reactKey,
          control,
          `${currentComponentNamePath}.value`,
        )}
      </div>
    );
  };

  const createFormComponents = (
    components: FormComponent[],
    path = '',
  ): JSX.Element[] => {
    return components.map((c, i) => generateFormComponent(c, i, path));
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) => props.onSubmit(values))}
    >
      {generateFormComponent(props.formSchema.form, 0, '')}

      <Box
        component='span'
        sx={{ mt: 2, mb: 2 }}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Button
          disableRipple
          variant='contained'
          color='secondary'
          sx={{ height: 40 }}
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          type='submit'
          disableRipple
          variant='contained'
          color='primary'
          sx={{ height: 40 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
