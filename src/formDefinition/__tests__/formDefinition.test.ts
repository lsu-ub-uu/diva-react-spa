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
  BFFMetadataChildReference,
  BFFRecordType,
  BFFMetadataGroup,
  BFFPresentationChildReference,
  BFFText
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
  createFormDefinition,
  findMetadataChildReferenceByNameInDataAndAttributes,
  firstAttributesExistsInSecond,
  FormMetaData,
  getAttributesForAttributeReferences
} from '../formDefinition';
import { Dependencies } from '../formDefinitionsDep';
import { createFormMetaDataPathLookup } from '../../utils/structs/metadataPathLookup';
import { createFormMetaData } from "../formMetadata";
import { convertStylesToGridColSpan } from "../../utils/cora-data/CoraDataUtilsPresentations";

describe('formDefinition', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  let recordTypePool: Lookup<string, BFFRecordType>;
  let textPool: Lookup<string, BFFText>;
  const FORM_MODE_NEW = 'create';
  const FORM_MODE_EDIT = 'update';
  const FORM_MODE_VIEW = 'view'; // used to present the record
  // TODO list_view, menu_view, autocomplete_view

  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference,
      someSimpleValidationTypeData,
      someValidationTypeForMissingChildIdTypeData
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataGroup>([
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
    recordTypePool = listToPool<BFFRecordType>([]);
    textPool = listToPool<BFFText>([]);

    dependencies = {
      validationTypePool,
      metadataPool,
      presentationPool,
      recordTypePool,
      textPool
    };

    createRecordType('testRecordType');
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

  const createCollVarFinal = (
    id: string,
    nameInData: string,
    finalValue: string,
    attributeReferenceIds: string[]
  ): BFFMetadataCollectionVariable => {
    const metadata: BFFMetadataCollectionVariable = {
      id,
      nameInData,
      type: 'collectionVariable',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      refCollection: `${id}Collection`,
      finalValue
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

  const addToPool = (metadata: BFFMetadata | BFFMetadataGroup) => {
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

  const createRecordType = (id: string): BFFRecordType => {
    const metadata: BFFRecordType = {
      id,
      metadataId: `${id}OutputGroup`,
      presentationViewId: `${id}OutputPGroup`,
      listPresentationViewId: `${id}ListPGroup`,
      menuPresentationViewId: `${id}MenuPGroup`,
      autocompletePresentationView: `${id}AutocompletePGroup`
    };

    recordTypePool.set(metadata.id, metadata);
    return metadata;
  };

  const createGroup = (id: string, nameInData: string, children: string[]): BFFMetadataGroup => {
    const metadata: BFFMetadataGroup = {
      id,
      nameInData,
      type: 'group',
      textId: 'someTextId',
      defTextId: 'someDefTextId',
      children: []
    };

    metadata.children = createChildReferences(children);
    addToPool(metadata);
    return metadata;
  };

  const createValidationType = (id: string): BFFValidationType => {
    const metadata = {
      id,
      validatesRecordTypeId: id,
      newMetadataGroupId: `some${id}MetadataGroupId`,
      newPresentationGroupId: `pSome${id}NewMetadataGroupId`,
      // Update/Edit
      metadataGroupId: `some${id}EditMetadataGroupId`,
      presentationGroupId: `pSome${id}EditMetadataGroupId`,
      nameTextId: `some${id}TextId`,
      defTextId: `some${id}DefTextId`
    };

    validationTypePool.set(metadata.id, metadata);
    return metadata;
  };

  const createBFFPresentationGroup = (
    id: string,
    presentationOf: string,
    children: BFFPresentationChildReference[]
  ): BFFPresentationGroup => {
    const pGroup = {
      id,
      type: 'pGroup',
      presentationOf,
      presentationStyle: '',
      mode: 'output',
      children
    } as BFFPresentationGroup;
    dependencies.presentationPool.set(id, pGroup);
    return pGroup;
  };

  // it('should be able to lookup validationTypes, metadata, presentations from pools', () => {
  //   expect(validationTypePool.get('someValidationTypeId')).toBeDefined();
  //   expect(metadataPool.get('someNewMetadataGroupId')).toBeDefined();
  //   expect(metadataPool.get('someMetadataTextVariableId')).toBeDefined();
  //   expect(presentationPool.get('pSomeMetadataTextVariableId')).toBeDefined();
  // });

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

  describe('recordType', () => {
    it('createRecordType creates a recordType and adds it to the pool', () => {
      createRecordType('testRecordType');
      expect(recordTypePool.get('testRecordType')).toBeDefined();
    });
  });

  describe('form definition', () => {
    it('should return a form definition for a new metadata group', () => {
      const validationTypeId = 'someValidationTypeId';
      const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
      expect(formDefinition.form.components).toHaveLength(18);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          type: 'group',
          label: 'textId345',
          showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              label: 'someNumberVarTextId', // hidden
              showLabel: false,
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
              showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
              gridColSpan: 12,
              childStyle: [],
              mode: 'input',
              recordLinkType: 'nationalSubjectCategory',
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
                  showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              label: 'someChildGroupTextId',
              showLabel: false,
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
                  showLabel: true,
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
              showLabel: true,
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
                      showLabel: true,
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
                      showLabel: true,
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
          showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              showLabel: true,
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
              label: 'someNumberVarTextId', // hidden
              showLabel: false,
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
              showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
              gridColSpan: 12,
              childStyle: [],
              mode: 'input',
              recordLinkType: 'nationalSubjectCategory',
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
                  showLabel: true,
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
                  showLabel: true,
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
              showLabel: true,
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
                  showLabel: true,
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
              label: 'someChildGroupTextId',
              showLabel: false,
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
                  showLabel: true,
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
          showLabel: true,
          components: [
            {
              type: 'collectionVariable',
              name: 'colour',
              label: 'exampleCollectionVarText',
              showLabel: true,
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

    it('should return a form definition for (output) view presentation metadata group', () => {
      const validationTypeId = 'validationTypeId';
      const validationType = createValidationType(validationTypeId);
      const recordType = createRecordType(validationType.validatesRecordTypeId);

      const metaDataGroup = createGroup(recordType.metadataId, 'validationTypeIdOutputGroup', [
        'someMetadataTextVariable6Id'
      ]);

      const presentationChild = {
        childId: 'pSomeMetadataTextVariable6Id',
        type: 'presentation'
      } as BFFPresentationChildReference;
      createBFFPresentationGroup(recordType.presentationViewId, metaDataGroup.nameInData, [
        presentationChild
      ]);

      const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_VIEW);
      expect(formDefinition.form.components).toHaveLength(1);
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          childStyle: [],
          components: [
            {
              gridColSpan: 12,
              inputType: 'input',
              label: 'someTextId',
              showLabel: true,
              mode: 'output',
              name: 'someNameInData6',
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMax: 3,
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
          ],
          gridColSpan: 12,
          label: 'someTextId',
          showLabel: true,
          mode: 'output',
          name: 'validationTypeIdOutputGroup',
          presentationStyle: '',
          repeat: {
            repeatMax: 1,
            repeatMin: 1
          },
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId'
          },
          type: 'group'
        }
      });
    });
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
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', []);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes unequal nameInData`, () => {
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInDataNOT', []);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
    and unequal number of attributes`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmAttribute1 = createCollVar(
        'mmAttribute1',
        'attributeName11',
        ['value1', 'value2'],
        []
      );
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
        mmAttribute.id,
        mmAttribute1.id
      ]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value1', 'value2'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and same attributes`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [mmAttribute.id]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value1', 'value2'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const children = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        children,
        pmTextVar
      );

      expect(actual).toStrictEqual(children[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes multiple children to find in`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value1', 'value2'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const textVar3 = createTextVar('textVar3', 'someNameInData3', [pmAttribute.id]);
      const childRefs = createChildReferences([mmTextVar.id, textVar3.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );

      expect(actual).toStrictEqual(childRefs[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
        and same number of attributes but different nameInData of attribute`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeNameNOT',
        ['value1', 'value2'],
        []
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );

      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different value of attribute`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar(
        'pmAttribute',
        'attributeName',
        ['valueNOT1', 'value2'],
        []
      );
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefs = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefs,
        pmTextVar
      );
      expect(actual).toBe(undefined);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different wider value of attribute in presentation`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value1', 'value2'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different more specific value of attribute in 
      presentation`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value2'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar
      );
      expect(actual).toBe(undefined);
    });

    // FINAL VALUE FOR ATTRIBUTES
    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in metadata`, () => {
      const mmAttribute = createCollVarFinal('mmAttribute', 'attributeName', 'value1', []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value1'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVarFinal('pmAttribute', 'attributeName', 'value1', []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in metadata`, () => {
      const mmAttribute = createCollVarFinal('mmAttribute', 'attributeName', 'value1', []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVar('pmAttribute', 'attributeName', ['value1', 'value2'], []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar
      );
      expect(actual).toStrictEqual(childRefsForCurrentGroup[0]);
    });

    it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation
      is more specific`, () => {
      const mmAttribute = createCollVar('mmAttribute', 'attributeName', ['value1', 'value2'], []);
      const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [mmAttribute.id]);
      const pmAttribute = createCollVarFinal('pmAttribute', 'attributeName', 'value2', []);
      const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [pmAttribute.id]);
      const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

      const actual = findMetadataChildReferenceByNameInDataAndAttributes(
        metadataPool,
        childRefsForCurrentGroup,
        pmTextVar
      );
      expect(actual).toBe(undefined);
    });

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
        const mmAttribute = {
          anAttribute: ['aFinalValue']
        };
        const pmAttribute = {};
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testfirstAttributesExistsInSecond', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testfirstAttributesExistsInSecondReversedAttributes', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentAttributeValues2', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentAttributeValues3', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues4', () => {
        const mmAttribute = {
          someNameInData: ['aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues5', () => {
        const mmAttribute = {
          someNameInData: ['aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aOtherFinalValue', 'aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferentAttributeValues6', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aOtherFinalValue', 'aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testSameAttributeDifferent', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue', 'aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInDataNOT: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testSameAttributeDifferentName', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue']
        };
        const pmAttribute = {
          someNameInDataNOT: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });

      it('testMultipleAttributesDifferentName', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(true);
      });

      it('testMultipleAttributesDifferentName2', () => {
        const mmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aOtherFinalValue']
        };
        const pmAttribute = {
          someNameInData: ['aFinalValue'],
          someOtherNameInData: ['aFinalValue']
        };
        const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
        expect(actual).toBe(false);
      });
    });

    describe('getAttributesForAttributeReferences', () => {
      it('should return an object with nameInData and item values', () => {
        const mmAttribute = createCollVar(
          'mmAttribute',
          'attributeName',
          ['blue', 'pink', 'yellow'],
          []
        );

        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: mmAttribute.id }
        ];
        const actual = getAttributesForAttributeReferences(
          dependencies.metadataPool,
          attributeReferences
        );

        const expected = { [mmAttribute.nameInData]: ['blue', 'pink', 'yellow'] };
        expect(actual).toStrictEqual(expected);
      });

      it('should return an object with nameInData and item values for finalValue', () => {
        const mmAttribute = createCollVarFinal('mmAttribute', 'attributeName', 'blue', []);
        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: mmAttribute.id }
        ];

        const actual = getAttributesForAttributeReferences(
          dependencies.metadataPool,
          attributeReferences
        );

        const expected = { [mmAttribute.nameInData]: ['blue'] };
        expect(actual).toStrictEqual(expected);
      });

      it('should return an object with nameInData and item values for multiple attributes', () => {
        const mmAttribute = createCollVar(
          'mmAttribute',
          'attributeName',
          ['blue', 'pink', 'yellow'],
          []
        );
        const pmAttribute = createCollVar(
          'pmAttribute',
          'attributeName',
          ['green', 'red', 'black'],
          []
        );
        const attributeReferences: BFFAttributeReference[] = [
          { refCollectionVarId: mmAttribute.id },
          { refCollectionVarId: pmAttribute.id }
        ];

        const actual = getAttributesForAttributeReferences(
          dependencies.metadataPool,
          attributeReferences
        );

        const expected = {
          [mmAttribute.nameInData]: ['blue', 'pink', 'yellow'],
          [pmAttribute.nameInData]: ['green', 'red', 'black']
        };
        expect(actual).toStrictEqual(expected);
      });
    });
  });
});
