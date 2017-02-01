import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { CounterQuery, CounterResult } from '../models';

@Injectable()
export class ActService {
  private baseUrl: string;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/acts`;
  }

  count(query: CounterQuery = {}): Observable<CounterResult> {
    let counterId =
      (query.user || '') +
      (query.group || '') +
      (query.campaign || '') +
      (query.deed || '');
    if (counterId === '') { counterId = 'global'; }

    const search = new URLSearchParams();
    Object.keys(query).forEach((key: string) => search.set(key, query[key]));
    search.set('count', 'true');

    return this.http.get(this.baseUrl, { search })
      .map((response: Response) => response.json())
      .map((count: number) => ({ counterId, count }));
  }
}
