import { DataListWrapper, RecordWrapper } from '../utils/cora-data/CoraData';
import { extractIdFromRecordInfo } from '../utils/cora-data/CoraDataTransforms';
import { BFFRecordType } from './bffTypes';
import { extractLinkedRecordIdFromNamedRecordLink } from './transformValidationTypes';
import { removeEmpty } from '../utils/structs/removeEmpty';
import { containsChildWithNameInData } from '../utils/cora-data/CoraDataUtils';

export const transformCoraRecordTypes = (dataListWrapper: DataListWrapper): BFFRecordType[] => {
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

  const metadataId = extractLinkedRecordIdFromNamedRecordLink(dataRecordGroup, 'metadataId');
  const presentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationViewId'
  );
  const listPresentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'listPresentationViewId'
  );
  const menuPresentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'menuPresentationViewId'
  );

  // Some recordTypes does not have autocomplete as it seems (?)
  let autocompletePresentationView;
  if (containsChildWithNameInData(dataRecordGroup, 'autocompletePresentationView')) {
    autocompletePresentationView = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'autocompletePresentationView'
    );
  }
  return removeEmpty({
    id,
    metadataId,
    presentationViewId,
    listPresentationViewId,
    menuPresentationViewId,
    autocompletePresentationView
  }) as BFFRecordType;
};
