import {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../utils/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractAttributeValueByName,
} from '../utils/cora-data/CoraDataTransforms';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';

interface BFFMetadata {
  id: string;
  nameInData: string;
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'collectionItem'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable'
    | 'itemCollection';
  textId: string;
  defTextId: string;
}
interface BFFMetadataTextVariable extends BFFMetadata {
  regEx: string;
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
  const nameInData = getFirstDataAtomicValueWithNameInData(
    dataRecordGroup,
    'nameInData',
  );
  const type = extractAttributeValueByName(dataRecordGroup, 'type');
  const textId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'textId',
  );
  const defTextId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'defTextId',
  );

  const regEx = getFirstDataAtomicValueWithNameInData(dataRecordGroup, 'regEx');

  return {
    id,
    nameInData,
    type,
    textId,
    defTextId,
    regEx,
  } as BFFMetadataTextVariable;
};
