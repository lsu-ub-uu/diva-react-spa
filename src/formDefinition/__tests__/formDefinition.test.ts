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
  BFFMetadata,
  BFFMetadataItemCollection,
  BFFPresentation,
  BFFPresentationGroup,
  BFFValidationType
} from '../../config/bffTypes';
import { Lookup } from '../../utils/structs/lookup';
import {
  pSomeMetadataTextVariable,
  pSomeNewMetadataGroup,
  pSomeMetadataNumberVar,
  someMetadataTextVariable,
  someMetadataNumberVar,
  someNewMetadataGroup,
  someNewMetadataGroupFaultyChildReference,
  someRecordInfo,
  someValidationTypeData,
  someValidationTypeDataFaultyChildReference,
  pSomeMetadataTextVariable2,
  someMetadataTextVariable2,
  someMetadataCollectionVariable,
  someMetadataItemCollection,
  someMetadataCollectionItemBlue,
  someMetadataCollectionItemPink,
  someMetadataCollectionItemYellow,
  pSomeMetadataCollectionVariable,
  pSomeMetadataTextVariable3,
  someMetadataTextVariable3,
  someMetadataCollectionVariableWithAttribute,
  pSomeMetadataCollectionVariableWithAttribute,
  someMetadataNumberVarWithAttribute,
  pSomeMetadataNumberWithAttributeVar,
  pSomeMetadataTextVariableWithAttributeVar,
  someMetadataTextVariableWithAttributeVar,
} from '../../__mocks__/form/bffMock';
import { createFormDefinition } from '../formDefinition';
import { Dependencies } from '../formDefinitionsDep';

describe('formDefinition', () => {
  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata | BFFMetadataItemCollection>;
  let presentationPool: Lookup<string, BFFPresentation | BFFPresentationGroup>;
  const FORM_MODE_NEW = 'new';
  let dependencies: Dependencies;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([
      someValidationTypeData,
      someValidationTypeDataFaultyChildReference
    ]);
    metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>([
      someMetadataTextVariable,
      someMetadataTextVariable2,
      someMetadataTextVariable3,
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
      someMetadataTextVariableWithAttributeVar
    ]);
    presentationPool = listToPool<BFFPresentation | BFFPresentationGroup>([
      pSomeMetadataTextVariable,
      pSomeMetadataTextVariable2,
      pSomeMetadataTextVariable3,
      pSomeMetadataNumberVar,
      pSomeNewMetadataGroup,
      pSomeMetadataCollectionVariable,
      pSomeMetadataCollectionVariableWithAttribute,
      pSomeMetadataNumberWithAttributeVar,
      pSomeMetadataTextVariableWithAttributeVar
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
        'Child reference with childId [someMetadataTextVariableId] does not exist'
      );
    }
  });

  it('should return a form definition containing a text and a inputText with repeatMin, repeatMax and minNumberOfRepeatingToShow', () => {
    const validationTypeId = 'someValidationTypeId';
    const formDefinition = createFormDefinition(dependencies, validationTypeId, FORM_MODE_NEW);
    expect(formDefinition.components).toHaveLength(10);
    expect(formDefinition).toStrictEqual({
      validationTypeId: validationTypeId,
      components: [
        {
          type: 'text',
          name: 'someHeadlineTextId'
        },
        {
          type: 'textVariable',
          name: 'someNameInData',
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
        },
        {
          type: 'textVariable',
          name: 'someNameInData',
          placeholder: 'someEmptyTextId',
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
          placeholder: 'someEmptyTextId',
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
          mode: 'input', // output
          inputType: 'input', //textarea
          finalValue: 'someFinalValue'
        },
        {
          type: 'numberVariable',
          name: 'someNameInDataNumberVar',
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
              type: 'collectionVariable',
              name: 'colour',
              placeholder: 'emptyTextId',
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
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someNumberVarTextId',
            body: 'someNumberVarDefTextId'
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              placeholder: 'emptyTextId',
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
              placeholder: 'emptyTextId',
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
          inputType: 'input',
        },
      ]
    });
  });
});
