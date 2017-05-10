import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthService as Ng2AuthService, JwtHttp } from 'ng2-ui-auth';
import { find, has, last, some } from 'lodash';
import * as Raven from 'raven-js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../../environments/environment';
import { NativeQueryEncoder } from '../../shared';
import { Credentials, Group, JsonPatchOp, User } from '../models';
import { AlertifyService } from './alertify.service';
import { StateService } from './state.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private alertify: AlertifyService,
    private auth: Ng2AuthService,
    private http: JwtHttp,
    private state: StateService,
    private userService: UserService,
  ) {
    // Set initial auth state
    const isAuthenticated = this.auth.isAuthenticated();
    this.state.auth.isAuthenticated = isAuthenticated;
    if (isAuthenticated) {
      this.loadCurrentUser().subscribe();
    }
  }

  authenticateEmail(credentials: Credentials): Observable<User> {
    console.log('Auth#authenticateEmail', 'credentials', credentials);
    if (!(credentials.email && credentials.password)) {
      return Observable.throw(new Error(`Please provide email and password`));
    }

    return this.auth.login(credentials)
      .catch((response: Response) => Observable.throw(response.json().error))
      .map(() => this.state.auth.isAuthenticated = true)
      .switchMap(() => this.loadCurrentUser());
  }

  authenticateFacebook(userData?: { group: string }): Observable<User> {
    console.log('Auth#authenticateFacebook', 'userData', userData);
    return this.auth.authenticate('facebook', userData)
      .catch((response: Response) => Observable.throw(response.json().error))
      .map(() => this.state.auth.isAuthenticated = true)
      .switchMap(() => this.loadCurrentUser());
  }

  loadCurrentUser(setGroup = true): Observable<User> {
    console.log('Auth#loadCurrentUser', 'setGroup', setGroup);
    return this.userService.getCurrent()
      .do((user: User) => {
        if (setGroup) {
          let authGroup: Group;
          // If user has currentGroup property use it
          if (has(user, 'currentGroup')) {
            const currentGroup = find(user.groups, (userGroup: Group) => userGroup._id === user.currentGroup);
            if (currentGroup) {
              authGroup = currentGroup;
            }
          }

          // Otherwise set and update using the users most recent group
          if (!authGroup && has(user, 'groups') && user.groups.length) {
            authGroup = last(user.groups);
            user.currentGroup = authGroup._id;
            this.userService.update(user, [{
              op: JsonPatchOp.Replace,
              path: '/currentGroup',
              value: user.currentGroup,
            }]).subscribe();
          }

          this.state.auth.group = authGroup || null;
        }

        this.state.auth.user = user;
        this.setSentryUserContext(user);
      });
  }

  setAuthGroup(group: Group): void {
    this.state.auth.group = group;
    this.state.auth.user$
      .first()
      .switchMap((user: User) => this.userService.update(user, [{
        op: JsonPatchOp.Replace,
        path: '/currentGroup',
        value: group._id,
      }]))
      .subscribe();
  }

  isAdminOfGroup(group: Group): Observable<boolean> {
    return this.state.auth.user$
      .map((user: User) => (
        has(group, 'admins') &&
        has(user, '_id') &&
        group.admins.indexOf(user._id) !== -1
      ));
  }

  isMemberOfGroup(group: Group): Observable<boolean> {
    return this.state.auth.user$
      .map((user: User) => (
        has(user, 'groups') &&
        has(group, '_id') &&
        some(user.groups, (userGroup: Group) => userGroup._id === group._id)
      ));
  }

  confirmEmail(token: string): Observable<null> {
    console.log('Auth#confirmEmail', 'token', token);
    return this.http.post(`${this.baseUrl}/confirm`, { token })
      .map((response: Response) => response.json());
  }

  resetPassword(password: string, token: string): Observable<null> {
    console.log('Auth#resetPassword', 'password', password, 'token', token);
    return this.http.post(`${this.baseUrl}/reset`, { password, token });
  }

  sendConfirmEmail(emailAddress: string): Observable<null> {
    console.log('Auth#sendConfirmEmail', 'emailAddress', emailAddress);
    const search = new URLSearchParams(`email=${emailAddress}`, new NativeQueryEncoder());
    return this.http.get(`${this.baseUrl}/confirm`, { search });
  }

  sendForgotPassword(emailAddress: string): Observable<null> {
    console.log('Auth#sendForgotPassword', 'emailAddress', emailAddress);
    const search = new URLSearchParams(`email=${emailAddress}`, new NativeQueryEncoder());
    return this.http.get(`${this.baseUrl}/forgot`, { search });
  }

  logout(): Observable<void> {
    console.log('Auth#logout');
    this.state.auth.isAuthenticated = false;
    this.state.auth.user = null;
    this.state.auth.group = null;
    this.alertify.log(`Logged out`);
    this.setSentryUserContext();
    return this.auth.logout();
  }

  private setSentryUserContext(user?: User) {
    if (environment.sentry) {
      const sentryUser = user ? { id: user._id, email: user.email } : undefined;
      Raven.setUserContext(sentryUser);
    }
  }
}
