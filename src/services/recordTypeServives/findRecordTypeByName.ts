export const findRecordTypeByName = (responseArray: any) => {
  const tsUpdatedArray: any[] = [];
  const returnObject = {
    id: '',
    tsUpdated: tsUpdatedArray,
  };
  responseArray.forEach((data: any) => {
    return Object.entries(data).forEach((children) => {
      if (Array.isArray(children)) {
        children.forEach((c) => {
          if (Array.isArray(c)) {
            c.forEach((d: string) => {
              if (Object.values(d).includes('id')) {
                // Adding to returnObject
                ({ id: Object.values(d)[1] } = returnObject);
              }
              if (Object.keys(d).includes('children')) {
                Object.entries(d).forEach((e) => {
                  if (e.includes('children')) {
                    Object.entries(e).forEach((f) => {
                      if (f.includes('1')) {
                        f.forEach((g) => {
                          if (Array.isArray(g)) {
                            g.forEach((name) => {
                              if (Object.values(name).includes('tsUpdated')) {
                                Object.entries(name).forEach((value) => {
                                  if (value.includes('value')) {
                                    tsUpdatedArray.push(value[1]);
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  return returnObject;
};
