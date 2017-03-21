import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export function takeAndScan(observable: Observable<Action>, n: number): Observable<Action[]> {
  return observable
    .take(n)
    .scan((results: Action[], result: Action) => [...results, result], [])
    .skip(n - 1);
}
