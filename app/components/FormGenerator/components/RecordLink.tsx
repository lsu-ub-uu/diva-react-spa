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

import { RecordLinkWithSearch } from '@/components/FormGenerator/components/RecordLinkWithSearch';
import { RecordLinkWithLinkedPresentation } from '@/components/FormGenerator/components/RecordLinkWithLinkedPresentation';
import { TextOrNumberVariable } from '@/components/FormGenerator/components/TextOrNumberVariable';
import { FormComponent } from '@/components/FormGenerator/types';
import { useContext } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { useRemixFormContext } from 'remix-hook-form';

interface RecordLinkProps {
  component: FormComponent;
  reactKey: string;
  name: string;
  renderElementGridWrapper: boolean;
  parentPresentationStyle?: string;
}

export const RecordLink = ({
  name,
  component,
  reactKey,
  renderElementGridWrapper,
  parentPresentationStyle,
}: RecordLinkProps) => {
  const { getValues } = useRemixFormContext();

  const hasValue = checkIfComponentHasValue(getValues, name);
  const { linkedData } = useContext(FormGeneratorContext);

  if (
    checkIfComponentContainsSearchId(component) &&
    component.mode === 'input' &&
    !hasValue &&
    !linkedData
  ) {
    return (
      <RecordLinkWithSearch
        reactKey={reactKey}
        renderElementGridWrapper={renderElementGridWrapper}
        component={component}
        name={name}
      />
    );
  }

  if (
    'linkedRecordPresentation' in component &&
    component.linkedRecordPresentation !== undefined
  ) {
    return (
      <RecordLinkWithLinkedPresentation
        reactKey={reactKey}
        renderElementGridWrapper={renderElementGridWrapper}
        component={component}
        name={name}
      />
    );
  }

  return (
    <TextOrNumberVariable
      reactKey={reactKey}
      renderElementGridWrapper={renderElementGridWrapper}
      component={component}
      name={name}
      parentPresentationStyle={parentPresentationStyle}
    />
  );
};

const checkIfComponentContainsSearchId = (component: FormComponent) => {
  return 'search' in component ? component.search !== undefined : undefined;
};
