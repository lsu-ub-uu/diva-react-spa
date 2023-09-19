export const formDef = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
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
