import { ActionLink } from '../cora-data/CoraData';

export interface ClientRecordLink {
  name: string;
  recordType: string | undefined;
  id: string | undefined;
  readLink?: ActionLink;
}
