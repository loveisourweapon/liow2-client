import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import { UserService } from '../services';
import * as act from '../actions/act';
import * as user from '../actions/user';

@Injectable()
export class UserEffects {
  @Effect()
  getAndSetCurrent$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.GET_AND_SET_CURRENT)
    .flatMap((action: Action) => this.userService.get(action.payload))
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

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
