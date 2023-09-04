import {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../utils/cora-data/CoraData';
import { getFirstDataGroupWithNameInData } from '../utils/cora-data/CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from '../utils/cora-data/CoraDataUtilsWrappers';

interface BFFRecordType {
  id: string;
}

export const loadCoraData = () => {
  // load definitions
};

export const transformCoraRecordTypes = (
  dataListWrapper: DataListWrapper,
): BFFRecordType[] => {
  if (dataListWrapper.dataList.data.length === 0) {
    return [];
  }

  const coraRecords = dataListWrapper.dataList.data;
  return coraRecords.map(extractIdFromRecord);
};

const extractIdFromRecord = (coraRecordWrapper: RecordWrapper) => {
  const coraRecord = coraRecordWrapper.record;
  const dataRecordGroup = coraRecord.data;
  const id = extractIdFromRecordInfo(dataRecordGroup);
  return { id } as BFFRecordType;
};

const extractIdFromRecordInfo = (coraRecordGroup: DataGroup) => {
  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecordGroup,
    'recordInfo',
  ) as DataGroup;
  return getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
};
