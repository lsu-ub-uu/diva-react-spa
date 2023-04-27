export const findRecordTypeByName = (
  responseArray: any,
  recordType: string,
) => {
  const returnArray: any = [];
  const returnObject = {
    id: '',
  };

  responseArray.forEach((data: any) => {
    return Object.entries(data).forEach((children) => {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          if (Array.isArray(child)) {
            child.forEach((name: string) => {
              if (Object.values(name).includes('id')) {
                // Adding to returnObject
                returnObject.id = Object.values(name)[1];
                returnArray.push(returnObject);
              }
            });
          }
        });
      }
    });
  });
  return returnArray;
};
