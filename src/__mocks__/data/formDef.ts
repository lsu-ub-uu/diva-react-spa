import {
  FormComponent,
  FormSchema,
} from '../../components/FormGenerator/types';

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
      label: 'someOtherLabelId',
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

export const formDefWithOneTextVariableHavingFinalValue = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'label',
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
      label: 'someNameInDataLabel',
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
      label: 'Colour',
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
          label: 'attribute colour',
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

export const formDefRealDemoWithFinalValues: FormSchema = {
  validationTypeId: 'demo',
  components: [
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
      finalValue: 'someFinalValue',
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
      finalValue: '12',
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
          name: 'exampleNumberVar',
          type: 'numberVariable',
          finalValue: '55',
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
          finalValue: 'someText',
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

export const formDefRealDemoWithAttributes: FormSchema = {
  validationTypeId: 'demo',
  components: [
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
      attributes: [
        {
          type: 'collectionVariable',
          name: 'groupColour',
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
        {
          type: 'collectionVariable',
          name: 'groupColourAgain',
          finalValue: 'pink',
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
      components: [
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
          finalValue: 'exampleFinalValue',
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
            {
              type: 'collectionVariable',
              name: 'colourAgain',
              finalValue: 'pink',
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
        },
      ],
    },
  ],
};

export const formDefRealDemoWithRepeatingVars: FormSchema = {
  validationTypeId: 'demo',
  components: [
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
        minNumberOfRepeatingToShow: 5,
        repeatMin: 0,
        repeatMax: 5,
      },
      attributes: [
        {
          type: 'collectionVariable',
          name: 'colour',
          placeholder: 'emptyTextId',
          finalValue: 'blue',
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
            minNumberOfRepeatingToShow: 5,
            repeatMin: 1,
            repeatMax: 5,
          },
          attributes: [
            {
              type: 'collectionVariable',
              name: 'colour',
              placeholder: 'emptyTextId',
              finalValue: 'pink',
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
            repeatMin: 0,
            repeatMax: 2,
          },
        },
      ],
    },
  ],
};

export const formDefRealDemoWithRepeatingGroups: FormSchema = {
  validationTypeId: 'demo',
  components: [
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
        minNumberOfRepeatingToShow: 2,
        repeatMin: 0,
        repeatMax: 2,
      },
      components: [
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

export const formComponentGroup: FormComponent = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  components: [
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
};

export const formComponentRepeatingTextVariable: FormComponent = {
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
    repeatMin: 0,
    repeatMax: 1,
  },
};

export const formComponentGroupWithChildren: FormComponent = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  components: [
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
        minNumberOfRepeatingToShow: 1,
        repeatMin: 0,
        repeatMax: 5,
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
        minNumberOfRepeatingToShow: 2,
        repeatMin: 0,
        repeatMax: 2,
      },
    },
  ],
};

export const formComponentGroupAndTextVariableWithinGroup: FormComponent = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  components: [
    {
      name: 'innerChildGroup',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'exampleFirstChildGroupText',
        body: 'exampleFirstChildGroupDefText',
      },
      label: 'exampleFirstChildGroupText',
      repeat: {
        minNumberOfRepeatingToShow: 2,
        repeatMin: 0,
        repeatMax: 2,
      },
      components: [
        {
          name: 'shouldBeSkippedComponent',
          type: 'text',
          repeat: {
            repeatMin: 1,
            repeatMax: 2,
          },
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
          finalValue: '12',
          validation: {
            type: 'number',
            min: 0,
            max: 100,
            warningMin: 10,
            warningMax: 90,
            numberOfDecimals: 2,
          },
          repeat: {
            minNumberOfRepeatingToShow: 10,
            repeatMin: 0,
            repeatMax: 10,
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
};

export const formComponentGroupWithinGroupWithAttributes: FormComponent = {
  name: 'firstChildGroup',
  type: 'group',
  mode: 'input',
  tooltip: {
    title: 'exampleFirstChildGroupText',
    body: 'exampleFirstChildGroupDefText',
  },
  label: 'exampleFirstChildGroupText',
  repeat: {
    minNumberOfRepeatingToShow: 0,
    repeatMin: 0,
    repeatMax: 2,
  },
  attributes: [
    {
      type: 'collectionVariable',
      name: 'firstChildGroupColor',
      finalValue: 'yellow',
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
    {
      type: 'collectionVariable',
      name: 'firstChildGroupSecondAttribute',
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
  components: [
    {
      name: 'secondChildGroup',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'exampleFirstChildGroupText',
        body: 'exampleFirstChildGroupDefText',
      },
      label: 'exampleFirstChildGroupText',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 0,
        repeatMax: 2,
      },
      components: [
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
        },
      ],
    },
  ],
};

export const formDefWithTwoRepeatingVarsAndCollectionVar = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
    },
    {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someLabelTextId',
      placeholder: 'someEmptyTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 2,
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
        numberOfDecimals: 2,
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 5,
      },
    },
    {
      type: 'collectionVariable',
      name: 'colour',
      placeholder: 'emptyTextId',
      tooltip: {
        title: 'exampleCollectionVarText',
        body: 'exampleCollectionVarDefText',
      },
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      options: [
        { value: 'blue', label: 'exampleBlueItemText' },
        { value: 'pink', label: 'examplePinkItemText' },
        { value: 'yellow', label: 'exampleYellowItemText' },
      ],
      mode: 'input',
    },
  ],
};

export const formDefWithRepeatingCollectionVar = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
    },
    {
      type: 'collectionVariable',
      name: 'colour',
      placeholder: 'emptyTextId',
      tooltip: {
        title: 'exampleCollectionVarText',
        body: 'exampleCollectionVarDefText',
      },
      repeat: {
        repeatMin: 0,
        repeatMax: 3,
      },
      options: [
        { value: 'blue', label: 'exampleBlueItemText' },
        { value: 'pink', label: 'examplePinkItemText' },
        { value: 'yellow', label: 'exampleYellowItemText' },
        { value: 'green', label: 'exampleGreenItemText' },
      ],
      mode: 'input',
    },
  ],
};

export const formDefWithRepeatingGroup = {
  validationTypeId: 'someValidationTypeId',
  components: [
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
        minNumberOfRepeatingToShow: 0,
        repeatMin: 0,
        repeatMax: 10,
      },
      components: [
        {
          type: 'text',
          name: 'presentationTypeTextCollectionVarDefText',
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
            max: 20,
            warningMin: 10,
            warningMax: 90,
            numberOfDecimals: 2,
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

export const formDefWithRepeatingGroupWithRepeatingChildGroup = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      name: 'author',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'authorGroupText',
        body: 'authorGroupDefText',
      },
      label: 'authorGroupText',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 10,
      },
      components: [
        {
          name: 'name',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'exampleFirstChildGroupText',
            body: 'exampleFirstChildGroupDefText',
          },
          label: 'exampleFirstChildGroupText',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 100,
          },
          components: [
            {
              name: 'shouldBeSkippedComponent',
              type: 'text',
            },
            {
              name: 'firstName',
              type: 'textVariable',
              mode: 'input',
              tooltip: {
                title: 'exampleMetadataVarText',
                body: 'exampleMetadataVarDefText',
              },
              label: 'firstName',
              validation: {
                type: 'regex',
                pattern: '^[a-zA-Z]$',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
            {
              name: 'lastName',
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
                pattern: '^[a-zA-Z]$',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
            {
              type: 'numberVariable',
              name: 'age',
              placeholder: 'someNumberPlaceholderTextId',
              validation: {
                type: 'number',
                min: 0,
                max: 125,
                warningMin: 50,
                warningMax: 100,
                numberOfDecimals: 0,
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
          ],
        },
      ],
    },
  ],
};

export const formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      name: 'author',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'authorGroupText',
        body: 'authorGroupDefText',
      },
      label: 'authorGroupText',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 10,
      },
      attributes: [
        {
          type: 'collectionVariable',
          name: 'colourAttribute',
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
      components: [
        {
          name: 'name',
          type: 'group',
          mode: 'input',
          tooltip: {
            title: 'exampleFirstChildGroupText2',
            body: 'exampleFirstChildGroupDefText2',
          },
          label: 'exampleFirstChildGroupText',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 100,
          },
          components: [
            {
              name: 'shouldBeSkippedComponent12',
              type: 'text',
            },
            {
              name: 'firstName',
              type: 'textVariable',
              mode: 'input',
              tooltip: {
                title: 'exampleMetadataVarText',
                body: 'exampleMetadataVarDefText',
              },
              label: 'firstName',
              validation: {
                type: 'regex',
                pattern: '^[a-zA-Z]$',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              attributes: [
                {
                  type: 'collectionVariable',
                  name: 'colourAttribute',
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
            },
            {
              name: 'lastName',
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
                pattern: '^[a-zA-Z]$',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
            {
              type: 'numberVariable',
              name: 'age',
              placeholder: 'someNumberPlaceholderTextId',
              validation: {
                type: 'number',
                min: 0,
                max: 125,
                warningMin: 50,
                warningMax: 100,
                numberOfDecimals: 0,
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'someChildGroupTextId',
      name: 'nonRepeatingGroup',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'someChildGroupTextId',
        body: 'someChildGroupDefTextId',
      },
      attributes: [
        {
          type: 'collectionVariable',
          name: 'groupAttribute',
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
      components: [],
      mode: 'input',
    },
    {
      type: 'numberVariable',
      name: 'grade',
      placeholder: 'yourGrades',
      validation: {
        type: 'number',
        min: 1,
        max: 5,
        warningMin: 2,
        warningMax: 4,
        numberOfDecimals: 0,
      },
      attributes: [
        {
          type: 'collectionVariable',
          name: 'gradeAttribute',
          placeholder: 'emptyTextId',
          tooltip: {
            title: 'exampleCollectionVarText',
            body: 'exampleCollectionVarDefText',
          },
          options: [
            { value: 'strong', label: 'someStrongLabelText' },
            { value: 'weak', label: 'someWeakLabelText' },
          ],
          mode: 'input',
        },
      ],
      repeat: {
        repeatMin: 1,
        repeatMax: 12,
      },
    },
  ],
};

export const formDefWithGroupWithChildGroupWithTextVar = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      name: 'author',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'authorGroupText',
        body: 'authorGroupDefText',
      },
      label: 'authorGroupText',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          type: 'numberVariable',
          name: 'age',
          placeholder: 'someNumberPlaceholderTextId',
          validation: {
            type: 'number',
            min: 0,
            max: 125,
            warningMin: 50,
            warningMax: 100,
            numberOfDecimals: 0,
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          name: 'name',
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
              name: 'firstName',
              type: 'textVariable',
              mode: 'input',
              tooltip: {
                title: 'exampleMetadataVarText',
                body: 'exampleMetadataVarDefText',
              },
              label: 'firstName',
              validation: {
                type: 'regex',
                pattern: '^[a-zA-Z]$',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
            {
              name: 'lastName',
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
                pattern: '^[a-zA-Z]$',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
          ],
        },
      ],
    },
  ],
};

export const formDefWithRepeatingAuthorGroupWithNameTextVar = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      name: 'author',
      type: 'group',
      mode: 'input',
      tooltip: {
        title: 'authorGroupText',
        body: 'authorGroupDefText',
      },
      label: 'authorGroupText',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      components: [
        {
          name: 'name',
          type: 'textVariable',
          mode: 'input',
          tooltip: {
            title: 'exampleMetadataVarText',
            body: 'exampleMetadataVarDefText',
          },
          label: 'name',
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
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

export const formDefBookWithTitleGroupAndAuthorGroupsWithNameGroups: FormSchema =
  {
    validationTypeId: 'book',
    components: [
      {
        type: 'text',
        name: 'someHeaderText',
      },
      {
        name: 'colour',
        type: 'collectionVariable',
        label: 'colour',
        placeholder: 'book cover colour',
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
      {
        type: 'numberVariable',
        name: 'year',
        label: 'year',
        placeholder: 'year',
        validation: {
          type: 'number',
          min: 0,
          max: 2023,
          warningMin: 0,
          warningMax: 0,
          numberOfDecimals: 0,
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'title',
        type: 'group',
        tooltip: {
          title: 'non-repeating title group',
          body: '',
        },
        label: 'title',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            type: 'text',
            name: 'this a header for group',
          },
          {
            name: 'main',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'title.main.value',
              body: '',
            },
            label: 'title.main.value',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'tagLine',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'title.tagLine.value',
              body: '',
            },
            label: 'title.tagLine.value',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
      {
        name: 'author',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'author',
        repeat: {
          repeatMin: 0,
          repeatMax: 10,
        },
        components: [
          {
            name: 'name',
            type: 'textVariable',
            mode: 'input',
            tooltip: {
              title: '',
              body: '',
            },
            label: 'author.name',
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
