import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, SearchParams } from '../../shared';
import { Deed, DeedCounterResult } from '../models';
import { StateService } from './state.service';

@Injectable()
export class DeedService {
  private readonly baseUrl = `${environment.apiBaseUrl}/deeds`;

  constructor(
    private http: JwtHttp,
    private state: StateService,
  ) { }

  find(params: SearchParams = {}): Observable<Deed[]> {
    console.log('DeedService#find', 'params', params);
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json() || [])
      .map((deeds: Deed[]) =>
        deeds.map((deed: Deed) => {
          // Convert all date strings to Date objects
          if (deed.created) { deed.created = new Date(deed.created); }
          if (deed.modified) { deed.modified = new Date(deed.modified); }

          return deed;
        }));
  }

  findOne(params: SearchParams = {}): Observable<Deed> {
    console.log('DeedService#findOne', 'params', params);
    return this.find(params)
      .map((deeds: Deed[]) => {
        if (deeds.length !== 1) {
          throw new Error(`Deed not found`);
        }

        return deeds[0];
      });
  }

  countAll(params: SearchParams = {}): void {
    console.log('DeedService#countAll', 'params', params);
    const baseCounterId = params.group || params.campaign || '';
    this.http.get(`${this.baseUrl}/counters`, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json() || [])
      .switchMap((counters: DeedCounterResult[]) => Observable.from(counters))
      .subscribe((counter: DeedCounterResult) =>
        this.state.updateCounter(baseCounterId + counter.deed, counter.count));
  }
}
