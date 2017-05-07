import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, SearchParams } from '../../shared';
import { NewGroup, Group } from '../models';

@Injectable()
export class GroupService {
  private readonly baseUrl = `${environment.apiBaseUrl}/groups`;
  private readonly numberOfCoverImages = 6;

  constructor(
    private http: JwtHttp,
  ) { }

  find(params: SearchParams = {}): Observable<Group[]> {
    console.log('GroupService#find', 'params', params);
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json() || [])
      .map((groups: Group[]) =>
        groups.map((group: Group) => this.transformGroup(group)));
  }

  findOne(params: SearchParams = {}): Observable<Group> {
    console.log('GroupService#findOne', 'params', params);
    return this.find(params)
      .map((groups: Group[]) => {
        if (groups.length !== 1) {
          throw new Error(`Group not found`);
        }

        return groups[0];
      });
  }

  save(group: Group|NewGroup): Observable<Group> {
    console.log('GroupService#save', 'group', group);
    const request = has(group, '_id')
      ? this.http.put(`${this.baseUrl}/${group._id}`, group)
      : this.http.post(this.baseUrl, group)
      ;

    return request
      .catch((response: Response) => Observable.throw(response.json().error))
      .map((response: Response) => response.json() || {})
      .map((savedGroup: Group) => this.transformGroup(savedGroup));
  }

  count(params: SearchParams = {}): Observable<number> {
    console.log('GroupService#count', 'params', params);
    params['count'] = true;
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json());
  }

  private transformGroup(group: Group): Group {
    // Convert all date strings to Date objects
    if (group.created) { group.created = new Date(group.created); }
    if (group.modified) { group.modified = new Date(group.modified); }

    // Set a random cover image seeded by the group ID
    group.coverImage = `/images/header${Math.floor(seedrandom(group._id)() * this.numberOfCoverImages)}.jpg`;

    return group;
  }
}
