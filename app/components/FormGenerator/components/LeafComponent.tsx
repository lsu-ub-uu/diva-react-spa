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

import type { FormComponent } from '@/components/FormGenerator/types';
import {
  checkIfComponentHasValue,
  isComponentCollVar,
  isComponentGuiElement,
  isComponentNumVar,
  isComponentRecordLink,
  isComponentText,
  isComponentTextVariable,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { TextOrNumberVariable } from '@/components/FormGenerator/components/TextOrNumberVariable';
import { RecordLinkWithSearch } from '@/components/FormGenerator/components/RecordLinkWithSearch';
import { RecordLinkWithLinkedPresentation } from '@/components/FormGenerator/components/RecordLinkWithLinkedPresentation';
import { CollectionVariable } from '@/components/FormGenerator/components/CollectionVariable';
import { Text } from '@/components/FormGenerator/components/Text';
import { GuiElementLink } from '@/components/FormGenerator/components/GuiElementLink';
import { useRemixFormContext } from 'remix-hook-form';
import type { ReactNode } from 'react';

import type { JSX } from "react";

interface LeafComponentProps {
  component: FormComponent;
  reactKey: string;
  name: string;
  renderElementGridWrapper: boolean;
  parentPresentationStyle?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const LeafComponent = ({
  component,
  reactKey,
  name,
  renderElementGridWrapper,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: LeafComponentProps): JSX.Element | null => {
  const { getValues } = useRemixFormContext();
  if (isComponentTextVariable(component) || isComponentNumVar(component)) {
    return (
      <TextOrNumberVariable
        reactKey={reactKey}
        renderElementGridWrapper={renderElementGridWrapper}
        component={component}
        name={name}
        parentPresentationStyle={parentPresentationStyle}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (isComponentRecordLink(component)) {
    const hasValue = checkIfComponentHasValue(getValues, name);

    if (
      checkIfComponentContainsSearchId(component) &&
      component.mode === 'input' &&
      !hasValue
    ) {
      return (
        <RecordLinkWithSearch
          reactKey={reactKey}
          renderElementGridWrapper={renderElementGridWrapper}
          component={component}
          name={name}
          attributes={attributes}
          actionButtonGroup={actionButtonGroup}
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
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (isComponentCollVar(component)) {
    return (
      <CollectionVariable
        reactKey={reactKey}
        renderElementGridWrapper={renderElementGridWrapper}
        component={component}
        name={name}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (isComponentText(component)) {
    return (
      <Text
        reactKey={reactKey}
        renderElementGridWrapper={renderElementGridWrapper}
        component={component}
      />
    );
  }

  if (isComponentGuiElement(component)) {
    return (
      <GuiElementLink
        reactKey={reactKey}
        component={component}
      />
    );
  }

  return null;
};

const checkIfComponentContainsSearchId = (component: FormComponent) => {
  return 'search' in component ? component.search !== undefined : undefined;
};
