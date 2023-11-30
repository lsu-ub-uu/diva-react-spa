import { DataGroup, RecordWrapper } from '../../utils/cora-data/CoraData';
import {
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData
} from '../../utils/cora-data/CoraDataUtils';

const getIdFromRecordInfo = (recordInfo: DataGroup | undefined) => {
  let idAtomic;
  let id;
  if (recordInfo) {
    idAtomic = getFirstDataAtomicWithNameInData(recordInfo, 'id');
    id = idAtomic?.value;
  }
  return id;
};

export const parseRecord = (recordWrapper: RecordWrapper) => {
  const dataRecordGroup = recordWrapper.record.data;
  const recordInfo = getFirstDataGroupWithNameInData(dataRecordGroup, 'recordInfo');

  const titleAtomic = getFirstDataAtomicWithNameInData(dataRecordGroup, 'title');
  const title = titleAtomic?.value;
  const id = getIdFromRecordInfo(recordInfo);
  return {
    id,
    title,
    images: []
  };
};
