/*
 * Copyright 2024 Uppsala University Library
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
 */

import {
  FormComponent,
  FormComponentCollVar,
} from '@/components/FormGenerator/types';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Grid2 as Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledSelectField } from '@/components/Controlled';
import { useRemixFormContext } from 'remix-hook-form';
import { AttributeSelect } from '@/components/Controlled/AttributeSelect/AttributeSelect';

interface AttributesProps {
  component: FormComponentCollVar;
  path: string;
}

export const Attributes = ({ component, path }: AttributesProps) => {
  const { getValues, control } = useRemixFormContext();

  return (component.attributes ?? []).map((attribute, index) => {
    const hasValue = checkIfComponentHasValue(getValues, attribute.name);

    const attributesToShow = checkIfAttributesToShowIsAValue(component);
    if (attributesToShow === 'all') {
      return (
        <AttributeSelect
          name={`${path}._${attribute.name}`}
          label={attribute.label ?? ''}
          options={attribute.options}
        />
        /*  <ControlledSelectField
          key={`${attribute.name}_${index}`}
          name={`${path}._${attribute.name}`}
          isLoading={false}
          loadingError={false}
          label={attribute.label ?? ''}
          showLabel={component.showLabel}
          placeholder={attribute.placeholder}
          tooltip={attribute.tooltip}
          control={control}r
          options={attribute.options}
          readOnly={!!attribute.finalValue}
          displayMode={attribute.mode}
          hasValue={hasValue}
        />*/
      );
    }

    if (attributesToShow === 'selectable' && !attribute.finalValue) {
      return (
        <AttributeSelect
          name={`${path}._${attribute.name}`}
          label={attribute.label ?? ''}
          options={attribute.options}
        />

        /*    <ControlledSelectField
          key={`${attribute.name}_${index}`}
          name={`${path}._${attribute.name}`}
          isLoading={false}
          loadingError={false}
          label={attribute.label ?? ''}
          showLabel={component.showLabel}
          placeholder={attribute.placeholder}
          tooltip={attribute.tooltip}
          control={control}
          options={attribute.options}
          readOnly={!!attribute.finalValue}
          displayMode={attribute.mode}
          hasValue={hasValue}
        />*/
      );
    }

    return null;
  });
};

const checkIfAttributesToShowIsAValue = (component: FormComponent) => {
  if (
    component.attributesToShow === 'all' ||
    component.attributesToShow === undefined
  ) {
    return 'all';
  }
  if (component.attributesToShow === 'selectable') {
    return 'selectable';
  }
  return 'none';
};
