import { Lookup } from '@/utils/structs/lookup';
import {
  BFFGuiElement,
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationGroup,
  BFFPresentationSurroundingContainer,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '@/cora/transform/bffTypes';

export interface Dependencies {
  validationTypePool: Lookup<string, BFFValidationType>;
  metadataPool: Lookup<
    string,
    | BFFMetadataTextVariable
    | BFFMetadataNumberVariable
    | BFFMetadataRecordLink
    | BFFMetadataCollectionVariable
    | BFFMetadataGroup
  >;
  presentationPool: Lookup<
    string,
    | BFFPresentation
    | BFFPresentationGroup
    | BFFPresentationSurroundingContainer
    | BFFGuiElement
  >;
  textPool: Lookup<string, BFFText>;
  recordTypePool: Lookup<string, BFFRecordType>;
  searchPool: Lookup<string, BFFSearch>;
  loginUnitPool: Lookup<string, BFFLoginUnit>;
  loginPool: Lookup<string, BFFLoginWebRedirect | BFFLoginPassword>;
}
