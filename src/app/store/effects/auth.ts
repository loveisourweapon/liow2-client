import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { pick } from 'lodash';

import { AuthService, UserService } from '../services';
import { Credentials, User } from '../models';
import * as auth from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  confirmEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.CONFIRM_EMAIL)
    .flatMap((action: Action) => this.authService.confirmEmail(action.payload))
    .map(() => new auth.ConfirmEmailSuccessAction())
    .catch((error: Error) => Observable.of(new auth.ConfirmEmailFailAction(error.message)))
    .do(() => this.router.navigate(['/']));

  @Effect()
  loginEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_EMAIL)
    .flatMap((action: Action) => this.authService.authenticateEmail(action.payload))
    .flatMap(() => this.userService.getCurrent())
    .map((user: User) => new auth.LoginSuccessAction(user))
    .catch((error: Error) => Observable.of(new auth.LoginFailAction(error.message)));

  @Effect()
  loginFacebook$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_FACEBOOK)
    .flatMap((action: Action) => this.authService.authenticateFacebook(action.payload))
    .flatMap(() => this.userService.getCurrent())
    .map((user: User) => new auth.LoginSuccessAction(user))
    .catch((error: Error) => Observable.of(new auth.LoginFailAction(error.message)));

  @Effect()
  loginToken$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_TOKEN)
    .startWith(new auth.LoginWithTokenAction()) // dispatch on startup
    .map(() => {
      if (!this.authService.isAuthenticated()) {
        throw new Error('Not authenticated');
      }
    })
    .flatMap(() => this.userService.getCurrent())
    .map((user: User) => new auth.LoginSuccessAction(user))
    .catch((error: Error) => Observable.of(new auth.LoginFailAction(error.message)));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGOUT)
    .flatMap(() => this.authService.logout())
    .map(() => new auth.LogoutSuccessAction());

  @Effect()
  signup$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SIGNUP)
    .flatMap((action: Action) => this.userService.save(action.payload)
      .mergeMap(() => Observable.from([
        new auth.LoginWithEmailAction(<Credentials>pick(action.payload, ['email', 'password'])),
        new auth.SignupSuccessAction(),
      ])))
    .catch((error: Error) => Observable.of(new auth.SignupFailAction(error.message)));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }
}
