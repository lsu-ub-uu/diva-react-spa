export const formDef = {
  validationTypeId: 'someValidationTypeId',
  components: [
    {
      type: 'text',
      name: 'presentationTypeTextCollectionVarDefText',
    },
    {
      type: 'input',
      name: 'someNameInData',
      placeholder: 'someEmptyTextId',
      validation: {
        type: 'regex',
        pattern: '^[a-zA-Z]$',
      },
    },
  ],
};
