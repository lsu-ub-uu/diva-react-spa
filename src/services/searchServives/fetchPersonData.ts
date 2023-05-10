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
  id: string;
}

export const fetchPersonData = async (paramObject: any) => {
  const fetchedPersonObject: FetchedPersonObjectInterface = {
    givenName: '',
    familyName: '',
    domain: '',
    ORCID_ID: '',
    academicTitle: '',
    id: '',
  };
  const { requestMethod, rel, url, accept } = paramObject;

  const config = {
    headers: {
      Accept: accept,
    },
  };

  const response = await axios.get(url, config);
  const responseData = response.data.record.data;

  try {
    Object.entries(responseData).forEach((children) => {
      children.forEach((child: any) => {
        if (Array.isArray(child)) {
          child.forEach((item) => {
            Object.entries(item).forEach(([key, val]) => {
              if (key === 'name' && val === 'recordInfo') {
                Object.values(item).forEach((option) => {
                  if (Array.isArray(option)) {
                    option.forEach((names) => {
                      if (names.name === 'id') {
                        fetchedPersonObject.id = names.value;
                      }
                    });
                  }
                });
              }
              if (key === 'name' && val === 'authorisedName') {
                Object.values(item).forEach((option) => {
                  if (Array.isArray(option)) {
                    option.forEach((names) => {
                      if (names.name === 'familyName') {
                        fetchedPersonObject.familyName = names.value;
                      }
                      if (names.name === 'givenName') {
                        fetchedPersonObject.givenName = names.value;
                      }
                    });
                  }
                });
              }
              if (key === 'name' && val === 'recordInfo') {
                Object.values(item).forEach((option) => {
                  if (Array.isArray(option)) {
                    option.forEach((name) => {
                      if (name.name === 'domain') {
                        fetchedPersonObject.domain = name.value;
                      }
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

    // console.log('fetched', fetchedPersonObject);
    return fetchedPersonObject;
  } catch {
    console.log('error fetching');
  }
};
