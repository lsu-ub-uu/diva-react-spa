import type {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '@/.server/cora/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/.server/cora/cora-data/CoraDataTransforms';
import type { BFFValidationType } from './bffTypes';

export const transformCoraValidationTypes = (
  dataListWrapper: DataListWrapper,
): BFFValidationType[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraToBFF);
};

const transformCoraToBFF = (coraRecordWrapper: RecordWrapper) => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;

  return transformRecordGroupToBFF(dataRecordGroup);
};

const transformRecordGroupToBFF = (dataRecordGroup: DataGroup) => {
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const validatesRecordType = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'validatesRecordType',
  );
  const newMetadataGroupId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'newMetadataId',
  );

  const metadataGroupId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'metadataId',
  );

  const newPresentationGroupId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'newPresentationFormId',
  );

  const presentationGroupId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationFormId',
  );

  const nameTextId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'textId',
  );

  const defTextId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'defTextId',
  );

  return {
    id,
    validatesRecordTypeId: validatesRecordType,
    newMetadataGroupId,
    newPresentationGroupId,
    presentationGroupId,
    metadataGroupId,
    nameTextId,
    defTextId,
  } as BFFValidationType;
};

// TODO: move to /CoraDataTransform.ts and write tests
