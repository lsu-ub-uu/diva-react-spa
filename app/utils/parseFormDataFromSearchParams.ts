import { getFormDataFromSearchParams } from 'remix-hook-form';

export const parseFormDataFromSearchParams = (request: Request) => {
  return convertIndexedKeysToArrays(getFormDataFromSearchParams(request));
};

function convertIndexedKeysToArrays(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertIndexedKeysToArrays);
  }

  const result: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(obj)) {
    const match = key.match(/^(.+)\[(\d+)\]$/);
    if (match) {
      const [, arrayKey, index] = match;
      if (!result[arrayKey]) {
        result[arrayKey] = [];
      }
      result[arrayKey][parseInt(index)] = convertIndexedKeysToArrays(value);
    } else {
      result[key] = convertIndexedKeysToArrays(value);
    }
  }

  return result;
}
