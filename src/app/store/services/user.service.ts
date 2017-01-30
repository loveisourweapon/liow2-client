import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable()
export class UserService {
  private baseUrl: string;

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

        return user;
      });
  }
}
