import { Observable } from 'rxjs';

export type TypeaheadSearchFunction<T> = (
  searchText: string,
) => Observable<T[]>;
