import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams } from '../../shared';
import { Act, CounterQuery, Deed, Group } from '../models';
import { StateService } from './state.service';

@Injectable()
export class ActService {
  private readonly baseUrl = `${environment.apiBaseUrl}/acts`;

  constructor(
    private http: JwtHttp,
    private state: StateService,
  ) { }

  count(query: CounterQuery = {}): void {
    console.log('ActService#count', 'query', query);
    let counterId =
      (query.user || '') +
      (query.group || '') +
      (query.campaign || '') +
      (query.deed || '');
    if (counterId === '') { counterId = 'global'; }

    const search = buildUrlSearchParams(query);
    search.set('count', 'true');

    this.http.get(this.baseUrl, { search })
      .map((response: Response) => response.json())
      .subscribe((count: number) => this.state.updateCounter(counterId, count));
  }

  done(deed: Deed, group?: Group): Observable<Act> {
    console.log('ActService#done', 'deed', deed, 'group', group);
    const data = {
      deed: deed._id,
      group: has(group, '_id') ? group._id : null,
      // The API works out current campaign for group
    };

    return this.http.post(this.baseUrl, data)
      .map((response: Response) => response.json());
  }
}
