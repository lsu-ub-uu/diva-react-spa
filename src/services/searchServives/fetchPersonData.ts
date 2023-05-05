import axios from 'axios';
interface FetchedPersonObjectInterface {
  givenName: string;
  familyName: string;
  externalURL?: string;
  otherAffiliation?: string;
  biographySwedish?: string;
  biographyEnglish?: string;
  Libris_ID?: string;
  domain: string;
  ORCID_ID?: string;
  alternativeName?: string;
  VIAF_ID?: string;
  academicTitle?: string;
}

export const fetchPersonData = async (paramObject: any) => {
  const fetchedPersonObject: FetchedPersonObjectInterface = {
    givenName: '',
    familyName: '',
    domain: '',
    ORCID_ID: '',
    academicTitle: '',
  };
  const { requestMethod, rel, url, accept } = paramObject;

  // const axiosRequestMethod = requestMethod.toLowerCase();

  const config = {
    headers: {
      Accept: accept,
    },
  };

  const response = await axios.get(url, config);
  const responseData = response.data.record.data;
  // console.log('resD', responseData);
  Object.entries(responseData).forEach((children) => {
    // console.log('children', children);
    children.forEach((child: any) => {
      // console.log('child', child);
      if (Array.isArray(child)) {
        // console.log('arr', child);
        child.forEach((item) => {
          // console.log('item', item);
          Object.entries(item).forEach(([key, val]) => {
            // console.log('key', key, 'val', val);
            if (key === 'name' && val === 'authorisedName') {
              // console.log(item);
              Object.values(item).forEach((option) => {
                // console.log(stuff);
                if (Array.isArray(option)) {
                  option.forEach((names) => {
                    if (names.name === 'familyName') {
                      fetchedPersonObject.familyName = names.value;
                    }
                    if (names.name === 'givenName') {
                      fetchedPersonObject.givenName = names.value;
                    }
                    // console.log('obj', fetchedPersonObject);
                  });
                }
              });
            }
            if (key === 'name' && val === 'recordInfo') {
              // console.log('recordInfo');
              Object.values(item).forEach((option) => {
                // console.log(option);
                if (Array.isArray(option)) {
                  // console.log(option);

                  option.forEach((name) => {
                    if (name.name === 'domain') {
                      console.log('item');
                      fetchedPersonObject.domain = name.value;
                    }
                    // console.log('obj', fetchedPersonObject);
                  });
                }
              });
            }
            if (key === 'name' && val === 'ORCID_ID') {
              fetchedPersonObject.ORCID_ID = item.value;
            }
            if (key === 'name' && val === 'academicTitle') {
              fetchedPersonObject.academicTitle = item.value;
            }
          });
        });
      }
    });
  });
  console.log('all', fetchedPersonObject);
};
