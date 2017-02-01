import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable()
export class UserService {
  private baseUrl: string;
  private numberOfPicture = 12;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/users`;
  }

  loadCurrent(): Observable<User> {
    return this.http.get(`${this.baseUrl}/me`)
      .map((response: Response) => response.json() || {})
      .map((user: User) => {
        // Convert all date strings to Date objects
        if (user.created) { user.created = new Date(user.created); }
        if (user.modified) { user.modified = new Date(user.modified); }
        if (user.lastSeen) { user.lastSeen = new Date(user.lastSeen); }

        // Set a random picture seeded by the group ID
        if (!user.picture) {
          user.picture = `/images/user${Math.floor(seedrandom(user._id)() * this.numberOfPicture)}.png`;
        }

        return user;
      });
  }

  count(search = new URLSearchParams()): Observable<number> {
    search.set('count', 'true');
    return this.http.get(this.baseUrl, { search })
      .map((response: Response) => response.json());
  }
}
