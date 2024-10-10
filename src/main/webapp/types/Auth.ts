import { ActionLinks } from '../utils/cora-data/CoraData';

export interface Auth {
  data: {
    token: string;
    validForNoSeconds: string;
    idInUserStorage: string;
    loginId: string;
    lastName: string;
    firstName: string;
  };
  actionLinks?: ActionLinks;
}
