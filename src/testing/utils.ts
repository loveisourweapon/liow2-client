import { Observable } from 'rxjs/Observable';

export function takeAndScan<T>(observable: Observable<T>, n: number): Observable<T[]> {
  return observable
    .take(n)
    .scan((results: T[], result: T) => [...results, result], [])
    .skip(n - 1);
}
