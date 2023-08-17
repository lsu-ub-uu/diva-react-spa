import {
  DataAtomic,
  DataGroup,
  RecordWrapper,
} from '../../utils/cora-data/CoraData';

const findValueByName = (dataGroup: DataGroup, name: string) => {
  const obj = dataGroup.children.find((o) => o.name === name) as DataAtomic;

  return obj.value;
};

export const parseRecord = (recordWrapper: RecordWrapper) => {
  console.log(recordWrapper);
  const id = findValueByName(
    recordWrapper.record.data.children[0] as DataGroup,
    'id',
  );
  const title = findValueByName(
    recordWrapper.record.data as DataGroup,
    'title',
  );
  return {
    id,
    title,
    binaries: [],
  };
};
