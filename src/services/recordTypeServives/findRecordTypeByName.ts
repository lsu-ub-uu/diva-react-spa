export const findRecordTypeByName = (responseArray: any) => {
  const returnObject = {
    id: '',
  };
  responseArray.forEach((data: any) => {
    return Object.entries(data).forEach((children) => {
      if (Array.isArray(children)) {
        children.forEach((c) => {
          if (Array.isArray(c)) {
            c.forEach((d: string) => {
              if (Object.values(d).includes('id')) {
                // Adding to returnObject
                returnObject.id = Object.values(d)[1];
                /* ({ id: Object.values(d)[1] } = returnObject); */
              }
            });
          }
        });
      }
    });
  });
  return returnObject;
};
