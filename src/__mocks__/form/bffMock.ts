import {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFValidationType,
  BFFPresentation,
  BFFPresentationGroup,
  BFFMetadataNumberVariable,
  BFFMetadataCollectionVariable,
  BFFMetadata,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFPresentationRecordLink,
  BFFPresentationSurroundingContainer,
  BFFGuiElement,
  BFFPresentationContainer
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
  nameInData: 'someNewMetadataGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId'
    }
  ],
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
    },
    {
      childId: 'someMetadataTextVariable2Id',
      repeatMin: '1',
      repeatMax: 'X'
    },
    {
      childId: 'someMetadataTextVariable3Id',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataTextVariable4Id',
      repeatMin: '1',
      repeatMax: '3'
    },
    {
      childId: 'someMetadataTextVariable5Id',
      repeatMin: '1',
      repeatMax: '3'
    },
    {
      childId: 'someMetadataNumberVarId',
      repeatMin: '0',
      repeatMax: '1'
    },
    {
      childId: 'exampleCollectionVarId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataCollectionVariableWithAttributeId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataNumberWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataTextVariableWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'nationalSubjectCategoryLinkId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataChildGroupWithShowHeadlineFalseId',
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};

export const someMetadataChildGroup: BFFMetadataGroup = {
  id: 'someMetadataChildGroupId',
  nameInData: 'someChildGroupNameInData',
  type: 'group',
  textId: 'someChildGroupTextId',
  defTextId: 'someChildGroupDefTextId',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};

export const someMetadataChildGroupWithSpecifiedHeadlineText: BFFMetadataGroup = {
  id: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
  nameInData: 'someMetadataChildGroupWithSpecifiedHeadlineTextNameInData',
  type: 'group',
  textId: 'someChildGroupTextId',
  defTextId: 'someChildGroupDefTextId',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};
export const someMetadataChildGroupWithShowHeadlineFalse: BFFMetadataGroup = {
  id: 'someMetadataChildGroupWithShowHeadlineFalseId',
  nameInData: 'someMetadataChildGroupWithShowHeadlineFalseNameInData',
  type: 'group',
  textId: 'someChildGroupTextId',
  defTextId: 'someChildGroupDefTextId',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};

export const someMetadataTextVariable: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariableId',
  nameInData: 'someNameInData',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex'
};

export const someMetadataTextVariable2: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable2Id',
  nameInData: 'someNameInData2',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex'
};

export const someMetadataTextVariable3: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable3Id',
  nameInData: 'someNameInData3',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  finalValue: 'someFinalValue'
};
export const someMetadataTextVariable4: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable4Id',
  nameInData: 'someNameInData4',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex'
};
export const someMetadataTextVariable5: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariable5Id',
  nameInData: 'someNameInData5',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex'
};

export const someMetadataTextVariableWithAttributeVar: BFFMetadataTextVariable = {
  id: 'someMetadataTextVariableWithAttributeVarId',
  nameInData: 'someNameInDataTextWithAttrib',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId'
    }
  ]
};

export const someMetadataNumberVar: BFFMetadataNumberVariable = {
  id: 'someMetadataNumberVarId',
  nameInData: 'someNameInDataNumberVar',
  type: 'numberVariable',
  textId: 'someNumberVarTextId',
  defTextId: 'someNumberVarDefTextId',
  min: '0',
  max: '20',
  warningMin: '2',
  warningMax: '10',
  numberOfDecimals: '0'
};

export const someMetadataNumberVarWithAttribute: BFFMetadataNumberVariable = {
  id: 'someMetadataNumberWithAttributeVarId',
  nameInData: 'someNameInDataNumberWithAttributeVar',
  type: 'numberVariable',
  textId: 'someNumberVarTextId',
  defTextId: 'someNumberVarDefTextId',
  min: '0',
  max: '20',
  warningMin: '2',
  warningMax: '10',
  numberOfDecimals: '0',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId'
    }
  ]
};

export const someMetadataCollectionVariable: BFFMetadataCollectionVariable = {
  id: 'exampleCollectionVarId',
  nameInData: 'colour',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  finalValue: 'pink' // added this for now
};

export const someMetadataCollectionVariableWithAttribute: BFFMetadataCollectionVariable = {
  id: 'someMetadataCollectionVariableWithAttributeId',
  nameInData: 'colourAttributeVar',
  type: 'collectionVariable',
  textId: 'exampleCollectionVarText',
  defTextId: 'exampleCollectionVarDefText',
  refCollection: 'exampleCollection',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId'
    }
  ]
};

export const someMetadataItemCollection: BFFMetadataItemCollection = {
  id: 'exampleCollection',
  nameInData: 'colour',
  type: 'itemCollection',
  textId: 'exampleCollectionText',
  defTextId: 'exampleCollectionDefText',
  collectionItemReferences: [
    { refCollectionItemId: 'exampleBlueItem' },
    { refCollectionItemId: 'examplePinkItem' },
    { refCollectionItemId: 'exampleYellowItem' }
  ]
};

export const someMetadataCollectionItemBlue: BFFMetadata = {
  id: 'exampleBlueItem',
  nameInData: 'blue',
  type: 'collectionItem',
  textId: 'exampleBlueItemText',
  defTextId: 'exampleBlueItemDefText'
};

export const someMetadataCollectionItemPink: BFFMetadata = {
  id: 'examplePinkItem',
  nameInData: 'pink',
  type: 'collectionItem',
  textId: 'examplePinkItemText',
  defTextId: 'examplePinkItemDefText'
};

export const someMetadataCollectionItemYellow: BFFMetadata = {
  id: 'exampleYellowItem',
  nameInData: 'yellow',
  type: 'collectionItem',
  textId: 'exampleYellowItemText',
  defTextId: 'exampleYellowItemDefText'
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

export const pSomeMetadataNumberVar: BFFPresentation = {
  id: 'pSomeMetadataNumberVariableId',
  presentationOf: 'someMetadataNumberVarId',
  mode: 'input',
  type: 'pNumVar',
  emptyTextId: 'someEmptyTextId',
  showLabel: 'false'
};

export const pSomeMetadataNumberWithAttributeVar: BFFPresentation = {
  id: 'pSomeMetadataNumberWithAttributeVarId',
  presentationOf: 'someMetadataNumberWithAttributeVarId',
  mode: 'input',
  type: 'pNumVar',
  emptyTextId: 'someEmptyTextId'
};

export const pSomeMetadataTextVariable: BFFPresentation = {
  id: 'pSomeMetadataTextVariableId',
  presentationOf: 'someMetadataTextVariableId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId'
};

export const pSomeMetadataTextVariableWithAttributeVar: BFFPresentation = {
  id: 'pSomeMetadataTextVariableWithAttributeVarId',
  presentationOf: 'someMetadataTextVariableWithAttributeVarId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId'
};

// used for repeatMax X (infinite test)

export const pSomeMetadataTextVariable2: BFFPresentation = {
  id: 'pSomeMetadataTextVariable2Id',
  presentationOf: 'someMetadataTextVariable2Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
  specifiedLabelTextId: 'someOtherLabelTextId'
};
export const pSomeMetadataTextVariable3: BFFPresentation = {
  id: 'pSomeMetadataTextVariable3Id',
  presentationOf: 'someMetadataTextVariable3Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId'
};
export const pSomeMetadataTextVariable4: BFFPresentation = {
  id: 'pSomeMetadataTextVariable4Id',
  presentationOf: 'someMetadataTextVariable4Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId'
};
export const pSomeMetadataTextVariable5: BFFPresentation = {
  id: 'pSomeMetadataTextVariable5Id',
  presentationOf: 'someMetadataTextVariable5Id',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId'
};

export const pSomeMetadataCollectionVariable: BFFPresentation = {
  id: 'pSomeMetadataCollectionVariableId',
  presentationOf: 'exampleCollectionVarId',
  mode: 'input',
  type: 'pCollVar',
  emptyTextId: 'someEmptyTextId'
};

export const pSomeMetadataCollectionVariableWithAttribute: BFFPresentation = {
  id: 'pSomeMetadataCollectionVariableWithAttributeId',
  presentationOf: 'someMetadataCollectionVariableWithAttributeId',
  mode: 'input',
  type: 'pCollVar',
  emptyTextId: 'someEmptyTextId'
};

export const pSomeMetadataChildGroup: BFFPresentationGroup = {
  id: 'pSomeMetadataChildGroupId',
  type: 'pGroup',
  presentationOf: 'someMetadataChildGroupId', // metadata
  presentationStyle: 'someMetadataChildGroupPresentationStyle',
  mode: 'input',
  children: [
    {
      childId: 'pSomeMetadataTextVariableId',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    }
  ]
};
export const pSomeMetadataChildGroupWithSpecifiedHeadlineText: BFFPresentationGroup = {
  id: 'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
  type: 'pGroup',
  presentationOf: 'someMetadataChildGroupWithSpecifiedHeadlineTextId', // metadata
  presentationStyle: 'someMetadataChildGroupPresentationStyle',
  mode: 'input',
  specifiedHeadlineTextId: 'someOtherHeadlineTextId',
  specifiedHeadlineLevel: 'h3',
  children: [
    {
      childId: 'pSomeMetadataTextVariableId',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    }
  ]
};
export const pSomeMetadataChildGroupWithShowHeadlineFalse: BFFPresentationGroup = {
  id: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
  type: 'pGroup',
  presentationOf: 'someMetadataChildGroupWithShowHeadlineFalseId', // metadata
  presentationStyle: 'someMetadataChildGroupPresentationStyle',
  mode: 'input',
  showHeadline: 'false',
  children: [
    {
      childId: 'pSomeMetadataTextVariableId',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    }
  ]
};

export const pSomeNewMetadataGroup: BFFPresentationGroup = {
  id: 'pSomeNewMetadataGroupId',
  type: 'pGroup',
  presentationOf: 'someNewMetadataGroupId', // metadata
  mode: 'input',
  presentationStyle: 'card',
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
      childStyle: ['style3', 'style4']
    },
    {
      childId: 'pSomeMetadataTextVariable2Id',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    },
    {
      childId: 'pSomeMetadataTextVariable3Id',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    },
    {
      childId: 'pSomeMetadataNumberVariableId',
      type: 'presentation',
      minNumberOfRepeatingToShow: '1',
      childStyle: ['style3', 'style4']
    },
    {
      childId: 'pSomeMetadataCollectionVariableId',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    },
    {
      childId: 'pSomeMetadataCollectionVariableWithAttributeId',
      type: 'presentation',
      childStyle: ['style3', 'style4']
    },
    {
      childId: 'pSomeMetadataNumberWithAttributeVarId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'pSomeMetadataTextVariableWithAttributeVarId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'pSomeMetadataChildGroupId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'nationalSubjectCategoryPLinkId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'pSomeContainerId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'pSomeGuiElementLinkId',
      type: 'guiElement',
      childStyle: []
    },
    {
      childId: 'pSomeRepeatingContainerId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'pSomeMetadataChildGroupWithSpecifiedHeadlineTextId',
      type: 'presentation',
      childStyle: []
    },
    {
      childId: 'pSomeMetadataChildGroupWithShowHeadlineFalseId',
      type: 'presentation',
      childStyle: []
    }
  ]
};

export const pSomeContainer: BFFPresentationSurroundingContainer = {
  id: 'pSomeContainerId',
  type: 'container',
  presentationStyle: 'card',
  presentationsOf: ['someMetadataTextVariable4Id'], // metadata
  mode: 'input',
  children: [
    {
      childId: 'pSomeMetadataTextVariable4Id',
      type: 'presentation',
      childStyle: ['5'],
      minNumberOfRepeatingToShow: '1'
    }
  ],
  repeat: 'children'
};

export const pSomeRepeatingContainer: BFFPresentationContainer = {
  id: 'pSomeRepeatingContainerId',
  type: 'container',
  presentationStyle: 'label',
  presentationOf: 'someMetadataTextVariable5Id',
  mode: 'input',
  children: [
    {
      childId: 'pSomeMetadataTextVariable5Id',
      type: 'presentation',
      childStyle: ['5'],
      minNumberOfRepeatingToShow: '1'
    }
  ],
  repeat: 'this'
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

export const someMetadataRecordLink: BFFMetadataRecordLink = {
  id: 'nationalSubjectCategoryLinkId',
  nameInData: 'nationalSubjectCategory',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryLinkDefText',
  linkedRecordType: 'nationalSubjectCategory'
};

export const pSomeMetadataRecordLink: BFFPresentationRecordLink = {
  id: 'nationalSubjectCategoryPLinkId',
  type: 'pRecordLink',
  presentationOf: 'nationalSubjectCategoryLinkId',
  mode: 'input'
  // TODO linkedRecordPresentations?
  // TODO Search ?
};

export const someMetadataRecordLinkWithAttibutes: BFFMetadataRecordLink = {
  id: 'nationalSubjectCategoryLinkWithAttibutesId',
  nameInData: 'nationalSubjectCategoryWithAttibutes',
  type: 'recordLink',
  textId: 'nationalSubjectCategoryLinkText',
  defTextId: 'nationalSubjectCategoryLinkDefText',
  linkedRecordType: 'nationalSubjectCategory2',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId'
    }
  ]
};

export const pSomeGuiElementLink: BFFGuiElement = {
  id: 'pSomeGuiElementLinkId',
  url: 'http://www.google.se',
  elementText: 'demoTestLinkGuiElementText',
  presentAs: 'link',
  type: 'guiElementLink'
};

export const someSimpleValidationTypeData: BFFValidationType = {
  id: 'someSimpleValidationTypeId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroup2Id',
  newPresentationGroupId: 'todo',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456'
};

export const someNewSimpleMetadataGroup: BFFMetadataGroup = {
  id: 'someNewMetadataGroup2Id',
  nameInData: 'someNewMetadataGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '3'
    },
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'nationalSubjectCategoryLinkId',
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};
export const someSimpleValidationTypeDataWithAttributes: BFFValidationType = {
  id: 'someSimpleValidationTypeWithAttributesId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroup2WithAttributesId',
  newPresentationGroupId: 'todo',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456'
};

export const someNewSimpleMetadataGroupWithAttributes: BFFMetadataGroup = {
  id: 'someNewMetadataGroup2WithAttributesId',
  nameInData: 'someNewMetadataGroupWithAttributesNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  attributeReferences: [
    {
      refCollectionVarId: 'exampleCollectionVarId'
    }
  ],
  children: [
    {
      childId: 'someMetadataTextVariableId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataTextVariableWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1'
    },
    {
      childId: 'someMetadataNumberVarId',
      repeatMin: '1',
      repeatMax: 'X'
    },
    {
      childId: 'someMetadataNumberWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '2'
    },
    {
      childId: 'nationalSubjectCategoryLinkWithAttibutesId',
      repeatMin: '1',
      repeatMax: '1'
    }
  ]
};

export const someSimpleValidationTypeRepeatingGroups: BFFValidationType = {
  id: 'someSimpleValidationTypeWithRepeatingGroupsId',
  validatesRecordTypeId: 'record123',
  // New
  newMetadataGroupId: 'someNewMetadataGroupRepeatingGroupsId',
  newPresentationGroupId: 'todo',
  // Update/Edit
  metadataGroupId: 'todo',
  presentationGroupId: 'todo',
  nameTextId: 'name123',
  defTextId: 'defName456'
};

export const someNewSimpleMetadataGroupRepeatingGroups: BFFMetadataGroup = {
  id: 'someNewMetadataGroupRepeatingGroupsId',
  nameInData: 'someNewMetadataGroupRepeatingGroupsNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataChildGroupId',
      repeatMin: '1',
      repeatMax: '2'
    }
  ]
};
