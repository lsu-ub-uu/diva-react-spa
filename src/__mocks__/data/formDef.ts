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
export const formDefWithOneTextVariableWithRepeatMin = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 3,
      },
    },
    {
      type: 'textVariable',
      name: 'someNameInData',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 1,
        repeatMax: 2,
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
