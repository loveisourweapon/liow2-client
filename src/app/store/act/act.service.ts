import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import { has, keys } from 'lodash';

import { environment } from '../../../environments/environment';
import { Act, CounterQuery, CounterResult } from './index';
import { Deed } from '../deed';
import { Group } from '../group';

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
    keys(query).forEach((key: string) => search.set(key, query[key]));
    search.set('count', 'true');

    return this.http.get(this.baseUrl, { search })
      .map((response: Response) => response.json())
      .map((count: number) => ({ counterId, count }));
  }

  done(deed: Deed, group?: Group): Observable<Act> {
    const data = {
      deed: deed._id,
      group: has(group, '_id') ? group._id : null,
    };

    return this.http.post(this.baseUrl, data)
      .map((response: Response) => response.json());
  }
}
