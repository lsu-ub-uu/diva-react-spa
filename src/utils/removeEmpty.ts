export const removeEmpty = (obj: any) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    possiblyEmptyArray(obj, key);
    possiblyEmptyObject(obj, key);
    possiblyObjectWithKeys(obj, key);
  });
  return obj;
};

const possiblyEmptyArray = (obj: any, key: string) => {
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

const possiblyEmptyObject = (obj: any, key: string) => {
  if (isObjectEmpty(obj, key)) {
    delete obj[key];
  }
};

const possiblyObjectWithKeys = (obj: any, key: string) => {
  if (isObjectAndHasLength(obj, key)) {
    const newObj = removeEmpty(obj[key]);
    if (Object.keys(newObj).length > 0) {
      obj[key] = newObj;
    } else {
      delete obj[key];
    }
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
