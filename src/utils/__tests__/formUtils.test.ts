import { defaultValuesCreator, validationCreator } from '../formUtils';
import {
  formWithOneCard,
  formForArticle,
} from '../../__mocks__/data/formMocks/form';

describe('formUtils', () => {
  describe('defaultValuesCreator', () => {
    it('creates the default values for 1 card when 1 card is passed to it', () => {
      const defaultValues = defaultValuesCreator(formWithOneCard);
      expect(defaultValues).toStrictEqual({
        title: {
          language: '',
          mainTitle: '',
          subTitle: '',
        },
      });
    });
    it('creates the default values for a full form when one is passed to it', () => {
      const defaultValues = defaultValuesCreator(formForArticle);
      expect(defaultValues).toStrictEqual({
        artisticWork: {
          artisticWork: '',
        },
        author: [
          {
            ORCID: '',
            email: '',
            givenName: '',
            lastName: '',
            localID: '',
            organisationLink: '',
            otherOrganisation: '',
            researchGroup: '',
            yearOfBirth: '',
            yearOfDeath: '',
          },
        ],
        available: {
          publicationDate: '',
          publicationTime: '',
        },
        contentType: {
          contentType: '',
        },
        fileUpload: {
          fileUploadInput: '',
        },
        otherContributor: {
          contributorLink: '',
        },
        publishing: {
          ParallellPublishingText: '',
        },
        subcategory: {
          subcategory: '',
        },
        title: {
          language: '',
          mainTitle: '',
          subTitle: '',
        },
      });
    });
  });
  describe('validationCreator', () => {
    it.only('creates the validation for 1 card when 1 card is passed to it', () => {
      const defaultValues = validationCreator(formWithOneCard);
      const { language, mainTitle, subTitle } =
        defaultValues.title.innerType.fields;
      expect.assertions(3);
      expect(language.type).toEqual('string');
      expect(mainTitle.type).toEqual('string');
      expect(subTitle.type).toEqual('string');
    });
  });
});
