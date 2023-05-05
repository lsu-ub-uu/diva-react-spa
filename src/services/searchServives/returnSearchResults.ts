import { fetchPersonData } from './fetchPersonData';

interface ParamObjectInterface {
  requestMethod: string;
  rel: string;
  url: string;
  accept: string;
}

interface PersonInterface {
  familyName: string;
  givenName: string;
  orcid_id: string;
}
export const returnSearchResults = async (responseObject: any) => {
  let returnContainer: any = [];
  const returnArray: any = [];
  const paramObject: ParamObjectInterface = {
    requestMethod: '',
    rel: '',
    url: '',
    accept: '',
  };
  let person: PersonInterface = {
    familyName: '',
    givenName: '',
    orcid_id: '',
  };

  Object.entries(responseObject).forEach((data: any[]) => {
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
                        Object.values(read).forEach((param: any) => {
                          paramObject.requestMethod = param.requestMethod;
                          paramObject.rel = param.rel;
                          paramObject.url = param.url;
                          paramObject.accept = param.accept;
                          fetchPersonData(paramObject);

                          // returnArray.push(value)
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
  return returnArray;
};
