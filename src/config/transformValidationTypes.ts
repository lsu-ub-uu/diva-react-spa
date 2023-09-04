import {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../utils/cora-data/CoraData';
import { getFirstDataGroupWithNameInData } from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';

interface BFFValidationType {
  id: string;
  validatesRecordTypeId: string;
  newMetadataGroupId: string;
  metadataGroupId: string;
  newPresentationGroupId: string;
  presentationGroupId: string;
  nameTextId: string;
  defTextId: string;
}

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
    'textId'
  );

  const defTextId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'defTextId'
  );

  return { id, validatesRecordTypeId: validatesRecordType, newMetadataGroupId, newPresentationGroupId, presentationGroupId, metadataGroupId, nameTextId, defTextId } as BFFValidationType;
};

const extractLinkedRecordIdFromNamedRecordLink = (
  coraRecordGroup: DataGroup,
  linkName: string,
) => {
  const recordLink = getFirstDataGroupWithNameInData(
    coraRecordGroup,
    linkName,
  ) as DataGroup;
  return getFirstDataAtomicValueWithNameInData(recordLink, 'linkedRecordId');
};
