import { FormSchema } from '../../components';

export const formDef = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
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

export const formDefWithOneNumberVariable: FormSchema = {
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
        numberOfDecimals: 0,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    },
  ],
};
