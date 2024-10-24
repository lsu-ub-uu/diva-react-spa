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

import * as yup from 'yup';
import {
  AnyObject,
  ObjectSchema,
  ObjectShape,
  TestConfig,
  TestContext,
} from 'yup';
import {
  FormAttributeCollection,
  FormComponent,
  FormComponentRepeat,
  FormNumberValidation,
  FormRegexValidation,
  FormSchema,
} from '../types';
import {
  checkForExistingSiblings,
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRequired,
  isComponentSingularAndOptional,
  isComponentValidForDataCarrying,
  isParentGroupOptional,
  isSiblingComponentRequired,
} from './helper';
import {
  getChildArrayWithSameNameInData,
  getChildrenWithSameNameInData,
} from '../FormGenerator';
import {
  addAttributesToName,
  hasCurrentComponentSameNameInData,
} from '../utils';

export const generateYupSchemaFromFormSchema = (formSchema: FormSchema) => {
  const rule = createYupValidationsFromComponent(formSchema.form);
  const obj = Object.assign({}, ...[rule]) as ObjectShape;
  return yup.object().shape(obj);
};

export const createYupValidationsFromComponent = (
  component: FormComponent,
  parentComponentRepeating: boolean = false,
  parentGroupRepeating: boolean = false,
  childWithSameNameInData: string[] = [],
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
  const currentNameInData = hasCurrentComponentSameNameInData(
    childWithSameNameInData,
    component.name,
  )
    ? addAttributesToName(component, component.name)
    : component.name;
  if (isComponentRepeating(component)) {
    if (isComponentGroup(component)) {
      console.log('group', component.name, isComponentRepeating(component));
      const innerObjectSchema = generateYupSchema(
        component.components,
        isParentGroupOptional(component) || parentComponentRepeating,
        isComponentRepeating(component),
      );
      // Create a new schema by merging the existing schema and attribute fields
      const extendedSchema = yup.object().shape({
        ...innerObjectSchema.fields,
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
      validationRule[currentNameInData] = createYupArrayFromSchema(
        extendedSchema,
        component.repeat,
      );
    } else {
      console.log('var', component.name);
      // repeating variables
      const extendedSchema = yup.object().shape({
        value: createValidationFromComponentType(component),
        ...createValidationForAttributesFromComponent(
          component,
          false,
          isSiblingComponentRequired(component),
          isParentGroupOptional(component),
        ),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

      validationRule[component.name] = createYupArrayFromSchema(
        extendedSchema,
        component.repeat,
      );
    }
  } else {
    // non-repeating group
    console.log('group', component.name, isComponentRepeating(component));
    if (isComponentGroup(component)) {
      const childrenWithSameNameInData = getChildrenWithSameNameInData(
        getChildArrayWithSameNameInData(component),
      );
      const innerSchema = generateYupSchema(
        component.components,
        parentComponentRepeating,
        undefined,
        childrenWithSameNameInData,
      );
      validationRule[currentNameInData] = yup.object().shape({
        ...innerSchema.fields,
        ...createValidationForAttributesFromComponent(
          component,
          parentComponentRepeating,
          false,
          parentGroupRepeating,
        ),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    } else {
      validationRule[currentNameInData] = yup.object().shape({
        value: createValidationFromComponentType(
          component,
          false,
          parentComponentRepeating,
          undefined,
          isSiblingComponentRequired(component),
        ),
        ...createValidationForAttributesFromComponent(
          component,
          isComponentRepeating(component),
          isSiblingComponentRequired(component),
        ),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    }
  }

  return validationRule;
};

export const generateYupSchema = (
  components: FormComponent[] | undefined,
  parentGroupOptional: boolean = false,
  groupOptional: boolean = false,
  childrenWithSameNameInData: string[] = [],
) => {
  const validationsRules = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => {
      return createYupValidationsFromComponent(
        formComponent,
        parentGroupOptional,
        groupOptional,
        childrenWithSameNameInData,
      );
    });

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const createValidationForAttributesFromComponent = (
  component: FormComponent,
  siblingRepeat?: boolean,
  siblingRequired?: boolean,
  parentGroupRequired?: boolean,
) => {
  const attributeValidation =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: createValidationFromComponentType(
          attributeCollection,
          true,
          isComponentRequired(component),
          siblingRepeat,
          siblingRequired,
          parentGroupRequired,
        ),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValidation),
  };
};

export const createYupArrayFromSchema = (
  schema:
    | ObjectSchema<
        { [x: string]: unknown },
        AnyObject,
        Record<string, never>,
        'd'
      >
    | ObjectSchema<{ [x: string]: unknown }, AnyObject>,
  repeat: FormComponentRepeat | undefined,
) => {
  return yup
    .array()
    .of(schema)
    .min(repeat?.repeatMin ?? 1)
    .max(repeat?.repeatMax ?? 1);
};

export const createValidationFromComponentType = (
  component: FormComponent | FormAttributeCollection,
  isAttribute?: boolean,
  isParentRequired?: boolean,
  siblingRepeat?: boolean,
  siblingRequired?: boolean,
  parentGroupRequired?: boolean,
) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(
        component as FormComponent,
        isParentRequired,
        siblingRequired,
      );
    case 'numberVariable':
      return createYupNumberSchema(
        component as FormComponent,
        isParentRequired,
        siblingRequired,
      );
    default: // collectionVariable, recordLink
      return createYupStringSchema(
        component as FormComponent,
        isAttribute,
        isParentRequired,
        siblingRepeat,
        siblingRequired,
        parentGroupRequired,
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
  isParentComponentOptional: boolean = false,
  isSiblingRequired: boolean = false,
) => {
  const regexpValidation = component.validation as FormRegexValidation;
  if (
    isParentComponentOptional &&
    isSiblingRequired &&
    isComponentRequired(component)
  ) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        'Invalid input format',
      )
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (isParentComponentOptional) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        'Invalid input format',
      );
  }

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
export const createYupNumberSchema = (
  component: FormComponent,
  isParentComponentOptional: boolean = false,
  isSiblingRequired: boolean = false,
) => {
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

  if (
    isParentComponentOptional &&
    isSiblingRequired &&
    isComponentRequired(component)
  ) {
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
      )
      .test(testOptionalParentAndRequiredSiblingFormWholeContextWithValue);
  }

  if (isParentComponentOptional) {
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
  isParentComponentOptional: boolean = false,
  variableForAttributeRepeat: boolean = false,
  siblingComponentRequired: boolean = false,
  grandParentGroupRequired: boolean = false,
) => {
  if (isAttribute && grandParentGroupRequired) {
    return yup
      .string()
      .nullable()
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (
    isParentComponentOptional &&
    siblingComponentRequired &&
    isComponentRequired(component)
  ) {
    return yup
      .string()
      .nullable()
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (isParentComponentOptional && isAttribute && siblingComponentRequired) {
    return yup.string().when('value', ([value]) => {
      if (value === null || value === '') {
        return yup.string().nullable();
      }
      return yup.string().required();
    });
  }

  if (isParentComponentOptional && isAttribute && !variableForAttributeRepeat) {
    return yup.string().required();
  }

  if (isAttribute && !isParentComponentOptional) {
    return yup.string().when('value', ([value]) => {
      return value !== null || value !== ''
        ? yup.string().nullable().test(testAttributeHasVariableWithValue)
        : yup.string().required();
    });
  }

  if (isComponentRequired(component)) {
    return yup.string().required();
  }

  if (isComponentRepeating(component) || isParentComponentOptional) {
    return generateYupSchemaForCollections();
  }

  return yup.string().required();
};

const testOptionalParentAndRequiredSiblingFormWholeContextWithValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'checkIfStringVariableHasSiblingsWithValuesInContext',
  message: 'This variable is required',
  test: (value, context) => {
    if (
      !value &&
      !checkForExistingSiblings(
        context.from && context.from[context.from.length - 2].value,
      )
    ) {
      return true;
    }
    if (
      !value &&
      checkForExistingSiblings(
        context.from && context.from[context.from.length - 2].value,
      )
    ) {
      return false;
    }

    return true;
  },
};

const testOptionalParentAndRequiredSiblingWithValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'checkIfStringVariableHasSiblingsWithValues',
  message: 'This variable is required',
  test: (value, context) => {
    if (
      !value &&
      !checkForExistingSiblings(context.from && context.from[1].value)
    ) {
      return true;
    }
    if (
      !value &&
      checkForExistingSiblings(context.from && context.from[1].value)
    ) {
      return false;
    }

    return true;
  },
};

const testAttributeHasVariableWithValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'checkIfVariableHasSiblingsWithValues',
  message: 'This attribute is for a variable with value',
  test: (value, context) => {
    return (checkForExistingSiblings(value) ||
      testSiblingValueAndValueExistingValue(context, value) ||
      testSiblingValueAndValueForNotExistingValue(context, value)) as boolean;
  },
};

const generateYupSchemaForCollections = () => {
  return yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .when('$isNotNull', (isNotNull, field) =>
      isNotNull[0] ? field.required('not valid') : field,
    );
};

const testSiblingValueAndValueForNotExistingValue = (
  context: TestContext<AnyObject>,
  value: string | undefined | null,
): boolean => {
  return (
    !checkForExistingSiblings(context.from && context.from[0].value) && !value
  );
};

const testSiblingValueAndValueExistingValue = (
  context: TestContext<AnyObject>,
  value: string | undefined | null,
) => {
  return (
    checkForExistingSiblings(context.from && context.from[0].value) && value
  );
};
