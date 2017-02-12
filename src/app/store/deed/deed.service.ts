import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Deed } from './index';

@Injectable()
export class DeedService {
  private baseUrl: string;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/deeds`;
  }

  find(search = new URLSearchParams()): Observable<Deed[]> {
    return this.http.get(this.baseUrl, { search })
      .map((response: Response) => response.json() || [])
      .map((deeds: Deed[]) =>
        deeds.map((deed: Deed) => {
          // Convert all date strings to Date objects
          if (deed.created) { deed.created = new Date(deed.created); }
          if (deed.modified) { deed.modified = new Date(deed.modified); }

          return deed;
        }));
  }

  countAll(search = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.baseUrl}/counters`, { search })
      .map((response: Response) => response.json() || {});
  }
}
