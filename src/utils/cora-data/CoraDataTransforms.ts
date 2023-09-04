import { DataGroup } from './CoraData';
import { getFirstDataGroupWithNameInData } from './CoraDataUtils';
import { getFirstDataAtomicValueWithNameInData } from './CoraDataUtilsWrappers';

export const extractIdFromRecordInfo = (coraRecordGroup: DataGroup) => {
  const recordInfo = getFirstDataGroupWithNameInData(
    coraRecordGroup,
    'recordInfo',
  ) as DataGroup;
  return getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
};
