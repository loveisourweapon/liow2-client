import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { AlertifyService } from './alertify.service';
import { AlertInitialise } from './alert.model';
import * as alert from './alertify.actions';

@Injectable()
export class AlertifyEffects {
  @Effect({ dispatch: false })
  error$ = this.actions$
    .ofType(alert.ActionTypes.ERROR).map(toPayload)
    .map(this.toAlertInitialise)
    .map((payload: AlertInitialise) =>
      this.alertify.error(payload.message, payload.timeout, payload.useTemplate));

  @Effect({ dispatch: false })
  log$ = this.actions$
    .ofType(alert.ActionTypes.LOG).map(toPayload)
    .map(this.toAlertInitialise)
    .map((payload: AlertInitialise) =>
      this.alertify.log(payload.message, payload.timeout, payload.useTemplate));

  @Effect({ dispatch: false })
  success$ = this.actions$
    .ofType(alert.ActionTypes.SUCCESS).map(toPayload)
    .map(this.toAlertInitialise)
    .map((payload: AlertInitialise) =>
      this.alertify.success(payload.message, payload.timeout, payload.useTemplate));

  constructor(
    private actions$: Actions,
    private alertify: AlertifyService,
  ) { }

  private toAlertInitialise(payload: string|AlertInitialise): AlertInitialise {
    return typeof payload === 'string'
      ? <AlertInitialise>{ message: payload }
      : payload
      ;
  }
}
