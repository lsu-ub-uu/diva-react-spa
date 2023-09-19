// should move this maybe?
export interface Dependencies {
  validationTypePool?: Lookup<string, BFFValidationType>;
  metadataPool?: Lookup<string, BFFMetadata>;
  presentationPool?: Lookup<string, BFFPresentation | BFFPresentationGroup>;
  textPool?: Lookup<string, BFFText>;
}
