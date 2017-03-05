import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, SearchParams } from '../utils';
import { NewUser, User, UserId } from './index';

@Injectable()
export class UserService {
  private baseUrl: string;
  private numberOfPictures = 12;
  private numberOfCoverImages = 6;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/users`;
  }

  find(params: SearchParams = {}): Observable<User[]> {
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json())
      .map((users: User[]) => users.map((user: User) => this.transformUser(user)));
  }

  get(userId: UserId): Observable<User> {
    return this.http.get(`${this.baseUrl}/${userId}`)
      .map((response: Response) => response.json() || {})
      .map((user: User) => this.transformUser(user));
  }

  getCurrent(): Observable<User> {
    return this.http.get(`${this.baseUrl}/me`)
      .map((response: Response) => response.json() || {})
      .map((user: User) => this.transformUser(user));
  }

  save(user: NewUser|User): Observable<User> {
    const request = has(user, '_id')
      ? this.http.put(`${this.baseUrl}/${user['_id']}`, user)
      : this.http.post(this.baseUrl, user)
      ;

    return request
      .map((response: Response) => response.json() || {})
      .map((user: User) => this.transformUser(user));
  }

  count(params: SearchParams = {}): Observable<number> {
    params['count'] = true;
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json());
  }

  private transformUser(user: User): User {
    // Convert all date strings to Date objects
    if (user.created) { user.created = new Date(user.created); }
    if (user.modified) { user.modified = new Date(user.modified); }
    if (user.lastSeen) { user.lastSeen = new Date(user.lastSeen); }

    // Set a random picture and cover image seeded by the user ID
    const seed = seedrandom(user._id);
    user.coverImage = `/images/header${Math.floor(seed() * this.numberOfCoverImages)}.jpg`;
    if (!user.picture) {
      user.picture = `/images/user${Math.floor(seed() * this.numberOfPictures)}.png`;
    }

    return user;
  }
}
