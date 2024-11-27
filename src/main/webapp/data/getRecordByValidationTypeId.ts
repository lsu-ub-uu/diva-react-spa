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
 */

import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';
import {
  BFFMetadataGroup,
  BFFMetadataRecordLink,
} from '@/cora/transform/bffTypes';
import { BFFDataRecord } from '@/types/record';

export const getRecordByValidationTypeId = (
  dependencies: Dependencies,
  validationTypeId: string,
) => {
  const validationType = dependencies.validationTypePool.get(validationTypeId);
  const recordTypeGroup = dependencies.recordTypePool.get(
    validationType.validatesRecordTypeId,
  );
  const metadataGroup = dependencies.metadataPool.get(
    recordTypeGroup.metadataId,
  ) as BFFMetadataGroup;
  const recordInfoChildGroup = dependencies.metadataPool.get(
    metadataGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const recordInfo = recordInfoChildGroup.children
    .filter((child) => parseInt(child.repeatMin) > 0)
    .map(
      (child) =>
        dependencies.metadataPool.get(child.childId) as BFFMetadataRecordLink,
    )
    .reduce<Record<string, any>>((acc, curr) => {
      if (curr.finalValue !== undefined) {
        acc[curr.nameInData] = { value: curr.finalValue };
      }
      return acc;
    }, {});

  const record = {
    data: {
      [metadataGroup.nameInData]: {
        [recordInfoChildGroup.nameInData]: recordInfo,
      },
    },
  };
  return record as BFFDataRecord;
};
