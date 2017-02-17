import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AlertifyService } from './alertify.service';
import * as alert from './alertify.actions';

@Injectable()
export class AlertifyEffects {
  @Effect({ dispatch: false })
  error$ = this.actions$
    .ofType(alert.ActionTypes.ERROR).map(toPayload)
    .map((message: string) => this.alertify.error(message));

  @Effect({ dispatch: false })
  log$ = this.actions$
    .ofType(alert.ActionTypes.LOG).map(toPayload)
    .map((message: string) => this.alertify.log(message));

  @Effect({ dispatch: false })
  success$ = this.actions$
    .ofType(alert.ActionTypes.SUCCESS).map(toPayload)
    .map((message: string) => this.alertify.success(message));

  constructor(
    private actions$: Actions,
    private alertify: AlertifyService,
  ) { }
}
