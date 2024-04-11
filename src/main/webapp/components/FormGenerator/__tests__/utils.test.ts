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
import {
  createDefaultValuesFromComponent,
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
} from '../utils';
import {
  formComponentGroup,
  formComponentGroupAndTextVariableWithinGroup,
  formComponentGroupWithChildren,
  formComponentGroupWithinGroupWithAttributes,
  formComponentRepeatingTextVariable,
  formDef,
  formDefRealDemo,
  formDefRealDemoWithAttributes,
  formDefRealDemoWithFinalValues,
  formDefRealDemoWithRepeatingGroups,
  formDefRealDemoWithRepeatingVars,
  formDefWithNestedSurroundingContainers,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithRepeatingCollectionVar,
  formDefWithRepeatingGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes,
  formDefWithSurroundingContainerAroundTextVariable,
  formDefWithTwoRepeatingVarsAndCollectionVar,
  formDefWithARepeatingContainer,
  formDefWithOneRepeatingTextVariable,
  formDefRealDemoWithAttributesButWithoutFinalValue,
} from '../../../__mocks__/data/formDef';
import { FormSchema } from '../types';
import { removeEmpty } from '../../../utils/removeEmpty';

const numberValidationTests = (
  min: number,
  max: number,
  numberOfDecimals: number,
) => [
  { name: 'matches', params: { regex: /^[1-9]\d*(\.\d+)?$/ } },
  { name: 'decimal-places', params: { numberOfDecimals } },
  { name: 'min', params: { min } },
  { name: 'max', params: { max } },
];

const stringValidationTests = (regex: RegExp) => [
  { name: 'matches', params: { regex } },
];

const requiredValidationTests = [{ name: 'required' }];

const minMaxValidationTests = () => [{ name: 'min' }];

const validationTestsExtras = () => {
  return {
    label: undefined,
    meta: undefined,
    notOneOf: [],
    nullable: false,
    oneOf: [],
  };
};

describe('FormGenerator Utils', () => {
  describe('generate defaultValues', () => {
    it('createDefaultValuesFromFormSchema should take a formDef and make default values object', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          someNameInData: {
            value: '',
          },
          someNumberVariableNameInData: {
            value: '',
          },
        },
      };
      const actualDefaultValues = createDefaultValuesFromFormSchema(
        formDef as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromFormSchema should take a formDef with a surrounding container and make default values object with that object level left out', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          someNameInData: {
            value: '',
          },
        },
      };
      const actualDefaultValues = createDefaultValuesFromFormSchema(
        formDefWithSurroundingContainerAroundTextVariable as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromFormSchema should take a formDef with a repeating container and make default values object with that object level left out', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          someNameInData: [
            {
              value: '',
            },
            {
              value: '',
            },
          ],
        },
      };
      const actualDefaultValues = createDefaultValuesFromFormSchema(
        formDefWithARepeatingContainer as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    // group
    it('createDefaultValuesFromFormSchema should take a more complex formDef with groups and make default values object', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          bookTitle: {
            value: '',
          },
          keeptHis: [
            {
              value: '',
            },
          ],
          firstChildGroup: {
            exampleNumberVar: {
              value: '',
            },
            exampleTextVar: {
              value: '',
            },
          },
          recordInfo: {},
        },
      };
      const actualDefaultValues = createDefaultValuesFromFormSchema(
        formDefRealDemo as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromFormSchema should take a more complex formDef with repeating groups and make default values object', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          bookTitle: {
            value: '',
          },
          keeptHis: [
            {
              value: '',
            },
          ],
          firstChildGroup: [
            {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                value: '',
              },
            },
            {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                value: '',
              },
            },
          ],
          recordInfo: {},
        },
      };
      const actualDefaultValues = createDefaultValuesFromFormSchema(
        formDefRealDemoWithRepeatingGroups as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromComponent should construct a default value object for repeating component', () => {
      const expectedDefaultValues = {
        exampleNumberVar: {
          value: '',
        },
        exampleTextVar: {
          value: '',
        },
      };
      const actualDefaultValues = createDefaultValuesFromComponent(
        formComponentGroup,
        true,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromComponent should construct a default value object for complex children in repeating component', () => {
      const expectedDefaultValues = {
        exampleNumberVar: [
          {
            value: '',
          },
        ],
        exampleTextVar: [
          {
            value: '',
          },
          {
            value: '',
          },
        ],
      };
      const actualDefaultValues = createDefaultValuesFromComponent(
        formComponentGroupWithChildren,
        true,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromComponent should construct a default value object for group within group having repeating vars and minNumberToShow set', () => {
      const expectedDefaultValues = {
        exampleTextVar: {
          value: '',
        },
        innerChildGroup: [
          {
            exampleNumberVar: [
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
            ],
            exampleTextVar: {
              value: '',
            },
          },
          {
            exampleNumberVar: [
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
              {
                value: '12',
              },
            ],
            exampleTextVar: {
              value: '',
            },
          },
        ],
      };
      const actualDefaultValues = createDefaultValuesFromComponent(
        formComponentGroupAndTextVariableWithinGroup,
        true,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromComponent should construct a default value object for group with attributes and attributes for vars within group', () => {
      const expectedDefaultValues = {
        _firstChildGroupColor: 'yellow',
        _firstChildGroupSecondAttribute: '',
        secondChildGroup: [
          {
            exampleNumberVar: {
              value: '',
            },
            exampleTextVar: {
              _colour: '',
              value: '',
            },
          },
        ],
      };
      const actualDefaultValues = createDefaultValuesFromComponent(
        formComponentGroupWithinGroupWithAttributes,
        true,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromComponent should construct a default value object for textVariable component', () => {
      const expectedDefaultValues = {
        value: '',
      };
      const actualDefaultValues = createDefaultValuesFromComponent(
        formComponentRepeatingTextVariable,
        true,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    it('createDefaultValuesFromFormSchema should construct a default value object for one single group having textVar as child component', () => {
      const expectedDefaultValues = {
        someRootNameInData: {
          someChildGroupNameInData: {
            someNameInData: {
              value: '',
            },
          },
        },
      };

      const actualDefaultValues = createDefaultValuesFromFormSchema(
        formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
      );
      expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
    });

    describe('finalValues', () => {
      it('createDefaultValuesFromFormSchema should take a more complex formDef with finalValue default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'someFinalValue',
            },
            keeptHis: [
              {
                value: '12',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '55',
              },
              exampleTextVar: {
                value: 'someText',
              },
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithFinalValues as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('attributes', () => {
      it('createDefaultValuesFromFormSchema should take a more complex formDef with groups and attributes and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
              _colour: '',
            },
            keeptHis: [
              {
                value: '',
                _colour: '',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                _colour: '',
                _colourAgain: 'pink',
                value: 'exampleFinalValue',
              },
              _groupColour: '',
              _groupColourAgain: 'pink',
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithAttributes as FormSchema,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('repeating vars', () => {
      it('createDefaultValuesFromFormSchema should take a more complex formDef with groups and repeating variables and make default values object', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
            },
            keeptHis: [
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: 'blue',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: [
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
                {
                  value: '',
                  _colour: 'pink',
                },
              ],
              exampleTextVar: [],
            },
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithRepeatingVars as FormSchema,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });

    describe('generate overrides from existing record (edit form)', () => {
      it('should take a formDef and make default values object but also take defaultValue override', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: {
              value: 'testValue',
            },
            someNumberVariableNameInData: {
              value: '',
            },
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            someNameInData: {
              value: 'testValue',
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDef as FormSchema,
          existingRecordData,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a formDef with repeating textVar and make default values object but also take defaultValue override', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            someNameInData: [
              {
                value: 'testValue',
              },
              {
                value: '',
              },
              {
                value: '',
              },
            ],
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            someNameInData: [
              {
                value: 'testValue',
              },
            ],
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefWithOneRepeatingTextVariable as FormSchema,
          existingRecordData,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with groups and make default values object with overrides', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'testBookTitle',
            },
            keeptHis: [
              {
                value: 'override',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '12',
              },
              exampleTextVar: {
                value: '',
              },
            },
            recordInfo: {},
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            bookTitle: {
              value: 'testBookTitle',
            },
            keeptHis: [
              {
                value: 'override',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '12',
              },
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemo as FormSchema,
          existingRecordData,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with groups and attributes and make default values object with overrides', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: '',
              _colour: 'yellow',
            },
            keeptHis: [
              {
                value: '',
                _colour: 'blue',
              },
              {
                value: '',
                _colour: '',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '',
              },
              exampleTextVar: {
                _colour: 'yellow',
                _colourAgain: 'pink',
                value: 'someEditedValue',
              },
              _groupColour: 'pink',
              _groupColourAgain: 'blue',
            },
            recordInfo: {},
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            bookTitle: {
              value: '',
              _colour: 'yellow',
            },
            keeptHis: [
              {
                value: '',
                _colour: 'blue',
              },
            ],
            firstChildGroup: {
              exampleTextVar: {
                _colour: 'yellow',
                _colourAgain: 'pink',
                value: 'someEditedValue',
              },
              _groupColour: 'pink',
              _groupColourAgain: 'blue',
            },
            recordInfo: {},
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithAttributesButWithoutFinalValue as FormSchema,
          existingRecordData,
        );

        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      it('should take a more complex formDef with repeating groups and make default values object with overrides', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'Moby Dick',
            },
            keeptHis: [
              {
                value: '',
              },
            ],
            firstChildGroup: [
              {
                exampleNumberVar: {
                  value: '12',
                },
                exampleTextVar: {
                  value: 'SomeTextVar',
                },
              },
              {
                exampleNumberVar: {
                  value: '',
                },
                exampleTextVar: {
                  value: '',
                },
              },
            ],
            recordInfo: {},
          },
        };

        const existingDataRecord = {
          someRootNameInData: {
            bookTitle: {
              value: 'Moby Dick',
            },
            firstChildGroup: [
              {
                exampleNumberVar: {
                  value: '12',
                },
                exampleTextVar: {
                  value: 'SomeTextVar',
                },
              },
            ],
            recordInfo: {},
          },
        };
        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithRepeatingGroups as FormSchema,
          existingDataRecord,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });

      test.skip('should take a more complex formDef with finalValue default values object without overrides taking effect', () => {
        const expectedDefaultValues = {
          someRootNameInData: {
            bookTitle: {
              value: 'someFinalValue',
            },
            keeptHis: [
              {
                value: '12',
              },
            ],
            firstChildGroup: {
              exampleNumberVar: {
                value: '55',
              },
              exampleTextVar: {
                value: 'someText',
              },
            },
            recordInfo: {},
          },
        };

        const existingRecordData = {
          someRootNameInData: {
            bookTitle: {
              value: 'someValueFromServerThatWillNeverBeSavedEverAgain',
            },
          },
        };

        const actualDefaultValues = createDefaultValuesFromFormSchema(
          formDefRealDemoWithFinalValues as FormSchema,
          existingRecordData,
        );
        expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
      });
    });
  });

  it('should take a tree and be able to add full name paths', () => {
    const expected = [
      {
        name: 'person',
        type: 'group',
        repeat: true,
        path: 'person',
        components: [
          {
            name: 'name',
            type: 'group',
            repeat: true,
            components: [
              {
                name: 'firstName',
                type: 'textVariable',
                repeat: false,
                path: 'person.name.firstName',
                components: [],
              },
              {
                name: 'lastName',
                path: 'person.name.lastName',
                type: 'textVariable',
                repeat: false,
                components: [],
              },
            ],
            path: 'person.name',
          },
          {
            name: 'age',
            type: 'numberVariable',
            repeat: false,
            path: 'person.age',
            components: [],
          },
        ],
      },
    ];

    interface TestComponentLight {
      name: string;
      type: 'group' | 'textVariable' | 'numberVariable';
      repeat: boolean;
      path?: string; // path template
      components: TestComponentLight[];
    }

    const createFormDefWithPaths = (
      data: TestComponentLight[],
      parentPath = '',
    ): unknown => {
      return data.map((node: TestComponentLight) => {
        const nodePath = `${parentPath}.${node.name}`;
        const components = createFormDefWithPaths(node.components, nodePath);

        return {
          ...node,
          path: nodePath.slice(1),
          components,
        } as TestComponentLight;
      });
    };

    const rootComponents: TestComponentLight[] = [
      {
        name: 'person',
        type: 'group',
        repeat: true,
        components: [
          {
            name: 'name',
            type: 'group',
            repeat: true,
            components: [
              {
                name: 'firstName',
                type: 'textVariable',
                repeat: false,
                components: [],
              },
              {
                name: 'lastName',
                type: 'textVariable',
                repeat: false,
                components: [],
              },
            ],
          },
          {
            name: 'age',
            type: 'numberVariable',
            repeat: false,
            components: [],
          },
        ],
      },
    ];

    const actual = createFormDefWithPaths(rootComponents);
    expect(actual).toStrictEqual(expected);
  });

  describe('generate yupSchema', () => {
    it('should return correct validationSchema for one textVar and one numberVar', () => {
      const yupSchema = generateYupSchemaFromFormSchema(formDef as FormSchema);
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            someNameInData: {
              type: 'object',
              fields: {
                value: {
                  type: 'string',
                  tests: stringValidationTests(/^[a-zA-Z]$/),
                },
              },
            },
            someNumberVariableNameInData: {
              type: 'object',
              fields: {
                value: {
                  type: 'string',
                  tests: numberValidationTests(0, 20, 0),
                },
              },
            },
          },
        },
      };
      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it('should return correct validationSchema for one textVar with a surrounding container', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithSurroundingContainerAroundTextVariable as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            someNameInData: {
              type: 'object',
              fields: {
                value: {
                  type: 'string',
                },
              },
            },
          },
        },
      };
      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it('should return correct validationSchema for with nested surrounding containers', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithNestedSurroundingContainers as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            someNameInData: {
              type: 'object',
              fields: {
                value: {
                  type: 'string',
                },
              },
            },
          },
        },
      };
      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it('should return correct validationSchema for two repeating variables', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithTwoRepeatingVarsAndCollectionVar as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          ...validationTestsExtras(),
          optional: true,
          tests: [],
          type: 'object',
          default: {
            colour: {
              value: undefined,
            },
            someNameInData: undefined,
            someNumberVariableNameInData: undefined,
          },

          fields: {
            someNameInData: {
              ...validationTestsExtras(),
              default: undefined,
              type: 'array',
              optional: true,
              tests: [
                {
                  name: 'min',
                  params: {
                    min: 0,
                  },
                },
                {
                  name: 'max',
                  params: {
                    max: 2,
                  },
                },
              ],
              innerType: {
                ...validationTestsExtras(),
                optional: true,
                tests: [],
                type: 'object',
                default: {
                  value: undefined,
                },
                fields: {
                  value: {
                    default: undefined,
                    ...validationTestsExtras(),
                    optional: true,
                    type: 'string',
                    tests: [
                      {
                        name: 'matches',
                        params: {
                          regex: /^[a-zA-Z]$/,
                        },
                      },
                    ],
                    nullable: true,
                  },
                },
              },
            },
            someNumberVariableNameInData: {
              default: undefined,
              innerType: {
                default: {
                  value: undefined,
                },
                ...validationTestsExtras(),
                fields: {
                  value: {
                    default: undefined,
                    ...validationTestsExtras(),
                    optional: true,
                    type: 'string',
                    tests: numberValidationTests(0, 20, 2),
                  },
                },
                optional: true,
                type: 'object',
                ...validationTestsExtras(),
                tests: [],
              },
              ...validationTestsExtras(),
              optional: true,
              tests: [
                {
                  name: 'min',
                  params: {
                    min: 1,
                  },
                },
                {
                  name: 'max',
                  params: {
                    max: 5,
                  },
                },
              ],
              type: 'array',
            },
            colour: {
              default: {
                value: undefined,
              },
              type: 'object',
              ...validationTestsExtras(),
              optional: true,
              tests: [],
              fields: {
                value: {
                  default: undefined,
                  ...validationTestsExtras(),
                  optional: false,
                  type: 'string',
                  tests: [
                    {
                      name: 'required',
                      params: undefined,
                    },
                  ],
                },
              },
            },
          },
        },
      };
      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it.skip('should return correct validationSchema for one repeating collectionVariable', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRepeatingCollectionVar as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            colour: {
              type: 'array',
              tests: minMaxValidationTests(), // 0, 3
              innerType: {
                fields: {
                  value: {
                    type: 'string',
                    nullable: true,
                    optional: true,
                  },
                },
              },
            },
          },
        },
      };
      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it('should return correct validationSchema for one group having a text variable', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            someChildGroupNameInData: {
              type: 'object',
              fields: {
                someNameInData: {
                  type: 'object',
                  fields: {
                    value: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      };
      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it.skip('should return correct validationSchema for repeating group having a text variable', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRepeatingGroup as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            firstChildGroup: {
              type: 'array',
              tests: minMaxValidationTests(), // 0, 10
              innerType: {
                fields: {
                  exampleNumberVar: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                        tests: numberValidationTests(0, 20, 2),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it.skip('should return correct validationSchema for repeating group having repeating child group with two name fields', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRepeatingGroupWithRepeatingChildGroup as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            author: {
              type: 'array',
              tests: minMaxValidationTests(), // 1, 10
              innerType: {
                fields: {
                  name: {
                    type: 'array',
                    tests: minMaxValidationTests(), // 1, 100
                    innerType: {
                      fields: {
                        firstName: {
                          type: 'object',
                          fields: {
                            value: {
                              type: 'string',
                            },
                          },
                        },
                        lastName: {
                          type: 'object',
                          fields: {
                            value: {
                              type: 'string',
                            },
                          },
                        },
                        age: {
                          type: 'object',
                          fields: {
                            value: {
                              type: 'string',
                              tests: numberValidationTests(0, 125, 0),
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(actualSchema).toMatchObject(expectedSchema);
    });

    it.skip('should return correct validationSchema for repeating group having repeating child group with two name fields and different attributes', () => {
      const yupSchema = generateYupSchemaFromFormSchema(
        formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes as FormSchema,
      );
      const actualSchema = yupSchema.describe().fields;

      const expectedSchema = {
        someRootNameInData: {
          type: 'object',
          fields: {
            grade: {
              type: 'array',
              tests: minMaxValidationTests(), // 1, 12
              innerType: {
                type: 'object',
                fields: {
                  _gradeAttribute: {
                    type: 'string',
                    tests: requiredValidationTests,
                  },
                  value: {
                    type: 'string',
                    tests: numberValidationTests(1, 5, 0),
                  },
                },
              },
            },
            nonRepeatingGroup: {
              type: 'object',
              fields: {
                _groupAttribute: {
                  type: 'string',
                  tests: requiredValidationTests,
                },
              },
            },
            author: {
              type: 'array',
              tests: minMaxValidationTests(), // 1, 10
              innerType: {
                fields: {
                  _colourAttribute: {
                    // attribute values are always required
                    type: 'string',
                    tests: requiredValidationTests,
                  },
                  name: {
                    type: 'array',
                    tests: minMaxValidationTests(), // 1, 100
                    innerType: {
                      fields: {
                        firstName: {
                          type: 'object',
                          fields: {
                            value: {
                              type: 'string',
                            },
                            _colourAttribute: {
                              type: 'string',
                              tests: requiredValidationTests,
                            },
                          },
                        },
                        lastName: {
                          type: 'object',
                          fields: {
                            value: {
                              type: 'string',
                            },
                          },
                        },
                        age: {
                          type: 'object',
                          fields: {
                            value: {
                              type: 'string',
                              tests: numberValidationTests(0, 125, 0),
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(actualSchema).toMatchObject(expectedSchema);
    });
  });

  describe('custom validate yupSchemas for array schemas', () => {
    it('should validate a list with a simple leaf value object being empty in the array', async () => {
      const optionalStringSchema = yup
        .string()
        .nullable()
        .transform((value) => (value === '' ? null : value))
        .when('$isNotNull', (isNotNull, field) =>
          isNotNull[0] ? field.required() : field,
        );

      const schema = yup.object({
        testArray: yup
          .array()
          .min(1)
          .max(3)
          .transform((array) =>
            array
              .map(removeEmpty)
              .filter((o: any) => Object.keys(o).length > 0),
          )
          .of(
            yup.object().shape({
              value: optionalStringSchema,
            }),
          ),
      });
      const data = {
        testArray: [{ value: '' }, { value: '' }, { value: 'test' }],
      };

      const actualData = await schema.validate(data);
      const expectedData = {
        testArray: [{ value: 'test' }],
      };
      expect(expectedData).toStrictEqual(actualData);
    });
  });
});
