export type TypeaheadSearchResultAction = (searchResult: any) =>
  | {
      /**
       * The complete search terms to display in the search input after the user makes a selection.
       * For example, if the user types "John D" and selects "John Doe", the search result action would
       * return the string "John Doe" to show in the search box.
       */
      resolvedSearchTerms?: string;
    }
  | undefined;
