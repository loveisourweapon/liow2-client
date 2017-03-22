import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { JsonPatchOp } from '../../utils';
import { User, UserService } from '../../user';
import * as userControlPanel from './user.actions';
import * as act from '../../act/act.actions';
import * as alertify from '../../alertify/alertify.actions';
import * as auth from '../../auth/auth.actions';

@Injectable()
export class UserControlPanelEffects {
  @Effect()
  count$: Observable<Action> = this.actions$
    .ofType(userControlPanel.ActionTypes.SET_USER).map(toPayload)
    .map((currentUser: User) => new act.CountAction({ user: currentUser._id }));

  @Effect()
  saveUserName$: Observable<Action> = this.actions$
    .ofType(userControlPanel.ActionTypes.SAVE_USER_NAME).map(toPayload)
    .flatMap(({ user, firstName, lastName }: { user: User, firstName: string, lastName: string }) => {
      const patches = [
        { op: JsonPatchOp.Replace, path: `/firstName`, value: firstName },
        { op: JsonPatchOp.Replace, path: `/lastName`, value: lastName },
      ];

      return this.userService.update(user, patches)
        .mergeMap(() => Observable.from([
          new userControlPanel.SetIsEditingAction({ isEditingName: false, user }),
          new auth.LoginWithTokenAction(), // reload the current auth user
          new alertify.SuccessAction(`Updated name`),
        ]))
        .catch(() => Observable.from([
          new userControlPanel.SetIsEditingAction({ isEditingName: false, user }),
          new alertify.ErrorAction(`Failed updating name`),
        ]));
    });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
