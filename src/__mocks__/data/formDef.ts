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
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
      inputType: 'input'
    },
  ],
};
