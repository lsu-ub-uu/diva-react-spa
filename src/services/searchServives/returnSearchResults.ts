import { fetchPersonData } from './fetchPersonData';

interface ParamObjectInterface {
  requestMethod: string;
  rel: string;
  url: string;
  accept: string;
}

export const returnSearchPersonResults = async (responseArray: any) => {
  const returnArray: any = [];
  const paramObject: ParamObjectInterface = {
    requestMethod: '',
    rel: '',
    url: '',
    accept: '',
  };

  Object.entries(responseArray).forEach((data: any[]) => {
    if (data.includes('data')) {
      data.forEach((record) => {
        Object.entries(record).forEach((item: any | unknown) => {
          Object.values(item).forEach((list: any) => {
            if (typeof list !== 'string') {
              Object.values(list).forEach((listOption: any) => {
                Object.entries(listOption).forEach((option: any) => {
                  if (Object.values(option).includes('actionLinks')) {
                    option.forEach((read: any) => {
                      if (typeof read !== 'string') {
                        Object.values(read).map((param: any) => {
                          paramObject.requestMethod = param.requestMethod;
                          paramObject.rel = param.rel;
                          paramObject.url = param.url;
                          paramObject.accept = param.accept;

                          return returnArray.push(fetchPersonData(paramObject));
                        });
                      }
                    });
                  }
                });
              });
            }
          });
        });
      });
    }
  });

  return Promise.all(returnArray);
};
