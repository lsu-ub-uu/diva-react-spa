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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { FormComponent } from '../types';
import { removeEmpty } from '../../../utils/removeEmpty';
import {
  addAttributesToName,
  hasCurrentComponentSameNameInData,
} from '../utils';

export const countStringCharOccurrences = (
  inputString: string,
  targetChar: string,
) => {
  return inputString.split('').filter((char) => char === targetChar).length;
};

export const isFirstLevelGroup = (pathName: string) => {
  return countStringCharOccurrences(pathName, '.') === 1;
};

export const isFirstLevelVariable = (pathName: string) => {
  return countStringCharOccurrences(pathName, '.') === 2;
};

export const isRootLevel = (pathName: string) => {
  return countStringCharOccurrences(pathName, '.') === 0;
};

export const isComponentVariable = (component: FormComponent) =>
  [
    'numberVariable',
    'textVariable',
    'collectionVariable',
    'recordLink',
  ].includes(component.type);

export const isComponentGroup = (component: FormComponent) =>
  component.type === 'group';

export const isComponentContainer = (component: FormComponent) =>
  component.type === 'container';

export const isComponentSurroundingContainer = (component: FormComponent) =>
  isComponentContainer(component) && component.containerType === 'surrounding';

export const isComponentRepeatingContainer = (
  component: FormComponent | undefined,
) =>
  component !== undefined &&
  isComponentContainer(component) &&
  component.containerType === 'repeating';

export const isComponentValidForDataCarrying = (component: FormComponent) =>
  isComponentVariable(component) ||
  isComponentGroup(component) ||
  isComponentContainer(component); // a container can have children that are data carriers

export const isComponentRepeating = (component: FormComponent) => {
  const rMax = component.repeat?.repeatMax ?? 1;
  const rMin = component.repeat?.repeatMin ?? 1;
  return !(rMax === 1 && rMin === 1);
};

export const isComponentRequired = (component: FormComponent) => {
  const rMin = component.repeat?.repeatMin ?? 1;
  return rMin > 0;
};

export const isComponentSingularAndOptional = (component: FormComponent) => {
  const rMax = component.repeat?.repeatMax ?? 1;
  const rMin = component.repeat?.repeatMin ?? 1;
  return rMax === 1 && rMin === 0;
};

export const isComponentGroupAndOptional = (component: FormComponent) => {
  const componentGroup = component.type === 'group';
  const rMin = component.repeat?.repeatMin ?? 0;
  return componentGroup && rMin === 0;
};

export const checkIfComponentHasValue = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return (
    getValues(componentValue) !== '' && getValues(componentValue) !== undefined
  );
};

export const checkIfSingularComponentHasValue = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
): boolean => {
  if (isGVUndefined(getValues, componentValue)) {
    return false;
  }

  if (hasGVArrayLength(getValues, componentValue)) {
    return false;
  }

  if (isGVValueUndefined(getValues, componentValue)) {
    return false;
  }

  return isGVValueEmptyString(getValues, componentValue);
};

const isGVUndefined = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue) === undefined;
};

const hasGVArrayLength = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return (
    getValues(componentValue).length === undefined ||
    getValues(componentValue).length === 0
  );
};

const isGVValueUndefined = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue)[0].value === undefined;
};

const isGVValueEmptyString = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue)[0].value !== '';
};

export const checkForExistingSiblings = (formValues: any) => {
  if (formValues !== undefined) {
    const valuesWithoutAttribs = Object.keys(formValues)
      .filter((objKey) => !objKey.startsWith('_'))
      .reduce<Record<string, any>>((newObj, key) => {
        newObj[key] = formValues[key];
        return newObj;
      }, {});
    const cleanedValues = removeEmpty(valuesWithoutAttribs);
    const valueLength = Object.keys(cleanedValues).length;
    return valueLength > 0;
  }
  return false;
};

export const checkIfValueExists = (value: unknown) => {
  return !(value === null || value === '' || value === undefined);
};

export function getNameInData(
  childWithSameNameInData: string[],
  component: FormComponent,
) {
  return hasCurrentComponentSameNameInData(
    childWithSameNameInData,
    component.name,
  )
    ? addAttributesToName(component, component.name)
    : component.name;
}
