import { Inject, Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../../core';
import { Deed } from '../models';

@Injectable()
export class DeedService {
  private baseUrl: string;

  constructor(
    private http: Http,
    @Inject(API_BASE_URL) apiBaseUrl: string,
  ) {
    this.baseUrl = `${apiBaseUrl}/deeds`;
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
}
