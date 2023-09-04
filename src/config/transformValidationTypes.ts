import {
  CoraRecord,
  DataGroup,
  DataListWrapper,
  RecordWrapper,
  RecordLink,
} from '../utils/cora-data/CoraData';
import { getFirstDataGroupWithNameInData } from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';

interface BFFValidationType {
  id: string;
  validatesRecordType: string;
  newMetadataGroupId: string;
}

export const loadCoraData = () => {
  // load definitions
};

export const transformCoraValidationTypes = (
  dataListWrapper: DataListWrapper,
): BFFValidationType[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoratoBFF);
};

const transformCoratoBFF = (coraRecordWrapper: RecordWrapper) => {
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
  return { id, validatesRecordType, newMetadataGroupId } as BFFValidationType;
};

const extractIdFromRecordInfo = (coraRecordGroup: DataGroup) => {
  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecordGroup,
    'recordInfo',
  ) as DataGroup;
  return getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
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
