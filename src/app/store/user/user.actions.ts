import { Action } from '@ngrx/store';

import { actionType } from '../utils';
import { Group } from '../group';
import { User, UserId } from '../user';

export class ActionTypes {
  static readonly COUNT = actionType('[User] Count');
  static readonly COUNT_SUCCESS = actionType('[User] Count Success');
  static readonly COUNT_FAIL = actionType('[User] Count Fail');
  static readonly JOIN_GROUP = actionType('[User] Join Group');
  static readonly LEAVE_GROUP = actionType('[User] Leave Group');
  static readonly GET_AND_SET_CURRENT = actionType('[User] Get and Set Current');
  static readonly GET_FAIL = actionType('[User] Get Fail');
  static readonly SET_CURRENT = actionType('[User] Set Current');
}

export class CountAction implements Action {
  type = ActionTypes.COUNT;
}

export class CountSuccessAction implements Action {
  type = ActionTypes.COUNT_SUCCESS;

  constructor(
    public payload: number,
  ) { }
}

export class CountFailAction implements Action {
  type = ActionTypes.COUNT_FAIL;

  constructor(
    public payload: any,
  ) { }
}

export class JoinGroupAction implements Action {
  type = ActionTypes.JOIN_GROUP;

  constructor(
    public payload: { user: User, group: Group },
  ) { }
}

export class LeaveGroupAction implements Action {
  type = ActionTypes.LEAVE_GROUP;

  constructor(
    public payload: { user: User, group: Group },
  ) { }
}

export class GetAndSetCurrentAction implements Action {
  type = ActionTypes.GET_AND_SET_CURRENT;

  constructor(
    public payload: UserId,
  ) { }
}

export class GetFailAction implements Action {
  type = ActionTypes.GET_FAIL;

  constructor(
    public payload: any,
  ) { }
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT;

  constructor(
    public payload: User,
  ) { }
}

export type Actions
  = CountAction
  | CountSuccessAction
  | CountFailAction
  | JoinGroupAction
  | LeaveGroupAction
  | GetAndSetCurrentAction
  | GetFailAction
  | SetCurrentAction
  ;
