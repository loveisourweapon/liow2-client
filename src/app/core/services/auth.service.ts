import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthService as Ng2AuthService, JwtHttp } from 'ng2-ui-auth';
import { has, some } from 'lodash';
import * as Raven from 'raven-js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../../environments/environment';
import { NativeQueryEncoder } from '../../shared';
import { Credentials, Group, User } from '../models';
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
    if (!(credentials.email && credentials.password)) {
      return Observable.throw(new Error(`Please provide email and password`));
    }

    return this.auth.login(credentials)
      .catch((response: Response) => Observable.throw(response.json().error))
      .map(() => this.state.auth.isAuthenticated = true)
      .switchMap(() => this.loadCurrentUser());
  }

  authenticateFacebook(userData?: { group: string }): Observable<User> {
    return this.auth.authenticate('facebook', userData)
      .catch((response: Response) => Observable.throw(response.json().error))
      .map(() => this.state.auth.isAuthenticated = true)
      .switchMap(() => this.loadCurrentUser());
  }

  loadCurrentUser(setGroup = true): Observable<User> {
    return this.userService.getCurrent()
      .do((user: User) => {
        this.state.auth.user = user;
        this.setSentryUserContext(user);

        // Set the current group as the users first group
        if (setGroup && has(user, 'groups') && user.groups.length) {
          this.state.auth.group = user.groups[0];
        }
      });
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
    return this.http.post(`${this.baseUrl}/confirm`, { token })
      .map((response: Response) => response.json());
  }

  resetPassword(password: string, token: string): Observable<null> {
    return this.http.post(`${this.baseUrl}/reset`, { password, token });
  }

  sendConfirmEmail(emailAddress: string): Observable<null> {
    const search = new URLSearchParams(`email=${emailAddress}`, new NativeQueryEncoder());
    return this.http.get(`${this.baseUrl}/confirm`, { search });
  }

  sendForgotPassword(emailAddress: string): Observable<null> {
    const search = new URLSearchParams(`email=${emailAddress}`, new NativeQueryEncoder());
    return this.http.get(`${this.baseUrl}/forgot`, { search });
  }

  logout(): Observable<void> {
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
