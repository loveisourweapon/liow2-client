import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from '../../user';
import * as user from './user.actions';
import * as act from '../../act/act.actions';

@Injectable()
export class UserControlPanelEffects {
  @Effect()
  count$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.SET_USER).map(toPayload)
    .map((currentUser: User) => new act.CountAction({ user: currentUser._id }));

  constructor(
    private actions$: Actions,
  ) { }
}
