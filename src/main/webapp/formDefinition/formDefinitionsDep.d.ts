import { Lookup } from 'utils/structs/lookup';
import {
  BFFMetadata,
  BFFValidationType,
  BFFPresentation,
  BFFPresentationGroup,
  BFFText,
  BFFRecordType,
  BFFSearch
} from '../config/bffTypes';

export interface Dependencies {
  validationTypePool: Lookup<string, BFFValidationType>;
  metadataPool: Lookup<string, BFFMetadata>;
  presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  textPool: Lookup<string, BFFText>;
  recordTypePool: Lookup<string, BFFRecordType>;
  searchPool: Lookup<string, BFFSearch>;
}
