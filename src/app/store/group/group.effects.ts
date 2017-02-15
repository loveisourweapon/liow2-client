import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group } from './index';
import { GroupService } from './group.service';
import * as act from '../act/act.actions';
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

  @Effect()
  findAndSetCurrent$: Observable<Action> = this.actions$
    .ofType(group.ActionTypes.FIND_AND_SET_CURRENT)
    .flatMap((action: Action) => this.groupService.findOne(action.payload))
    .mergeMap((foundGroup: Group) => Observable.from([
      new group.SetCurrentAction(foundGroup),
      new act.CountAction({ group: foundGroup._id }),
    ]))
    .catch(error => Observable.of(new group.FindAndSetCurrentFailAction(error.message)));

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
  ) { }
}
