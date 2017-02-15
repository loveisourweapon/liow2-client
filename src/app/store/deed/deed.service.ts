import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, SearchParams } from '../utils';
import { Deed } from './index';

@Injectable()
export class DeedService {
  private baseUrl: string;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/deeds`;
  }

  find(params: SearchParams = {}): Observable<Deed[]> {
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
    return this.find(params)
      .map((deeds: Deed[]) => {
        if (deeds.length !== 1) {
          throw new Error(`Deed not found`);
        }

        return deeds[0];
      });
  }

  countAll(params: SearchParams = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}/counters`, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json() || {});
  }
}
