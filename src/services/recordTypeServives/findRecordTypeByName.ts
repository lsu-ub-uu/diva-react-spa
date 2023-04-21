export const findRecordTypeByName = (responseArray: any) => {
  const tsUpdatedArray: any[] = [];
  const returnObject = {
    id: '',
    tsUpdated: tsUpdatedArray,
  };
  responseArray.map((a: any) => {
    return Object.entries(a).map((b) => {
      if (Array.isArray(b)) {
        b.map((c) => {
          if (Array.isArray(c)) {
            c.map((d: string) => {
              if (Object.values(d).includes('id')) {
                // Adding to returnObject
                returnObject.id = Object.values(d)[1];
              }
              if (Object.keys(d).includes('children')) {
                Object.entries(d).map((e) => {
                  if (e.includes('children')) {
                    Object.entries(e).map((f) => {
                      if (f.includes('1')) {
                        f.map((g) => {
                          const isArray = Array.isArray(g);
                          if (isArray) {
                            g.map((h) => {
                              if (Object.values(h).includes('tsUpdated')) {
                                Object.entries(h).map((i) => {
                                  if (i.includes('value')) {
                                    tsUpdatedArray.push(i[1]);
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
