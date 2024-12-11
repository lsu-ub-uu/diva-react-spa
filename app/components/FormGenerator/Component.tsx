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
import {
  addAttributesToName,
  getChildNameInDataArray,
  getChildrenWithSameNameInData,
  hasCurrentComponentSameNameInData,
} from '@/components/FormGenerator/defaultValues/defaultValues';
import {
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSurroundingContainer,
  isComponentVariable,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import React from 'react';
import { SurroundingContainer } from '@/components/FormGenerator/components/SurroundingContainer';
import { GroupOrContainer } from '@/components/FormGenerator/components/GroupOrContainer';
import { RepeatingGroup } from '@/components/FormGenerator/components/RepeatingGroup';
import { RepeatingVariable } from '@/components/FormGenerator/components/RepeatingVariable';
import { LeafComponent } from '@/components/FormGenerator/components/LeafComponent';
import { Attributes } from '@/components/FormGenerator/components/Attributes';

interface FormComponentGeneratorProps {
  component: FormComponent;
  idx: number;
  path: string;
  childWithNameInDataArray?: string[];
  parentPresentationStyle?: string;
}

export const Component = ({
  component,
  idx,
  path,
  childWithNameInDataArray = [],
  parentPresentationStyle,
}: FormComponentGeneratorProps) => {
  const reactKey = `key_${idx}`;

  const childrenWithSameNameInData = getChildrenWithSameNameInData(
    getChildNameInDataArray(component),
  );

  const currentComponentNamePath = getCurrentComponentNamePath(
    childWithNameInDataArray,
    component,
    path,
  );

  if (isComponentSurroundingContainerAndNOTRepeating(component)) {
    return (
      <SurroundingContainer
        reactKey={reactKey}
        component={component}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentGroupOrRepeatingContainerAndNOTRepeating(component)) {
    return (
      <GroupOrContainer
        currentComponentNamePath={currentComponentNamePath}
        reactKey={reactKey}
        component={component}
        parentPresentationStyle={parentPresentationStyle}
        childWithNameInDataArray={childrenWithSameNameInData}
      />
    );
  }

  if (isComponentGroupAndRepeating(component)) {
    return (
      <RepeatingGroup
        currentComponentNamePath={currentComponentNamePath}
        reactKey={reactKey}
        component={component}
        parentPresentationStyle={parentPresentationStyle}
        childWithNameInDataArray={childrenWithSameNameInData}
      />
    );
  }

  if (isComponentVariableAndRepeating(component)) {
    return (
      <RepeatingVariable
        reactKey={reactKey}
        component={component}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  return (
    <LeafComponent
      component={component}
      reactKey={reactKey}
      name={`${currentComponentNamePath}.value`}
      renderElementGridWrapper={true}
      parentPresentationStyle={parentPresentationStyle}
      attributes={
        <Attributes
          component={component}
          path={currentComponentNamePath}
        />
      }
    />
  );
};

const getCurrentComponentNamePath = (
  childWithNameInDataArray: string[],
  component: FormComponent,
  path: string,
) => {
  const currentComponentSameNameInData = hasCurrentComponentSameNameInData(
    childWithNameInDataArray,
    component.name,
  );
  const addAttributesForMatchingNameInDataWithoutPath =
    currentComponentSameNameInData
      ? `${addAttributesToName(component, component.name)}`
      : `${component.name}`;

  const addAttributesForMatchingNameInDataWithPath =
    currentComponentSameNameInData
      ? `${path}.${addAttributesToName(component, component.name)}`
      : `${path}.${component.name}`;

  if (isComponentContainer(component)) {
    return path;
  } else {
    return !path
      ? addAttributesForMatchingNameInDataWithoutPath
      : addAttributesForMatchingNameInDataWithPath;
  }
};

const isComponentSurroundingContainerAndNOTRepeating = (
  component: FormComponent,
) => {
  return (
    isComponentSurroundingContainer(component) &&
    !isComponentRepeating(component)
  );
};

const isComponentGroupOrRepeatingContainerAndNOTRepeating = (
  component: FormComponent,
) => {
  return (
    (isComponentGroup(component) || isComponentRepeatingContainer(component)) &&
    !isComponentRepeating(component)
  );
};

const isComponentGroupAndRepeating = (component: FormComponent) => {
  return isComponentGroup(component) && isComponentRepeating(component);
};

const isComponentVariableAndRepeating = (component: FormComponent) => {
  return isComponentVariable(component) && isComponentRepeating(component);
};
