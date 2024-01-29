import {
  FormComponent,
  FormSchema,
} from '../../components/FormGenerator/types';

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

export const formComponentTextVariableWithModeOutput: FormComponent = {
  name: 'exampleTextVar',
  type: 'textVariable',
  mode: 'output',
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

export const formComponentCollectionVariableWithModeOutput: FormComponent = {
  name: 'someCollectionVariableModeOutput',
  type: 'collectionVariable',
  mode: 'output',
  tooltip: {
    title: 'someCollectionVariableModeOutputText',
    body: 'someCollectionVariableModeOutputDefText',
  },
  label: 'someCollectionVariableModeOutputText',

  placeholder: 'initialEmptyValueText',
  repeat: {
    repeatMin: 1,
    repeatMax: 1,
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
};

export const formDef = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefWithOneTextVariable = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefWithOneRepeatingTextVariable = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
          minNumberOfRepeatingToShow: 3,
          repeatMin: 1,
          repeatMax: 3,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
    ],
    mode: 'input',
  },
};
export const formDefWithOneRepeatingTextVariableWithModeOutput = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        name: 'exampleTextVar',
        type: 'textVariable',
        mode: 'output',
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
    mode: 'input',
  },
};

export const formDefWithOneTextVariableHavingFinalValue = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefWithOneTextVariableWithMinNumberOfRepeatingToShow = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
        mode: 'input',
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
    mode: 'input',
  },
};

export const formDefWithOneTextVariableWithMinNumberOfRepeatingToShowAndRepeatMinZero =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      label: 'someRootFormGroupText',
      name: 'someRootNameInData',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'textId345',
        body: 'defTextId678',
      },
      components: [
        {
          type: 'text',
          name: 'presentationTypeTextCollectionVarDefText',
        },
        {
          type: 'textVariable',
          mode: 'input',
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
      mode: 'input',
    },
  };

export const formDefWithOneNumberVariable = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableAndGuiElementLink = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
      {
        type: 'guiElementLink',
        name: 'pSomeGuiElementLinkId',
        url: 'http://www.google.se',
        elementText: 'demoTestLinkGuiElementText',
        presentAs: 'link',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableHavingDecimals = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefWithOneCollectionVariable = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};
export const formDefWithOneCollectionVariableWithModeOutput = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
        mode: 'output',
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
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableWithAttributeCollection = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefWithOneGroupHavingTextVariableAsChild = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
              pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{3,50}$)',
            },
            mode: 'input',
            inputType: 'input',
          },
        ],
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefRealDemo = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefRealDemoWithFinalValues = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
    mode: 'input',
  },
};

export const formDefRealDemoWithAttributesButWithoutFinalValue = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',

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
          minNumberOfRepeatingToShow: 2,
          repeatMin: 0,
          repeatMax: 2,
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
  },
};

export const formDefRealDemoWithAttributes = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',

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
  },
};

export const formDefRealDemoWithRepeatingVars = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefRealDemoWithRepeatingGroups = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',

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
  },
};

export const formDefWithTwoRepeatingVarsAndCollectionVar = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefWithRepeatingCollectionVar = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefWithRepeatingGroup = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',

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
  },
};

export const formDefWithRepeatingGroupWithRepeatingChildGroup = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefWithGroupWithChildGroupWithTextVar = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefWithRepeatingAuthorGroupWithNameTextVar = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
  },
};

export const formDefBookWithTitleGroupAndAuthorGroupsWithNameGroups = {
  validationTypeId: 'book',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
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
        attributes: [
          {
            type: 'collectionVariable',
            name: 'titleColorAttribute',
            placeholder: 'Select title color',
            tooltip: {
              title: 'Face color',
              body: 'state the author face color',
            },
            label: 'Title color',
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
            type: 'text',
            name: 'this a header for group',
            textStyle: 'h5TextStyle',
          },
          {
            name: 'main',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'Main',
              body: '',
            },
            label: 'Main title',
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
            label: 'Title tagline',
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
        type: 'text',
        name: 'Authors',
        textStyle: 'h3TextStyle',
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
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'eyeColor',
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
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
            name: 'firstName',
            type: 'textVariable',
            mode: 'input',
            tooltip: {
              title: '',
              body: '',
            },
            label: 'First name',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                type: 'collectionVariable',
                name: 'faceColorAttribute',
                placeholder: 'Select eye color',
                tooltip: {
                  title: 'Face color',
                  body: 'state the author face color',
                },
                label: 'Face color',
                options: [
                  { value: 'pale', label: 'examplePaleItemText' },
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
            tooltip: {
              title: '',
              body: '',
            },
            label: 'Last name',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 3,
            },
            attributes: [
              {
                type: 'collectionVariable',
                name: 'lastNameColor',
                placeholder: 'Select lastname color',
                tooltip: {
                  title: 'Last color',
                  body: 'state the author eye color',
                },
                finalValue: 'yellow',
                label: 'Lastname color',
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
  },
};

export const formDefWithSurroundingContainerAroundTextVariable: FormSchema = {
  validationTypeId: 'book',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
    components: [
      {
        type: 'text',
        name: 'someHeaderText',
      },
      {
        type: 'container',
        containerType: 'surrounding',
        name: 'someSurroundingContainerName',
        presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
        childStyle: [],
        components: [
          {
            type: 'textVariable',
            name: 'someNameInData',
            label: 'someTextId',
            childStyle: [],
            placeholder: 'text variable',
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
              pattern: '.+',
            },
            mode: 'input',
            inputType: 'input',
          },
        ],
        mode: 'input',
      },
    ],
  },
};

export const formDefWithNestedSurroundingContainers: FormSchema = {
  validationTypeId: 'book',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
    components: [
      {
        type: 'text',
        name: 'someHeaderText',
      },
      {
        type: 'container',
        containerType: 'surrounding',
        name: 'someSurroundingContainerName',
        presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
        childStyle: [],
        components: [
          {
            type: 'textVariable',
            name: 'someNameInData',
            label: 'someTextId',
            childStyle: [],
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
          {
            type: 'container',
            containerType: 'surrounding',
            name: 'someInnerSurroundingContainerName',
            presentationStyle: 'frame', // frame can in the first step be a div with a background yellow and a black border
            childStyle: [],
            components: [
              {
                type: 'textVariable',
                name: 'someInnerNameInData',
                label: 'someTextId',
                childStyle: [],
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
        mode: 'input',
      },
    ],
  },
};
export const formDefWithARepeatingContainer: FormSchema = {
  validationTypeId: 'book',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    mode: 'input',
    components: [
      {
        type: 'container',
        name: 'pSomeRepeatingContainerId',
        presentationStyle: 'label',
        containerType: 'repeating',
        childStyle: [],
        components: [
          {
            type: 'textVariable',
            name: 'someNameInData',
            label: 'someTextId',
            childStyle: ['5'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 3,
              minNumberOfRepeatingToShow: 2,
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
  },
};

export const formDefWithGroupWithSpecifiedHeadlineLevel = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    headlineLevel: 'h1',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        name: 'author',
        type: 'group',
        mode: 'input',
        headlineLevel: 'h3',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'author',
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'eyeColor',
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
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
      },
    ],
    mode: 'input',
  },
};

export const formDefWithGroupWithDefaultHeadlineLevel = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    headlineLevel: 'h1',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
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
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'collectionVariable',
            name: 'eyeColor',
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
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
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneNumberVariableBeingOptional = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
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
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneTextVariableBeingOptional = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
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
    mode: 'input',
  },
};

export const formDefWithOneRecordLinkBeingOptional = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'recordLink',
        name: 'nationalSubjectCategory',
        mode: 'input',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneRecordLinkBeingRequired = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'recordLink',
        name: 'nationalSubjectCategory',
        mode: 'input',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneTextVariableBeingRepeating = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 0,
          repeatMax: 2,
          minNumberOfRepeatingToShow: 2,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefContributorGroupWithAuthorGroupAuthor = {
  validationTypeId: 'someValidationTypeId',
  form: {
    name: 'contributor',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'contributorGroupText',
      body: 'contributorGroupDefText',
    },
    label: 'contributorGroupText',
    repeat: {
      minNumberOfRepeatingToShow: 1,
      repeatMin: 1,
      repeatMax: 1,
    },
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
        headlineLevel: 'h3',
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'divaPerson',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'divaPersonLinkText',
              body: 'divaPersonLinkDefText',
            },
            label: 'divaPersonLinkText',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'givenName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'familyName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'correspondingAuthor',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'correspondingAuthorCollectionVarText',
              body: 'correspondingAuthorCollectionVarDefText',
            },
            label: 'correspondingAuthorCollectionVarText',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            options: [
              {
                value: 'divaYes',
                label: 'divaYesItemText',
              },
              {
                value: 'divaNo',
                label: 'divaNoItemText',
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'birthYear',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'birthYearTextVarText',
              body: 'birthYearTextVarDefText',
            },
            label: 'birthYearTextVarText',
            validation: {
              type: 'regex',
              pattern: '^[0-9]{4}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'deathYear',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'deathYearTextVarText',
              body: 'deathYearTextVarDefText',
            },
            label: 'deathYearTextVarText',
            validation: {
              type: 'regex',
              pattern: '^[0-9]{4}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'email',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'contributorEmailTextVarText',
              body: 'contributorEmailTextVarDefText',
            },
            label: 'contributorEmailTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'localUserId',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'localUserIdTextVarText',
              body: 'localUserIdTextVarDefText',
            },
            label: 'localUserIdTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'ORCID',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'orcidTextVarText',
              body: 'orcidTextVarDefText',
            },
            label: 'orcidTextVarText',
            validation: {
              type: 'regex',
              pattern: '^(\\d{4})-(\\d{4})-(\\d{4})-(\\d{3}[0-9X])$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'organisation',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'organisationLinkText',
              body: 'organisationLinkDefText',
            },
            label: 'organisationLinkText',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'otherOrganisation',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'otherOrganisationGroupText',
              body: 'otherOrganisationGroupDefText',
            },
            label: 'otherOrganisationGroupText',
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            components: [
              {
                name: 'otherOrganisation',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'otherOrganisationTextVarText',
                  body: 'otherOrganisationTextVarDefText',
                },
                label: 'otherOrganisationTextVarText',
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'researchGroup',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'researchGroupLinkText',
              body: 'researchGroupLinkDefText',
            },
            label: 'researchGroupLinkText',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'otherResearchGroup',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'otherResearchGroupTextVarText',
              body: 'otherResearchGroupTextVarDefText',
            },
            label: 'otherResearchGroupTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        childStyle: [],
        gridColSpan: 12,
      },
      {
        name: 'groupAuthor',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'groupAuthorGroupText',
          body: 'groupAuthorGroupDefText',
        },
        label: 'groupAuthorGroupText',
        headlineLevel: 'h3',
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'groupAuthorName',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'groupAuthorNameTextVarText',
              body: 'groupAuthorNameTextVarDefText',
            },
            label: 'groupAuthorNameTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'email',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'contributorEmailTextVarText',
              body: 'contributorEmailTextVarDefText',
            },
            label: 'contributorEmailTextVarText',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'url',
            type: 'textVariable',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'outputUrlTextVarText',
              body: 'outputUrlTextVarDefText',
            },
            label: 'outputUrlTextVarText',
            validation: {
              type: 'regex',
              pattern: '^[0-9A-Za-z./:?=-]{1,300}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'organisation',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'organisationLinkText',
              body: 'organisationLinkDefText',
            },
            label: 'organisationLinkText',
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'otherOrganisation',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'otherOrganisationGroupText',
              body: 'otherOrganisationGroupDefText',
            },
            label: 'otherOrganisationGroupText',
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            components: [
              {
                name: 'otherOrganisation',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'otherOrganisationTextVarText',
                  body: 'otherOrganisationTextVarDefText',
                },
                label: 'otherOrganisationTextVarText',
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    childStyle: [],
    gridColSpan: 12,
  },
};
