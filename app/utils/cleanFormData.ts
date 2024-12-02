import { isEmpty, omitBy } from 'lodash-es';
import { RecordFormSchema } from '@/components/FormGenerator/types';

export const cleanFormData = (obj: any, formSchema: RecordFormSchema): any => {
  const doClean = (obj: any) => {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const value = obj[key];

      if (Array.isArray(value)) {
        const newArray = value
          .map(doClean)
          .filter((o) => !hasOnlyAttributes(o))
          .filter((o: any) => Object.keys(o).length > 0);
        if (!isEmpty(newArray)) {
          acc[key] = newArray;
        }
      } else if (isObjectAndHasLength(value)) {
        const newObj = doClean(value);
        if (!hasOnlyAttributes(newObj)) {
          acc[key] = newObj;
        }
      } else {
        if (!hasOnlyAttributes(value)) {
          acc[key] = value;
        }
      }

      return acc;
    }, {});
  };

  return doClean(obj);
};

export const removeEmpty = (obj: any): any => {
  return Object.keys(obj).reduce((acc: any, key: string) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      const newArray = value
        .map(removeEmpty)
        .filter((o) => !hasOnlyAttributes(o))
        .filter((o: any) => Object.keys(o).length > 0);
      if (!isEmpty(newArray)) {
        acc[key] = newArray;
      }
    } else if (isObjectAndHasLength(value)) {
      const newObj = removeEmpty(value);
      if (!hasOnlyAttributes(newObj)) {
        acc[key] = newObj;
      }
    } else {
      if (!hasOnlyAttributes(value)) {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};

const hasOnlyAttributes = (obj: any) => {
  return isEmpty(omitBy(obj, (_, key) => isAttribute(key)));
};

const isAttribute = (key: string) => {
  return key.startsWith('_');
};

const isObjectAndHasLength = (value: any): boolean => {
  return typeof value === 'object' && !isEmpty(value);
};
