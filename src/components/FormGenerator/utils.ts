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

// eslint-disable-next-line import/no-cycle
import * as yup from 'yup';
import { ObjectShape } from 'yup';
import {
  FormAttributeCollection,
  FormComponent,
  FormNumberValidation,
  FormRegexValidation,
  FormSchema,
} from './types';

export const hasComponentAttributes = (component: FormComponent) =>
  component.attributes ? component.attributes.length > 0 : false;

export const isComponentVariable = (component: FormComponent) =>
  ['numberVariable', 'textVariable', 'collectionVariable'].includes(
    component.type,
  );

export const isComponentGroup = (component: FormComponent) =>
  component.type === 'group';

export const isComponentValidForDataCarrying = (component: FormComponent) =>
  isComponentVariable(component) || isComponentGroup(component);

export const isComponentTextVariable = (component: FormComponent) =>
  component.type === 'textVariable';

export const isComponentNumberVariable = (component: FormComponent) =>
  component.type === 'numberVariable';

export const isComponentCollectionVariable = (component: FormComponent) =>
  component.type === 'collectionVariable';

export const isComponentRepeating = (component: FormComponent) =>
  !(component.repeat?.repeatMax === 1 && component.repeat?.repeatMin === 1);

export const isComponentOptional = (component: FormComponent) =>
  component.repeat?.repeatMin === 0 ?? false;

const createDefaultValue = (
  component: FormComponent | FormAttributeCollection,
) => (component.finalValue ? component.finalValue : '');

export const generateComponentAttributes = (component: FormComponent) => {
  const attributeValues =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]:
          createDefaultValue(attributeCollection),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValues),
  };
};

const generateRepeatingObject = (size: number, obj: unknown): unknown[] => {
  return Array.from({ length: size }, () => obj);
};

const getMinNumberOfRepeatingToShow = (component: FormComponent) =>
  component.repeat?.minNumberOfRepeatingToShow ?? 0;

export const createDefaultValuesFromComponent = (
  component: FormComponent,
  forceComponentToShow = false,
) => {
  let defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | any;
  } = {};

  const formDefaultObject = isComponentVariable(component)
    ? {
        value: createDefaultValue(component),
        ...generateComponentAttributes(component),
      }
    : {
        // groups
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        ...createDefaultValuesFromComponents(component.components),
        ...generateComponentAttributes(component),
      };

  if (forceComponentToShow) {
    defaultValues = formDefaultObject;
  } else {
    // eslint-disable-next-line no-lonely-if
    if (isComponentRepeating(component)) {
      const numberToShowFromStart = getMinNumberOfRepeatingToShow(component);
      defaultValues[component.name] = generateRepeatingObject(
        numberToShowFromStart,
        formDefaultObject,
      );
    } else {
      defaultValues[component.name] = formDefaultObject;
    }
  }

  return defaultValues;
};

export const createDefaultValuesFromComponents = (
  components: FormComponent[] | undefined,
): { [p: string]: any } => {
  const formDefaultValuesArray = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => createDefaultValuesFromComponent(formComponent));
  return Object.assign({}, ...formDefaultValuesArray);
};

export const createDefaultValuesFromFormSchema = (formSchema: FormSchema) => {
  // do we need some more stuff here?
  return createDefaultValuesFromComponents(formSchema.components);
};

/**
 * YUP Validation
 */

const createYupStringRegexpSchema = (component: FormComponent) => {
  const regexpValidation = component.validation as FormRegexValidation;
  return yup
    .string()
    .matches(
      new RegExp(regexpValidation.pattern ?? '.+'),
      'Invalid input format',
    );
};

const createYupNumberSchema = (component: FormComponent) => {
  const numberValidation = component.validation as FormNumberValidation;
  return yup
    .string()
    .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
    .test('decimal-places', 'Invalid number of decimals', (value) => {
      if (!value) return true;
      const decimalPlaces = (value.split('.')[1] || []).length;
      return decimalPlaces === numberValidation.numberOfDecimals;
    })
    .test('min', 'Invalid range (min)', (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return numberValidation.min <= numValue;
    })
    .test('max', 'Invalid range (max)', (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return numberValidation.max >= numValue;
    });
};

const createValidationFromComponentType = (component: FormComponent) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(component);
    case 'numberVariable':
      return createYupNumberSchema(component);
    default: // collectionVariable
      return yup.string().required();
  }
};

export const createYupValidationsFromComponent = (component: FormComponent) => {
  const validationRule: {
    [x: string]: any;
  } = {};
  const shape = yup
    .object()
    .default({})
    .shape({ value: createValidationFromComponentType(component) });
  validationRule[component.name] = shape;
  return validationRule;
};

export const createArray = (shape: ObjectShape) => {
  return yup.array().of(yup.object(shape));
};

// this gets called recursively
export const generateYupSchema = (components: FormComponent[]) => {
  const validationsRules = (components ?? [])
    .filter(isComponentVariable)
    .map((formComponent) => createYupValidationsFromComponent(formComponent));

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const generateYupSchemaFromFormSchema = (formSchema: FormSchema) => {
  return generateYupSchema(formSchema.components);
};
