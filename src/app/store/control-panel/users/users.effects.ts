import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SearchParams } from '../../utils';
import { User, UserService } from '../../user';
import * as usersControlPanel from './users.actions';
import * as fromUsersControlPanel from './users.reducer';
import * as fromRoot from '../../reducer';

@Injectable()
export class UsersControlPanelEffects {
  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(usersControlPanel.ActionTypes.LOAD_USERS).map(toPayload)
    .flatMap(({ groupId, query, page, pageSize }: fromUsersControlPanel.State) => {
      const searchParams = <SearchParams>{
        groups: groupId || undefined,
        query,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        sort: '-_id',
      };

      return Observable.combineLatest(
        this.userService.find(searchParams),
        this.userService.count(searchParams),
      )
        .map(([users, numberOfUsers]: [User[], number]) =>
          new usersControlPanel.LoadUsersSuccessAction({ users, numberOfUsers }))
        .catch((response: Response) =>
          Observable.of(new usersControlPanel.LoadUsersFailAction(response.json() || {})));
    });

  @Effect()
  triggerLoadUsers$: Observable<Action> = this.actions$
    .ofType(
      usersControlPanel.ActionTypes.UPDATE_GROUP_ID,
      usersControlPanel.ActionTypes.UPDATE_QUERY,
      usersControlPanel.ActionTypes.UPDATE_PAGE,
    )
    .switchMap(() => this.store.select(fromRoot.getUsersControlPanel)
      .take(1)
      .map((state: fromUsersControlPanel.State) => new usersControlPanel.LoadUsersAction(state)));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromRoot.State>,
  ) { }
}
