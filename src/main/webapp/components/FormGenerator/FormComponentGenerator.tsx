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
} from '@/components/FormGenerator/utils';
import {
  checkIfComponentHasValue,
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSurroundingContainer,
  isComponentVariable,
} from '@/components/FormGenerator/utils/helper';
import { Grid } from '@mui/material';
import { ControlledSelectField } from '@/components/Controlled';
import React from 'react';
import { renderLeafComponent } from '@/components/FormGenerator/FormGenerator';
import { useFormContext } from 'react-hook-form';
import { SurroundingContainer } from '@/components/FormGenerator/SurroundingContainer';
import { GroupOrContainer } from '@/components/FormGenerator/GroupOrContainer';
import { RepeatingGroup } from '@/components/FormGenerator/RepeatingGroup';
import { RepeatingVariable } from '@/components/FormGenerator/RepeatingVariable';

interface FormComponentGeneratorProps {
  component: FormComponent;
  idx: number;
  path: string;
  childWithNameInDataArray?: string[];
  parentPresentationStyle?: string;
  linkedData: boolean;
}

export const FormComponentGenerator = ({
  component,
  idx,
  path,
  childWithNameInDataArray = [],
  parentPresentationStyle,
  linkedData,
}: FormComponentGeneratorProps) => {
  const { getValues, control } = useFormContext();
  const reactKey = `key_${idx}`;

  let currentComponentNamePath;

  const childrenWithSameNameInData = getChildrenWithSameNameInData(
    getChildNameInDataArray(component),
  );

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
    currentComponentNamePath = path;
  } else {
    currentComponentNamePath = !path
      ? addAttributesForMatchingNameInDataWithoutPath
      : addAttributesForMatchingNameInDataWithPath;
  }

  const createFormComponentAttributes = (
    aComponent: FormComponent,
    aPath: string,
  ) => {
    return (aComponent.attributes ?? []).map((attribute, index) => {
      const hasValue = checkIfComponentHasValue(getValues, attribute.name);

      const attributesToShow = checkIfAttributesToShowIsAValue(component);
      if (attributesToShow === 'all') {
        return (
          <Grid
            key={attribute.name}
            item
            xs={6}
            id={`anchor_${addAttributesToName(component, component.name)}`}
          >
            <ControlledSelectField
              key={`${attribute.name}_${index}`}
              name={`${aPath}._${attribute.name}`}
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
            />
          </Grid>
        );
      }

      if (attributesToShow === 'selectable' && !attribute.finalValue) {
        return (
          <Grid
            key={attribute.name}
            item
            xs={6}
            id={`anchor_${addAttributesToName(component, component.name)}`}
          >
            <ControlledSelectField
              key={`${attribute.name}_${index}`}
              name={`${aPath}._${attribute.name}`}
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
            />
          </Grid>
        );
      }

      return null;
    });
  };

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
        createFormComponentAttributes={createFormComponentAttributes}
        parentPresentationStyle={parentPresentationStyle}
        childWithNameInDataArray={childrenWithSameNameInData}
        linkedData={linkedData}
      />
    );
  }

  if (isComponentGroupAndRepeating(component)) {
    return (
      <RepeatingGroup
        currentComponentNamePath={currentComponentNamePath}
        reactKey={reactKey}
        component={component}
        createFormComponentAttributes={createFormComponentAttributes}
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
        createFormComponentAttributes={createFormComponentAttributes}
        parentPresentationStyle={parentPresentationStyle}
        linkedData={linkedData}
      />
    );
  }

  return (
    <React.Fragment key={reactKey}>
      {createFormComponentAttributes(component, currentComponentNamePath)}
      {renderLeafComponent(
        // Variable
        component,
        reactKey,
        control,
        `${currentComponentNamePath}.value`,
        true,
        getValues,
        parentPresentationStyle,
      )}
    </React.Fragment>
  );
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
