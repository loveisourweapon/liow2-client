import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SearchParams } from '../../utils';
import { Group, GroupService } from '../../group';
import { UserService } from '../../user';
import * as groupControlPanel from './group.actions';
import * as act from '../../act/act.actions';

@Injectable()
export class GroupControlPanelEffects {
  @Effect()
  countMembers$: Observable<Action> = this.actions$
    .ofType(groupControlPanel.ActionTypes.FIND_AND_SET_GROUP).map(toPayload)
    .map((searchParams: SearchParams) => ({ groups: searchParams._id }))
    .flatMap((searchParams: SearchParams) => this.userService.count(searchParams)
      .map((numberOfMembers: number) => new groupControlPanel.SetNumberOfMembersAction(numberOfMembers))
      .catch((response: Response) =>
        Observable.of(new groupControlPanel.CountMembersFailAction(response.json() || {}))));

  @Effect()
  findAndSetGroup$: Observable<Action> = this.actions$
    .ofType(groupControlPanel.ActionTypes.FIND_AND_SET_GROUP).map(toPayload)
    .flatMap((searchParams: SearchParams) => this.groupService.findOne(searchParams)
      .mergeMap((foundGroup: Group) => Observable.from([
        new groupControlPanel.SetGroupAction(foundGroup),
        new act.CountAction({ group: foundGroup._id }),
      ]))
      .catch((response: Response) =>
        Observable.of(new groupControlPanel.FindAndSetGroupFailAction(response.json() || {}))));

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private userService: UserService,
  ) { }
}
