import {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../utils/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractAttributeValueByName,
} from '../utils/cora-data/CoraDataTransforms';

interface BFFMetadata {
  id: string;
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'collectionItem'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable'
    | 'itemCollection';
}

export const transformMetadata = (
  dataListWrapper: DataListWrapper,
): BFFMetadata[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(transformCoraRecordToBFFMetaData);
};

const transformCoraRecordToBFFMetaData = (
  coraRecordWrapper: RecordWrapper,
): BFFMetadata => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  return transformRecordGroupToBFF(dataRecordGroup) as BFFMetadata;
};

const transformRecordGroupToBFF = (dataRecordGroup: DataGroup) => {
  const id = extractIdFromRecordInfo(dataRecordGroup);
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  return { id, type };
};
