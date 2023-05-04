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
  const returnArray: any = [];
  const returnObject: any = {};
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

  // console.log(responseObject);
  Object.entries(responseObject).forEach((data: any[]) => {
    if (data.includes('data')) {
      data.forEach((record) => {
        Object.entries(record).forEach((item: any | unknown) => {
          // console.log('item1', item[1]);
          // console.log('item', item);

          Object.values(item).forEach((list: any) => {
            if (typeof list !== 'string') {
              Object.values(list).forEach((listOption: any) => {
                // console.log('thing', thing);
                Object.entries(listOption).forEach((option: any) => {
                  if (Object.values(option).includes('actionLinks')) {
                    //console.log(option);
                    option.forEach((read: any) => {
                      if (typeof read !== 'string') {
                        // console.log(read);
                        Object.values(read).forEach((param: any) => {
                          // console.log(param);
                          paramObject.requestMethod = param.requestMethod;
                          paramObject.rel = param.rel;
                          paramObject.url = param.url;
                          paramObject.accept = param.accept;

                          fetchPersonData(paramObject);
                          // person = fetchPersonData(paramObject);
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
  return returnObject;
};
