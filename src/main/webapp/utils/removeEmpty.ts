export const removeEmpty = (obj: any) => {
  const keys = Object.keys(obj);
  keys.forEach((key, index) => {
    possiblyRemoveEmptyArray(obj, key);
    possiblyRemoveEmptyObject(obj, key);
    possiblyRemovePartOfObjectWithKeys(obj, key);
    possiblyRemoveAttributeForEmptyValues(obj, key);
  });
  return obj;
};

const possiblyRemoveEmptyArray = (obj: any, key: string) => {
  if (Array.isArray(obj[key])) {
    const arr = obj[key]
      .map(removeEmpty)
      .filter((o: any) => Object.keys(o).length > 0);
    if (isArrayLengthZero(arr)) {
      delete obj[key];
    } else {
      obj[key] = arr;
    }
  }
};

const possiblyRemoveEmptyObject = (obj: any, key: string) => {
  if (isObjectEmpty(obj, key)) {
    delete obj[key];
  }
};

const possiblyRemovePartOfObjectWithKeys = (obj: any, key: string) => {
  if (isObjectAndHasLength(obj, key)) {
    const newObj = removeEmpty(obj[key]);
    if (Object.keys(newObj).length > 0) {
      obj[key] = newObj;
    } else {
      delete obj[key];
    }
  }
};

const possiblyRemoveAttributeForEmptyValues = (obj: any, key: string) => {
  /* console.log('sWi', key, key.charAt(0).startsWith('_'));
  console.log('inc', key, !Object.keys(obj).includes('value'));
  console.log(
    'in2',
    key,
    !key.charAt(0).startsWith('_') && !Object.keys(obj).includes('value'),
  );
  console.log(
    'wha',
    key,
    key.charAt(0).startsWith('_') ||
      (!key.charAt(0).startsWith('_') && !Object.keys(obj).includes('value')),
  );
  console.log(
    'wh2',
    key,
    (key.charAt(0).startsWith('_') && obj.value === undefined) ||
      (!key.charAt(0).startsWith('_') && !Object.keys(obj).includes('value')),
  );
  console.log('aaa', key, Object.keys(obj));
  console.log(
    'bbb',
    key,
    Object.keys(obj).length && !Object.keys(obj).includes('value'),
  );
  console.log(
    'ccc',
    key,
    Object.keys(obj).length > 0 && !Object.keys(obj).includes('value'),
  );
  console.log(
    'ddd',
    key,
    key.charAt(0).startsWith('_') &&
      obj.value === undefined &&
      Object.keys(obj).length > 0 &&
      !Object.keys(obj).includes('value'),
  ); */

  if (key.charAt(0).startsWith('_') && obj.value === undefined) {
    delete obj[key];
  }
};

const isArrayLengthZero = (arr: any[]) => {
  return arr.length === 0;
};
const isObjectEmpty = (obj: any, key: string) => {
  return (
    obj[key] === undefined ||
    obj[key] === null ||
    obj[key] === '' ||
    Object.keys(obj[key]).length === 0
  );
};
const isObjectAndHasLength = (obj: any, key: string) => {
  return typeof obj[key] === 'object' && Object.keys(obj[key]).length > 0;
};
