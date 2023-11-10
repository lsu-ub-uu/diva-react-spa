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

import { listToPool } from '../../utils/structs/listToPool';
import {
  BFFGuiElement,
  BFFMetadata,
  BFFMetadataItemCollection,
  BFFPresentation,
  BFFPresentationSurroundingContainer,
  BFFPresentationGroup,
  BFFValidationType
} from '../../config/bffTypes';
import { Lookup } from '../../utils/structs/lookup';
import {
  someMetadataTextVariable,
  someMetadataNumberVar,
  someNewMetadataGroup,
  someNewMetadataGroupFaultyChildReference,
  someRecordInfo,
  someValidationTypeData,
  someValidationTypeDataFaultyChildReference,
  someMetadataTextVariable2,
  someMetadataCollectionVariable,
  someMetadataItemCollection,
  someMetadataCollectionItemBlue,
  someMetadataCollectionItemPink,
  someMetadataCollectionItemYellow,
  someMetadataTextVariable3,
  someMetadataTextVariable4,
  someMetadataTextVariable5,
  someMetadataCollectionVariableWithAttribute,
  someMetadataNumberVarWithAttribute,
  someMetadataTextVariableWithAttributeVar,
  someMetadataRecordLink,
  someMetadataChildGroup,
  someMetadataChildGroupWithSpecifiedHeadlineText,
  someMetadataChildGroupWithShowHeadlineFalse,
  pSomeMetadataTextVariable,
  pSomeNewMetadataGroup,
  pSomeMetadataNumberVar,
  pSomeMetadataTextVariable2,
  pSomeMetadataCollectionVariable,
  pSomeMetadataTextVariable3,
  pSomeMetadataTextVariable4,
  pSomeMetadataTextVariable5,
  pSomeMetadataCollectionVariableWithAttribute,
  pSomeMetadataNumberWithAttributeVar,
  pSomeMetadataTextVariableWithAttributeVar,
  pSomeMetadataChildGroup,
  pSomeMetadataRecordLink,
  pSomeContainer,
  pSomeGuiElementLink,
  pSomeRepeatingContainer,
  pSomeMetadataChildGroupWithSpecifiedHeadlineText,
  pSomeMetadataChildGroupWithShowHeadlineFalse,
  someNewSimpleMetadataGroup,
  someSimpleValidationTypeData,
} from '../../__mocks__/form/bffMock';
import {
  createFormDefinition,
  createFormMetaData,
  createFormMetaDataPathLookup,
  FormMetaData,
} from '../formDefinition';
import { Dependencies } from '../formDefinitionsDep';

describe('formDefinition', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  const FORM_MODE_NEW = 'new'; // todo handle edit
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference,
      someSimpleValidationTypeData
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>([
      someMetadataTextVariable,
      someMetadataTextVariable2,
      someMetadataTextVariable3,
      someMetadataTextVariable4,
      someMetadataTextVariable5,
      someMetadataNumberVar,
      someNewMetadataGroup,
      someRecordInfo,
      someNewMetadataGroupFaultyChildReference,
      someMetadataCollectionVariable,
      someMetadataItemCollection,
      someMetadataCollectionItemBlue,
      someMetadataCollectionItemPink,
      someMetadataCollectionItemYellow,
      someMetadataCollectionVariableWithAttribute,
      someMetadataNumberVarWithAttribute,
      someMetadataTextVariableWithAttributeVar,
      someMetadataChildGroup,
      someMetadataRecordLink,
      someMetadataChildGroupWithSpecifiedHeadlineText,
      someMetadataChildGroupWithShowHeadlineFalse,
      someNewSimpleMetadataGroup
    ]);
    presentationPool = listToPool<
      BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
    >([
      pSomeMetadataTextVariable,
      pSomeMetadataTextVariable2,
      pSomeMetadataTextVariable3,
      pSomeMetadataTextVariable4,
      pSomeMetadataTextVariable5,
      pSomeMetadataNumberVar,
      pSomeNewMetadataGroup,
      pSomeMetadataCollectionVariable,
      pSomeMetadataCollectionVariableWithAttribute,
      pSomeMetadataNumberWithAttributeVar,
      pSomeMetadataTextVariableWithAttributeVar,
      pSomeMetadataChildGroup,
      pSomeMetadataRecordLink,
      pSomeContainer,
      pSomeGuiElementLink,
      pSomeRepeatingContainer,
      pSomeMetadataChildGroupWithSpecifiedHeadlineText,
      pSomeMetadataChildGroupWithShowHeadlineFalse
    ]);
    dependencies = {
      validationTypePool: validationTypePool,
      metadataPool: metadataPool,
      presentationPool: presentationPool
    };
  });

  it('should generate something', () => {
    expect(validationTypePool.get('someValidationTypeId')).toBeDefined();
    expect(metadataPool.get('someNewMetadataGroupId')).toBeDefined();
    expect(metadataPool.get('someMetadataTextVariableId')).toBeDefined();
    expect(presentationPool.get('pSomeMetadataTextVariableId')).toBeDefined();
  });

  it('should throw Error on invalid ValidationType', () => {
    const invalidValidationType = 'someInvalidValidationType';

    expect(() => {
      createFormDefinition(dependencies, invalidValidationType, FORM_MODE_NEW);
    }).toThrow(Error);

    try {
      createFormDefinition(dependencies, invalidValidationType, FORM_MODE_NEW);
    } catch (error: unknown) {
      const createFormDefinitionError: Error = <Error>error;
      expect(createFormDefinitionError.message).toStrictEqual(
        '[someInvalidValidationType] does not exist in Lookup pool'
      );
    }
  });

  it('should throw Error on invalid child reference id', () => {
    const validationTypeId = 'someValidationTypeDataFaultyChildReferenceId';

    expect(() => {
      createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    }).toThrow(Error);

    try {
      createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    } catch (error: unknown) {
      const createFormDefinitionError: Error = <Error>error;
      expect(createFormDefinitionError.message).toStrictEqual(
        'Child reference with childId [someNewMetadataGroupId] does not exist'
      );
    }
  });

  it('should return a form definition', () => {
    const validationTypeId = 'someValidationTypeId';
    const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    expect(formDefinition.form.components).toHaveLength(16);
    expect(formDefinition).toStrictEqual({
      validationTypeId: validationTypeId,
      form: {
        type: 'group',
        label: 'textId345',
        presentationStyle: 'card',
        name: 'someNewMetadataGroupNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678'
        },
        attributes: [
          {
            finalValue: 'pink',
            label: 'exampleCollectionVarText',
            mode: 'input',
            name: 'colour',
            options: [
              {
                label: 'exampleBlueItemText',
                value: 'blue'
              },
              {
                label: 'examplePinkItemText',
                value: 'pink'
              },
              {
                label: 'exampleYellowItemText',
                value: 'yellow'
              }
            ],
            placeholder: 'initialEmptyValueText',
            tooltip: {
              body: 'exampleCollectionVarDefText',
              title: 'exampleCollectionVarText'
            },
            type: 'collectionVariable'
          }
        ],
        components: [
          {
            type: 'text',
            name: 'someHeadlineTextId',
            textStyle: 'bold'
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
            placeholder: 'someEmptyTextId',
            label: 'someTextId',
            childStyle: ['style3', 'style4'],
            repeat: {
              repeatMin: 1,
              repeatMax: 3
            },
            tooltip: {
              title: 'someTextId',
              body: 'someDefTextId'
            },
            validation: {
              type: 'regex',
              pattern: 'someRegex'
            },
            mode: 'input',
            inputType: 'input'
          },
          {
            type: 'textVariable',
            name: 'someNameInData2',
            label: 'someOtherLabelTextId', // overridden label
            placeholder: 'someEmptyTextId',
            childStyle: ['style3', 'style4'],
            repeat: {
              repeatMin: 1,
              repeatMax: Number.MAX_VALUE
            },
            tooltip: {
              title: 'someTextId',
              body: 'someDefTextId'
            },
            validation: {
              type: 'regex',
              pattern: 'someRegex'
            },
            mode: 'input', // output
            inputType: 'input' //textarea
          },
          {
            type: 'textVariable',
            name: 'someNameInData3',
            label: 'someTextId',
            placeholder: 'someEmptyTextId',
            childStyle: ['style3', 'style4'],
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'someTextId',
              body: 'someDefTextId'
            },
            validation: {
              type: 'regex',
              pattern: 'someRegex'
            },
            mode: 'input', // output
            inputType: 'input', //textarea
            finalValue: 'someFinalValue'
          },
          {
            type: 'numberVariable',
            name: 'someNameInDataNumberVar',
            label: '',
            childStyle: ['style3', 'style4'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 0,
              repeatMax: 1,
              minNumberOfRepeatingToShow: 1
            },
            tooltip: {
              title: 'someNumberVarTextId',
              body: 'someNumberVarDefTextId'
            },
            validation: {
              type: 'number',
              min: 0,
              max: 20,
              warningMin: 2,
              warningMax: 10,
              numberOfDecimals: 0
            },
            mode: 'input'
          },
          {
            type: 'collectionVariable',
            name: 'colour',
            finalValue: 'pink',
            label: 'exampleCollectionVarText',
            childStyle: ['style3', 'style4'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText'
            },
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' }
            ],
            mode: 'input'
          },
          {
            type: 'collectionVariable',
            name: 'colourAttributeVar',
            label: 'exampleCollectionVarText',
            childStyle: ['style3', 'style4'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText'
            },
            attributes: [
              {
                finalValue: 'pink',
                type: 'collectionVariable',
                name: 'colour',
                label: 'exampleCollectionVarText',
                placeholder: 'initialEmptyValueText',
                tooltip: {
                  title: 'exampleCollectionVarText',
                  body: 'exampleCollectionVarDefText'
                },
                options: [
                  { value: 'blue', label: 'exampleBlueItemText' },
                  { value: 'pink', label: 'examplePinkItemText' },
                  { value: 'yellow', label: 'exampleYellowItemText' }
                ],
                mode: 'input'
              }
            ],
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' }
            ],
            mode: 'input'
          },
          {
            type: 'numberVariable',
            name: 'someNameInDataNumberWithAttributeVar',
            label: 'someNumberVarTextId',
            childStyle: [],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'someNumberVarTextId',
              body: 'someNumberVarDefTextId'
            },
            attributes: [
              {
                finalValue: 'pink',
                type: 'collectionVariable',
                name: 'colour',
                label: 'exampleCollectionVarText',
                placeholder: 'initialEmptyValueText',
                tooltip: {
                  title: 'exampleCollectionVarText',
                  body: 'exampleCollectionVarDefText'
                },
                options: [
                  { value: 'blue', label: 'exampleBlueItemText' },
                  { value: 'pink', label: 'examplePinkItemText' },
                  { value: 'yellow', label: 'exampleYellowItemText' }
                ],
                mode: 'input'
              }
            ],
            validation: {
              type: 'number',
              min: 0,
              max: 20,
              warningMin: 2,
              warningMax: 10,
              numberOfDecimals: 0
            },
            mode: 'input'
          },
          {
            type: 'textVariable',
            name: 'someNameInDataTextWithAttrib',
            label: 'someTextId',
            childStyle: [],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'someTextId',
              body: 'someDefTextId'
            },
            attributes: [
              {
                type: 'collectionVariable',
                name: 'colour',
                finalValue: 'pink',
                label: 'exampleCollectionVarText',
                placeholder: 'initialEmptyValueText',
                tooltip: {
                  title: 'exampleCollectionVarText',
                  body: 'exampleCollectionVarDefText'
                },
                options: [
                  { value: 'blue', label: 'exampleBlueItemText' },
                  { value: 'pink', label: 'examplePinkItemText' },
                  { value: 'yellow', label: 'exampleYellowItemText' }
                ],
                mode: 'input'
              }
            ],
            validation: {
              type: 'regex',
              pattern: 'someRegex'
            },
            mode: 'input',
            inputType: 'input'
          },
          {
            type: 'group',
            label: 'someChildGroupTextId',
            childStyle: [],
            presentationStyle: 'someMetadataChildGroupPresentationStyle',
            name: 'someChildGroupNameInData',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'someChildGroupTextId',
              body: 'someChildGroupDefTextId'
            },
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData',
                label: 'someTextId',
                childStyle: ['style3', 'style4'],
                placeholder: 'someEmptyTextId',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1
                },
                tooltip: {
                  title: 'someTextId',
                  body: 'someDefTextId'
                },
                validation: {
                  type: 'regex',
                  pattern: 'someRegex'
                },
                mode: 'input',
                inputType: 'input'
              }
            ],
            mode: 'input'
          },
          {
            type: 'recordLink',
            name: 'nationalSubjectCategory',
            label: 'nationalSubjectCategoryLinkText',
            childStyle: [],
            mode: 'input',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'nationalSubjectCategoryLinkText',
              body: 'nationalSubjectCategoryLinkDefText'
            }
          },
          {
            type: 'container',
            name: 'pSomeContainerId',
            presentationStyle: 'card', // frame
            containerType: 'surrounding',
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData4',
                label: 'someTextId',
                childStyle: ['5'],
                placeholder: 'someEmptyTextId',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 3,
                  minNumberOfRepeatingToShow: 1
                },
                tooltip: {
                  title: 'someTextId',
                  body: 'someDefTextId'
                },
                validation: {
                  type: 'regex',
                  pattern: 'someRegex'
                },
                mode: 'input',
                inputType: 'input'
              }
            ],
            mode: 'input'
          },
          {
            name: 'pSomeGuiElementLinkId',
            url: 'http://www.google.se',
            elementText: 'demoTestLinkGuiElementText',
            presentAs: 'link',
            type: 'guiElementLink'
          },
          {
            type: 'container',
            name: 'pSomeRepeatingContainerId',
            presentationStyle: 'label',
            containerType: 'repeating',
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData5',
                label: 'someTextId',
                childStyle: ['5'],
                placeholder: 'someEmptyTextId',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 3,
                  minNumberOfRepeatingToShow: 1
                },
                tooltip: {
                  title: 'someTextId',
                  body: 'someDefTextId'
                },
                validation: {
                  type: 'regex',
                  pattern: 'someRegex'
                },
                mode: 'input',
                inputType: 'input'
              }
            ],
            mode: 'input'
          },
          {
            type: 'group',
            label: 'someOtherHeadlineTextId',
            headlineLevel: 'h3',
            childStyle: [],
            presentationStyle: 'someMetadataChildGroupPresentationStyle',
            name: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'someChildGroupTextId',
              body: 'someChildGroupDefTextId'
            },
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData',
                label: 'someTextId',
                childStyle: ['style3', 'style4'],
                placeholder: 'someEmptyTextId',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1
                },
                tooltip: {
                  title: 'someTextId',
                  body: 'someDefTextId'
                },
                validation: {
                  type: 'regex',
                  pattern: 'someRegex'
                },
                mode: 'input',
                inputType: 'input'
              }
            ],
            mode: 'input'
          },
          {
            type: 'group',
            label: '',
            childStyle: [],
            presentationStyle: 'someMetadataChildGroupPresentationStyle',
            name: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
            repeat: {
              repeatMin: 1,
              repeatMax: 1
            },
            tooltip: {
              title: 'someChildGroupTextId',
              body: 'someChildGroupDefTextId'
            },
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData',
                label: 'someTextId',
                childStyle: ['style3', 'style4'],
                placeholder: 'someEmptyTextId',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1
                },
                tooltip: {
                  title: 'someTextId',
                  body: 'someDefTextId'
                },
                validation: {
                  type: 'regex',
                  pattern: 'someRegex'
                },
                mode: 'input',
                inputType: 'input'
              }
            ],
            mode: 'input'
          }
        ],
        mode: 'input'
      }
    });
  });

  it('should return form meta data for a given validation type', () => {
    const validationTypeId = 'someSimpleValidationTypeId';
    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);

    const expected: FormMetaData = {
      name: 'someNewMetadataGroupNameInData',
      type: 'group',
      repeat: {
        repeatMin: 1,
        repeatMax: 1
      },
      children: [
        {
          name: 'someNameInData',
          type: 'textVariable',
          repeat: {
            repeatMin: 1,
            repeatMax: 3
          }
        },
        {
          name: 'someChildGroupNameInData',
          type: 'group',
          repeat: {
            repeatMin: 1,
            repeatMax: 1
          },
          children: [
            {
              name: 'someNameInData',
              type: 'textVariable',
              repeat: {
                repeatMin: 1,
                repeatMax: 1
              }
            }
          ]
        },
        {
          name: 'nationalSubjectCategory',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          type: 'recordLink',
          linkedRecordType: 'nationalSubjectCategory',
        }
      ]
    };

    const expectedMetadataLookup = {
      'someNewMetadataGroupNameInData': {
        'name': 'someNewMetadataGroupNameInData',
        'repeat': {
          'repeatMax': 1,
          'repeatMin': 1
        },
        'type': 'group'
      },
      'someNewMetadataGroupNameInData.nationalSubjectCategory': {
        'name': 'nationalSubjectCategory',
        'repeat': {
          'repeatMax': 1,
          'repeatMin': 1
        },
        'type': 'recordLink',
        'linkedRecordType': 'nationalSubjectCategory'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData': {
        'name': 'someChildGroupNameInData',
        'repeat': {
          'repeatMax': 1,
          'repeatMin': 1
        },
        'type': 'group'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData.someNameInData': {
        'name': 'someNameInData',
        'repeat': {
          'repeatMax': 1,
          'repeatMin': 1
        },
        'type': 'textVariable'
      },
      'someNewMetadataGroupNameInData.someNameInData': {
        'name': 'someNameInData',
        'repeat': {
          'repeatMax': 3,
          'repeatMin': 1
        },
        'type': 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });
});
