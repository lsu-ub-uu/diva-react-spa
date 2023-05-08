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

export const returnSearchResults = async (responseArray: any) => {
  const returnArray: any = [];
  const paramObject: ParamObjectInterface = {
    requestMethod: '',
    rel: '',
    url: '',
    accept: '',
  };

  const wrapper = async (param: any) => {
    returnArray.push(await fetchPersonData(param));
    console.log('arr', returnArray);
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
                        Object.values(read).forEach((param: any) => {
                          paramObject.requestMethod = param.requestMethod;
                          paramObject.rel = param.rel;
                          paramObject.url = param.url;
                          paramObject.accept = param.accept;

                          // console.log('retArr', returnArray);
                          // return returnArray.push(fetchPersonData(paramObject));
                          return wrapper(paramObject);
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
  console.log('array2', returnArray);
  return returnArray;
  // return [
  //   {
  //     givenName: 'Daniel Egil',
  //     familyName: 'Yencken',
  //     domain: 'su',
  //     ORCID_ID: '0000-0002-5282-6424',
  //     academicTitle: '',
  //   },
  //   {
  //     givenName: 'Egil',
  //     familyName: 'Asprem',
  //     domain: 'su',
  //     ORCID_ID: '0000-0001-9944-1241',
  //     academicTitle: 'Professor',
  //   },
  //   {
  //     givenName: 'Egil',
  //     familyName: 'Henriksen',
  //     domain: 'uu',
  //     ORCID_ID: '',
  //     academicTitle: '',
  //   },
  //   {
  //     givenName: 'Egil',
  //     familyName: 'Andersson',
  //     domain: 'uu',
  //     ORCID_ID: '',
  //     academicTitle: '',
  //   },
  // ];
};
