/*
 * Copyright 2023 Uppsala University Library
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

import { FormAttributeCollection, FormComponent, FormSchema } from './types';
import {
  isComponentContainer,
  isComponentRepeating,
  isComponentValidForDataCarrying,
  isComponentVariable,
} from './utils/helper';
import { uniq } from 'lodash';

export interface RecordData {
  [key: string]: any;
}

export const removeRootObject = (obj: Record<string, any>) => {
  const childKeys = Object.keys(obj);
  if (childKeys.length === 1) {
    return obj[childKeys[0]];
  }
};

export const createDefaultValueFromFinalValue = (
  component: FormComponent | FormAttributeCollection,
) => (component.finalValue ? component.finalValue : '');
export const generateComponentAttributes = (component: FormComponent) => {
  const attributeValues =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]:
          createDefaultValueFromFinalValue(attributeCollection),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValues),
  };
};

export const generateRepeatingObject = (
  size: number,
  obj: unknown,
): unknown[] => {
  return Array.from({ length: size }, () => obj);
};

export const getMinNumberOfRepeatingToShow = (component: FormComponent) =>
  component.repeat?.minNumberOfRepeatingToShow ??
  component.repeat?.repeatMin ??
  0;

function createDefaultObjectForRepeating(
  component: FormComponent,
  currentComponentSameNameInData: boolean,
  defaultValues: {
    [p: string]:
      | string
      | number
      | (Record<string, never> | undefined)[]
      | unknown[]
      | undefined;
  },
  formDefaultObject:
    | { [p: string]: string; value: string }
    | { [p: string]: string },
) {
  const numberToShowFromStart = getMinNumberOfRepeatingToShow(component);

  if (currentComponentSameNameInData) {
    defaultValues[addAttributesToName(component, component.name)] =
      generateRepeatingObject(numberToShowFromStart, formDefaultObject);
  } else {
    defaultValues[component.name] = generateRepeatingObject(
      numberToShowFromStart,
      formDefaultObject,
    );
  }
}

function createDefaultValueForNonRepeating(
  currentComponentSameNameInData: boolean,
  defaultValues: any,
  component: FormComponent,
  formDefaultObject:
    | { [p: string]: string; value: string }
    | { [p: string]: string },
) {
  if (currentComponentSameNameInData) {
    defaultValues[addAttributesToName(component, component.name)] =
      formDefaultObject;
  } else {
    defaultValues[component.name] = formDefaultObject;
  }
}

export const createDefaultValuesFromComponent = (
  component: FormComponent,
  forceDefaultValuesForAppend = false,
  childWithSameNameInData: string[] = [],
) => {
  let defaultValues: {
    [x: string]:
      | string
      | number
      | (Record<string, never> | undefined)[]
      | undefined
      | unknown[];
  } = {};

  const childrenWithSameNameInData = getChildrenWithSameNameInData(
    getChildNameInDataArray(component),
  );
  const formDefaultObject = isComponentVariable(component)
    ? createDefaultValuesForVariable(component)
    : createDefaultValuesForGroup(component, childrenWithSameNameInData);

  if (forceDefaultValuesForAppend) {
    defaultValues = formDefaultObject;
  } else {
    const currentComponentSameNameInData = hasCurrentComponentSameNameInData(
      childWithSameNameInData,
      component.name,
    );
    if (isComponentRepeating(component)) {
      createDefaultObjectForRepeating(
        component,
        currentComponentSameNameInData,
        defaultValues,
        formDefaultObject,
      );
    } else {
      createDefaultValueForNonRepeating(
        currentComponentSameNameInData,
        defaultValues,
        component,
        formDefaultObject,
      );
    }
  }

  // remove surrounding container in or data structure
  if (isComponentContainer(component)) {
    return removeRootObject(defaultValues);
  }

  return defaultValues;
};

export const getChildNameInDataArray = (component: FormComponent) => {
  const nameArray: any[] = [];
  (component.components ?? []).forEach((childComponent) => {
    nameArray.push(childComponent.name);
  });
  return nameArray;
};

export const getChildrenWithSameNameInData = (childArray: string[]) => {
  const withoutSingles = childArray.filter(
    (item, index) => childArray.lastIndexOf(item) !== index,
  );

  return uniq(withoutSingles);
};

function createDefaultValuesForVariable(component: FormComponent) {
  return {
    value: createDefaultValueFromFinalValue(component),
    ...generateComponentAttributes(component),
  };
}

function createDefaultValuesForGroup(
  component: FormComponent,
  childrenWithSameNameInData: string[],
) {
  return {
    // groups
    ...createDefaultValuesFromComponents(
      component.components,
      childrenWithSameNameInData,
    ),
    ...generateComponentAttributes(component),
  };
}

export const createDefaultValuesFromComponents = (
  components: FormComponent[] | undefined,
  childrenWithSameNameInData?: string[],
): { [p: string]: any } => {
  const formDefaultValuesArray = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) =>
      createDefaultValuesFromComponent(
        formComponent,
        false,
        childrenWithSameNameInData,
      ),
    );
  return Object.assign({}, ...formDefaultValuesArray);
};

export const createDefaultValuesFromFormSchema = (
  formSchema: FormSchema,
  existingRecordData: RecordData | undefined = undefined,
) => {
  let defaultValues = createDefaultValuesFromComponent(formSchema.form);

  if (existingRecordData !== undefined) {
    defaultValues = mergeObjects(defaultValues, existingRecordData);
  }
  return defaultValues;
};

export const mergeObjects = (
  target: RecordData,
  overlay: RecordData,
): RecordData => {
  Object.entries(overlay).forEach(([key]) => {
    if (Object.hasOwn(overlay, key)) {
      if (
        typeof overlay[key] === 'object' &&
        overlay[key] !== null &&
        !Array.isArray(overlay[key])
      ) {
        assignNestedObjectValues(target, key, overlay);
      } else if (Array.isArray(overlay[key])) {
        assignArrayValues(target, key, overlay);
      } else {
        assignNonObjectValues(target, key, overlay);
      }
    }
  });
  return target;
};

const assignArrayValues = (
  target: RecordData,
  key: string,
  overlay: RecordData,
) => {
  target[key] = mergeArrays(target[key] || [], overlay[key]);
};

const assignNestedObjectValues = (
  target: RecordData,
  key: string,
  overlay: RecordData,
) => {
  target[key] = mergeObjects(target[key] || {}, overlay[key]);
};

const assignNonObjectValues = (
  target: RecordData,
  key: string,
  overlay: RecordData,
) => {
  target[key] = overlay[key];
};

export const mergeArrays = (target: any[], overlay: any[]): any[] => {
  const result = [...target];

  overlay.forEach((item, index) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      result[index] = item;
    }
  });

  return result;
};

export const addAttributesToName = (component: FormComponent, name: string) => {
  const nameArray: any[] = [];
  if (component.attributes === undefined) {
    return component.name;
  }
  (component.attributes ?? []).forEach((attribute) => {
    if (attribute.finalValue === undefined) {
      return component.name;
    }
    nameArray.push(`${attribute.name}_${attribute.finalValue}`);
  });

  return nameArray.length > 0 ? `${name}_${nameArray.join('_')}` : name;
};

export const hasCurrentComponentSameNameInData = (
  childArray: string[],
  componentName: string,
) => {
  return childArray.includes(componentName);
};
