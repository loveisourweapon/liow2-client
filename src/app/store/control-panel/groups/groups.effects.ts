import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SearchParams } from '../../utils';
import { Group, GroupService } from '../../group';
import * as groupsControlPanel from './groups.actions';
import * as fromGroupsControlPanel from './groups.reducer';
import * as fromRoot from '../../reducer';

@Injectable()
export class GroupsControlPanelEffects {
  @Effect()
  loadGroups$: Observable<Action> = this.actions$
    .ofType(groupsControlPanel.ActionTypes.LOAD_GROUPS).map(toPayload)
    .flatMap(({ query, page, pageSize }: fromGroupsControlPanel.State) => {
      const searchParams = <SearchParams>{
        query,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        sort: '-_id',
      };

      return Observable.combineLatest(
        this.groupService.find(searchParams),
        this.groupService.count(searchParams),
      )
        .map(([groups, numberOfGroups]: [Group[], number]) =>
          new groupsControlPanel.LoadGroupsSuccessAction({ groups, numberOfGroups }))
        .catch((response: Response) =>
          Observable.of(new groupsControlPanel.LoadGroupsFailAction(response.json() || {})));
    });

  @Effect()
  triggerLoadGroups$: Observable<Action> = this.actions$
    .ofType(
      groupsControlPanel.ActionTypes.INITIALISE,
      groupsControlPanel.ActionTypes.UPDATE_QUERY,
      groupsControlPanel.ActionTypes.UPDATE_PAGE,
    )
    .switchMap(() => this.store.select(fromRoot.getGroupsControlPanel)
      .take(1)
      .map((state: fromGroupsControlPanel.State) => new groupsControlPanel.LoadGroupsAction(state)));

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private store: Store<fromRoot.State>,
  ) { }
}
