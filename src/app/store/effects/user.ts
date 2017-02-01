import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../services';
import * as user from '../actions/user';

@Injectable()
export class UserEffects {
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
