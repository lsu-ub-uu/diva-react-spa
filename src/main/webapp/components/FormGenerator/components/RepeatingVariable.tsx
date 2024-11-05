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
import { useFormContext } from 'react-hook-form';
import {
  checkIfComponentHasValue,
  checkIfSingularComponentHasValue,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import { LeafComponent } from '@/components/FormGenerator/components/LeafComponent';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';

interface RepeatingVariableProps {
  reactKey: string;
  component: FormComponent;
  currentComponentNamePath: string;
  parentPresentationStyle: string | undefined;
}

export const RepeatingVariable = ({
  reactKey,
  component,
  currentComponentNamePath,
  parentPresentationStyle,
}: RepeatingVariableProps) => {
  const { control, getValues } = useFormContext();
  const { linkedData } = useContext(FormGeneratorContext);
  const hasValue = checkIfComponentHasValue(getValues, component.name);
  const hasLinkedDataValue = checkIfSingularComponentHasValue(
    getValues,
    currentComponentNamePath,
  );
  return !hasLinkedDataValue && linkedData ? null : (
    <FieldArrayComponent
      key={reactKey}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(variableArrayPath: string) => {
        return (
          <>
            <Attributes
              component={component}
              path={variableArrayPath}
            />
            <LeafComponent
              component={component}
              reactKey={variableArrayPath}
              name={`${variableArrayPath}.value`}
              renderElementGridWrapper={false}
              parentPresentationStyle={parentPresentationStyle}
            />
          </>
        );
      }}
      hasValue={hasValue}
    />
  );
};
