import { Action } from '@ngrx/store';

import { actionType, ApiError, SearchParams } from '../../utils';
import { Group } from '../../group';

export class ActionTypes {
  static readonly COUNT_MEMBERS_FAIL = actionType('[Group Control Panel] Count Members Fail');
  static readonly FIND_AND_SET_GROUP = actionType('[Group Control Panel] Find and Set Group');
  static readonly FIND_AND_SET_GROUP_FAIL = actionType('[Group Control Panel] Find and Set Group Fail');
  static readonly SET_GROUP = actionType('[Group Control Panel] Set Group');
  static readonly SET_NUMBER_OF_MEMBERS = actionType('[Group Control Panel] Set Number of Members');
}

export class CountMembersFailAction implements Action {
  type = ActionTypes.COUNT_MEMBERS_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}

export class FindAndSetGroupAction implements Action {
  type = ActionTypes.FIND_AND_SET_GROUP;

  constructor(
    public payload: SearchParams,
  ) { }
}
export class FindAndSetGroupFailAction implements Action {
  type = ActionTypes.FIND_AND_SET_GROUP_FAIL;

  constructor(
    public payload: ApiError,
  ) { }
}

export class SetGroupAction implements Action {
  type = ActionTypes.SET_GROUP;

  constructor(
    public payload: Group,
  ) { }
}

export class SetNumberOfMembersAction implements Action {
  type = ActionTypes.SET_NUMBER_OF_MEMBERS;

  constructor(
    public payload: number,
  ) { }
}

export type Actions
  = CountMembersFailAction
  | FindAndSetGroupAction
  | FindAndSetGroupFailAction
  | SetGroupAction
  | SetNumberOfMembersAction
  ;
