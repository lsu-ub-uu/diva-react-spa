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
