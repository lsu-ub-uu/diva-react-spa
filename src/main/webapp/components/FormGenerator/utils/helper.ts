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

export const countStringCharOccurrences = (
  inputString: string,
  targetChar: string,
) => {
  return inputString.split('').filter((char) => char === targetChar).length;
};

export const isFirstLevel = (pathName: string) => {
  return countStringCharOccurrences(pathName, '.') === 1;
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

export const isParentGroupOptional = (component: FormComponent) => {
  const componentGroup = component.type === 'group';
  const rMin = component.repeat?.repeatMin ?? 0;
  return componentGroup && rMin === 0;
};

export const checkIfComponentHasValue = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue) !== '';
};

export const checkForExistingSiblingValue = (formValues: any) => {
  const valuesWithoutAttribs = Object.keys(formValues)
    .filter((objKey) => !objKey.startsWith('_'))
    .reduce((newObj, key) => {
      // @ts-ignore
      newObj[key] = formValues[key];
      return newObj;
    }, {});
  const cleanedValues = removeEmpty(valuesWithoutAttribs);
  const valueLength = Object.keys(cleanedValues).length;
  return valueLength > 0;
};
