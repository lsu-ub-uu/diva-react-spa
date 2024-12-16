import type {
  DataListWrapper,
  RecordWrapper,
} from '@/.server/cora/cora-data/CoraData';
import {
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
} from '@/.server/cora/cora-data/CoraDataTransforms';
import type { BFFRecordType } from './bffTypes';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import { containsChildWithNameInData } from '@/.server/cora/cora-data/CoraDataUtils';

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

  const metadataId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'metadataId',
  );
  const presentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'presentationViewId',
  );
  const listPresentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'listPresentationViewId',
  );
  const menuPresentationViewId = extractLinkedRecordIdFromNamedRecordLink(
    dataRecordGroup,
    'menuPresentationViewId',
  );

  // Some recordTypes does not have autocomplete as it seems (?)
  let autocompletePresentationView;
  if (
    containsChildWithNameInData(dataRecordGroup, 'autocompletePresentationView')
  ) {
    autocompletePresentationView = extractLinkedRecordIdFromNamedRecordLink(
      dataRecordGroup,
      'autocompletePresentationView',
    );
  }
  return removeEmpty({
    id,
    metadataId,
    presentationViewId,
    listPresentationViewId,
    menuPresentationViewId,
    autocompletePresentationView,
  }) as BFFRecordType;
};
