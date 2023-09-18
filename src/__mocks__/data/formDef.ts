export const formDef = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'someHeadlineTextId',
    },
    {
      type: 'inputText',
      name: 'someNameInData',
      placeholder: 'someEmptyTextId',
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
    },
  ],
};
