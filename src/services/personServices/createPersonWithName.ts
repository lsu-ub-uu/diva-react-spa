import { Person } from '../../types';
import { DataGroup } from '../../utils/cora-data/CoraData';

export const createPersonWithName = (newPerson: Person, authToken?: string) => {
  return new Promise((resolve, reject) => {
    if (newPerson === ('' as any)) {
      reject(new Error('No newPerson was passed to createPersonWithName'));
    } else {
      const urlForNewPersonCreation = composeUrlForNewPersonSearch(newPerson);
    }
  });
};
const composeUrlForNewPersonSearch = (newPerson: Person) => {
  const personData = composeNewPersonData(newPerson);
  console.log('pD', personData);
  return `https://cora.epc.ub.uu.se/diva/rest/record/person/`;
};

const composeNewPersonData = (newPerson: Person) => {
  console.log('com', newPerson);
  const givenName: string | any = newPerson.authorisedName?.givenName;
  const familyName: string | any = newPerson.authorisedName?.familyName;
  const personData: DataGroup = {
    name: 'person',
    children: [
      {
        name: 'authorisedName',
        children: [
          {
            name: 'givenName',
            value: givenName,
          },
          {
            name: 'familyName',
            value: familyName,
          },
        ],
      },
      {
        name: 'recordInfo',
        children: [
          {
            name: 'dataDivider',
            value: '',
          },
          {
            name: 'validationType',
            value: 'Person',
          },
        ],
      },
    ],
  };
  return personData;
};
