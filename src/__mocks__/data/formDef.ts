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
      inputType: 'input'
    },
  ],
};
