import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { find, pick } from 'lodash';

import { Credentials } from './index';
import { AuthService } from './auth.service';
import * as auth from './auth.actions';
import * as alertify from '../alertify/alertify.actions';
import { Group } from '../group';
import * as group from '../group/group.actions';
import * as modal from '../modal/modal.actions';
import { ResetPasswordRequest } from '../reset-password';
import { NewUser, User, UserService } from '../user';
import * as fromRoot from '../reducer';

@Injectable()
export class AuthEffects {
  @Effect()
  confirmEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.CONFIRM_EMAIL).map(toPayload)
    .flatMap((token: string) => this.authService.confirmEmail(token)
      .mergeMap(() => Observable.from([
        new alertify.SuccessAction(`Confirmed email address`),
        go('/'),
      ]))
      .catch(() => Observable.from([
        new alertify.ErrorAction(`Failed confirming email address`),
        go('/'),
      ])));

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
      new alertify.LogAction(`Logged out`),
    ]));

  @Effect()
  resetPassword$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.RESET_PASSWORD).map(toPayload)
    .flatMap((request: ResetPasswordRequest) => this.authService.resetPassword(request.password, request.token)
      .finally(() => go('/'))
      .mergeMap(() => Observable.from([
        new auth.ResetPasswordDoneAction(),
        new modal.OpenLoginAction(),
        new alertify.SuccessAction(`Password reset`),
        go('/'),
      ]))
      .catch(() => Observable.from([
        new auth.ResetPasswordDoneAction(),
        new alertify.ErrorAction(`Password reset link has expired. Please try again or contact us`),
        go('/'),
      ])));

  @Effect()
  sendConfirmEmail$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SEND_CONFIRM_EMAIL).map(toPayload)
    .flatMap((emailAddress: string) => this.authService.sendConfirmEmail(emailAddress)
      .mergeMap(() => Observable.from([
        new auth.SendConfirmEmailDoneAction(),
        new alertify.SuccessAction(`Sent confirmation email to <b>${emailAddress}</b>`),
      ]))
      .catch(() => Observable.from([
        new auth.SendConfirmEmailDoneAction(),
        new alertify.ErrorAction(`Failed sending confirmation email`),
      ])));

  @Effect()
  sendForgotPassword$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.SEND_FORGOT_PASSWORD).map(toPayload)
    .flatMap((emailAddress: string) => this.authService.sendForgotPassword(emailAddress)
      .mergeMap(() => Observable.from([
        new auth.SendForgotPasswordSuccessAction(),
        new alertify.SuccessAction(`Sent password recovery email to <b>${emailAddress}</b>`),
      ]))
      .catch(() => Observable.from([
        new auth.SendForgotPasswordFailAction(),
        new alertify.ErrorAction(`Failed sending password recovery email`),
      ])));

  @Effect()
  setCurrentGroup$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.SET_CURRENT).map(toPayload)
    .flatMap((group: Group) => this.store.select(fromRoot.getAuthUser)
      .flatMap((user: User) => Observable.if(
        () => find(user.groups, ['_id', group._id]) !== undefined,
        Observable.of(new auth.SetCurrentGroupAction(group)),
      )));

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
    private store: Store<fromRoot.State>,
    private userService: UserService,
  ) { }
}
