import { ActionLinks } from '../utils/cora-data/CoraData';

export interface Auth {
  data: {
    token: string;
    validForNoSeconds: string;
    userId: string;
    loginId: string;
    lastName: string;
    firstName: string;
  };
  actionLinks?: ActionLinks;
}
