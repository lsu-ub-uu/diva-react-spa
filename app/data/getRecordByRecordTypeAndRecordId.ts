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
import { RecordWrapper } from '@/cora/cora-data/CoraData';
import { transformRecord } from '@/cora/transform/transformRecord';
import { createLinkedRecordDefinition } from '@/data/formDefinition/formDefinition';
import { getRecordDataById } from '@/cora/getRecordDataById';
import * as TYPES from '@/cora/transform/bffTypes';
import { BFFPresentationGroup } from '@/cora/transform/bffTypes';

export const getRecordByRecordTypeAndRecordId = async (
  dependencies: Dependencies,
  recordType: string,
  recordId: string,
  authToken: string,
  presentationRecordLinkId?: string,
) => {
  const response = await getRecordDataById<RecordWrapper>(
    recordType,
    recordId,
    authToken,
  );
  const recordWrapper = response.data;
  const record = transformRecord(dependencies, recordWrapper);

  if (presentationRecordLinkId !== undefined) {
    const { presentationGroup, metadataGroup } =
      getGroupsFromPresentationLinkId(dependencies, presentationRecordLinkId);
    record.presentation = createLinkedRecordDefinition(
      dependencies,
      metadataGroup,
      presentationGroup as BFFPresentationGroup,
    );
    const listPresentationGroup = dependencies.presentationPool.get(
      dependencies.recordTypePool.get(recordType).listPresentationViewId,
    ) as BFFPresentationGroup;
    record.listPresentation = createLinkedRecordDefinition(
      dependencies,
      metadataGroup,
      listPresentationGroup as BFFPresentationGroup,
    );
  }

  return record;
};

const getGroupsFromPresentationLinkId = (
  dependencies: Dependencies,
  presentationLinkId: string,
) => {
  const presentationLink = dependencies.presentationPool.get(
    presentationLinkId,
  ) as TYPES.BFFPresentationRecordLink;
  const presentationId =
    presentationLink.linkedRecordPresentations !== undefined
      ? presentationLink.linkedRecordPresentations[0].presentationId
      : presentationLink.id;
  const presentationGroup = dependencies.presentationPool.get(
    presentationId,
  ) as BFFPresentationGroup;
  const metadataGroup = dependencies.metadataPool.get(
    presentationGroup.presentationOf,
  ) as TYPES.BFFMetadataGroup;
  return { presentationGroup, metadataGroup };
};
