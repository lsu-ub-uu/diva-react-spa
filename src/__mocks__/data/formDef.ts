import { FormSchema } from '../../components';

export const formDef = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
    {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someLabelTextId',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    },
    {
      type: 'numberVariable',
      name: 'someNumberVariableNameInData',
      placeholder: 'someNumberPlaceholderTextId',
      validation: {
        type: 'number',
        min: 0,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
  ],
};

export const formDefWithOneTextVariable = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
    {
      type: 'textVariable',
      name: 'someNameInData',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    },
  ],
};

export const formDefWithOneTextVariableHavingFinalValue = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'textVariable',
      name: 'someNameInData',
      finalValue: 'someFinalValue',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    },
  ],
};

export const formDefWithOneTextVariableWithMinNumberOfRepeatingToShow = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
    {
      type: 'textVariable',
      name: 'someNameInData',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 2,
        repeatMax: 3,
        minNumberOfRepeatingToShow: 2,
      },
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input',
    },
  ],
};

export const formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero =
  {
    validationTypeId: 'someValidationTypeId',
    components: [
      {
        type: 'text',
        name: 'presentationTypeTextCollectionVarDefText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
    ],
  };

export const formDefWithOneNumberVariable: FormSchema = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'numberVariable',
      name: 'someNumberVariableNameInData',
      placeholder: 'someNumberPlaceholderTextId',
      validation: {
        type: 'number',
        min: 1,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
  ],
};

export const formDefWithOneNumberVariableHavingDecimals: FormSchema = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'numberVariable',
      name: 'someNumberVariableNameInData',
      placeholder: 'someNumberPlaceholderTextId',
      validation: {
        type: 'number',
        min: 0,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 2,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
  ],
};

export const formDefWithOneCollectionVariable: FormSchema = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      name: 'colour',
      type: 'collectionVariable',
      placeholder: 'initialEmptyValueText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      mode: 'input',
      tooltip: {
        title: 'exampleCollectionVarText',
        body: 'exampleCollectionVarDefText',
      },
      options: [
        {
          value: 'blue',
          label: 'exampleBlueItemText',
        },
        {
          value: 'pink',
          label: 'examplePinkItemText',
        },
        {
          value: 'yellow',
          label: 'exampleYellowItemText',
        },
      ],
    },
  ],
};

export const formDefWithOneNumberVariableWithAttributeCollection: FormSchema = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'numberVariable',
      name: 'someNameInDataNumberWithAttributeVar',
      label: 'test',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'someNumberVarTextId',
        body: 'someNumberVarDefTextId',
      },
      attributes: [
        {
          type: 'collectionVariable',
          name: 'colour',
          placeholder: 'emptyTextId',
          tooltip: {
            title: 'exampleCollectionVarText',
            body: 'exampleCollectionVarDefText',
          },
          options: [
            { value: 'blue', label: 'exampleBlueItemText' },
            { value: 'pink', label: 'examplePinkItemText' },
            { value: 'yellow', label: 'exampleYellowItemText' },
          ],
          mode: 'input',
        },
      ],
      validation: {
        type: 'number',
        min: 0,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      mode: 'input',
    },
  ],
};

// @ts-ignore
export const formDefWithOneGroupHavingTextVariableAsChild: FormSchema = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'group',
      label: 'someChildGroupTextId',
      name: 'someChildGroupNameInData',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'someChildGroupTextId',
        body: 'someChildGroupDefTextId',
      },
      components: [
        {
          type: 'textVariable',
          name: 'someNameInData',
          label: 'someTextId',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someTextId',
            body: 'someDefTextId',
          },
          validation: {
            type: 'regex',
            pattern: 'someRegex',
          },
          mode: 'input',
          inputType: 'input',
        },
      ],
      mode: 'input',
    },
  ],
};

export const formDefRealDemo: FormSchema = {
  validationTypeId: 'demo',
  components: [
    {
      name: 'demoText',
      type: 'text',
    },
    {
      name: 'recordInfo',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'recordInfoText',
        body: 'recordInfoDefText',
      },
      label: 'recordInfoText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
    {
      name: 'bookTitle',
      type: 'textVariable',
      mode: 'input',
      inputType: 'input',
      tooltip: {
        title: 'bookTitletextVarText',
        body: 'bookTitletextVarDefText',
      },
      label: 'bookTitletextVarText',
      validation: {
        type: 'regex',
        pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
    {
      name: 'keeptHis',
      type: 'numberVariable',
      mode: 'input',
      tooltip: {
        title: 'keepThisNumberVarText',
        body: 'keepThisNumberVarDefText',
      },
      label: 'keepThisNumberVarText',
      validation: {
        type: 'number',
        min: 0,
        max: 20,
        warningMin: 2,
        warningMax: 10,
        numberOfDecimals: 0,
      },
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 0,
        repeatMax: 1,
      },
    },
    {
      name: 'firstChildGroup',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'exampleFirstChildGroupText',
        body: 'exampleFirstChildGroupDefText',
      },
      label: 'exampleFirstChildGroupText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'exampleFirstChildGroupText',
          type: 'text',
        },
        {
          name: 'exampleNumberVar',
          type: 'numberVariable',
          mode: 'input',
          tooltip: {
            title: 'exampleMetadataNumberVarText',
            body: 'exampleMetadataNumberVarDefText',
          },
          label: 'exampleMetadataNumberVarText',
          validation: {
            type: 'number',
            min: 0,
            max: 100,
            warningMin: 10,
            warningMax: 90,
            numberOfDecimals: 2,
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          name: 'exampleTextVar',
          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'exampleMetadataTextVarText',
            body: 'exampleMetadataTextVarDefText',
          },
          label: 'exampleMetadataTextVarText',
          validation: {
            type: 'regex',
            pattern: '.*',
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
      ],
    },
  ],
};
