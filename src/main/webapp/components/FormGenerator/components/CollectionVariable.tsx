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

import { FormComponent } from '@/components/FormGenerator/types';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledSelectField } from '@/components/Controlled';
import { useFormContext } from 'react-hook-form';

interface CollectionVariableProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponent;
  name: string;
}

export const CollectionVariable = ({
  reactKey,
  renderElementGridWrapper,
  component,
  name,
}: CollectionVariableProps) => {
  const { getValues, control } = useFormContext();
  const hasValue = checkIfComponentHasValue(getValues, name);

  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <ControlledSelectField
        name={name}
        isLoading={false}
        loadingError={false}
        label={component.label ?? ''}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        options={component.options}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        hasValue={hasValue}
      />
    </Grid>
  );
};
