export type PersonName = {
  familyName: string;
  givenName: string;
};

export type Affiliation = {
  name: string;
  fromYear?: string;
  untilYear?: string;
};

type ExternalUrl = {
  linkTitle: string;
  URL: string;
};

export interface Person {
  id: string;
  public: string;
  domains?: string[];
  authorisedName?: PersonName;
  academicTitle?: string;
  yearOfBirth?: string;
  yearOfDeath?: string;
  emailAddress?: string;
  alternativeNames?: PersonName[];
  externalURLs?: ExternalUrl[];
  otherAffiliation?: Affiliation;
  orcids?: string[];
  viafIDs?: string[];
  librisIDs?: string[];
  biographyEnglish?: string;
  biographySwedish?: string;
  personDomainParts: {
    recordId: string;
  }[];
}
