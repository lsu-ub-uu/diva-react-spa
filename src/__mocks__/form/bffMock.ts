import {
  BFFMetadataGroup,
  BFFMetadataChildReference,
  BFFMetadataTextVariable,
  BFFValidationType,
} from '../../config/bffTypes';

export const someValidationTypeData: BFFValidationType = {
  id: "someValidationTypeId",
  validatesRecordTypeId: "record123",
  newMetadataGroupId: "someNewMetadataGroupId",
  metadataGroupId: "metadata789",
  newPresentationGroupId: "presentation123",
  presentationGroupId: "presentation456",
  nameTextId: "name123",
  defTextId: "defName456",
};

export const someNewMetadataGroup: BFFMetadataGroup = {
  id: "someNewMetadataGroupId",
  nameInData: "someNameInData",
  type: "group",
  textId: "textId345",
  defTextId: "defTextId678",
  children: [
    {
      childId: 'someRecordInfoId',
      repeatMin: '1',
      repeatMax: '1',
    },
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '10',
    },
  ],
};

export const someMetadataTextVariable: BFFMetadataTextVariable = {
  id: "someMetadataTextVariableId",
  nameInData: "someNameInData",
  type: "textVariable",
  textId: "someTextId",
  defTextId: "someDefText",
  regEx: 'someRegex'
};

export const someRecordInfo: BFFMetadataGroup = {
  id: "someRecordInfoId",
  nameInData: "someNameInData",
  type: "group",
  textId: "textId345",
  defTextId: "defTextId678",
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};


