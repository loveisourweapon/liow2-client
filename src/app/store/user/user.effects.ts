import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { JsonPatchOp } from '../utils';
import { User, UserId } from './index';
import { UserService } from './user.service';
import * as user from './user.actions';
import * as act from '../act/act.actions';
import * as alertify from '../alertify/alertify.actions';
import * as auth from '../auth/auth.actions';
import { Group } from '../group';

@Injectable()
export class UserEffects {
  @Effect()
  getAndSetCurrent$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.GET_AND_SET_CURRENT).map(toPayload)
    .flatMap((userId: UserId) => this.userService.get(userId))
    .mergeMap((foundUser: User) => Observable.from([
      new user.SetCurrentAction(foundUser),
      new act.CountAction({ user: foundUser._id }),
    ]))
    .catch(error => Observable.of(new user.GetFailAction(error)));

  @Effect()
  count$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.COUNT)
    .startWith(new user.CountAction()) // dispatch on startup
    .flatMap(() => this.userService.count())
    .map((counter: number) => new user.CountSuccessAction(counter))
    .catch(error => Observable.of(new user.CountFailAction(error)));

  @Effect()
  joinGroup$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.JOIN_GROUP).map(toPayload)
    .flatMap(({ user: currentUser, group }: { user: User, group: Group }) => {
      const patch = {
        op: JsonPatchOp.Add,
        path: `/groups/${currentUser.groups.length}`,
        value: group._id,
      };

      return this.userService.update(currentUser, [patch])
        .mergeMap(() => Observable.from([
          new auth.LoginWithTokenAction(), // reload the current auth user
          new auth.SetCurrentGroupAction(group),
          new alertify.SuccessAction(`Joined group <b>${group.name}</b>`),
        ]))
        .catch(() => Observable.of(
          new alertify.ErrorAction(`Failed joining group <b>${group.name}</b>`)
        ));
    });

  @Effect()
  leaveGroup$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LEAVE_GROUP).map(toPayload)
    .flatMap(({ user: currentUser, group }: { user: User, group: Group }) => {
      const index = currentUser.groups.findIndex((userGroup: Group) => userGroup._id === group._id);
      const patch = {
        op: JsonPatchOp.Remove,
        path: `/groups/${index}`,
      };

      return this.userService.update(currentUser, [patch])
        .mergeMap(() => Observable.from([
          new auth.LoginWithTokenAction(), // reload the current auth user
          new alertify.LogAction(`Left group <b>${group.name}</b>`),
        ]))
        .catch(() => Observable.of(
          new alertify.ErrorAction(`Failed leaving group <b>${group.name}</b>`)
        ));
    });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
