import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { pick } from 'lodash';

import { Credentials } from './index';
import { AuthService } from './auth.service';
import * as auth from './auth.actions';
import * as alertify from '../alertify/alertify.actions';
import { NewUser, User, UserService } from '../user';

@Injectable()
export class AuthEffects {
  @Effect()
  confirmEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.CONFIRM_EMAIL).map(toPayload)
    .flatMap((token: string) => this.authService.confirmEmail(token))
    .map(() => new alertify.SuccessAction(`Confirmed email address`))
    .catch(() => Observable.of(new alertify.ErrorAction(`Failed confirming email address`)))
    .do(() => this.router.navigate(['/']));

  @Effect()
  loginEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_EMAIL).map(toPayload)
    .flatMap((credentials: Credentials) => this.authService.authenticateEmail(credentials)
      .flatMap(() => this.userService.getCurrent())
      .mergeMap((user: User) => Observable.from([
        new auth.LoginSuccessAction(user),
        new alertify.SuccessAction(`Signed in` + (!user.confirmed ? `. Please confirm your email address` : ``)),
      ]))
      .catch((errorMessage: string) => Observable.of(new auth.LoginFailAction(errorMessage))));

  @Effect()
  loginFacebook$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN_WITH_FACEBOOK).map(toPayload)
    .flatMap((userData?: { group: string }) => this.authService.authenticateFacebook(userData)
      .flatMap(() => this.userService.getCurrent())
      .mergeMap((user: User) => Observable.from([
        new auth.LoginSuccessAction(user),
        new alertify.SuccessAction(`Signed in`),
      ]))
      .catch((error: Error) => Observable.from([
        new auth.LoginFailAction(error.message),
        new alertify.ErrorAction(`Failed signing in`),
      ])));

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
    .mergeMap(() => Observable.from([
      new auth.LogoutSuccessAction(),
      new alertify.SuccessAction(`Logged out`),
    ]));

  @Effect()
  sendConfirmEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SEND_CONFIRM_EMAIL).map(toPayload)
    .flatMap((emailAddress: string) => this.authService.sendConfirmEmail(emailAddress)
      .mergeMap(() => Observable.from([
        new auth.SendConfirmEmailDoneAction(),
        new alertify.SuccessAction(`Sent confirmation email to <strong>${emailAddress}</strong>`),
      ]))
      .catch(() => Observable.from([
        new auth.SendConfirmEmailDoneAction(),
        new alertify.ErrorAction(`Failed sending confirmation email`),
      ])));

  @Effect()
  signup$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SIGNUP).map(toPayload)
    .flatMap((newUser: NewUser) => this.userService.save(newUser)
      .mergeMap(() => Observable.from([
        new auth.LoginWithEmailAction(<Credentials>pick(newUser, ['email', 'password'])),
        new auth.SignupSuccessAction(),
      ]))
      .catch((response: Response) => Observable.of(new auth.SignupFailAction(response.json().error || {}))));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }
}
