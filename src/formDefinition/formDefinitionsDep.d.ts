import {
  BFFMetadata,
  BFFValidationType,
  BFFPresentation,
  BFFPresentationGroup,
  BFFText,
  BFFRecordType
} from '../config/bffTypes';
import { Lookup } from 'utils/structs/lookup';
export interface Dependencies {
  validationTypePool: Lookup<string, BFFValidationType>;
  metadataPool: Lookup<string, BFFMetadata>;
  presentationPool: Lookup<
    string,
    BFFPresentation | BFFPresentationGroup | BFFPresentationSurroundingContainer | BFFGuiElement
  >;
  textPool: Lookup<string, BFFText>;
  recordTypePool: Lookup<string, BFFRecordType>;
}
