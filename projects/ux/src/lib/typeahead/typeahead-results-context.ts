import { TemplateRef } from '@angular/core';

import { TypeaheadSearchResultAction } from './typeahead-search-result-action';

export abstract class TypeaheadResultsContext {
  public abstract results: any[];

  public abstract resultSelectedAction: TypeaheadSearchResultAction;

  public abstract searchResultsEmptyMessage: string;

  public abstract templateRef: TemplateRef<any>;
}
