export enum MESSAGES {
  "database:read" = "database:read",
  "database:sync" = "database:sync",
  "database:create" = "database:create",
  "theme:sync" = "theme:sync",
}

export const CONSTANTS = {
  localStorageKey: "wordExtractor",
  tableContainerId: "wordExtractorContainer",
};

export const SELECTORS = {
  body: "word-extractor-app-body",
  appContainer: "word-extractor-app",
};
