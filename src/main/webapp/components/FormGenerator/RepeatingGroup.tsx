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
import { FieldArrayComponent } from '@/components/FormGenerator/FieldArrayComponent';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormComponentListGenerator } from '@/components/FormGenerator/FormComponentListGenerator';

interface RepeatingGroupProps {
  currentComponentNamePath: string;
  reactKey: string;
  component: FormComponent;
  createFormComponentAttributes: (
    aComponent: FormComponent,
    aPath: string,
  ) => (JSX.Element | null)[];
  parentPresentationStyle: string | undefined;
  childWithNameInDataArray: string[];
}

export const RepeatingGroup = ({
  currentComponentNamePath,
  reactKey,
  component,
  createFormComponentAttributes,
  parentPresentationStyle,
  childWithNameInDataArray,
}: RepeatingGroupProps) => {
  const { control } = useFormContext();
  return (
    <FieldArrayComponent
      key={reactKey}
      control={control}
      component={component}
      name={currentComponentNamePath}
      renderCallback={(arrayPath: string) => {
        return [
          ...createFormComponentAttributes(component, arrayPath),
          <FormComponentListGenerator
            key={`${reactKey}_components`}
            components={component.components ?? []}
            childWithNameInDataArray={childWithNameInDataArray}
            parentPresentationStyle={
              component.presentationStyle ?? parentPresentationStyle
            }
            path={arrayPath}
          />,
        ];
      }}
    />
  );
};
