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
import { BFFMetadata, BFFMetadataGroup, BFFValidationType } from '../../config/bffTypes';
import { Lookup } from '../../utils/structs/lookup';
import {
  someMetadataTextVariable,
  someNewMetadataGroup,
  someRecordInfo,
  someValidationTypeData,
} from '../../__mocks__/form/bffMock';

describe('form', () => {

  let validationTypePool: Lookup<string, BFFValidationType>;
  let metadataPool: Lookup<string, BFFMetadata>;

  beforeEach(() => {
    validationTypePool = listToPool<BFFValidationType>([someValidationTypeData]);
    metadataPool = listToPool<BFFMetadata>([someMetadataTextVariable, someNewMetadataGroup, someRecordInfo])
  });

  it('should generate something', () => {
    expect(validationTypePool.get('someValidationTypeId')).toBeDefined();
    expect(metadataPool.get('someNewMetadataGroupId')).toBeDefined();
    expect(metadataPool.get('someMetadataTextVariableId')).toBeDefined();
  });

});

