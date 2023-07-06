import * as yup from 'yup';

interface DefaultValuesCreatorInterface {
  [key: string]: string;
}

export const defaultValuesCreator = (form: any) => {
  const defaultValues: any = {};
  Object.values(form.cards).forEach((child: any) => {
    // console.log(child);
    defaultValues[child.name] = [];
    const childObject: DefaultValuesCreatorInterface = {};
    if (child.max > 1) {
      defaultValues[child.name] = [];
      Object.values(child.children).forEach((childNode: any) => {
        childObject[childNode.name as string] = '';
      });
      defaultValues[child.name].push(childObject);
      // console.log('cO', childObject);
    } else {
      defaultValues[child.name] = {};
      Object.values(child.children).forEach((childNode: any) => {
        childObject[childNode.name] = '';
      });
      defaultValues[child.name] = childObject;
    }
  });
  return defaultValues;
};

export const validationCreator = (form: any) => {
  console.log('form', form);
  const validation: any = {};
  Object.values(form.cards).forEach((child: any) => {
    const validationChild: any = {};
    Object.values(child.children).forEach((childNode: any) => {
      switch (childNode.type) {
        case 'select':
          // eslint-disable-next-line no-case-declarations
          const options: any = [];
          childNode.children.map((value: any) => {
            return options.push(value.value);
          });
          validationChild[childNode.name] = yup
            .string()
            .oneOf(options)
            .required(`${child.name} is required`);
          break;
        case 'input':
          if (childNode.name === 'email') {
            // console.log('email');
            validationChild[childNode.name] = yup
              .string()
              .email()
              .matches(childNode.regex);
          }
          validationChild[childNode.name] = yup
            .string()
            // .required()
            .matches(childNode.regex)
            .min(childNode?.min)
            .max(childNode?.max);
          break;
        case 'textarea':
          validationChild[childNode.name] = yup
            .string()
            .required()
            .matches(childNode.regex)
            .min(childNode?.min)
            .max(childNode?.max);

          break;
        case 'button':
          break;
        case 'radio':
        case 'checkbox':
          validationChild[childNode.name] = yup.string();
          break;

        case 'date':
          validationChild[childNode.name] = yup
            .string()
            .matches(childNode.regex);
          break;

        case 'time':
          validationChild[childNode.name] = yup
            .string()
            .matches(childNode.regex);
          break;

        default:
          return null;
      }
    });
    validation[child.name] = yup
      .array()
      .min(child?.min)
      .max(child?.max)
      .of(yup.object().shape(validationChild));
  });
  return validation;
};
