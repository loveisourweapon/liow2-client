import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { GroupEditInitialise } from './group-edit.model';
import * as groupEditModal from './group-edit.actions';
import { User, UserService } from '../../user';

@Injectable()
export class GroupEditModalEffects {
  @Effect()
  findGroupUsers$: Observable<Action> = this.actions$
    .ofType(groupEditModal.ActionTypes.OPEN).map(toPayload)
    .flatMap((payload: GroupEditInitialise) => Observable.if(
      () => has(payload, 'group._id'),
      this.userService.find({ groups: payload.group ? payload.group._id : null }),
    ))
    .map((users: User[]) => new groupEditModal.UpdateGroupUsersAction(users));

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
