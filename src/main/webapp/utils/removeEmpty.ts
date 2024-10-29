import { isEmpty } from 'lodash';

export const removeEmpty = (obj: any): any => {
  return Object.keys(obj).reduce((acc: any, key: string) => {
    const value = obj[key];

    if (isAttributeForEmptyValue(key, obj)) {
      return acc;
    }

    if (Array.isArray(value)) {
      const newArray = value
        .map(removeEmpty)
        .filter((o: any) => Object.keys(o).length > 0);
      if (!isEmpty(newArray)) {
        acc[key] = newArray;
      }
    } else if (isObjectAndHasLength(value)) {
      const newObj = removeEmpty(value);
      if (!isEmpty(newObj)) {
        acc[key] = newObj;
      }
    } else {
      if (!isEmpty(value)) {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};

const isAttributeForEmptyValue = (key: string, obj: any) => {
  const isAttribute = key.startsWith('_');
  const hasEmptyValue = 'value' in obj && isEmpty(obj.value);
  return isAttribute && hasEmptyValue;
};

const isObjectAndHasLength = (value: any): boolean => {
  return typeof value === 'object' && !isEmpty(value);
};
