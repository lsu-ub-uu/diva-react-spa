import {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFValidationType,
  BFFPresentation,
  BFFPresentationGroup, BFFMetadataNumberVariable,
} from '../../config/bffTypes';

export const someValidationTypeData: BFFValidationType = {
  id: 'someValidationTypeId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupId',
  newPresentationGroupId: 'pSomeNewMetadataGroupId',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456'
};

export const someNewMetadataGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroupId',
  nameInData: 'someNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someRecordInfoId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '3'
    }
  ]
};

export const someMetadataTextVariable: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariableId',
  nameInData: 'someNameInData',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefText',
  regEx: 'someRegex'
};

export const someMetadataNumberVar: BFFMetadataNumberVariable = {
  id: 'someNumberVarId',
  nameInData: 'someNameInDataNumberVar',
  type: 'numberVariable',
  textId: 'someNumberVarText',
  defTextId: 'someNumberVarDefText',
  min: "0",
  max: "20",
  warningMin: "2",
  warningMax: "10",
  numberOfDecimals: "0"
};

export const someRecordInfo: BFFMetadataGroup = {
  id: 'someRecordInfoId',
  nameInData: 'someRecordInfoNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataTextVariableId', // change this!
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};

export const pSomeMetadataTextVariable: BFFPresentation = {
  id: 'pSomeMetadataTextVariableId',
  presentationOf: 'someMetadataTextVariableId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId'
};

export const pSomeNewMetadataGroup: BFFPresentationGroup = {
  id: 'pSomeNewMetadataGroupId',
  presentationOf: 'someNewMetadataGroupId', // metadata
  mode: 'input',
  children: [
    {
      childId: 'someHeadlineTextId',
      type: 'text',
      textStyle: 'bold',
      childStyle: []
    },
    {
      childId: 'pSomeMetadataTextVariableId',
      type: 'presentation',
      minNumberOfRepeatingToShow: "1", // depends also on metadata repeatMin/Max
      childStyle: ['style3', 'style4']
      // presentationSize: 'firstSmaller', // collapsable/switch view
    },
    {
      childId: 'pSomeMetadataTextVariableId',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    }
  ]
};

export const someValidationTypeDataFaultyChildReference: BFFValidationType = {
  id: 'someValidationTypeDataFaultyChildReferenceId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupFaultyChildReferenceId',
  newPresentationGroupId: 'pSomeNewMetadataGroupId',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456'
};

export const someNewMetadataGroupFaultyChildReference: BFFMetadataGroup = {
  id: 'someNewMetadataGroupFaultyChildReferenceId',
  nameInData: 'someNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someRecordInfoId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someFaultyIdNotExistingInMetadataPool',
      repeatMin: '1',
      repeatMax: '3'
    }
  ]
};
