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
  BFFValidationType,
  BFFAttributeReference,
  BFFMetadataTextVariable,
  BFFMetadataCollectionVariable,
  BFFMetadataChildReference
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
  someMetadataTextVariable6,
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
  pSomeMetadataTextVariable6,
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
  pSomeEditMetadataGroup,
  someEditMetadataGroup,
  someManuscriptGroup,
  pSomeManuscriptGroup,
  pSomeManuscriptContainer,
  someArchiveNumberTextVar,
  someLocalIdTextVar,
  someScopusIdTextVar,
  pSomeArchiveNumberTextVar,
  pSomeLocalIdTextVar,
  pSomeScopusIdTextVar,
  someValidationTypeForMissingChildIdTypeData,
  someNewMetadataGroupForMissingChildId,
  pSomeNewMetadataGroupForMissingChildId,
  pSomeOtherMetadataCollectionVariableWithMissingChildId,
  exampleOtherCollectionVarId,
  someMainTitleTextVariable,
  someMetadataNumberVarWithoutAttribute,
  someMetadataNumberVarWithAttributeAndOtherId,
  someMetadataNumberVarWithOtherAttributeId,
  someMetadataCollectionWithOtherIdVariable,
  someMetadataCollectionVariable2
} from '../../__mocks__/form/bffMock';
import {
  convertStylesToGridColSpan,
  createFormDefinition,
  createFormMetaData,
  createFormMetaDataPathLookup,
  findMetadataChildReferenceByNameInDataAndAttributes,
  firstAttributesExistsInSecond,
  FormMetaData,
  getAttributesForAttributeReferences
} from '../formDefinition';
import { Dependencies } from '../formDefinitionsDep';

describe('formDefinition', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  const FORM_MODE_NEW = 'create';
  const FORM_MODE_EDIT = 'update';
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference,
      someSimpleValidationTypeData,
      someValidationTypeForMissingChildIdTypeData
    ]);
    metadataPool = listToPool<BFFMetadata>([
      someMetadataTextVariable,
      someMetadataTextVariable2,
      someMetadataTextVariable3,
      someMetadataTextVariable4,
      someMetadataTextVariable5,
      someMetadataTextVariable6,
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
      someNewSimpleMetadataGroup,
      someEditMetadataGroup,
      someArchiveNumberTextVar,
      someManuscriptGroup,
      someLocalIdTextVar,
      someScopusIdTextVar,
      someNewMetadataGroupForMissingChildId,
      exampleOtherCollectionVarId,
      someMainTitleTextVariable,
      someMetadataNumberVarWithoutAttribute,
      someMetadataNumberVarWithAttributeAndOtherId,
      someMetadataNumberVarWithOtherAttributeId,
      someMetadataCollectionWithOtherIdVariable,
      someMetadataCollectionVariable2
    ]);
    presentationPool = listToPool<
      BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
    >([
      pSomeMetadataTextVariable,
      pSomeMetadataTextVariable2,
      pSomeMetadataTextVariable3,
      pSomeMetadataTextVariable4,
      pSomeMetadataTextVariable5,
      pSomeMetadataTextVariable6,
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
      pSomeMetadataChildGroupWithShowHeadlineFalse,
      pSomeEditMetadataGroup,
      pSomeManuscriptGroup,
      pSomeManuscriptContainer,
      pSomeArchiveNumberTextVar,
      pSomeLocalIdTextVar,
      pSomeScopusIdTextVar,
      pSomeNewMetadataGroupForMissingChildId,
      pSomeOtherMetadataCollectionVariableWithMissingChildId
    ]);
    dependencies = {
      validationTypePool,
      metadataPool,
      presentationPool
    };
  });
  const createTextVar = (
    id: string,
    nameInData: string,
    attributeReferenceIds: string[]
  ): BFFMetadataTextVariable => {
    const metadata: BFFMetadataTextVariable = {
      id,
      nameInData,
      type: 'textVariable',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      regEx: '.*'
    };
    if (attributeReferenceIds.length > 0) {
      const attributeIds = attributeReferenceIds?.map((attrId) => {
        return {
          refCollectionVarId: attrId
        };
      });
      metadata.attributeReferences = attributeIds;
    }
    addToPool(metadata);
    return metadata;
  };

  const createCollItem = (nameInData: string): BFFMetadata => {
    const metadata: BFFMetadata = {
      id: `${nameInData}Item`,
      nameInData,
      type: 'collectionItem',
      textId: 'someTextId',
      defTextId: 'someDefTextId'
    };

    addToPool(metadata);
    return metadata;
  };

  const createItemCollection = (
    id: string,
    nameInData: string,
    itemIds: string[]
  ): BFFMetadataItemCollection => {
    const metadata: BFFMetadataItemCollection = {
      id,
      nameInData,
      type: 'itemCollection',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      collectionItemReferences: []
    };
    const collectionItemReferences = itemIds?.map((itemId) => {
      return {
        refCollectionItemId: itemId
      };
    });
    metadata.collectionItemReferences = collectionItemReferences;

    addToPool(metadata);
    return metadata;
  };

  const createCollVar = (
    id: string,
    nameInData: string,
    values: string[],
    attributeReferenceIds: string[]
  ): BFFMetadataCollectionVariable => {
    const metadata: BFFMetadataCollectionVariable = {
      id,
      nameInData,
      type: 'collectionVariable',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      refCollection: `${id}Collection`
    };

    if (attributeReferenceIds.length > 0) {
      const attributeIds = attributeReferenceIds?.map((attrId) => {
        return {
          refCollectionVarId: attrId
        };
      });
      metadata.attributeReferences = attributeIds;
    }
    addToPool(metadata);

    const itemIds = values.map((value: string) => `${value}Item`);
    createItemCollection(`${id}Collection`, 'someNameInData', itemIds);

    values.forEach((value: string) => createCollItem(value));

    return metadata;
  };

  const addToPool = (metadata: BFFMetadata) => {
    metadataPool.set(metadata.id, metadata);
  };

  const createChildReferences = (childrenIds: string[]): BFFMetadataChildReference[] => {
    return childrenIds.map((childId) => {
      return {
        childId,
        repeatMin: '1',
        repeatMax: '3'
      };
    });
  };

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

  it('should return a form definition for a new metadata group', () => {
    const validationTypeId = 'someValidationTypeId';
    const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    expect(formDefinition.form.components).toHaveLength(18);
    expect(formDefinition).toStrictEqual({
      validationTypeId,
      form: {
        type: 'group',
        label: 'textId345',
        gridColSpan: 12,
        childStyle: [],
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
            textStyle: 'bold',
            gridColSpan: 12,
            childStyle: ['twelveChildStyle']
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
            placeholder: 'someEmptyTextId',
            label: 'someTextId',
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            inputType: 'input' // textarea
          },
          {
            type: 'textVariable',
            name: 'someNameInData3',
            label: 'someTextId',
            placeholder: 'someEmptyTextId',
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            inputType: 'input', // textarea
            finalValue: 'someFinalValue'
          },
          {
            type: 'textVariable',
            name: 'someNameInData6',
            label: 'someTextId',
            placeholder: 'someEmptyTextId',
            gridColSpan: 12,
            childStyle: [],
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
            mode: 'output', // output
            inputType: 'input' // textarea
          },
          {
            type: 'numberVariable',
            name: 'someNameInDataNumberVar',
            label: '',
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
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
            gridColSpan: 12,
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
            gridColSpan: 12,
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
                gridColSpan: 3,
                childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
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
            gridColSpan: 12,
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData4',
                label: 'someTextId',
                gridColSpan: 6,
                childStyle: ['sixChildStyle'],
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
            childStyle: [],
            name: 'pSomeGuiElementLinkId',
            gridColSpan: 12,
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
            gridColSpan: 12,
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData5',
                label: 'someTextId',
                gridColSpan: 6,
                childStyle: ['sixChildStyle'],
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
            gridColSpan: 12,
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
                gridColSpan: 3,
                childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
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
                gridColSpan: 3,
                childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'someManuscriptGroupNameInData',
            presentationStyle: '',
            repeat: {
              repeatMax: 1,
              repeatMin: 1
            },
            tooltip: {
              body: 'defTextId678',
              title: 'textId345'
            },
            type: 'group',
            childStyle: [],
            components: [
              {
                containerType: 'surrounding',
                gridColSpan: 12,
                mode: 'input',
                name: 'pSomeManuscriptIdContainer',
                presentationStyle: '',
                type: 'container',
                childStyle: [],
                components: [
                  {
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                    label: 'someTextId',
                    mode: 'input',
                    name: 'archiveNumber',
                    placeholder: 'someEmptyTextId',
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMax: 1,
                      repeatMin: 1
                    },
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId'
                    },
                    type: 'textVariable',
                    validation: {
                      pattern: 'someRegex',
                      type: 'regex'
                    }
                  },
                  {
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                    label: 'someTextId',
                    mode: 'input',
                    name: 'localId',
                    placeholder: 'someEmptyTextId',
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMax: 1,
                      repeatMin: 1
                    },
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId'
                    },
                    type: 'textVariable',
                    validation: {
                      pattern: 'someRegex',
                      type: 'regex'
                    }
                  }
                ]
              }
            ]
          }
        ],
        mode: 'input'
      }
    });
  });

  it('should return a form definition for a edit metadata group', () => {
    // TODO: Add all the combinations from the newMetadataGroup
    const validationTypeId = 'someValidationTypeId';
    const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_EDIT);
    expect(formDefinition.form.components).toHaveLength(16);
    expect(formDefinition).toStrictEqual({
      validationTypeId,
      form: {
        type: 'group',
        label: 'textId345',
        gridColSpan: 12,
        childStyle: [],
        presentationStyle: 'card',
        name: 'someEditMetadataGroupNameInData',
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
            name: 'someEditHeadlineTextId',
            textStyle: 'bold',
            gridColSpan: 12,
            childStyle: ['twelveChildStyle']
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
            placeholder: 'someEmptyTextId',
            label: 'someTextId',
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            inputType: 'input' // textarea
          },
          {
            type: 'textVariable',
            name: 'someNameInData3',
            label: 'someTextId',
            placeholder: 'someEmptyTextId',
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            inputType: 'input', // textarea
            finalValue: 'someFinalValue'
          },
          {
            type: 'numberVariable',
            name: 'someNameInDataNumberVar',
            label: '',
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
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
            gridColSpan: 12,
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
            gridColSpan: 12,
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
                gridColSpan: 3,
                childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
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
            gridColSpan: 12,
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData4',
                label: 'someTextId',
                gridColSpan: 6,
                childStyle: ['sixChildStyle'],
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
            childStyle: [],
            name: 'pSomeGuiElementLinkId',
            gridColSpan: 12,
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
            gridColSpan: 12,
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someNameInData5',
                label: 'someTextId',
                gridColSpan: 6,
                childStyle: ['sixChildStyle'],
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
            gridColSpan: 12,
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
                gridColSpan: 3,
                childStyle: ['threeChildStyle'],
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
            gridColSpan: 12,
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
                gridColSpan: 3,
                childStyle: ['threeChildStyle'],
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

  it('should return a form definition for a new metadata group matching nameInData when childId does not match', () => {
    // TODO: Add all the combinations from the newMetadataGroup
    const validationTypeId = 'someValidationTypeForMissingChildIdTypeId';
    const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    expect(formDefinition.form.components).toHaveLength(1);
    expect(formDefinition).toStrictEqual({
      validationTypeId,
      form: {
        type: 'group',
        gridColSpan: 12,
        childStyle: [],
        presentationStyle: 'card',
        name: 'divaOutput',
        repeat: {
          repeatMin: 1,
          repeatMax: 1
        },
        tooltip: {
          title: '',
          body: ''
        },
        label: '',
        components: [
          {
            type: 'collectionVariable',
            name: 'colour',
            label: 'exampleCollectionVarText',
            gridColSpan: 12,
            finalValue: 'pink',
            childStyle: ['twelveChildStyle'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 0,
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
          }
        ],
        mode: 'input'
      }
    });
  });

  describe('converting childStyles to gridColspan', () => {
    it('should be able to convert one threeChildStyle to grid col span to be number 3', () => {
      const styles = ['threeChildStyle'];
      const expected = 3;
      const gridColSpan = convertStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(expected);
    });

    it('should be able to convert one twelveChildStyle to grid col span to be number 12', () => {
      const styles = ['twelveChildStyle'];
      const expected = 12;
      const gridColSpan = convertStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(expected);
    });

    it('should be able to convert empty childStyle to grid col span to be default number 12', () => {
      const styles: string[] = [];
      const expected = 12;
      const gridColSpan = convertStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(expected);
    });

    it('should be able to convert childStyle containing other settings to grid col span to be default number 12', () => {
      const styles: string[] = ['inline', 'frame'];
      const expected = 12;
      const gridColSpan = convertStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(expected);
    });

    it('should be able to convert childStyle containing other settings and a fiveChildStyle to grid col span to be default number 5', () => {
      const styles: string[] = ['inline', 'frame', 'fiveChildStyle'];
      const expected = 5;
      const gridColSpan = convertStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(expected);
    });

    it('should be able to convert childStyle containing other settings and multiple numberChildStyle to take the first being 2', () => {
      const styles: string[] = ['inline', 'twoChildStyle', 'frame', 'fiveChildStyle'];
      const expected = 2;
      const gridColSpan = convertStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(expected);
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
          linkedRecordType: 'nationalSubjectCategory'
        }
      ]
    };

    const expectedMetadataLookup = {
      someNewMetadataGroupNameInData: {
        name: 'someNewMetadataGroupNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someNewMetadataGroupNameInData.nationalSubjectCategory': {
        name: 'nationalSubjectCategory',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'recordLink',
        linkedRecordType: 'nationalSubjectCategory'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData': {
        name: 'someChildGroupNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'group'
      },
      'someNewMetadataGroupNameInData.someChildGroupNameInData.someNameInData': {
        name: 'someNameInData',
        repeat: {
          repeatMax: 1,
          repeatMin: 1
        },
        type: 'textVariable'
      },
      'someNewMetadataGroupNameInData.someNameInData': {
        name: 'someNameInData',
        repeat: {
          repeatMax: 3,
          repeatMin: 1
        },
        type: 'textVariable'
      }
    };

    expect(formMetaData).toStrictEqual(expected);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
  });

  describe('findMetadataChildReferenceByNameInDataAndAttributes', () => {
    it('findMetadataChildReferenceByNameInDataAndAttributes with correct nameInData', () => {
      const test = findMetadataChildReferenceByNameInDataAndAttributes(
        dependencies.metadataPool,
        someNewMetadataGroupForMissingChildId.children,
        someMetadataCollectionVariable
      );
      expect(test).toStrictEqual({
        childId: 'exampleCollectionVarId',
        repeatMax: '1',
        repeatMin: '0'
      });
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes equal nameInData`, () => {
      const textVar1 = createTextVar('textVar1', 'someNameInData', []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', []);
      const childRefs = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes unequal nameInData`, () => {
      const textVar1 = createTextVar('textVar1', 'someNameInData', []);
      const textVar2 = createTextVar('textVar2', 'someNameInDataNOT', []);
      const childRefs = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
    and unequal number of attributes`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const attribute11 = createCollVar('attribute11', 'attributeName11', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id, attribute11.id]);
      const attribute2 = createCollVar('attribute2', 'attributeName', ['value1', 'value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const childRefs = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and same attributes`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute1.id]);
      const childRefs = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const attribute2 = createCollVar('attribute2', 'attributeName', ['value1', 'value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const children = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        children,
        textVar2
      );

      expect(actual).toStrictEqual(children[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes multiple children to find in`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const attribute2 = createCollVar('attribute2', 'attributeName', ['value1', 'value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const textVar3 = createTextVar('textVar3', 'someNameInData3', [attribute2.id]);
      const childRefs = createChildReferences([textVar1.id, textVar3.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
        and same number of attributes but different nameInData of attribute`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const attribute2 = createCollVar('attribute2', 'attributeNameNOT', ['value1', 'value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const childRefs = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different value of attribute`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const attribute2 = createCollVar('attribute2', 'attributeName', ['valueNOT1', 'value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const childRefs = createChildReferences([textVar1.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        textVar2
      );
      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different wider value of attribute in presentation`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const attribute2 = createCollVar('attribute2', 'attributeName', ['value1', 'value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const childRefsForCurrentGroup = createChildReferences([textVar1.id]);
      const metadataFromPresentation = textVar2;

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        metadataFromPresentation
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different more specific value of attribute in 
      presentation`, () => {
      const attribute1 = createCollVar('attribute1', 'attributeName', ['value1', 'value2'], []);
      const textVar1 = createTextVar('textVar1', 'someNameInData', [attribute1.id]);
      const attribute2 = createCollVar('attribute2', 'attributeName', ['value2'], []);
      const textVar2 = createTextVar('textVar2', 'someNameInData', [attribute2.id]);
      const childRefsForCurrentGroup = createChildReferences([textVar1.id]);
      const metadataFromPresentation = textVar2;

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        metadataFromPresentation
      );
      expect(actual).toBe(undefined);
    });

    // FINAL VALUE FOR ATTRIBUTES

    describe('firstAttributesExistsInSecond', () => {
      it('testSameAttributeUndefined', () => {
        const actual = firstAttributesExistsInSecond(undefined, undefined);
        expect(actual).toBe(true);
      });

      it('testSameAttributeOneUndefined', () => {
        const actual = firstAttributesExistsInSecond({}, undefined);
        expect(actual).toBe(true);
        const actual2 = firstAttributesExistsInSecond(undefined, {});
        expect(actual2).toBe(true);
      });

      it('testSameAttributeEmpty', () => {
        const actual = firstAttributesExistsInSecond({}, {});
        expect(actual).toBe(true);
      });

      it('testSameAttributeOneEmpty', () => {
        const attribute1 = {
          anAttribute: ['aFinalValue']
        };
        const attribute2 = {};
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(false);
      });

      it('testfirstAttributesExistsInSecond', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testfirstAttributesExistsInSecondReversedAttributes', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentAttributeValues2', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentAttributeValues3', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues4', () => {
        const attribute1 = {
          someNameInData: ['aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues5', () => {
        const attribute1 = {
          someNameInData: ['aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aOtherFinalValue', 'aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues6', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aOtherFinalValue', 'aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferent', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const attribute2 = {
          someNameInDataNOT: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentName', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue']
        };
        const attribute2 = {
          someNameInDataNOT: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(false);
      });

      it('testMultipleAttributesDifferentName', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(true);
      });

      it('testMultipleAttributesDifferentName2', () => {
        const attribute1 = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aOtherFinalValue']
        };
        const attribute2 = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(attribute1, attribute2);
        expect(actual).toBe(false);
      });
    });

    describe('getAttributesForAttributeReferences', () => {
      it('should return an object with nameInData and item values', () => {
        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: 'exampleCollectionVarId' }
        ];
        const actual = getAttributesForAttributeReferences(
          dependencies.metadataPool,
          attributeReferences
        );
        const expected = { colour: ['blue', 'pink', 'yellow'] };
        expect(actual).toStrictEqual(expected);
      });

      it('should return an object with nameInData and item values for multiple attributes', () => {
        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: 'exampleCollectionVarId' },
          { refCollectionVarId: 'exampleCollectionVarId2' }
        ];
        const actual = getAttributesForAttributeReferences(
          dependencies.metadataPool,
          attributeReferences
        );
        const expected = {
          colour: ['blue', 'pink', 'yellow'],
          colour2: ['blue', 'pink', 'yellow']
        };
        expect(actual).toStrictEqual(expected);
      });
    });
  });
});
