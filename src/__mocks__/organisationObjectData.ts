import { Organisation } from '../types';

const createOrganisationWithNameAndId = (
  name: string,
  id: string,
): Organisation => {
  return {
    name,
    alternativeName: `${name}Alternative`,
    id,
    recordType: 'organisation',
    organisationType: 'topOrganisation',
  };
};

export default createOrganisationWithNameAndId;
