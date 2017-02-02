import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthService, UserService } from '../services';
import { User } from '../models';
import * as auth from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  loginEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_EMAIL)
    .flatMap((action: Action) => this.authService.authenticateEmail(action.payload))
    .flatMap(() => this.userService.loadCurrent())
    .map((user: User) => new auth.LoginSuccessAction(user))
    .catch((error: Error) => Observable.of(new auth.LoginFailAction(error.message)));

  @Effect()
  loginFacebook$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_FACEBOOK)
    .flatMap((action: Action) => this.authService.authenticateFacebook(action.payload))
    .flatMap(() => this.userService.loadCurrent())
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
    .flatMap(() => this.userService.loadCurrent())
    .map((user: User) => new auth.LoginSuccessAction(user))
    .catch((error: Error) => Observable.of(new auth.LoginFailAction(error.message)));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGOUT)
    .flatMap(() => this.authService.logout())
    .map(() => new auth.LogoutSuccessAction());

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
  ) { }
}
