import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GroupService } from './group.service';
import * as group from './group.actions';

@Injectable()
export class GroupEffects {
  @Effect()
  count$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.COUNT)
    .startWith(new group.CountAction()) // dispatch on startup
    .flatMap(() => this.groupService.count())
    .map((counter: number) => new group.CountSuccessAction(counter))
    .catch(error => Observable.of(new group.CountFailAction(error)));

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
  ) { }
}
