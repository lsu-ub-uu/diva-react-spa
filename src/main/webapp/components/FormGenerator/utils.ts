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

import * as yup from 'yup';
import { AnyObject, ObjectSchema, ObjectShape, TestConfig } from 'yup';

import {
  FormAttributeCollection,
  FormComponent,
  FormComponentRepeat,
  FormNumberValidation,
  FormRegexValidation,
  FormSchema,
} from './types';

export interface RecordData {
  [key: string]: any;
}

export const removeRootObject = (obj: object) => {
  const childKeys = Object.keys(obj);
  if (childKeys.length === 1) {
    // @ts-ignore
    return obj[childKeys[0]];
  }
};

export const createDefaultValue = (
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

export const createDefaultValuesFromComponent = (
  component: FormComponent,
  forceDefaultValuesForAppend = false,
) => {
  let defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | unknown[];
  } = {};

  const formDefaultObject = isComponentVariable(component)
    ? {
        value: createDefaultValue(component),
        ...generateComponentAttributes(component),
      }
    : {
        // groups
        ...createDefaultValuesFromComponents(component.components),
        ...generateComponentAttributes(component),
      };

  if (forceDefaultValuesForAppend) {
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

  // remove surrounding container in or data structure
  if (isComponentContainer(component)) {
    return removeRootObject(defaultValues);
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
        // Recursively merge nested objects
        target[key] = mergeObjects(target[key] || {}, overlay[key]);
      } else if (Array.isArray(overlay[key])) {
        // Handle arrays
        target[key] = mergeArrays(target[key] || [], overlay[key]);
      } else {
        // Assign non-object values directly
        target[key] = overlay[key];
      }
    }
  });
  return target;
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

export const createYupArrayFromSchema = (
  schema:
    | ObjectSchema<{ [x: string]: unknown }, AnyObject, {}, 'd'>
    | ObjectSchema<{ [x: string]: unknown }, AnyObject>,
  repeat: FormComponentRepeat | undefined,
) => {
  return yup
    .array()
    .of(schema)
    .min(repeat?.repeatMin ?? 1)
    .max(repeat?.repeatMax ?? 1);
};

export const createValidationForAttributesFromComponent = (
  component: FormComponent,
) => {
  const attributeValidation =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: createValidationFromComponentType(
          attributeCollection,
          true,
          isComponentRequired(component),
        ),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValidation),
  };
};

export const createValidationFromComponentType = (
  component: FormComponent | FormAttributeCollection,
  isAttribute?: boolean,
  isComponentRequired?: boolean,
) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(
        component as FormComponent,
        isComponentRequired,
      );
    case 'numberVariable':
      return createYupNumberSchema(component as FormComponent);
    default: // collectionVariable, recordLink
      return createYupStringSchema(
        component as FormComponent,
        isAttribute,
        isComponentRequired,
      );
  }
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
const createYupStringRegexpSchema = (
  component: FormComponent,
  isParentComponentRequired: boolean = false,
) => {
  const regexpValidation = component.validation as FormRegexValidation;

  if (isComponentRepeating(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        'Invalid input format',
      );
  }

  return yup
    .string()
    .matches(
      new RegExp(regexpValidation.pattern ?? '.+'),
      'Invalid input format',
    );
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
export const createYupNumberSchema = (component: FormComponent) => {
  const numberValidation = component.validation as FormNumberValidation;
  const { numberOfDecimals, min, max } = numberValidation;

  const testDecimals: TestConfig<string | null | undefined, AnyObject> = {
    name: 'decimal-places',
    message: 'Invalid number of decimals', // todo translation
    params: { numberOfDecimals },
    test: (value) => {
      if (!value) return true;
      const decimalPlaces = (value.split('.')[1] || []).length;
      return decimalPlaces === numberOfDecimals;
    },
  };

  const testMin: TestConfig<string | null | undefined, AnyObject> = {
    name: 'min',
    message: 'Invalid range (min)',
    params: { min },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return min <= numValue;
    },
  };

  const testMax: TestConfig<string | null | undefined, AnyObject> = {
    name: 'max',
    message: 'Invalid range (max)',
    params: { max },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return max >= numValue;
    },
  };

  if (isComponentSingularAndOptional(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull
          ? field
              .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
              .test(testDecimals)
              .test(testMax)
              .test(testMin)
          : field,
      );
  }

  return yup
    .string()
    .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
    .test(testDecimals)
    .test(testMin)
    .test(testMax);
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
const createYupStringSchema = (
  component: FormComponent,
  isAttribute: boolean = false,
  isParentComponentRequired: boolean = false,
) => {
  if (isComponentRepeating(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull[0] ? field.required('not valid') : field,
      );
  }

  if (isAttribute && !isParentComponentRequired) {
    return yup.string().when('value', ([value]) => {
      return value !== null || value !== ''
        ? yup.string().nullable()
        : yup.string().required();
    });
  }

  return yup.string().required();
};

export const createYupValidationsFromComponent = (
  component: FormComponent,
  isParentComponentRepeating: boolean = false,
) => {
  let validationRule: {
    [x: string]: any;
  } = {};
  // remove surrounding container in yup validation structure
  if (isComponentContainer(component)) {
    const validationsRules = (component.components ?? [])
      .filter(isComponentValidForDataCarrying)
      .map((formComponent) => createYupValidationsFromComponent(formComponent));
    validationRule = Object.assign({}, ...validationsRules);
    return validationRule;
  }
  // eslint-disable-next-line no-lonely-if
  if (isComponentRepeating(component)) {
    if (isComponentGroup(component)) {
      const innerObjectSchema = generateYupSchema(component.components);

      // Create a new schema by merging the existing schema and attribute fields
      const extendedSchema = yup.object().shape({
        ...innerObjectSchema.fields,
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
      validationRule[component.name] = createYupArrayFromSchema(
        extendedSchema,
        component.repeat,
      );
    } else {
      // repeating variables
      const extendedSchema = yup.object().shape({
        value: createValidationFromComponentType(component),
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

      validationRule[component.name] = createYupArrayFromSchema(
        extendedSchema,
        component.repeat,
      );
    }
  } else {
    // non-repeating group
    // eslint-disable-next-line no-lonely-if
    if (isComponentGroup(component)) {
      const innerSchema = generateYupSchema(component.components);
      validationRule[component.name] = yup.object().shape({
        ...innerSchema.fields,
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    } else {
      validationRule[component.name] = yup.object().shape({
        value: createValidationFromComponentType(
          component,
          false,
          isParentComponentRepeating,
        ),
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    }
  }

  return validationRule;
};

const generateYupSchema = (components: FormComponent[] | undefined) => {
  const validationsRules = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => createYupValidationsFromComponent(formComponent));

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const generateYupSchemaFromFormSchema = (formSchema: FormSchema) => {
  const rule = createYupValidationsFromComponent(formSchema.form);
  const obj = Object.assign({}, ...[rule]) as ObjectShape;
  return yup.object().shape(obj);
};

const countStringCharOccurrences = (
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
